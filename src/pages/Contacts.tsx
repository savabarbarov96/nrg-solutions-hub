import { Layout } from '@/components/layout/Layout';
import { ContactSection } from '@/components/home/ContactSection';

const Contacts = () => {
  return (
    <Layout>
      <section className="section-padding bg-[var(--gradient-hero)]">
        <div className="container-section">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-eyebrow">Контакти</span>
            <h1 className="heading-display mt-5 text-foreground">Обади се сега или изпрати запитване</h1>
            <p className="text-body mt-5 text-lg">Основен канал: телефон. Втори канал: форма за безплатен оглед.</p>
          </div>
        </div>
      </section>
      <ContactSection />
    </Layout>
  );
};

export default Contacts;
