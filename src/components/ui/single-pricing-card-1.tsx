'use client';

import React from 'react';
import { PlusIcon, ShieldCheckIcon, Phone, ClipboardList, Calculator, Sparkles, Home, Building2, BatteryCharging } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './badge';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { BorderTrail } from './border-trail';
import { siteConfig } from '@/content/site-content';

export function Pricing() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div
        className={cn(
          'pointer-events-none absolute inset-0',
          'bg-[linear-gradient(to_right,hsl(var(--border)/0.6)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.6)_1px,transparent_1px)]',
          'bg-[size:30px_30px]',
          '[mask-image:radial-gradient(ellipse_at_center,black_54%,transparent_100%)]'
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.14),transparent_42%),radial-gradient(circle_at_85%_30%,hsl(var(--accent)/0.12),transparent_36%)]" />

      <div id="pricing" className="relative mx-auto w-full max-w-7xl space-y-7 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl space-y-5 text-center"
        >
          <div className="flex justify-center">
            <div className="rounded-lg border border-primary/20 bg-white px-4 py-1 text-xs font-bold uppercase tracking-[0.16em] text-primary">
              Цени / Пакети
            </div>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Прозрачни стъпки към точна оферта
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            3 работещи сценария според консумация, площ и нужда от батерия. Всички решения минават през технически оглед и ясно разписана финална оферта.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border/90 bg-white/70 p-4 shadow-soft backdrop-blur-sm md:p-6">
            <PlusIcon className="absolute -top-2.5 -left-2.5 size-5 text-primary/70" />
            <PlusIcon className="absolute -top-2.5 -right-2.5 size-5 text-primary/70" />
            <PlusIcon className="absolute -bottom-2.5 -left-2.5 size-5 text-primary/70" />
            <PlusIcon className="absolute -right-2.5 -bottom-2.5 size-5 text-primary/70" />

            <div className="grid gap-5 lg:grid-cols-3">
              <article className="flex h-full min-h-[460px] w-full flex-col rounded-xl border border-border/80 bg-white px-5 pt-6 pb-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="leading-none font-semibold text-foreground">Старт - 8 kW</h3>
                    <Badge variant="secondary">Дом</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Оптимален за семейства с умерена консумация, които търсят бърз старт с реално намаляване на сметките.
                  </p>
                </div>
                <div className="mt-4 rounded-lg border border-border/70 bg-muted/30 p-3 text-xs text-muted-foreground">
                  Подходящ за 2-3 души домакинство, дневно потребление и базово батерийно съхранение.
                </div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><Home className="mt-0.5 h-4 w-4 text-primary" />Хибриден инвертор, панели, батерия</li>
                  <li className="flex items-start gap-2"><ShieldCheckIcon className="mt-0.5 h-4 w-4 text-primary" />DC/AC кабели и AC защити</li>
                  <li className="flex items-start gap-2"><ClipboardList className="mt-0.5 h-4 w-4 text-primary" />Алуминиева конструкция, профили, клеми, държачи</li>
                </ul>
                <Button className="mt-auto w-full gap-2 whitespace-nowrap" variant="outline" asChild>
                  <a href={siteConfig.phoneHref}>
                    <Phone className="h-4 w-4" />
                    Обади се за оферта
                  </a>
                </Button>
              </article>

              <article className="relative flex h-full min-h-[460px] w-full flex-col overflow-hidden rounded-xl border border-primary/35 bg-primary/10 px-5 pt-6 pb-5">
                <BorderTrail
                  style={{
                    boxShadow:
                      '0 0 45px 18px hsl(var(--primary) / 0.18), 0 0 80px 30px hsl(var(--accent) / 0.12)',
                  }}
                  size={92}
                />
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="leading-none font-semibold text-foreground">Оптимум - 12 kW</h3>
                    <Badge>
                      <Sparkles className="mr-1 h-3 w-3" />
                      Най-търсен
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Балансирана конфигурация за по-големи къщи и малки бизнес обекти с по-висок профил на консумация.
                  </p>
                </div>
                <div className="mt-4 rounded-lg border border-primary/25 bg-white/75 p-3 text-xs text-muted-foreground">
                  По-добър резерв за вечерни товари, климатизация и бъдещо надграждане с допълнителна батерия.
                </div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><Building2 className="mt-0.5 h-4 w-4 text-primary" />Хибриден инвертор, панели, батерия</li>
                  <li className="flex items-start gap-2"><BatteryCharging className="mt-0.5 h-4 w-4 text-primary" />DC/AC кабели, AC защити и монтажни елементи</li>
                  <li className="flex items-start gap-2"><Calculator className="mt-0.5 h-4 w-4 text-primary" />Конфигуриране спрямо товара след оглед</li>
                </ul>
                <Button className="mt-auto w-full gap-2 whitespace-nowrap" asChild>
                  <a href="/контакти#оглед">
                    <ClipboardList className="h-4 w-4" />
                    Заяви безплатен оглед
                  </a>
                </Button>
              </article>

              <article className="flex h-full min-h-[460px] w-full flex-col rounded-xl border border-border/80 bg-white px-5 pt-6 pb-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="leading-none font-semibold text-foreground">Макс - 15 kW</h3>
                    <Badge variant="secondary">Бизнес + Голям дом</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Високопроизводително решение за обекти с пикови товари, EV зарядни или по-интензивна дневна работа.
                  </p>
                </div>
                <div className="mt-4 rounded-lg border border-border/70 bg-muted/30 p-3 text-xs text-muted-foreground">
                  Проектиран за устойчивост при натоварване и по-добра предвидимост на разходите в дългосрочен план.
                </div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><ShieldCheckIcon className="mt-0.5 h-4 w-4 text-primary" />Хибриден инвертор, панели, батерия</li>
                  <li className="flex items-start gap-2"><BatteryCharging className="mt-0.5 h-4 w-4 text-primary" />DC/AC кабели, AC защити, конструкция и крепежи</li>
                  <li className="flex items-start gap-2"><ClipboardList className="mt-0.5 h-4 w-4 text-primary" />Профили, клеми, държачи и финален пуск</li>
                </ul>
                <Button className="mt-auto w-full gap-2 whitespace-nowrap" variant="outline" asChild>
                  <a href={siteConfig.phoneHref}>
                    <Phone className="h-4 w-4" />
                    Говори с консултант
                  </a>
                </Button>
              </article>
            </div>
          </div>

          <div className="text-muted-foreground flex items-center justify-center gap-2 text-center text-sm">
            <ShieldCheckIcon className="size-4 text-primary" />
            <span>Цената се формира от мощност, компоненти и монтажна сложност. Без скрити такси.</span>
          </div>

          <div className="mx-auto max-w-3xl rounded-xl border border-border/80 bg-white p-4 md:p-5">
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-primary">
              <Calculator className="h-4 w-4" />
              Как се формира цената
            </p>
            <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              <li>• Мощност и конфигурация на системата</li>
              <li>• Тип покрив/терен и монтажна сложност</li>
              <li>• Избор на компоненти и капацитет на батерията</li>
              <li>• Нужда от допълнителни защитни решения</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
