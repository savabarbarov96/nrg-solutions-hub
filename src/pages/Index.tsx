import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { WhyUsSection } from '@/components/home/WhyUsSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { BrandsSection } from '@/components/home/BrandsSection';
import { CertificatesSection } from '@/components/home/CertificatesSection';
import { FAQSection } from '@/components/home/FAQSection';
import { ContactSection } from '@/components/home/ContactSection';
import { PricingOfferGrid } from '@/components/pricing/PricingOfferGrid';
import { pricingOfferCategories } from '@/content/pricing-offers';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <BrandsSection />

      <div className="bg-background">
        <div className="container-section pt-16 pb-4 text-center">
          <span className="section-eyebrow">Пакетни оферти</span>
          <h2 className="heading-section mt-5 text-foreground">
            Изберете системата, която пасва на вашия обект
          </h2>
          <p className="text-body mx-auto mt-4 max-w-2xl">
            Три категории с фиксирани пакети — всичко е включено: оборудване, конструкция, кабели и монтаж.
          </p>
        </div>
      </div>

      <PricingOfferGrid
        sectionId="оферти-монофазна-lv"
        category="mono-lv"
        eyebrow={pricingOfferCategories['mono-lv'].eyebrow}
        title={pricingOfferCategories['mono-lv'].title}
        subtitle={pricingOfferCategories['mono-lv'].subtitle}
        tone="default"
      />

      <PricingOfferGrid
        sectionId="оферти-трифазна-lv"
        category="3phase-lv"
        eyebrow={pricingOfferCategories['3phase-lv'].eyebrow}
        title={pricingOfferCategories['3phase-lv'].title}
        subtitle={pricingOfferCategories['3phase-lv'].subtitle}
        tone="muted"
      />

      <PricingOfferGrid
        sectionId="оферти-трифазна-hv"
        category="3phase-hv"
        eyebrow={pricingOfferCategories['3phase-hv'].eyebrow}
        title={pricingOfferCategories['3phase-hv'].title}
        subtitle={pricingOfferCategories['3phase-hv'].subtitle}
        tone="accent"
      />

      <ProcessSection />
      <ProjectsSection />
      <CertificatesSection />
      <FAQSection />
      <ContactSection />
      <WhyUsSection />
    </Layout>
  );
};

export default Index;
