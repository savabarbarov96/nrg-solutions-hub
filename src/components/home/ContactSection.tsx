import { useState } from 'react';
import { Phone, Send, MapPin, Clock3, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { siteConfig } from '@/content/site-content';
import { submitContactForm } from '@/services/api';
import { toast } from 'sonner';

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    setIsSubmitting(true);
    try {
      await submitContactForm({
        name: formData.get('name') as string,
        phone: formData.get('phone') as string,
        city: formData.get('city') as string,
        type: formData.get('object-type') as string,
        message: (formData.get('message') as string) || undefined,
      });
      setSubmitted(true);
    } catch {
      toast.error('Грешка при изпращане. Моля, опитайте отново.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-muted/30" id="оглед">
      <div className="container-section">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="section-eyebrow">Контакти</span>
            <h2 className="heading-section mt-5 text-foreground">Запитване за оферта или безплатен оглед</h2>
            <p className="text-body mt-4">
              Най-бързият канал за старт е телефонно обаждане. Може да изпратите и форма, а ние ще върнем обаждане.
            </p>

            <div className="mt-8 rounded-2xl border border-primary/25 bg-white p-6 shadow-soft">
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-primary">Приоритетен CTA</p>
              <a href={siteConfig.phoneHref} className="inline-flex items-center gap-3 text-3xl font-extrabold text-foreground">
                <Phone className="h-7 w-7 text-primary" />
                {siteConfig.phoneDisplay}
              </a>
              <p className="mt-2 text-sm text-muted-foreground">Бърза консултация, без ангажимент.</p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-white p-4">
                <Clock3 className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Работно време</p>
                  <p className="text-sm text-muted-foreground">{siteConfig.workingHours}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-white p-4">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Адрес</p>
                  <p className="text-sm text-muted-foreground">{siteConfig.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-elevated p-6 sm:p-8">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="heading-card text-foreground">Запитването е изпратено</h3>
                <p className="mt-2 text-muted-foreground">Ще се свържем с вас възможно най-скоро.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="heading-card text-foreground">Кратка форма</h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Име *</Label>
                    <Input id="name" name="name" placeholder="Вашето име" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="089 435 4538" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Град / населено място *</Label>
                  <Input id="city" name="city" placeholder="Къде е обектът?" required />
                </div>

                <div className="space-y-3">
                  <Label>Тип обект</Label>
                  <RadioGroup defaultValue="home" name="object-type" className="flex gap-5">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="home" id="home" />
                      <Label htmlFor="home" className="font-normal cursor-pointer">Къща</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="business" id="business" />
                      <Label htmlFor="business" className="font-normal cursor-pointer">Бизнес</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Съобщение</Label>
                  <Textarea id="message" name="message" rows={3} placeholder="Кратко описание на нуждите ви" />
                </div>

                <Button variant="accent" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                  <Send className="h-4 w-4" />
                  {isSubmitting ? 'Изпращане...' : 'Изпрати запитване'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
