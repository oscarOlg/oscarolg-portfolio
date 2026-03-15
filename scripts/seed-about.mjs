#!/usr/bin/env node

/**
 * About Page Content Seed Script
 * Seeds the aboutContent document in Sanity with the photographer's bio.
 * Run: npm run seed:about
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

const aboutContent = {
  _type: 'aboutContent',
  _id: 'aboutContent-main',
  heading: 'El enfoque detrás del lente.',
  paragraphs: [
    'Soy Oscar Sanchez, fotógrafo radicado en Ciudad Juárez. Mi trabajo combina atención técnica al detalle con la sensibilidad artística necesaria para documentar lo que más importa: personas, vínculos y los momentos que merecen perdurar.',
    'Me especializo en la fotografía de bodas, retratos y parejas. Entiendo que elegir a la persona que documentará tus memorias es un acto de fe. Por eso, mi promesa principal no es solo entregarte imágenes con calidad estética, sino brindarte confianza y tranquilidad absoluta durante todo el proceso.',
    'Quiero que vivas cada experiencia sabiendo que cada instante irrepetible está en manos seguras. Mi objetivo es simple: transformar la emoción de hoy en un legado visual tangible que te permita volver a vivir el momento.',
  ],
  ctaText: 'Hablemos de tu proyecto',
}

async function seed() {
  console.log('Seeding about page content...\n')

  try {
    const result = await client.createOrReplace(aboutContent)
    console.log(`✅ About content seeded: ${result._id}`)
    console.log(`   Heading: "${result.heading}"`)
    console.log(`   Paragraphs: ${result.paragraphs.length}`)
    console.log(`   CTA: "${result.ctaText}"`)
  } catch (err) {
    console.error('❌ Failed to seed about content:', err.message)
    process.exit(1)
  }
}

seed()
