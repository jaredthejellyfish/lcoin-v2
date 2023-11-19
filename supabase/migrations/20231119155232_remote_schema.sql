
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "wrappers" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."gen_iban_from_string"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$DECLARE
  country_code text := 'LC';
  bank_code text := '0100';
  account_number text := '';
  pseudo_check_digits text;
  ascii_sum integer := 0;
  i integer;
BEGIN
  -- Generate a random account number
  FOR i IN 1..10 LOOP
    account_number := account_number || floor(random() * 10)::text;
  END LOOP;

  -- Calculate the sum of the ASCII values of the characters in the account number
  FOR i IN 1..length(account_number) LOOP
    ascii_sum := ascii_sum + ascii(substr(account_number, i, 1));
  END LOOP;

  -- Calculate pseudo check digits
  pseudo_check_digits := lpad((ascii_sum % 100)::text, 2, '0');

  NEW.iban := country_code || pseudo_check_digits || bank_code || account_number;

  RETURN NEW;
END;$$;

ALTER FUNCTION "public"."gen_iban_from_string"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."populate_usernames_in_transaction"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$DECLARE
  sender_profile RECORD;
  receiver_profile RECORD;
BEGIN
  -- Get the sender's profile
  SELECT INTO sender_profile * FROM profiles WHERE id = NEW.sender_id;

  -- Get the receiver's profile
  SELECT INTO receiver_profile * FROM profiles WHERE id = NEW.receiver_id;

  -- Set the sender_username and receiver_username
  NEW.sender_username := sender_profile.username;
  NEW.receiver_username := receiver_profile.username;
  NEW.sender_avatar_url := sender_profile.avatar_url;
  NEW.receiver_avatar_url := receiver_profile.avatar_url;

  RETURN NEW;
END;$$;

ALTER FUNCTION "public"."populate_usernames_in_transaction"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_user_balances"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$BEGIN
  -- Subtract the transaction amount from the sender's balance
  UPDATE profiles
  SET balance = balance - NEW.amount
  WHERE id = NEW.sender_id;

  -- Add the transaction amount to the receiver's balance
  UPDATE profiles
  SET balance = balance + NEW.amount
  WHERE id = NEW.receiver_id;

  RETURN NEW;
END;$$;

ALTER FUNCTION "public"."update_user_balances"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "updated_at" timestamp with time zone,
    "username" "text",
    "full_name" "text",
    "avatar_url" "text",
    "website" "text",
    "balance" double precision DEFAULT '10'::double precision NOT NULL,
    "iban" "text" DEFAULT ''::"text" NOT NULL,
    CONSTRAINT "username_length" CHECK (("char_length"("username") >= 3))
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."transactions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "sender_id" "uuid" NOT NULL,
    "receiver_id" "uuid" NOT NULL,
    "concept" "text",
    "amount" double precision,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "sender_username" "text",
    "receiver_username" "text",
    "sender_avatar_url" "text",
    "receiver_avatar_url" "text"
);

ALTER TABLE "public"."transactions" OWNER TO "postgres";

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_iban_key" UNIQUE ("iban");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key" UNIQUE ("username");

ALTER TABLE ONLY "public"."transactions"
    ADD CONSTRAINT "transactions_pkey" PRIMARY KEY ("id");

CREATE OR REPLACE TRIGGER "balance_update_trigger" AFTER INSERT ON "public"."transactions" FOR EACH ROW EXECUTE FUNCTION "public"."update_user_balances"();

CREATE OR REPLACE TRIGGER "iban_insert_trigger" BEFORE INSERT ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."gen_iban_from_string"();

CREATE OR REPLACE TRIGGER "pupulate_usernames_in_transaction_trigger" BEFORE INSERT ON "public"."transactions" FOR EACH ROW EXECUTE FUNCTION "public"."populate_usernames_in_transaction"();

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."transactions"
    ADD CONSTRAINT "transactions_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "public"."profiles"("id");

ALTER TABLE ONLY "public"."transactions"
    ADD CONSTRAINT "transactions_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."profiles"("id");

CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT WITH CHECK (("auth"."uid"() = "id"));

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."transactions" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_access_own_transactions" ON "public"."transactions" USING ((("auth"."uid"() = "sender_id") OR ("auth"."uid"() = "receiver_id")));

CREATE POLICY "user_create_own_transactions" ON "public"."transactions" FOR INSERT WITH CHECK ((("auth"."uid"() = "sender_id") AND ("auth"."uid"() <> "receiver_id")));

CREATE POLICY "user_update_own_profile" ON "public"."profiles" FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."gen_iban_from_string"() TO "anon";
GRANT ALL ON FUNCTION "public"."gen_iban_from_string"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."gen_iban_from_string"() TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."populate_usernames_in_transaction"() TO "anon";
GRANT ALL ON FUNCTION "public"."populate_usernames_in_transaction"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."populate_usernames_in_transaction"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_user_balances"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_user_balances"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_user_balances"() TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

GRANT ALL ON TABLE "public"."transactions" TO "anon";
GRANT ALL ON TABLE "public"."transactions" TO "authenticated";
GRANT ALL ON TABLE "public"."transactions" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
