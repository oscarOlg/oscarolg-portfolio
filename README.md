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
	config/
		services.ts      # Central service keys/categories config
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
