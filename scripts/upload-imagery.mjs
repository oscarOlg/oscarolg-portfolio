#!/usr/bin/env node

/**
 * Unified imagery uploader for site sections.
 *
 * Canonical folder structure under portfolio-images/:
 * - portfolio/<category>/
 * - services/<section>/
 * - home/carousel/
 * - home/grid/
 * - home/testimonial/
 * - home/investment/
 * - about/profile/
 * - contact/hero/
 * - lead-magnets/<campaign-slug>/strip/
 *
 * Legacy aliases are supported for migration only.
 *
 * Usage:
 *   npm run upload:imagery -- --apply
 *   npm run upload:imagery -- --clean --apply
 *   npm run upload:imagery
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const rootDir = process.cwd()
const imageryDir = path.join(rootDir, 'portfolio-images')
const envPath = path.join(rootDir, '.env.local')
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])
const validCategories = new Set(['weddings', 'portraits', 'couples', 'commercial', 'editorial', 'maternity'])
const cleanableScopes = ['homepage', 'portfolio', 'services', 'landing', 'about', 'contact']

const args = new Set(process.argv.slice(2))
const apply = args.has('--apply')
const clean = args.has('--clean')

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

function normalizeHomeSection(section) {
	const canonical = {
		hero: 'carousel',
		carousel: 'carousel',
		sections: 'grid',
		grid: 'grid',
		testimonials: 'testimonial',
		testimonial: 'testimonial',
		investment: 'investment',
	}

	return canonical[section] || section || 'home_general'
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

	if (top === 'portfolio') {
		usageScope = 'portfolio'
		usageSection = 'portfolio_grid'
		category = validCategories.has(second) ? second : 'weddings'
	} else if (top === 'services') {
		usageScope = 'services'
		usageSection = second || 'services_general'
		category = validCategories.has(second) ? second : 'weddings'
	} else if (top === 'home' || top === 'homepage') {
		usageScope = 'homepage'
		usageSection = normalizeHomeSection(second)
		category = 'weddings'
	} else if (top === 'lead-magnets' || top === 'landing') {
		usageScope = 'landing'
		usageSection = second ? `${second}_${third || 'strip'}` : 'landing_general'
		category = 'weddings'
	} else if (top === 'about') {
		usageScope = 'about'
		usageSection = second || 'profile'
		category = 'weddings'
	} else if (top === 'contact') {
		usageScope = 'contact'
		usageSection = second || 'hero'
		category = 'weddings'
	} else if (top === 'hero' || top === 'carousel') {
		usageScope = 'homepage'
		usageSection = 'carousel'
		category = 'weddings'
	} else if (top === 'grid' || top === 'sections') {
		usageScope = 'homepage'
		usageSection = 'grid'
		category = 'weddings'
	} else if (top === 'testimonial' || top === 'testimonials') {
		usageScope = 'homepage'
		usageSection = 'testimonial'
		category = 'weddings'
	} else if (top === 'investment') {
		usageScope = 'homepage'
		usageSection = 'investment'
		category = 'weddings'
	}

	const titlePrefix = usageScope === 'portfolio' ? `Portfolio ${category}` : `${usageScope} ${usageSection}`
	const title = `${titlePrefix} - ${stem}`

	const slugBase = slugify(`${top}-${second}-${third}-${stem}`)
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

async function cleanupExistingDocs(scopes) {
	const uniqueScopes = Array.from(new Set(scopes)).filter(Boolean)
	if (uniqueScopes.length === 0) {
		return
	}

	const ids = await client.fetch(
		'*[_type == "portfolioImage" && usageScope in $scopes]._id',
		{ scopes: uniqueScopes }
	)

	if (!ids.length) {
		return
	}

	console.log(`Cleaning ${ids.length} existing Sanity image doc(s)...`)
	for (const id of ids) {
		await client.delete(id)
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

	// Fetch full asset to get metadata (dimensions, aspectRatio)
	const fullAsset = await client.fetch(`*[_id == $id][0]`, { id: asset._id })
	const aspectRatio = fullAsset?.metadata?.dimensions?.aspectRatio || 0.75

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
		// Store aspect ratio on document for UI layout
		aspectRatio,
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

	console.log(`Found ${files.length} image(s). Mode: ${apply ? 'APPLY' : 'DRY-RUN'}${clean ? ' + CLEAN' : ''}`)

	const grouped = new Map()
	const scopes = []
	files.forEach((f) => {
		const meta = inferMetadata(f)
		const key = `${meta.usageScope}:${meta.usageSection}`
		grouped.set(key, (grouped.get(key) || 0) + 1)
		scopes.push(meta.usageScope)
	})

	console.log('\nPlanned upload groups:')
	for (const [key, count] of grouped.entries()) {
		console.log(`  - ${key} => ${count}`)
	}

	if (apply && clean) {
		await cleanupExistingDocs(scopes)
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
