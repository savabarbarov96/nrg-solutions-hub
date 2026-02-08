import { Link } from 'react-router-dom';
import { ArrowRight, Tag, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PromoProps {
  title: string;
  description: string;
  validUntil?: string;
  badge?: string;
}

function PromoCard({ title, description, validUntil, badge }: PromoProps) {
  return (
    <div className="relative card-elevated p-6 border-l-4 border-l-accent">
      {badge && (
        <span className="absolute -top-3 right-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
          {badge}
        </span>
      )}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
          <Tag className="w-6 h-6 text-accent" />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          {validUntil && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>Валидно до: {validUntil}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Placeholder promos - these would come from a CMS
const promos: PromoProps[] = [
  {
    title: 'Безплатен разширен мониторинг',
    description: 'При поръчка на система от 12kW получавате безплатен разширен мониторинг за 2 години.',
    validUntil: '31.03.2026',
    badge: 'Ново',
  },
];

const hasPromos = promos.length > 0;

export function PromosSection() {
  if (!hasPromos) {
    return (
      <section className="section-padding bg-background">
        <div className="container-section">
          <div className="card-elevated p-8 text-center">
            <Tag className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="heading-card text-foreground mb-2">Няма активни промоции</h3>
            <p className="text-muted-foreground mb-6">
              В момента нямаме специални оферти, но можете да се обадите за индивидуална оферта.
            </p>
            <Button variant="accent" asChild>
              <a href="tel:+359888123456">Обади се за оферта</a>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-background">
      <div className="container-section">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="inline-block text-sm font-semibold text-accent mb-3">ПРОМОЦИИ</span>
            <h2 className="heading-section text-foreground">
              Актуални оферти
            </h2>
          </div>
          <Button variant="outline" asChild className="gap-2 self-start sm:self-auto">
            <Link to="/промоции">
              Виж всички
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Promos Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {promos.map((promo, index) => (
            <PromoCard key={index} {...promo} />
          ))}
        </div>
      </div>
    </section>
  );
}
