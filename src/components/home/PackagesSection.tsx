import { Phone, Check, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { siteConfig, solarPackages } from '@/content/site-content';

interface PackagesSectionProps {
  title?: string;
  subtitle?: string;
}

function PackageCard({ pkg }: { pkg: (typeof solarPackages)[number] }) {
  return (
    <article
      className={cn(
        'relative h-full overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated sm:p-7',
        pkg.popular && 'ring-2 ring-primary/70'
      )}
    >
      <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-[2.2rem] bg-primary/8" />

      {pkg.popular && (
        <span className="absolute left-5 top-5 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          Най-търсен пакет
        </span>
      )}

      <div className={cn('mb-5 flex items-start gap-3', pkg.popular && 'mt-8')}>
        <div className={cn('mt-1 flex h-11 w-11 items-center justify-center rounded-xl', pkg.popular ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary')}>
          <Zap className="h-5 w-5" />
        </div>
        <div>
          <h3 className="heading-card text-foreground">{pkg.name}</h3>
          <p className="text-3xl font-extrabold text-primary">{pkg.power}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{pkg.idealFor}</p>
        </div>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">{pkg.description}</p>

      <div className="mb-5 rounded-xl border border-dashed border-primary/25 bg-primary/5 px-4 py-3 text-sm">
        <p className="font-bold text-foreground">Цена: По оферта</p>
        <p className="text-xs text-muted-foreground">След безплатен оглед и финална конфигурация</p>
      </div>

      <ul className="mb-7 space-y-2.5">
        {pkg.includes.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {feature}
          </li>
        ))}
      </ul>

      <Button variant={pkg.popular ? 'accent' : 'outline'} size="lg" className="w-full gap-2" asChild>
        <a href={siteConfig.phoneHref}>
          <Phone className="h-5 w-5" />
          Обади се за оферта
        </a>
      </Button>
    </article>
  );
}

export function PackagesSection({
  title = 'Пакети 8 / 12 / 15 kW',
  subtitle = 'Всеки пакет включва хибриден инвертор, панели, батерия, конструкция, защити, кабели и професионален монтаж.',
}: PackagesSectionProps) {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-section">
        <div className="mb-12 text-center">
          <span className="section-eyebrow">Пакети</span>
          <h2 className="heading-section mt-5 text-foreground">{title}</h2>
          <p className="text-body mx-auto mt-4 max-w-3xl">{subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {solarPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
