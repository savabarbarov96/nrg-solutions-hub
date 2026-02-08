import { Layout } from '@/components/layout/Layout';
import { Phone, Calendar, CheckCircle, Building2, TrendingDown, BarChart3, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProcessSection } from '@/components/home/ProcessSection';
import { ContactSection } from '@/components/home/ContactSection';

const benefits = [
  {
    icon: <TrendingDown className="w-6 h-6" />,
    title: 'Контрол на разходите',
    description: 'Намалете оперативните разходи за електроенергия значително.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Предвидимост',
    description: 'Планирайте бюджета с ясни и стабилни енергийни разходи.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Бърза възвръщаемост',
    description: 'Инвестицията се изплаща за 3-5 години при типична бизнес консумация.',
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: 'Зелен имидж',
    description: 'Покажете ангажимент към устойчивото развитие пред клиенти и партньори.',
  },
];

const SolarForBusiness = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-muted/50 to-background">
        <div className="container-section">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-sm font-semibold text-primary mb-4">ЗА БИЗНЕСА</span>
              <h1 className="heading-display text-foreground mb-6">
                Фотоволтаици за вашия бизнес
              </h1>
              <p className="text-body text-lg mb-6">
                Оптимизирайте енергийните разходи на предприятието. 
                Предлагаме индивидуални решения за бизнеси с различни мощности и специфики.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Безплатен оглед и анализ на консумацията',
                  'Индивидуални проекти за всяка мощност',
                  'Безплатен мониторинг чрез Solis',
                  'Дистанционна поддръжка 24/7',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
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
                  </a>
                </Button>
              </div>
            </div>
            <div className="bg-muted/50 rounded-2xl aspect-[4/3] flex items-center justify-center">
              <Building2 className="w-24 h-24 text-primary/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-background">
        <div className="container-section">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-sm font-semibold text-primary mb-3">ПОЛЗИ ЗА БИЗНЕСА</span>
            <h2 className="heading-section text-foreground">
              Инвестиция с бърза възвръщаемост
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="card-elevated p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary">
                  {benefit.icon}
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Specifics */}
      <section className="section-padding bg-muted/30">
        <div className="container-section">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-sm font-semibold text-primary mb-3">ПОДХОД</span>
              <h2 className="heading-section text-foreground mb-4">
                Специфики за бизнес проекти
              </h2>
            </div>
            <div className="space-y-6">
              <div className="card-elevated p-6">
                <h3 className="font-display font-semibold text-foreground mb-2">По-големи мощности</h3>
                <p className="text-muted-foreground">
                  За бизнес клиенти предлагаме системи с мощност над 15kW — до 100kW и повече, 
                  в зависимост от нуждите и характеристиките на обекта.
                </p>
              </div>
              <div className="card-elevated p-6">
                <h3 className="font-display font-semibold text-foreground mb-2">Анализ на консумацията</h3>
                <p className="text-muted-foreground">
                  Преди изготвяне на оферта анализираме профила на консумация на предприятието, 
                  за да предложим оптимално оразмерена система.
                </p>
              </div>
              <div className="card-elevated p-6">
                <h3 className="font-display font-semibold text-foreground mb-2">Гъвкави решения</h3>
                <p className="text-muted-foreground">
                  Покривни, наземни или комбинирани инсталации — подбираме най-подходящия вариант 
                  за вашия обект.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProcessSection />
      <ContactSection />
    </Layout>
  );
};

export default SolarForBusiness;
