import { Layout } from '@/components/layout/Layout';
import { Phone, CalendarDays, Building2, TrendingDown, ChartLine, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProcessSection } from '@/components/home/ProcessSection';
import { ContactSection } from '@/components/home/ContactSection';
import { siteConfig } from '@/content/site-content';

const benefits = [
  {
    icon: TrendingDown,
    title: 'Контрол на разходите',
    description: 'По-ниски и по-предвидими разходи за електроенергия в дългосрочен план.',
  },
  {
    icon: ChartLine,
    title: 'Планиране с данни',
    description: 'Solis мониторинг и постоянна видимост върху енергийния профил.',
  },
  {
    icon: ShieldCheck,
    title: 'Поддръжка и надграждане',
    description: 'Дистанционна поддръжка и възможност за разширяване на системата.',
  },
];

const SolarForBusiness = () => {
  return (
    <Layout>
      <section className="section-padding bg-[var(--gradient-hero)]">
        <div className="container-section">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="section-eyebrow">Фотоволтаици за бизнес</span>
              <h1 className="heading-display mt-5 text-foreground">По-предвидима енергия за предприятия</h1>
              <p className="text-body mt-5">
                Подход за търговски и индустриални обекти с индивидуално оразмеряване, монтаж и последваща поддръжка.
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
              <Building2 className="h-20 w-20 text-primary/45" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-section grid gap-5 md:grid-cols-3">
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
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-section">
          <div className="mx-auto max-w-4xl rounded-2xl border border-border/80 bg-white p-7 shadow-soft">
            <h2 className="heading-card text-foreground">Подход за предприятия</h2>
            <p className="mt-3 text-muted-foreground">
              Анализираме потреблението, подготвяме подходяща конфигурация и планираме монтаж без спиране на критични процеси.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• По-големи мощности и специфични конфигурации според обекта</li>
              <li>• Мониторинг, дистанционна поддръжка и troubleshooting</li>
              <li>• Възможност за етапно надграждане на системата</li>
            </ul>
          </div>
        </div>
      </section>

      <ProcessSection />
      <ContactSection />
    </Layout>
  );
};

export default SolarForBusiness;
