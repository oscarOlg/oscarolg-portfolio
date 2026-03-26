# Promotions Integration Guide

## Quick Links
- 📊 **Admin Dashboard**: `/admin/promotions`  
- 🎯 **Config**: `src/config/promotions.ts` (7 promotions pre-configured)  
- 🪝 **Hooks**: `src/hooks/usePromotions.ts` (6 reusable hooks)  
- 🎨 **Components**: `src/app/components/PromoCard.tsx` (3 display variants)

---

## 📋 Overview

The new modular promotions system includes:

| File | Purpose |
|------|---------|
| **promotions.ts** | Database of all 7 promotions with dates, variants, messaging |
| **usePromotions.ts** | React hooks for filtering, A/B testing, tracking |
| **PromoCard.tsx** | 3 reusable display components (Banner, Card, HeaderBanner) |
| **/admin/promotions** | Non-technical dashboard to toggle campaigns & variants |

### Active Promotions (Pre-configured)
1. ✨ **welcome_new_clients** - FREE $300 samples (ongoing, portraits)
2. ⚡ **quick_booking_discount** - $200 off within 48h (ongoing, portraits)
3. ⏰ **limited_availability** - Scarcity alert 3 spots (Mar 28-Apr 5, portraits)
4. 💑 **couple_bundle_deal** - $250 off bundle (Jun 1-Aug 31, portraits)
5. 👥 **referral_program** - $150 credit (ongoing, both services)
6. 📸 **graduation_special** - $2K + guide (Mar 15-Apr 30, portraits)
7. 💍 **wedding_early_booking** - $500 discount (May 1-Jul 31, weddings)

---

## 🚀 Pattern 1: Show Primary Promo on Services Page

### Step 1: Update `src/app/services/ServicesContent.tsx`

Add this hook at the top of your component:

```tsx
'use client';

import { usePrimaryPromo } from '@/hooks/usePromotions';
import { PromoHeaderBanner, PromoCard } from '@/app/components/PromoCard';

export default function ServicesContent(props) {
  // Get the highest-priority promotion for the Services page
  const promo = usePrimaryPromo({ 
    service: 'portraits',  // or 'weddings' for that tab
    displayOn: 'services' 
  });

  return (
    <div>
      {/* Show promo at the top if available */}
      {promo && <PromoHeaderBanner promo={promo} />}

      {/* ... rest of your services content ... */}
    </div>
  );
}
```

### Step 2: Test It Out

1. **Visit**: `http://localhost:3000/services`  
2. You should see the header banner with the active promotion at the top  
3. Click "Admin Dashboard" → `/admin/promotions` to toggle it on/off  
4. Refresh the page to see changes

---

## 🎨 Pattern 2: Use Different Promo Layouts

### Card Layout (Below packages)
```tsx
import { PromoCard } from '@/app/components/PromoCard';
import { usePrimaryPromo } from '@/hooks/usePromotions';

export function ServicesPageWithCard() {
  const promo = usePrimaryPromo({ service: 'portraits', displayOn: 'services' });

  return (
    <div>
      {/* Your packages here */}
      
      {/* Promo card below packages */}
      {promo && (
        <PromoCard 
          promo={promo} 
          onClick={() => {
            // Scroll to booking form or open WhatsApp
            window.open('https://wa.me/...');
          }}
        />
      )}
    </div>
  );
}
```

### Sticky Banner (Float on page)
```tsx
import { PromoBanner } from '@/app/components/PromoCard';
import { usePromotionsForContext } from '@/hooks/usePromotions';

export function PageWithStickyPromo() {
  const promos = usePromotionsForContext({ displayOn: 'services' });
  const activePromo = promos[0]; // First active promo for this context

  return (
    <div>
      {/* Your page content */}
      
      {/* Sticky banner floating on right */}
      {activePromo && (
        <PromoBanner 
          promo={activePromo}
          onClose={() => console.log('Promo closed')}
        />
      )}
    </div>
  );
}
```

