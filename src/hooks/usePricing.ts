import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPricingPackages, updatePricingPackage } from '@/services/api';
import type { PricingPackageUpdate } from '@/types/database';
import { solarPackages } from '@/content/site-content';

// =====================================================
// Query Keys
// =====================================================
export const pricingKeys = {
  all: ['pricing'] as const,
  packages: () => [...pricingKeys.all, 'packages'] as const,
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
