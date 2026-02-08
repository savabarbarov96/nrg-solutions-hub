import { useState } from 'react';
import { Phone, Send, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to a backend
    setSubmitted(true);
  };

  return (
    <section className="section-padding bg-background" id="оглед">
      <div className="container-section">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Contact Info */}
          <div>
            <span className="inline-block text-sm font-semibold text-primary mb-3">КОНТАКТИ</span>
            <h2 className="heading-section text-foreground mb-4">
              Свържете се с нас
            </h2>
            <p className="text-body mb-8">
              Готови сме да отговорим на вашите въпроси и да изготвим безплатна оферта. 
              Предпочитаното обаждане е най-бързият начин да получите информация.
            </p>

            {/* Primary CTA */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Обадете се сега</p>
                  <a href="tel:+359888123456" className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
                    0888 123 456
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    Безплатна консултация • Без ангажимент
                  </p>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                <Clock className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Работно време</p>
                  <p className="text-sm text-muted-foreground">Понеделник - Петък: 9:00 - 18:00</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                <MapPin className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Офис</p>
                  <p className="text-sm text-muted-foreground">Стара Загора, ул. Ген. Столетов 199</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="card-elevated p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="heading-card text-foreground mb-2">Благодарим ви!</h3>
                <p className="text-muted-foreground">
                  Ще се свържем с вас възможно най-скоро.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="heading-card text-foreground mb-6">Заявете безплатен оглед</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Име *</Label>
                    <Input id="name" placeholder="Вашето име" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input id="phone" type="tel" placeholder="0888 123 456" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Град / Населено място *</Label>
                  <Input id="city" placeholder="Къде се намира обектът?" required />
                </div>

                <div className="space-y-3">
                  <Label>Тип обект</Label>
                  <RadioGroup defaultValue="home" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="home" id="home" />
                      <Label htmlFor="home" className="font-normal cursor-pointer">Къща</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="business" id="business" />
                      <Label htmlFor="business" className="font-normal cursor-pointer">Бизнес</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Съобщение (по избор)</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Опишете накратко вашите нужди или въпроси..."
                    rows={3}
                  />
                </div>

                <Button variant="accent" size="lg" className="w-full gap-2">
                  <Send className="w-5 h-5" />
                  Изпрати запитване
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  С изпращането на формата се съгласявате да бъдете потърсени по телефон.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
