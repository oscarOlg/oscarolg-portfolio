#!/usr/bin/env node

/**
 * Unified imagery uploader for all site sections.
 *
 * Preferred folder strategy under portfolio-images/:
 * - portfolio/<category>/*
 * - services/<section>/*
 * - home/<section>/*
 * - lead-magnets/<campaign-slug>/<section>/*
 * - contact/*
 * - about/*
 *
 * Legacy aliases still supported:
 * - homepage/<section>/*
 * - testimonials/*
 *
 * Usage:
 *   npm run upload:imagery -- --apply
 *   npm run upload:imagery            # dry-run preview
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const rootDir = process.cwd()
const imageryDir = path.join(rootDir, 'portfolio-images')
const envPath = path.join(rootDir, '.env.local')
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])
const validCategories = new Set(['weddings', 'portraits', 'couples', 'commercial', 'editorial', 'maternity'])

const args = new Set(process.argv.slice(2))
const apply = args.has('--apply')

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return
  const env = fs.readFileSync(filePath, 'utf8')
  env.split('\n').forEach((line) => {
    const [key, ...parts] = line.split('=')
    if (!key || key.startsWith('#')) return
    const value = parts.join('=').trim().replace(/^['"]|['"]$/g, '')
    process.env[key.trim()] = value
  })
}

loadEnvFile(envPath)

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-03-01',
})

if (!client.config().projectId || !process.env.SANITY_API_TOKEN) {
  console.error('Missing Sanity config or SANITY_API_TOKEN in .env.local')
  process.exit(1)
}

function slugify(input) {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function walkFiles(baseDir) {
  const files = []
  function walk(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(current, entry.name)
      if (entry.isDirectory()) {
        walk(full)
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase()
        if (imageExtensions.has(ext)) {
          files.push(full)
        }
      }
    }
  }
  walk(baseDir)
  return files
}

function inferMetadata(absPath) {
  const relative = path.relative(imageryDir, absPath).replace(/\\/g, '/')
  const parts = relative.split('/').filter(Boolean)

  const fileName = parts[parts.length - 1]
  const stem = path.parse(fileName).name
  const top = parts[0] || 'general'
  const second = parts[1] || ''
  const third = parts[2] || ''

  let usageScope = 'general'
  let usageSection = ''
  let category = 'weddings'

  if (validCategories.has(top)) {
    usageScope = 'portfolio'
    usageSection = 'portfolio_grid'
    category = top
  } else if (top === 'portfolio') {
    usageScope = 'portfolio'
    usageSection = 'portfolio_grid'
    category = validCategories.has(second) ? second : 'weddings'
  } else if (top === 'services') {
    usageScope = 'services'
    usageSection = second || 'services_general'
    category = validCategories.has(second) ? second : 'weddings'
  } else if (top === 'home' || top === 'homepage') {
    usageScope = 'homepage'
    usageSection = second || 'homepage_general'
    category = validCategories.has(second) ? second : 'weddings'
  } else if (top === 'lead-magnets' || top === 'landing') {
    usageScope = 'landing'
    if (top === 'lead-magnets') {
      usageSection = second ? `${second}_${third || 'general'}` : 'landing_general'
    } else {
      usageSection = second || 'landing_general'
    }
    category = 'weddings'
  } else if (top === 'testimonials') {
    if (second === 'services') {
      usageScope = 'services'
      usageSection = 'testimonial-proof'
    } else if (second === 'homepage' || second === 'home') {
      usageScope = 'homepage'
      usageSection = 'homepage_testimonials'
    } else {
      usageScope = 'homepage'
      usageSection = 'homepage_testimonials'
    }
    category = 'weddings'
  } else if (top === 'about') {
    usageScope = 'about'
    usageSection = second || 'about_general'
    category = 'weddings'
  } else if (top === 'contact') {
    usageScope = 'contact'
    usageSection = second || 'contact_general'
    category = 'weddings'
  }

  const titlePrefix = usageScope === 'portfolio' ? `Portfolio ${category}` : `${usageScope} ${usageSection}`
  const title = `${titlePrefix} - ${stem}`

  const slugBase = slugify(`${top}-${second}-${stem}`)
  const slug = slugBase || slugify(stem)

  return {
    relative,
    title,
    slug,
    category,
    usageScope,
    usageSection,
    usageTags: [usageScope, usageSection, category].filter(Boolean),
  }
}

async function uploadOne(absPath) {
  const meta = inferMetadata(absPath)
  const fileBuffer = fs.readFileSync(absPath)

  if (!apply) {
    return { meta, dryRun: true }
  }

  const asset = await client.assets.upload('image', fileBuffer, {
    filename: path.basename(absPath),
  })

  const docId = `portfolioImage.${meta.slug}`
  const doc = {
    _id: docId,
    _type: 'portfolioImage',
    title: meta.title,
    slug: { _type: 'slug', current: meta.slug },
    category: meta.category,
    usageScope: meta.usageScope,
    usageSection: meta.usageSection,
    usageTags: meta.usageTags,
    sourcePath: meta.relative,
    image: {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
    },
    featured: meta.usageScope === 'portfolio',
    publishedAt: new Date().toISOString(),
  }

  await client.createOrReplace(doc)
  return { meta, dryRun: false, docId }
}

async function main() {
  if (!fs.existsSync(imageryDir)) {
    console.error(`Missing folder: ${imageryDir}`)
    process.exit(1)
  }

  const files = walkFiles(imageryDir)
  if (files.length === 0) {
    console.error('No images found under portfolio-images/.')
    process.exit(1)
  }

  console.log(`Found ${files.length} image(s). Mode: ${apply ? 'APPLY' : 'DRY-RUN'}`)

  const grouped = new Map()
  files.forEach((f) => {
    const meta = inferMetadata(f)
    const key = `${meta.usageScope}:${meta.usageSection}`
    grouped.set(key, (grouped.get(key) || 0) + 1)
  })

  console.log('\nPlanned upload groups:')
  for (const [key, count] of grouped.entries()) {
    console.log(`  - ${key} => ${count}`)
  }

  let success = 0
  let failed = 0
  for (const file of files) {
    try {
      const res = await uploadOne(file)
      success += 1
      if (!apply) {
        console.log(`DRY  ${res.meta.relative} -> ${res.meta.usageScope}/${res.meta.usageSection}`)
      } else {
        console.log(`OK   ${res.meta.relative} -> ${res.docId}`)
      }
    } catch (error) {
      failed += 1
      console.error(`FAIL ${path.relative(imageryDir, file)}: ${error.message}`)
    }
  }

  console.log(`\nDone. Success: ${success}, Failed: ${failed}`)
  if (!apply) {
    console.log('Re-run with --apply to perform the upload.')
  }
}

main().catch((err) => {
  console.error('Upload process failed:', err)
  process.exit(1)
})
