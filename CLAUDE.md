# NRGsolution - Solar Installation Company Website

## Project Overview
Bulgarian solar panel installation company website with admin panel for managing projects and pricing.

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite 5
- **Styling**: Tailwind CSS 3.4 + shadcn/ui (Radix UI primitives)
- **State**: TanStack React Query v5, React Hook Form + Zod
- **Animation**: Framer Motion, CSS marquee animations
- **Backend**: Supabase (PostgreSQL + Storage + Auth)
- **Email**: Resend API (client-side, for questionnaire notifications)
- **Routing**: React Router DOM v6 (Bulgarian URL paths like `/проекти`)

## Key Directories
```
nrg-solutions-hub/
├── src/
│   ├── components/
│   │   ├── admin/          # AdminLayout, ProjectForm, ProjectImageManager, ProtectedRoute
│   │   ├── home/           # Homepage sections: HeroSection, BrandsSection, ContactSection,
│   │   │                   # ProjectsSection, WhyUsSection, CertificatesSection, FAQSection,
│   │   │                   # ProcessSection, QuestionnaireSection
│   │   ├── pricing/        # PricingOfferGrid
│   │   ├── layout/         # Header, Footer, Layout wrapper
│   │   └── ui/             # shadcn/ui components + single-pricing-card-1.tsx
│   ├── pages/
│   │   ├── admin/          # Login, Dashboard, ProjectsList, ProjectEdit, ProjectNew, PricingManagement
│   │   └── *.tsx           # Public pages: Index, Services, Projects, ProjectDetails, Pricing, Contacts
│   ├── services/api.ts     # All Supabase CRUD operations + Resend email
│   ├── hooks/              # useProjects.ts, usePricing.ts, useQuestionnaire.ts (React Query hooks)
│   ├── contexts/           # AdminAuthContext.tsx (localStorage-based 24h sessions)
│   ├── types/database.ts   # TypeScript types matching Supabase schema
│   ├── content/site-content.ts  # Static data: brands, projects seed, packages, FAQs, promos
│   └── lib/supabase.ts     # Supabase client initialization
├── public/
│   ├── projects-optimized/ # Static project images (webp)
│   └── brands/             # Brand logo PNGs (8 logos)
├── supabase-migration.sql  # Combined DB migrations
└── .env                    # VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_ADMIN_PASSWORD, VITE_RESEND_API_KEY
```

## Database Schema (Supabase)
- **projects**: id, slug, city, power, type(home|business), title, summary, completed_scope(JSONB), solis_note, display_order
- **project_images**: id, project_id(FK), image_url, display_order, rotation
- **pricing_packages**: id(8kw|12kw|15kw), name, power, price_eur, description, ideal_for, popular, includes(JSONB)
- **pricing_offer_cards**: id(offer-8kw|offer-12kw|offer-15kw), display_order, price_text, hero_image, component fields...
- **questionnaire_submissions**: id, name, email, phone, grid_type, purpose, power_needed, system_type, mounting_type, construction_stage, property_type, location
- Storage bucket: `project-images` (public, max 5MB, jpeg/png/webp)

## Homepage Section Order (Index.tsx)
1. HeroSection - Video background + stat badges + CTAs
2. BrandsSection - Auto-scrolling marquee of 8 partner logos (image-based, grayscale→color hover)
3. PricingSection - 3 solar packages
4. PricingOfferGrid - Detailed offer cards
5. ProcessSection - 3-step timeline
6. ProjectsSection - First 6 projects grid (ordered by display_order)
7. CertificatesSection - BDA certification display
8. FAQSection - Accordion Q&A
9. QuestionnaireSection - Multi-step survey form with chip options
10. ContactSection - Contact form + info (saves to DB)
11. WhyUsSection - 6 feature cards (includes "10 години гаранция")

## Data Architecture
- **Static projects** in `site-content.ts` are the source of truth for the 17 seed projects
- **DB projects** from Supabase supplement static ones (admin-created projects appear after static ones)
- `getProjects()` in api.ts merges both: DB `display_order` overrides static array index; sorted by `display_order`
- Static project images served from `/public/projects-optimized/`
- **Image rotation**: CSS transform only (0/90/180/270), stored in DB `rotation` column

## Admin Panel
- Routes under `/admin/*`, protected by `ProtectedRoute` component
- Password auth via `AdminAuthContext` (env var `VITE_ADMIN_PASSWORD`)
- Features: Project CRUD, image upload/reorder/delete/rotate/preview, pricing package editing, project ordering (up/down arrows)
- Dashboard at `/admin` shows stats + recent projects

## Conventions
- Bulgarian language for all user-facing content
- CSS utility classes from Tailwind; custom classes: `container-section`, `section-padding`, `section-eyebrow`, `heading-section`, `text-body`, `card-elevated`, `shadow-soft`, `shadow-card`
- Button variants: `accent`, `outline`, `destructive` (defined in button.tsx)
- Toast notifications via `sonner`
- Form validation with Zod schemas + React Hook Form
- All API calls go through `src/services/api.ts` → Supabase client
- Brand logos: 8 transparent PNGs in `/public/brands/`, fixed-size containers prevent layout shift

## Important Notes
- Email via Resend API (client-side call, API key in VITE_RESEND_API_KEY env var)
- Contact form saves to `questionnaire_submissions` table (prevents lost leads)
- Questionnaire uses honeypot spam protection (hidden field)
- Project ordering: admin can reorder via up/down arrows; reordering upserts DB records for static projects
- Company email: Nrgoplossingen@gmail.com
- Company phone: 089 435 4538
