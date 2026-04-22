-- =====================================================
-- Pricing Offer Cards v2 — 6 fixed offers, 3 categories
-- =====================================================
-- Applies to: pricing_offer_cards (from supabase-schema.sql)
-- Run this once in the Supabase SQL editor after the initial schema.

-- 1. Drop the old fixed-id CHECK constraint (allow new ids)
ALTER TABLE pricing_offer_cards DROP CONSTRAINT IF EXISTS pricing_offer_cards_id_check;

-- 2. Add category column (constrained to the 3 allowed values)
ALTER TABLE pricing_offer_cards
  ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'mono-lv';

ALTER TABLE pricing_offer_cards DROP CONSTRAINT IF EXISTS pricing_offer_cards_category_check;
ALTER TABLE pricing_offer_cards
  ADD CONSTRAINT pricing_offer_cards_category_check
  CHECK (category IN ('mono-lv', '3phase-lv', '3phase-hv'));

-- 3. Add optional price_note column (e.g. "без ДДС")
ALTER TABLE pricing_offer_cards
  ADD COLUMN IF NOT EXISTS price_note TEXT;

-- 4. Re-apply an id CHECK that permits the 6 new ids (edit-only, fixed set)
ALTER TABLE pricing_offer_cards
  ADD CONSTRAINT pricing_offer_cards_id_check
  CHECK (id IN (
    'offer-mono-lv-6kw', 'offer-mono-lv-12kw',
    'offer-3p-lv-12kw', 'offer-3p-lv-15kw',
    'offer-3p-hv-8kw', 'offer-3p-hv-20kw'
  ));

-- 5. Helpful index for category filtering
CREATE INDEX IF NOT EXISTS idx_pricing_offer_cards_category
  ON pricing_offer_cards(category, display_order);

-- 6. Wipe old rows and insert the 6 new ones
DELETE FROM pricing_offer_cards;

