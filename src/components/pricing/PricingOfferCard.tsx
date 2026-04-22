import { useEffect, useState, type ComponentType } from 'react';
import { ClipboardCheck, FileText, ShieldCheck, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  offerHeroFallbackById,
  pricingOfferCategories,
  pricingOfferFeatures,
  pricingOfferScope,
  type PricingOfferFeature,
  type PricingOffer,
} from '@/content/pricing-offers';
import { cn } from '@/lib/utils';

const featureIcons: Record<PricingOfferFeature['id'], ComponentType<{ className?: string }>> = {
  inspection: ClipboardCheck,
  project: FileText,
  warranty: ShieldCheck,
};

interface PricingOfferCardProps {
  offer: PricingOffer;
  className?: string;
  ctaHref?: string;
}

function compactModel(model: string): string {
  const firstPart = model.split('(')[0]?.trim();
  return firstPart || model;
}

export function PricingOfferCard({ offer, className, ctaHref }: PricingOfferCardProps) {
  const [heroImageSrc, setHeroImageSrc] = useState(offer.heroImage || offerHeroFallbackById[offer.id]);

  useEffect(() => {
    setHeroImageSrc(offer.heroImage || offerHeroFallbackById[offer.id]);
  }, [offer.heroImage, offer.id]);

  const categoryMeta = offer.category ? pricingOfferCategories[offer.category] : undefined;

  const products = [
    {
      key: 'panel',
      label: 'Панели',
      image: offer.panels.image,
      alt: offer.panels.alt,
      meta: `${offer.panels.count} бр. ${offer.panels.name} ${offer.panels.model}`,
    },
    {
      key: 'inverter',
      label: 'Инвертор',
      image: offer.inverter.image,
      alt: offer.inverter.alt,
      meta: compactModel(`${offer.inverter.name} ${offer.inverter.model}`),
    },
    {
      key: 'battery',
      label: 'Батерия',
      image: offer.battery.image,
      alt: offer.battery.alt,
      meta: compactModel(`${offer.battery.name} ${offer.battery.model}`),
    },
  ];

  return (
    <article
      className={cn(
        'group mx-auto flex h-full w-full max-w-[540px] flex-col overflow-hidden rounded-[22px] border border-border/90 bg-card shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated',
        className
      )}
    >
      <div className="relative h-[340px] overflow-hidden sm:h-[360px]">
        <img
          src={heroImageSrc}
          alt={`Фон за оферта ${offer.shortTitle}`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          onError={() => {
            const fallbackSrc = offerHeroFallbackById[offer.id];
            if (fallbackSrc && heroImageSrc !== fallbackSrc) {
              setHeroImageSrc(fallbackSrc);
            }
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,18,34,0.86)_0%,rgba(8,24,42,0.56)_48%,rgba(7,16,26,0.78)_100%)]" />

        <div className="relative z-10 flex h-full flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="max-w-[68%] space-y-2">
              {categoryMeta && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                  {categoryMeta.shortLabel}
                </span>
              )}
              <h3 className="break-words text-[1.02rem] font-extrabold uppercase leading-[1.12] tracking-tight text-white sm:text-[1.18rem]">
                {offer.headlineLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>
            </div>

            <ul className="w-full max-w-[150px] space-y-2 text-right">
              {pricingOfferFeatures.map((feature) => {
                const Icon = featureIcons[feature.id];
                return (
                  <li key={feature.id} className="flex items-center justify-end gap-1.5">
                    <span className="text-[0.62rem] font-semibold uppercase leading-tight tracking-[0.09em] text-white/90">
                      {feature.label}
                    </span>
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-white">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-auto text-center">
            <p className="font-display text-[2.05rem] font-extrabold leading-none tracking-tight text-accent [text-shadow:0_0_16px_hsl(var(--accent)/0.5),0_2px_18px_rgba(0,0,0,0.55)] sm:text-[2.4rem]">
              {offer.price}
            </p>
            {offer.priceNote && (
              <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/70">
                {offer.priceNote}
              </p>
            )}
          </div>
        </div>
      </div>

      <footer className="flex flex-col gap-3 border-t border-border/70 bg-card p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="space-y-0.5">
          <p className="text-sm font-semibold text-foreground">{offer.shortTitle}</p>
          <p className="text-xs text-muted-foreground">{offer.includes}</p>
        </div>

        <Button variant="hero" size="lg" className="h-11 w-full rounded-full px-6 text-sm sm:w-auto" asChild>
          <a href={ctaHref || offer.ctaHref}>{offer.ctaText}</a>
        </Button>
      </footer>

      <div className="border-t border-border/60 bg-gradient-to-b from-muted/30 to-card p-4 sm:p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Оборудване към офертата
        </p>
        <div className="grid grid-cols-3 gap-2.5">
          {products.map((product) => (
            <div key={product.key} className="space-y-2">
              <p className="text-center text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-foreground">
                {product.label}
              </p>
              <div className="rounded-xl border border-border/70 bg-[linear-gradient(180deg,#ffffff_0%,#f7fafc_100%)] p-2 shadow-sm">
                <div className="rounded-lg bg-white p-2 shadow-[inset_0_0_0_1px_hsl(var(--border)/0.6)]">
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="mx-auto h-16 w-full object-contain sm:h-[74px]"
                    loading="lazy"
                  />
                </div>
                <p className="mt-2 text-center text-[0.6rem] leading-[1.22] text-muted-foreground">
                  {product.meta}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border/60 bg-muted/20 px-4 py-3.5 sm:px-5">
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Включено в цената
        </p>
        <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {pricingOfferScope.map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs text-foreground">
              <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
