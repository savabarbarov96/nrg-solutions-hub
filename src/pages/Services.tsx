import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, Home, Building2, Battery, HeadphonesIcon, FileCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  badge?: string;
}

function ServiceCard({ icon, title, description, href, badge }: ServiceCardProps) {
  return (
    <Link 
      to={href} 
      className="group card-elevated p-6 sm:p-8 transition-all duration-300 hover:scale-[1.02] block relative"
    >
      {badge && (
        <span className="absolute -top-3 right-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
          {badge}
        </span>
      )}
      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
        <div className="text-primary group-hover:text-primary-foreground transition-colors">
          {icon}
        </div>
      </div>
      <h3 className="heading-card text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
        Научи повече
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}

const services: ServiceCardProps[] = [
  {
    icon: <Home className="w-7 h-7" />,
    title: 'Фотоволтаици за дома',
    description: 'Намалете сметките за ток с до 90%. Пълен процес от консултацията до мониторинга.',
    href: '/фотоволтаици-за-дома',
  },
  {
    icon: <Building2 className="w-7 h-7" />,
    title: 'Фотоволтаици за бизнес',
    description: 'Контролирайте разходите на предприятието и осигурете предвидими енергийни разходи.',
    href: '/фотоволтаици-за-бизнес',
  },
  {
    icon: <Battery className="w-7 h-7" />,
    title: 'Батерии и надграждане',
    description: 'Добавете батерии или панели към съществуваща система. Политика за безплатен монтаж при недостатъчна батерия.',
    href: '/услуги#батерии',
  },
  {
    icon: <HeadphonesIcon className="w-7 h-7" />,
    title: 'Мониторинг и поддръжка',
    description: 'Безплатен мониторинг чрез Solis, дистанционна диагностика и troubleshooting за всички клиенти.',
    href: '/услуги#мониторинг',
  },
  {
    icon: <FileCheck className="w-7 h-7" />,
    title: 'Узаконяване',
    description: 'При лична консумация — упълномощаване към доставчика на електричество. Пълно съдействие.',
    href: '/услуги#узаконяване',
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: 'EV зарядни станции',
    description: 'Станции за зареждане на електромобили. Обадете се за информация и оферта.',
    href: '/услуги#ev-charging',
    badge: 'Скоро',
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-muted/50 to-background">
        <div className="container-section">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-sm font-semibold text-primary mb-4">УСЛУГИ</span>
            <h1 className="heading-display text-foreground mb-6">
              Цялостни соларни решения
            </h1>
            <p className="text-body text-lg mb-8">
              От консултацията през монтажа до дългосрочната поддръжка — 
              предлагаме пълен пакет услуги за вашата фотоволтаична система.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" className="gap-2" asChild>
                <a href="tel:+359888123456">
                  <Phone className="w-5 h-5" />
                  Обади се за консултация
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-section">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Battery Policy */}
      <section id="батерии" className="section-padding bg-muted/30">
        <div className="container-section">
          <div className="max-w-3xl mx-auto">
            <div className="card-elevated p-8 border-l-4 border-l-primary">
              <h2 className="heading-card text-foreground mb-4">
                Политика за батерии
              </h2>
              <p className="text-muted-foreground mb-4">
                Ако монтираната батерия се окаже недостатъчна за вашите нужди, 
                монтажът на следващата батерия е <strong className="text-foreground">безплатен</strong>.
              </p>
              <p className="text-sm text-muted-foreground">
                * Условието е валидно при първоначална оценка от наша страна и последваща промяна в консумацията.
                Свържете се с нас за детайли.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Monitoring Section */}
      <section id="мониторинг" className="section-padding bg-background">
        <div className="container-section">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-sm font-semibold text-primary mb-3">МОНИТОРИНГ</span>
              <h2 className="heading-section text-foreground mb-4">
                Безплатен мониторинг и поддръжка
              </h2>
              <p className="text-body mb-6">
                Всички наши клиенти получават достъп до приложението <strong className="text-foreground">Solis</strong> за 
                мониторинг на производството в реално време. При възникнал проблем — дистанционна диагностика без допълнителни такси.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Реално време производство и консумация',
                  'Известия при аномалии',
                  'Дистанционна диагностика',
                  'Телефонна поддръжка по всяко време',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="outline" asChild>
                <a href="tel:+359888123456">Свържете се при проблем</a>
              </Button>
            </div>
            <div className="bg-muted/50 rounded-2xl p-8 aspect-square flex items-center justify-center">
              <div className="text-center">
                <HeadphonesIcon className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                <p className="text-muted-foreground">Демо на Solis приложението</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EV Charging Placeholder */}
      <section id="ev-charging" className="section-padding bg-muted/30">
        <div className="container-section">
          <div className="max-w-3xl mx-auto text-center">
            <Zap className="w-16 h-16 text-primary/50 mx-auto mb-6" />
            <span className="inline-block text-sm font-semibold text-primary mb-3">ОЧАКВАЙТЕ СКОРО</span>
            <h2 className="heading-section text-foreground mb-4">
              EV зарядни станции
            </h2>
            <p className="text-body mb-8">
              Добавете станция за зареждане на електромобил към вашата соларна система. 
              Детайлите за услугата ще бъдат допълнени скоро.
            </p>
            <Button variant="accent" asChild>
              <a href="tel:+359888123456">
                <Phone className="w-5 h-5 mr-2" />
                Обади се за информация
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
