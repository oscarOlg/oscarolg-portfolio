# Oscar OLG Photography: Full Implementation Roadmap
**Date**: March 25, 2026  
**Phase**: Complete Restructuring (6 weeks)  
**Decision Status**: ✅ APPROVED by Oscar  
**Ready for**: Code Implementation + Content Creation

---

## Phase Overview

| Phase | Timeline | Focus | Deliverables |
|-------|----------|-------|--------------|
| **Phase 1: Foundation** | Weeks 1-2 | Contact funnel + hero messaging | WhatsApp primary, new hero copy |
| **Phase 2: Positioning** | Weeks 2-3 | Service simplification + structure redesign | Hide Commercial/Editorial, new package structure |
| **Phase 3: Lead Magnets** | Weeks 3-4 | Conversion optimization tools | Downloadable guides + email sequences |
| **Phase 4: Content** | Weeks 4-5 | Portfolio org + testimonials + Q&A | Galleries reorganized, client stories added |
| **Phase 5: Tracking** | Weeks 5-6 | Analytics setup + seasonal planning | Meta Pixel, conversion tracking, promo calendar |

---

## PHASE 1: Foundation (Weeks 1-2)

### A. Fix Contact Funnel — WhatsApp Primary ✅

**File**: `src/app/contact/page.tsx` + `src/app/contact/components/ContactPageClient.tsx`

**Changes**:
1. **Remove email form** or hide completely
2. **Make WhatsApp button primary CTA** (moved to top of page, bigger)
3. **Add WhatsApp preset buttons** for quick service selection:
   - "Cotizar Sesión de Retratos" → Opens WhatsApp with preset message
   - "Consultar sobre Bodas" → Opens WhatsApp with preset message
4. **Add follow-up messaging**: "Te responderé en WhatsApp en máximo 2 horas"

**Preset messages to use**:

```
Retratos/Portraits Default:
"Hola Oscar, me interesa agendar una sesión de retratos. ¿Cuál sería el próximo disponible?"

Weddings Default:
"Hola Oscar, estoy planeando mi boda y me gustaría conocer más sobre tus paquetes y disponibilidad."

Graduation/XV Specific:
"Hola Oscar, busco fotos de graduación/XV años. ¿Qué opciones tienes?"
```

**Expected outcome**: First inquiry flows through WhatsApp (trackable, immediate response possible)

---

### B. Enhanced Hero Messaging — Three Options ✅

**Current (too generic)**: "Fotografía que captura la esencia de tu historia"

**Option 1 (Emotional/Direct - RECOMMENDED)**:
```
ES: "Tu historia, capturada sin nervios."
EN: "Your story. Captured without the nerves."
```
- **Why**: Direct, addresses the pain point (nervousness), short + memorable

**Option 2 (Benefit-Driven)**:
```
ES: "Fotos donde te ves como te sientes. (Cómodo, seguro, tú.)"
EN: "Photos where you look the way you feel. (Comfortable. Confident. You.)"
```
- **Why**: Emphasizes emotional authenticity + comfort in one line

**Option 3 (Posing-Focused)**:
```
ES: "Retratos profesionales. Cero posado incómodo."
EN: "Professional portraits. Zero awkward posing."
```
- **Why**: Directly challenges the main client fear

**RECOMMENDATION**: Use **Option 1** for mass appeal, but test all three with WhatsApp inquiries.

**Italic subheading** (current stays):
```
ES: "la esencia de tu historia"
EN: "the essence of your story"
```

**File to edit**: `src/app/components/HeroContent.tsx` (update default props)

---

### C. Add WhatsApp Phone Number to Config

**File**: `src/config/services.ts` or new `src/config/contact.ts`

**Add**:
```typescript
export const CONTACT_CONFIG = {
  whatsappNumber: '+52YOUR_ACTUAL_WHATSAPP', // Format: +52 area code + number
  whatsappMessage: {
    portraits: "Hola Oscar, me interesa agendar una sesión de retratos...",
    weddings: "Hola Oscar, estoy planeando mi boda...",
  },
  responseTime: '2 horas',
  timezone: 'America/Mexico_City',
};
```

**Note**: You'll provide the actual WhatsApp number

