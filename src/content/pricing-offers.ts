export type OfferProduct = {
  name: string;
  model: string;
  image: string;
  alt: string;
};

export type OfferPanels = OfferProduct & {
  count: number;
};

export type PricingOfferCardId = 'offer-8kw' | 'offer-12kw' | 'offer-15kw';

export type PricingOfferFeature = {
  id: 'inspection' | 'project' | 'warranty';
  label: string;
};

export type PricingOffer = {
  id: PricingOfferCardId;
  price: string;
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

export const offerHeroFallbackById: Record<PricingOfferCardId, string> = {
  'offer-8kw': '/assets/offers/hero-1.webp',
  'offer-12kw': '/assets/offers/hero-2.webp',
  'offer-15kw': '/assets/offers/hero-3.webp',
};

export const pricingOffers: PricingOffer[] = [
  {
    id: 'offer-8kw',
    price: '6650€ с ДДС',
    heroImage: offerHeroFallbackById['offer-8kw'],
    shortTitle: 'ФЕЦ + Батерия 8 kW',
    includes: 'Конструкция и кабели',
    headlineLines: ['ТРИФАЗНА ХИБРИДНА', 'СИСТЕМА ~8.1kWp', 'БАТЕРИЯ 10.24kWh', 'С ВКЛЮЧЕН МОНТАЖ'],
    inverter: {
      name: 'Solis',
      model: 'S6-EH3P8K02-NV-YD-L',
      powerLabel: '8 kW',
      image: '/assets/products/inverters/Изображение-от-WhatsApp-на-2025-03-21-в-17.04.50_f9ec5397.jpg',
      alt: 'Инвертор Solis S6-EH3P8K02-NV-YD-L',
    },
    battery: {
      name: 'Dyness',
      model: 'LV Powerbox G2 10.24kWh 51.2V/200Ah Heating',
      energyLabel: '10.24 kWh',
      image: '/assets/products/batteries/8230-01-0050_1.jpg',
      alt: 'Батерия Dyness LV Powerbox G2 10.24kWh',
    },
    panels: {
      name: 'JA Solar',
      model: '540W',
      count: 15,
      image: '/assets/products/panels/ja-solar-540w.png',
      alt: 'Соларен панел JA Solar 540W',
    },
    ctaText: 'Обади се',
    ctaHref: 'tel:+3590894354538',
  },
  {
    id: 'offer-12kw',
    price: '7750€ с ДДС',
    heroImage: offerHeroFallbackById['offer-12kw'],
    shortTitle: 'ФЕЦ + Батерия 12 kW (Deye)',
    includes: 'Конструкция и кабели',
    headlineLines: ['ТРИФАЗНА ХИБРИДНА', 'СИСТЕМА ~12.4kWp', 'БАТЕРИЯ 13.44kWh', 'С ВКЛЮЧЕН МОНТАЖ'],
    inverter: {
      name: 'Deye',
      model: 'SUN-12K-SG05 LP3-EU-SM2',
      powerLabel: '12 kW',
      image: '/assets/products/inverters/15kwSolisINverter.png',
      alt: 'Инвертор Deye SUN-12K-SG05 LP3-EU-SM2',
    },
    battery: {
      name: 'Ritar',
      model: 'BAT-15KWH-48V 13.44kWh',
      energyLabel: '13.44 kWh',
      image: '/assets/products/batteries/8230-01-0050_1.jpg',
      alt: 'Батерия Ritar BAT-15KWH-48V 13.44kWh',
    },
    panels: {
      name: 'JA Solar',
      model: '540W',
      count: 23,
      image: '/assets/products/panels/ja-solar-540w.png',
      alt: 'Соларен панел JA Solar 540W',
    },
    ctaText: 'Обади се',
    ctaHref: 'tel:+3590894354538',
  },
  {
    id: 'offer-15kw',
    price: '8700€ с ДДС',
    heroImage: offerHeroFallbackById['offer-15kw'],
    shortTitle: 'ФЕЦ + Батерия 12 kW (Solis)',
    includes: 'Конструкция и кабели',
    headlineLines: ['ТРИФАЗНА ХИБРИДНА', 'СИСТЕМА ~12.4kWp', 'БАТЕРИЯ 14.33kWh', 'С ВКЛЮЧЕН МОНТАЖ'],
    inverter: {
      name: 'Solis',
      model: 'S6-EH3P12K02-NV-YD-L',
      powerLabel: '12 kW',
      image: '/assets/products/inverters/12kwSolisInverter.png',
      alt: 'Инвертор Solis S6-EH3P12K02-NV-YD-L',
    },
    battery: {
      name: 'Dyness',
      model: 'LV PowerBrick 14.33kWh 51.2V/280Ah Heating',
      energyLabel: '14.33 kWh',
      image: '/assets/products/batteries/dyness-power-brick 14KW.jpg',
      alt: 'Батерия Dyness LV PowerBrick 14.33kWh',
    },
    panels: {
      name: 'JA Solar',
      model: '540W',
      count: 23,
      image: '/assets/products/panels/ja-solar-540w.png',
      alt: 'Соларен панел JA Solar 540W',
    },
    ctaText: 'Обади се',
    ctaHref: 'tel:+3590894354538',
  },
];

export const pricingOfferFeatures: PricingOfferFeature[] = [
  { id: 'inspection', label: 'БЕЗПЛАТЕН ОГЛЕД' },
  { id: 'project', label: 'ИЗГОТВЯНЕ НА ПРОЕКТ' },
  { id: 'warranty', label: '10 ГОДИНИ ГАРАНЦИЯ' },
];
