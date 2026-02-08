import { FileText, Search, Wrench, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  isLast?: boolean;
}

function ProcessStep({ number, icon, title, description, isLast }: StepProps) {
  return (
    <div className="relative flex flex-col items-center text-center">
      {/* Connector Line */}
      {!isLast && (
        <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
      )}

      {/* Icon Circle */}
      <div className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-6 shadow-card">
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-soft">
          {number}
        </div>
        <div className="text-primary-foreground">
          {icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="heading-card text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm max-w-xs">{description}</p>
    </div>
  );
}

const steps = [
  {
    icon: <FileText className="w-10 h-10" />,
    title: 'Ориентировъчна оферта',
    description: 'Свържете се с нас и получете първоначална оценка на базата на вашите нужди.',
  },
  {
    icon: <Search className="w-10 h-10" />,
    title: 'Безплатен оглед',
    description: 'Наш специалист ще посети обекта и ще изготви детайлна финална оферта.',
  },
  {
    icon: <Wrench className="w-10 h-10" />,
    title: 'Доставка и монтаж',
    description: 'Екипът ни извършва професионален монтаж с качествени материали.',
  },
  {
    icon: <Smartphone className="w-10 h-10" />,
    title: 'Протокол и приложение',
    description: 'Финализиране с протокол и демонстрация на приложението Solis за мониторинг.',
  },
];

export function ProcessSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-section">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-primary mb-3">ПРОЦЕС</span>
          <h2 className="heading-section text-foreground mb-4">
            Как работим
          </h2>
          <p className="text-body">
            От първия контакт до готовата система — ясни стъпки без изненади.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {steps.map((step, index) => (
            <ProcessStep 
              key={step.title} 
              number={index + 1} 
              icon={step.icon}
              title={step.title}
              description={step.description}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
