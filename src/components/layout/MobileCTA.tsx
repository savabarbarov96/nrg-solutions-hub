import { Phone, CalendarDays } from 'lucide-react';
import { siteConfig } from '@/content/site-content';

export function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Frosted glass bottom bar */}
      <div className="border-t border-white/20 bg-gradient-to-r from-emerald-900/95 via-teal-800/95 to-emerald-900/95 backdrop-blur-2xl px-4 py-3 safe-area-pb">
        <div className="flex gap-2.5">
          <a
            href={siteConfig.phoneHref}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-[14px] font-bold text-gray-900 shadow-lg shadow-amber-500/30 transition-all active:scale-[0.97]"
          >
            <Phone className="h-4.5 w-4.5" />
            Обади се
          </a>
          <a
            href="/контакти#оглед"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-[14px] font-bold text-white transition-all active:scale-[0.97] active:bg-white/20"
          >
            <CalendarDays className="h-4.5 w-4.5" />
            Безплатен оглед
          </a>
        </div>
      </div>
    </div>
  );
}
