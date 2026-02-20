import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPricingPackages,
  updatePricingPackage,
  getPricingOfferCards,
  updatePricingOfferCard,
  uploadPricingOfferCardImage,
} from '@/services/api';
import type { PricingOfferCardId, PricingOfferCardUpdate, PricingPackageUpdate } from '@/types/database';
import { solarPackages } from '@/content/site-content';
import { pricingOffers } from '@/content/pricing-offers';

// =====================================================
// Query Keys
// =====================================================
export const pricingKeys = {
  all: ['pricing'] as const,
  packages: () => [...pricingKeys.all, 'packages'] as const,
  offerCards: () => [...pricingKeys.all, 'offer-cards'] as const,
};

// =====================================================
// Pricing Queries
// =====================================================

export function usePricingPackages() {
  return useQuery({
    queryKey: pricingKeys.packages(),
    queryFn: getPricingPackages,
    staleTime: 60 * 60 * 1000, // 1 hour
    retry: 1,
    // Fallback to static data on error
    placeholderData: solarPackages.map((pkg) => ({
      ...pkg,
      price_eur: pkg.id === '8kw' ? 5900 : pkg.id === '12kw' ? 7750 : 9400,
      ideal_for: pkg.idealFor,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })),
  });
}

export function usePricingOfferCards() {
  return useQuery({
    queryKey: pricingKeys.offerCards(),
    queryFn: getPricingOfferCards,
    staleTime: 60 * 60 * 1000, // 1 hour
    retry: 1,
    placeholderData: pricingOffers.map((offer, index) => ({
      id: offer.id,
      display_order: index + 1,
      price_text: offer.price,
      hero_image: offer.heroImage,
      short_title: offer.shortTitle,
      includes_text: offer.includes,
      headline_lines: offer.headlineLines,
      inverter_name: offer.inverter.name,
      inverter_model: offer.inverter.model,
      inverter_power_label: offer.inverter.powerLabel,
      inverter_image: offer.inverter.image,
      battery_name: offer.battery.name,
      battery_model: offer.battery.model,
      battery_energy_label: offer.battery.energyLabel,
      battery_image: offer.battery.image,
      panels_name: offer.panels.name,
      panels_model: offer.panels.model,
      panels_count: offer.panels.count,
      panels_image: offer.panels.image,
      cta_text: offer.ctaText,
      cta_href: offer.ctaHref,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })),
  });
}

// =====================================================
// Pricing Mutations
// =====================================================

export function useUpdatePricingPackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: '8kw' | '12kw' | '15kw';
      updates: PricingPackageUpdate;
    }) => updatePricingPackage(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pricingKeys.packages() });
    },
  });
}

export function useUpdatePricingOfferCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: PricingOfferCardId;
      updates: PricingOfferCardUpdate;
    }) => updatePricingOfferCard(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pricingKeys.offerCards() });
    },
  });
}

export function useUploadPricingOfferCardImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      slot,
      file,
    }: {
      id: PricingOfferCardId;
      slot: 'hero' | 'inverter' | 'battery' | 'panels';
      file: File;
    }) => uploadPricingOfferCardImage(id, slot, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pricingKeys.offerCards() });
    },
  });
}
