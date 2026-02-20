import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, Home, Building2, Battery, HeadphonesIcon, FileCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/content/site-content';

const services = [
  {
    icon: Home,
    title: 'Фотоволтаици за дом',
    description: 'Решения за къщи с покрив или двор за по-ниски сметки и повече контрол.',
    href: '/фотоволтаици-за-дома',
  },
  {
    icon: Building2,
    title: 'Фотоволтаици за бизнес',
    description: 'Проекти за предприятия с фокус върху предвидими и оптимизирани енергийни разходи.',
    href: '/фотоволтаици-за-бизнес',
  },
  {
    icon: Battery,
    title: 'Батерии и надграждане',
    description: 'Надграждане на съществуващи системи + политика за батерии при условия.',
    href: '#батерии',
  },
  {
    icon: HeadphonesIcon,
    title: 'Мониторинг и поддръжка',
    description: 'Безплатен мониторинг, дистанционна диагностика и troubleshooting.',
    href: '#мониторинг',
  },
  {
    icon: FileCheck,
    title: 'Узаконяване',
    description: 'Лична консумация: чрез упълномощаване към доставчика на ток, с пълно съдействие.',
    href: '#узаконяване',
  },
  {
    icon: Zap,
    title: 'EV зарядна станция',
    description: 'Домашна зарядна станция за електромобили, интегрирана с вашата соларна система за зареждане от слънчева енергия.',
    href: '/зарядни-станции',
  },
];

const Services = () => {
  return (
    <Layout>
      <section className="section-padding bg-[var(--gradient-hero)]">
        <div className="container-section">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-eyebrow">Услуги</span>
            <h1 className="heading-display mt-5 text-foreground">Пълен процес: от идея до работеща система</h1>
            <p className="text-body mt-5">
              Основен CTA е обаждане. Втори CTA е безплатен оглед на място.
            </p>
            <Button variant="accent" size="lg" className="mt-7" asChild>
              <a href={siteConfig.phoneHref}>
                <Phone className="mr-2 h-5 w-5" />
                Обади се за консултация
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-section">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              const href = service.href.startsWith('#') ? `/услуги${service.href}` : service.href;

              return (
                <Link
                  key={service.title}
                  to={href}
                  className="group rounded-2xl border border-border/80 bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground">{service.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Виж детайли
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="батерии" className="section-padding bg-muted/30">
        <div className="container-section">
          <div className="mx-auto max-w-3xl rounded-2xl border border-primary/20 bg-white p-7 shadow-soft">
            <h2 className="heading-card text-foreground">Батерии и надграждане</h2>
            <p className="mt-3 text-muted-foreground">
              Ако монтирана батерия се окаже недостатъчна, монтажът на следваща батерия е безплатен.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Условие: валидно при първоначална оценка от NRGsolution и доказана необходимост от допълнителен капацитет.
            </p>
          </div>
        </div>
      </section>

      <section id="мониторинг" className="section-padding bg-background">
        <div className="container-section">
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border/80 bg-white p-7 shadow-soft">
              <h2 className="heading-card text-foreground">Мониторинг и поддръжка</h2>
              <p className="mt-3 text-muted-foreground">
                Всеки клиент получава безплатен мониторинг през Solis и дистанционна поддръжка при проблем.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>• Реално време за производство и консумация</li>
                <li>• Troubleshooting по телефон и дистанционно</li>
                <li>• Подготовка за бъдещи надграждания</li>
              </ul>
            </article>

            <article id="узаконяване" className="rounded-2xl border border-border/80 bg-white p-7 shadow-soft">
              <h2 className="heading-card text-foreground">Узаконяване (лична консумация)</h2>
              <p className="mt-3 text-muted-foreground">
                Обясняваме процеса на разбираем език: за лична консумация става чрез упълномощаване към доставчика на ток.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">Водим клиента през всяка стъпка, без излишна бюрократична тежест.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="ev-charging" className="section-padding bg-muted/30">
        <div className="container-section">
          <div className="mx-auto max-w-3xl rounded-2xl border border-primary/20 bg-white p-8 text-center shadow-soft">
            <span className="section-eyebrow">EV зарядни станции</span>
            <h2 className="heading-section mt-5 text-foreground">Домашна зарядна станция за електромобили</h2>
            <p className="text-body mt-4">
              Комбинирайте соларна система с EV зарядна станция и зареждайте автомобила си от собственото си слънце.
              Виж пълната страница за детайли, предимства и как да запишете безплатен оглед.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button variant="accent" asChild>
                <a href="/зарядни-станции">
                  <Zap className="mr-2 h-5 w-5" />
                  Виж EV зарядни станции
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={siteConfig.phoneHref}>
                  <Phone className="mr-2 h-5 w-5" />
                  Обади се
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
