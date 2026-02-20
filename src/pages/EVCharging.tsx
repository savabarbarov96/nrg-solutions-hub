import { Layout } from '@/components/layout/Layout';
import { Phone, CalendarDays, Zap, Clock, ShieldCheck, Sun, BatteryCharging, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProcessSection } from '@/components/home/ProcessSection';
import { FAQSection } from '@/components/home/FAQSection';
import { ContactSection } from '@/components/home/ContactSection';
import { siteConfig } from '@/content/site-content';

const benefits = [
  {
    icon: Zap,
    title: 'Бързо зареждане у дома',
    description: 'До 22 kW мощност – заредете напълно електромобила си за една нощ без да напускате дома.',
  },
  {
    icon: Clock,
    title: 'Зареждане по ваш график',
    description: 'Програмирайте зареждането в часовете с по-ниска тарифа и спестявайте от сметката за ток.',
  },
  {
    icon: ShieldCheck,
    title: 'Сертифициран монтаж',
    description: 'Инсталацията се извършва от лицензирани електротехници с гаранция и всички документи.',
  },
];

const integrationPoints = [
  'Зарежда приоритетно от излишната соларна енергия',
  'Интелигентен контрол за оптимизиране на разходите',
  'Мониторинг в реално време през мобилно приложение',
  'Намалява въглеродния отпечатък до нула при соларна комбинация',
];

const EVCharging = () => {
  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="section-padding bg-[var(--gradient-hero)]">
        <div className="container-section">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Text */}
            <div>
              <span className="section-eyebrow">EV зарядни станции за дома</span>
              <h1 className="heading-display mt-5 text-foreground">
                Домашна зарядна станция за вашия електромобил
              </h1>
              <p className="text-body mt-5">
                Удобно, бързо и икономично зареждане на електромобила ви директно от вкъщи.
                Комбинирайте с фотоволтаична система и зареждайте практически безплатно – от собственото си слънце.
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

            {/* Hero image */}
            <div className="overflow-hidden rounded-3xl border border-border/80 shadow-card">
              <img
                src="https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?auto=format&fit=crop&w=1000&q=80"
                alt="Домашна EV зарядна станция"
                className="aspect-[4/3] w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="section-padding bg-background">
        <div className="container-section">
          <div className="mb-10 text-center">
            <span className="section-eyebrow">Предимства</span>
            <h2 className="heading-section mt-4 text-foreground">Защо да изберете домашна EV станция?</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article
                  key={benefit.title}
                  className="rounded-2xl border border-border/80 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Solar Integration ── */}
      <section className="section-padding bg-muted/30">
        <div className="container-section">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Image */}
            <div className="overflow-hidden rounded-3xl border border-border/80 shadow-card">
              <img
                src="/assets/products/home_charging_station.jpeg"
                alt="Домашна EV зарядна станция в гараж"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Text */}
            <div>
              <span className="section-eyebrow">Интеграция с фотоволтаици</span>
              <h2 className="heading-section mt-4 text-foreground">
                Заредете електромобила от собственото си слънце
              </h2>
              <p className="mt-4 text-muted-foreground">
                Когато комбинирате домашна EV зарядна станция с фотоволтаична система, автомобилът ви се
                зарежда от слънчева енергия, произведена на вашия покрив. Нулеви разходи за гориво,
                нулев въглероден отпечатък.
              </p>
              <ul className="mt-5 space-y-3">
                {integrationPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button variant="accent" size="lg" asChild>
                  <a href={siteConfig.phoneHref}>
                    <BatteryCharging className="mr-2 h-5 w-5" />
                    Запитай за комбиниран пакет
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/фотоволтаици-за-дома">
                    <Sun className="mr-2 h-5 w-5" />
                    Виж соларни решения
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProcessSection />
      <FAQSection />
      <ContactSection />
    </Layout>
  );
};

export default EVCharging;