---

## PHASE 2: Service Simplification & Pricing Restructure (Weeks 2-3)

### A. Update Service Config — Hide Commercial/Editorial

**File**: `src/config/services.ts`

**Change**:
```typescript
export const SERVICES: ServiceTypeConfig[] = [
  {
    key: 'portraits',
    name: 'Retratos',
    nameEn: 'Portraits',
    component: 'PortraitPackages',
    portfolio_category: 'portraits',
    order: 1,
    visible: true,  // Add this
  },
  {
    key: 'weddings',
    name: 'Bodas',
    nameEn: 'Weddings',
    component: 'WeddingPackages',
    portfolio_category: 'weddings',
    order: 2,
    visible: true,  // Add this
  },
  // HIDDEN: Commercial, Editorial, Couples (nested under Portraits)
  {
    key: 'commercial',
    visible: false,  // Hide from main navigation
    // ...rest...
  },
  {
    key: 'editorial',
    visible: false,  // Hide from main navigation
    // ...rest...
  },
];

// New helper to filter visible services
export function getVisibleServices(): ServiceTypeConfig[] {
  return SERVICES.filter(s => s.visible !== false);
}
```

---

### B. Redesigned Portrait Service Structure

**Strategic Think**: Instead of showing 3 packages with prices, **guide clients through a journey**.

**New Structure** (Sanity schema + seed data):

```
RETRATOS (Portraits)
├─ What Type of Session Do You Want?
│  ├─ Individual Portrait (1 person)
│  ├─ Pareja / Couple & Groups (2+ people)
│  ├─ Especiales (XV, Graduation, Maternity, Birthday, Concept)
│
├─ Package Tiers (for each type)
│  ├─ Esencial ($1,800) - 1 hour, 15 photos
│  ├─ Clásico ($2,100) - 1.5 hours, 25 photos ← Most popular
│  └─ Premium ($2,400) - 2 hours, 35 photos + album preview
│
├─ Add-ons (Simple)
│  ├─ Extra hour of session ($1,000)
│  ├─ Extra edited photo ($150)
│  └─ Printed collection: "Herencia Familiar" ($2,500)
```

**Why This Works**:
- Clients self-select (reduces confusion)
- Pricing feels guidance-based, not arbitrary
- Add-ons are optional, not pushy

---

### C. Redesigned Wedding Service Structure

**New Structure**:
```
BODAS (Weddings)
├─ What's Your Timeline?
│  ├─ Sesión Previa (Save-the-Date) - $2,700
│  ├─ Día de la Boda (Day-of Coverage)
│  ├─ Paquete Completo (Pre-wedding + Day-of)
│
├─ Day-of Package Tiers
│  ├─ Esencial (6 hours) - $8,500
│  ├─ Clásico (8 hours) - $10,500 ← Most popular, includes prep + ceremony + reception
│  └─ Premium (10 hours) - $12,500 (includes pre-wedding session)
│
├─ Add-ons (Simple, high-value)
│  ├─ Extra coverage hour ($1,500/hr)
│  ├─ Printed album "Recuerdos de la Boda" ($3,500)
│  └─ Second photographer (collaboration) - Quote on request
```

**Pricing Notes**:
- Raised from $8K-12K to $8.5K-12.5K (modest increase reflecting value)
- Save-the-date adjusted to $2,700 (from $2,700, stays same but now positioned as separate offering)
- Extra hours at $1,500/hr (increases value perception vs. per-shoot fees)

---

### D. New Component: Portrait Session Type Selector

**File**: Create `src/app/services/components/SessionTypeSelector.tsx`

This is a **visual selector** clients choose BEFORE seeing packages. Example:

```
┌─────────────────────────────────────────┐
│      ¿Qué tipo de sesión buscas?        │
├─────────────────────────────────────────┤
│ ☐ Individual (Yo solo/a)                │
│ ☐ Pareja (Nosotros dos)                 │
│ ☐ Grupo/Familia                         │
│ ☐ Especial (XV, Graduación, Boda, etc)│
│ ☐ Maternidad                            │
└─────────────────────────────────────────┘
```

When selected → Filters portfolio + shows relevant pricing only

