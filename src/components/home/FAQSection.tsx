import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    question: 'Работите ли с апартаменти?',
    answer: 'Монтажът на фотоволтаици за апартаменти е по-сложен процес, тъй като е необходимо разрешение за монтаж на общия покрив от етажната собственост. Обадете се на 0888 123 456 за повече информация и консултация по вашия конкретен случай.',
  },
  {
    question: 'Безплатен ли е огледът?',
    answer: 'Да, огледът е напълно безплатен. Наш специалист ще посети обекта, ще направи оценка и ще изготви детайлна оферта според вашите нужди и особеностите на покрива/терена.',
  },
  {
    question: 'Какво включва мониторингът и поддръжката?',
    answer: 'Всички наши клиенти получават безплатен достъп до приложението Solis за мониторинг в реално време. При възникнал проблем предлагаме дистанционна диагностика и troubleshooting. Можете да се обадите по всяко време.',
  },
  {
    question: 'Може ли надграждане на съществуваща система?',
    answer: 'Да, предлагаме надграждане на съществуващи фотоволтаични системи — добавяне на панели, батерии или смяна на инвертор. Обадете се за оценка на възможностите.',
  },
  {
    question: 'Какво е нужно за узаконяване (лична консумация)?',
    answer: 'При системи за лична консумация узаконяването става чрез упълномощаване към доставчика на електричество. Ние съдействаме напълно в този процес, като ви обясняваме всяка стъпка.',
  },
  {
    question: 'Колко време отнема процесът?',
    answer: 'Времето зависи от спецификата на проекта — размер на системата, достъпност на покрива, административни процедури. Обикновено от първия контакт до пускане в експлоатация са необходими няколко седмици. Обадете се за по-точна оценка.',
  },
];

export function FAQSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-section">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Header */}
          <div>
            <span className="inline-block text-sm font-semibold text-primary mb-3">ВЪПРОСИ</span>
            <h2 className="heading-section text-foreground mb-4">
              Често задавани въпроси
            </h2>
            <p className="text-body mb-8">
              Отговори на най-честите въпроси за фотоволтаичните системи и нашите услуги. 
              Не намирате отговор? Обадете се или пишете ни.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="accent" asChild>
                <a href="tel:+359888123456">Обади се: 0888 123 456</a>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/faq">Всички въпроси</Link>
              </Button>
            </div>
          </div>

          {/* Accordion */}
          <div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-background rounded-xl border border-border px-5 data-[state=open]:shadow-card"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
