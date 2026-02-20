export const siteConfig = {
  companyName: 'NRGsolution',
  phoneDisplay: '089 435 4538',
  phoneHref: 'tel:+3590894354538',
  email: 'Nrgoplossingen@gmail.com',
  address: 'Стара Загора, ул. Ген. Столетов 199',
  serviceArea: 'Цяла България',
  workingHours: 'Пон - Пет: 9:00 - 18:00',
};

export type Brand = { name: string; logo: string };

export const brands: Brand[] = [
  { name: 'Dyness', logo: '/brands/dyness.png' },
  { name: 'Deye', logo: '/brands/deye.png' },
  { name: 'Jinko', logo: '/brands/jinko.png' },
  { name: 'JA Solar', logo: '/brands/ja-solar.png' },
  { name: 'Canadian Solar', logo: '/brands/canadian-solar.png' },
  { name: 'Longi', logo: '/brands/longi.png' },
  { name: 'Solis', logo: '/brands/solis.png' },
  { name: 'Growatt', logo: '/brands/growatt.png' },
];

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

export type ProjectImageItem = {
  id: number;
  image_url: string;
  display_order: number;
  rotation?: number;
};

export type ProjectItem = {
  id: number;
  slug: string;
  image: string;
  image_rotation?: number;
  city: string;
  power: string;
  type: ProjectType;
  title: string;
  summary: string;
  completed_scope: string[];
  solis_note: string;
  display_order: number;
  integration_name?: string;
  integration_note?: string;
  static_images: ProjectImageItem[];
};

type ProjectSeed = Omit<ProjectItem, 'id' | 'image' | 'static_images'> & {
  folder: string;
  files: string[];
};

function projectImageUrl(folder: string, fileName: string): string {
  // Keep commas unescaped to avoid static-host path resolution issues.
  return `/projects-optimized/${encodeURI(folder)}/${encodeURI(fileName)}`;
}

function inferIntegrationName(slug: string): string {
  if (slug.includes('growatt')) return 'Growatt Monitoring';
  if (slug.includes('solar-edge')) return 'SolarEdge Monitoring';
  if (slug.includes('solis')) return 'Solis Cloud';
  if (slug.includes('goodwe')) return 'GoodWe SEMS Portal';
  if (slug.includes('enphase')) return 'Enphase Enlighten';
  if (slug.includes('huawei')) return 'Huawei FusionSolar';
  return 'Интеграция и мониторинг';
}

