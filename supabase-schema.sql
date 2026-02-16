-- =====================================================
-- NRGsolutions Supabase Database Schema
-- =====================================================

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS project_images CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS pricing_packages CASCADE;

-- =====================================================
-- Table: projects
-- =====================================================
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  city TEXT NOT NULL,
  power TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('home', 'business')),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  completed_scope JSONB NOT NULL DEFAULT '[]'::jsonb,
  solis_note TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for projects table
CREATE INDEX idx_projects_type ON projects(type);
CREATE INDEX idx_projects_city ON projects(city);
CREATE INDEX idx_projects_slug ON projects(slug);

-- =====================================================
-- Table: project_images
-- =====================================================
CREATE TABLE project_images (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_project_images_project_id ON project_images(project_id);

-- =====================================================
-- Table: pricing_packages
-- =====================================================
CREATE TABLE pricing_packages (
  id TEXT PRIMARY KEY CHECK (id IN ('8kw', '12kw', '15kw')),
  name TEXT NOT NULL,
  power TEXT NOT NULL,
  price_eur INTEGER NOT NULL,
  description TEXT NOT NULL,
  ideal_for TEXT NOT NULL,
  popular BOOLEAN DEFAULT false,
  includes JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- Enable Row Level Security (RLS)
-- =====================================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_packages ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS Policies - Public Access (for anon + authenticated)
-- NOTE: this project uses client-side admin auth, so writes must be
-- allowed to the API roles or create/update will fail with RLS errors.
-- =====================================================

-- Projects policies
CREATE POLICY "Allow public read access on projects"
  ON projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert on projects"
  ON projects FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update on projects"
  ON projects FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on projects"
  ON projects FOR DELETE
  TO public
  USING (true);

-- Project images policies
CREATE POLICY "Allow public read access on project_images"
  ON project_images FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert on project_images"
  ON project_images FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update on project_images"
  ON project_images FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on project_images"
  ON project_images FOR DELETE
  TO public
  USING (true);

-- Pricing packages policies
CREATE POLICY "Allow public read access on pricing_packages"
  ON pricing_packages FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert on pricing_packages"
  ON pricing_packages FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update on pricing_packages"
  ON pricing_packages FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on pricing_packages"
  ON pricing_packages FOR DELETE
  TO public
  USING (true);

-- Table and sequence grants for Supabase API roles
GRANT SELECT, INSERT, UPDATE, DELETE ON projects TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON project_images TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON pricing_packages TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE projects_id_seq TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE project_images_id_seq TO anon, authenticated;

-- =====================================================
-- Seed Data: Projects
-- =====================================================
INSERT INTO projects (slug, city, power, type, title, summary, completed_scope, solis_note) VALUES
(
  'sofia-house-12kw',
  'София',
  '12 kW',
  'home',
  'Покривна система за еднофамилна къща',
  'Оптимизирана покривна инсталация за намаляване на месечните сметки и по-висока енергийна независимост.',
  '["Ориентировъчна и финална оферта", "Пълна доставка и монтаж", "Протокол и обучение за Solis"]'::jsonb,
  'Клиентът следи производство и консумация в реално време през Solis.'
),
(
  'plovdiv-business-15kw',
  'Пловдив',
  '15 kW',
  'business',
  'Система за складова база',
  'Решение за по-предвидими енергийни разходи и оптимизация на бизнес натоварванията.',
  '["Оглед и оценка на профил на консумация", "Доставка, монтаж и пуск", "Настройка на мониторинг и дистанционна поддръжка"]'::jsonb,
  'Бизнес екипът получава известия за аномалии и ключови показатели в Solis.'
),
(
  'varna-house-8kw',
  'Варна',
  '8 kW',
  'home',
  'Компактна система за крайградска къща',
  'Практична конфигурация за стабилно дневно производство при стандартно домакинско натоварване.',
  '["Оферта и оглед на място", "Монтаж с алуминиева конструкция", "Финализиране с протокол и Solis демо"]'::jsonb,
  'Системата позволява лесно бъдещо надграждане с допълнителна батерия.'
),
(
  'stara-zagora-business-20kw',
  'Стара Загора',
  '20 kW',
  'business',
  'Бизнес инсталация с възможност за надграждане',
  'Конфигурация за производствен обект с фокус върху надеждност и предвидими разходи.',
  '["Планиране по фирмен товаров профил", "Монтаж и пуск в експлоатация", "Дистанционна диагностика и поддръжка"]'::jsonb,
  'Настроени са роли за достъп на управител и технически персонал.'
),
(
  'burgas-home-12kw',
  'Бургас',
  '12 kW',
  'home',
  'Домашна система с батерия',
  'Баланс между дневно производство и вечерно потребление чрез батерийно съхранение.',
  '["Оглед и финална конфигурация", "Професионален монтаж", "Обучение и предаване с протокол"]'::jsonb,
  'Клиентът използва Solis за ежедневен контрол на потреблението.'
),
(
  'ruse-home-10kw',
  'Русе',
  '10 kW',
  'home',
  'Персонализирана система за дом',
  'Проект с акцент върху сезонна стабилност и резерв за бъдещо разширение.',
  '["Ориентировъчна оферта", "Монтаж и настройки", "Предаване с Solis демонстрация"]'::jsonb,
  'Системата е настроена за прозрачност в месечните отчети.'
);

-- =====================================================
-- Seed Data: Project Images (using existing Unsplash URLs)
-- =====================================================
INSERT INTO project_images (project_id, image_url, display_order) VALUES
(1, 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=800&fit=crop', 0),
(2, 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1200&h=800&fit=crop', 0),
(3, 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1200&h=800&fit=crop', 0),
(4, 'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=1200&h=800&fit=crop', 0),
(5, 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=1200&h=800&fit=crop', 0),
(6, 'https://images.unsplash.com/photo-1595437193398-f24279553f4f?w=1200&h=800&fit=crop', 0);

-- =====================================================
-- Seed Data: Pricing Packages
-- =====================================================
INSERT INTO pricing_packages (id, name, power, price_eur, description, ideal_for, popular, includes) VALUES
(
  '8kw',
  'Старт',
  '8 kW',
  5900,
  'Подходящ за къщи с умерена консумация и базово батерийно съхранение.',
  'Къщи с 2-3 души домакинство',
  false,
  '["Хибриден инвертор", "Соларни панели", "Батерия", "DC/AC кабели", "AC защити", "Алуминиева конструкция, профили, клеми и държачи", "Пуск и демонстрация в Solis"]'::jsonb
),
(
  '12kw',
  'Оптимум',
  '12 kW',
  7750,
  'Балансирана конфигурация за по-големи домове и малки обекти.',
  'Къщи с по-висока консумация и малки бизнес обекти',
  true,
  '["Хибриден инвертор", "Соларни панели", "Батерия", "DC/AC кабели", "AC защити", "Алуминиева конструкция, профили, клеми и държачи", "Пуск и демонстрация в Solis"]'::jsonb
),
(
  '15kw',
  'Макс',
  '15 kW',
  9400,
  'Високопроизводителна система за големи имоти и бизнес потребление.',
  'Големи къщи, предприятия и обекти с пиково натоварване',
  false,
  '["Хибриден инвертор", "Соларни панели", "Батерия", "DC/AC кабели", "AC защити", "Алуминиева конструкция, профили, клеми и държачи", "Пуск и демонстрация в Solis"]'::jsonb
);

-- =====================================================
-- Storage setup for project images
-- =====================================================

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

DROP POLICY IF EXISTS "Public can view project images bucket objects" ON storage.objects;
DROP POLICY IF EXISTS "Public can upload project images bucket objects" ON storage.objects;
DROP POLICY IF EXISTS "Public can update project images bucket objects" ON storage.objects;
DROP POLICY IF EXISTS "Public can delete project images bucket objects" ON storage.objects;

CREATE POLICY "Public can view project images bucket objects"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'project-images');

CREATE POLICY "Public can upload project images bucket objects"
  ON storage.objects FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Public can update project images bucket objects"
  ON storage.objects FOR UPDATE
  TO public
  USING (bucket_id = 'project-images')
  WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Public can delete project images bucket objects"
  ON storage.objects FOR DELETE
  TO public
  USING (bucket_id = 'project-images');

-- =====================================================
-- Verification Queries
-- =====================================================
-- SELECT * FROM projects;
-- SELECT * FROM project_images;
-- SELECT * FROM pricing_packages;