---

## PHASE 3: Lead Magnets & Conversion Optimization (Weeks 3-4)

### A. Lead Magnet #1: "Guía de Sesión de Retratos"

**Purpose**: Capture emails from portrait prospects before contact form

**Content** (downloadable PDF):
- "10 Posing Tips for People Who Feel Awkward on Camera"
- "What to Wear for Your Portrait Session"
- "How to Prepare (Mentally) for Your Shoot"
- Oscar's philosophy on comfort + posing guidance

**CTA**: "Descarga tu guía gratis" → Email capture → Auto-email sequence

**Where to place**: 
- Homepage (bottom section)
- Services page (Retratos section)
- Portfolio gallery (after browsing)

**Email sequence** (3 emails):
1. **Email 1 (immediate)**: Confirm download + welcome message + link to portrait page
2. **Email 2 (Day 3)**: "Real portrait stories: Clients who were nervous" (with 2-3 testimonials)
3. **Email 3 (Day 7)**: "Ready to book?" + WhatsApp link + special 5% discount if book within 7 days

---

### B. Lead Magnet #2: "Guía de Bodas - Prepare tu Sesión de Fotos"

**Purpose**: Capture engaged couples early in planning

**Content** (downloadable PDF):
- "Timeline: When to book your pre-wedding session"
- "What to wear for engagement photos"
- "How we work: Our 4-step wedding day process"
- FAQ: "Will I feel comfortable during the shoot?"

**CTA**: "Descargar guía" → Email capture → Auto-email sequence

**Email sequence** (3 emails):
1. **Email 1 (immediate)**: Confirm download + wedding packages overview
2. **Email 2 (Day 2)**: "Real couple story: How we make couples comfortable" (testimonial)
3. **Email 3 (Day 5)**: "Let's talk about your wedding" + WhatsApp link + availability calendar

---

### C. Lead Magnet #3: "Seasonal Session Ideas" (Graduated/XV/Birthday)

**Purpose**: Drive off-season portrait bookings (graduation season NOW)

**Content** (email + landing page):
- "Graduation Season 2026: 5 Location Ideas in Juárez"
- "XV Años Photoshoot Ideas (without the cheesy factor!)"
- Birthday milestone portraits (15, 18, 21, etc.)
- Concept shoots for adventurous clients

**Landing page**: Special page `/sesiones-especiales` with Graduation focus

**CTA**: "Book Your Graduation Session" → WhatsApp preset for graduation

---

## PHASE 4: Content & Q&A Section (Weeks 4-5)

### A. Build Q&A Section on Services Page

**Component**: Create `src/app/services/components/FaqNonModels.tsx`

**Purpose**: Answer the implicit fear ("I'm not model material")

**Questions to Answer**:

```markdown
## Preguntas Frecuentes: Retratos para Gente Nerviosa

Q1: ¿Qué pasa si se me ve el doble mentón en fotos?
A: Es exactamente para esto que trabajamos juntos antes. Identificamos ángulos y posturas que te hacen sentir seguro/a y verte increíble. Mira la galería abajo—muchos de estos clientes tenían la misma preocupación.

Q2: ¿Necesito ser "modelo" para lucir bien en fotos?
A: No. Al contrario. Mi expertise es posando gente común para que luzca profesional, segura y auténtica. Si has sentido incómodo/a en sesiones antes, aquí es diferente.

Q3: ¿Qué pasa si odio cómo me veo generalmente?
A: Muchos clientes dicen lo mismo antes de la sesión. Después descubren ángulos, expresiones y "looks" que nunca habían visto. Eso es porque trabajamos en la confianza primero, fotos segundo.

Q4: ¿Cuánto tiempo lleva relajarse en frente de la cámara?
A: Invertimos 15-20 minutos al inicio conociéndote, hablando de tus inseguridades, y haciendo "warm-up shots" sin presión. La mayoría de clientes se relajan mucho después de estos primeros minutos.

Q5: ¿Puedo traer amigos/familia para el apoyo moral?
A: Sí, aunque generalmente recomendar sesiones privadas para mejor comodidad y concentración. Pero decidimos juntos.

Q6: ¿Qué pasa si me siento incómodo/a durante la sesión?
A: Pausamos, hablamos, y ajustamos. Mi trabajo es que te sientas cómodo/a—sin eso, no hay fotos buenas. Es conversación, no dirección militarista.
```

