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
      users: {
        Row: {
          id: string
          created_at: string
          name: string
          phone: string | null
          last_login: string | null
          auth_provider: string
          total_points: number
          total_tokens_used: number
        }
        Insert: {
          id: string
          created_at?: string
          name: string
          phone?: string | null
          last_login?: string | null
          auth_provider?: string
          total_points?: number
          total_tokens_used?: number
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          phone?: string | null
          last_login?: string | null
          auth_provider?: string
          total_points?: number
          total_tokens_used?: number
        }
      }
      consultations: {
        Row: {
          id: number
          user_id: string
          tool_used: string
          input_data: Json
          result_data: Json
          tokens_used: number
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          tool_used: string
          input_data: Json
          result_data: Json
          tokens_used?: number
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          tool_used?: string
          input_data?: Json
          result_data?: Json
          tokens_used?: number
          created_at?: string
        }
      }
      gallery_posts: {
        Row: {
          id: number
          user_id: string
          before_image_url: string
          after_image_url: string
          description: string
          likes_count: number
          points_awarded: number
          created_at: string
          is_approved: boolean
        }
        Insert: {
          id?: number
          user_id: string
          before_image_url: string
          after_image_url: string
          description: string
          likes_count?: number
          points_awarded?: number
          created_at?: string
          is_approved?: boolean
        }
        Update: {
          id?: number
          user_id?: string
          before_image_url?: string
          after_image_url?: string
          description?: string
          likes_count?: number
          points_awarded?: number
          created_at?: string
          is_approved?: boolean
        }
      }
      user_interactions: {
        Row: {
          id: number
          user_id: string
          post_id: number
          interaction_type: string
          comment_text: string | null
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          post_id: number
          interaction_type: string
          comment_text?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          post_id?: number
          interaction_type?: string
          comment_text?: string | null
          created_at?: string
        }
      }
    }
  }
}