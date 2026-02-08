import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { PackagesSection } from '@/components/home/PackagesSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { WhyUsSection } from '@/components/home/WhyUsSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { BrandsSection } from '@/components/home/BrandsSection';
import { PromosSection } from '@/components/home/PromosSection';
import { FAQSection } from '@/components/home/FAQSection';
import { ContactSection } from '@/components/home/ContactSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <BrandsSection />
      <PackagesSection />
      <ProcessSection />
      <WhyUsSection />
      <ProjectsSection />
      <PromosSection />
      <FAQSection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
