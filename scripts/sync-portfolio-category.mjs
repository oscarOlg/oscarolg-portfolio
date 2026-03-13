#!/usr/bin/env node

/**
 * Smart sync for a single portfolio category.
 *
 * Default behavior:
 * - Matches local files to Sanity docs by slug
 * - Updates matching docs in place
 * - Creates new docs for new files
 * - Leaves unmatched remote docs alone
 *
 * Extra modes:
 * - --prune: delete remote docs not present locally
 * - --replace: delete everything in category, then re-upload
 * - --delete-only: delete everything in category
 * - --dry-run: print intended actions without changing Sanity
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const VALID_CATEGORIES = [
  'weddings',
  'portraits',
  'couples',
  'commercial',
  'editorial',
  'maternity',
]

const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']

function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) return

  const env = fs.readFileSync(envPath, 'utf8')
  env.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split('=')
    if (key && !key.startsWith('#')) {
      const value = valueParts.join('=').trim().replace(/^['"]|['"]$/g, '')
      process.env[key.trim()] = value
    }
  })
}

loadEnv()

const client = createClient({
  projectId: 'qmeztasz',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-03-01',
})

function getArgs() {
  const args = process.argv.slice(2)
  const category = args.find((arg) => !arg.startsWith('--'))

  return {
    category,
    replace: args.includes('--replace'),
    prune: args.includes('--prune'),
    dryRun: args.includes('--dry-run'),
    deleteOnly: args.includes('--delete-only'),
  }
}

function validateCategory(category) {
  return typeof category === 'string' && VALID_CATEGORIES.includes(category)
}

function getCategoryDir(category) {
  return path.join(process.cwd(), 'portfolio-images', category)
}

function getImageFiles(dir, category) {
  const images = []

  function walkDir(currentPath) {
    const files = fs.readdirSync(currentPath, { withFileTypes: true })

    for (const file of files) {
      const fullPath = path.join(currentPath, file.name)

      if (file.isDirectory()) {
        walkDir(fullPath)
      } else if (file.isFile()) {
        const ext = path.extname(file.name).toLowerCase()
        if (imageExtensions.includes(ext)) {
          const stats = fs.statSync(fullPath)
          images.push({
            path: fullPath,
            name: file.name,
            category,
            modified: stats.mtime.getTime(),
          })
        }
      }
    }
  }

  walkDir(dir)
  return images.sort((a, b) => a.modified - b.modified)
}

function generateTitle(filename, category) {
  const nameWithoutExt = path.parse(filename).name
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1)
  return `${categoryLabel} - ${nameWithoutExt}`
}

function generateSlug(filename, category) {
  return `${category}-${path.parse(filename).name.toLowerCase()}`.replace(/[^a-z0-9]+/g, '-')
}

async function uploadImageAsset(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath)
  const filename = path.basename(imagePath)
  const asset = await client.assets.upload('image', imageBuffer, { filename })

  return {
    imageField: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    },
    assetId: asset._id,
  }
}

async function fetchExistingCategoryDocs(category) {
  return client.fetch(
    `*[_type == "portfolioImage" && category == $category] | order(displayOrder asc, _createdAt asc) {
      _id,
      title,
      slug,
      description,
      location,
      featured,
      displayOrder,
      publishedAt,
      image {
        asset-> {
          _id
        }
      }
    }`,
    { category }
  )
}

async function deleteAsset(assetId) {
  if (!assetId) return

  try {
    await client.delete(assetId)
  } catch (error) {
    console.warn(`     ↳ Could not delete asset ${assetId}: ${error.message}`)
  }
}

async function deleteDocumentAndAsset(doc, dryRun) {
  if (dryRun) {
    console.log(`   • Would delete: ${doc.title}`)
    return
  }

  await client.delete(doc._id)
  console.log(`   ✓ Deleted document: ${doc.title}`)

  await deleteAsset(doc.image?.asset?._id)
}

async function deleteExistingCategory(category, dryRun) {
  const existingDocs = await fetchExistingCategoryDocs(category)

  if (existingDocs.length === 0) {
    console.log(`ℹ️  No existing ${category} documents found in Sanity.`)
    return
  }

  console.log(`🗑️  Deleting ${existingDocs.length} existing ${category} documents...`)
  for (const doc of existingDocs) {
    await deleteDocumentAndAsset(doc, dryRun)
  }
}

async function smartSyncCategory(category, images, options) {
  const existingDocs = await fetchExistingCategoryDocs(category)
  const existingBySlug = new Map(
    existingDocs
      .filter((doc) => typeof doc.slug?.current === 'string')
      .map((doc) => [doc.slug.current, doc])
  )

  const desiredSlugs = new Set(images.map((image) => generateSlug(image.name, category)))

  let createdCount = 0
  let updatedCount = 0
  let deletedCount = 0

  if (images.length === 0) {
    console.log(`ℹ️  No local images found in portfolio-images/${category}.`)
  }

  for (let index = 0; index < images.length; index++) {
    const image = images[index]
    const displayOrder = index + 1
    const slug = generateSlug(image.name, category)
    const title = generateTitle(image.name, category)
    const existingDoc = existingBySlug.get(slug)

    if (options.dryRun) {
      console.log(
        existingDoc
          ? `   • Would update ${slug} (displayOrder ${displayOrder})`
          : `   • Would create ${slug} (displayOrder ${displayOrder})`
      )
      continue
    }

    process.stdout.write(`   [${displayOrder}/${images.length}] ${image.name}...`)

    try {
      const { imageField, assetId } = await uploadImageAsset(image.path)

      if (existingDoc) {
        await client
          .patch(existingDoc._id)
          .set({
            title,
            slug: {
              _type: 'slug',
              current: slug,
            },
            category,
            image: imageField,
            featured: displayOrder <= 3,
            displayOrder,
            location: existingDoc.location || 'Ciudad Juárez',
            description: existingDoc.description,
            publishedAt: existingDoc.publishedAt || new Date().toISOString(),
          })
          .commit()

        updatedCount++
        console.log(' ♻️')

        const previousAssetId = existingDoc.image?.asset?._id
        if (previousAssetId && previousAssetId !== assetId) {
          await deleteAsset(previousAssetId)
        }
      } else {
        await client.create({
          _type: 'portfolioImage',
          title,
          slug: {
            _type: 'slug',
            current: slug,
          },
          category,
          image: imageField,
          featured: displayOrder <= 3,
          displayOrder,
          location: 'Ciudad Juárez',
          publishedAt: new Date().toISOString(),
        })

        createdCount++
        console.log(' ✅')
      }
    } catch (error) {
      console.log(` ❌ ${error.message}`)
    }
  }

  if (options.prune) {
    const docsToDelete = existingDocs.filter((doc) => !desiredSlugs.has(doc.slug?.current))
    if (docsToDelete.length > 0) {
      console.log(`\n🧹 Pruning ${docsToDelete.length} removed ${category} documents...`)
      for (const doc of docsToDelete) {
        await deleteDocumentAndAsset(doc, options.dryRun)
        deletedCount++
      }
    }
  }

  console.log(`\n📋 Summary:`)
  console.log(`   Created: ${createdCount}`)
  console.log(`   Updated: ${updatedCount}`)
  console.log(`   Deleted: ${deletedCount}`)
}

async function syncCategory() {
  const { category, replace, prune, dryRun, deleteOnly } = getArgs()

  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ SANITY_API_TOKEN not found in environment variables')
    process.exit(1)
  }

  if (!validateCategory(category)) {
    console.error('❌ Missing or invalid category.')
    console.error(`Valid categories: ${VALID_CATEGORIES.join(', ')}`)
    console.error('Examples:')
    console.error('  npm run sync-portfolio-category -- weddings')
    console.error('  npm run sync-portfolio-category -- weddings --prune')
    console.error('  npm run sync-portfolio-category -- weddings --replace')
    console.error('  npm run sync-portfolio-category -- maternity --delete-only')
    console.error('  npm run sync-portfolio-category -- editorial --dry-run')
    process.exit(1)
  }

  const categoryDir = getCategoryDir(category)
  if (!fs.existsSync(categoryDir) && !deleteOnly) {
    console.error(`❌ Folder not found: ${categoryDir}`)
    process.exit(1)
  }

  console.log(`🎞️  Syncing category: ${category}`)
  console.log(`   mode: ${replace ? 'replace' : deleteOnly ? 'delete-only' : 'smart-sync'}`)
  console.log(`   prune: ${prune ? 'yes' : 'no'}`)
  console.log(`   dry-run: ${dryRun ? 'yes' : 'no'}\n`)

  if (replace || deleteOnly) {
    await deleteExistingCategory(category, dryRun)
    console.log()
  }

  if (!deleteOnly) {
    const images = getImageFiles(categoryDir, category)

    if (replace) {
      await smartSyncCategory(category, images, { prune: false, dryRun })
    } else {
      await smartSyncCategory(category, images, { prune, dryRun })
    }
  }

  console.log('\n✨ Category sync complete!')
}

syncCategory().catch((error) => {
  console.error('❌ Category sync failed:', error.message)
  process.exit(1)
})