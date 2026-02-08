import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { faqItems, siteConfig } from '@/content/site-content';

export function FAQSection() {
  const teaserFaqs = faqItems.slice(0, 6);

  return (
    <section className="section-padding bg-background">
      <div className="container-section">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="section-eyebrow">FAQ</span>
            <h2 className="heading-section mt-5 text-foreground">Често задавани въпроси</h2>
            <p className="text-body mt-4">
              Включили сме ключовите въпроси за апартаменти, оглед, поддръжка, надграждане и узаконяване.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button variant="accent" asChild>
                <a href={siteConfig.phoneHref}>Обади се: {siteConfig.phoneDisplay}</a>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/faq">Пълна FAQ страница</Link>
              </Button>
            </div>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {teaserFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="rounded-xl border border-border/80 bg-muted/30 px-5 data-[state=open]:bg-white data-[state=open]:shadow-soft"
              >
                <AccordionTrigger className="py-4 text-left font-display text-base font-semibold text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
