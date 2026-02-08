import { Layout } from '@/components/layout/Layout';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqItems, siteConfig } from '@/content/site-content';

const groupedFaqs = faqItems.reduce((acc, faq) => {
  if (!acc[faq.category]) {
    acc[faq.category] = [];
  }
  acc[faq.category].push(faq);
  return acc;
}, {} as Record<string, typeof faqItems>);

const FAQ = () => {
  return (
    <Layout>
      <section className="section-padding bg-[var(--gradient-hero)]">
        <div className="container-section">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-eyebrow">FAQ</span>
            <h1 className="heading-display mt-5 text-foreground">Често задавани въпроси</h1>
            <p className="text-body mt-5 text-lg">Отговори с ясен и разбираем език, без технически жаргон.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-section">
          <div className="mx-auto max-w-4xl">
            {Object.entries(groupedFaqs).map(([category, items]) => (
              <div key={category} className="mb-10 last:mb-0">
                <h2 className="mb-4 text-xl font-bold text-foreground">{category}</h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {items.map((faq, index) => (
                    <AccordionItem
                      key={`${faq.question}-${index}`}
                      value={`${category}-${index}`}
                      className="rounded-xl border border-border/80 bg-muted/30 px-5 data-[state=open]:bg-white data-[state=open]:shadow-soft"
                    >
                      <AccordionTrigger className="py-4 text-left font-display font-semibold text-foreground hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-sm text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}

            <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-7 text-center">
              <h3 className="heading-card text-foreground">Не намирате вашия въпрос?</h3>
              <p className="mt-2 text-muted-foreground">Обадете се и ще получите конкретен отговор за вашия обект.</p>
              <Button variant="accent" size="lg" className="mt-5" asChild>
                <a href={siteConfig.phoneHref}>
                  <Phone className="mr-2 h-5 w-5" />
                  {siteConfig.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
