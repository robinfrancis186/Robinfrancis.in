#!/usr/bin/env node
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const imageDirs = [
  'public/images',
  'public/images/about',
  'public/images/projects',
  'public/images/blog',
  'public/images/blog/blog2',
];

async function optimizeImages() {
  let converted = 0;
  let skipped = 0;
  let errors = 0;

  console.log('🖼️  Starting image optimization...\n');

  for (const dir of imageDirs) {
    const fullPath = path.join(rootDir, dir);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Directory not found: ${dir}`);
      continue;
    }

    const files = fs.readdirSync(fullPath);
    const imageFiles = files.filter(f => 
      /\.(png|jpg|jpeg)$/i.test(f) && !f.startsWith('.')
    );

    for (const file of imageFiles) {
      const inputPath = path.join(fullPath, file);
      const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      
      // Skip if WebP already exists
      if (fs.existsSync(outputPath)) {
        skipped++;
        continue;
      }

      try {
        const stats = fs.statSync(inputPath);
        const originalSize = (stats.size / 1024).toFixed(2);

        await sharp(inputPath)
          .webp({ quality: 85, effort: 6 })
          .toFile(outputPath);
        
        const newStats = fs.statSync(outputPath);
        const newSize = (newStats.size / 1024).toFixed(2);
        const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);

        console.log(`✅ ${file}`);
        console.log(`   ${originalSize}KB → ${newSize}KB (${savings}% smaller)\n`);
        converted++;
      } catch (err) {
        console.error(`❌ Failed: ${file}`, err.message);
        errors++;
      }
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   ✅ Converted: ${converted}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log('\n✨ Image optimization complete!\n');
}

optimizeImages().catch(console.error);
