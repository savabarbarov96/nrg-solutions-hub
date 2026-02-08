export const siteConfig = {
  companyName: 'NRGsolution',
  phoneDisplay: '0888 123 456',
  phoneHref: 'tel:+359888123456',
  email: 'info@nrgsolution.bg',
  address: 'Стара Загора, ул. Ген. Столетов 199',
  serviceArea: 'Цяла България',
  workingHours: 'Пон - Пет: 9:00 - 18:00',
};

export const brands = ['Dyness', 'Diae', 'Jinko', 'JA Solar', 'Canadian Solar', 'Longi'];

export type PackageType = {
  id: '8kw' | '12kw' | '15kw';
  name: string;
  power: string;
  description: string;
  idealFor: string;
  popular?: boolean;
  includes: string[];
};

export const solarPackages: PackageType[] = [
  {
    id: '8kw',
    name: 'Старт',
    power: '8 kW',
    description: 'Подходящ за къщи с умерена консумация и базово батерийно съхранение.',
    idealFor: 'Къщи с 2-3 души домакинство',
    includes: [
      'Хибриден инвертор',
      'Соларни панели',
      'Батерия',
      'DC/AC кабели',
      'AC защити',
      'Алуминиева конструкция, профили, клеми и държачи',
      'Пуск и демонстрация в Solis',
    ],
  },
  {
    id: '12kw',
    name: 'Оптимум',
    power: '12 kW',
    description: 'Балансирана конфигурация за по-големи домове и малки обекти.',
    idealFor: 'Къщи с по-висока консумация и малки бизнес обекти',
    popular: true,
    includes: [
      'Хибриден инвертор',
      'Соларни панели',
      'Батерия',
      'DC/AC кабели',
      'AC защити',
      'Алуминиева конструкция, профили, клеми и държачи',
      'Пуск и демонстрация в Solis',
    ],
  },
  {
    id: '15kw',
    name: 'Макс',
    power: '15 kW',
    description: 'Високопроизводителна система за големи имоти и бизнес потребление.',
    idealFor: 'Големи къщи, предприятия и обекти с пиково натоварване',
    includes: [
      'Хибриден инвертор',
      'Соларни панели',
      'Батерия',
      'DC/AC кабели',
      'AC защити',
      'Алуминиева конструкция, профили, клеми и държачи',
      'Пуск и демонстрация в Solis',
    ],
  },
];

export type ProjectType = 'home' | 'business';

export type ProjectItem = {
  id: number;
  slug: string;
  image: string;
  city: string;
  power: string;
  type: ProjectType;
  title: string;
  summary: string;
  completedScope: string[];
  solisNote: string;
};

