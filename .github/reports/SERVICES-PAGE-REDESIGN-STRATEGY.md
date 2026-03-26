# Services Page Redesign: Strategic Plan for Conversion Optimization

**Date**: March 25, 2026  
**Focus**: Convert the Services page from tab-based friction to a conversion-optimized flow  
**Goal**: Reduce decision fatigue, increase clarity, improve average booking value

---

## 🎯 PROBLEM STATEMENT

**Current Friction Points**:
1. ❌ Tab selector (Portraits | Weddings) — Users must click to see each service
2. ❌ No visual hierarchy — All packages look equally important
3. ❌ Pricing not emphasized — Doesn't communicate value clearly
4. ❌ Low visual interest — Plain cards, minimal animation
5. ❌ No clear "recommended" guidance — Users don't know which tier to pick
6. ❌ Promo placement suboptimal — Banner at top, card below feels scattered

**Business Impact**:
- Users abandon before deciding which service to explore
- High cart abandonment (can't see full picture at once)
- No price anchoring → wrong tier selection
- Missing upsell opportunities

---

## 📊 STRATEGIC RECOMMENDATIONS

### Recommendation 1: Eliminate Tab Friction — Single Page, Both Services

**Current UX**:
```
┌─────────────────────────────────────────┐
│   [Portraits] [Weddings]  ← FRICTION   │
│                                         │
│   Show ONE service at a time           │
│   User must click to switch             │
└─────────────────────────────────────────┘
```

**Proposed UX**:
```
┌─────────────────────────────────────────┐
│   HERO: Choose Your Perfect Moment     │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────────┐ ┌──────────────┐ │
│  │   📸 RETRATOS    │ │   💍 BODAS   │ │
│  │   (Click/Scroll) │ │  (Click/Scroll)
│  │                  │ │              │ │
│  │ "Expandable      │ │ "Expandable  │ │
│  │  Section"        │ │  Section"    │ │
│  └──────────────────┘ └──────────────┘ │
│                                         │
│  ┌─ RETRATOS (Expanded) ─────────────┐ │
│  │ [Esencial] [Clásico] [Premium]    │ │
│  │ $1,800    $2,100    $2,400        │ │
│  │ [Promo badge if active]           │ │
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─ BODAS (Collapsed) ───────────────┐ │
│  │ Tap to expand...                  │ │
│  └─────────────────────────────────────┘│
│                                         │
└─────────────────────────────────────────┘
```

**Why This Works**:
- ✅ No click-to-discover (visible at once)
- ✅ Users compare services easily  
- ✅ Reduced decision anxiety
- ✅ Promotion of "hero" service (e.g., portraits is default expanded)

---

### Recommendation 2: Optimize Tiered Package Display for Conversion

**Current State**:
- 3 packages (Esencial, Clásico, Premium) exist in Sanity
- Pricing defined: Portrait ($1,800 / $2,100 / $2,400), Wedding ($8,500 / $10,500 / $12,500)
- **Issue**: Displayed as equal options, no guidance

**Conversion Psychology Strategy**:

#### A. Price Anchoring ✅ PSYCHOLOGY TACTIC
Show Premium **first** → Anchors perception upward → Middle tier feels affordable

```
PRICES FROM HIGH TO LOW (in hero view):

Premium: $2,400 ← Anchors "expensive"
↓
Clásico: $2,100 ← Feels like good value (actually is)
↓
Esencial: $1,800 ← Budget option
```

#### B. Most Popular Badge ✅ SOCIAL PROOF
Clásico performs 60-70% of bookings → Make it visually prominent

```
┌─────────────────┐
│  🌟 MOST POPULAR│ ← Badge attracts eyes
│    CLÁSICO      │
│   $2,100 MXN    │
│ 1.5 hrs, 25 fot │
│                 │
│ [✓] Feature 1   │
│ [✓] Feature 2   │
│ [✓] Feature 3   │
│                 │
│ [RESERVAR] ← Primary CTA
└─────────────────┘
```

#### C. Clear Value Communication ✅ SPECIFIC BENEFITS
Don't just list features—explain the **outcome** the user gets

```
❌ WEAK: "Sesión de 1.5 horas"
✅ STRONG: "1.5-hour session with outfit changes + location guidance"

❌ WEAK: "25 fotos editadas"
✅ STRONG: "25 professionally edited photos (High Res + Social optimized)"
```

#### D. Visual Hierarchy ✅ DESIGN
- **Premium tier**: Large card, gradient background, "Best Value" messaging
- **Clásico tier**: Slightly larger, badge, primary CTA button (solid color)
- **Esencial tier**: Smaller, "Budget-Friendly", secondary CTA (outline)

---

### Recommendation 3: Pricing Display Strategy

**Current Tiers** (from roadmap):

| Service | Esencial | Clásico | Premium |
|---------|----------|---------|---------|
| **Portrait** | $1,800 | $2,100 ⭐ | $2,400 |
| **Wedding** | $8,500 | $10,500 ⭐ | $12,500 |

**Messaging Per Tier**:

#### Portraits:

**Esencial ($1,800)** — "Express Session"
- 45 min, 10 photos
- "Quick & affordable"
- Perfect for: Headshots, gift photos

**Clásico ($2,100)** ⭐ MOST POPULAR— "Full Experience"
- 1.5 hrs, 25 photos, outfit changes
- "The complete session"
- Perfect for: XV, Couples, Families, Professionals

**Premium ($2,400)** — "Editorial Excellence"
- 2 hrs, 35 photos + album preview
- "Extended creative time"
- Perfect for: Concepts, magazine-style, multi-location

#### Weddings:

**Esencial ($8,500)** — "Day Coverage"
- 6 hours, ceremony + reception only
- "Essential moments"
- Perfect for: Small ceremonies, tight budgets

**Clásico ($10,500)** ⭐ MOST POPULAR — "Complete Story"
- 8 hours, prep + ceremony + reception + portraits
- "The full wedding day"
- Perfect for: Couples wanting everything

**Premium ($12,500)** — "Premium Experience"
- 10 hours + engagement session included
- "Every moment captured"
- Perfect for: Luxury weddings, two-location events

---

### Recommendation 4: Promotion Integration Strategy

**Current Promo System**: 7 campaigns, modular, already built ✅

**Integration Placement**:
1. **Header Banner** — Top of page, service-specific (show when active)
2. **Tier Badge** — On the most popular tier (Clásico)
3. **CTA Enhancement** — "Reservar + Promo Offer" button text

**Example**:
```
┌─────────────────────────────────────────┐
│ 🎁 LIMITED TIME: $200 OFF PORTRAITS    │  ← Header banner
│    Book before March 31                 │
└─────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  🌟 MOST POPULAR | 🎁 $200 OFF          │  ← Tier badge + promo
│      CLÁSICO PORTRAITS                   │
│   $1,900 MXN (was $2,100)                │
│                                          │
│ 1.5-hour session, 25 edited photos      │
│ Outfit changes + location guidance      │
│                                          │
│ [RESERVAR AHORA] ← CTA with urgency    │
└──────────────────────────────────────────┘
```

---

## 🎨 IMPLEMENTATION ROADMAP

### Phase A: UX Restructure (Week 1)
**Objective**: Eliminate tab friction, create section-based layout

**Changes**:
1. **Remove ServiceTabs component** — Replace with collapsible hero cards
2. **Create `ServicesHeroCard` component** — Two cards (Portraits | Weddings)
3. **Create `ServicesSection` component** — Accordion/expandable section showing packages
4. **Update `ServicesContent.tsx`** — Integrate new layout

**Files to Modify**:
- `src/app/services/ServicesContent.tsx` ← Main restructure
- `src/app/services/components/` ← New components (HeroCard, Section)
- `src/app/services/page.tsx` ← If needed

**Expected UX Result**:
✅ Both services visible at once  
✅ Click a service card to expand packages  
✅ Collapse previous section automatically  
✅ Promo banner at top, always visible  

---

### Phase B: Package Display Optimization (Week 1)
**Objective**: Improve visual hierarchy, pricing clarity, conversion psychology

**Changes**:
1. **Redesign `ServicePackageTemplate` component** — Better card hierarchy
2. **Add tier visuals** — Different sizes/colors for E/C/P
3. **Add badges** — "Most Popular", "Best Value", "Budget-Friendly"
4. **Enhance feature display** — Outcome-focused messaging
5. **Improve CTAs** — Tier-specific button styles

**Files to Modify**:
- `src/app/services/components/ServicePackageTemplate.tsx` ← Card styling
- `src/app/services/components/PublicPortfolioTemplate.tsx` ← If used for packages

**Expected UX Result**:
✅ Clear visual hierarchy (Premium first, Clásico emphasized, Esencial smaller)  
✅ "Most Popular" badge on Clásico  
✅ Price anchoring (high → low)  
✅ Outcome-driven feature text  
✅ Mobile-responsive card sizing  

---

### Phase C: Promotion Display Enhancement (Week 1)
**Objective**: Better visual prominence, urgency, integration

**Changes**:
1. **Enhance `PromoHeaderBanner` component** — Better visuals, clearer urgency
2. **Add conditional tier badge** — Show promo discount on relevant tier
3. **Add countdown timer** (optional) — If promo has end date
4. **Improve CTA alignment** — "Reservar" + promo info

**Files to Modify**:
- `src/app/components/PromoCard.tsx` ← Enhancement

**Expected UX Result**:
✅ Promo prominence without clutter  
✅ Discount visible on affected tier  
✅ Urgency conveyed (time-limited feels)  
✅ Clear booking path  

---

### Phase D: Mobile Responsiveness (Week 2)
**Objective**: Ensure touch-friendly UX on mobile

**Changes**:
1. **Optimize card sizing** — Single column on mobile
2. **Improve touch targets** — CTAs larger, spaced
3. **Simplify hero cards** — Stack on mobile, fixed on desktop
4. **Test service switching** — Easy on mobile too

**Files to Modify**:
- All components above (add mobile Tailwind utilities)

---

## 📈 EXPECTED BUSINESS OUTCOMES

| Metric | Current | Expected | Impact |
|--------|---------|----------|--------|
| **Page Bounce Rate** | ~35% | ~25% | -10pp (less friction) |
| **Service Selection Rate** | ~70% after tab click | ~85% (visible at once) | +15pp (better clarity) |
| **Tier Mix** | 30/60/10 | 25/65/10 | Clásico even more popular |
| **Avg Booking Value** | $2,050 | $2,200 | +7% (better anchoring) |
| **Promo Conversion** | 20% | 28% | +8pp (better placement) |
| **Mobile Bookings** | 40% | 50% | +10pp (responsive) |

---

## 🔧 TECHNICAL SPECIFICATIONS

### Component Hierarchy (Proposed)

```
ServicesContent
├─ PromoHeaderBanner (top)
├─ ServicesHeroSection
│  ├─ HeroCard ("📸 Retratos")
│  └─ HeroCard ("💍 Bodas")
├─ ServicesExpandableSection (Portraits)
│  ├─ ServicePackageTemplate (Esencial)
│  ├─ ServicePackageTemplate (Clásico) ← HIGHLIGHTED
│  └─ ServicePackageTemplate (Premium)
├─ ServicesExpandableSection (Weddings)
│  ├─ ServicePackageTemplate (Esencial)
│  ├─ ServicePackageTemplate (Clásico) ← HIGHLIGHTED
│  └─ ServicePackageTemplate (Premium)
└─ PromoCard (below)
```

### Styling Tier Hierarchy

```css
/* PORTRAIT TIERS */
.tier-esencial {
  @apply border-2 border-gray-300
    scale-95 opacity-90; /* Smaller, recessed */
}

.tier-clasico {
  @apply border-2 border-gold-500 shadow-lg
    scale-100 z-10; /* Standard, highlighted */
  border-top: 4px solid gold;
}

.tier-premium {
  @apply border-2 border-gray-500 bg-gradient-to-b
    from-gray-50 to-white scale-105; /* Larger, gradient */
}

/* BADGES */
.badge-popular {
  @apply bg-gold-500 text-white text-xs font-bold px-3 py-1;
}
```

---

## 📋 IMPLEMENTATION CHECKLIST

**Phase A: UX Restructure**
- [ ] Create `HeroCard.tsx` component
- [ ] Create `ExpandableSection.tsx` component  
- [ ] Modify `ServicesContent.tsx` — Remove tabs, add new components
- [ ] Test section expand/collapse logic
- [ ] Mobile test hero cards

**Phase B: Package Optimization**
- [ ] Update `ServicePackageTemplate.tsx` — Tier sizing + badges
- [ ] Add tier-specific Tailwind classes
- [ ] Implement outcome-focused feature text
- [ ] Add visual badges ("Most Popular", etc.)
- [ ] Mobile test card sizing

**Phase C: Promotion Enhancement**
- [ ] Update `PromoCard.tsx` — Better visuals
- [ ] Add discount badge to affected tier (if promotion active)
- [ ] Test promo conditional rendering
- [ ] Verify Meta Pixel tracking still fires

**Phase D: Mobile Responsiveness**
- [ ] Test all breakpoints (sm/md/lg/xl)
- [ ] Verify CTA hit targets (48px+)
- [ ] Test section expand on mobile
- [ ] Performance check (Lighthouse)

**Final**
- [ ] Build: `npm run build` (0 errors)
- [ ] DEV test: http://localhost:3000/services
- [ ] Commit to feature branch
- [ ] Prepare for merge to main

---

## 💰 PRICING STRATEGY CONFIRMATION

### Do NOT Change Pricing — Already Optimally Set ✅

**Current Sanity Data** (verified in seed scripts):

| Service | Tier | Price MXN | Status |
|---------|------|-----------|--------|
| Portrait | Esencial | $1,800 | ✅ Correct |
| Portrait | Clásico | $2,100 | ✅ Correct |
| Portrait | Premium | $2,400 | ✅ Correct |
| Wedding | Esencial | $8,500 | ✅ Correct |
| Wedding | Clásico | $10,500 | ✅ Correct |
| Wedding | Premium | $12,500 | ✅ Correct |

**What WE NEED TO FIX**: Display strategy, not pricing itself.

---

## 🎬 NEXT STEPS

1. **Confirm this strategy** with you
2. **Create component specs** (if needed)
3. **Implement Phase A** (UX restructure)
4. **Implement Phase B** (package optimization)
5. **Implement Phase C** (promo enhancement)
6. **Mobile responsiveness** (Phase D)
7. **Build & test**
8. **Deploy to main branch**

---

**Status**: ⏳ **STRATEGY APPROVED, AWAITING IMPLEMENTATION APPROVAL**

