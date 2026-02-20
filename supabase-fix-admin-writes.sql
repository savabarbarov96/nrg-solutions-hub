-- =====================================================
-- NRGsolutions Supabase Fix Script (non-destructive)
-- =====================================================
-- Purpose:
-- 1) Fix RLS errors when creating/updating/deleting projects and pricing
-- 2) Allow image uploads to the project-images storage bucket
--
-- Run this in Supabase SQL Editor on an existing database.

BEGIN;

-- Ensure additional offer cards table exists
CREATE TABLE IF NOT EXISTS public.pricing_offer_cards (
  id TEXT PRIMARY KEY CHECK (id IN ('offer-8kw', 'offer-12kw', 'offer-15kw')),
  display_order INTEGER NOT NULL DEFAULT 0,
  price_text TEXT NOT NULL,
  hero_image TEXT NOT NULL,
  short_title TEXT NOT NULL,
  includes_text TEXT NOT NULL,
  headline_lines JSONB NOT NULL DEFAULT '[]'::jsonb,
  inverter_name TEXT NOT NULL,
  inverter_model TEXT NOT NULL,
  inverter_power_label TEXT NOT NULL,
  inverter_image TEXT NOT NULL,
  battery_name TEXT NOT NULL,
  battery_model TEXT NOT NULL,
  battery_energy_label TEXT NOT NULL,
  battery_image TEXT NOT NULL,
  panels_name TEXT NOT NULL,
  panels_model TEXT NOT NULL,
  panels_count INTEGER NOT NULL,
  panels_image TEXT NOT NULL,
  cta_text TEXT NOT NULL DEFAULT 'Обади се',
  cta_href TEXT NOT NULL DEFAULT 'tel:+3590894354538',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_pricing_offer_cards_display_order
  ON public.pricing_offer_cards(display_order);

-- Ensure RLS is enabled
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_offer_cards ENABLE ROW LEVEL SECURITY;

-- Ensure table/sequence privileges for Supabase API roles
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.projects TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.project_images TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.pricing_packages TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.pricing_offer_cards TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.projects_id_seq TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.project_images_id_seq TO anon, authenticated;

DO $$
BEGIN
  -- Projects
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'projects'
      AND policyname = 'Allow public read access on projects'
  ) THEN
    CREATE POLICY "Allow public read access on projects"
      ON public.projects FOR SELECT
      TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'projects'
      AND policyname = 'Allow public insert on projects'
  ) THEN
    CREATE POLICY "Allow public insert on projects"
      ON public.projects FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'projects'
      AND policyname = 'Allow public update on projects'
  ) THEN
    CREATE POLICY "Allow public update on projects"
      ON public.projects FOR UPDATE
      TO public
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'projects'
      AND policyname = 'Allow public delete on projects'
  ) THEN
    CREATE POLICY "Allow public delete on projects"
      ON public.projects FOR DELETE
      TO public
      USING (true);
  END IF;

  -- Project Images
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'project_images'
      AND policyname = 'Allow public read access on project_images'
  ) THEN
    CREATE POLICY "Allow public read access on project_images"
      ON public.project_images FOR SELECT
      TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'project_images'
      AND policyname = 'Allow public insert on project_images'
  ) THEN
    CREATE POLICY "Allow public insert on project_images"
      ON public.project_images FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'project_images'
      AND policyname = 'Allow public update on project_images'
  ) THEN
    CREATE POLICY "Allow public update on project_images"
      ON public.project_images FOR UPDATE
      TO public
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'project_images'
      AND policyname = 'Allow public delete on project_images'
  ) THEN
    CREATE POLICY "Allow public delete on project_images"
      ON public.project_images FOR DELETE
      TO public
      USING (true);
  END IF;

  -- Pricing Packages
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'pricing_packages'
      AND policyname = 'Allow public read access on pricing_packages'
  ) THEN
    CREATE POLICY "Allow public read access on pricing_packages"
      ON public.pricing_packages FOR SELECT
      TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'pricing_packages'
      AND policyname = 'Allow public insert on pricing_packages'
  ) THEN
    CREATE POLICY "Allow public insert on pricing_packages"
      ON public.pricing_packages FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'pricing_packages'
      AND policyname = 'Allow public update on pricing_packages'
  ) THEN
    CREATE POLICY "Allow public update on pricing_packages"
      ON public.pricing_packages FOR UPDATE
      TO public
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'pricing_packages'
      AND policyname = 'Allow public delete on pricing_packages'
  ) THEN
    CREATE POLICY "Allow public delete on pricing_packages"
      ON public.pricing_packages FOR DELETE
      TO public
      USING (true);
  END IF;

  -- Pricing Offer Cards
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'pricing_offer_cards'
      AND policyname = 'Allow public read access on pricing_offer_cards'
  ) THEN
    CREATE POLICY "Allow public read access on pricing_offer_cards"
      ON public.pricing_offer_cards FOR SELECT
      TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'pricing_offer_cards'
      AND policyname = 'Allow public insert on pricing_offer_cards'
  ) THEN
    CREATE POLICY "Allow public insert on pricing_offer_cards"
      ON public.pricing_offer_cards FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'pricing_offer_cards'
      AND policyname = 'Allow public update on pricing_offer_cards'
  ) THEN
    CREATE POLICY "Allow public update on pricing_offer_cards"
      ON public.pricing_offer_cards FOR UPDATE
      TO public
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'pricing_offer_cards'
      AND policyname = 'Allow public delete on pricing_offer_cards'
  ) THEN
    CREATE POLICY "Allow public delete on pricing_offer_cards"
      ON public.pricing_offer_cards FOR DELETE
      TO public
      USING (true);
  END IF;
END;
$$;

-- Storage bucket for project images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE
SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'Public can view project images bucket objects'
  ) THEN
    CREATE POLICY "Public can view project images bucket objects"
      ON storage.objects FOR SELECT
      TO public
      USING (bucket_id = 'project-images');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'Public can upload project images bucket objects'
  ) THEN
    CREATE POLICY "Public can upload project images bucket objects"
      ON storage.objects FOR INSERT
      TO public
      WITH CHECK (bucket_id = 'project-images');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'Public can update project images bucket objects'
  ) THEN
    CREATE POLICY "Public can update project images bucket objects"
      ON storage.objects FOR UPDATE
      TO public
      USING (bucket_id = 'project-images')
      WITH CHECK (bucket_id = 'project-images');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'Public can delete project images bucket objects'
  ) THEN
    CREATE POLICY "Public can delete project images bucket objects"
      ON storage.objects FOR DELETE
      TO public
      USING (bucket_id = 'project-images');
  END IF;
END;
$$;

COMMIT;
