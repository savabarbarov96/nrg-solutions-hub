import { Layout } from '@/components/layout/Layout';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  // General
  {
    category: 'Общи въпроси',
    question: 'Работите ли с апартаменти?',
    answer: 'Монтажът на фотоволтаици за апартаменти е по-сложен процес, тъй като е необходимо разрешение за монтаж на общия покрив от етажната собственост. Обадете се на 0888 123 456 за повече информация и консултация по вашия конкретен случай.',
  },
  {
    category: 'Общи въпроси',
    question: 'Безплатен ли е огледът?',
    answer: 'Да, огледът е напълно безплатен. Наш специалист ще посети обекта, ще направи оценка и ще изготви детайлна оферта според вашите нужди и особеностите на покрива/терена.',
  },
  {
    category: 'Общи въпроси',
    question: 'Колко време отнема процесът?',
    answer: 'Времето зависи от спецификата на проекта — размер на системата, достъпност на покрива, административни процедури. Обикновено от първия контакт до пускане в експлоатация са необходими няколко седмици. Обадете се за по-точна оценка.',
  },
  {
    category: 'Общи въпроси',
    question: 'Работите ли в моя град?',
    answer: 'Да, NRGsolution работи в цяла България. Екипът ни е мобилен и разполага с осигурен транспорт за всички региони на страната.',
  },
  // Support
  {
    category: 'Поддръжка и мониторинг',
    question: 'Какво включва мониторингът и поддръжката?',
    answer: 'Всички наши клиенти получават безплатен достъп до приложението Solis за мониторинг в реално време. При възникнал проблем предлагаме дистанционна диагностика и troubleshooting. Можете да се обадите по всяко време.',
  },
  {
    category: 'Поддръжка и мониторинг',
    question: 'Може ли надграждане на съществуваща система?',
    answer: 'Да, предлагаме надграждане на съществуващи фотоволтаични системи — добавяне на панели, батерии или смяна на инвертор. Обадете се за оценка на възможностите.',
  },
  {
    category: 'Поддръжка и мониторинг',
    question: 'Какво се случва ако батерията ми не е достатъчна?',
    answer: 'Ако монтираната батерия се окаже недостатъчна за вашите нужди, монтажът на следващата батерия е безплатен. Това условие е валидно при първоначална оценка от наша страна и последваща промяна в консумацията.',
  },
  // Legal
  {
    category: 'Узаконяване',
    question: 'Какво е нужно за узаконяване (лична консумация)?',
    answer: 'При системи за лична консумация узаконяването става чрез упълномощаване към доставчика на електричество. Ние съдействаме напълно в този процес, като ви обясняваме всяка стъпка.',
  },
  {
    category: 'Узаконяване',
    question: 'Мога ли да продавам излишната енергия?',
    answer: 'Възможността за продажба на излишна енергия зависи от регулациите и вашия договор с електроразпределителното дружество. Обадете се за актуална информация по темата.',
  },
  // Pricing
  {
    category: 'Цени и финансиране',
    question: 'Как се формира цената?',
    answer: 'Цената зависи от мощността на системата, типа на покрива/терена, необходимата конструкция и допълнителни специфики. Затова изготвяме индивидуална оферта след безплатен оглед.',
  },
  {
    category: 'Цени и финансиране',
    question: 'Предлагате ли разсрочено плащане?',
    answer: 'В момента не предлагаме стандартна схема за разсрочване, но работим по възможности за партньорство с финансови институции. Свържете се с нас за повече информация.',
  },
];

// Group FAQs by category
const groupedFaqs = faqs.reduce((acc, faq) => {
  if (!acc[faq.category]) {
    acc[faq.category] = [];
  }
  acc[faq.category].push(faq);
  return acc;
}, {} as Record<string, FAQItem[]>);

const FAQ = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-muted/50 to-background">
        <div className="container-section">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-sm font-semibold text-primary mb-4">FAQ</span>
            <h1 className="heading-display text-foreground mb-6">
              Често задавани въпроси
            </h1>
            <p className="text-body text-lg">
              Отговори на най-честите въпроси за фотоволтаичните системи и нашите услуги. 
              Не намирате отговор? Обадете се.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="section-padding bg-background">
        <div className="container-section">
          <div className="max-w-3xl mx-auto">
            {Object.entries(groupedFaqs).map(([category, items]) => (
              <div key={category} className="mb-12 last:mb-0">
                <h2 className="heading-card text-foreground mb-6">{category}</h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {items.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`${category}-${index}`}
                      className="bg-muted/30 rounded-xl border border-border px-5 data-[state=open]:shadow-card"
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
            ))}

            {/* CTA */}
            <div className="mt-12 text-center p-8 card-elevated">
              <h3 className="heading-card text-foreground mb-4">Имате друг въпрос?</h3>
              <p className="text-muted-foreground mb-6">
                Обадете се и ще ви помогнем с каквото е необходимо.
              </p>
              <Button variant="accent" size="lg" asChild>
                <a href="tel:+359888123456">
                  <Phone className="w-5 h-5 mr-2" />
                  0888 123 456
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
