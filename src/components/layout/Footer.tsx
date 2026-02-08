import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Sun, Facebook, Instagram, Linkedin } from 'lucide-react';

const navigation = {
  услуги: [
    { name: 'Фотоволтаици за дома', href: '/фотоволтаици-за-дома' },
    { name: 'Фотоволтаици за бизнес', href: '/фотоволтаици-за-бизнес' },
    { name: 'Батерии и надграждане', href: '/услуги#батерии' },
    { name: 'Мониторинг и поддръжка', href: '/услуги#мониторинг' },
    { name: 'EV зарядни станции', href: '/услуги#ev-charging' },
  ],
  компания: [
    { name: 'За нас', href: '/за-нас' },
    { name: 'Проекти', href: '/проекти' },
    { name: 'Промоции', href: '/промоции' },
    { name: 'Често задавани въпроси', href: '/faq' },
    { name: 'Контакти', href: '/контакти' },
  ],
};

const brands = ['Dyness', 'Diae', 'Jinko', 'JA Solar', 'Canadian Solar', 'Longi'];

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main Footer */}
      <div className="container-section section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
                <Sun className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-primary-foreground">
                NRG<span className="text-accent">solution</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Професионален монтаж на фотоволтаични системи за дома и бизнеса в цяла България. 
              Безплатен мониторинг и дистанционна поддръжка.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-foreground/10 hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-foreground/10 hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-foreground/10 hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Услуги</h3>
            <ul className="space-y-3">
              {navigation.услуги.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.href} 
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Компания</h3>
            <ul className="space-y-3">
              {navigation.компания.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.href} 
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Контакти</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="tel:+359888123456" 
                  className="flex items-start gap-3 text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  <Phone className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <div className="text-primary-foreground font-semibold">0888 123 456</div>
                    <div className="text-sm">Пон - Пет: 9:00 - 18:00</div>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@nrgsolution.bg" 
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  info@nrgsolution.bg
                </a>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/70 text-sm">
                <MapPin className="w-5 h-5 mt-0.5 text-primary" />
                <span>Стара Загора, ул. Ген. Столетов 199</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Brands */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <p className="text-sm text-primary-foreground/50 mb-4 text-center">Работим с утвърдени марки:</p>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
            {brands.map((brand) => (
              <span key={brand} className="text-sm font-medium text-primary-foreground/70">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-section py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} NRGsolution. Всички права запазени.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/50">
            <Link to="/политика-за-поверителност" className="hover:text-primary-foreground transition-colors">
              Политика за поверителност
            </Link>
            <Link to="/условия-за-ползване" className="hover:text-primary-foreground transition-colors">
              Условия за ползване
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
