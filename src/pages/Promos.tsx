import { Layout } from '@/components/layout/Layout';
import { Phone, Tag, Clock, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { promos, siteConfig } from '@/content/site-content';

const activePromos = promos.filter((promo) => promo.active);

const Promos = () => {
  return (
    <Layout>
      <section className="section-padding bg-[var(--gradient-hero)]">
        <div className="container-section">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-eyebrow">Промоции</span>
            <h1 className="heading-display mt-5 text-foreground">Активни оферти</h1>
            <p className="text-body mt-5">
              За лесен админ контрол променяйте полето `active` в `src/content/site-content.ts` за включване/изключване.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-section">
          {activePromos.length > 0 ? (
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {activePromos.map((promo) => (
                <article key={promo.id} className="rounded-2xl border border-border/80 bg-white p-6 shadow-soft">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-foreground">
                    <Tag className="h-3.5 w-3.5 text-accent" />
                    {promo.badge ?? 'Промо'}
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{promo.title}</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{promo.description}</p>
                  {promo.details && <p className="mt-2 text-sm text-muted-foreground">{promo.details}</p>}
                  {promo.validUntil && (
                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      Валидност: {promo.validUntil}
                    </p>
                  )}
                  <Button variant="accent" className="mt-6 w-full" asChild>
                    <a href={siteConfig.phoneHref}>
                      <Phone className="mr-2 h-4 w-4" />
                      Обади се за оферта
                    </a>
                  </Button>
                </article>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-xl rounded-2xl border border-border/80 bg-white p-8 text-center shadow-soft">
              <Tag className="mx-auto h-14 w-14 text-muted-foreground/40" />
              <h2 className="mt-4 heading-card text-foreground">Няма активни промоции</h2>
              <p className="mt-2 text-muted-foreground">Попитайте за актуални предложения по телефон.</p>
              <Button variant="accent" size="lg" className="mt-5" asChild>
                <a href={siteConfig.phoneHref}>
                  <Phone className="mr-2 h-5 w-5" />
                  {siteConfig.phoneDisplay}
                </a>
              </Button>
            </div>
          )}

          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-border/80 bg-muted/30 p-5 text-sm text-muted-foreground">
            <p className="inline-flex items-center gap-2 font-semibold text-foreground">
              <Settings className="h-4 w-4 text-primary" />
              Редакция от клиента
            </p>
            <p className="mt-2">Промоциите се управляват от едно място в `src/content/site-content.ts`.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Promos;
