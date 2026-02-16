import { Award, ShieldCheck, BadgeCheck, CheckCircle2 } from 'lucide-react';

export function CertificatesSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-blue-50 py-16 sm:py-20">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.4] [background-image:radial-gradient(hsl(175_79%_28%/.08)_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Decorative circles */}
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-teal-100/30 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-blue-100/30 blur-3xl" />

      <div className="relative container-section">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-teal-200/60 bg-teal-50/80 px-5 py-2 text-[13px] font-bold uppercase tracking-[0.18em] text-teal-700 mb-5">
            <Award className="h-4 w-4" />
            Професионална квалификация
          </div>
          <h2 className="font-display text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl tracking-tight">
            Сертификати за{' '}
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              качество
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Сертифицирани специалисти за безопасен и качествен монтаж на фотоволтаични системи
          </p>
        </div>

        {/* Certificate Card */}
        <div className="max-w-5xl mx-auto">
          <div className="relative group">
            {/* Glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-blue-500 to-emerald-500 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500" />

            <div className="relative bg-white rounded-2xl border-2 border-teal-100 shadow-2xl overflow-hidden">
              {/* Certificate header with decorative pattern */}
              <div className="relative bg-gradient-to-r from-teal-600 via-teal-500 to-blue-600 px-8 py-8 sm:px-12 sm:py-10">
                <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(30deg,transparent_12%,rgba(255,255,255,0.5)_12.5%,rgba(255,255,255,0.5)_13%,transparent_13.5%,transparent)] [background-size:20px_20px]" />

                <div className="relative flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40">
                      <ShieldCheck className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <p className="text-white/90 text-sm font-semibold uppercase tracking-wider">Certificate</p>
                      <h3 className="text-white text-xl sm:text-2xl font-extrabold tracking-tight">
                        Proof of Professional Competence
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                    <BadgeCheck className="h-5 w-5 text-white" />
                    <span className="text-white font-bold text-sm">Certified</span>
                  </div>
                </div>
              </div>

              {/* Certificate body */}
              <div className="px-8 py-10 sm:px-12 sm:py-12">
                <div className="space-y-8">
                  {/* Certification type */}
                  <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-100">
                    <p className="text-sm font-semibold text-teal-700 uppercase tracking-wider mb-2">
                      Certification Type
                    </p>
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                      First Installer of Solar Power Installations on Roofs (PV)
                    </h4>
                    <p className="mt-3 text-sm text-muted-foreground">
                      This certificate confirms that the first installer of solar power installations on roofs (PV) is certified for connection to the electrical grid in accordance with the installation expert scheme for solar power installations.
                    </p>
                  </div>

                  {/* Certificate holder and details */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Issued to
                      </p>
                      <p className="text-2xl font-bold text-gray-900">A. Todorov</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Issue Date
                      </p>
                      <p className="text-2xl font-bold text-gray-900">2 March 2023</p>
                    </div>
                  </div>

                  {/* Organizing body */}
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Organized by
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="bg-white rounded-lg border border-gray-200 px-4 py-2 shadow-sm">
                        <p className="text-sm font-bold text-gray-900">BDA Roof and Façade Training</p>
                        <p className="text-xs text-muted-foreground">(BDA Dak- en Gevelopleidingen)</p>
                      </div>
                      <div className="bg-white rounded-lg border border-gray-200 px-4 py-2 shadow-sm">
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm font-bold text-gray-900">Gorinchem, Netherlands</p>
                      </div>
                    </div>
                  </div>

                  {/* Authorized signatures */}
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                      Authorized Signatures
                    </p>
                    <div className="flex flex-wrap gap-6">
                      <div className="flex-1 min-w-[150px]">
                        <div className="border-b-2 border-gray-300 pb-1 mb-2">
                          <p className="text-lg font-semibold text-gray-700 font-serif italic">H.J. van Veluw</p>
                        </div>
                        <p className="text-xs text-muted-foreground">On behalf of BDA</p>
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <div className="border-b-2 border-gray-300 pb-1 mb-2">
                          <p className="text-lg font-semibold text-gray-700 font-serif italic">H.D.T. de Mooij</p>
                        </div>
                        <p className="text-xs text-muted-foreground">On behalf of BDA</p>
                      </div>
                    </div>
                  </div>

                  {/* Accrediting organizations */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-teal-600" />
                      Recognized by Accrediting Organizations
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {['BDA', 'Rijksoverheid', 'ISSO', 'InstallQ'].map((org) => (
                        <div
                          key={org}
                          className="inline-flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-4 py-2 shadow-sm"
                        >
                          <div className="h-2 w-2 rounded-full bg-teal-500" />
                          <span className="text-sm font-bold text-gray-900">{org}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate footer with decorative seal */}
              <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-t border-gray-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                        <CheckCircle2 className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Officially Certified</p>
                      <p className="text-xs text-muted-foreground">Valid and recognized certification</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Binding declared as of 1 January 2021
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-3">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="font-bold text-gray-900">Сертифициран монтаж</h4>
            <p className="text-sm text-muted-foreground mt-1">Съответствие с изискванията за безопасност</p>
          </div>
          <div className="text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-3">
              <BadgeCheck className="h-6 w-6" />
            </div>
            <h4 className="font-bold text-gray-900">Професионална квалификация</h4>
            <p className="text-sm text-muted-foreground mt-1">Признати международни стандарти</p>
          </div>
          <div className="text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="font-bold text-gray-900">Гарантирано качество</h4>
            <p className="text-sm text-muted-foreground mt-1">Експертна инсталация на PV системи</p>
          </div>
        </div>
      </div>
    </section>
  );
}
