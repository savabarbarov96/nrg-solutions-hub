import { MapPin, HeadphonesIcon, RefreshCw, Shield, Zap, CheckCircle } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureProps) {
  return (
    <div className="group flex gap-4 p-5 rounded-2xl bg-background border border-border transition-all duration-300 hover:shadow-card hover:border-primary/20">
      <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="font-display font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

const features = [
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'Национално покритие',
    description: 'Работим в цяла България с мобилен екип и осигурен транспорт.',
  },
  {
    icon: <HeadphonesIcon className="w-6 h-6" />,
    title: 'Безплатен мониторинг',
    description: 'Следете производството в реално време през приложението Solis.',
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: 'Дистанционна поддръжка',
    description: 'При проблем — диагностика и troubleshooting от разстояние безплатно.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Политика за батерии',
    description: 'Ако батерията е недостатъчна, монтажът на следващата е безплатен.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Надграждане на системи',
    description: 'Добавяне на панели или батерии към съществуваща инсталация.',
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Утвърдени марки',
    description: 'Работим с Dyness, Jinko, JA Solar, Canadian Solar, Longi и други.',
  },
];

export function WhyUsSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-section">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-sm font-semibold text-primary mb-3">ЗАЩО НАС</span>
            <h2 className="heading-section text-foreground mb-4">
              Защо да изберете NRGsolution
            </h2>
            <p className="text-body mb-8">
              Повече от просто монтаж — предлагаме пълна грижа за вашата соларна система: 
              от консултацията до дългосрочната поддръжка. Клиентите ни могат да се обадят по всяко време.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Монтирани системи</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Мониторинг</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Покритие на България</div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
