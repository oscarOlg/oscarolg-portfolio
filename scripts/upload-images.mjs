#!/usr/bin/env node

/**
 * Sanity Image Upload Script
 * Automatically uploads portfolio images from portfolio-images folder to Sanity
 * Run: npm run upload-images
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

async function uploadImage(imagePath, category, displayOrder) {
  try {
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath)
    const fileName = path.basename(imagePath)

    // Upload image to Sanity
    const uploadedImage = await client.assets.upload('image', imageBuffer, {
      filename: fileName,
    })

    // Create portfolio image document
    const portfolioImage = {
      _type: 'portfolioImage',
      title: fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      slug: {
        _type: 'slug',
        current: fileName
          .replace(/\.[^/.]+$/, '')
          .toLowerCase()
          .replace(/\s+/g, '-'),
      },
      description: `Photo from ${category} portfolio`,
      category: category,
      location: 'Ciudad Juárez',
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: uploadedImage._id,
        },
      },
      featured: displayOrder <= 3, // Featured first 3 of each category
      displayOrder: displayOrder,
      publishedAt: new Date().toISOString(),
    }

    const created = await client.create(portfolioImage)
    console.log(`  ✓ ${fileName} (${category})`)
    return created
  } catch (error) {
    console.error(`  ✗ Failed to upload ${imagePath}:`, error.message)
    return null
  }
}

async function uploadAllImages() {
  try {
    // Check for API token
    if (!process.env.SANITY_API_TOKEN) {
      console.error('❌ SANITY_API_TOKEN not found in environment variables')
      console.error('Make sure you have set the token in .env.local')
      process.exit(1)
    }

    const portfolioImagesPath = path.join(process.cwd(), 'portfolio-images')

    if (!fs.existsSync(portfolioImagesPath)) {
      console.error('❌ portfolio-images folder not found')
      console.error(`Expected at: ${portfolioImagesPath}`)
      process.exit(1)
    }

    console.log('🌱 Starting image upload process...\n')

    // Get all category folders
    const categories = fs
      .readdirSync(portfolioImagesPath)
      .filter((file) => fs.statSync(path.join(portfolioImagesPath, file)).isDirectory())

    let totalUploaded = 0

    for (const category of categories) {
      const categoryPath = path.join(portfolioImagesPath, category)
      const files = fs
        .readdirSync(categoryPath)
        .filter((file) =>
          ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase())
        )
        .sort()

      if (files.length === 0) {
        console.log(`📁 ${category}: No images found`)
        continue
      }

      console.log(`📸 Uploading ${category} (${files.length} images)...`)

      for (let i = 0; i < files.length; i++) {
        const filePath = path.join(categoryPath, files[i])
        const displayOrder = i + 1
        const result = await uploadImage(filePath, category, displayOrder)
        if (result) totalUploaded++

        // Add small delay between uploads to avoid rate limiting
        if (i < files.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500))
        }
      }

      console.log(`✅ ${category}: ${files.length} images uploaded\n`)
    }

    console.log('🎉 Image upload complete!')
    console.log(`\n📋 Summary: ${totalUploaded} total images uploaded to Sanity`)
    console.log('\n💡 Next steps:')
    console.log('   1. Visit http://localhost:3000/studio')
    console.log('   2. Verify all images are in Portfolio Image collection')
    console.log('   3. Edit any titles or descriptions as needed')
    console.log('   4. Featured images are marked automatically (first 3 per category)\n')
  } catch (error) {
    console.error('❌ Upload failed:', error.message)
    process.exit(1)
  }
}

uploadAllImages()
