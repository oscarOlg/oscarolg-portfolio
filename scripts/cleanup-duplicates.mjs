#!/usr/bin/env node

/**
 * Cleanup Duplicate Portfolio Images
 * Removes duplicate portfolio images from Sanity
 * Keeps the first occurrence, deletes subsequent duplicates
 * Run: npm run cleanup-duplicates
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

async function cleanupDuplicates() {
  try {
    console.log('🧹 Starting duplicate cleanup...\n')

    // Fetch all portfolio images
    const query = `*[_type == "portfolioImage"] | order(_createdAt desc) {
      _id,
      title,
      category,
      image {
        asset-> {
          _id
        }
      }
    }`

    const images = await client.fetch(query)
    console.log(`📊 Found ${images.length} total images\n`)

    // Track seen images to identify duplicates
    const seen = new Map() // key: "category-title", value: _id
    const duplicates = []

    for (const image of images) {
      const key = `${image.category}-${image.title}`

      if (seen.has(key)) {
        // This is a duplicate
        duplicates.push({
          _id: image._id,
          title: image.title,
          category: image.category,
        })
      } else {
        // First occurrence, keep it
        seen.set(key, image._id)
      }
    }

    if (duplicates.length === 0) {
      console.log('✅ No duplicates found! Your portfolio is clean.\n')
      return
    }

    console.log(`🔍 Found ${duplicates.length} duplicate images:\n`)
    duplicates.forEach((img) => {
      console.log(`   • ${img.category} - ${img.title}`)
    })
    console.log()

    // Delete duplicates
    console.log('🗑️  Deleting duplicates...\n')
    for (const duplicate of duplicates) {
      await client.delete(duplicate._id)
      console.log(`   ✅ Deleted: ${duplicate.title}`)
    }

    console.log(`\n${'='.repeat(50)}`)
    console.log('✨ Cleanup complete!\n')
    console.log(`📋 Summary:`)
    console.log(`   Total duplicates removed: ${duplicates.length}`)
    console.log(`   Remaining images: ${images.length - duplicates.length}\n`)
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message)
    process.exit(1)
  }
}

cleanupDuplicates()
