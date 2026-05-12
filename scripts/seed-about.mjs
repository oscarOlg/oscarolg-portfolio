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
    'Soy Oscar, la persona detrás de la lente en Oscar Olg Photography. Trabajo desde Ciudad Juárez con una especialidad clara: fotografía editorial de bodas, retratos y parejas, con un proceso diseñado para que se sientan acompañados de principio a fin.',
    'Mi camino hacia la fotografía tiene un origen distinto. Estudié Ingeniería en Mecatrónica y trabajé como desarrollador web. Aunque siempre me había gustado la fotografía, fue en 2021 cuando decidí dedicarme seriamente a este arte. Esa etapa no fue en vano; mi formación técnica me dejó una rigurosa atención al detalle y una mente analítica que hoy aplico para cuidar cada aspecto visual de su evento.',
    'Por naturaleza, soy una persona introvertida. La cámara ha sido la herramienta perfecta para salir de mi zona de confort, acercarme a las personas y conocer sus historias. Esta forma de ser es precisamente la que define mi estilo de trabajo: no busco intervenir cada segundo ni forzar poses. Prefiero observar y crear un espacio tranquilo para que ustedes vivan su día con libertad, mientras yo documento lo esencial con intención editorial.',
    'Esa conexión me ha llevado a disfrutar retratar a las personas en todas sus facetas, desde la cercanía de un retrato individual hasta los momentos irrepetibles de un gran evento. Al final, mi propósito va mucho más allá de los ajustes técnicos de la cámara; me enfoco en sus emociones y en lograr que vean reflejado justo lo que querían mostrar en sus fotografías.',
    'Creo en una fotografía natural, elegante y profundamente humana. Desde nuestra primera conversación, mi objetivo es brindarles claridad, acompañamiento y tranquilidad total para que disfruten su proceso sin estrés. Mi promesa no es solo entregar imágenes estéticas, sino transformar la emoción del presente en un legado visual tangible, con la certeza de que cada instante irrepetible está en manos seguras.',
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