**Visual**: Each Q&A with a little portrait photo from gallery (client who had same fear)

**Placement**: Below package tiers on Services page

---

### B. Organize Portfolio Images for Script Upload

**Current structure**: `/portfolio-images/` has:
```
├─ about/
├─ commercial/ ← HIDE
├─ couples/    ← MOVE to portraits/couples
├─ editorial/  ← HIDE
├─ maternity/  ← MOVE to portraits/maternity
├─ portraits/
├─ weddings/
```

**New structure needed**:
```
portfolio-images/
├─ portraits/
│  ├─ individual/      (solo person photos showing comfort/confidence)
│  ├─ couples/         (couples/engagement showing "comfort zone" progression)
│  ├─ groups/          (family, friends, groups)
│  ├─ maternity/       (expecting mothers showing comfort)
│  ├─ graduation/      (XV, graduation, special occasions)
│  └─ concepts/        (editorial-style concept shoots)
│
├─ weddings/
│  ├─ pre-wedding/     (save-the-date, engagement)
│  ├─ ceremony/        (ceremony moments)
│  ├─ reception/       (celebrations, details)
│  └─ full-day/        (complete wedding day coverage)
│
├─ testimonials/       (portraits + behind-scenes)
└─ before-concepts/    (if doing before/after comfort stories)
```

**Action**: Reorganize files in `/portfolio-images/` to match this structure, then run seeding scripts.

**Scripts to use**:
```bash
npm run sync-portfolio-category  # Sync category metadata
npm run upload-portfolio          # Upload new images to Sanity
```

---

### C. Testimonial Integration

**Current need**: "might have a couple portraits and a couple weddings testimonials"

**Placement Options**:
1. **Homepage InvestmentSection**: Add 2-3 testimonial quotes (small, under the value message)
2. **Services page**: One portrait testimonial + one wedding testimonial
3. **Portfolio gallery**: Each gallery item can have a small testimonial

**Format** (create in Sanity schema or hardcode for now):

```typescript
const testimonials = [
  // PORTRAIT
  {
    type: 'portrait',
    name: 'María G.',
    context: 'Graduación',
    text: 'Nunca pensé que me vería así en fotos. Oscar me hizo sentir segura desde el primer momento. Realmente le importa que te sientas cómodo/a.',
    beforeFeeling: 'Nerviosa',
    afterFeeling: 'Confiada',
  },
  // WEDDING
  {
    type: 'wedding',
    name: 'Carlos & Ana',
    context: 'Boda',
    text: 'No queríamos fotos "posadas". Oscar entendió exactamente qué queríamos: momentos reales donde nos viéramos como nos sentíamos. Fue increíble.',
  },
];
```

**Action needed**: Get testimonials from actual clients (ask them to write 2-3 sentences)

---

## PHASE 5: Analytics & Seasonal Strategy (Weeks 5-6)

### A. Meta Pixel Implementation

**Purpose**: Track website visitors → conversions for future ad targeting

**Steps**:

1. **Get Meta Pixel ID**
   - Go to Facebook Business Manager → Events Manager → Data Sources → Web
   - Create new Web Pixel (if don't have one)
   - Copy Pixel ID

2. **Install Pixel** (`src/app/layout.tsx`):
```typescript
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_PIXEL_ID_HERE');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=YOUR_PIXEL_ID_HERE&ev=PageView&noscript=1`}
          />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

3. **Track Key Events**:
```typescript
// Portfolio visit
export function trackPortfolioView(service: string) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'ViewContent', {
      content_type: 'portfolio',
      content_name: `View ${service} portfolio`,
    });
  }
}

// WhatsApp Click
export function trackWhatsAppClick(service: string) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Contact', {
      content_type: 'whatsapp_inquiry',
      service: service,
    });
  }
}

// Lead Magnet Download
export function trackLeadMagnetDownload(magnetType: string) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead', {
      content_type: 'lead_magnet',
      content_name: magnetType,
    });
  }
}
```

