import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSubmitQuestionnaire } from '@/hooks/useQuestionnaire';
import { toast } from 'sonner';

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
  // Honeypot
  website: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type ChipGroupProps = {
  label: string;
  options: string[];
  value?: string;
  onChange: (value: string) => void;
};

function ChipGroup({ label, options, value, onChange }: ChipGroupProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold">{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(value === option ? '' : option)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all ${
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

export function QuestionnaireSection() {
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
      name: '',
      email: '',
      phone: '',
      grid_type: '',
      purpose: '',
      power_needed: '',
      system_type: '',
      mounting_type: '',
      construction_stage: '',
      property_type: '',
      location: '',
      website: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    // Honeypot check
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
      <section className="section-padding bg-muted/30">
        <div className="container-section">
          <div className="mx-auto flex max-w-lg flex-col items-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="heading-card text-foreground">Запитването е изпратено</h3>
            <p className="mt-2 text-muted-foreground">
              Благодарим ви! Ще се свържем с вас възможно най-скоро.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-section">
        <div className="mb-10 max-w-3xl">
          <span className="section-eyebrow">Запитване</span>
          <h2 className="heading-section mt-5 text-foreground">Искате да получите оферта?</h2>
          <p className="text-body mt-4">
            Попълнете кратката форма по-долу и ще ви изпратим персонализирана оферта. Задължителни са само вашето
            име и имейл.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card-elevated mx-auto max-w-3xl p-6 sm:p-8">
          {/* Honeypot — hidden from real users */}
          <div className="absolute opacity-0 h-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
            <input type="text" {...register('website')} autoComplete="off" tabIndex={-1} />
          </div>

          <div className="space-y-6">
            {/* Required fields */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="q-name">Вашето име *</Label>
                <Input
                  id="q-name"
                  placeholder="Иван Иванов"
                  {...register('name')}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="q-email">Имейл *</Label>
                <Input
                  id="q-email"
                  type="email"
                  placeholder="ivan@example.com"
                  {...register('email')}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>
            </div>

            {/* Optional phone */}
            <div className="space-y-2">
              <Label htmlFor="q-phone">Телефон</Label>
              <Input id="q-phone" type="tel" placeholder="089 435 4538" {...register('phone')} />
            </div>

            {/* Chip questions */}
            <ChipGroup
              label="Вид мрежа"
              options={['On-grid', 'Off-grid', 'Хибридна']}
              value={watch('grid_type')}
              onChange={(v) => setValue('grid_type', v)}
            />

            <ChipGroup
              label="Цел"
              options={['Собствено потребление', 'Продажба на ток', 'И двете']}
              value={watch('purpose')}
              onChange={(v) => setValue('purpose', v)}
            />

            <ChipGroup
              label="Мощност"
              options={['До 5 kW', '5-10 kW', '10-15 kW', 'Над 15 kW', 'Не съм сигурен/а']}
              value={watch('power_needed')}
              onChange={(v) => setValue('power_needed', v)}
            />

            <ChipGroup
              label="Вид система"
              options={['Фотоволтаична', 'С батерия', 'Хибридна', 'Не съм сигурен/а']}
              value={watch('system_type')}
              onChange={(v) => setValue('system_type', v)}
            />

            <ChipGroup
              label="Вид монтаж"
              options={['Покривен', 'Наземен', 'Фасаден', 'Друг']}
              value={watch('mounting_type')}
              onChange={(v) => setValue('mounting_type', v)}
            />

            <ChipGroup
              label="Етап на строителство"
              options={['Завършена сграда', 'В строеж', 'Планиране']}
              value={watch('construction_stage')}
              onChange={(v) => setValue('construction_stage', v)}
            />

            <ChipGroup
              label="Вид имот"
              options={['Къща', 'Апартамент', 'Бизнес обект', 'Индустриален', 'Друг']}
              value={watch('property_type')}
              onChange={(v) => setValue('property_type', v)}
            />

            {/* Free text location */}
            <div className="space-y-2">
              <Label htmlFor="q-location">Град / село / област</Label>
              <Input id="q-location" placeholder="напр. Стара Загора" {...register('location')} />
            </div>

            <Button
              variant="accent"
              size="lg"
              className="w-full gap-2"
              disabled={submitMutation.isPending}
            >
              <Send className="h-4 w-4" />
              {submitMutation.isPending ? 'Изпращане...' : 'Изпрати запитване'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
