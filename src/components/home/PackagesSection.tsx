import { Phone, Check, Zap, Battery, Shield, Cable, Layers, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PackageProps {
  name: string;
  power: string;
  description: string;
  features: string[];
  popular?: boolean;
}

function PackageCard({ name, power, description, features, popular }: PackageProps) {
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
    description: 'Идеален за малки домакинства с умерена консумация.',
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
    description: 'За големи домове и малък бизнес с висока консумация.',
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

export function PackagesSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-section">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-sm font-semibold text-primary mb-3">ПАКЕТИ</span>
          <h2 className="heading-section text-foreground mb-4">
            Готови решения за вашия дом
          </h2>
          <p className="text-body">
            Изберете мощност според вашите нужди. Всеки пакет включва пълен монтаж и безплатен мониторинг.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg) => (
            <PackageCard key={pkg.power} {...pkg} />
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Нужна ви е по-голяма мощност или специфично решение за бизнес?{' '}
            <a href="tel:+359888123456" className="text-primary font-semibold hover:underline">
              Обадете се за индивидуална оферта.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
