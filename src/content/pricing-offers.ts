export type OfferProduct = {
  name: string;
  model: string;
  image: string;
  alt: string;
};

export type OfferPanels = OfferProduct & {
  count: number;
};

export const pricingOfferCategories = {
  'mono-lv': {
    id: 'mono-lv',
    eyebrow: 'Монофазна · Ниско напрежение',
    shortLabel: 'Монофазна · LV',
    title: 'Монофазни нисковолтови системи',
    subtitle: 'Икономични хибридни системи за еднофазни домакинства с LV батерия Dyness PowerBrick.',
  },
  '3phase-lv': {
    id: '3phase-lv',
    eyebrow: 'Трифазна · Ниско напрежение',
    shortLabel: 'Трифазна · LV',
    title: 'Трифазни нисковолтови системи',
    subtitle: 'Мощни трифазни решения за домове и малки обекти с LV батерия Dyness PowerBrick.',
  },
  '3phase-hv': {
    id: '3phase-hv',
    eyebrow: 'Трифазна · Високо напрежение',
    shortLabel: 'Трифазна · HV',
    title: 'Трифазни високоволтови системи',
    subtitle: 'HV хибридни системи с Dyness STACK100-3S за максимална ефективност и разширяемост.',
  },
} as const;

export type PricingOfferCategoryId = keyof typeof pricingOfferCategories;

export type PricingOfferCardId = string;

export type PricingOfferFeature = {
  id: 'inspection' | 'project' | 'warranty';
  label: string;
};

export type PricingOffer = {
  id: PricingOfferCardId;
  category: PricingOfferCategoryId;
  price: string;
  priceNote?: string;
  heroImage: string;
  shortTitle: string;
  includes: string;
  headlineLines: [string, string, string, string];
  inverter: OfferProduct & { powerLabel: string };
  battery: OfferProduct & { energyLabel: string };
  panels: OfferPanels;
  ctaText: string;
  ctaHref: string;
};

export const offerHeroFallbackById: Record<string, string> = {
  'offer-mono-lv-6kw': '/assets/offers/hero-1.webp',
  'offer-mono-lv-12kw': '/assets/offers/hero-2.webp',
  'offer-3p-lv-12kw': '/assets/offers/hero-3.webp',
  'offer-3p-lv-15kw': '/assets/offers/hero-1.webp',
  'offer-3p-hv-8kw': '/assets/offers/hero-2.webp',
  'offer-3p-hv-20kw': '/assets/offers/hero-3.webp',
};

const PANEL_IMAGE = '/assets/products/panels/ja-solar-540w.png';
const DYNESS_LV_IMAGE = '/assets/products/batteries/dyness-lv-powerbrick-plus.jpg';
const DYNESS_HV_IMAGE = '/assets/products/batteries/dyness-stack100-3s.webp';
const SOLIS_MONO_LV_IMAGE = '/assets/products/inverters/solis-s6-eh1p-l-plus.png';
const SOLIS_3P_LV_IMAGE = '/assets/products/inverters/solis-s6-eh3p12k-h-eu.png';
const SOLIS_3P_HV_8K_IMAGE = '/assets/products/inverters/solis-s6-eh1p8k-l-plus.png';
const SOLIS_3P_HV_20K_IMAGE = '/assets/products/inverters/solis-s6-eh3p12k-h-eu.png';

const PANEL_NAME = 'SolarNplus';
const PANEL_MODEL_440 = 'Sirius 440W Topcon N-type';
const PANEL_MODEL_580 = 'Sirius 580W Topcon N-type';