const projectSeeds: ProjectSeed[] = [
  {
    slug: 'growatt-10-8kw-system',
    city: 'България',
    power: '10.8 kW',
    type: 'home',
    title: '10.8 kW Growatt покривна система',
    summary: 'Домашна инсталация с Growatt инвертор за по-високо дневно покритие и оптимизирано собствено потребление.',
    completed_scope: ['Оглед и оразмеряване на системата', 'Доставка и монтаж на панели и инвертор Growatt', 'Пуск, тестове и обучение за мониторинг'],
    solis_note: 'Мониторингът е настроен с известия за производство, товар и бързо откриване на отклонения.',
    folder: '10,8 kw growatt system',
    files: ['IMG_8442.webp', 'IMG_8446.webp', 'IMG_8492.webp', 'IMG_8690.webp', 'IMG_8694.webp', 'IMG_8696.webp'],
  },
  {
    slug: 'solar-edge-12-6kw-system',
    city: 'България',
    power: '12.6 kW',
    type: 'home',
    title: '12.6 kW SolarEdge система',
    summary: 'Покривна система SolarEdge с фокус върху стабилно производство и оптимизация на работата на всеки модул.',
    completed_scope: ['Технически оглед и работен проект', 'Монтаж на конструкция, панели и SolarEdge компоненти', 'Финално тестване и предаване на обекта'],
    solis_note: 'Клиентът получава ясна визуализация на производството и консумацията в ежедневен режим.',
    folder: '12,6 kw solar edge',
    files: ['IMG_8930.webp', 'IMG_8931.webp', 'IMG_8938.webp', 'IMG_8943.webp'],
  },
  {
    slug: 'solar-edge-13-5kw-system',
    city: 'България',
    power: '13.5 kW',
    type: 'home',
    title: '13.5 kW SolarEdge покривна инсталация',
    summary: 'Решение за домакинство с по-високо натоварване и цел за намаляване на разходите през цялата година.',
    completed_scope: ['Планиране на позиционирането на модулите', 'Монтаж и свързване на инвертор SolarEdge', 'Пуск и проверка на всички ключови параметри'],
    solis_note: 'Настроен е дистанционен контрол за дневна/месечна статистика и реакция при аларми.',
    folder: '13,5 kw solar edge',
    files: ['IMG_4617.webp', 'IMG_7555.webp', 'IMG_7556.webp'],
  },
  {
    slug: 'solar-edge-14kw-system',
    city: 'България',
    power: '14 kW',
    type: 'home',
    title: '14 kW SolarEdge система',
    summary: 'Високопроизводителна система с добре балансирана конфигурация за целогодишна ефективност.',
    completed_scope: ['Анализ на покрив и товарови профили', 'Пълен монтаж на системата', 'Пуск и обучение за експлоатация'],
    solis_note: 'Собственикът следи моментно производство и спестявания в реално време.',
    folder: '14 kw solar edge system',
    files: ['FullSizeRender 2.webp', 'IMG_8818.webp'],
  },
  {
    slug: 'solis-15kw-dyness-10kw-battery',
    city: 'България',
    power: '15 kW',
    type: 'home',
    title: '15 kW Solis система с 10 kWh Dyness батерия',
    summary: 'Хибридна конфигурация със съхранение за по-добро вечерно покритие и резерв при прекъсвания.',
    completed_scope: ['Оразмеряване на PV + батерия спрямо потреблението', 'Монтаж на Solis инвертор и Dyness модул', 'Настройка на режими за зареждане/разреждане'],
    solis_note: 'Конфигурирани са енергийни режими за максимално собствено потребление и ясни отчети.',
    folder: '15kw solis 10kw battery dyness',
    files: ['dji_fly_20260117_122522_0392_1768645271826_photo.webp', 'IMG_0045.webp', 'IMG_0046.webp', 'IMG_0047.webp', 'IMG_0048.webp', 'IMG_0049.webp'],
  },
  {
    slug: 'solplanet-4kw-bitumen-roof',
    city: 'България',
    power: '4 kW',
    type: 'home',
    title: '4 kW Solplanet върху битумен покрив',
    summary: 'Компактна система върху битумен покрив с акцент върху безопасен монтаж и надеждна работа.',
    completed_scope: ['Оглед на специфичната покривна конструкция', 'Монтаж с подходящи крепежни елементи за битум', 'Пуск и финална проверка на инсталацията'],
    solis_note: 'Мониторингът е настроен за бърза проверка на производството от мобилно устройство.',
    folder: '4 kw system solplanet върху битумен',
    files: ['IMG_1845.webp', 'IMG_7909.webp', 'IMG_7911.webp'],
  },
  {
    slug: 'growatt-4-5kw-system',
    city: 'България',
    power: '4.5 kW',
    type: 'home',
    title: '4.5 kW Growatt система',
    summary: 'Практично решение за базово домакинско потребление с отличен баланс между цена и добив.',
    completed_scope: ['Подбор на оборудване според годишна консумация', 'Монтаж и окабеляване на системата', 'Функционални тестове и предаване'],
    solis_note: 'Клиентът има достъп до отчетност по дни, месеци и сезони.',
    folder: '4,5 kw system growatt',
    files: ['IMG_7916.webp', 'IMG_7917.webp', 'IMG_8333.webp'],
  },
  {
    slug: 'solis-5kw-system',
    city: 'България',
    power: '5 kW',
    type: 'home',
    title: '5 kW Solis система',
    summary: 'Домашна соларна система за намаляване на месечните сметки и стабилно дневно производство.',
    completed_scope: ['Предварителна консултация и оферта', 'Монтаж на панели и Solis инвертор', 'Пускане в експлоатация и кратко обучение'],
    solis_note: 'Добавени са нотификации за важни събития и отклонения в работата.',
    folder: '5 kw solis system',
    files: ['IMG_3658.webp', 'IMG_5250.webp'],
  },
  {
    slug: 'solar-edge-5kw-system',
    city: 'България',
    power: '5 kW',
    type: 'home',
    title: '5 kW SolarEdge система',
    summary: 'Компактна система с SolarEdge архитектура за оптимизирана работа на модулите.',
    completed_scope: ['Проектиране на конфигурацията', 'Пълен монтаж и свързване', 'Тестове под товар и предаване на клиента'],
    solis_note: 'Системата е с включен дистанционен мониторинг и ежемесечна проследимост.',
    folder: '5 kw system solar edge',
    files: ['IMG_7984.webp', 'IMG_8030.webp'],
  },
  {
    slug: 'goodwe-54kw-business-project',
    city: 'България',
    power: '54 kW',
    type: 'business',
    title: '54 kW GoodWe инсталация за голям обект',
    summary: 'Мащабен бизнес проект с GoodWe инвертор за значително редуциране на оперативните енергийни разходи.',
    completed_scope: ['Детайлно планиране за голям покривен масив', 'Етапен монтаж с координация на работния процес', 'Пуск, протоколи и предаване на обекта'],
    solis_note: 'Конфигуриран е мониторинг за бърз контрол на ефективността и отчетност към управлението.',
    folder: '54 kw system goodwe inverter big project',
    files: ['c5586c13-b2f8-4d60-b07c-131a2eaf2309.webp', 'IMG_6001.webp', 'IMG_6002.webp', 'IMG_6004.webp', 'IMG_6017.webp', 'IMG_6018.webp', 'IMG_6023.webp'],
  },
  {
    slug: 'enphase-6-3kw-pvc-roof',
    city: 'България',
    power: '6.3 kW',
    type: 'business',
    title: '6.3 kW Enphase система върху PVC мембрана',
    summary: 'Инсталация върху покрив с PVC мембрана с прецизен монтаж и фокус върху дългосрочна надеждност.',
    completed_scope: ['Оглед и избор на подходяща конструкция за PVC покрив', 'Монтаж на Enphase оборудване', 'Крайни тестове и въвеждане в експлоатация'],
    solis_note: 'Мониторингът е конфигуриран за детайлно следене на производството и състоянието на системата.',
    folder: '6,3 kw enphase system върху pvc мембрана',
    files: ['IMG_8249.webp', 'IMG_8253.webp', 'IMG_8261.webp', 'IMG_8264.webp', 'IMG_8265.webp', 'IMG_8266.webp', 'IMG_8268.webp'],
  },
  {
    slug: 'huawei-6-3kw-system',
    city: 'България',
    power: '6.3 kW',
    type: 'home',
    title: '6.3 kW Huawei система',
    summary: 'Модерна покривна инсталация с Huawei компоненти за стабилно и предвидимо енергийно покритие.',
    completed_scope: ['Оглед и планиране на разположението', 'Монтаж и свързване на Huawei оборудване', 'Настройка на мониторинг и предаване'],
    solis_note: 'Клиентът получава ясни графики за производство и потребление през мобилно приложение.',
    folder: '6,3 kw huawei',
    files: ['IMG_0466.webp', 'IMG_0468.webp'],
  },
  {
    slug: 'growatt-8-1kw-system',
    city: 'България',
    power: '8.1 kW',
    type: 'home',
    title: '8.1 kW Growatt система',
    summary: 'Домашен проект за по-висока енергийна самостоятелност и оптимизация на разходите.',
    completed_scope: ['Оразмеряване според реално натоварване', 'Пълен монтаж на системата', 'Пуск, тест и обучение за ежедневна употреба'],
    solis_note: 'Активирани са известия за производителност и проследяване на тенденции.',
    folder: '8,1 growatt system',
    files: ['IMG_8723.webp', 'IMG_8726.webp', 'IMG_8727.webp'],
  },
  {
    slug: 'large-project-phase-1',
    city: 'България',
    power: 'Голям проект',
    type: 'business',
    title: 'Голям обект - фаза 1',
    summary: 'Първи етап от мащабен проект с координирана инсталация и подготовка за разширение.',
    completed_scope: ['Етапно изпълнение с минимално прекъсване на дейността', 'Монтаж на основните масиви и инверторна част', 'Проверки и приемо-предаване'],
    solis_note: 'Изградено е наблюдение на ключовите KPI за производство и ефективност.',
    folder: 'big project',
    files: ['FullSizeRender.webp', 'IMG_0974.webp', 'IMG_0975.webp', 'IMG_7627.webp', 'IMG_7628.webp'],
  },
  {
    slug: 'large-project-phase-2',
    city: 'България',
    power: 'Разширение',
    type: 'business',
    title: 'Голям обект - разширение',
    summary: 'Разширение на съществуваща система с цел допълнително повишаване на покритието и добива.',
    completed_scope: ['Одит на съществуващата инсталация', 'Интеграция на нови мощности', 'Пуск и синхронизация на всички компоненти'],
    solis_note: 'Мониторингът е надграден за единен изглед на първия и втория етап.',
    folder: 'big project - Copy',
    files: ['IMG_1648.webp', 'IMG_1652.webp'],
  },
  {
    slug: 'urban-large-project',
    city: 'България',
    power: 'Градски мащаб',
    type: 'business',
    title: 'Голям градски проект (Urban)',
    summary: 'Мащабна градска инсталация с поетапно изпълнение и голям брой монтажни точки.',
    completed_scope: ['Подробна логистика и координация на екипите', 'Масов монтаж на панелни редове и ел. част', 'Финално тестване и предаване по етапи'],
    solis_note: 'Настроено е централизирано наблюдение с проследяване на отделни зони.',
    folder: 'big project - urban',
    files: ['IMG_5320.webp', 'IMG_5337.webp', 'IMG_5339.webp', 'IMG_5340.webp', 'IMG_5341.webp', 'IMG_5342.webp', 'IMG_5343.webp', 'IMG_5344.webp', 'IMG_5345.webp', 'IMG_5346.webp', 'IMG_5424.webp', 'IMG_5425.webp', 'IMG_5439.webp', 'IMG_5491.webp', 'IMG_5492.webp', 'IMG_5700 2.webp', 'IMG_5700.webp', 'IMG_5701.webp', 'IMG_5702.webp'],
  },
];

export const projects: ProjectItem[] = projectSeeds.map((seed, index) => {
  const static_images: ProjectImageItem[] = seed.files.map((file, imageIndex) => ({
    id: index * 100 + imageIndex + 1,
    image_url: projectImageUrl(seed.folder, file),
    display_order: imageIndex,
  }));

  return {
    id: index + 1,
    slug: seed.slug,
    city: seed.city,
    power: seed.power,
    type: seed.type,
    title: seed.title,
    summary: seed.summary,
    completed_scope: seed.completed_scope,
    solis_note: seed.solis_note,
    display_order: index,
    integration_name: seed.integration_name || inferIntegrationName(seed.slug),
    integration_note: seed.integration_note || seed.solis_note,
    image: static_images[0]?.image_url || '',
    static_images,
  };
});

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
      'По-сложно е, защото са нужни разрешения за монтаж на покрив. Обадете се на 089 435 4538 за повече информация.',
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
