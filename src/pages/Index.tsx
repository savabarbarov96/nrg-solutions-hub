import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { WhyUsSection } from '@/components/home/WhyUsSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { BrandsSection } from '@/components/home/BrandsSection';
import { CertificatesSection } from '@/components/home/CertificatesSection';
import { FAQSection } from '@/components/home/FAQSection';
import { ContactSection } from '@/components/home/ContactSection';
import { Pricing as PricingSection } from '@/components/ui/single-pricing-card-1';
import { PricingOfferGrid } from '@/components/pricing/PricingOfferGrid';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <BrandsSection />
      <PricingOfferGrid title="Пакетни оферти" />
      <PricingSection />
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
