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
      contacts: {
        Row: {
          id: number
          created_at: string
          name: string
          email: string
          message: string
          status: string
          replied_at: string | null
          notes: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
          email: string
          message: string
          status?: string
          replied_at?: string | null
          notes?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          email?: string
          message?: string
          status?: string
          replied_at?: string | null
          notes?: string | null
        }
      }
      projects: {
        Row: {
          id: number
          created_at: string
          title: string
          description: string
          image_url: string | null
          technologies: string[]
          live_url: string | null
          source_url: string | null
          featured: boolean
          is_mobile_app: boolean
        }
        Insert: {
          id?: number
          created_at?: string
          title: string
          description: string
          image_url?: string | null
          technologies: string[]
          live_url?: string | null
          source_url?: string | null
          featured?: boolean
          is_mobile_app?: boolean
        }
        Update: {
          id?: number
          created_at?: string
          title?: string
          description?: string
          image_url?: string | null
          technologies?: string[]
          live_url?: string | null
          source_url?: string | null
          featured?: boolean
          is_mobile_app?: boolean
        }
      }
      skills: {
        Row: {
          id: number
          created_at: string
          category: string
          name: string
          level: number
        }
        Insert: {
          id?: number
          created_at?: string
          category: string
          name: string
          level: number
        }
        Update: {
          id?: number
          created_at?: string
          category?: string
          name?: string
          level?: number
        }
      }
      personal_info: {
        Row: {
          id: number
          created_at: string
          name: string
          title: string
          email: string
          location: string
          bio: string
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
          title: string
          email: string
          location: string
          bio: string
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          title?: string
          email?: string
          location?: string
          bio?: string
        }
      }
      social_links: {
        Row: {
          id: number
          created_at: string
          platform: string
          url: string
        }
        Insert: {
          id?: number
          created_at?: string
          platform: string
          url: string
        }
        Update: {
          id?: number
          created_at?: string
          platform?: string
          url?: string
        }
      }
      experiences: {
        Row: {
          id: number
          created_at: string
          title: string
          company: string
          location: string
          period: string
          description: string[]
        }
        Insert: {
          id?: number
          created_at?: string
          title: string
          company: string
          location: string
          period: string
          description: string[]
        }
        Update: {
          id?: number
          created_at?: string
          title?: string
          company?: string
          location?: string
          period?: string
          description?: string[]
        }
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
  }
} 