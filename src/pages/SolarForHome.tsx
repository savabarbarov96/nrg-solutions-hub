import { Layout } from '@/components/layout/Layout';
import { Phone, CalendarDays, Home, Wallet, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProcessSection } from '@/components/home/ProcessSection';
import { FAQSection } from '@/components/home/FAQSection';
import { ContactSection } from '@/components/home/ContactSection';
import { siteConfig } from '@/content/site-content';
import { Pricing as PricingSection } from '@/components/ui/single-pricing-card-1';

const benefits = [
  {
    icon: Wallet,
    title: 'По-ниски сметки',
    description: 'Фотоволтаици за къщи с фокус върху реално намаляване на разходите за ток.',
  },
  {
    icon: ShieldCheck,
    title: 'Енергийна независимост',
    description: 'По-малка зависимост от промени в цените на електроенергията.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Контрол през Solis',
    description: 'Следене на производство и консумация през приложение.',
  },
];

const SolarForHome = () => {
  return (
    <Layout>
      <section className="section-padding bg-[var(--gradient-hero)]">
        <div className="container-section">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="section-eyebrow">Фотоволтаици за дома</span>
              <h1 className="heading-display mt-5 text-foreground">Решения за къщи в цяла България</h1>
              <p className="text-body mt-5">
                За къщи с покрив или двор. Апартаменти не са основен фокус и изискват допълнителни разрешения.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button variant="accent" size="lg" asChild>
                  <a href={siteConfig.phoneHref}>
                    <Phone className="mr-2 h-5 w-5" />
                    Обади се сега
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/контакти#оглед">
                    <CalendarDays className="mr-2 h-5 w-5" />
                    Безплатен оглед
                  </a>
                </Button>
              </div>
            </div>
            <div className="flex aspect-[4/3] items-center justify-center rounded-3xl border border-border/80 bg-white shadow-card">
              <Home className="h-20 w-20 text-primary/45" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-section">
          <div className="grid gap-5 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article key={benefit.title} className="rounded-2xl border border-border/80 bg-white p-6 shadow-soft">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground">{benefit.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <PricingSection />
      <ProcessSection />
      <FAQSection />
      <ContactSection />
    </Layout>
  );
};

export default SolarForHome;
