-- NRGsolution: Combined migration for customer meeting features
-- Run against Supabase SQL editor

-- F1: Image rotation
ALTER TABLE project_images ADD COLUMN IF NOT EXISTS rotation INTEGER NOT NULL DEFAULT 0;

-- F2: Questionnaire submissions
CREATE TABLE IF NOT EXISTS questionnaire_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  grid_type TEXT,
  purpose TEXT,
  power_needed TEXT,
  system_type TEXT,
  mounting_type TEXT,
  construction_stage TEXT,
  property_type TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE questionnaire_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert on questionnaire_submissions"
  ON questionnaire_submissions FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public read on questionnaire_submissions"
  ON questionnaire_submissions FOR SELECT TO public USING (true);
GRANT SELECT, INSERT ON questionnaire_submissions TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE questionnaire_submissions_id_seq TO anon, authenticated;

-- F5: Project ordering
ALTER TABLE projects ADD COLUMN IF NOT EXISTS display_order INTEGER NOT NULL DEFAULT 0;
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);
-- Set sequential default order for existing rows to avoid all-zero ties:
UPDATE projects SET display_order = sub.rn FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) AS rn FROM projects
) sub WHERE projects.id = sub.id;

-- F6: Additional editable pricing offer cards
CREATE TABLE IF NOT EXISTS pricing_offer_cards (
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
  ON pricing_offer_cards(display_order);

ALTER TABLE pricing_offer_cards ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'pricing_offer_cards'
      AND policyname = 'Allow public read access on pricing_offer_cards'
  ) THEN
    CREATE POLICY "Allow public read access on pricing_offer_cards"
      ON pricing_offer_cards FOR SELECT TO public USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'pricing_offer_cards'
      AND policyname = 'Allow public insert on pricing_offer_cards'
  ) THEN
    CREATE POLICY "Allow public insert on pricing_offer_cards"
      ON pricing_offer_cards FOR INSERT TO public WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'pricing_offer_cards'
      AND policyname = 'Allow public update on pricing_offer_cards'
  ) THEN
    CREATE POLICY "Allow public update on pricing_offer_cards"
      ON pricing_offer_cards FOR UPDATE TO public USING (true) WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'pricing_offer_cards'
      AND policyname = 'Allow public delete on pricing_offer_cards'
  ) THEN
    CREATE POLICY "Allow public delete on pricing_offer_cards"
      ON pricing_offer_cards FOR DELETE TO public USING (true);
  END IF;
END;
$$;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE pricing_offer_cards TO anon, authenticated;

INSERT INTO pricing_offer_cards (
  id,
  display_order,
  price_text,
  hero_image,
  short_title,
  includes_text,
  headline_lines,
  inverter_name,
  inverter_model,
  inverter_power_label,
  inverter_image,
  battery_name,
  battery_model,
  battery_energy_label,
  battery_image,
  panels_name,
  panels_model,
  panels_count,
  panels_image,
  cta_text,
  cta_href
)
VALUES
(
  'offer-8kw',
  1,
  '6650€ с ДДС',
  '/assets/offers/hero-1.webp',
  'ФЕЦ + Батерия 8 kW',
  'Конструкция и кабели',
  '["ТРИФАЗНА ХИБРИДНА", "СИСТЕМА ~8.1kWp", "БАТЕРИЯ 10.24kWh", "С ВКЛЮЧЕН МОНТАЖ"]'::jsonb,
  'Solis',
  'S6-EH3P8K02-NV-YD-L',
  '8 kW',
  '/assets/products/inverters/Изображение-от-WhatsApp-на-2025-03-21-в-17.04.50_f9ec5397.jpg',
  'Dyness',
  'LV Powerbox G2 10.24kWh 51.2V/200Ah Heating',
  '10.24 kWh',
  '/assets/products/batteries/8230-01-0050_1.jpg',
  'JA Solar',
  '540W',
  15,
  '/assets/products/panels/ja-solar-540w.png',
  'Обади се',
  'tel:+3590894354538'
),
(
  'offer-12kw',
  2,
  '7750€ с ДДС',
  '/assets/offers/hero-2.webp',
  'ФЕЦ + Батерия 12 kW (Deye)',
  'Конструкция и кабели',
  '["ТРИФАЗНА ХИБРИДНА", "СИСТЕМА ~12.4kWp", "БАТЕРИЯ 13.44kWh", "С ВКЛЮЧЕН МОНТАЖ"]'::jsonb,
  'Deye',
  'SUN-12K-SG05 LP3-EU-SM2',
  '12 kW',
  '/assets/products/inverters/15kwSolisINverter.png',
  'Ritar',
  'BAT-15KWH-48V 13.44kWh',
  '13.44 kWh',
  '/assets/products/batteries/8230-01-0050_1.jpg',
  'JA Solar',
  '540W',
  23,
  '/assets/products/panels/ja-solar-540w.png',
  'Обади се',
  'tel:+3590894354538'
),
(
  'offer-15kw',
  3,
  '8700€ с ДДС',
  '/assets/offers/hero-3.webp',
  'ФЕЦ + Батерия 12 kW (Solis)',
  'Конструкция и кабели',
  '["ТРИФАЗНА ХИБРИДНА", "СИСТЕМА ~12.4kWp", "БАТЕРИЯ 14.33kWh", "С ВКЛЮЧЕН МОНТАЖ"]'::jsonb,
  'Solis',
  'S6-EH3P12K02-NV-YD-L',
  '12 kW',
  '/assets/products/inverters/12kwSolisInverter.png',
  'Dyness',
  'LV PowerBrick 14.33kWh 51.2V/280Ah Heating',
  '14.33 kWh',
  '/assets/products/batteries/dyness-power-brick 14KW.jpg',
  'JA Solar',
  '540W',
  23,
  '/assets/products/panels/ja-solar-540w.png',
  'Обади се',
  'tel:+3590894354538'
)
ON CONFLICT (id) DO UPDATE SET
  display_order = EXCLUDED.display_order,
  price_text = EXCLUDED.price_text,
  hero_image = EXCLUDED.hero_image,
  short_title = EXCLUDED.short_title,
  includes_text = EXCLUDED.includes_text,
  headline_lines = EXCLUDED.headline_lines,
  inverter_name = EXCLUDED.inverter_name,
  inverter_model = EXCLUDED.inverter_model,
  inverter_power_label = EXCLUDED.inverter_power_label,
  inverter_image = EXCLUDED.inverter_image,
  battery_name = EXCLUDED.battery_name,
  battery_model = EXCLUDED.battery_model,
  battery_energy_label = EXCLUDED.battery_energy_label,
  battery_image = EXCLUDED.battery_image,
  panels_name = EXCLUDED.panels_name,
  panels_model = EXCLUDED.panels_model,
  panels_count = EXCLUDED.panels_count,
  panels_image = EXCLUDED.panels_image,
  cta_text = EXCLUDED.cta_text,
  cta_href = EXCLUDED.cta_href,
  updated_at = NOW();
