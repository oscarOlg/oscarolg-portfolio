#!/usr/bin/env node

/**
 * patch-en-fields.mjs
 *
 * Patches all Sanity CMS documents with pre-translated English (*En) fields.
 * No Anthropic API key required — all translations are hardcoded.
 *
 * Prerequisites:
 *   Add SANITY_API_TOKEN to .env.local
 *   → manage.sanity.io → API → Tokens → Add API token (Editor role)
 *
 * Usage:
 *   npm run patch:en
 *
 * Safe to re-run: skips fields that already have an English value.
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

// ── Load .env.local ───────────────────────────────────────────────────────────
const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split('=')
    if (key && !key.startsWith('#')) {
      process.env[key.trim()] = valueParts.join('=').trim().replace(/^['"]|['"]$/g, '')
    }
  })
}

const SANITY_TOKEN = process.env.SANITY_API_TOKEN
if (!SANITY_TOKEN) {
  console.error('❌  Missing SANITY_API_TOKEN in .env.local')
  console.error('    Get one at: manage.sanity.io → API → Tokens (Editor role)')
  process.exit(1)
}

// ── Sanity client ─────────────────────────────────────────────────────────────
const client = createClient({
  projectId: 'qmeztasz',
  dataset: 'production',
  useCdn: false,
  token: SANITY_TOKEN,
  apiVersion: '2024-03-01',
})

// ── Logging helpers ───────────────────────────────────────────────────────────
const skip = (f) => `    ⏭  ${f} — already set`
const done = (f, v) => {
  const preview = typeof v === 'string' ? v.slice(0, 60) + (v.length > 60 ? '…' : '') : `[array:${v?.length}]`
  return `    ✅ ${f}: "${preview}"`
}

// ── 1. HOMEPAGE ───────────────────────────────────────────────────────────────
const homepageEn = {
  heroHeadingEn: 'Photography that captures',
  heroHeadingItalicEn: 'the essence of your story',
  heroCta1TextEn: 'View my portfolio',
  heroCta2TextEn: 'Get a quote',
  workSectionHeadingEn: 'My Work',
  workSectionSubtitleEn: 'Explore by session type',
  workSectionViewMoreTextEn: 'View more →',
  workSectionViewAllTextEn: 'View full portfolio →',
  investmentHeadingEn: 'The peace of mind of being in good hands.',
  investmentParagraph1En:
    'My goal is to transform fleeting moments into tangible memories. I offer aesthetic quality, human warmth, and absolute peace of mind to document the most important chapters of your life.',
  investmentParagraph2En:
    "I know that planning an event takes time and dedication. That's why my focus is on giving you the confidence that your story will be captured with care and professionalism. Find clear options designed to fit your vision, so you can focus on simply enjoying every moment.",
  investmentCtaTextEn: 'Explore packages & pricing',
  finalCtaHeadingEn: 'Ready to create something beautiful and one-of-a-kind?',
  finalCtaLocationEn: 'Ciudad Juárez & Mexico',
  finalCtaButtonTextEn: 'Book your date',
}

async function patchHomepage() {
  console.log('\n📄  homepageContent')
  const doc = await client.fetch(`*[_type == "homepageContent"][0]`)
  if (!doc) { console.log('   (not found)'); return }

  const patch = {}
  for (const [field, value] of Object.entries(homepageEn)) {
    if (doc[field]) { console.log(skip(field)); continue }
    patch[field] = value
    console.log(done(field, value))
  }
  if (Object.keys(patch).length) await client.patch(doc._id).set(patch).commit()
}

// ── 2. ABOUT ──────────────────────────────────────────────────────────────────
async function patchAbout() {
  console.log('\n📄  aboutContent')
  const doc = await client.fetch(`*[_type == "aboutContent"][0]`)
  if (!doc) { console.log('   (not found)'); return }

  const patch = {}

  if (!doc.headingEn) {
    patch.headingEn = 'The vision behind the lens.'
    console.log(done('headingEn', patch.headingEn))
  } else console.log(skip('headingEn'))

  if (!doc.ctaTextEn) {
    patch.ctaTextEn = "Let's talk about your project"
    console.log(done('ctaTextEn', patch.ctaTextEn))
  } else console.log(skip('ctaTextEn'))

  if (!doc.paragraphsEn?.length) {
    patch.paragraphsEn = [
      "I'm Oscar Sanchez, a photographer based in Ciudad Juárez. My work blends technical attention to detail with the artistic sensitivity needed to document what matters most: people, connections, and the moments worth preserving.",
      "I specialize in wedding, portrait, and couples photography. I understand that choosing the person who will document your memories is an act of trust. That's why my primary promise isn't just to deliver aesthetically beautiful images — it's to give you confidence and absolute peace of mind throughout the entire process.",
      "I want you to experience every session knowing that each irreplaceable moment is in safe hands. My goal is simple: to turn today's emotion into a lasting visual legacy that lets you relive the moment again and again.",
    ]
    console.log(done('paragraphsEn', patch.paragraphsEn))
  } else console.log(skip('paragraphsEn'))

  if (Object.keys(patch).length) await client.patch(doc._id).set(patch).commit()
}

// ── 3. SERVICE CONFIGS ────────────────────────────────────────────────────────
// Nested arrays (complementos, processSteps) are merged positionally (by index).
const serviceConfigsEn = {
  weddings: {
    displayNameEn: 'Weddings',
    introTextEn:
      'Your wedding is a reflection of your story. We document every moment with editorial sensitivity, focusing on genuine emotions, the details that shine, and the magic of celebrating love on your day.',
    globalBenefitsHeadingEn: 'Included in all packages',
    globalBenefitsTextEn:
      'Guaranteed delivery of an extensive digital gallery (approx. 50–60 photos per hour of coverage). All photographs are professionally edited and delivered in High Resolution (print-ready) and optimized for Social Media. Backed up in the cloud free of charge for 6 months.',
    processTitleEn: 'The path to your Big Day',
    ctaButtonTextEn: 'Book Now',
    complementosEn: [
      { nameEn: 'Engagement Session (Pre-wedding)', noteEn: 'Included in the Premium package' },
      { nameEn: 'Set of 50 printed photos (4×6") + 2 enlargements (8×10")' },
      { nameEn: 'Extra hours of event coverage' },
    ],
    processStepsEn: [
      { headingEn: 'Contact', descriptionEn: 'Send me a message to check availability for your date.' },
      { headingEn: 'Booking', descriptionEn: 'We secure your date with a deposit and sign a contract for your peace of mind.' },
      { headingEn: 'The Event', descriptionEn: 'I capture the magic of your wedding in a discreet, professional, and warm manner.' },
      { headingEn: 'Delivery', descriptionEn: 'Receive your private, edited digital gallery within 3 to 4 weeks.' },
    ],
  },
  portrait: {
    displayNameEn: 'Portraits',
    introTextEn:
      "Whether you're celebrating your birthday, documenting your graduation, refreshing your personal brand, or working on a personal project — these collections are designed to adapt to your vision.",
    infoCardHeadingEn: 'Want your session in a photography studio?',
    infoCardContentEn:
      'Any of our sessions can be held in a professional photography studio. We have several options across the city. Studio rental is quoted separately based on availability (average investment of $600 MXN per hour).',
    globalBenefitsHeadingEn: 'Included in all sessions',
    globalBenefitsTextEn:
      'Private digital gallery delivered in High Resolution (print-ready) and optimized for Social Media. Your memories will be backed up in the cloud free of charge for 3 months.',
    processTitleEn: 'How the session works',
    ctaButtonTextEn: 'Book Now',
    complementosEn: [
      { nameEn: 'Extra edited photo' },
      { nameEn: 'Extra hour of session' },
    ],
    processStepsEn: [
      { headingEn: 'Idea', descriptionEn: "We talk about the style, wardrobe, and vibe you're looking for in your photos." },
      { headingEn: 'Planning', descriptionEn: 'We schedule the date with a deposit and choose the perfect location.' },
      { headingEn: 'The Session', descriptionEn: "I'll guide you with natural posing direction so you feel authentically yourself." },
      { headingEn: 'Delivery', descriptionEn: 'Final selection and editing of your best photos within 1 to 2 weeks.' },
    ],
  },
  couples: {
    displayNameEn: 'Couples & Groups',
    introTextEn:
      "Designed to celebrate the connection with your favorite people. Whether it's a couple's portrait, family memories, or a session with your friend group, we create a relaxed atmosphere to capture the genuine dynamic and essence that bonds you.\n*All packages include base coverage for 2 people. An additional fee applies from the third person onward.",
    infoCardHeadingEn: 'Want your session in a photography studio?',
    infoCardContentEn:
      'Any of our sessions can be held in a professional photography studio. We have several options across the city. Studio rental is quoted separately based on availability (average investment of $600 MXN per hour).',
    globalBenefitsHeadingEn: 'Included in all sessions',
    globalBenefitsTextEn:
      'Private digital gallery delivered in High Resolution (print-ready) and optimized for Social Media. Your memories will be backed up in the cloud free of charge for 3 months.',
    processTitleEn: 'How the session works',
    ctaButtonTextEn: 'Book Now',
    complementosEn: [
      { nameEn: 'Extra person or pet' },
      { nameEn: 'Extra edited photo' },
      { nameEn: 'Extra hour of session' },
    ],
    processStepsEn: [
      { headingEn: 'Idea', descriptionEn: "We talk about your style, dynamic, and the vibe you're looking for in your photos." },
      { headingEn: 'Planning', descriptionEn: 'We schedule the date with a deposit and choose the perfect location.' },
      { headingEn: 'The Session', descriptionEn: 'Natural posing direction to document your connection authentically.' },
      { headingEn: 'Delivery', descriptionEn: 'Final selection and editing of your best photos within 1 to 2 weeks.' },
    ],
  },
  maternity: {
    displayNameEn: 'Maternity',
    introTextEn:
      'We document the beauty, strength, and sweet anticipation of this irreplaceable stage. Sessions designed so you feel comfortable, beautiful, and at ease — whether alone or with your partner and family.',
    infoCardHeadingEn: 'Want your session in a photography studio?',
    infoCardContentEn:
      'Any of our sessions can be held in a professional photography studio. We have several options across the city. Studio rental is quoted separately based on availability (average investment of $600 MXN per hour).',
    globalBenefitsHeadingEn: 'Included in all sessions',
    globalBenefitsTextEn:
      'Private digital gallery delivered in High Resolution (print-ready) and optimized for Social Media. Your memories will be backed up in the cloud free of charge for 3 months.',
    processTitleEn: 'How the session works',
    ctaButtonTextEn: 'Book Now',
    complementosEn: [],
    processStepsEn: [
      { headingEn: 'Idea', descriptionEn: "We talk about the style, wardrobe, and vibe you're looking for in your photos." },
      { headingEn: 'Planning', descriptionEn: 'We schedule the date (ideally between weeks 28 and 34) with a deposit.' },
      { headingEn: 'The Session', descriptionEn: "I'll guide you with natural posing direction so you feel comfortable and beautiful." },
      { headingEn: 'Delivery', descriptionEn: 'Final selection and editing of your best photos within 1 to 2 weeks.' },
    ],
  },
  commercial: {
    displayNameEn: 'Commercial',
    introTextEn:
      'Elevate the perception of your brand. We create custom image banks for businesses, entrepreneurs, and companies looking to convey professionalism and connect with their audience.',
    customBlockHeadingEn: 'Custom Budgets',
    customBlockContentEn:
      "I understand that the needs of an emerging café are not the same as those of an industrial plant. I'm completely open to hearing your project's vision and making adjustments or negotiating these packages to create a proposal that perfectly aligns with your company's requirements and budget.",
    globalBenefitsHeadingEn: 'Included in all projects',
    globalBenefitsTextEn:
      'Private digital gallery delivered in High Resolution (for print and large-format) and optimized for digital platforms and Social Media. Your files will be backed up in the cloud free of charge for 3 months.',
    processTitleEn: 'How our process works',
    ctaButtonTextEn: 'Get a Quote',
    complementosEn: [],
    processStepsEn: [
      { headingEn: 'Briefing', descriptionEn: "We discuss your brand's commercial goals and the visual aesthetic you want to project." },
      { headingEn: 'Planning', descriptionEn: 'We define dates, locations, and activity schedule while securing the date with a deposit.' },
      { headingEn: 'Production', descriptionEn: 'We execute the photo shoot efficiently and professionally without disrupting your operations.' },
      { headingEn: 'Delivery', descriptionEn: 'You receive your edited, organized image bank in High Resolution within 1 to 2 weeks.' },
    ],
  },
  editorial: {
    displayNameEn: 'Editorial',
    introTextEn:
      'Visual creation without limits. From art direction for fashion campaigns (Lookbooks) to creative synergy with emerging talent.',
    ctaButtonTextEn: 'Get a Quote',
    complementosEn: [],
    processStepsEn: [],
  },
}

async function patchServiceConfigs() {
  console.log('\n📄  serviceConfig documents')
  const docs = await client.fetch(`*[_type == "serviceConfig"] | order(serviceKey)`)
  console.log(`   Found ${docs.length} configs`)

  for (const doc of docs) {
    const en = serviceConfigsEn[doc.serviceKey]
    if (!en) { console.log(`\n  [${doc.serviceKey}] — no EN data, skipping`); continue }
    console.log(`\n  [${doc.serviceKey}]`)

    const patch = {}

    const stringFields = [
      'displayNameEn', 'introTextEn', 'infoCardHeadingEn', 'infoCardContentEn',
      'customBlockHeadingEn', 'customBlockContentEn', 'globalBenefitsHeadingEn',
      'globalBenefitsTextEn', 'processTitleEn', 'ctaButtonTextEn',
    ]
    for (const f of stringFields) {
      if (!en[f]) continue
      if (doc[f]) { console.log(skip(f)); continue }
      patch[f] = en[f]
      console.log(done(f, en[f]))
    }

    // complementos[] — merge En fields by index
    if (doc.complementos?.length && en.complementosEn?.length) {
      const needsUpdate = doc.complementos.some((c, i) => {
        const e = en.complementosEn[i]
        return e && ((e.nameEn && !c.nameEn) || (e.noteEn && !c.noteEn))
      })
      if (needsUpdate) {
        patch.complementos = doc.complementos.map((c, i) => {
          const e = en.complementosEn[i] || {}
          return {
            ...c,
            ...(e.nameEn && !c.nameEn ? { nameEn: e.nameEn } : {}),
            ...(e.noteEn && !c.noteEn ? { noteEn: e.noteEn } : {}),
          }
        })
        console.log(done('complementos', patch.complementos))
      } else console.log(skip('complementos'))
    }

    // processSteps[] — merge En fields by index
    if (doc.processSteps?.length && en.processStepsEn?.length) {
      const needsUpdate = doc.processSteps.some((s, i) => {
        const e = en.processStepsEn[i]
        return e && e.headingEn && !s.headingEn
      })
      if (needsUpdate) {
        patch.processSteps = doc.processSteps.map((s, i) => {
          const e = en.processStepsEn[i] || {}
          return {
            ...s,
            ...(e.headingEn && !s.headingEn ? { headingEn: e.headingEn } : {}),
            ...(e.descriptionEn && !s.descriptionEn ? { descriptionEn: e.descriptionEn } : {}),
          }
        })
        console.log(done('processSteps', patch.processSteps))
      } else console.log(skip('processSteps'))
    }

    if (Object.keys(patch).length) await client.patch(doc._id).set(patch).commit()
  }
}

// ── 4. SERVICE PACKAGES ───────────────────────────────────────────────────────
// Keyed by "category:spanishName" so matching is unambiguous.
const packageEnData = {
  'weddings:Esencial': {
    nameEn: 'Essential',
    descriptionEn: '6-hour coverage',
    featuresEn: ['Ceremony coverage', 'Reception coverage'],
    deliverablesEn: '50–60 edited photos per hour of coverage',
    addOnsEn: [
      { nameEn: 'Engagement Session (Pre-wedding)' },
      { nameEn: 'Set of 50 printed photos (4×6") + 2 enlargements (8×10")' },
      { nameEn: 'Extra hours of coverage' },
    ],
  },
  'weddings:Clásico': {
    nameEn: 'Classic',
    descriptionEn: '8-hour coverage',
    featuresEn: [
      'Ceremony coverage',
      'Reception coverage',
      'Portrait session (same wedding day)',
    ],
    badgeLabelEn: 'Most Popular',
    deliverablesEn: '50–60 edited photos per hour of coverage',
    addOnsEn: [
      { nameEn: 'Engagement Session (Pre-wedding)' },
      { nameEn: 'Set of 50 printed photos (4×6") + 2 enlargements (8×10")' },
      { nameEn: 'Extra hours of coverage' },
    ],
  },
  'weddings:Premium': {
    nameEn: 'Premium',
    descriptionEn: '10-hour coverage',
    featuresEn: [
      'Location engagement session pre-wedding',
      'Getting Ready: Intimate pre-ceremony moments',
      'Portrait session (same wedding day)',
      'Ceremony and reception coverage',
    ],
    deliverablesEn: '50–60 edited photos per hour of coverage',
    addOnsEn: [
      { nameEn: 'Set of 50 printed photos (4×6") + 2 enlargements (8×10")' },
      { nameEn: 'Extra hours of coverage' },
    ],
  },
  'weddings:Boda Civil / Íntima': {
    nameEn: 'Civil / Intimate Wedding',
    descriptionEn: 'Up to 3 hours of coverage',
    bodyTextEn: "Documentation of the ceremony, signing, family photos, and a couple's portrait session.",
    ctaTextEn: 'Quote Civil',
    deliverablesEn: 'Digital gallery',
    addOnsEn: [
      { nameEn: 'Set of 50 printed photos (4×6") + 2 enlargements (8×10")' },
      { nameEn: 'Extra hours of coverage' },
    ],
  },
  'portrait:Esencial': {
    nameEn: 'Essential',
    descriptionEn: 'Express Session',
    featuresEn: [
      'Up to 45-minute location session',
      '1 outfit only (no changes during the session)',
      '10 professionally edited photographs',
    ],
    deliverablesEn: '10 edited photos',
    addOnsEn: [
      { nameEn: 'Studio Session' },
      { nameEn: 'Extra edited photo' },
      { nameEn: 'Extra hour of session' },
    ],
  },
  'portrait:Clásico': {
    nameEn: 'Classic',
    descriptionEn: 'The full experience',
    featuresEn: [
      'Up to 1-hour location session',
      'Up to 2 outfit changes',
      '20 professionally edited photographs',
    ],
    badgeLabelEn: 'Most Popular',
    deliverablesEn: '20 edited photos',
    addOnsEn: [
      { nameEn: 'Studio Session' },
      { nameEn: 'Extra edited photo' },
      { nameEn: 'Extra hour of session' },
    ],
  },
  'portrait:Premium': {
    nameEn: 'Premium',
    descriptionEn: 'Editorial Session',
    featuresEn: [
      'Up to 2-hour creative session',
      'Up to 3 outfit changes',
      '30 professionally edited photographs',
    ],
    deliverablesEn: '30 edited photos',
    addOnsEn: [
      { nameEn: 'Studio Session' },
      { nameEn: 'Extra edited photo' },
      { nameEn: 'Extra hour of session' },
    ],
  },
  'couples:Esencial': {
    nameEn: 'Essential',
    descriptionEn: 'Casual Session',
    featuresEn: [
      'Base of 2 people (+ $250 MXN per additional person)',
      '1-hour location session',
      '1 outfit only (no changes during the session)',
      '15 professionally edited photographs',
    ],
    deliverablesEn: '15 edited photos',
    addOnsEn: [
      { nameEn: 'Studio Session' },
      { nameEn: 'Extra person or pet' },
      { nameEn: 'Extra edited photo' },
      { nameEn: 'Extra hour of session' },
    ],
  },
  'couples:Clásico': {
    nameEn: 'Classic',
    descriptionEn: 'The full experience',
    featuresEn: [
      'Base of 2 people (+ $250 MXN per additional person)',
      '2-hour location session',
      'Up to 2 outfit changes',
      '20 professionally edited photographs',
    ],
    badgeLabelEn: 'Most Popular',
    deliverablesEn: '20 edited photos',
    addOnsEn: [
      { nameEn: 'Studio Session' },
      { nameEn: 'Extra person or pet' },
      { nameEn: 'Extra edited photo' },
      { nameEn: 'Extra hour of session' },
    ],
  },
  'couples:Premium': {
    nameEn: 'Premium',
    descriptionEn: 'Documentary Memory',
    featuresEn: [
      'Base of 2 people (+ $250 MXN per additional person)',
      '2-hour location session',
      'Up to 3 outfit changes',
      '30 professionally edited photographs',
    ],
    deliverablesEn: '30 edited photos',
    addOnsEn: [
      { nameEn: 'Studio Session' },
      { nameEn: 'Extra person or pet' },
      { nameEn: 'Extra edited photo' },
      { nameEn: 'Extra hour of session' },
    ],
  },
  'maternity:Esencial': {
    nameEn: 'Essential',
    descriptionEn: 'The glow of anticipation',
    featuresEn: [
      '1-hour location session',
      'Partner or one family member participation (optional)',
      '1 outfit only (no changes during the session)',
      '15 professionally edited photographs',
    ],
    deliverablesEn: '15 edited photos',
    addOnsEn: [{ nameEn: 'Studio Session' }],
  },
  'maternity:Documental de Vida': {
    nameEn: 'Life Documentary',
    descriptionEn: 'Maternity & Family',
    featuresEn: [
      'Extended 2-hour location session',
      'Partner and children participation (up to 3 family members)',
      'Up to 2 outfit changes',
      '25 professionally edited photographs',
    ],
    badgeLabelEn: 'Full Experience',
    deliverablesEn: '25 edited photos',
    addOnsEn: [{ nameEn: 'Studio Session' }],
  },
  'commercial:Retrato Corporativo': {
    nameEn: 'Corporate Portrait',
    descriptionEn: 'Headshots / Personal Brand',
    featuresEn: [
      '1-hour session at your location or office',
      'Ideal for LinkedIn, medical, or executive profiles',
      '10 photographs with high-end retouching',
    ],
    ctaTextEn: 'Get a Quote',
    deliverablesEn: '10 edited photos + professional retouching',
    addOnsEn: [],
  },
  'commercial:Negocio Local': {
    nameEn: 'Local Business',
    descriptionEn: 'Content for Social Media & Web',
    featuresEn: [
      'Up to 2.5-hour session at your premises',
      'Coverage of spaces, team, and product or service in action',
      '30 photographs in High Resolution',
    ],
    badgeLabelEn: 'Ideal for SMBs',
    ctaTextEn: 'Quote Project',
    deliverablesEn: '30 photos in High Resolution',
    addOnsEn: [],
  },
  'commercial:Producción Mayor': {
    nameEn: 'Major Production',
    descriptionEn: 'Corporate / Industrial',
    pricePrefixEn: 'Starting at',
    featuresEn: [
      'Half-day to Full-day production (4 to 8 hrs)',
      'Multiple locations, industrial areas, or large advertising campaigns',
      '50+ photographs in High Resolution',
    ],
    ctaTextEn: 'Quote Project',
    deliverablesEn: '50+ photos in High Resolution',
    addOnsEn: [],
  },
  'editorial:Colaboraciones (TFP)': {
    nameEn: 'Collaborations (TFP)',
    descriptionEn: 'Creative Synergy',
    bodyTextEn:
      "I strongly believe in creative synergy. If you're a model building your portfolio, a makeup artist, stylist, or emerging designer with a bold creative concept, I'm always open to collaborations and creative exchanges (TFP).\n\nSend your moodboard or idea and let's create art together.",
    ctaTextEn: 'Propose a Collaboration',
    deliverablesEn: 'Negotiable per project',
    addOnsEn: [],
  },
  'editorial:Lookbook / Campaña': {
    nameEn: 'Lookbook / Campaign',
    descriptionEn: 'For brands and designers',
    featuresEn: [
      'Model direction and product-in-use photography (E-commerce/Social)',
      'Commercial use license and editorial retouching on key pieces',
      "Flexible Budget: The final cost is adjusted based on your campaign's needs and budget.",
    ],
    ctaTextEn: 'Quote Campaign',
    deliverablesEn: 'Edited photos + commercial license',
    addOnsEn: [],
  },
}

async function patchServicePackages() {
  console.log('\n📄  servicePackage documents')
  const docs = await client.fetch(`*[_type == "servicePackage"] | order(category, displayOrder)`)
  console.log(`   Found ${docs.length} packages`)

  for (const doc of docs) {
    const lookupKey = `${doc.category}:${doc.name}`
    const en = packageEnData[lookupKey]
    if (!en) { console.log(`\n  [${lookupKey}] — no EN data, skipping`); continue }
    console.log(`\n  [${lookupKey}]`)

    const patch = {}

    const stringFields = ['nameEn', 'pricePrefixEn', 'descriptionEn', 'bodyTextEn', 'badgeLabelEn', 'ctaTextEn', 'deliverablesEn']
    for (const f of stringFields) {
      if (!en[f]) continue
      if (doc[f]) { console.log(skip(f)); continue }
      patch[f] = en[f]
      console.log(done(f, en[f]))
    }

    // featuresEn[]
    if (en.featuresEn?.length && !doc.featuresEn?.length) {
      patch.featuresEn = en.featuresEn
      console.log(done('featuresEn', patch.featuresEn))
    } else if (doc.featuresEn?.length) console.log(skip('featuresEn'))

    // addOns[] — merge nameEn by index
    if (doc.addOns?.length && en.addOnsEn?.length) {
      const needsUpdate = doc.addOns.some((a, i) => en.addOnsEn[i]?.nameEn && !a.nameEn)
      if (needsUpdate) {
        patch.addOns = doc.addOns.map((a, i) => {
          const e = en.addOnsEn[i] || {}
          return { ...a, ...(e.nameEn && !a.nameEn ? { nameEn: e.nameEn } : {}) }
        })
        console.log(done('addOns', patch.addOns))
      } else console.log(skip('addOns'))
    }

    if (Object.keys(patch).length) await client.patch(doc._id).set(patch).commit()
  }
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🌐  Sanity ES → EN Patch (pre-translated, no Anthropic key needed)')
  console.log('    Project: qmeztasz / production')
  console.log('    Mode:    skip existing translations\n')

  try {
    await patchHomepage()
    await patchAbout()
    await patchServiceConfigs()
    await patchServicePackages()
    console.log('\n✅  All English fields patched to Sanity!')
    console.log('    Toggle EN on the live site to verify the results.')
  } catch (err) {
    console.error('\n❌  Patch failed:', err.message)
    process.exit(1)
  }
}

main()
