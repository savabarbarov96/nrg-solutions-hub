import { brands } from '@/content/site-content';

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
                <div
                  key={`a-${index}`}
                  className="group flex items-center gap-3 rounded-2xl border border-gray-200/80 bg-white px-6 py-4 shadow-[0_1px_3px_rgb(0_0_0/.04)] transition-all duration-300 hover:border-teal-200 hover:shadow-[0_4px_20px_-4px_rgb(0_128_128/.12)]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-teal-50 to-emerald-50 transition-colors group-hover:from-teal-100 group-hover:to-emerald-100">
                    <svg className="h-4.5 w-4.5 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2" /><path d="M12 20v2" />
                      <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
                      <path d="M2 12h2" /><path d="M20 12h2" />
                      <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
                    </svg>
                  </div>
                  <span className="font-display text-lg font-bold tracking-tight text-gray-800 whitespace-nowrap sm:text-xl">
                    {brand}
                  </span>
                </div>
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
                <div
                  key={`b-${index}`}
                  className="group flex items-center gap-3 rounded-2xl border border-gray-200/80 bg-white px-6 py-4 shadow-[0_1px_3px_rgb(0_0_0/.04)] transition-all duration-300 hover:border-amber-200 hover:shadow-[0_4px_20px_-4px_rgb(180_140_20/.12)]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-50 to-yellow-50 transition-colors group-hover:from-amber-100 group-hover:to-yellow-100">
                    <svg className="h-4.5 w-4.5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <span className="font-display text-lg font-bold tracking-tight text-gray-800 whitespace-nowrap sm:text-xl">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
