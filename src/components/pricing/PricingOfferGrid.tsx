import { pricingOffers, type PricingOffer, type PricingOfferCategoryId } from '@/content/pricing-offers';
import { siteConfig } from '@/content/site-content';
import { usePricingOfferCards } from '@/hooks/usePricing';
import { cn } from '@/lib/utils';
import { PricingOfferCard } from './PricingOfferCard';

type GridTone = 'default' | 'muted' | 'accent';

interface PricingOfferGridProps {
  className?: string;
  ctaHref?: string;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  showHeading?: boolean;
  category?: PricingOfferCategoryId;
  tone?: GridTone;
  sectionId?: string;
}

const toneBackgrounds: Record<GridTone, string> = {
  default: 'bg-background',
  muted: 'bg-muted/30',
  accent: 'bg-accent/[0.04]',
};

function buildFallbackHeadline(panelsCount: number, batteryEnergyLabel: string): [string, string, string, string] {
  const pvSize = ((panelsCount * 540) / 1000).toFixed(1);
  return ['ТРИФАЗНА ХИБРИДНА', `СИСТЕМА ~${pvSize}kWp`, `БАТЕРИЯ ${batteryEnergyLabel}`, 'С ВКЛЮЧЕН МОНТАЖ'];
}

function normalizeHeadlineLines(
  lines: string[] | null | undefined,
  panelsCount: number,
  batteryEnergyLabel: string
): [string, string, string, string] {
  if (!Array.isArray(lines) || lines.length < 4) {
    return buildFallbackHeadline(panelsCount, batteryEnergyLabel);
  }

  return [lines[0], lines[1], lines[2], lines[3]];
}

const REQUIRED_CATEGORIES: PricingOfferCategoryId[] = ['mono-lv', '3phase-lv', '3phase-hv'];

function useResolvedOffers(): PricingOffer[] {
  const { data } = usePricingOfferCards();
  if (!data || data.length === 0) {
    return pricingOffers;
  }

  const mapped = [...data]
    .sort((a, b) => a.display_order - b.display_order)
    .map((card) => ({
      id: card.id,
      category: (card.category ?? 'mono-lv') as PricingOfferCategoryId,
      price: card.price_text,
      priceNote: card.price_note ?? undefined,
      heroImage: card.hero_image,
      shortTitle: card.short_title,
      includes: card.includes_text,
      headlineLines: normalizeHeadlineLines(card.headline_lines, card.panels_count, card.battery_energy_label),
      inverter: {
        name: card.inverter_name,
        model: card.inverter_model,
        powerLabel: card.inverter_power_label,
        image: card.inverter_image,
        alt: `Инвертор ${card.inverter_name} ${card.inverter_model}`,
      },
      battery: {
        name: card.battery_name,
        model: card.battery_model,
        energyLabel: card.battery_energy_label,
        image: card.battery_image,
        alt: `Батерия ${card.battery_name} ${card.battery_model}`,
      },
      panels: {
        name: card.panels_name,
        model: card.panels_model,
        count: card.panels_count,
        image: card.panels_image,
        alt: `Панели ${card.panels_name} ${card.panels_model}`,
      },
      ctaText: card.cta_text,
      ctaHref: card.cta_href,
    }));

  // If DB data doesn't cover all 3 categories (e.g. old schema / incomplete migration),
  // fall back to the complete static set so every section has offers.
  const allCategoriesPresent = REQUIRED_CATEGORIES.every(
    (cat) => mapped.some((o) => o.category === cat)
  );

  return allCategoriesPresent ? mapped : pricingOffers;
}

export function PricingOfferGrid({
  className,
  ctaHref = siteConfig.phoneHref,
  title = 'Допълнителни пакетни оферти',
  subtitle = 'Фиксирани оферти с актуална цена и оборудване.',
  eyebrow = 'Оферти',
  showHeading = true,
  category,
  tone = 'muted',
  sectionId,
}: PricingOfferGridProps) {
  const allOffers = useResolvedOffers();
  const offers = category ? allOffers.filter((offer) => offer.category === category) : allOffers;

  if (offers.length === 0) {
    return null;
  }

  const isPair = offers.length === 2;

  return (
    <section
      id={sectionId}
      className={cn('section-padding relative overflow-hidden', toneBackgrounds[tone], className)}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />
      <div className="container-section relative">
        {showHeading && (
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="section-eyebrow">{eyebrow}</span>
            <h2 className="heading-section mt-5 text-foreground">{title}</h2>
            {subtitle && <p className="text-body mt-4">{subtitle}</p>}
          </div>
        )}

        <div
          className={cn(
            'grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-7',
            isPair ? 'mx-auto max-w-5xl' : 'xl:grid-cols-3'
          )}
        >
          {offers.map((offer) => (
            <PricingOfferCard key={offer.id} offer={offer} ctaHref={ctaHref} />
          ))}
        </div>
      </div>
    </section>
  );
}
