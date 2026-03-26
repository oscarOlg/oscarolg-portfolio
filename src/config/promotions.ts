/**
 * Modular Promotions System
 * 
 * Switch promotions easily without touching components.
 * Each promo has: active status, date range, A/B variants, placement rules
 */

export type PromoType = 'banner' | 'card' | 'sticky' | 'email' | 'whatsapp';
export type PromoService = 'portraits' | 'weddings' | 'both';

export interface PromoVariant {
  name: string; // 'variant_a', 'variant_b'
  headline: string;
  subheadline?: string;
  cta: string;
  ctaColor?: 'primary' | 'accent' | 'secondary';
  icon?: string; // emoji
}

export interface Promotion {
  id: string;
  name: string; // Internal name: 'welcome_offer', 'quick_booking', etc
  
  // Activation
  active: boolean; // Master toggle
  startDate: string; // ISO: "2026-03-25"
  endDate: string; // ISO: "2026-12-31" or "ongoing"
  
  // Content
  type: PromoType;
  service: PromoService; // Which service(s) to show on
  displayOn: ('homepage' | 'services' | 'contact' | 'guides')[];
  
  // Copy (you can have one or multiple variants for A/B testing)
  variants: PromoVariant[];
  activeVariant: string; // Which variant to use by default
  
  // Psychology/Business
  icon: string; // emoji for visual impact
  value: number; // Discount amount (MXN) for tracking
  urgencyType?: 'scarcity' | 'discount' | 'bonus' | 'limited_time';
  
  // WhatsApp preset (if applicable)
  whatsappMessage?: string;
  
  // Tracking
  trackingLabel: string; // For analytics: 'promo_welcome', 'promo_quickbook'
}

/**
 * PROMOTIONS DATABASE
 */
