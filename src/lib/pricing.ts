import type { ServicePackage } from '@/types/sanity';

/**
 * Calculates the total price for a selected package plus any add-ons.
 * Pure function — no side effects, easy to unit-test.
 */
export function calculateTotalPrice(
  selectedPackage: ServicePackage | null,
  selectedAddOns: Record<string, number>,
): number {
  if (!selectedPackage) return 0;

  let total = selectedPackage.price || 0;

  Object.entries(selectedAddOns).forEach(([addOnName, quantity]) => {
    const addOn = selectedPackage.addOns?.find((a) => a.name === addOnName);
    if (addOn && addOn.price) {
      total += addOn.price * quantity;
    }
  });

  return total;
}
