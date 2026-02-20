import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, SunMedium, Sparkles } from 'lucide-react';
import { brands, siteConfig } from '@/content/site-content';

const navigation = {
  услуги: [
    { name: 'Фотоволтаици за дома', href: '/фотоволтаици-за-дома' },
    { name: 'Фотоволтаици за бизнес', href: '/фотоволтаици-за-бизнес' },
    { name: 'Батерии и надграждане', href: '/услуги#батерии' },
    { name: 'Мониторинг и поддръжка', href: '/услуги#мониторинг' },
    { name: 'EV charging station', href: '/услуги#ev-charging' },
  ],
  компания: [
    { name: 'За нас', href: '/за-нас' },
    { name: 'Проекти', href: '/проекти' },
    { name: 'Промоции', href: '/промоции' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Контакти', href: '/контакти' },
  ],
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-foreground text-primary-foreground">
      <div className="orb orb-teal left-[-9rem] top-16 h-52 w-52" />
      <div className="orb orb-accent bottom-10 right-[-6rem] h-44 w-44" />

      <div className="container-section relative section-padding">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="mb-6 inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-card">
                <SunMedium className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-xl font-bold leading-none">NRGsolution</p>
                <p className="text-xs tracking-[0.16em] text-primary-foreground/65 uppercase">Solar Energy</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-primary-foreground/75">
              Изграждане на фотоволтаични системи за къщи и предприятия в цяла България.
              Приоритет: бърза консултация и оферта по телефон.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg">Услуги</h3>
            <ul className="space-y-3">
              {navigation.услуги.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-sm text-primary-foreground/70 transition-colors hover:text-accent">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg">Компания</h3>
            <ul className="space-y-3">
              {navigation.компания.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-sm text-primary-foreground/70 transition-colors hover:text-accent">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-lg">Контакти</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href={siteConfig.phoneHref} className="inline-flex items-start gap-3 text-primary-foreground/80 hover:text-accent">
                  <Phone className="mt-0.5 h-5 w-5 text-primary" />
                  <span>
                    <span className="block text-base font-bold text-primary-foreground">{siteConfig.phoneDisplay}</span>
                    {siteConfig.workingHours}
                  </span>
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-primary-foreground/80">
                <Mail className="h-5 w-5 text-primary" />
                {siteConfig.email}
              </li>
              <li className="inline-flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                {siteConfig.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-8">
          <p className="mb-4 text-center text-sm text-primary-foreground/60">Работим с</p>
          <div className="marquee-wrap overflow-hidden rounded-xl border border-primary-foreground/10 py-4">
            <div className="marquee-track gap-10 px-4">
              {[...brands, ...brands].map((brand, idx) => (
                <span key={`${brand.name}-${idx}`} className="inline-flex items-center gap-2 rounded-lg bg-primary-foreground/5 px-4 py-2 text-sm font-semibold text-primary-foreground/80">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  {brand.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-section flex flex-col gap-3 py-5 text-xs text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} NRGsolution. Всички права запазени.</p>
          <p>Политика за поверителност и условия: ще бъдат добавени при финално юридическо одобрение.</p>
        </div>
      </div>
    </footer>
  );
}
