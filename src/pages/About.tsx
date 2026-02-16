import { Layout } from '@/components/layout/Layout';
import { Phone, Users, MapPin, ShieldCheck, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrandsSection } from '@/components/home/BrandsSection';
import { CertificatesSection } from '@/components/home/CertificatesSection';
import { TimelineDemo } from '@/components/home/timeline-demo';
import { siteConfig } from '@/content/site-content';

const values = [
  {
    icon: ShieldCheck,
    title: 'Качество в изпълнението',
    description: 'Работа с утвърдени компоненти и стриктен монтажен процес.',
  },
  {
    icon: Users,
    title: 'Професионален екип',
    description: 'Квалифицирани специалисти с реален опит на терен.',
  },
  {
    icon: BadgeCheck,
    title: 'Отговорност след монтажа',
    description: 'Мониторинг, дистанционна поддръжка и лесен контакт по телефон.',
  },
];

const About = () => {
  return (
    <Layout>
      <section className="section-padding bg-[var(--gradient-hero)]">
        <div className="container-section">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="section-eyebrow">За нас</span>
              <h1 className="heading-display mt-5 text-foreground">NRGsolution: практичен партньор за соларни системи</h1>
              <p className="text-body mt-5">
                Изграждаме фотоволтаични системи за къщи и предприятия. Работим само на територията на България.
              </p>
              <Button variant="accent" size="lg" className="mt-7" asChild>
                <a href={siteConfig.phoneHref}>
                  <Phone className="mr-2 h-5 w-5" />
                  Обади се: {siteConfig.phoneDisplay}
                </a>
              </Button>
            </div>

            <div className="rounded-3xl border border-border/80 bg-white p-2 sm:p-4 shadow-card">
              <TimelineDemo compact />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-section grid gap-5 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <article key={value.title} className="rounded-2xl border border-border/80 bg-white p-6 shadow-soft">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-foreground">{value.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <CertificatesSection />

      <section className="section-padding bg-muted/30">
        <div className="container-section">
          <div className="mx-auto max-w-4xl rounded-2xl border border-border/80 bg-white p-7 shadow-soft">
            <h2 className="heading-card text-foreground">Национално покритие</h2>
            <p className="mt-3 text-muted-foreground">Обслужваме обекти в цяла България с мобилен екип и осигурен транспорт.</p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              {siteConfig.address}
            </p>
          </div>
        </div>
      </section>

      <BrandsSection />
    </Layout>
  );
};

export default About;
