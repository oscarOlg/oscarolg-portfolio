# Oscar OLG Photography: Code Implementation Guide
**Date**: March 25, 2026  
**Status**: Ready for Coding  
**WhatsApp Number**: +526562932374 (extracted from codebase)  
**Timeline**: 6 weeks (Week 1-6)

---

## COMBINED HERO COPY (Options 2 + 3)

### Final Hero Message (APPROVED)

**Option**: Combination of "Transformation" + "Professional for Real People"

#### Hero Main Heading:
```
ES: "No eres modelo. Aquí no necesitas serlo."
EN: "You're not a model. Here, you don't need to be."
```

**Why this works**:
- Direct: Immediately addresses the main fear (I need to be a model)
- Positive: Reframes as an advantage, not a problem
- Confident: Clear positioning
- Memorable: Short, punchy, conversational

#### Hero Italic Subtitle (keep existing):
```
ES: "la esencia de tu historia"
EN: "the essence of your story"
```

#### Investment Section Heading (use current approved copy):
**Keep**: "La tranquilidad de estar en buenas manos."

This already emphasizes comfort + support (aligns with your feedback on this section).

---

## PORTFOLIO REORGANIZATION STRUCTURE

### Current State
```
portfolio-images/
├─ about/
├─ commercial/
├─ couples/
├─ editorial/
├─ maternity/
├─ portraits/
└─ weddings/
```

### NEW TARGET STRUCTURE

```
portfolio-images/
│
├── portraits/
│   ├── individual/
│   │   ├── [15-20 best individual portrait photos]
│   │   └── (solo person showing comfort + confidence)
│   │
│   ├── couples/
│   │   ├── [10-15 couple/engagement photos]
│   │   └── (couples showing comfort, natural moments)
│   │
│   ├── groups/
│   │   ├── [5-10 family/group photos]
│   │   └── (families, friends, multiple people comfortable together)
│   │
│   ├── maternity/
│   │   ├── [5-8 maternity photos]
│   │   └── (expecting mothers showing comfort + glow)
│   │
│   ├── graduation/
│   │   ├── [8-12 graduation/XV photos]
│   │   └── (young people in special moments, confident poses)
│   │
│   └── concepts/
│       ├── [5-10 editorial/concept shoot photos]
│       └── (creative, styled, artistic portraits)
│
├── weddings/
│   ├── pre-wedding/
│   │   ├── [5-8 save-the-date/engagement session photos]
│   │   └── (couples in relaxed, comfortable settings)
│   │
│   ├── ceremony/
│   │   ├── [10-15 ceremony moment photos]
│   │   └── (vows, rings, emotional moments)
│   │
│   ├── reception/
│   │   ├── [15-20 reception/celebration photos]
│   │   └── (dancing, details, candid moments)
│   │
│   └── full-day/
│       ├── [20-25 complete day story photos]
│       └── (complete narrative from prep to celebration)
│
└── testimonials/
    ├── [3-5 behind-the-scenes comfort building]
    └── (Oscar with clients, showing the process)
```

### ACTION ITEMS FOR YOU

**Before we upload to Sanity**, you need to:

1. **Move existing files** to new folders:
   ```
   - Move current /portraits/* → /portraits/individual/
   - Move current /couples/* → /portraits/couples/
   - Move current /maternity/* → /portraits/maternity/
   - Move ~8-12 wedding ceremony moments → /weddings/ceremony/
   - etc.
   ```

2. **Identify & move best photos**:
   - Best 15-20 individual portraits showing comfort → /portraits/individual/
   - Best 10-15 couple/engagement photos → /portraits/couples/
   - Best 5-10 family/group photos → /portraits/groups/
   - Best 8-12 graduation/XV photos → /portraits/graduation/
   - Best 15-20 wedding reception photos → /weddings/reception/

