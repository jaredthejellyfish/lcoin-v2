export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          balance: number
          full_name: string | null
          iban: string
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          balance?: number
          full_name?: string | null
          iban?: string
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          balance?: number
          full_name?: string | null
          iban?: string
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      transactions: {
        Row: {
          amount: number | null
          concept: string | null
          created_at: string
          id: string
          receiver_avatar_url: string | null
          receiver_id: string
          receiver_username: string | null
          sender_avatar_url: string | null
          sender_id: string
          sender_username: string | null
        }
        Insert: {
          amount?: number | null
          concept?: string | null
          created_at?: string
          id?: string
          receiver_avatar_url?: string | null
          receiver_id: string
          receiver_username?: string | null
          sender_avatar_url?: string | null
          sender_id: string
          sender_username?: string | null
        }
        Update: {
          amount?: number | null
          concept?: string | null
          created_at?: string
          id?: string
          receiver_avatar_url?: string | null
          receiver_id?: string
          receiver_username?: string | null
          sender_avatar_url?: string | null
          sender_id?: string
          sender_username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_receiver_id_fkey"
            columns: ["receiver_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_sender_id_fkey"
            columns: ["sender_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
