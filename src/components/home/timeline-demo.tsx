import React from "react";
import { CheckCheck, ShieldCheck, Wrench } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";

const howWeWorkTimelineData = [
  {
    title: "Стъпка 1",
    content: (
      <div>
        <p className="text-foreground text-sm md:text-base font-medium mb-3">Разговор и ориентировъчна оферта</p>
        <p className="text-muted-foreground text-xs md:text-sm font-normal mb-6">
          Обсъждаме вашето потребление, типа обект и целите ви, след което даваме реалистична първоначална рамка.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&h=900&fit=crop&auto=format"
            alt="Соларни панели на покрив"
            className="rounded-xl object-cover h-28 md:h-44 lg:h-56 w-full shadow-soft"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=900&fit=crop&auto=format"
            alt="Соларна инсталация"
            className="rounded-xl object-cover h-28 md:h-44 lg:h-56 w-full shadow-soft"
            loading="lazy"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Стъпка 2",
    content: (
      <div>
        <p className="text-foreground text-sm md:text-base font-medium mb-3">Оглед на място и финална конфигурация</p>
        <p className="text-muted-foreground text-xs md:text-sm font-normal mb-6">
          Правим технически оглед и изготвяме точна конфигурация с ясни параметри, срокове и бюджет.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1200&h=900&fit=crop&auto=format"
            alt="Проверка на соларна система"
            className="rounded-xl object-cover h-28 md:h-44 lg:h-56 w-full shadow-soft"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=1200&h=900&fit=crop&auto=format"
            alt="Соларни панели по време на инспекция"
            className="rounded-xl object-cover h-28 md:h-44 lg:h-56 w-full shadow-soft"
            loading="lazy"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Стъпка 3",
    content: (
      <div>
        <p className="text-foreground text-sm md:text-base font-medium mb-3">Доставка, монтаж и пуск</p>
        <p className="text-muted-foreground text-xs md:text-sm font-normal mb-4">
          Изпълняваме монтажа с професионален екип и финализираме системата с протокол и Solis настройка.
        </p>
        <div className="mb-6 space-y-2">
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            <Wrench className="h-4 w-4 text-primary" />
            Монтаж с проверка на всички ключови точки
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Протокол за предаване и безопасност
          </div>
          <div className="flex gap-2 items-center text-muted-foreground text-xs md:text-sm">
            <CheckCheck className="h-4 w-4 text-primary" />
            Демонстрация на мониторинг и контрол
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=1200&h=900&fit=crop&auto=format"
            alt="Монтаж на соларни панели"
            className="rounded-xl object-cover h-28 md:h-44 lg:h-56 w-full shadow-soft"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1200&h=900&fit=crop&auto=format"
            alt="Завършена соларна инсталация"
            className="rounded-xl object-cover h-28 md:h-44 lg:h-56 w-full shadow-soft"
            loading="lazy"
          />
        </div>
      </div>
    ),
  },
];

export function TimelineDemo({ compact = false }: { compact?: boolean }) {
  return (
    <Timeline
      title="Как работим"
      description="Ясен процес в три стъпки, с постоянна комуникация и пълна прозрачност до пускането на системата."
      data={compact ? howWeWorkTimelineData.slice(0, 2) : howWeWorkTimelineData}
    />
  );
}

