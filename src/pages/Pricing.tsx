import { Layout } from '@/components/layout/Layout';
import { Phone } from 'lucide-react';
import { Pricing as PricingSection } from '@/components/ui/single-pricing-card-1';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/content/site-content';
import { PricingOfferGrid } from '@/components/pricing/PricingOfferGrid';

const Pricing = () => {
  return (
    <Layout>
      <section className="section-padding bg-[var(--gradient-hero)]">
        <div className="container-section">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-eyebrow">Цени / Пакети</span>
            <h1 className="heading-display mt-5 text-foreground">Прозрачни стъпки към точна оферта</h1>
            <p className="text-body mt-5">
              Даваме ориентир по телефон, а финалната цена се определя след безплатен оглед.
            </p>
          </div>
        </div>
      </section>

      <PricingSection />
      <PricingOfferGrid />

      <section className="section-padding bg-background">
        <div className="container-section">
          <div className="mx-auto mt-2 max-w-4xl rounded-2xl border border-primary/20 bg-primary/5 p-7 text-center">
            <h2 className="heading-card text-foreground">Следваща стъпка</h2>
            <p className="mt-2 text-muted-foreground">Обади се за оферта или заяви безплатен оглед.</p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <Button variant="accent" size="lg" asChild>
                <a href={siteConfig.phoneHref}>
                  <Phone className="mr-2 h-5 w-5" />
                  Обади се за оферта
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/контакти#оглед">Безплатен оглед</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