INSERT INTO pricing_offer_cards (
  id, category, display_order, price_text, price_note, hero_image, short_title, includes_text, headline_lines,
  inverter_name, inverter_model, inverter_power_label, inverter_image,
  battery_name, battery_model, battery_energy_label, battery_image,
  panels_name, panels_model, panels_count, panels_image,
  cta_text, cta_href
) VALUES
-- Монофазни нисковолтови
(
  'offer-mono-lv-6kw', 'mono-lv', 1, '6 320 €', 'без ДДС',
  '/assets/offers/hero-1.webp',
  'ФЕЦ + Батерия 6 kW',
  'Конструкция, кабели и монтаж',
  '["МОНОФАЗНА ХИБРИДНА","СИСТЕМА ~7.9kWp","БАТЕРИЯ 16.07kWh","С ВКЛЮЧЕН МОНТАЖ"]'::jsonb,
  'Solis', 'S6-EH1P6K-L-PLUS', '6 kW', '/assets/products/inverters/solis-s6-eh1p-l-plus.png',
  'Dyness', 'LV PowerBrick Plus 16.07kWh 51.2V/314Ah IP65 Heating', '16.07 kWh', '/assets/products/batteries/dyness-lv-powerbrick-plus.jpg',
  'SolarNplus', 'Sirius 440W Topcon N-type', 18, '/assets/products/panels/ja-solar-540w.png',
  'Обади се', 'tel:+3590894354538'
),
(
  'offer-mono-lv-12kw', 'mono-lv', 2, '8 350 €', 'без ДДС',
  '/assets/offers/hero-2.webp',
  'ФЕЦ + Батерия 12 kW',
  'Конструкция, кабели и монтаж',
  '["МОНОФАЗНА ХИБРИДНА","СИСТЕМА ~12.3kWp","БАТЕРИЯ 16.07kWh","С ВКЛЮЧЕН МОНТАЖ"]'::jsonb,
  'Solis', 'S6-EH1P(12-16)K03-NV-YD-L', '12 kW', '/assets/products/inverters/solis-s6-eh1p-l-plus.png',
  'Dyness', 'LV PowerBrick Plus 16.07kWh 51.2V/314Ah IP65 Heating', '16.07 kWh', '/assets/products/batteries/dyness-lv-powerbrick-plus.jpg',
  'SolarNplus', 'Sirius 440W Topcon N-type', 28, '/assets/products/panels/ja-solar-540w.png',
  'Обади се', 'tel:+3590894354538'
),
-- Трифазни нисковолтови
(
  'offer-3p-lv-12kw', '3phase-lv', 3, '8 300 €', 'без ДДС',
  '/assets/offers/hero-3.webp',
  'ФЕЦ + Батерия 12 kW',
  'Конструкция, кабели и монтаж',
  '["ТРИФАЗНА ХИБРИДНА","СИСТЕМА ~12.18kWp","БАТЕРИЯ 16.07kWh","С ВКЛЮЧЕН МОНТАЖ"]'::jsonb,
  'Solis', 'S6-EH3P12K-H-EU', '12 kW', '/assets/products/inverters/solis-s6-eh3p12k-h-eu.png',
  'Dyness', 'LV PowerBrick Plus 16.07kWh 51.2V/314Ah IP65 Heating', '16.07 kWh', '/assets/products/batteries/dyness-lv-powerbrick-plus.jpg',
  'SolarNplus', 'Sirius 580W Topcon N-type', 21, '/assets/products/panels/ja-solar-540w.png',
  'Обади се', 'tel:+3590894354538'
),
(
  'offer-3p-lv-15kw', '3phase-lv', 4, '9 390 €', 'без ДДС',
  '/assets/offers/hero-1.webp',
  'ФЕЦ + 2× Батерия 15 kW',
  'Конструкция, кабели и монтаж',
  '["ТРИФАЗНА ХИБРИДНА","СИСТЕМА ~15.08kWp","2× БАТЕРИЯ 16.07kWh","С ВКЛЮЧЕН МОНТАЖ"]'::jsonb,
  'Solis', 'S6 15kW Трифазен хибриден', '15 kW', '/assets/products/inverters/solis-s6-eh3p12k-h-eu.png',
  'Dyness', '2× LV PowerBrick Plus 16.07kWh 51.2V/314Ah IP65 Heating', '2× 16.07 kWh', '/assets/products/batteries/dyness-lv-powerbrick-plus.jpg',
  'SolarNplus', 'Sirius 580W Topcon N-type', 26, '/assets/products/panels/ja-solar-540w.png',
  'Обади се', 'tel:+3590894354538'
),
-- Трифазни високоволтови
(
  'offer-3p-hv-8kw', '3phase-hv', 5, '7 800 €', 'без ДДС',
  '/assets/offers/hero-2.webp',
  'ФЕЦ + HV Батерия 8 kW',
  'Конструкция, кабели и монтаж',
  '["HV ХИБРИДНА","СИСТЕМА ~10kWp","HV БАТЕРИЯ 15.4kWh","С ВКЛЮЧЕН МОНТАЖ"]'::jsonb,
  'Solis', 'S6-EH1P8K-L-PLUS', '8 kW', '/assets/products/inverters/solis-s6-eh1p8k-l-plus.png',
  'Dyness', 'STACK100-3S 15.4kWh high voltage', '15.4 kWh', '/assets/products/batteries/dyness-stack100-3s.webp',
  'SolarNplus', 'Sirius 580W Topcon N-type', 17, '/assets/products/panels/ja-solar-540w.png',
  'Обади се', 'tel:+3590894354538'
),
(
  'offer-3p-hv-20kw', '3phase-hv', 6, '12 800 €', 'без ДДС',
  '/assets/offers/hero-3.webp',
  'ФЕЦ + HV Батерия 20 kW',
  'Конструкция, кабели и монтаж',
  '["HV ТРИФАЗНА ХИБРИДНА","СИСТЕМА ~20.3kWp","HV БАТЕРИЯ 20.6kWh","С ВКЛЮЧЕН МОНТАЖ"]'::jsonb,
  'Solis', 'S6-EH3P20K-H', '20 kW', '/assets/products/inverters/solis-s6-eh3p12k-h-eu.png',
  'Dyness', 'STACK100-3S 20.6kWh high voltage', '20.6 kWh', '/assets/products/batteries/dyness-stack100-3s.webp',
  'SolarNplus', 'Sirius 580W Topcon N-type', 35, '/assets/products/panels/ja-solar-540w.png',
  'Обади се', 'tel:+3590894354538'
);

-- 7. Sanity check
SELECT id, category, display_order, price_text, price_note, short_title
FROM pricing_offer_cards
ORDER BY display_order;
