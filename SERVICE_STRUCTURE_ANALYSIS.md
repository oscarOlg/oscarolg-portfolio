# Service Package Structure Analysis

## Overview
Analyzed 6 service component files to identify patterns, data structures, and variations for unified schema design.

---

## 1. WEDDING PACKAGES (WeddingPackages.tsx)

### Main Packages: 3
- **Esencial** - $8,000 MXN (6 hours coverage)
- **Clásico** - $10,000 MXN (8 hours coverage) — *Popular badge*
- **Premium** - $12,000 MXN (10 hours coverage)

### Package Structure
- **Name** + **Subtitle** (duration description)
- **Features list** (bullet points with bold highlights for key offerings)
- **Price** (formatted as "Amount MXN")
- **CTA Button** ("Reservar" / Book)

### Add-ons Section ("Complementos")
- Sesión de Compromiso (Pre-boda) — $2,500 MXN *(note: included in Premium)*
- Set de 50 printed photos (4x6") + 2 enlargements (8x10") — $1,500 MXN
- Extra coverage hours (day-of) — $1,500 MXN/hr

### Special Sections
- **"Boda Civil / Íntima"** — Separate package variant inside add-ons (3 hours, $3,500 MXN)
  - Compact card format (gray background)
  - Different description emphasis

### Global Benefits ("Inclusiones en todos los paquetes")
- Digital gallery (~50-60 photos per hour)
- Professional editing + High Resolution + Social Media optimized
- Cloud backup (6 months free)

### Process Section
- **"El proceso hacia tu Gran Día"** — 4 steps numbered
  - Contacto → Reserva → El Evento → Entrega
  - Dark background (secondary color)
  - Centered layout, 4-column grid

### Layout Structure
- **Grid:** 3-column (lg:grid-cols-3) for main packages
- **Add-ons:** 2-column section (md:grid-cols-2) with complementos + special package card
- **Flow:** Intro text → Packages → Add-ons → Global Benefits → Process

---

## 2. INDIVIDUAL PACKAGES (IndividualPackages.tsx)

### Main Packages: 3
- **Esencial** - $1,500 MXN (1 hour "Sesión Express")
- **Clásico** - $1,800 MXN (1 hour "Experiencia completa") — *Popular badge*
- **Premium** - $2,000 MXN (2 hours "Sesión Editorial")

### Package Structure
- **Name** + **Subtitle** (session type)
- **Features list** (session duration, outfit changes, photo count)
- **Price** (Amount MXN)
- **CTA Button** ("Reservar")

### Add-ons Section ("Complementos")
- Extra edited photo — $150 MXN/each
- Extra hour of session — $1,000 MXN

### Special Sections
- **"¿Buscas fotos en estudio?"** — Informational card (gray background)
  - Studio rental info ($600 MXN/hr average)
  - No CTA button

### Global Benefits ("Inclusiones en todas las sesiones")
- Private digital gallery (High Resolution + Social Media optimized)
- Cloud backup (3 months free)

### Process Section
- **"Cómo funciona la sesión"** — 4 steps numbered
  - Idea → Planeación → La Sesión → Entrega

### Layout Structure
- **Grid:** 3-column main packages (lg:grid-cols-3)
- **Add-ons:** 2-column section (md:grid-cols-2) with complementos + studio info card
- **Flow:** Intro description → Packages → Add-ons → Global Benefits → Process

---

## 3. COUPLE PACKAGES (CouplePackages.tsx)

### Main Packages: 3
- **Esencial** - $1,800 MXN (1 hour "Sesión Casual", 2 people, 1 outfit change)
- **Clásico** - $2,200 MXN (2 hours "La experiencia completa", 2 people) — *Popular badge*
- **Premium** - $2,500 MXN (2 hours "Memoria Documental", 2 people, 3 outfit changes)

### Package Structure
- **Name** + **Subtitle** (session descriptor)
- **Features list** (duration, people coverage, outfit changes, photo count)
- **Price** (Amount MXN)
- **CTA Button** ("Reservar")
- **Note:** Intro mentions "*Todos los paquetes incluyen cobertura base para 2 personas. Aplica costo extra a partir del tercer integrante"

### Add-ons Section ("Complementos")
- Extra person or pet — $250 MXN/each
- Extra edited photo — $150 MXN/each
- Extra hour of session — $1,000 MXN

### Special Sections
- **"¿Buscan fotos en estudio?"** — Informational card (gray background)
  - Studio rental info ($600 MXN/hr average)
  - Slightly personalized message (plural form)

### Global Benefits ("Inclusiones en todas las sesiones")
- Private digital gallery (High Resolution + Social Media optimized)
- Cloud backup (3 months free)

### Process Section
- **"Cómo funciona la sesión"** — 4 steps numbered
  - Idea → Planeación → La Sesión → Entrega

### Layout Structure
- **Grid:** 3-column main packages (lg:grid-cols-3)
- **Add-ons:** 2-column section (md:grid-cols-2) with complementos + studio info card
- **Flow:** Intro description → Packages → Add-ons → Global Benefits → Process

---

