import { Layout } from '@/components/layout/Layout';
import { Phone, Check, Zap, HelpCircle, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PackageProps {
  name: string;
  power: string;
  description: string;
  features: string[];
  popular?: boolean;
  idealFor: string;
}

function PackageCard({ name, power, description, features, popular, idealFor }: PackageProps) {
  return (
    <div className={cn(
      "relative card-elevated p-6 sm:p-8 transition-all duration-300 hover:scale-[1.02]",
      popular && "ring-2 ring-primary"
    )}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full">
            Най-популярен
          </span>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            popular ? "bg-primary" : "bg-primary/10"
          )}>
            <Zap className={cn("w-6 h-6", popular ? "text-primary-foreground" : "text-primary")} />
          </div>
          <div>
            <h3 className="heading-card text-foreground">{name}</h3>
            <p className="text-3xl font-bold text-primary">{power}</p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <div className="bg-muted/50 rounded-lg p-3 mb-6">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Идеален за:</strong> {idealFor}
        </p>
      </div>

      <div className="text-2xl font-bold text-foreground mb-6">
        По оферта
        <span className="text-sm font-normal text-muted-foreground ml-2">/ с включен монтаж</span>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <Button 
        variant={popular ? "accent" : "outline"} 
        size="lg" 
        className="w-full gap-2"
        asChild
      >
        <a href="tel:+359888123456">
          <Phone className="w-5 h-5" />
          Обади се за оферта
        </a>
      </Button>
    </div>
  );
}

const packages: PackageProps[] = [
  {
    name: 'Старт',
    power: '8 kW',
    description: 'Базово решение за домакинства с умерена консумация.',
    idealFor: 'Малки домове, 2-3 души, до 500kWh месечно',
    features: [
      'Хибриден инвертор 8kW',
      'Соларни панели 10-12 бр.',
      'Батерия за съхранение',
      'DC/AC кабели и защити',
      'Алуминиева конструкция',
      'Профили, клеми, държачи',
      'Безплатен мониторинг (Solis)',
    ],
  },
  {
    name: 'Оптимум',
    power: '12 kW',
    description: 'Балансирано решение за средни до големи домове.',
    idealFor: 'Средни домове, 3-5 души, 500-800kWh месечно',
    features: [
      'Хибриден инвертор 12kW',
      'Соларни панели 16-20 бр.',
      'Батерия за съхранение',
      'DC/AC кабели и защити',
      'Алуминиева конструкция',
      'Профили, клеми, държачи',
      'Безплатен мониторинг (Solis)',
    ],
    popular: true,
  },
  {
    name: 'Макс',
    power: '15 kW',
    description: 'Мощно решение за големи домове и малък бизнес.',
    idealFor: 'Големи домове/офиси, над 800kWh месечно',
    features: [
      'Хибриден инвертор 15kW',
      'Соларни панели 20-25 бр.',
      'Батерия за съхранение',
      'DC/AC кабели и защити',
      'Алуминиева конструкция',
      'Профили, клеми, държачи',
      'Безплатен мониторинг (Solis)',
    ],
  },
];

const Pricing = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-muted/50 to-background">
        <div className="container-section">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-sm font-semibold text-primary mb-4">ЦЕНИ</span>
            <h1 className="heading-display text-foreground mb-6">
              Пакети и ценообразуване
            </h1>
            <p className="text-body text-lg">
              Готови конфигурации за различни нужди. Всички цени включват пълен монтаж, 
              материали и безплатен мониторинг.
            </p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="section-padding bg-background">
        <div className="container-section">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((pkg) => (
              <PackageCard key={pkg.power} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* How Pricing Works */}
      <section className="section-padding bg-muted/30">
        <div className="container-section">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-sm font-semibold text-primary mb-3">ЦЕНООБРАЗУВАНЕ</span>
              <h2 className="heading-section text-foreground mb-4">
                Как се формира цената
              </h2>
            </div>
            
            <div className="space-y-6">
              <div className="card-elevated p-6 flex gap-4">
                <Calculator className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-2">Индивидуална оценка</h3>
                  <p className="text-muted-foreground text-sm">
                    Цената зависи от мощността на системата, типа на покрива/терена, необходимата конструкция 
                    и допълнителни специфики на обекта. Затова изготвяме оферта след оглед.
                  </p>
                </div>
              </div>

              <div className="card-elevated p-6 flex gap-4">
                <HelpCircle className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-2">Какво е включено</h3>
                  <p className="text-muted-foreground text-sm">
                    Всяка оферта включва: инвертор, панели, батерия, всички кабели и защити, 
                    монтажна конструкция, труд за монтаж, и безплатен мониторинг.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="text-muted-foreground mb-6">
                Нужна ви е по-голяма мощност или специфично решение?
              </p>
              <Button variant="accent" size="lg" asChild>
                <a href="tel:+359888123456">
                  <Phone className="w-5 h-5 mr-2" />
                  Обади се за индивидуална оферта
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
