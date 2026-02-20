import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Send, CheckCircle2, MessageCircleQuestion, FileText } from 'lucide-react';
import { faqItems, siteConfig } from '@/content/site-content';
import { useSubmitQuestionnaire } from '@/hooks/useQuestionnaire';
import { toast } from 'sonner';

// ── Questionnaire schema ──────────────────────────────
const schema = z.object({
  name: z.string().min(1, 'Моля, въведете вашето име'),
  email: z.string().email('Моля, въведете валиден имейл'),
  phone: z.string().optional(),
  grid_type: z.string().optional(),
  purpose: z.string().optional(),
  power_needed: z.string().optional(),
  system_type: z.string().optional(),
  mounting_type: z.string().optional(),
  construction_stage: z.string().optional(),
  property_type: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold">{label}</Label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(value === option ? '' : option)}
            className={`rounded-full border px-3 py-1 text-[13px] font-medium transition-all ${
              value === option
                ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Questionnaire Form ────────────────────────────────
function QuestionnaireForm() {
  const [submitted, setSubmitted] = useState(false);
  const submitMutation = useSubmitQuestionnaire();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '', email: '', phone: '', grid_type: '', purpose: '',
      power_needed: '', system_type: '', mounting_type: '',
      construction_stage: '', property_type: '', location: '', website: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    if (data.website) return;
    try {
      await submitMutation.mutateAsync({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        grid_type: data.grid_type || null,
        purpose: data.purpose || null,
        power_needed: data.power_needed || null,
        system_type: data.system_type || null,
        mounting_type: data.mounting_type || null,
        construction_stage: data.construction_stage || null,
        property_type: data.property_type || null,
        location: data.location || null,
      });
      setSubmitted(true);
    } catch {
      toast.error('Грешка при изпращане. Моля, опитайте отново.');
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Запитването е изпратено</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Благодарим ви! Ще се свържем с вас възможно най-скоро.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Honeypot */}
      <div className="absolute opacity-0 h-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
        <input type="text" {...register('website')} autoComplete="off" tabIndex={-1} />
      </div>

      {/* Required fields */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="q-name" className="text-sm">Вашето име *</Label>
          <Input id="q-name" placeholder="Иван Иванов" {...register('name')} className={errors.name ? 'border-destructive' : ''} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="q-email" className="text-sm">Имейл *</Label>
          <Input id="q-email" type="email" placeholder="ivan@example.com" {...register('email')} className={errors.email ? 'border-destructive' : ''} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="q-phone" className="text-sm">Телефон</Label>
        <Input id="q-phone" type="tel" placeholder="089 435 4538" {...register('phone')} />
      </div>

      <Separator />

      <ChipGroup label="Вид мрежа" options={['On-grid', 'Off-grid', 'Хибридна']} value={watch('grid_type')} onChange={(v) => setValue('grid_type', v)} />
      <ChipGroup label="Цел" options={['Собствено потребление', 'Продажба на ток', 'И двете']} value={watch('purpose')} onChange={(v) => setValue('purpose', v)} />
      <ChipGroup label="Мощност" options={['До 5 kW', '5-10 kW', '10-15 kW', 'Над 15 kW', 'Не съм сигурен/а']} value={watch('power_needed')} onChange={(v) => setValue('power_needed', v)} />
      <ChipGroup label="Вид система" options={['Фотоволтаична', 'С батерия', 'Хибридна', 'Не съм сигурен/а']} value={watch('system_type')} onChange={(v) => setValue('system_type', v)} />

      <Separator />

      <ChipGroup label="Вид монтаж" options={['Покривен', 'Наземен', 'Фасаден', 'Друг']} value={watch('mounting_type')} onChange={(v) => setValue('mounting_type', v)} />
      <ChipGroup label="Етап на строителство" options={['Завършена сграда', 'В строеж', 'Планиране']} value={watch('construction_stage')} onChange={(v) => setValue('construction_stage', v)} />
      <ChipGroup label="Вид имот" options={['Къща', 'Апартамент', 'Бизнес обект', 'Индустриален', 'Друг']} value={watch('property_type')} onChange={(v) => setValue('property_type', v)} />

      <Separator />

      <div className="space-y-1.5">
        <Label htmlFor="q-location" className="text-sm">Град / село / област</Label>
        <Input id="q-location" placeholder="напр. Стара Загора" {...register('location')} />
      </div>

      <Button variant="accent" size="lg" className="w-full gap-2" disabled={submitMutation.isPending}>
        <Send className="h-4 w-4" />
        {submitMutation.isPending ? 'Изпращане...' : 'Изпрати запитване'}
      </Button>
    </form>
  );
}

// ── Combined FAQ + Questionnaire Section ──────────────
export function FAQSection() {
  const teaserFaqs = faqItems.slice(0, 6);

  return (
    <section className="section-padding bg-background">
      <div className="container-section">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-14 xl:gap-20">
          {/* ── Left: FAQ ── */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MessageCircleQuestion className="h-5 w-5" />
              </div>
              <span className="section-eyebrow !mb-0">FAQ</span>
            </div>

            <h2 className="heading-section mt-5 text-foreground">Често задавани въпроси</h2>
            <p className="text-body mt-3">
              Включили сме ключовите въпроси за апартаменти, оглед, поддръжка, надграждане и узаконяване.
            </p>

            <Separator className="my-6" />

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
                  <AccordionContent className="pb-4 text-sm text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Separator className="my-6" />

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="accent" asChild>
                <a href={siteConfig.phoneHref}>Обади се: {siteConfig.phoneDisplay}</a>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/faq">Пълна FAQ страница</Link>
              </Button>
            </div>
          </div>

          {/* ── Right: Questionnaire ── */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border/80 bg-white p-6 shadow-soft sm:p-7">
              <div className="mb-5 flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Искате да получите оферта?</h3>
                  <p className="text-xs text-muted-foreground">Само име и имейл са задължителни</p>
                </div>
              </div>

              <Separator className="mb-5" />

              <QuestionnaireForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