export const PROMOTIONS_DB: Promotion[] = [
  // ============ PROMO A: WELCOME OFFER ============
  {
    id: 'welcome_new_clients',
    name: 'Welcome Offer - Free Samples',
    active: true,
    startDate: '2026-03-01',
    endDate: 'ongoing',
    
    type: 'banner', // Top banner on services page
    service: 'portraits', // Portraits service
    displayOn: ['services', 'homepage'],
    
    variants: [
      {
        name: 'variant_a',
        headline: '🎁 FREE Printed Samples for First-Time Clients',
        subheadline: 'Book your session and get 4x6" samples free (normally $300)',
        cta: 'Book Your Free Samples Session',
        ctaColor: 'accent',
        icon: '🎁',
      },
      {
        name: 'variant_b',
        headline: '✨ New Client Special: Free Printed Keepsakes',
        subheadline: 'Your first portrait session includes printed samples to take home',
        cta: 'Claim Your First Session Offer',
        ctaColor: 'primary',
        icon: '✨',
      },
    ],
    activeVariant: 'variant_a',
    
    icon: '🎁',
    value: 300, // Value of free samples
    urgencyType: 'bonus',
    
    trackingLabel: 'promo_welcome_samples',
  },

  // ============ PROMO B: QUICK BOOKING ============
  {
    id: 'quick_booking_discount',
    name: 'Quick Booking - $200 Off',
    active: true,
    startDate: '2026-03-25',
    endDate: 'ongoing',
    
    type: 'sticky', // Floating button
    service: 'portraits',
    displayOn: ['services', 'contact'],
    
    variants: [
      {
        name: 'variant_a',
        headline: '⚡ BOOK NOW: $200 OFF',
        subheadline: 'If scheduled within 48 hours (valid this week)',
        cta: 'Claim Your Discount',
        ctaColor: 'accent',
        icon: '⚡',
      },
      {
        name: 'variant_b',
        headline: '🔥 Limited Time: $200 Discount This Week',
        subheadline: 'Book today, shoot this week. Save big.',
        cta: 'Book Now & Save',
        ctaColor: 'secondary',
        icon: '🔥',
      },
    ],
    activeVariant: 'variant_a',
    
    icon: '⚡',
    value: 200,
    urgencyType: 'discount',
    
    // This promo rotates: Active Mon-Fri only
    // You'd implement in hook: check day of week
    
    trackingLabel: 'promo_quick_book',
  },

  // ============ PROMO C: LIMITED AVAILABILITY ============
  {
    id: 'limited_availability',
    name: 'Limited Availability Alert',
    active: true,
    startDate: '2026-03-25',
    endDate: '2026-04-05',
    
    type: 'card', // Card component on services page
    service: 'portraits',
    displayOn: ['services'],
    
    variants: [
      {
        name: 'variant_a',
        headline: '⏰ LIMITED: Only 3 Portrait Spots Left',
        subheadline: 'March 28 - April 5. Reserve before they fill up.',
        cta: 'Secure Your Spot',
        ctaColor: 'accent',
        icon: '⏰',
      },
    ],
    activeVariant: 'variant_a',
    
    icon: '⏰',
    value: 0, // Just scarcity, no discount
    urgencyType: 'scarcity',
    
    trackingLabel: 'promo_limited_slots',
  },

  // ============ PROMO D: COUPLE BUNDLE ============
  {
    id: 'couple_bundle_deal',
    name: 'Couple + Family Bundle',
    active: false, // Off until June
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    
    type: 'card',
    service: 'portraits',
    displayOn: ['services'],
    
    variants: [
      {
        name: 'variant_a',
        headline: '💑 BUNDLE DEAL: Couple + Family Sessions',
        subheadline: 'Book engagement session now + family session later = Save $250',
        cta: 'Claim Bundle Savings',
        ctaColor: 'accent',
        icon: '💑',
      },
    ],
    activeVariant: 'variant_a',
    
    icon: '💑',
    value: 250,
    urgencyType: 'discount',
    
    trackingLabel: 'promo_couple_bundle',
  },

  // ============ PROMO E: REFERRAL ============
  {
    id: 'referral_program',
    name: 'Refer a Friend - Get $150 Off',
    active: true,
    startDate: '2026-03-01',
    endDate: 'ongoing',
    
    type: 'card',
    service: 'both',
    displayOn: ['contact'], // Post-booking email + website
    
    variants: [
      {
        name: 'variant_a',
        headline: '👥 Love Your Photos? Share the Love',
        subheadline: 'You get $150 credit. Your friend gets $150 off their first session.',
        cta: 'Share Your Referral Link',
        ctaColor: 'secondary',
        icon: '👥',
      },
    ],
    activeVariant: 'variant_a',
    
    icon: '👥',
    value: 150,
    urgencyType: 'bonus',
    
    trackingLabel: 'promo_referral',
  },

  // ============ PROMO F: TYPE-SPECIFIC (GRADUATION) ============
  {
    id: 'graduation_special',
    name: 'Graduation Session Special',
    active: true,
    startDate: '2026-03-15',
    endDate: '2026-04-30',
    
    type: 'banner',
    service: 'portraits',
    displayOn: ['services', 'guides'],
    
    variants: [
      {
        name: 'variant_a',
        headline: '📸 GRADUATION SPECIAL: $2,000 Session + Free Guide',
        subheadline: 'Limited to 5 bookings this month. Book by April 15.',
        cta: 'Book Your Graduation Session',
        ctaColor: 'accent',
        icon: '📸',
      },
    ],
    activeVariant: 'variant_a',
    
    icon: '📸',
    value: 100, // Discount from normal $2,100
    urgencyType: 'limited_time',
    
    whatsappMessage: 'Hola Oscar, me interesa una sesión de graduación con descuento. ¿Tienes disponibilidad?',
    
    trackingLabel: 'promo_graduation',
  },

  // ============ PROMO G: WEDDING EARLY BOOKING ============
  {
    id: 'wedding_early_booking',
    name: 'Wedding Early Booking Discount',
    active: false,
    startDate: '2026-05-01',
    endDate: '2026-07-31',
    
    type: 'card',
    service: 'weddings',
    displayOn: ['services'],
    
    variants: [
      {
        name: 'variant_a',
        headline: '💍 BOOK EARLY: Save $500 on Your Wedding',
        subheadline: 'Reserve 3+ months in advance. Less stress, better rates.',
        cta: 'Reserve Your Wedding Date',
        ctaColor: 'accent',
        icon: '💍',
      },
    ],
    activeVariant: 'variant_a',
    
    icon: '💍',
    value: 500,
    urgencyType: 'discount',
    
    trackingLabel: 'promo_wedding_early',
  },
];

/**
 * HELPER: Get active promotions
 */
export function getActivePromotions(
  filter?: {
    service?: PromoService;
    displayOn?: 'homepage' | 'services' | 'contact' | 'guides';
    type?: PromoType;
  }
): Promotion[] {
  return PROMOTIONS_DB.filter((promo) => {
    // Must be active
    if (!promo.active) return false;

    // Check date range
    const today = new Date().toISOString().split('T')[0];
    if (today < promo.startDate) return false;
    if (promo.endDate !== 'ongoing' && today > promo.endDate) return false;

    // Apply filters
    if (filter?.service && promo.service !== filter.service && promo.service !== 'both') {
      return false;
    }
    if (filter?.displayOn && !promo.displayOn.includes(filter.displayOn)) {
      return false;
    }
    if (filter?.type && promo.type !== filter.type) return false;

    return true;
  });
}

/**
 * HELPER: Get specific promo by ID
 */
export function getPromoById(id: string): Promotion | undefined {
  return PROMOTIONS_DB.find((p) => p.id === id);
}

/**
 * HELPER: Get active variant for a promo
 */
export function getActiveVariant(promo: Promotion): PromoVariant {
  return promo.variants.find((v) => v.name === promo.activeVariant) || promo.variants[0];
}