4. **Create Conversion Pixel** (on contact/thank-you):
```typescript
// After WhatsApp redirect (optional tracking)
fbq('track', 'InitiateCheckout', {
  content_type: 'photography_service',
  service_type: 'portrait' | 'wedding',
});
```

**Dashboard to Monitor**:
- Pixel > Events > Daily active people
- Portfolio visits by page
- WhatsApp clicks by service
- Lead magnet downloads
- Conversion rate (inquiry → booking)

---

### B. Seasonal Promotion Plan

**Strategic Goal**: Balance wedding seasonality with year-round portrait volume

#### Season 1: NOW - Graduation Season (March-June)

**Promotions**:
```
📸 SESIONES DE GRADUACIÓN / XV AÑOS
├─ Mensaje: "Fotos donde te ves genial (sin parecer 'modelado')"
├─ Package: Graduación Express - $2,200 (1.5 hrs, 20 photos, 1 location)
├─ Add-on: "Padres + Familia Extra" - $300/person
├─ Promo: Book by April 30 → Free printed collection (normally $350)
│
├─ Where to promote:
│  ├─ Landing page: /sesiones-especiales/graduacion
│  ├─ WhatsApp: Preset button "Sesión de Graduación"
│  ├─ Lead magnet: "Graduation Session Ideas" guide
│  └─ Social media: Behind-the-scenes from grad shoots
│
└─ Campaign timeline:
   - Week 1: Launch landing page + email to past clients
   - Week 2: Facebook ads targeting high school + XV groups
   - Week 3-4: Momentum + testimonials from early bookings
   - Week 5: Last-minute promo "3 spots left, book this week!"
```

#### Season 2: Engagement Season (June-August)

**Promotions**:
```
💍 SESIÓN DE COMPROMISO / PAREJA
├─ Mensaje: "Fotos de ustedes siendo ustedes (no 'modelados')"
├─ Package: Pre-Wedding Session - $2,700 (2 hrs, 30 photos, multiple locations)
├─ Cross-sell: "Después quieren fotos de boda?" Book + get $500 credit
│
├─ Where to promote:
│  ├─ Landing page: /sesiones-especiales/parejas
│  ├─ Lead magnet: "Guide for Your Engagement Session"
│  └─ Targeted ads: Engaged couples (Facebook targeting)
│
└─ Campaign timeline:
   - June: Launch after graduation season ends
   - June-August: Peak engagement season
```

#### Season 3: Wedding Season (August-November)

**Promotions**:
```
🎂 BODAS - TEMPORADA ALTA
├─ Mensaje: "Cobertura que captura momentos reales, no posados"
├─ Package: Full day + pre-wedding session (combo discount)
├─ Early booking: Book by July → $500 credit
│
├─ Where to promote:
│  ├─ Wedding expo booths (if available)
│  ├─ Google ads for "fotógrafos bodas Juárez"
│  └─ Referrals (incentivize: "Refer a couple, get $200 credit")
│
└─ Campaign timeline:
   - July: Peak inquiry season (couples planning fall weddings)
   - Aug-Nov: Execution season
```

#### Season 4: Holiday/End-of-Year (November-January)

**Promotions**:
```
🎄 FAMILY PORTRAITS / HOLIDAY SESSIONS
├─ Mensaje: "Retratos en Navidad (para mantener recuerdos, no solo decoraciones)"
├─ Package: Family Holiday Session - $2,500 (1.5 hrs, 25 photos)
├─ Add-on: Printed gift set (holiday photos 4x6" cards) - $400
│
├─ Where to promote:
│  ├─ Landing page: /sesiones-especiales/navidad
│  ├─ Lead magnet: "Holiday Session Ideas"
│  └─ Email: "Book now for Navidad gifte books"
│
└─ Campaign timeline:
   - October: Early bird promo
   - November: Ramp up messaging
   - December 1-20: Last-minute availability
```

#### Off-Season Fill Strategy:

**Months before peak** (May, September):
- Offer "Rebrand Your Headshot" package for professionals ($2,000)
- "Maternity Session" promotion for expecting mothers
- "Concept Shoot Collaboration" for creative clients (portfolio-building)

