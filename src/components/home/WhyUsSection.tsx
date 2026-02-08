import { MapPin, Headphones, RefreshCcw, ShieldCheck, PlusCircle, BadgeCheck } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Национално покритие',
    description: 'Екип с транспорт и възможност за монтаж в цяла България.',
  },
  {
    icon: Headphones,
    title: 'Безплатен мониторинг',
    description: 'Включен Solis мониторинг за всички клиенти без допълнителна такса.',
  },
  {
    icon: RefreshCcw,
    title: 'Дистанционна поддръжка',
    description: 'Troubleshooting и бърза реакция при сигнал за проблем.',
  },
  {
    icon: ShieldCheck,
    title: 'Политика за батерии',
    description: 'При недостатъчна батерия монтажът на следващата е безплатен при условия.',
  },
  {
    icon: PlusCircle,
    title: 'Надграждане',
    description: 'Разширяване на съществуващи системи според ново потребление.',
  },
  {
    icon: BadgeCheck,
    title: 'Утвърдени марки',
    description: 'Компоненти от партньори с доказано качество и сервиз.',
  },
];

export function WhyUsSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-section">
        <div className="mb-10 max-w-3xl">
          <span className="section-eyebrow">Защо NRGsolution</span>
          <h2 className="heading-section mt-5 text-foreground">Компания, ориентирана към резултат и поддръжка</h2>
          <p className="text-body mt-4">
            Конкурентите често акцентират на цена или само на продукти. Нашият фокус е цялостна услуга с ясни стъпки,
            активна комуникация и поддръжка след монтажа.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="group rounded-2xl border border-border/80 bg-white p-5 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
