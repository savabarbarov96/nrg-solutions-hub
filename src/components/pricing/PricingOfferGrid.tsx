import { pricingOffers, type PricingOffer } from '@/content/pricing-offers';
import { siteConfig } from '@/content/site-content';
import { usePricingOfferCards } from '@/hooks/usePricing';
import { cn } from '@/lib/utils';
import { PricingOfferCard } from './PricingOfferCard';

interface PricingOfferGridProps {
  className?: string;
  ctaHref?: string;
  title?: string;
  subtitle?: string;
  showHeading?: boolean;
}

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

function useResolvedOffers(): PricingOffer[] {
  const { data } = usePricingOfferCards();
  if (!data || data.length === 0) {
    return pricingOffers;
  }

  return [...data]
    .sort((a, b) => a.display_order - b.display_order)
    .map((card) => ({
      id: card.id,
      price: card.price_text,
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
}

export function PricingOfferGrid({
  className,
  ctaHref = siteConfig.phoneHref,
  title = 'Допълнителни пакетни оферти',
  subtitle = 'Фиксирани оферти с актуална цена и оборудване.',
  showHeading = true,
}: PricingOfferGridProps) {
  const offers = useResolvedOffers();

  return (
    <section className={cn('section-padding bg-muted/20', className)}>
      <div className="container-section">
        {showHeading && (
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="section-eyebrow">Оферти</span>
            <h2 className="heading-section mt-5 text-foreground">{title}</h2>
            <p className="text-body mt-4">{subtitle}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-7">
          {offers.map((offer) => (
            <PricingOfferCard key={offer.id} offer={offer} ctaHref={ctaHref} />
          ))}
        </div>
      </div>
    </section>
  );
}
