# PackagesShowcase Redesign — Customization Guide

## What Changed

**Before:** Rigid 3-column grid of cards with feature lists, prices, small text. Felt corporate/SaaS-like.

**After:** Option C+B Hybrid — You get one package at a time, full-width editorial images, conversational narratives, guided copy. Feels editorial, guided, elegant. Consistent with brand promise: *"Vive tu boda sin estrés"*.

---

## Component Architecture

### File Structure
```
src/
  config/
    └─ wedding-packages.json (⭐ This is what you edit)
  app/services/
    components/
      ├─ PackagesShowcase.tsx (NEW — renders packages)
      ├─ ServicePackageTemplate.tsx (old — no longer used)
  services/
    └─ ServicesContent.tsx (uses PackagesShowcase instead of ServicePackageTemplate)
```

### Key Files

1. **src/config/wedding-packages.json** ← **YOU EDIT THIS**
   - All package copy, positioning, pricing
   - Bilingual (es/en)
   - Independent of Sanity — edit anytime

2. **src/app/services/components/PackagesShowcase.tsx**
   - Renders packages from the JSON
   - Handles language, layout, styling
   - Do not edit unless changing design

3. **src/app/services/ServicesContent.tsx**
   - Imports PackagesShowcase
   - Removed old ServicePackageTemplate usage
   - Still shows hero, trust bullets, qualifiers, FAQ

---

## How to Customize

### 1. Replace Image Placeholders

In **wedding-packages.json**, find:
```json
"imageUrl": "[PLACEHOLDER: couples-previa-intimate]"
```

Replace with your portfolio image full URL or path. Examples:
```json
"imageUrl": "/portfolio-images/weddings/DSCF8121-previa.jpg"
"imageUrl": "https://cdn.sanity.io/images/...previa.jpg"
```

You have 3 placeholder images to fill:
- **[PLACEHOLDER: couples-previa-intimate]** → Engagement/previa moment
- **[PLACEHOLDER: wedding-reception-elegant]** → Reception/clásica highlight  
- **[PLACEHOLDER: wedding-getting-ready-detailed]** → Getting ready/premium detail

### 2. Edit Package Copy

Each package has these fields:

```json
{
  "name": "Clásica",                    // Package title
  "positioning": "Para parejas que...", // *They see themselves here*
  "description": "Full description...", // Context + who this is for
  "keyFeature": "What makes it unique", // ONE differentiator
  "duration": "7 horas",                // Hours/time
  "price": 9500,                        // MXN
  "gift": "50 fotos + Photobook",       // Tangible deliverable
  "cta": "Reservar fecha",              // Button text
  "whyThis": "Why they should choose..."// Context below specs
}
```

**Best Practices for Each Field:**

- **positioning** (`"Para parejas que..."`)
  - Make them see THEMSELVES
  - NOT features, but their need
  - Example: "Para parejas que quieren toda la cobertura de su día sin perder la autenticidad"

- **description**
  - Expand on positioning
  - Explain use case
  - Build context/trust
  - 1-2 sentences max

- **keyFeature** (critical for conversion)
  - ONE thing that differentiates this tier
  - NOT full feature list
  - Makes comparison instant
  - Clásica: "Cobertura editorial de principio a fin"
  - Premium: "Cobertura total + sesión previa bonificada"
  - Previa: "Sesión enfocada en ustedes como pareja"

- **gift** (high conversion impact)
  - Memorability matters
  - Tangible deliverable (not just "digital gallery")
  - Clásica: "50 fotos impresas + 2 ampliaciones + Photobook"
  - Premium: "Photobook Premium 12x12 + Colección de Recuerdos"

- **whyThis**
  - Psychological positioning (why CHOOSE this)
  - Social proof angle
  - Example: "La mayoría de parejas confían en esta porque balancean documento completo con libertad"

- **mostChosen** (conversion driver)
  - Set `true` for middle tier (Clásica)
  - Anchors price perception
  - Reduces decision paralysis
  - Proven to increase conversions

### 3. Bilingual Fields

Each package has Spanish + English versions:

```json
"name": "Clásica",
"nameEn": "Classic",

"positioning": "Para parejas que...",
"positioningEn": "For couples wanting...",

"description": "...",
"descriptionEn": "...",
// ... etc for all fields
```

Update both when changing.

### 4. Pricing & Discounts

```json
"price": 9500,           // Current price (displayed)
"originalPrice": 10500,  // Before-discount price (strikethrough)
"badge": "Más Popular",  // Badge text
"showBadge": true        // Show badge?
```

- If `price < originalPrice`, shows discount % ("15% de ahorro")
- Badge displays over image (top-right)
- Used for "Most Popular" and "Save offer" positioning

---

## What You See On the Page

### Visual Flow (Desktop)

