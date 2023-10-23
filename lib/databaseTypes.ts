import type { Database } from './database';

export type UserProfile = Database['public']['Tables']['profiles']['Row'];
export type Transaction = Database['public']['Tables']['transactions']['Row'];

export type ExtendedTransaction = Transaction & {
  sender: {
    avatar_url: string | null;
    username: string | null;
  } | null;
  receiver: {
    avatar_url: string | null;
    username: string | null;
  } | null;
};
