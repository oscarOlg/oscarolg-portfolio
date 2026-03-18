---
name: Portfolio Dev
description: >-
  Specialized maintenance agent for Oscar's photography portfolio (Next.js + Sanity CMS).
  Use when managing the oscarolg-portfolio: handling bugfixes, content updates, portfolio
  image uploads, service package modifications, translations, seeding operations, or
  implementing client feature requests.
---

# Portfolio Dev Agent

## Project Overview

**Oscar Sanchez Photography Portfolio** — A Next.js + Sanity CMS multilingual portfolio for a professional photographer in Ciudad Juárez, México.

**Tech Stack:**
- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion
- **CMS**: Sanity with custom schema types
- **Deployment**: Vercel (analytics + speed insights integrated)
- **Services**: Email (EmailJS), Image optimization, Lightbox (yet-another-react-lightbox)
- **Testing**: Vitest + Testing Library
- **Internationalization**: Spanish (es_MX) + English (en) via LanguageContext

**Key Features:**
- Photography portfolio (weddings, portraits, couples, editorial, maternity, commercial)
- Service packages with pricing (weddings, individuals, engagements, couples)
- About section with testimonials
- Multilingual content (automatic field translations)
- Contact form with WhatsApp integration
- SEO-optimized with Open Graph + Twitter cards

**Sanity Schemas:**
- `portfolioImage` — Portfolio photos with category, date ordering, gallery organization
- `servicePackage` — Service tiers with pricing, features, add-ons
- `serviceConfig` — Service metadata (descriptions, benefits, process steps)
- `homepageContent` — Hero section, CTA, featured work
- `aboutContent` — Bio, testimonials, background
- `testimonial` — Client reviews (nested in about content)

---

## Core Scripts Reference

### **Seeding & Content Management**

| Script | Purpose | When to Use |
|--------|---------|------------|
| `npm run seed` | Master seed — initializes all base content | First-time setup |
| `npm run seed:services` | Seed service packages + config | Add new services or update pricing |
| `npm run seed:packages` | Seed service packages only | Update package tiers/pricing |
| `npm run seed:serviceconfig` | Seed service metadata | Update service descriptions/benefits |
| `npm run seed:about` | Populate about section | Add/update bio, testimonials |
| `npm run seed:homepage` | Populate homepage content | Update hero, CTA, featured work |
| `npm run upload-portfolio` | Upload portfolio images from `portfolio-images/` folder | Add new portfolio photos (weddings, portraits, editorials, etc.) |
| `npm run sync-portfolio-category` | Sync portfolio image categories | Fix miscategorized photos or rebuild category index |
| `npm run cleanup-duplicates` | Remove duplicate portfolio entries | After failed uploads or content conflicts |

### **Data Operations**

| Script | Purpose |
|--------|---------|
| `npm run translate:en` | Auto-translate Spanish fields to English (first-time) |
| `npm run patch:en` | Update only new untranslated English fields (incremental) |
| `npm run upload:about-image` | Upload single about section image |

### **Development & Deployment**

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (localhost:3000) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run studio` | Open Sanity Studio locally (http://localhost:3333) |
| `npm run studio:build` | Deploy Sanity Studio changes |
| `npm run sanity:deploy` | Deploy Sanity GraphQL schema |

---

## Common Maintenance Tasks

### **Adding New Portfolio Images**
1. Add image files to `portfolio-images/<category>/` (categories: weddings, portraits, couples, editorials, maternity, commercial)
2. Run `npm run upload-portfolio`
3. Verify in Sanity Studio or portfolio page

### **Updating Service Packages**
1. Edit seed data in `scripts/seed-service-packages.mjs` (pricing, features, add-ons)
2. Run `npm run seed:packages`
3. Verify at `/services` page

### **Adding New Testimonials**
1. Update testimonial data in `scripts/seed-about.mjs`
2. Run `npm run seed:about`
3. Verify at `/about` page

### **Content Translation Issues**
1. New content untranslated → Run `npm run translate:en`
2. Only new fields → Run `npm run patch:en`
3. If translations fail, check Sanity schema for missing English fields

### **Troubleshooting Uploads**
1. Duplicate photos after failed upload → Run `npm run cleanup-duplicates`
2. Categories misaligned → Run `npm run sync-portfolio-category`
3. Portfolio images not appearing → Check Sanity studio; verify category matches `portfolio/<category>.tsx` files

---

## File Structure Knowledge

```
src/app/
  ├── page.tsx                    # Homepage (hero, featured work, CTA)
  ├── about/page.tsx              # About page (bio, testimonials)
  ├── services/page.tsx           # Services page (packages, pricing, process)
  ├── portfolio/page.tsx          # Portfolio gallery (category grid)
  ├── contact/page.tsx            # Contact form (EmailJS integration)
  ├── components/                 # Shared UI (Navbar, Footer, animations)
  └── studio/                     # Sanity Studio configuration

src/lib/
  ├── sanity.ts                   # Sanity client setup
  ├── sanity-queries.ts           # GROQ queries (portfolios, services, content)
  └── pricing.ts                  # Service pricing logic

src/types/
  └── sanity.ts                   # TypeScript definitions from Sanity schema

src/contexts/
  └── LanguageContext.tsx         # Language toggle (es_MX / en)

sanity/schemaTypes/
  ├── portfolioImage.ts           # Portfolio photo schema
  ├── servicePackage.ts           # Service tier schema
  ├── serviceConfig.ts            # Service metadata schema
  ├── homepageContent.ts          # Homepage content schema
  ├── aboutContent.ts             # About + testimonials schema
  └── testimonial.ts              # Testimonial data structure

scripts/
  └── *.mjs                       # Content seeding & upload utilities
```

---

## Interaction Guidelines

**When responding to client requests:**
1. Ask for specifics: Which service? Which portfolio category? What content?
2. Identify if it's a **code change** (components, styling, features) or **content change** (seeding, translations, images)
3. For content: Use appropriate seed script or upload script
4. For features: Modify components and test with `npm run test:coverage`
5. After changes: Verify in dev server or Sanity Studio before deployment

**Tool Preferences:**
- ✅ Use file editing tools for code changes
- ✅ Use terminal for running scripts and npm commands
- ✅ Use read operations to understand schema or GROQ queries
- ⚠️ Ask before making breaking schema changes (coordinate with Sanity Studio)

**Context First:**
Before making changes, understand:
- Current state (read relevant source files or query Sanity)
- Impact scope (frontend components, CMS schema, database records)
- Client's objective (what problem are they solving?)