---

### C. Booking Calendar + Response SLA

**New component**: `src/app/contact/components/AvailabilityReminder.tsx`

Shows:
```
✅ Next available portraits: March 29, April 2, April 5
✅ Next available weddings: 2 weddings in May, 3 in June
📱 Message us on WhatsApp for instant availability
⏰ We respond typically within 2 hours
```

**Action**: Integrate with calendar system (or manual update monthly)

---

### D. Metrics Dashboard to Track

**30-Day Dashboard**:
```
[Homepage Hero Section]
├─ Views: ___
├─ WhatsApp clicks: ___
├─ CTR: ___

[Portraits Services Page]
├─ Views: ___
├─ FAQ section engagement: ___
├─ WhatsApp clicks: ___

[Weddings Services Page]
├─ Views: ___
├─ WhatsApp clicks: ___

[Lead Magnets]
├─ Downloads (Portraits guide): ___
├─ Downloads (Weddings guide): ___
├─ Email conversions: ___

[WhatsApp Inquiries]
├─ Total: ___
├─ Portraits: ___
├─ Weddings: ___
├─ Conversion rate (inquiry → booking): ___

[Meta Pixel]
├─ Website visitors: ___
├─ Portfolio views: ___
├─ Lead magnet downloads: ___
├─ WhatsApp actions: ___

[Business]
├─ New portrait bookings: ___
├─ New wedding bookings: ___
├─ Revenue this week: ___
```

---

## IMPLEMENTATION CHECKLIST

### Week 1-2: Funnel + Messaging

- [ ] Update Hero copy (choose one of 3 options)
- [ ] Remove email form from contact page
- [ ] Make WhatsApp button primary CTA
- [ ] Add WhatsApp preset messages
- [ ] Add response time promise copy ("Respondo en 2 horas")
- [ ] Create `src/config/contact.ts` with WhatsApp number + messages
- [ ] Deploy and test WhatsApp links

### Week 2-3: Service Simplification

- [ ] Update `src/config/services.ts` to hide Commercial/Editorial
- [ ] Update navigation to remove hidden services
- [ ] Create `SessionTypeSelector.tsx` component (Portraits page)
- [ ] Update package seed data with new pricing
- [ ] Test service pages locally
- [ ] Update URL routing for new service structure

### Week 3-4: Lead Magnets

- [ ] Create "Guía de Retratos" PDF (can be Canva or simple design)
- [ ] Create "Guía de Bodas" PDF
- [ ] Create "Seasonal Sessions" landing page
- [ ] Setup email provider (MailerLite, ConvertKit, or simple Sanity-based)
- [ ] Create email sequences (3 emails for each magnet)
- [ ] Add CTA buttons to homepage + services page
- [ ] Track downloads in Google Analytics + Meta Pixel

### Week 4-5: Content + Portfolio

- [ ] Reorganize `/portfolio-images/` to new folder structure
- [ ] Create Q&A section component
- [ ] Add 5-6 Q&A entries with photos
- [ ] Collect 2-3 portrait testimonials from clients
- [ ] Collect 1-2 wedding testimonials
- [ ] Add testimonials to homepage + services page
- [ ] Run portfolio sync/upload scripts
- [ ] Test gallery views

### Week 5-6: Analytics + Seasonal

- [ ] Get Meta Pixel ID from Facebook Business
- [ ] Install Meta Pixel in `layout.tsx`
- [ ] Create tracking event functions
- [ ] Set up Google Analytics goals for WhatsApp clicks
- [ ] Create /sesiones-especiales/graduacion landing page
- [ ] Add Graduation promotion copy + booking CTA
- [ ] Create seasonal promotion calendar (Google Calendar or Notion)
- [ ] Set up monthly metrics review process

---

## FILE-BY-FILE CHANGES SUMMARY

