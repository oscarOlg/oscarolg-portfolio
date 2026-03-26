'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  PROMOTIONS_DB,
  getActivePromotions,
  getPromoById,
  getActiveVariant,
  Promotion,
  PromoVariant,
} from '@/config/promotions';

/**
 * Rotate between variants based on day of week (for A/B testing)
 * Example: Variant A on Mon/Wed/Fri, Variant B on Tue/Thu, off on Sat/Sun
 */
export function useActiveVariant(promo: Promotion): PromoVariant {
  const dayOfWeek = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc

  // Simple rotation: Alternate variants by day
  if (promo.variants.length > 1) {
    const variantIndex = dayOfWeek % promo.variants.length;
    return promo.variants[variantIndex];
  }

  return getActiveVariant(promo);
}

/**
 * Get promotions for specific context
 * E.g., "What promo should show on the Portraits Services page?"
 */
export function usePromotionsForContext(context: {
  service?: 'portraits' | 'weddings' | 'both';
  displayOn: 'homepage' | 'services' | 'contact' | 'guides';
  type?: 'banner' | 'card' | 'sticky' | 'email' | 'whatsapp';
}): Promotion[] {
  const [promos, setPromos] = useState<Promotion[]>([]);

  // Create stable context key to avoid infinite loop
  const contextKey = useMemo(
    () => `${context.service || 'any'}-${context.displayOn}-${context.type || 'any'}`,
    [context.service, context.displayOn, context.type]
  );

  useEffect(() => {
    const active = getActivePromotions({
      service: context.service,
      displayOn: context.displayOn,
      type: context.type,
    });
    setPromos(active);
  }, [contextKey, context.service, context.displayOn, context.type]);

  return promos;
}

/**
 * Get ONE primary promo for display (highest priority)
 * Priority: Scarcity > Discount > Bonus
 */
export function usePrimaryPromo(context: {
  service?: 'portraits' | 'weddings' | 'both';
  displayOn: 'homepage' | 'services' | 'contact' | 'guides';
  type?: 'banner' | 'card' | 'sticky' | 'email' | 'whatsapp';
}): Promotion | null {
  const promos = usePromotionsForContext(context);

  if (promos.length === 0) return null;

  // Priority order
  const priorityMap: Record<string, number> = {
    scarcity: 3,
    discount: 2,
    limited_time: 2,
    bonus: 1,
  };

  return promos.sort((a, b) => {
    const priorityA = priorityMap[a.urgencyType || 'bonus'] || 0;
    const priorityB = priorityMap[b.urgencyType || 'bonus'] || 0;
    return priorityB - priorityA;
  })[0];
}

/**
 * Track promo view/click
 */
export function usePromoTracking(promoId: string, event: 'view' | 'click') {
  useEffect(() => {
    const promo = getPromoById(promoId);
    if (!promo) return;

    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', event === 'view' ? 'ViewContent' : 'InitiateCheckout', {
        content_type: 'promotion',
        content_name: promo.trackingLabel,
        promo_id: promoId,
      });
    }
  }, [promoId]);
}

/**
 * Get all promotions (for admin dashboard)
 */
export function useAllPromotions() {
  return PROMOTIONS_DB;
}

/**
 * Toggle promo active status (admin function)
 * NOTE: This is client-side only. In production, you'd have an API endpoint
 * to persist changes to a database.
 */
export function useTogglePromo(promoId: string) {
  return (active: boolean) => {
    const promo = getPromoById(promoId);
    if (promo) {
      promo.active = active;
      // In production: await API.updatePromo(promoId, { active })
    }
  };
}

/**
 * Change active variant (for A/B testing)
 */
export function useChangeVariant(promoId: string) {
  return (variantName: string) => {
    const promo = getPromoById(promoId);
    if (promo) {
      const variant = promo.variants.find((v) => v.name === variantName);
      if (variant) {
        promo.activeVariant = variantName;
        // In production: await API.updatePromo(promoId, { activeVariant: variantName })
      }
    }
  };
}
