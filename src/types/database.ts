export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: number
          slug: string
          city: string
          power: string
          type: 'home' | 'business'
          title: string
          summary: string
          completed_scope: string[]
          solis_note: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: never
          slug: string
          city: string
          power: string
          type: 'home' | 'business'
          title: string
          summary: string
          completed_scope: string[]
          solis_note: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: never
          slug?: string
          city?: string
          power?: string
          type?: 'home' | 'business'
          title?: string
          summary?: string
          completed_scope?: string[]
          solis_note?: string
          created_at?: string
          updated_at?: string
        }
      }
      project_images: {
        Row: {
          id: number
          project_id: number
          image_url: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: never
          project_id: number
          image_url: string
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: never
          project_id?: number
          image_url?: string
          display_order?: number
          created_at?: string
        }
      }
      pricing_packages: {
        Row: {
          id: '8kw' | '12kw' | '15kw'
          name: string
          power: string
          price_eur: number
          description: string
          ideal_for: string
          popular: boolean
          includes: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id: '8kw' | '12kw' | '15kw'
          name: string
          power: string
          price_eur: number
          description: string
          ideal_for: string
          popular?: boolean
          includes: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: '8kw' | '12kw' | '15kw'
          name?: string
          power?: string
          price_eur?: number
          description?: string
          ideal_for?: string
          popular?: boolean
          includes?: string[]
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Convenience types
export type Project = Database['public']['Tables']['projects']['Row']
export type ProjectInsert = Database['public']['Tables']['projects']['Insert']
export type ProjectUpdate = Database['public']['Tables']['projects']['Update']

export type ProjectImage = Database['public']['Tables']['project_images']['Row']
export type ProjectImageInsert = Database['public']['Tables']['project_images']['Insert']
export type ProjectImageUpdate = Database['public']['Tables']['project_images']['Update']

export type PricingPackage = Database['public']['Tables']['pricing_packages']['Row']
export type PricingPackageInsert = Database['public']['Tables']['pricing_packages']['Insert']
export type PricingPackageUpdate = Database['public']['Tables']['pricing_packages']['Update']
