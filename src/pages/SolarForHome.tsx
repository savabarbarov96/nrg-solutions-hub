import { Layout } from '@/components/layout/Layout';
import { Phone, Calendar, CheckCircle, Home as HomeIcon, Lightbulb, Shield, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PackagesSection } from '@/components/home/PackagesSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { FAQSection } from '@/components/home/FAQSection';
import { ContactSection } from '@/components/home/ContactSection';

const benefits = [
  {
    icon: <Wallet className="w-6 h-6" />,
    title: 'Намалете сметките',
    description: 'Спестете до 90% от разходите за електроенергия с правилно оразмерена система.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Енергийна независимост',
    description: 'Произвеждайте собствена енергия и намалете зависимостта от мрежата.',
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: 'Пълен контрол',
    description: 'Следете производството в реално време през мобилното приложение Solis.',
  },
  {
    icon: <HomeIcon className="w-6 h-6" />,
    title: 'Повишена стойност',
    description: 'Соларната система увеличава пазарната стойност на вашия имот.',
  },
];

const SolarForHome = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-muted/50 to-background">
        <div className="container-section">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-sm font-semibold text-primary mb-4">ЗА ДОМА</span>
              <h1 className="heading-display text-foreground mb-6">
                Фотоволтаици за вашия дом
              </h1>
              <p className="text-body text-lg mb-6">
                Намалете сметките за ток и станете енергийно независими. 
                Предлагаме цялостни решения за къщи с покрив или двор в цяла България.
              </p>
              <ul className="space-y-3 mb-8">
                {['Безплатен оглед и консултация', 'Професионален монтаж', 'Безплатен мониторинг чрез Solis', 'Дистанционна поддръжка'].map((item) => (
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
              <HomeIcon className="w-24 h-24 text-primary/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-background">
        <div className="container-section">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-sm font-semibold text-primary mb-3">ПОЛЗИ</span>
            <h2 className="heading-section text-foreground">
              Защо да инвестирате в соларна система
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

      <PackagesSection />
      <ProcessSection />
      <FAQSection />
      <ContactSection />
    </Layout>
  );
};

export default SolarForHome;