3. **Hide old categories**:
   - DO NOT move /commercial/ or /editorial/ (they stay, but won't be uploaded to Sanity)

4. **Name files clearly** (so scripts know category):
   ```
   Example:
   portraits-individual-001.jpg
   portraits-couples-001.jpg
   portraits-maternity-001.jpg
   weddings-ceremony-001.jpg
   ```

### Scripts to Run After Reorganization

```bash
# After files are organized:
npm run sync-portfolio-category      # Sync category metadata
npm run upload-portfolio              # Upload new images to Sanity

# If you need to clean up duplicates:
npm run cleanup-duplicates
```

---

## LEAD MAGNET STRATEGY

### Lead Magnet Format: BOTH PDF + Landing Pages ✅

#### Lead Magnet #1: "Guía de Sesión de Retratos" (Portraits Guide)

**Format**: PDF Download + Email Capture

**What you provide**: 
- Design a PDF in Canva (Simple template, your photos + tips)
- Title: "Guía Completa: 10 Tips para Estar Cómodo/a en Fotos de Retratos"
- Content suggestions:
  1. "Posturas que te hacen sentir seguro/a"
  2. "Qué ponerte (telas, colores, estilos)"
  3. "Cómo prepararte mentalmente"
  4. "Preguntas frecuentes: ¿Y si no me gusta cómo me veo?"
  5. Testimonials from past clients
  6. Your posing philosophy (2-3 paragraphs)
  7. CTA: "Ready to book? Message us on WhatsApp"

**Size**: 5-8 pages (simple, visual-heavy)

**Where it goes**:
- Homepage bottom (CTA button: "Descargar Guía Gratis")
- Services / Portraits page (embedded)
- Confirmation page after download

**What I build**: 
- Landing page `/lead-magnets/guia-retratos` with email capture form
- Email template for delivery
- Thank you page with next CTA (WhatsApp link)

---

#### Lead Magnet #2: "Guía de Bodas - Prepara tu Sesión de Fotos" (Weddings Guide)

**Format**: PDF Download + Email Capture

**What you provide**: 
- Design a PDF in Canva
- Title: "Guía Completa: Cómo Prepararte para Fotos de Boda"
- Content suggestions:
  1. "Timeline: Cuándo reservar sesión previa"
  2. "Día de la boda: Qué esperar"
  3. "Nuestro 4-paso proceso"
  4. "Preparación mental para estar cómodo/a"
  5. FAQ: "¿Nos sentiremos incómodos en fotos?"
  6. Couple testimonials
  7. Pricing overview
  8. CTA: "Agenda tu consulta gratis en WhatsApp"

**Size**: 6-10 pages

**Where it goes**:
- Homepage (secondary CTA)
- Services / Bodas page
- Wedding inquiry thank-you page

**What I build**: 
- Landing page `/lead-magnets/guia-bodas`
- Email sequences (3 emails, Day 1, Day 3, Day 7)

---

#### Lead Magnet #3: "Sesiones Especiales: Graduaciones, XV, Maternity" 

**Format**: Landing Page + Email (no PDF for this one - simpler)

**What I build**: 
- Landing page `/sesiones-especiales/graduacion` (for NOW - graduation season)
- Email template: "Graduation session ideas + booking CTA"
- Preset WhatsApp buttons for quick inquiry

**What you provide**:
- 3-5 best graduation/XV photos
- Client review/testimonial if available
- Availability dates for April-May

---

### Email Sequences (I'll build these)

#### Sequence #1: After "Guía de Retratos" Download

**Email 1** (Immediate):
- Subject: "Tu Guía de Retratos listo para descargar ✓"
- Body: Welcome + guide link + "¿Listos para tu sesión?"
- CTA: Link to Services page

**Email 2** (Day 3):
- Subject: "Historias reales: Clientes que estaban nerviosos"
- Body: 2-3 testimonials showing transformation
- CTA: "Agendar ahora" → WhatsApp

**Email 3** (Day 7):
- Subject: "¿Aún pensando? Te damos 5% descuento esta semana"
- Body: Time-limited offer (5% off next booking)
- CTA: "Cotizar ahora" → WhatsApp

---

#### Sequence #2: After "Guía de Bodas" Download

**Email 1** (Immediate):
- Subject: "Tu Guía de Bodas está lista ✓"
- Body: Welcome + guide link + "Hablemos de tu boda"
- CTA: Link to Weddings page

**Email 2** (Day 2):
- Subject: "Cómo hacemos que parejas se sientan cómodas en fotos"
- Body: Case study / couple testimonial
- CTA: "Consulta gratis" → Calendar booking link

**Email 3** (Day 5):
- Subject: "¿Listo/a para reservar? Aquí están nuestros disponibles"
- Body: Brief availability + pricing summary
- CTA: "Reservar ahora" → WhatsApp

---

## IMPLEMENTATION PRIORITY

### Week 1-2: CRITICAL (Funnel Fix)

**Files to create/edit**:
1. `src/app/components/HeroContent.tsx` — Update hero copy
2. `src/app/contact/page.tsx` — Redesign for WhatsApp-first
3. `src/app/contact/components/ContactPageClient.tsx` — Remove email form
4. `src/config/contact.ts` (NEW) — WhatsApp config

**Goal**: Get WhatsApp inquiries flowing

#### Specific Code Changes:

**1. Update Hero Copy** (`src/app/components/HeroContent.tsx`)

New props:
```typescript
heading = "No eres modelo"
headingEn = "You're not a model"
headingItalic = "aquí no necesitas serlo"
headingItalicEn = "here, you don't need to be"
```

**2. Create WhatsApp Config** (`src/config/contact.ts`)

```typescript
export const CONTACT_CONFIG = {
  whatsappNumber: '+526562932374',
  responseTime: '2 horas',
  services: {
    portraits: {
      message: 'Hola Oscar, me interesa agendar una sesión de retratos. ¿Cuál sería el próximo disponible?',
      icon: '📸',
    },
    weddings: {
      message: 'Hola Oscar, estoy planeando mi boda y me gustaría conocer más sobre tus paquetes y disponibilidad.',
      icon: '💍',
    },
    graduation: {
      message: 'Hola Oscar, busco fotos de graduación/XV años. ¿Qué opciones tienes?',
      icon: '🎓',
    },
  },
};
```

**3. Rebuild Contact Page** (`src/app/contact/components/ContactPageClient.tsx`)

Remove:
- Email form completely
- Form validation logic

Add:
- WhatsApp service buttons (Portraits, Weddings, Graduation)
- Availability checker component
- Response time promise
- Social proof (testimonials)
- Hours of operation

New layout:
```
┌─ Contactano ────────────────────┐
│                                 │
│  📱 WhatsApp (Recomendado)       │
│  ┌─ 📸 Sesión de Retratos ────┐ │
│  │ "Hola Oscar, me interesa..." │ │
│  └────────────────────────────┘ │
│                                 │
│  ┌─ 💍 Consulta sobre Bodas ──┐ │
│  │ "Hola Oscar, estoy plani..." │ │
│  └────────────────────────────┘ │
│                                 │
│  ┌─ 🎓 Sesión de Graduación ──┐ │
│  │ "Hola Oscar, busco fotos d..."│ │
│  └────────────────────────────┘ │
│                                 │
│  ⏰ Respondo en máximo 2 horas   │
│                                 │
│  ─────────────────────────────  │
│  Otros medios de contacto:       │
│  📧 Email: [email]               │
│  📞 Teléfono: [phone]            │
│  🕐 Horas: L-V 9am-7pm          │
│                                 │
└─────────────────────────────────┘
```

---

### Week 2-3: Service Simplification

**Files to edit**:
1. `src/config/services.ts` — Add visibility flags
2. `src/app/services/page.tsx` — Filter visible services
3. `src/app/services/components/SessionTypeSelector.tsx` (NEW)
4. `scripts/seed-service-packages.mjs` — Update pricing

---

### Week 3-4: Lead Magnets (You design PDFs)

**What I build**:
1. `/lead-magnets/guia-retratos` page (email capture form)
2. `/lead-magnets/guia-bodas` page (email capture form)
3. `/sesiones-especiales/graduacion` page (seasonal promo)
4. Email templates + sequences
5. Integration with email service (MailerLite or similar)

**What you provide**:
1. PDF "Guía de Retratos" (designed in Canva)
2. PDF "Guía de Bodas" (designed in Canva)

---

### Week 4-5: Content + Portfolio

**Files to create/edit**:
1. `src/app/services/components/FaqNonModels.tsx` (NEW) — Q&A section
2. Portfolio page updates (add testimonials/captions)
3. `src/app/components/InvestmentSection.tsx` — Add testimonials

**What you provide**:
1. Testimonials from 2-3 clients (portrait + wedding)
2. Reorganized portfolio images

---

### Week 5-6: Analytics + Seasonal

**Files to edit**:
1. `src/app/layout.tsx` — Add Meta Pixel
2. Create seasonal landing pages

---

## META PIXEL TRACKING CHECKLIST

- [ ] Get Meta Pixel ID from Facebook Business Manager
- [ ] Replace `YOUR_PIXEL_ID_HERE` in code with actual ID
- [ ] Test pixel is firing (Facebook Events Manager)
- [ ] Create custom events:
  - [ ] PageView (automatic)
  - [ ] ViewContent (portfolio page)
  - [ ] Contact (WhatsApp click)
  - [ ] Lead (lead magnet download)
- [ ] Set up conversion tracking (booking/revenue)

---

## TESTIMONIALS NEEDED

Can you collect these? (Simple format):

### Portrait Testimonial
```
Name: [Client Name]
Service: [Individual/Couple/XV/Maternity]
Quote: [2-3 sentences about comfort + confidence]
Example: "Nunca pensé que me vería así en fotos. Oscar me hizo sentir segura desde el primer momento."
```

### Wedding Testimonial
```
Name: [Couple Names]
Service: Full day or Engagement
Quote: [2-3 sentences about feeling natural/comfortable]
Example: "No queríamos fotos 'posadas'. Oscar entendió exactamente qué queríamos: momentos reales."
```

Get 2-3 of each if possible (will use in homepage, services page, emails).

---

## IMPLEMENTATION SEQUENCE (Week-by-Week)

### Week 1
- [ ] **Mon-Tue**: Code hero copy + WhatsApp config
- [ ] **Wed**: Rebuild contact page (WhatsApp primary)
- [ ] **Thu**: Test WhatsApp links (all 3 service types)
- [ ] **Fri**: Deploy Phase 1 + monitor first inquiries

### Week 2
- [ ] **Mon-Tue**: Hide Commercial/Editorial in config
- [ ] **Wed**: Build SessionTypeSelector component
- [ ] **Thu-Fri**: Test service page filtering

### Week 3-4
- [ ] **Week 3**: You design 2 PDFs (Retratos + Bodas guides)
- [ ] **I build**: Landing pages + email capture forms
- [ ] **Fri**: Setup email service + sequences

### Week 4-5
- [ ] **Mon**: You reorganize portfolio images
- [ ] **Tue**: I build Q&A component
- [ ] **Wed**: You collect testimonials
- [ ] **Thu-Fri**: Add testimonials + captions to galleries

### Week 5-6
- [ ] **Mon**: Meta Pixel setup
- [ ] **Tue-Wed**: Create seasonal landing page (Graduation)
- [ ] **Thu**: Setup metrics dashboard
- [ ] **Fri**: Final QA + launch prep

---

## NEXT IMMEDIATE STEPS

### Before I Start Coding:

1. **Confirm Portfolio Structure**: 
   - Will you start reorganizing files now, or should I create a detailed folder-by-folder guide?

2. **WhatsApp Number**: ✅ FOUND: +526562932374

3. **PDF Guides**:
   - Can you start designing "Guía de Retratos" in Canva?
   - I'll share content suggestions separately

4. **Testimonials**:
   - When can you collect 2-3 (portrait + wedding)?
   - Any deadline?

5. **Email Service**:
   - Do you have a preference? (MailerLite, ConvertKit, or just send manually for now?)

---

## FILES I'LL CREATE THIS WEEK

Once you confirm above:

1. ✅ `src/config/contact.ts` — WhatsApp configuration
2. ✅ `src/app/components/HeroContent.tsx` (updated) — New hero copy
3. ✅ `src/app/contact/components/ContactPageClient.tsx` (updated) — WhatsApp-first redesign
4. ✅ Start of Week 2 components

---

**Ready to proceed with code generation?** Just confirm:
- [ ] Portfolio structure understood?
- [ ] Can you start PDF design?
- [ ] When can you provide testimonials?
- [ ] Email service preference?
