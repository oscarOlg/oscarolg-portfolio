# Oscar OLG Portfolio

Production portfolio website for Oscar OLG Photography, built with Next.js and Sanity CMS.

The project includes:
- Dynamic services and pricing pages
- Dynamic contact form with package and add-on pricing
- Portfolio galleries by category
- About and homepage content from Sanity
- Spanish and English content support

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Sanity CMS + Sanity Studio
- Tailwind CSS
- Framer Motion
- EmailJS (contact form sending)
- Vitest + Testing Library

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the project root.

3. Add required variables:

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-01
SANITY_API_TOKEN=

# Optional studio overrides
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=

# EmailJS
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_CONTACT_EMAIL=
```

4. Run the app:

```bash
npm run dev
```

5. Open:
- App: http://localhost:3000
- Studio: http://localhost:3000/studio

## Core Commands

### App

```bash
npm run dev
npm run build
npm run start
npm run lint
```

### Tests

```bash
npm run test
npm run test:run
npm run test:ui
npm run test:coverage
```

### Sanity Studio

```bash
npm run studio
npm run studio:build
npm run sanity:deploy
```

### Content Seeding and Utilities

```bash
# Service configs + packages (recommended main service seed)
npm run seed:services

# Individual seeds
npm run seed:serviceconfig
npm run seed:packages
npm run seed:about
npm run seed:homepage

# Portfolio/image maintenance
npm run upload-portfolio
npm run upload:about-image
npm run upload:imagery -- --apply
npm run sync-portfolio-category
npm run cleanup-duplicates

# English content helpers
npm run translate:en
npm run patch:en
```

## Project Structure

```text
src/
	app/
		services/        # Services page and package rendering
		contact/         # Contact page and dynamic quotation form
		portfolio/       # Portfolio gallery pages
		about/           # About page
		landing/[slug]/   # Dynamic landing pages (giveaways, lead funnels)
	config/
		services.ts      # Central service keys/categories config
		lead-magnets.ts  # Landing page campaign definitions
	lib/
		sanity.ts        # Sanity client + all content queries
		pricing.ts       # Contact form total calculations
	contexts/
		LanguageContext.tsx
sanity/
	schemaTypes/       # CMS document schemas
scripts/             # Seeding, upload, translation, cleanup scripts
portfolio-images/    # Local source images for upload scripts
```

## Imagery Management Strategy

Recommended local structure under `portfolio-images/`:

```text
portfolio-images/
	home/
		hero/
		testimonials/
		sections/
	about/
		profile/
	services/
		curated-top/
		featured-package/
		save-the-date/
		testimonial-proof/
		faq/
		cta/
	lead-magnets/
		engagement-giveaway/
			strip/
			hero/
	portfolio/
		weddings/
		portraits/
		couples/
		maternity/
		commercial/
		editorial/
	contact/
		hero/
```

Why this structure:
- Keeps page imagery grouped by the page it actually supports.
- Makes script-based uploads predictable and repeatable.
- Makes it clear that the services testimonial image lives in `services/testimonial-proof/`, while the homepage testimonial image lives in `home/testimonials/`.
- Gives campaign pages their own dedicated folder path (`lead-magnets/<slug>/<section>/`) so future ad funnels do not mix with core site pages.
- Adds section metadata in Sanity (`usageScope`, `usageSection`, `usageTags`) to query by intent.

Unified uploader:

```bash
# Preview only (no changes)
npm run upload:imagery

# Apply uploads to Sanity (create/replace docs)
npm run upload:imagery -- --apply
```

Notes:
- `home/` is the preferred top-level folder for homepage imagery.
- `lead-magnets/` is the preferred top-level folder for campaign landing pages.
- `homepage/` and `testimonials/` are still supported as legacy aliases for existing files, but they are no longer the preferred structure.
- Legacy category folders directly under `portfolio-images/` still work (`weddings/`, `portraits/`, etc.).
- The uploader writes `sourcePath` into each `portfolioImage` document for traceability.

## Landing Pages (Lead Magnets)

Dynamic landing pages are rendered via `/landing/[slug]`. Each campaign is defined in `src/config/lead-magnets.ts`.

### Adding a New Campaign

1. Add to the `leadMagnets` array in `src/config/lead-magnets.ts`:

```typescript
{
  slug: 'my-campaign',
  title: 'Campaign Title',
  description: 'SEO description',
  heroEyebrow: 'Small eyebrow text',
  heroTitle: 'Large hero headline',
  heroBody: 'Supporting body text',
  // ... other fields
}
```

2. Create imagery folders under `portfolio-images/lead-magnets/my-campaign/`:
   - `hero/` - Background image for hero section
   - `strip/` - 6 curated images for the image grid (2-3 columns)
   - `about/` - Portrait or about section image

3. Upload the images:

```bash
npm run upload:imagery -- --apply
```

The uploader will automatically tag them with `usageScope: 'landing'` and `usageSection: 'my-campaign_strip'`, etc.

4. Site will be available at `/landing/my-campaign` and prerendered at build time.

## Content Model (Sanity)

Main document types:
- `servicePackage`
- `serviceConfig`
- `portfolioImage`
- `aboutContent`
- `homepageContent`
- `testimonial`

## Services and Pricing Data Flow

Current source of truth:
- Services packages/add-ons come from `servicePackage` documents.
- Contact form also reads package and add-on prices from `servicePackage`.

Important implementation notes:
- `/services` and `/contact` are ISR pages (`revalidate = 60`), so seeded updates propagate quickly.
- Add-on helper text shown under items in services comes from `addOns[].description` in `servicePackage`.

## Deployment

This project is deployed on Vercel.

Typical release flow:
1. Update seed scripts/content
2. Run needed seed commands
3. Validate with `npm run build`
4. Push to preview branch
5. Validate preview
6. Merge to main

## Maintenance Notes

- Keep service categories synchronized with `src/config/services.ts`.
- If pricing changes, update `scripts/seed-service-packages.mjs` and reseed.
- Prefer small, isolated commits for urgent fixes (cache/data/render issues).
- Store internal maintenance documentation under `.github/agents/` and `.github/reports/`.