| File | Change | Priority |
|------|--------|----------|
| `src/app/components/HeroContent.tsx` | Update hero copy (choose one of 3 options) | 🔴 HIGH |
| `src/app/contact/page.tsx` | Remove email form, add WhatsApp primary | 🔴 HIGH |
| `src/app/contact/components/ContactPageClient.tsx` | Rebuild with WhatsApp focus | 🔴 HIGH |
| `src/config/services.ts` | Add `visible` flag, hide Commercial/Editorial | 🔴 HIGH |
| `src/app/services/page.tsx` | Filter hidden services, add session selector | 🔴 HIGH |
| `src/app/services/components/SessionTypeSelector.tsx` | **NEW** - Portrait type selector | 🟡 MEDIUM |
| `src/app/services/components/FaqNonModels.tsx` | **NEW** - Q&A section for non-models | 🟡 MEDIUM |
| `src/app/layout.tsx` | Add Meta Pixel script | 🟡 MEDIUM |
| `scripts/seed-service-packages.mjs` | Update pricing + new seasonal packages | 🟡 MEDIUM |
| `src/app/components/InvestmentSection.tsx` | Add testimonials | 🟡 MEDIUM |
| `/portfolio-images/` | Reorganize folder structure | 🔴 HIGH |
| Portfolio gallery pages | Add testimonial captions | 🟡 MEDIUM |

---

## HERO COPY OPTIONS (CHOOSE ONE)

**You approved: "take attention to the details provided on the notes"**

Here are the final 3 hero options with variants:

### **Option 1: Direct Pain Point** (RECOMMENDED)
```
ES: "Tu historia, capturada sin nervios."
EN: "Your story. Captured without the nerves."
```
- Simple, punchy, addresses core fear
- Sub: "la esencia de tu historia" (keeps current emotional angle)

### **Option 2: The Transformation**
```
ES: "No te ves como te sientes. Aquí sí."
EN: "You don't look like you feel. Here you will."
```
- Speaks to disconnect between self-image + camera fear
- Sub: "Retratos auténticos, cómodo, seguro"

### **Option 3: Anti-Model Positioning**
```
ES: "Retratos profesionales para gente real."
EN: "Professional portraits for real people."
```
- Softens intimidation factor
- Sub: "Sin poses incómodas. Solo tú, mejor."

---

**MY RECOMMENDATION**: Use **Option 1** because:
- It's the most memorable (3 words)
- Directly addresses your differentiator (no nervousness)
- Speaks to the emotional transformation (story → confidence)
- Works in both Spanish & English

**Would you like to choose, or should I proceed with Option 1?**

---

## NEXT IMMEDIATE ACTIONS

### Before I Start Implementation Code:

1. **Approve Hero Copy**: Which of the 3 options, or another direction?
2. **Portfolio Images**: Confirm you'll reorganize `/portfolio-images/` to new structure OR you can start that now
3. **Testimonials**: Can you reach out to 2-3 clients (portrait + wedding) for short testimonial quotes?
4. **WhatsApp Number**: Provide your actual WhatsApp number for CTA linking
5. **Lead Magnet Formats**: Do you want PDFs (design yourself in Canva) or simple landing pages?

---

## What Happens After Implementation

**Week 7-8 (Post-Launch)**:
- Monitor WhatsApp inquiries daily
- Track which hero copy gets most engagement (via Meta Pixel)
- Measure portrait vs. wedding inquiry split
- Collect testimonials from first bookings

**Week 9-12 (Optimization)**:
- A/B test seasonal promotions
- Adjust pricing if demand exceeds capacity
- Double down on what works (inquiries, conversions)
- Plan next seasonal campaign

**Month 4+ (Scale)**:
- Facebook ads targeting personas (scared-of-cameras, engaged couples, etc.)
- Referral program launch (if high conversion rate established)
- Consider package bundling (wedding day + album already included)

---

## ROLL-OUT SEQUENCE

**Recommended order of changes** (for smooth deployment):

1. **Day 1**: Swap hero copy + update Investment section
2. **Day 2**: Hide Commercial/Editorial services
3. **Day 3**: Remove email form, add WhatsApp-only contact
4. **Days 4-5**: Add Q&A section + reorganize portfolio
5. **Days 6-7**: Setup Meta Pixel + add testimonials
6. **Week 2**: Launch lead magnets + seasonal page

This way, each change has time to generate data before the next one.

---

**Ready to proceed with specific code implementations?** Let me know on the 5 action items above and I'll start generating the exact files + code changes needed.