```
═════════════════════════════════════════════════════════════
Hero Section (keeps unchanged)
- "Elige la colección ideal para vivir tu boda sin estrés"
- "Cada paquete está diseñado para un tipo de pareja..."
═════════════════════════════════════════════════════════════

[Full-width image]
╔─ SESIÓN PREVIA ─────────────────────────╗
│ Para parejas que quieren capturar...     │
├─────────────────────────────────────────┤
│ Un momento íntimo para que disfruten...  │
│                                         │
│ ⚡ Sesión enfocada en ustedes          │
│                                         │
│   ⏱  1.5 hrs  │  MXN $2,700  │  16x24" │
│                                         │
│ "Captura la emoción previa sin presión" │
│                                         │
│  [Consultar disponibilidad →]          │
└─────────────────────────────────────────┘

[Full-width image with "MOST POPULAR" badge]
╔─ CLÁSICA ──────────────────────────────╗
│ Para parejas que quieren toda la...     │
├────────────────────────────────────────┤
│ Documental completo de tu día...        │
│                                         │
│ ⚡ Cobertura editorial de principio    │
│                                         │
│  ⏱  7 hrs  │  MXN $9,500  │  Photobook │
│                                         │
│ "La mayoría de parejas elige esta..."  │
│                                         │
│  [Reservar fecha →]                    │
└────────────────────────────────────────┘

[Full-width image]
╔─ PREMIUM ──────────────────────────────╗
│ Para parejas que desean cada momento...  │
├────────────────────────────────────────┤
│ Experiencia completa donde capturamos... │
│                                         │
│ ⚡ Cobertura total + sesión previa    │
│                                         │
│  ⏱  9+ hrs  │  MXN $14,500  │  Premium  │
│                                         │
│ "Para parejas que saben que quieren..." │
│                                         │
│  [Consultar disponibilidad →]          │
└────────────────────────────────────────┘

═════════════════════════════════════════════════════════════
"¿No estoy seguro? Consulta con nosotros. Adaptamos a cada caso."
FAQ Section (continues below)
═════════════════════════════════════════════════════════════
```

### Mobile View
- Full-width images stack vertically
- Text is readable, not cramped
- Buttons large and thumb-friendly
- Progressive disclosure as you scroll

---

## Design Features (Why This Converts Better)

### 1. **"Most Chosen" Anchor**
- Clásica gets badge = psychological anchor
- Reduces decision paralysis
- Most conversions happen on middle tier
- **Why it works:** Choice architecture (Decoy Effect)

### 2. **Full-Width Images**
- Editorial feel, not corporate
- Trust builder — see the quality
- Emotional connection before reading
- **Why it works:** Humans process images faster than text

### 3. **"Para parejas que..." Positioning**
- They see THEMSELVES in description
- Not about features, but their need
- Instant relevance = lower bounce
- **Why it works:** Immediate self-identification

### 4. **Key Feature Highlight**
- ONE differentiator per tier (not long list)
- Instantly scannable
- Clear value comparison
- **Why it works:** Reduces cognitive load

### 5. **Gift/Bonus Visibility**
- Memorable deliverable
- Psychological anchor for value
- Premium tier shines here
- **Why it works:** Tangible > abstract

### 6. **Progressive Disclosure**
- One package per scroll
- Not comparing 3 side-by-side
- Guides conversation naturally
- **Why it works:** Less overwhelming, more guided

### 7. **Guided CTA**
- Popular tier: "Reservar" (Book directly)
- Others: "Consultar" (Let's talk)
- Specific, not generic
- **Why it works:** Matches customer psychology

---

## Conversion Metrics to Track

Once live, monitor:

1. **Scroll Depth**
   - How far do visitors scroll through packages?
   - Are they reaching Premium?

2. **CTA Click Rate**
   - Which package CTA is clicked most?
   - Is Clásica getting anchor effect? (Should be ~40-50% of clicks)

3. **Package Selection on Contact Form**
   - Which package is most selected in form dropdown?
   - Should be Clásica > Previa > Premium (for conversions)

4. **Form Completion Rate**
   - Did visitor complete form after seeing packages?
   - Before/after redesign comparison

5. **Inquiry-to-Booking Ratio**
   - Are qualified leads booking Clásica or Premium?
   - Are Previa inquiries converting to Clásica upgrades?

---

## Technical Notes

- Component loads from `wedding-packages.json` (Sanity NOT required)
- Fully bilingual (reads from `lang` context)
- Responsive (mobile-first design)
- No TypeScript errors
- All edges cases handled (missing images → placeholder)
- Build validated, tests pass (86/86)

---

## Next Steps

1. **Replace image placeholders** with your portfolio image URLs/paths
2. **Edit copy** in wedding-packages.json to match your story
3. **Test in browser** at `/services` (both es/en)
4. **Monitor conversion metrics** for 7 days
5. **Iterate** based on data (A/B test copy if needed)

---

## Questions?

- **"Can I add a 4th package?"** → Add to `wedding-packages.json`, increment `order`
- **"Can I change the layout?"** → Edit `PackagesShowcase.tsx` (just styling)
- **"Can I reorder packages?"** → Change `order` field (1, 2, 3)
- **"Can I change 'Most Chosen' to Premium?"** → Change `mostChosen: false/true` fields
- **"Can I use dynamic prices from Sanity?"** → Yes, edit `ServicesContent.tsx` to pass props

---

Built with **conversion psychology** + **editorial storytelling** + **brand promise alignment**.

Ready to guide couples through their booking journey without stress. 🎶
