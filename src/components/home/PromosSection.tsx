import { Link } from 'react-router-dom';
import { ArrowRight, Tag, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { promos, siteConfig } from '@/content/site-content';

const activePromos = promos.filter((promo) => promo.active);

export function PromosSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-section">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="section-eyebrow">Промо оферти</span>
            <h2 className="heading-section mt-5 text-foreground">Актуални предложения</h2>
          </div>
          <Button variant="outline" asChild className="gap-2 self-start sm:self-auto">
            <Link to="/промоции">
              Страница Промоции
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {activePromos.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {activePromos.slice(0, 2).map((promo) => (
              <article key={promo.id} className="rounded-2xl border border-border/80 bg-white p-6 shadow-soft">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-foreground">
                  <Tag className="h-3.5 w-3.5 text-accent" />
                  {promo.badge ?? 'Промо'}
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">{promo.title}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{promo.description}</p>
                {promo.validUntil && (
                  <p className="mb-5 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    Валидно до: {promo.validUntil}
                  </p>
                )}
                <Button variant="accent" className="gap-2" asChild>
                  <a href={siteConfig.phoneHref}>
                    <Phone className="h-4 w-4" />
                    Обади се за детайли
                  </a>
                </Button>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border/80 bg-white p-8 text-center shadow-soft">
            <p className="text-muted-foreground">Попитай за актуални промоции по телефон.</p>
            <Button variant="accent" className="mt-5" asChild>
              <a href={siteConfig.phoneHref}>Обади се сега</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
