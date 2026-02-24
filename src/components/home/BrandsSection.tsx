import { useState } from 'react';
import { brands } from '@/content/site-content';

function BrandCard({ brand, variant }: { brand: typeof brands[number]; variant: 'teal' | 'amber' }) {
  const [imgError, setImgError] = useState(false);

  const borderHover = variant === 'teal'
    ? 'hover:border-teal-200 hover:shadow-[0_4px_20px_-4px_rgb(0_128_128/.12)]'
    : 'hover:border-amber-200 hover:shadow-[0_4px_20px_-4px_rgb(180_140_20/.12)]';

  return (
    <div
      className={`group flex items-center justify-center rounded-2xl border border-gray-200/80 bg-white px-5 py-3 shadow-[0_1px_3px_rgb(0_0_0/.04)] transition-all duration-300 ${borderHover}`}
    >
      <div className="flex h-[48px] w-[140px] items-center justify-center">
        {imgError ? (
          <span className="font-display text-lg font-bold tracking-tight text-gray-800 whitespace-nowrap">
            {brand.name}
          </span>
        ) : (
          <img
            src={brand.logo}
            alt={brand.name}
            loading="eager"
            className="max-h-[48px] max-w-[140px] w-auto h-auto object-contain opacity-90 transition-all duration-300 group-hover:opacity-100"
            onError={() => setImgError(true)}
          />
        )}
      </div>
    </div>
  );
}

export function BrandsSection() {
  const row = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(hsl(175_79%_28%/.1)_0.8px,transparent_0.8px)] [background-size:20px_20px]" />

      <div className="relative">
        {/* Section header */}
        <div className="container-section text-center mb-10 sm:mb-14">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-teal-200/60 bg-teal-50/80 px-5 py-2 text-[13px] font-bold uppercase tracking-[0.18em] text-teal-700 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
            Нашите Партньори
          </p>
          <h2 className="font-display text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl tracking-tight">
            Водещи Енергийни{' '}
            <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Брандове
            </span>
          </h2>
        </div>

        {/* Marquee — row 1 (left) */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 z-10 w-24 sm:w-40 bg-gradient-to-r from-gray-50 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 z-10 w-24 sm:w-40 bg-gradient-to-l from-gray-50 to-transparent" />

          <div className="overflow-hidden py-3">
            <div className="flex w-max animate-[marquee_30s_linear_infinite] items-center gap-8 sm:gap-12">
              {row.map((brand, index) => (
                <BrandCard key={`a-${index}`} brand={brand} variant="teal" />
              ))}
            </div>
          </div>
        </div>

        {/* Marquee — row 2 (right, reverse) */}
        <div className="relative mt-3">
          <div className="absolute left-0 top-0 bottom-0 z-10 w-24 sm:w-40 bg-gradient-to-r from-gray-50 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 z-10 w-24 sm:w-40 bg-gradient-to-l from-gray-50 to-transparent" />

          <div className="overflow-hidden py-3">
            <div className="flex w-max animate-[marquee-reverse_34s_linear_infinite] items-center gap-8 sm:gap-12">
              {[...row].reverse().map((brand, index) => (
                <BrandCard key={`b-${index}`} brand={brand} variant="amber" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
