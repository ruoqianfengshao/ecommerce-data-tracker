#!/usr/bin/env node

/**
 * Generate manifest.json from product data files
 * This script scans the public/data/products/ directory
 * and creates a manifest with all available dates
 */

import { readdirSync, writeFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PRODUCTS_DIR = join(__dirname, 'public/data/products');
const MANIFEST_PATH = join(__dirname, 'public/data/manifest.json');

try {
  // Read all JSON files in products directory
  const files = readdirSync(PRODUCTS_DIR)
    .filter(file => file.endsWith('.json'))
    .filter(file => /^\d{4}-\d{2}-\d{2}\.json$/.test(file)); // Match YYYY-MM-DD.json

  // Extract dates and sort (newest first)
  const dates = files
    .map(file => file.replace('.json', ''))
    .sort((a, b) => new Date(b) - new Date(a));

  // Get file stats for each date
  const dateInfo = dates.map(date => {
    const filePath = join(PRODUCTS_DIR, `${date}.json`);
    const stats = statSync(filePath);
    return {
      date,
      fileSize: stats.size,
      lastModified: stats.mtime.toISOString()
    };
  });

  // Create manifest
  const manifest = {
    version: '1.0',
    generatedAt: new Date().toISOString(),
    totalDates: dates.length,
    dates,
    dateInfo,
    latestDate: dates[0] || null,
    oldestDate: dates[dates.length - 1] || null
  };

  // Write manifest
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  console.log('✅ Manifest generated successfully!');
  console.log(`📅 Found ${dates.length} dates:`);
  dates.forEach(date => console.log(`   - ${date}`));
  console.log(`📄 Manifest saved to: ${MANIFEST_PATH}`);

} catch (error) {
  console.error('❌ Error generating manifest:', error.message);
  process.exit(1);
}
