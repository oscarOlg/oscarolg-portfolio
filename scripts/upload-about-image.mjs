#!/usr/bin/env node

/**
 * About Page Profile Image Upload Script
 * Uploads the profile photo from portfolio-images/about/ to Sanity
 * and links it to the aboutContent document.
 * Run: npm run upload:about-image
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

const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp']
const aboutImagesDir = path.join(process.cwd(), 'portfolio-images', 'about')

async function upload() {
  // Find the image file
  if (!fs.existsSync(aboutImagesDir)) {
    console.error(`❌ Directory not found: ${aboutImagesDir}`)
    process.exit(1)
  }

  const files = fs.readdirSync(aboutImagesDir).filter((f) =>
    imageExtensions.includes(path.extname(f).toLowerCase())
  )

  if (files.length === 0) {
    console.error(`❌ No image files found in ${aboutImagesDir}`)
    process.exit(1)
  }

  const filename = files[0]
  const filePath = path.join(aboutImagesDir, filename)
  console.log(`Uploading profile image: ${filename}\n`)

  try {
    // Upload image asset to Sanity
    const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
      filename,
      contentType: `image/${path.extname(filename).slice(1).replace('jpg', 'jpeg')}`,
    })

    console.log(`✅ Image uploaded: ${asset._id}`)
    console.log(`   URL: ${asset.url}`)

    // Patch the aboutContent document to reference this image
    await client
      .patch('aboutContent-main')
      .set({
        mainImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
          hotspot: { x: 0.5, y: 0.3, height: 0.6, width: 0.6 },
        },
      })
      .commit()

    console.log('✅ aboutContent document updated with new profile image')
  } catch (err) {
    console.error('❌ Upload failed:', err.message)
    process.exit(1)
  }
}

upload()