## 4. MATERNITY PACKAGES (MaternityPackages.tsx)

### Main Packages: 2 ← **DIFFERENT FROM OTHERS**
- **Esencial** - $1,800 MXN (1 hour "El brillo de la espera")
- **Documental de Vida** - $2,500 MXN (2 hours "Maternidad y Familia") — *"Experiencia Completa" badge*

### Package Structure
- **Name** + **Subtitle** (session philosophy)
- **Features list** (duration, participants, outfit changes, photo count)
- **Price** (Amount MXN)
- **CTA Button** ("Reservar")

### Add-ons Section
- **NONE** — This section is absent entirely

### Special Sections
- **"¿Deseas una sesión más íntima en estudio?"** — Standalone info card (gray background)
  - Studio rental guidance
  - No CTA button

### Global Benefits ("Inclusiones en todas las sesiones")
- Private digital gallery (High Resolution + Social Media optimized)
- Cloud backup (3 months free)

### Process Section
- **"Cómo funciona la sesión"** — 4 steps numbered
  - Idea → Planeación → La Sesión → Entrega
  - **Special:** Step 2 mentions optimal timing (weeks 28-34)

### Layout Structure
- **Grid:** 2-column main packages (md:grid-cols-2) ← **UNIQUE: NOT 3-column**
- **Full-width info card** for studio option
- **Flow:** Intro description → Packages → Studio info → Global Benefits → Process

---

## 5. COMMERCIAL PACKAGES (CommercialPackages.tsx)

### Main Packages: 3
- **Retrato Corporativo** - $2,000 MXN (1 hour, headshots/personal brand)
- **Negocio Local** - $4,500 MXN (2.5 hours, local business) — *"Ideal para PyMEs" badge*
- **Producción Mayor** - $8,000+ MXN (4-8 hours, corporate/industrial)

### Package Structure
- **Name** + **Subtitle** (target audience/use case)
- **Features list** (duration, scope, deliverables count)
- **Price** (Amount MXN, "A partir de" for Producción Mayor)
- **CTA Button** ("Cotizar" or "Cotizar Proyecto")

### Add-ons Section
- **NONE** — No complementos section

### Special Sections
- **"Presupuestos a la Medida"** — Custom pricing explanation card
  - Accent color background (bg-accent/10)
  - Emphasizes flexibility and negotiation
  - No CTA button
  - **UNIQUE TO COMMERCIAL:** Acknowledges different business sizes

### Global Benefits ("Inclusiones en todos los proyectos")
- Digital gallery (High Resolution + Social Media + billboards)
- Cloud backup (3 months free)

### Process Section
- **"Cómo funciona nuestro proceso"** — 4 steps numbered
  - Briefing → Planeación → Producción → Entrega
  - Different terminology from personal services

### Layout Structure
- **Grid:** 3-column main packages (lg:grid-cols-3)
- **No complementos section**
- **Custom pricing card** between packages and global benefits
- **Flow:** Intro description → Packages → Custom pricing message → Global Benefits → Process

---

## 6. EDITORIAL PACKAGES (EditorialPackages.tsx)

### Main Packages: 2 ← **DIFFERENT FROM OTHERS**
- **Colaboraciones (TFP)** - No price (Trade For Portfolio)
- **Lookbook / Campaña** - No fixed price (custom quote)

### Package Structure
**Colaboraciones (TFP):**
- **Name** + **Subtitle** (Sinergia Creativa)
- **Description paragraph** (narrative about creative exchange)
- **Call-to-action paragraph** (italic, motivational)
- **CTA Button** ("Proponer Colaboración") — Outlined style (border, no fill)

**Lookbook / Campaña:**
- **Name** + **Subtitle** (For brands and designers)
- **Features list** (services, deliverables, budget note)
- **CTA Button** ("Cotizar Campaña") — Filled style

### Add-ons Section
- **NONE** — No complementos section

### Special Sections
- **NONE** — No global benefits, no process section, no studio info

### Global Benefits
- **MISSING** — Not included in Editorial

### Process Section
- **MISSING** — Not included in Editorial

### Layout Structure
- **Grid:** 2-column (md:grid-cols-2) for main offerings
- **No add-ons, no benefits, no process sections**
- **Much simpler structure** than other service types
- **Collaborative, open-ended approach** vs. fixed packages

---

## PATTERN ANALYSIS

### Common Structural Elements (Present in Most)
| Element | Wedding | Individual | Couple | Maternity | Commercial | Editorial |
|---------|---------|-----------|--------|-----------|-----------|-----------|
| Main packages grid | ✅ (3) | ✅ (3) | ✅ (3) | ✅ (2) | ✅ (3) | ✅ (2) |
| Package features (bullets) | ✅ | ✅ | ✅ | ✅ | ✅ | Partial |
| Fixed prices | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Add-ons section | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Global Benefits section | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Process section | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| "Popular" badge | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Specialized info card | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |

### Package Count Variations
- **Standard (3 packages):** Wedding, Individual, Couple, Commercial
- **Non-standard (2 packages):** Maternity (session-focused), Editorial (collaboration-focused)

