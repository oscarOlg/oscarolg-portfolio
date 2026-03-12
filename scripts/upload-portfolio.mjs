#!/usr/bin/env node

/**
 * Portfolio Image Upload Script
 * Reads images from portfolio-images/ folder structure
 * Uploads to Sanity with automatic categorization and date-based ordering
 * Run: npm run upload-portfolio
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

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

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const portfolioImagesDir = path.join(process.cwd(), 'portfolio-images')

// Valid image extensions
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']

// Helper function to read files recursively
function getImageFiles(dir) {
  const images = []

  function walkDir(currentPath, category) {
    const files = fs.readdirSync(currentPath, { withFileTypes: true })

    for (const file of files) {
      const fullPath = path.join(currentPath, file.name)

      if (file.isDirectory()) {
        // Recurse into subdirectories
        walkDir(fullPath, file.name)
      } else if (file.isFile()) {
        const ext = path.extname(file.name).toLowerCase()
        if (imageExtensions.includes(ext)) {
          const stats = fs.statSync(fullPath)
          images.push({
            path: fullPath,
            name: file.name,
            category: category,
            modified: stats.mtime.getTime(),
            size: stats.size,
          })
        }
      }
    }
  }

  // Start walking from portfolio-images
  const categories = fs.readdirSync(dir, { withFileTypes: true }).filter((f) => f.isDirectory())

  for (const category of categories) {
    walkDir(path.join(dir, category.name), category.name)
  }

  return images
}

// Helper to upload image to Sanity and return asset reference
async function uploadImage(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath)
    const fileName = path.basename(imagePath)

    const asset = await client.assets.upload('image', imageBuffer, {
      filename: fileName,
    })

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  } catch (error) {
    console.error(`❌ Failed to upload image ${imagePath}:`, error.message)
    return null
  }
}

// Helper to generate display title from filename
function generateTitle(filename, category) {
  const nameWithoutExt = path.parse(filename).name
  // Convert DSCF0016 to something more readable
  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1)
  return `${capitalizedCategory} - ${nameWithoutExt}`
}

async function uploadPortfolioImages() {
  try {
    // Check for API token
    if (!process.env.SANITY_API_TOKEN) {
      console.error('❌ SANITY_API_TOKEN not found in environment variables')
      console.error('Make sure you have set the token in .env.local')
      process.exit(1)
    }

    console.log('🌱 Starting portfolio image upload...\n')

    // Check if portfolio-images directory exists
    if (!fs.existsSync(portfolioImagesDir)) {
      console.error('❌ portfolio-images directory not found')
      console.error(`Create it at: ${portfolioImagesDir}`)
      process.exit(1)
    }

    // Get all images sorted by date
    console.log('📁 Scanning for images...')
    const images = getImageFiles(portfolioImagesDir)

    if (images.length === 0) {
      console.error('❌ No images found in portfolio-images/')
      console.error('Please add images organized in category folders:')
      console.error('  portfolio-images/')
      console.error('  ├── weddings/')
      console.error('  ├── commercial/')
      console.error('  ├── editorial/')
      console.error('  ├── maternity/')
      console.error('  ├── couples/')
      console.error('  └── individual/')
      process.exit(1)
    }

    // Group images by category and sort by date
    const imagesByCategory = {}
    for (const image of images) {
      if (!imagesByCategory[image.category]) {
        imagesByCategory[image.category] = []
      }
      imagesByCategory[image.category].push(image)
    }

    // Sort each category by modification date
    for (const category in imagesByCategory) {
      imagesByCategory[category].sort((a, b) => a.modified - b.modified)
    }

    console.log(`✅ Found ${images.length} images in ${Object.keys(imagesByCategory).length} categories\n`)

    // Display summary
    console.log('📊 Images by category:')
    for (const [category, imgs] of Object.entries(imagesByCategory)) {
      console.log(`   ${category}: ${imgs.length} images`)
    }
    console.log()

    // Upload images
    let uploadedCount = 0
    let failedCount = 0

    for (const [category, categoryImages] of Object.entries(imagesByCategory)) {
      console.log(`\n📸 Uploading ${category} images (${categoryImages.length})...`)

      for (let i = 0; i < categoryImages.length; i++) {
        const image = categoryImages[i]
        const displayOrder = i + 1

        process.stdout.write(`  [${i + 1}/${categoryImages.length}] Uploading ${image.name}...`)

        try {
          // Upload image asset
          const imageAsset = await uploadImage(image.path)

          if (!imageAsset) {
            console.log(' ❌')
            failedCount++
            continue
          }

          // Create portfolio image document
          const portfolioImage = {
            _type: 'portfolioImage',
            title: generateTitle(image.name, category),
            slug: {
              _type: 'slug',
              current: `${category}-${path.parse(image.name).name.toLowerCase()}`.replace(/[^a-z0-9]+/g, '-'),
            },
            category: category,
            image: imageAsset,
            featured: displayOrder <= 3, // First 3 in each category are featured
            displayOrder: displayOrder,
            location: 'Ciudad Juárez',
          }

          await client.create(portfolioImage)
          console.log(' ✅')
          uploadedCount++
        } catch (error) {
          console.log(` ❌ ${error.message}`)
          failedCount++
        }
      }
    }

    // Summary
    console.log(`\n${'='.repeat(50)}`)
    console.log('🎉 Upload complete!\n')
    console.log('📋 Summary:')
    console.log(`   ✅ Successfully uploaded: ${uploadedCount} images`)
    console.log(`   ❌ Failed: ${failedCount} images`)
    console.log(`   📊 Total: ${uploadedCount + failedCount} images\n`)
    console.log('Next steps:')
    console.log('   1. Visit http://localhost:3000/studio')
    console.log('   2. Check Portfolio Images section')
    console.log('   3. Images are sorted chronologically by upload date')
    console.log('   4. First 3 images per category are marked as featured\n')
  } catch (error) {
    console.error('❌ Upload failed:', error.message)
    process.exit(1)
  }
}

uploadPortfolioImages()
