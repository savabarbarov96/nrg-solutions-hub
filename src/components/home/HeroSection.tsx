import { Phone, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-solar.jpg';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-section relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-12 sm:py-16 lg:py-20">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse-soft" />
              <span className="text-sm font-medium text-primary">Безплатен мониторинг за всички клиенти</span>
            </div>

            <h1 className="heading-display text-foreground mb-6">
              Фотоволтаици за{' '}
              <span className="text-gradient-teal">дома и бизнеса</span>
              {' '}в цяла България
            </h1>

            <p className="text-body text-lg mb-8 max-w-xl">
              Намалете сметките за ток с до 90%. Професионален монтаж, безплатен 
              оглед и дистанционна поддръжка — от консултацията до пускането в експлоатация.
            </p>

            {/* Trust Points */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {[
                'Национално покритие',
                'Безплатна поддръжка',
                'Гаранция за качество',
              ].map((point) => (
                <div key={point} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="accent" size="xl" className="gap-3" asChild>
                <a href="tel:+359888123456">
                  <Phone className="w-5 h-5" />
                  Обади се сега
                </a>
              </Button>
              <Button variant="outline" size="xl" className="gap-3" asChild>
                <a href="/контакти#оглед">
                  <Calendar className="w-5 h-5" />
                  Безплатен оглед
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>

            {/* Phone Number Display */}
            <div className="mt-8 flex items-center gap-3 text-muted-foreground">
              <Phone className="w-5 h-5 text-primary" />
              <span className="text-sm">Работно време: Пон - Пет, 9:00 - 18:00</span>
              <span className="text-lg font-bold text-foreground">0888 123 456</span>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl lg:rounded-3xl overflow-hidden shadow-elevated">
              <img 
                src={heroImage} 
                alt="Соларни панели на покрив на българска къща" 
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 lg:left-auto lg:-right-6 bg-background rounded-2xl p-5 shadow-elevated border border-border">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">90%</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Намаление на сметките</p>
                  <p className="text-xs text-muted-foreground">при средна консумация</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