export const projects: ProjectItem[] = [
  {
    id: 1,
    slug: 'sofia-house-12kw',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=800&fit=crop',
    city: 'София',
    power: '12 kW',
    type: 'home',
    title: 'Покривна система за еднофамилна къща',
    summary: 'Оптимизирана покривна инсталация за намаляване на месечните сметки и по-висока енергийна независимост.',
    completedScope: ['Ориентировъчна и финална оферта', 'Пълна доставка и монтаж', 'Протокол и обучение за Solis'],
    solisNote: 'Клиентът следи производство и консумация в реално време през Solis.',
  },
  {
    id: 2,
    slug: 'plovdiv-business-15kw',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1200&h=800&fit=crop',
    city: 'Пловдив',
    power: '15 kW',
    type: 'business',
    title: 'Система за складова база',
    summary: 'Решение за по-предвидими енергийни разходи и оптимизация на бизнес натоварванията.',
    completedScope: ['Оглед и оценка на профил на консумация', 'Доставка, монтаж и пуск', 'Настройка на мониторинг и дистанционна поддръжка'],
    solisNote: 'Бизнес екипът получава известия за аномалии и ключови показатели в Solis.',
  },
  {
    id: 3,
    slug: 'varna-house-8kw',
    image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1200&h=800&fit=crop',
    city: 'Варна',
    power: '8 kW',
    type: 'home',
    title: 'Компактна система за крайградска къща',
    summary: 'Практична конфигурация за стабилно дневно производство при стандартно домакинско натоварване.',
    completedScope: ['Оферта и оглед на място', 'Монтаж с алуминиева конструкция', 'Финализиране с протокол и Solis демо'],
    solisNote: 'Системата позволява лесно бъдещо надграждане с допълнителна батерия.',
  },
  {
    id: 4,
    slug: 'stara-zagora-business-20kw',
    image: 'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=1200&h=800&fit=crop',
    city: 'Стара Загора',
    power: '20 kW',
    type: 'business',
    title: 'Бизнес инсталация с възможност за надграждане',
    summary: 'Конфигурация за производствен обект с фокус върху надеждност и предвидими разходи.',
    completedScope: ['Планиране по фирмен товаров профил', 'Монтаж и пуск в експлоатация', 'Дистанционна диагностика и поддръжка'],
    solisNote: 'Настроени са роли за достъп на управител и технически персонал.',
  },
  {
    id: 5,
    slug: 'burgas-home-12kw',
    image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=1200&h=800&fit=crop',
    city: 'Бургас',
    power: '12 kW',
    type: 'home',
    title: 'Домашна система с батерия',
    summary: 'Баланс между дневно производство и вечерно потребление чрез батерийно съхранение.',
    completedScope: ['Оглед и финална конфигурация', 'Професионален монтаж', 'Обучение и предаване с протокол'],
    solisNote: 'Клиентът използва Solis за ежедневен контрол на потреблението.',
  },
  {
    id: 6,
    slug: 'ruse-home-10kw',
    image: 'https://images.unsplash.com/photo-1595437193398-f24279553f4f?w=1200&h=800&fit=crop',
    city: 'Русе',
    power: '10 kW',
    type: 'home',
    title: 'Персонализирана система за дом',
    summary: 'Проект с акцент върху сезонна стабилност и резерв за бъдещо разширение.',
    completedScope: ['Ориентировъчна оферта', 'Монтаж и настройки', 'Предаване с Solis демонстрация'],
    solisNote: 'Системата е настроена за прозрачност в месечните отчети.',
  },
];

export type PromoItem = {
  id: number;
  title: string;
  description: string;
  details?: string;
  validUntil?: string;
  badge?: string;
  active: boolean;
};

export const promos: PromoItem[] = [
  {
    id: 1,
    title: 'Безплатен разширен мониторинг',
    description: 'При конфигурации от 12 kW получавате разширен мониторинг за 24 месеца.',
    details: 'Включва допълнителни отчети и приоритетна дистанционна диагностика.',
    validUntil: '31.03.2026',
    badge: 'Активна',
    active: true,
  },
  {
    id: 2,
    title: 'Проверка за надграждане',
    description: 'Безплатна оценка дали текущата ви система може да се надгради ефективно.',
    details: 'Подходящо за собственици с нараснала консумация или план за EV зарядна станция.',
    active: true,
  },
];

export type FAQItem = {
  category: string;
  question: string;
  answer: string;
};

export const faqItems: FAQItem[] = [
  {
    category: 'Общи въпроси',
    question: 'Работите ли с апартаменти?',
    answer:
      'По-сложно е, защото са нужни разрешения за монтаж на покрив. Обадете се на 0888 123 456 за повече информация.',
  },
  {
    category: 'Общи въпроси',
    question: 'Безплатен ли е огледът?',
    answer:
      'Да, огледът и първичната консултация са безплатни. След огледа подготвяме финална оферта.',
  },
  {
    category: 'Поддръжка',
    question: 'Какво включва мониторингът/поддръжката?',
    answer:
      'Получавате безплатен мониторинг през Solis, дистанционна диагностика и troubleshooting при нужда.',
  },
  {
    category: 'Поддръжка',
    question: 'Може ли надграждане на съществуваща система?',
    answer: 'Да. Надграждаме съществуващи системи с панели, батерии и оптимизация на конфигурацията.',
  },
  {
    category: 'Узаконяване',
    question: 'Какво е нужно за узаконяване (лична консумация)?',
    answer:
      'При лична консумация се прави чрез упълномощаване към доставчика на ток. Обясняваме процеса с ясен език.',
  },
  {
    category: 'Срокове',
    question: 'Колко време отнема процесът?',
    answer:
      'Зависи от обекта, мощността и административните стъпки. Даваме реалистични срокове след оглед.',
  },
  {
    category: 'Финансиране',
    question: 'Предлагате ли разсрочване?',
    answer:
      'Към момента не предлагаме стандартно разсрочване. В бъдеще е възможно партньорство с банка.',
  },
];
