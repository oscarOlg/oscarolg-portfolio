#!/usr/bin/env node

/**
 * translate-en-fields.mjs
 *
 * Fetches all Spanish CMS content from Sanity, translates each *En field
 * using the Claude API (claude-haiku-4-5), then patches the documents in place.
 *
 * Prerequisites:
 *   1. Add SANITY_API_TOKEN to .env.local
 *      → manage.sanity.io → API → Tokens → Add API token (Editor role)
 *   2. Add ANTHROPIC_API_KEY to .env.local
 *      → console.anthropic.com → API Keys
 *
 * Usage:
 *   node scripts/translate-en-fields.mjs
 *
 * Safe to re-run: skips fields that already have an English value.
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

// ── Load .env.local ───────────────────────────────────────────────────────────
const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, 'utf8')
  env.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split('=')
    if (key && !key.startsWith('#')) {
      const value = valueParts.join('=').trim().replace(/^['"]|['"]$/g, '')
      process.env[key.trim()] = value
    }
  })
}

// ── Validate env vars ─────────────────────────────────────────────────────────
const SANITY_TOKEN = process.env.SANITY_API_TOKEN
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY

if (!SANITY_TOKEN) {
  console.error('❌  Missing SANITY_API_TOKEN in .env.local')
  console.error('    Get one at: manage.sanity.io → API → Tokens (Editor role)')
  process.exit(1)
}
if (!ANTHROPIC_KEY) {
  console.error('❌  Missing ANTHROPIC_API_KEY in .env.local')
  console.error('    Get one at: console.anthropic.com → API Keys')
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

// ── Claude translation helper ─────────────────────────────────────────────────
async function translate(text, context = '') {
  if (!text || typeof text !== 'string' || !text.trim()) return null

  const systemPrompt =
    'You are a professional translator for a photography business website. ' +
    'Translate Spanish text to natural, elegant English. ' +
    'Preserve the same tone (warm but professional), length, and structure as the original. ' +
    'Output ONLY the translated text — no explanations, no quotes, no extra text.'

  const userPrompt = context
    ? `Context: ${context}\n\nTranslate this text:\n${text}`
    : `Translate this text:\n${text}`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Anthropic API error ${res.status}: ${err}`)
  }

  const data = await res.json()
  return data.content[0].text.trim()
}

async function translateArray(arr, context = '') {
  if (!arr?.length) return null
  const results = []
  for (const item of arr) {
    results.push(await translate(item, context))
    await sleep(150)
  }
  return results
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function skip(field) {
  return `    ⏭  ${field}`
}
function done(field, value) {
  const preview = typeof value === 'string' ? value.slice(0, 55) + (value.length > 55 ? '…' : '') : `[array: ${value?.length}]`
  return `    ✅ ${field}: "${preview}"`
}
function exists(field) {
  return `    ·  ${field} — already translated`
}

// ── 1. HOMEPAGE CONTENT ───────────────────────────────────────────────────────
async function translateHomepage() {
  console.log('\n📄  homepageContent')
  const doc = await client.fetch(`*[_type == "homepageContent"][0]`)
  if (!doc) { console.log('   (not found)'); return }

  const fields = [
    ['heroHeading',            'heroHeadingEn',            'photography website hero heading — short (3–5 words)'],
    ['heroHeadingItalic',      'heroHeadingItalicEn',      'italic accent phrase in a photography hero heading'],
    ['heroCta1Text',           'heroCta1TextEn',           'primary CTA button on photography website hero'],
    ['heroCta2Text',           'heroCta2TextEn',           'secondary CTA button on photography website hero'],
    ['workSectionHeading',     'workSectionHeadingEn',     'portfolio section heading'],
    ['workSectionSubtitle',    'workSectionSubtitleEn',    'portfolio section subtitle below heading'],
    ['workSectionViewMoreText','workSectionViewMoreTextEn','hover text on a portfolio category card thumbnail'],
    ['workSectionViewAllText', 'workSectionViewAllTextEn', 'link to view all portfolio images'],
    ['investmentHeading',      'investmentHeadingEn',      'trust/investment section heading on photography website'],
    ['investmentParagraph1',   'investmentParagraph1En',   'first trust paragraph on photography website'],
    ['investmentParagraph2',   'investmentParagraph2En',   'second trust paragraph on photography website'],
    ['investmentCtaText',      'investmentCtaTextEn',      'CTA button in trust section'],
    ['finalCtaHeading',        'finalCtaHeadingEn',        'final call to action heading on photography website'],
    ['finalCtaLocation',       'finalCtaLocationEn',       'location text in photography CTA section'],
    ['finalCtaButtonText',     'finalCtaButtonTextEn',     'final CTA button text'],
  ]

  const patch = {}
  for (const [esField, enField, ctx] of fields) {
    if (!doc[esField]) { console.log(skip(enField)); continue }
    if (doc[enField]) { console.log(exists(enField)); continue }
    const en = await translate(doc[esField], ctx)
    patch[enField] = en
    console.log(done(enField, en))
    await sleep(200)
  }
  if (Object.keys(patch).length) await client.patch(doc._id).set(patch).commit()
}

// ── 2. ABOUT CONTENT ─────────────────────────────────────────────────────────
async function translateAbout() {
  console.log('\n📄  aboutContent')
  const doc = await client.fetch(`*[_type == "aboutContent"][0]`)
  if (!doc) { console.log('   (not found)'); return }

  const patch = {}

  if (!doc.headingEn && doc.heading) {
    const en = await translate(doc.heading, 'main heading on the photographer\'s about page')
    patch.headingEn = en
    console.log(done('headingEn', en))
    await sleep(200)
  } else console.log(exists('headingEn'))

  if (!doc.ctaTextEn && doc.ctaText) {
    const en = await translate(doc.ctaText, 'CTA button on the photographer\'s about page')
    patch.ctaTextEn = en
    console.log(done('ctaTextEn', en))
    await sleep(200)
  } else console.log(exists('ctaTextEn'))

  if ((!doc.paragraphsEn || doc.paragraphsEn.length === 0) && doc.paragraphs?.length) {
    const en = await translateArray(doc.paragraphs, 'body paragraph on photographer\'s about page')
    patch.paragraphsEn = en
    console.log(done('paragraphsEn', en))
    await sleep(200)
  } else console.log(exists('paragraphsEn'))

  if (Object.keys(patch).length) await client.patch(doc._id).set(patch).commit()
}

// ── 3. SERVICE CONFIGS ────────────────────────────────────────────────────────
async function translateServiceConfigs() {
  console.log('\n📄  serviceConfig (6 documents)')
  const docs = await client.fetch(`*[_type == "serviceConfig"] | order(serviceKey)`)

  for (const doc of docs) {
    console.log(`\n  [${doc.serviceKey}] ${doc.displayName}`)
    const patch = {}

    const stringFields = [
      ['displayName',          'displayNameEn',          'photography service category name'],
      ['introText',            'introTextEn',            'intro paragraph for a photography service type'],
      ['infoCardHeading',      'infoCardHeadingEn',      'info card heading on photography service page'],
      ['infoCardContent',      'infoCardContentEn',      'info card body text on photography service page'],
      ['customBlockHeading',   'customBlockHeadingEn',   'accent block heading on photography service page'],
      ['customBlockContent',   'customBlockContentEn',   'accent block content on photography service page'],
      ['globalBenefitsHeading','globalBenefitsHeadingEn','heading for section listing what\'s included in all packages'],
      ['globalBenefitsText',   'globalBenefitsTextEn',   'text listing inclusions in all photography packages'],
      ['processTitle',         'processTitleEn',         'heading for the photography booking process section'],
      ['ctaButtonText',        'ctaButtonTextEn',        'CTA button text on photography service page'],
    ]

    for (const [esField, enField, ctx] of stringFields) {
      if (!doc[esField]) { console.log(skip(enField)); continue }
      if (doc[enField]) { console.log(exists(enField)); continue }
      const en = await translate(doc[esField], ctx)
      patch[enField] = en
      console.log(done(enField, en))
      await sleep(200)
    }

    // complementos[] nested items
    if (doc.complementos?.length) {
      const needsUpdate = doc.complementos.some((c) => c.name && !c.nameEn)
      if (needsUpdate) {
        const updated = []
        for (const item of doc.complementos) {
          const nameEn = item.nameEn || (item.name ? await translate(item.name, 'photography session add-on name') : null)
          const noteEn = item.noteEn || (item.note ? await translate(item.note, 'short note on a photography add-on service') : null)
          updated.push({ ...item, nameEn, noteEn })
          await sleep(150)
        }
        patch.complementos = updated
        console.log(done('complementos', `array(${updated.length})`))
      } else console.log(exists('complementos'))
    }

    // processSteps[] nested items
    if (doc.processSteps?.length) {
      const needsUpdate = doc.processSteps.some((s) => s.heading && !s.headingEn)
      if (needsUpdate) {
        const updated = []
        for (const step of doc.processSteps) {
          const headingEn = step.headingEn || (step.heading ? await translate(step.heading, 'step heading in the photography booking/session process') : null)
          const descriptionEn = step.descriptionEn || (step.description ? await translate(step.description, 'step description in the photography booking process') : null)
          updated.push({ ...step, headingEn, descriptionEn })
          await sleep(150)
        }
        patch.processSteps = updated
        console.log(done('processSteps', `array(${updated.length})`))
      } else console.log(exists('processSteps'))
    }

    if (Object.keys(patch).length) await client.patch(doc._id).set(patch).commit()
  }
}

// ── 4. SERVICE PACKAGES ───────────────────────────────────────────────────────
async function translateServicePackages() {
  console.log('\n📄  servicePackage (all)')
  const docs = await client.fetch(`*[_type == "servicePackage"] | order(category, displayOrder)`)
  console.log(`   Found ${docs.length} packages\n`)

  for (const doc of docs) {
    console.log(`  [${doc.category}] ${doc.name}`)
    const patch = {}

    const stringFields = [
      ['name',         'nameEn',         'photography package tier name (e.g. Essential, Premium)'],
      ['pricePrefix',  'pricePrefixEn',  'short text before the price, e.g. "Starting at"'],
      ['description',  'descriptionEn',  'one-line subtitle on a photography package card'],
      ['bodyText',     'bodyTextEn',     'narrative paragraph(s) describing a photography package'],
      ['badgeLabel',   'badgeLabelEn',   'badge label on a photography package (e.g. "Most Popular")'],
      ['ctaText',      'ctaTextEn',      'call-to-action button text on a photography package'],
      ['deliverables', 'deliverablesEn', 'deliverables/what\'s included text for a photography package'],
    ]

    for (const [esField, enField, ctx] of stringFields) {
      if (!doc[esField]) { console.log(skip(enField)); continue }
      if (doc[enField]) { console.log(exists(enField)); continue }
      const en = await translate(doc[esField], ctx)
      patch[enField] = en
      console.log(done(enField, en))
      await sleep(200)
    }

    // features[]
    if (doc.features?.length && (!doc.featuresEn || doc.featuresEn.length === 0)) {
      const en = await translateArray(doc.features, 'bullet-point feature on a photography package')
      patch.featuresEn = en
      console.log(done('featuresEn', en))
    } else if (doc.featuresEn?.length) console.log(exists('featuresEn'))

    // addOns[] nested
    if (doc.addOns?.length) {
      const needsUpdate = doc.addOns.some((a) => a.name && !a.nameEn)
      if (needsUpdate) {
        const updated = []
        for (const addOn of doc.addOns) {
          const nameEn = addOn.nameEn || (addOn.name ? await translate(addOn.name, 'photography session add-on option name') : null)
          updated.push({ ...addOn, nameEn })
          await sleep(150)
        }
        patch.addOns = updated
        console.log(done('addOns', `array(${updated.length})`))
      } else console.log(exists('addOns'))
    }

    if (Object.keys(patch).length) await client.patch(doc._id).set(patch).commit()
    await sleep(200)
  }
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🌐  Sanity ES → EN Translation')
  console.log('    Project: qmeztasz / production')
  console.log('    Model:   claude-haiku-4-5-20251001')
  console.log('    Mode:    skip existing translations\n')

  try {
    await translateHomepage()
    await translateAbout()
    await translateServiceConfigs()
    await translateServicePackages()
    console.log('\n✅  All translations complete and saved to Sanity!')
    console.log('    Toggle EN on the live site to verify the results.')
  } catch (err) {
    console.error('\n❌  Translation failed:', err.message)
    process.exit(1)
  }
}

main()