### Grid Layout Variations
- **3-column (lg:grid-cols-3):** Wedding, Individual, Couple, Commercial
- **2-column (md:grid-cols-2):** Maternity (lifestyle), Editorial (creative)

### Pricing Model Variations
- **Fixed prices per package:** Wedding, Individual, Couple, Maternity, Commercial (mostly)
- **Custom/No price:** Editorial (TFP + quote-based), Commercial (Producción Mayor "a partir de")

### Button Text Variations
- **"Reservar"** — Personal/lifestyle services (Wedding, Individual, Couple, Maternity)
- **"Cotizar"** — Commercial services (Corporate, specialty)
- **"Proponer Colaboración"** — Creative/editorial (TFP)

### Special Badges
- **"Más Popular"** → Used for (Classic packages) in: Wedding, Individual, Couple, Maternity, Commercial
- **"Ideal para PyMEs"** → (Commercial only)
- **"Experiencia Completa"** → (Maternity alternative label)

---

## Data Structure Implications

### Service Package Schema (Core Fields Required)

```typescript
ServicePackage {
  // Identifier
  serviceType: 'wedding' | 'individual' | 'couple' | 'maternity' | 'commercial' | 'editorial'
  
  // Basic Info
  id: string
  name: string
  subtitle?: string  // e.g., "Cobertura de 6 horas", "Sesión Express"
  description?: string  // Full description paragraph
  
  // Pricing
  price?: number  // In MXN (null for editorial/TFP)
  priceLabel?: string  // "A partir de" for flexible pricing
  currency?: string  // Default: "MXN"
  
  // Features
  features: Feature[]  // Bullet points with mixed bold/normal text
  // Feature structure: { text: string, bold?: boolean }
  
  // Metadata
  badge?: string  // "Más Popular", "Ideal para PyMEs", "Experiencia Completa"
  isFeatured?: boolean  // For special highlighting
  cta?: {
    text: string  // "Reservar", "Cotizar", "Proponer Colaboración"
    url: string
    style?: 'filled' | 'outlined'
  }
}

ServiceSection {
  // Package collections per service
  serviceType: string
  mainPackages: ServicePackage[]
  addOns?: AddOn[]  // Optional, only in Wedding, Individual, Couple
  specialPackages?: ServicePackage[]  // e.g., "Boda Civil"
  
  // Content sections
  globalBenefits?: {
    title: string
    content: string
  }
  
  process?: {
    title: string
    steps: ProcessStep[]  // 4-step workflow
  }
  
  customCard?: {
    title: string
    content: string
    backgroundColor: string
    hasCTA: boolean
  }
}

AddOn {
  name: string
  price: number
  unit: string  // "per unit", "/hr", "/each"
  notes?: string  // e.g., "(Incluida en paquete Premium)"
}

ProcessStep {
  number: number
  title: string
  description: string
}
```

### Key Variations by Service
- **Wedding, Individual, Couple:** Full standard structure (packages + add-ons + benefits + process)
- **Maternity:** Simplified (packages + NO add-ons + benefits + process + studio info)
- **Commercial:** Modified (packages + NO add-ons + custom pricing card instead + benefits + process)
- **Editorial:** Minimal (packages only, NO add-ons/benefits/process)

---

## Unique Features by Service

### Wedding-Specific
- Civil/Intimate ceremony variant as special package
- Hour-based pricing granularity
- "Pre-wedding" session as add-on
- Physical print add-ons

### Individual-Specific
- Outfit change counts as key feature
- Photo count very specific (10, 15, 20)

### Couple-Specific
- Explicit note about base coverage for 2 people
- "Extra person/pet" as add-on
- Plural messaging in studio card

### Maternity-Specific
- Only 2 packages (session-focused, not variety-focused)
- No add-ons section (can't upsell as easily)
- Process step includes timing guidance (weeks 28-34)
- Emphasis on comfort and intimacy in descriptions

### Commercial-Specific
- "From X price" model for larger productions
- Different button text ("Cotizar" instead of "Reservar")
- "Custom Budget" explanation card (unique)
- Briefing/Planning terminology differs
- Different photo count ranges (30, 50+)

### Editorial-Specific
- Completely different approach (collaboration vs. service)
- No pricing at all for TFP
- Narrative-driven descriptions instead of bullet lists
- Button style variation (outlined for TFP)
- Missing process section entirely
- Missing global benefits section
- Emphasizes creativity and mutual benefit

---

## Recommendations for Schema

1. **Make optional sections truly optional** — Some services don't have add-ons or process sections
2. **Support flexible pricing models** — null for TFP, "from X" for variable, fixed number for standard
3. **Store rich text or simple markup** — Features have mixed bold/normal text
4. **Allow service-specific customizations** — Button text, section labels, process terminology
5. **Create badge system** — Separate type definition for common, service-specific badges
6. **Support both grid variations** — 2-column and 3-column layouts should be configurable
7. **Feature flags for sections** — Enable/disable add-ons, process, benefits per service
8. **Button style variants** — "filled", "outlined", "link" for different CTAs
