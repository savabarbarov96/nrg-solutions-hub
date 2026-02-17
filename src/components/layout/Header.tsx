import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ChevronRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/content/site-content';

const navigation = [
  { name: 'Начало', href: '/' },
  { name: 'Цени', href: '/цени' },
  { name: 'Проекти', href: '/проекти' },
  { name: 'Контакти', href: '/контакти' },
];

const urgencyItems = [
  { icon: '⚡', text: 'Работим в цяла България' },
  { icon: '🛡️', text: 'Извън България не обслужваме обекти' },
  { icon: '📞', text: 'Безплатна консултация' },
  { icon: '⏱️', text: 'Бърз монтаж до 5 дни' },
  { icon: '🔋', text: 'Гаранция до 25 години' },
];

function UrgencyBanner() {
  const items = [...urgencyItems, ...urgencyItems, ...urgencyItems, ...urgencyItems];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-900">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,hsl(47_98%_54%/.08)_25%,hsl(175_79%_40%/.12)_50%,hsl(47_98%_54%/.08)_75%,transparent_100%)] animate-[shimmer_4s_linear_infinite]" />
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-emerald-900 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-emerald-900 to-transparent" />
      <div className="flex w-max animate-[marquee_40s_linear_infinite]">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-6 px-6">
            <span className="flex items-center gap-2 whitespace-nowrap py-2 text-[13px] font-semibold tracking-wide text-white/90">
              <span className="text-sm">{item.icon}</span>
              {item.text}
            </span>
            <span className="h-1 w-1 rounded-full bg-amber-400/60" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Urgency infinite scroll banner */}
      <div className={cn(
        'transition-all duration-500 ease-out',
        scrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-auto opacity-100'
      )}>
        <UrgencyBanner />
      </div>

      {/* Main nav */}
      <nav
        className={cn(
          'transition-all duration-300',
          scrolled
            ? 'bg-white/90 backdrop-blur-2xl shadow-[0_1px_3px_0_rgb(0_0_0/.06),0_4px_24px_-4px_rgb(0_0_0/.08)] border-b border-black/[0.04]'
            : 'bg-white/70 backdrop-blur-xl border-b border-black/[0.06]'
        )}
        aria-label="Global"
      >
        <div className="container-section relative flex h-16 items-center justify-between lg:h-[72px]">
          {/* Logo */}
          <Link to="/" className="group flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="relative"
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-xl bg-teal-400/20 blur-xl"
              />
              <img
                src="/logo-transparent.png"
                alt="NrgSolution"
                className="relative h-14 w-auto object-contain drop-shadow-md lg:h-16"
              />
            </motion.div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:absolute lg:left-1/2 lg:flex lg:-translate-x-1/2 lg:items-center lg:gap-0.5">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'relative rounded-lg px-3.5 py-2 text-[15px] font-medium transition-all duration-200',
                    isActive
                      ? 'text-teal-700'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-teal-600" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <a
              href={siteConfig.phoneHref}
              className="group flex items-center gap-2 text-[15px] font-semibold text-gray-700 transition-colors hover:text-teal-700"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-100">
                <Phone className="h-4 w-4" />
              </div>
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition-all duration-200 hover:shadow-xl hover:shadow-teal-600/30 hover:brightness-110"
            >
              Обади се сега
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className={cn(
              'relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 lg:hidden',
              mobileMenuOpen
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            )}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">Отвори меню</span>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 ease-out lg:hidden',
            mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="border-t border-gray-100 bg-white px-4 pb-6 pt-3">
            <div className="space-y-0.5">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-150',
                      isActive
                        ? 'bg-teal-50 text-teal-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100'
                    )}
                  >
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />}
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile location note */}
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-3 text-sm text-teal-800">
              <MapPin className="h-4 w-4 shrink-0 text-teal-600" />
              <span className="font-medium">Работим в цяла България</span>
            </div>

            {/* Mobile phone CTA */}
            <a
              href={siteConfig.phoneHref}
              className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-4 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-teal-600/20"
            >
              <Phone className="h-4.5 w-4.5" />
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