---

## 🪝 Pattern 3: Advanced Hook Usage

### Get All Promos for a Context
```tsx
import { usePromotionsForContext } from '@/hooks/usePromotions';

// Returns array of all active promos for this context
const allPromos = usePromotionsForContext({ 
  displayOn: 'homepage',
  service: 'weddings'
});

// Map through and display them all
{allPromos.map(promo => (
  <PromoCard key={promo.id} promo={promo} />
))}
```

### Rotate Variants by Day (A/B Testing)
```tsx
import { useActiveVariant } from '@/hooks/usePromotions';

const promo = PROMOTIONS_DB[2]; // Limited availability promo
const variant = useActiveVariant(promo);

// Monday → variant_a
// Tuesday → variant_b
// Automatically rotates, no manual switching needed!
return <h1>{variant.headline}</h1>
```

### Track Promo Interactions
```tsx
import { usePromoTracking } from '@/hooks/usePromotions';

function MyPromoButton({ promo }) {
  const handleClick = () => {
    // Fires: fbq('track', 'Click', { content_name: 'promo_welcome_samples' })
    usePromoTracking(promo.id, 'click');
    
    // Then do your action (open form, etc)
    openBookingForm();
  };

  return <button onClick={handleClick}>Reserve Now</button>;
}
```

---

## 🎛️ Pattern 4: Admin Controls (Upcoming API)

Currently client-side only. In the future, add persistence:

```tsx
// Admin toggle promotion on/off
const toggleFn = useTogglePromo(promoId);
toggleFn(false); // Disable this promo

// Admin change active variant
const changeFn = useChangeVariant(promoId);
changeFn('variant_b'); // Switch to variant B for A/B testing
```

---

## 📊 Meta Pixel Tracking (Automatic)

Each promotion automatically tracks to Meta Pixel:

### View Event
Fired when promo renders on page:
```json
{
  "event": "ViewContent",
  "eventData": {
    "content_name": "promo_welcome_samples"  // trackingLabel from config
  }
}
```

### Click Event
Fired when user clicks CTA button:
```json
{
  "event": "Click",
  "eventData": {
    "content_name": "promo_welcome_samples"
  }
}
```

### Check Analytics
1. **Visit**: Meta Business Suite → Pixel → Events  
2. **Filter by**: `promo_welcome_samples`, `promo_quick_booking_discount`, etc.  
3. **Analyze**: View rate, click rate, conversion correlation

---

## ⚙️ Customization: Editing Promotions

### Add a New Promotion

**File**: `src/config/promotions.ts`

```tsx
export const PROMOTIONS_DB: Promotion[] = [
  // ... existing promos ...
  
  {
    id: 'my_new_promo',
    name: 'My New Campaign',
    active: true,
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    service: 'weddings',  // 'portraits' | 'weddings' | 'both'
    displayOn: ['homepage', 'contact'],
    type: 'card',
    variants: [
      {
        name: 'variant_a',
        headline: '💒 Limited Wedding Spots Available',
        subheadline: 'Book your date before they\'re gone',
        cta: 'Secure Your Date',
        ctaColor: 'secondary',
        icon: '💒'
      }
    ],
    activeVariant: 'variant_a',
    icon: '💒',
    value: 500,
    urgencyType: 'scarcity',
    trackingLabel: 'promo_wedding_spots'
  }
];
```

### Change Variant Messaging

```tsx
{
  name: 'variant_b',
  headline: '✨ Exclusive Wedding Discount',
  subheadline: 'Premium packages, exclusive rate',
  cta: 'Learn More',
  ctaColor: 'accent',
  icon: '✨'
}
```

### Disable a Promotion

In `src/config/promotions.ts`, set `active: false`:

```tsx
{
  id: 'limited_availability',
  active: false,  // ← This promo won't show anywhere
  // ... rest of config
}
```

---

