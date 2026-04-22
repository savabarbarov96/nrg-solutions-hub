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
          display_order: number
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
          display_order?: number
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
          display_order?: number
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
          rotation: number
          created_at: string
        }
        Insert: {
          id?: never
          project_id: number
          image_url: string
          display_order?: number
          rotation?: number
          created_at?: string
        }
        Update: {
          id?: never
          project_id?: number
          image_url?: string
          display_order?: number
          rotation?: number
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
      pricing_offer_cards: {
        Row: {
          id: string
          category: 'mono-lv' | '3phase-lv' | '3phase-hv'
          display_order: number
          price_text: string
          price_note: string | null
          hero_image: string
          short_title: string
          includes_text: string
          headline_lines: string[]
          inverter_name: string
          inverter_model: string
          inverter_power_label: string
          inverter_image: string
          battery_name: string
          battery_model: string
          battery_energy_label: string
          battery_image: string
          panels_name: string
          panels_model: string
          panels_count: number
          panels_image: string
          cta_text: string
          cta_href: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          category: 'mono-lv' | '3phase-lv' | '3phase-hv'
          display_order?: number
          price_text: string
          price_note?: string | null
          hero_image: string
          short_title: string
          includes_text: string
          headline_lines: string[]
          inverter_name: string
          inverter_model: string
          inverter_power_label: string
          inverter_image: string
          battery_name: string
          battery_model: string
          battery_energy_label: string
          battery_image: string
          panels_name: string
          panels_model: string
          panels_count: number
          panels_image: string
          cta_text?: string
          cta_href?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category?: 'mono-lv' | '3phase-lv' | '3phase-hv'
          display_order?: number
          price_text?: string
          price_note?: string | null
          hero_image?: string
          short_title?: string
          includes_text?: string
          headline_lines?: string[]
          inverter_name?: string
          inverter_model?: string
          inverter_power_label?: string
          inverter_image?: string
          battery_name?: string
          battery_model?: string
          battery_energy_label?: string
          battery_image?: string
          panels_name?: string
          panels_model?: string
          panels_count?: number
          panels_image?: string
          cta_text?: string
          cta_href?: string
          created_at?: string
          updated_at?: string
        }
      }
      questionnaire_submissions: {
        Row: {
          id: number
          name: string
          email: string
          phone: string | null
          grid_type: string | null
          purpose: string | null
          power_needed: string | null
          system_type: string | null
          mounting_type: string | null
          construction_stage: string | null
          property_type: string | null
          location: string | null
          created_at: string
        }
        Insert: {
          id?: never
          name: string
          email: string
          phone?: string | null
          grid_type?: string | null
          purpose?: string | null
          power_needed?: string | null
          system_type?: string | null
          mounting_type?: string | null
          construction_stage?: string | null
          property_type?: string | null
          location?: string | null
          created_at?: string
        }
        Update: {
          id?: never
          name?: string
          email?: string
          phone?: string | null
          grid_type?: string | null
          purpose?: string | null
          power_needed?: string | null
          system_type?: string | null
          mounting_type?: string | null
          construction_stage?: string | null
          property_type?: string | null
          location?: string | null
          created_at?: string
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

export type PricingOfferCardId = Database['public']['Tables']['pricing_offer_cards']['Row']['id']
export type PricingOfferCard = Database['public']['Tables']['pricing_offer_cards']['Row']
export type PricingOfferCardInsert = Database['public']['Tables']['pricing_offer_cards']['Insert']
export type PricingOfferCardUpdate = Database['public']['Tables']['pricing_offer_cards']['Update']

export type QuestionnaireSubmission = Database['public']['Tables']['questionnaire_submissions']['Row']
export type QuestionnaireSubmissionInsert = Database['public']['Tables']['questionnaire_submissions']['Insert']
