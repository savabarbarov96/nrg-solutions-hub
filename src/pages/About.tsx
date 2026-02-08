import { Layout } from '@/components/layout/Layout';
import { Phone, Users, MapPin, Shield, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrandsSection } from '@/components/home/BrandsSection';

const values = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Качество',
    description: 'Работим само с проверени марки и материали с доказана надеждност.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Професионализъм',
    description: 'Екипът ни се състои от квалифицирани електротехници с богат опит.',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Отговорност',
    description: 'Поемаме пълна грижа за вашата система — от монтажа до поддръжката.',
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-muted/50 to-background">
        <div className="container-section">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-sm font-semibold text-primary mb-4">ЗА НАС</span>
              <h1 className="heading-display text-foreground mb-6">
                NRGsolution — вашият партньор в соларната енергия
              </h1>
              <p className="text-body text-lg mb-6">
                Ние сме компания за изграждане на фотоволтаични системи за домове и предприятия. 
                Работим в цяла България с мобилен екип от професионалисти.
              </p>
              <p className="text-body mb-8">
                Нашата мисия е да направим соларната енергия достъпна и лесна за всеки. 
                От първия контакт до дългосрочната поддръжка — грижим се за всеки детайл.
              </p>
              <Button variant="accent" size="lg" className="gap-2" asChild>
                <a href="tel:+359888123456">
                  <Phone className="w-5 h-5" />
                  Свържете се с нас
                </a>
              </Button>
            </div>
            <div className="bg-muted/50 rounded-2xl aspect-[4/3] flex items-center justify-center">
              <Zap className="w-24 h-24 text-primary/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background">
        <div className="container-section">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-sm font-semibold text-primary mb-3">ЦЕННОСТИ</span>
            <h2 className="heading-section text-foreground">
              Нашият подход
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div key={value.title} className="card-elevated p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                  {value.icon}
                </div>
                <h3 className="heading-card text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="section-padding bg-muted/30">
        <div className="container-section">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-sm font-semibold text-primary mb-3">ПОКРИТИЕ</span>
              <h2 className="heading-section text-foreground mb-4">
                Национално покритие
              </h2>
              <p className="text-body mb-6">
                Работим в цяла България — от големите градове до малките села. 
                Нашият екип е мобилен и разполага с пълния набор от оборудване за монтаж на място.
              </p>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border">
                <MapPin className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Офис</p>
                  <p className="text-sm text-muted-foreground">Стара Загора, ул. Ген. Столетов 199</p>
                </div>
              </div>
            </div>
            <div className="bg-background rounded-2xl p-8 aspect-square flex items-center justify-center border border-border">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                <p className="text-muted-foreground">Карта на България</p>
                <p className="text-sm text-muted-foreground">(placeholder)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <BrandsSection />

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-section text-center">
          <h2 className="heading-section text-primary-foreground mb-4">
            Готови ли сте за соларна енергия?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Обадете се днес за безплатна консултация и оферта. 
            Ще ви помогнем да направите правилния избор.
          </p>
          <Button variant="accent" size="xl" asChild>
            <a href="tel:+359888123456">
              <Phone className="w-5 h-5 mr-2" />
              0888 123 456
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default About;
