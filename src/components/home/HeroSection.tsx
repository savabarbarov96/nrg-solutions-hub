import { useMemo, useState } from 'react';
import { Phone, CalendarCheck2, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/content/site-content';
import stockVideoPrimary from '../../../nrgsolution_stock1.mp4';
import stockVideoSecondary from '../../../stock2.mp4';

export function HeroSection() {
  const videoPlaylist = useMemo(() => [stockVideoPrimary, stockVideoSecondary], []);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const handleVideoEnded = () => {
    setActiveVideoIndex((prev) => (prev + 1) % videoPlaylist.length);
  };

  return (
    <section className="relative isolate min-h-[80vh] overflow-hidden border-b border-black/30 sm:min-h-[86vh]">
      <video
        key={videoPlaylist[activeVideoIndex]}
        className="absolute inset-0 h-full w-full object-cover"
        src={videoPlaylist[activeVideoIndex]}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnded}
      />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,hsl(212_56%_6%/.84)_0%,hsl(190_77%_10%/.74)_42%,hsl(184_49%_13%/.6)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,hsl(46_96%_56%/.22)_0,transparent_34%),radial-gradient(circle_at_12%_90%,hsl(180_84%_38%/.22)_0,transparent_38%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(hsl(0_0%_100%/.09)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/.06)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="container-section relative z-10 flex min-h-[80vh] items-center py-14 sm:min-h-[86vh] sm:py-16 lg:py-20">
        <div className="max-w-3xl -translate-y-4 sm:-translate-y-6 lg:-translate-y-8">
          <div className="reveal-up inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white/90 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Premium Solar Systems
          </div>
          <h1 className="reveal-up reveal-delay-1 mt-5 text-4xl font-extrabold leading-[0.98] text-white sm:text-6xl lg:text-7xl">
            ВКлючи се в бъдещето
          </h1>
          <p className="reveal-up reveal-delay-2 mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-xl">
            Кино-визия, инженерна прецизност и цялостно изпълнение на фотоволтаични системи за дом и бизнес в цяла
            България.
          </p>

          <div className="reveal-up reveal-delay-3 mt-9 flex flex-col gap-4 sm:flex-row">
            <Button variant="accent" size="xl" className="gap-3 text-base" asChild>
              <a href={siteConfig.phoneHref}>
                <Phone className="h-5 w-5" />
                Обади се сега
              </a>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="gap-3 border-white/45 bg-black/25 text-white hover:border-white/80 hover:bg-black/40 hover:text-white"
              asChild
            >
              <a href="/контакти#оглед">
                <CalendarCheck2 className="h-5 w-5" />
                Безплатен оглед
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
