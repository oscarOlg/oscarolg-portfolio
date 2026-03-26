#!/usr/bin/env node

/**
 * Homepage Content Seed Script
 * Seeds the homepageContent document in Sanity with all page text.
 * Run: npm run seed:homepage
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

// Load environment variables from .env.local
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

const client = createClient({
  projectId: 'qmeztasz',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-03-01',
})

const homepageContent = {
  _type: 'homepageContent',
  _id: 'homepageContent-main',

  // Hero
  heroHeading: 'No eres modelo',
  heroHeadingItalic: 'aquí no necesitas serlo',
  heroCta1Text: 'Ver mi portafolio',
  heroCta2Text: 'Cotizar sesión',

  // Mi Trabajo section
  workSectionHeading: 'Mi Trabajo',
  workSectionSubtitle: 'Explora por tipo de sesión',
  workSectionViewMoreText: 'Ver más →',
  workSectionViewAllText: 'Ver todo el portafolio →',

  // Investment / Trust section
  investmentHeading: 'La tranquilidad de estar en buenas manos.',
  investmentParagraph1:
    'Mi objetivo es transformar instantes efímeros en recuerdos tangibles. Te ofrezco calidad estética, calidez humana y tranquilidad absoluta para documentar los capítulos más importantes de tu vida.',
  investmentParagraph2:
    'Sé que planear un evento requiere tiempo y dedicación. Por eso, mi enfoque es brindarte la confianza de que tu historia será capturada con cuidado y profesionalismo. Encuentra opciones claras y diseñadas para adaptarse a tu visión, permitiéndote enfocarte únicamente en disfrutar.',
  investmentCtaText: 'Conocer paquetes y precios',

  // Final CTA
  finalCtaHeading: '¿Listo para crear algo hermoso e irrepetible?',
  finalCtaLocation: 'Ciudad Juárez & México',
  finalCtaButtonText: 'Reservar fecha',
}

async function seed() {
  console.log('Seeding homepage content...\n')

  try {
    const result = await client.createOrReplace(homepageContent)
    console.log(`✅ Homepage content seeded: ${result._id}`)
    console.log(`   Hero heading: "${result.heroHeading} ${result.heroHeadingItalic}"`)
    console.log(`   Investment heading: "${result.investmentHeading}"`)
    console.log(`   Final CTA: "${result.finalCtaHeading}"`)
  } catch (err) {
    console.error('❌ Failed to seed homepage content:', err.message)
    process.exit(1)
  }
}

seed()
