import { Layout } from '@/components/layout/Layout';
import { Phone, Tag, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Promo {
  id: number;
  title: string;
  description: string;
  details?: string;
  validUntil?: string;
  badge?: string;
  active: boolean;
}

// Placeholder promos - in production these would come from a CMS
const promos: Promo[] = [
  {
    id: 1,
    title: 'Безплатен разширен мониторинг',
    description: 'При поръчка на система от 12kW или повече получавате безплатен разширен мониторинг за 2 години.',
    details: 'Включва подробни справки, експорт на данни и приоритетна техническа поддръжка.',
    validUntil: '31.03.2026',
    badge: 'Ново',
    active: true,
  },
  {
    id: 2,
    title: 'Препоръчай приятел',
    description: 'Препоръчайте NRGsolution на приятел и получете отстъпка при следващото надграждане.',
    details: 'При успешен монтаж на препоръчан от вас клиент, получавате ваучер за отстъпка.',
    active: true,
  },
];

const activePromos = promos.filter((p) => p.active);

function PromoCard({ promo }: { promo: Promo }) {
  return (
    <div className="card-elevated p-6 sm:p-8 border-l-4 border-l-accent">
      {promo.badge && (
        <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full mb-4">
          {promo.badge}
        </span>
      )}
      <h2 className="heading-card text-foreground mb-3">{promo.title}</h2>
      <p className="text-muted-foreground mb-4">{promo.description}</p>
      {promo.details && (
        <p className="text-sm text-muted-foreground/80 mb-4">{promo.details}</p>
      )}
      {promo.validUntil && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Clock className="w-4 h-4" />
          <span>Валидно до: {promo.validUntil}</span>
        </div>
      )}
      <Button variant="accent" asChild className="gap-2">
        <a href="tel:+359888123456">
          <Phone className="w-5 h-5" />
          Възползвай се
          <ArrowRight className="w-4 h-4" />
        </a>
      </Button>
    </div>
  );
}

const Promos = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-muted/50 to-background">
        <div className="container-section">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-sm font-semibold text-accent mb-4">ПРОМОЦИИ</span>
            <h1 className="heading-display text-foreground mb-6">
              Актуални оферти
            </h1>
            <p className="text-body text-lg">
              Възползвайте се от специалните ни промоции. 
              Обадете се за повече информация и условия.
            </p>
          </div>
        </div>
      </section>

      {/* Promos */}
      <section className="section-padding bg-background">
        <div className="container-section">
          {activePromos.length > 0 ? (
            <div className="max-w-3xl mx-auto space-y-6">
              {activePromos.map((promo) => (
                <PromoCard key={promo.id} promo={promo} />
              ))}
            </div>
          ) : (
            <div className="max-w-xl mx-auto text-center">
              <Tag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
              <h2 className="heading-card text-foreground mb-4">Няма активни промоции</h2>
              <p className="text-muted-foreground mb-8">
                В момента нямаме специални оферти, но можете да се обадите за индивидуална оферта.
              </p>
              <Button variant="accent" size="lg" asChild>
                <a href="tel:+359888123456">
                  <Phone className="w-5 h-5 mr-2" />
                  Обади се за оферта
                </a>
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Promos;