## 🔧 Troubleshooting

### Promotion Doesn't Show?

1. ✅ Check if `active: true` in config
2. ✅ Check if today's date is within startDate/endDate range
3. ✅ Check if `displayOn` includes the current page location
4. ✅ Check if service filter matches (portraits, weddings, or both)
5. ✅ Check admin dashboard: `/admin/promotions` (may be toggled off)

### Meta Pixel Not Tracking?

1. ✅ Verify Meta Pixel ID: `302412685636304` in `src/lib/pixel.ts`
2. ✅ Check browser console: No errors?
3. ✅ Check Meta Pixel debugger in browser extension
4. ✅ Verify `trackingLabel` is set in promotion config

### Variant Not Rotating?

1. ✅ Check if promo has >1 variant
2. ✅ Clear browser cache (cached variant selection)
3. ✅ Check system date (rotation is by day-of-week)
4. ✅ Run: `npm run build` to regenerate

---

## 📱 Page Integration Examples

### Homepage
```tsx
import { usePrimaryPromo } from '@/hooks/usePromotions';
import { PromoHeaderBanner } from '@/app/components/PromoCard';

// Inside HomePage component:
const promo = usePrimaryPromo({ displayOn: 'homepage' });
return (
  <div>
    {promo && <PromoHeaderBanner promo={promo} />}
    {/* ... homepage content ... */}
  </div>
);
```

### Contact Page
```tsx
import { usePromotionsForContext } from '@/hooks/usePromotions';
import { PromoCard } from '@/app/components/PromoCard';

// Inside ContactPage component:
const promos = usePromotionsForContext({ displayOn: 'contact' });
return (
  <div>
    {/* ... contact form ... */}
    {promos.length > 0 && (
      <div className="mt-8">
        {promos.map(p => (
          <PromoCard key={p.id} promo={p} />
        ))}
      </div>
    )}
  </div>
);
```

### Portfolio Page
```tsx
import { useAllPromotions } from '@/hooks/usePromotions';

// Show ALL active promos (not filtered):
const allPromos = useAllPromotions();
```

---

## 🚀 Next Steps

1. **Test Basic Integration**: Add `PromoHeaderBanner` to Services page
2. **Check Console**: No TypeScript errors?
3. **Visit Admin Dashboard**: `/admin/promotions` to toggle/manage
4. **Verify Tracking**: Check Meta Pixel events firing
5. **Deploy**: Push to production when ready
6. **Monitor**: Track conversion with Meta Pixel analytics

---

## Quick Reference: All Hooks

| Hook | Purpose | Returns |
|------|---------|---------|
| `usePrimaryPromo(context)` | Get highest-priority promo | `Promotion \| null` |
| `usePromotionsForContext(context)` | Get all active promos for context | `Promotion[]` |
| `useAllPromotions()` | Get all active promos (no filter) | `Promotion[]` |
| `useActiveVariant(promo)` | Get current variant (day-rotated) | `PromoVariant` |
| `usePromoTracking(id, 'view'\|'click')` | Fire Meta Pixel event | `void` |
| `useTogglePromo(id)` | Return toggle function | `(active: bool) => void` |
| `useChangeVariant(id)` | Return variant changer | `(variantName: string) => void` |

---

## Quick Reference: All Components

| Component | Props | Use Case |
|-----------|-------|----------|
| **PromoHeaderBanner** | `promo`, `onClick?` | Top-of-page banner (full width) |
| **PromoCard** | `promo`, `onClick?` | Card-based promo (below content) |
| **PromoBanner** | `promo`, `onClose?`, `onClick?` | Sticky floating banner |

---

**Questions?** Check the finished components in:
- `src/config/promotions.ts` - See all 7 campaigns
- `src/hooks/usePromotions.ts` - See all hook implementations
- `src/app/components/PromoCard.tsx` - See display components
- `/admin/promotions` - Test dashboard for managing campaigns