export const pricingOffers: PricingOffer[] = [
  {
    id: 'offer-mono-lv-6kw',
    category: 'mono-lv',
    price: '6 320 €',
    priceNote: 'без ДДС',
    heroImage: offerHeroFallbackById['offer-mono-lv-6kw'],
    shortTitle: 'ФЕЦ + Батерия 6 kW',
    includes: 'Конструкция, кабели и монтаж',
    headlineLines: ['МОНОФАЗНА ХИБРИДНА', 'СИСТЕМА ~7.9kWp', 'БАТЕРИЯ 16.07kWh', 'С ВКЛЮЧЕН МОНТАЖ'],
    inverter: {
      name: 'Solis',
      model: 'S6-EH1P6K-L-PLUS',
      powerLabel: '6 kW',
      image: SOLIS_MONO_LV_IMAGE,
      alt: 'Монофазен хибриден инвертор Solis S6-EH1P6K-L-PLUS 6kW',
    },
    battery: {
      name: 'Dyness',
      model: 'LV PowerBrick Plus 16.07kWh 51.2V/314Ah IP65 Heating',
      energyLabel: '16.07 kWh',
      image: DYNESS_LV_IMAGE,
      alt: 'Батерия Dyness LV PowerBrick Plus 16.07kWh',
    },
    panels: {
      name: PANEL_NAME,
      model: PANEL_MODEL_440,
      count: 18,
      image: PANEL_IMAGE,
      alt: `Соларен панел ${PANEL_NAME} ${PANEL_MODEL_440}`,
    },
    ctaText: 'Обади се',
    ctaHref: 'tel:+359894354538',
  },
  {
    id: 'offer-mono-lv-12kw',
    category: 'mono-lv',
    price: '8 350 €',
    priceNote: 'без ДДС',
    heroImage: offerHeroFallbackById['offer-mono-lv-12kw'],
    shortTitle: 'ФЕЦ + Батерия 12 kW',
    includes: 'Конструкция, кабели и монтаж',
    headlineLines: ['МОНОФАЗНА ХИБРИДНА', 'СИСТЕМА ~12.3kWp', 'БАТЕРИЯ 16.07kWh', 'С ВКЛЮЧЕН МОНТАЖ'],
    inverter: {
      name: 'Solis',
      model: 'S6-EH1P(12-16)K03-NV-YD-L',
      powerLabel: '12 kW',
      image: SOLIS_MONO_LV_IMAGE,
      alt: 'Монофазен хибриден инвертор Solis S6-EH1P(12-16)K03-NV-YD-L 12kW',
    },
    battery: {
      name: 'Dyness',
      model: 'LV PowerBrick Plus 16.07kWh 51.2V/314Ah IP65 Heating',
      energyLabel: '16.07 kWh',
      image: DYNESS_LV_IMAGE,
      alt: 'Батерия Dyness LV PowerBrick Plus 16.07kWh',
    },
    panels: {
      name: PANEL_NAME,
      model: PANEL_MODEL_440,
      count: 28,
      image: PANEL_IMAGE,
      alt: `Соларен панел ${PANEL_NAME} ${PANEL_MODEL_440}`,
    },
    ctaText: 'Обади се',
    ctaHref: 'tel:+359894354538',
  },
  {
    id: 'offer-3p-lv-12kw',
    category: '3phase-lv',
    price: '8 300 €',
    priceNote: 'без ДДС',
    heroImage: offerHeroFallbackById['offer-3p-lv-12kw'],
    shortTitle: 'ФЕЦ + Батерия 12 kW',
    includes: 'Конструкция, кабели и монтаж',
    headlineLines: ['ТРИФАЗНА ХИБРИДНА', 'СИСТЕМА ~12.18kWp', 'БАТЕРИЯ 16.07kWh', 'С ВКЛЮЧЕН МОНТАЖ'],
    inverter: {
      name: 'Solis',
      model: 'S6-EH3P12K-H-EU',
      powerLabel: '12 kW',
      image: SOLIS_3P_LV_IMAGE,
      alt: 'Трифазен хибриден инвертор Solis S6-EH3P12K-H-EU 12kW',
    },
    battery: {
      name: 'Dyness',
      model: 'LV PowerBrick Plus 16.07kWh 51.2V/314Ah IP65 Heating',
      energyLabel: '16.07 kWh',
      image: DYNESS_LV_IMAGE,
      alt: 'Батерия Dyness LV PowerBrick Plus 16.07kWh',
    },
    panels: {
      name: PANEL_NAME,
      model: PANEL_MODEL_580,
      count: 21,
      image: PANEL_IMAGE,
      alt: `Соларен панел ${PANEL_NAME} ${PANEL_MODEL_580}`,
    },
    ctaText: 'Обади се',
    ctaHref: 'tel:+359894354538',
  },
  {
    id: 'offer-3p-lv-15kw',
    category: '3phase-lv',
    price: '9 390 €',
    priceNote: 'без ДДС',
    heroImage: offerHeroFallbackById['offer-3p-lv-15kw'],
    shortTitle: 'ФЕЦ + 2× Батерия 15 kW',
    includes: 'Конструкция, кабели и монтаж',
    headlineLines: ['ТРИФАЗНА ХИБРИДНА', 'СИСТЕМА ~15.08kWp', '2× БАТЕРИЯ 16.07kWh', 'С ВКЛЮЧЕН МОНТАЖ'],
    inverter: {
      name: 'Solis',
      model: 'S6 15kW Трифазен хибриден',
      powerLabel: '15 kW',
      image: SOLIS_3P_LV_IMAGE,
      alt: 'Трифазен хибриден инвертор Solis S6 15kW',
    },
    battery: {
      name: 'Dyness',
      model: '2× LV PowerBrick Plus 16.07kWh 51.2V/314Ah IP65 Heating',
      energyLabel: '2× 16.07 kWh',
      image: DYNESS_LV_IMAGE,
      alt: 'Батерия Dyness LV PowerBrick Plus 16.07kWh (2 броя)',
    },
    panels: {
      name: PANEL_NAME,
      model: PANEL_MODEL_580,
      count: 26,
      image: PANEL_IMAGE,
      alt: `Соларен панел ${PANEL_NAME} ${PANEL_MODEL_580}`,
    },
    ctaText: 'Обади се',
    ctaHref: 'tel:+359894354538',
  },
  {
    id: 'offer-3p-hv-8kw',
    category: '3phase-hv',
    price: '7 800 €',
    priceNote: 'без ДДС',
    heroImage: offerHeroFallbackById['offer-3p-hv-8kw'],
    shortTitle: 'ФЕЦ + HV Батерия 8 kW',
    includes: 'Конструкция, кабели и монтаж',
    headlineLines: ['HV ХИБРИДНА', 'СИСТЕМА ~10kWp', 'HV БАТЕРИЯ 15.4kWh', 'С ВКЛЮЧЕН МОНТАЖ'],
    inverter: {
      name: 'Solis',
      model: 'S6-EH1P8K-L-PLUS',
      powerLabel: '8 kW',
      image: SOLIS_3P_HV_8K_IMAGE,
      alt: 'Хибриден инвертор Solis S6-EH1P8K-L-PLUS 8kW',
    },
    battery: {
      name: 'Dyness',
      model: 'STACK100-3S 15.4kWh high voltage',
      energyLabel: '15.4 kWh',
      image: DYNESS_HV_IMAGE,
      alt: 'Батерия Dyness STACK100-3S 15.4kWh high voltage',
    },
    panels: {
      name: PANEL_NAME,
      model: PANEL_MODEL_580,
      count: 17,
      image: PANEL_IMAGE,
      alt: `Соларен панел ${PANEL_NAME} ${PANEL_MODEL_580}`,
    },
    ctaText: 'Обади се',
    ctaHref: 'tel:+359894354538',
  },
  {
    id: 'offer-3p-hv-20kw',
    category: '3phase-hv',
    price: '12 800 €',
    priceNote: 'без ДДС',
    heroImage: offerHeroFallbackById['offer-3p-hv-20kw'],
    shortTitle: 'ФЕЦ + HV Батерия 20 kW',
    includes: 'Конструкция, кабели и монтаж',
    headlineLines: ['HV ТРИФАЗНА ХИБРИДНА', 'СИСТЕМА ~20.3kWp', 'HV БАТЕРИЯ 20.6kWh', 'С ВКЛЮЧЕН МОНТАЖ'],
    inverter: {
      name: 'Solis',
      model: 'S6-EH3P20K-H',
      powerLabel: '20 kW',
      image: SOLIS_3P_HV_20K_IMAGE,
      alt: 'Трифазен HV хибриден инвертор Solis S6-EH3P20K-H 20kW',
    },
    battery: {
      name: 'Dyness',
      model: 'STACK100-3S 20.6kWh high voltage',
      energyLabel: '20.6 kWh',
      image: DYNESS_HV_IMAGE,
      alt: 'Батерия Dyness STACK100-3S 20.6kWh high voltage',
    },
    panels: {
      name: PANEL_NAME,
      model: PANEL_MODEL_580,
      count: 35,
      image: PANEL_IMAGE,
      alt: `Соларен панел ${PANEL_NAME} ${PANEL_MODEL_580}`,
    },
    ctaText: 'Обади се',
    ctaHref: 'tel:+359894354538',
  },
];

export const pricingOfferFeatures: PricingOfferFeature[] = [
  { id: 'inspection', label: 'БЕЗПЛАТЕН ОГЛЕД' },
  { id: 'project', label: 'ИЗГОТВЯНЕ НА ПРОЕКТ' },
  { id: 'warranty', label: '10 ГОДИНИ ГАРАНЦИЯ' },
];

export const pricingOfferScope: string[] = [
  'Конструкция',
  '100 м DC + 15 м AC',
  'AC табло + система за байпас',
  'Кабел канал, гофре, крепеж',
  'Монтаж',
];
