#!/usr/bin/env node

/**
 * Archive non-wedding content in Sanity.
 *
 * Default mode is dry-run. Use --apply to commit changes.
 *
 * Archives:
 * - serviceConfig where serviceKey != "weddings"
 * - servicePackage where category != "weddings"
 * - portfolioImage where category != "weddings"
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, 'utf8');
  env.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split('=');
    if (key && !key.startsWith('#')) {
      const value = valueParts.join('=').trim().replace(/^['"]|['"]$/g, '');
      process.env[key.trim()] = value;
    }
  });
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-03-01',
  useCdn: false,
});

const shouldApply = process.argv.includes('--apply');
const archivedAt = new Date().toISOString();

const queries = {
  serviceConfigs: '*[_type == "serviceConfig" && serviceKey != "weddings"]{_id, _type, serviceKey}',
  servicePackages: '*[_type == "servicePackage" && category != "weddings"]{_id, _type, category, name}',
  portfolioImages: '*[_type == "portfolioImage" && category != "weddings"]{_id, _type, category, title}',
};

function logGroup(title, docs) {
  console.log(`\n${title}: ${docs.length}`);
  docs.slice(0, 8).forEach((doc) => {
    const label = doc.name || doc.title || doc.serviceKey || doc.category || doc._id;
    console.log(`  - ${doc._id} (${label})`);
  });
  if (docs.length > 8) {
    console.log(`  ... and ${docs.length - 8} more`);
  }
}

async function run() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('SANITY_API_TOKEN is missing. Add it to .env.local.');
    process.exit(1);
  }

  const [serviceConfigs, servicePackages, portfolioImages] = await Promise.all([
    client.fetch(queries.serviceConfigs),
    client.fetch(queries.servicePackages),
    client.fetch(queries.portfolioImages),
  ]);

  const allDocs = [...serviceConfigs, ...servicePackages, ...portfolioImages];

  console.log('Wedding-only archive tool');
  console.log(`Mode: ${shouldApply ? 'APPLY' : 'DRY RUN'}`);

  logGroup('Non-wedding service configs', serviceConfigs);
  logGroup('Non-wedding service packages', servicePackages);
  logGroup('Non-wedding portfolio images', portfolioImages);

  if (allDocs.length === 0) {
    console.log('\nNo non-wedding documents found. Nothing to archive.');
    return;
  }

  if (!shouldApply) {
    console.log('\nDry run complete. Re-run with --apply to persist archive flags.');
    return;
  }

  const tx = client.transaction();
  for (const doc of allDocs) {
    tx.patch(doc._id, {
      set: {
        archived: true,
        archiveScope: 'business-pivot-wedding-only',
        archivedAt,
      },
    });
  }

  await tx.commit();
  console.log(`\nArchived ${allDocs.length} documents.`);
}

run().catch((error) => {
  console.error('Failed to archive non-wedding content:', error.message);
  process.exit(1);
});
