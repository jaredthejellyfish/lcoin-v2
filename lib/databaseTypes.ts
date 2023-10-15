import { Database } from "./database";

export type UserProfile = Database["public"]["Tables"]["profiles"]["Row"];
export type Transaction = Database["public"]["Tables"]["transactions"]["Row"];