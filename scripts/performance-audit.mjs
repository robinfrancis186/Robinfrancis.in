#!/usr/bin/env node
/**
 * Performance Audit Script
 * Analyzes build output and provides optimization recommendations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const docsDir = path.join(rootDir, 'docs');
const assetsDir = path.join(docsDir, 'assets');

// Thresholds
const THRESHOLDS = {
  jsChunk: 500 * 1024,      // 500KB
  cssFile: 100 * 1024,      // 100KB
  image: 200 * 1024,        // 200KB
  totalJS: 2 * 1024 * 1024, // 2MB
  totalCSS: 500 * 1024,     // 500KB
};

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function analyzeDirectory(dir, extensions) {
  const files = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }

  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isFile()) {
      const ext = path.extname(item);
      if (extensions.includes(ext)) {
        files.push({
          name: item,
          path: fullPath,
          size: stat.size,
          ext: ext
        });
      }
    }
  }
  
  return files;
}

function analyzeAssets() {
  console.log('🔍 Analyzing build output...\n');
  
  // Check if build exists
  if (!fs.existsSync(docsDir)) {
    console.error('❌ Build directory not found. Run "npm run build" first.\n');
    process.exit(1);
  }

  // Analyze JavaScript
  console.log('📦 JavaScript Bundles:');
  console.log('─'.repeat(60));
  
  const jsFiles = analyzeDirectory(assetsDir, ['.js']);
  const jsFilesWithoutMaps = jsFiles.filter(f => !f.name.endsWith('.map'));
  
  let totalJS = 0;
  let warnings = 0;
  
  jsFilesWithoutMaps
    .sort((a, b) => b.size - a.size)
    .forEach(file => {
      totalJS += file.size;
      const status = file.size > THRESHOLDS.jsChunk ? '⚠️ ' : '✅';
      console.log(`${status} ${file.name.padEnd(40)} ${formatBytes(file.size)}`);
      if (file.size > THRESHOLDS.jsChunk) warnings++;
    });
  
  console.log('─'.repeat(60));
  console.log(`Total JS: ${formatBytes(totalJS)}`);
  if (totalJS > THRESHOLDS.totalJS) {
    console.log(`⚠️  Warning: Total JS exceeds ${formatBytes(THRESHOLDS.totalJS)}`);
    warnings++;
  }
  console.log('');

  // Analyze CSS
  console.log('🎨 CSS Files:');
  console.log('─'.repeat(60));
  
  const cssFiles = analyzeDirectory(assetsDir, ['.css']);
  let totalCSS = 0;
  
  cssFiles
    .sort((a, b) => b.size - a.size)
    .forEach(file => {
      totalCSS += file.size;
      const status = file.size > THRESHOLDS.cssFile ? '⚠️ ' : '✅';
      console.log(`${status} ${file.name.padEnd(40)} ${formatBytes(file.size)}`);
      if (file.size > THRESHOLDS.cssFile) warnings++;
    });
  
  console.log('─'.repeat(60));
  console.log(`Total CSS: ${formatBytes(totalCSS)}`);
  if (totalCSS > THRESHOLDS.totalCSS) {
    console.log(`⚠️  Warning: Total CSS exceeds ${formatBytes(THRESHOLDS.totalCSS)}`);
    warnings++;
  }
  console.log('');

  // Analyze Images
  console.log('🖼️  Images:');
  console.log('─'.repeat(60));
  
  const imagesDir = path.join(docsDir, 'images');
  const imageFiles = analyzeDirectory(imagesDir, ['.png', '.jpg', '.jpeg', '.webp', '.svg']);
  
  let totalImages = 0;
  let largeImages = 0;
  
  imageFiles
    .sort((a, b) => b.size - a.size)
    .slice(0, 10) // Show top 10 largest
    .forEach(file => {
      totalImages += file.size;
      const status = file.size > THRESHOLDS.image ? '⚠️ ' : '✅';
      console.log(`${status} ${file.name.padEnd(40)} ${formatBytes(file.size)}`);
      if (file.size > THRESHOLDS.image) {
        largeImages++;
        warnings++;
      }
    });
  
  if (imageFiles.length > 10) {
    console.log(`... and ${imageFiles.length - 10} more images`);
  }
  
  console.log('─'.repeat(60));
  console.log(`Total Images Analyzed: ${imageFiles.length}`);
  console.log(`Large Images (>${formatBytes(THRESHOLDS.image)}): ${largeImages}`);
  console.log('');

  // Recommendations
  console.log('💡 Recommendations:');
  console.log('─'.repeat(60));
  
  if (warnings === 0) {
    console.log('✅ All assets are within recommended size limits!');
  } else {
    console.log(`⚠️  Found ${warnings} potential optimization opportunities:\n`);
    
    if (jsFilesWithoutMaps.some(f => f.size > THRESHOLDS.jsChunk)) {
      console.log('📦 JavaScript:');
      console.log('   • Consider code splitting for large chunks');
      console.log('   • Use dynamic imports for heavy libraries');
      console.log('   • Remove unused dependencies\n');
    }
    
    if (cssFiles.some(f => f.size > THRESHOLDS.cssFile)) {
      console.log('🎨 CSS:');
      console.log('   • Remove unused CSS with PurgeCSS');
      console.log('   • Consider critical CSS extraction');
      console.log('   • Minimize custom styles\n');
    }
    
    if (largeImages > 0) {
      console.log('🖼️  Images:');
      console.log('   • Convert PNG/JPEG to WebP: npm run optimize:images');
      console.log('   • Use responsive images with srcset');
      console.log('   • Implement lazy loading for below-fold images');
      console.log('   • Consider using a CDN\n');
    }
  }
  
  console.log('─'.repeat(60));
  console.log('');

  // Summary
  console.log('📊 Summary:');
  console.log('─'.repeat(60));
  console.log(`Total JS:     ${formatBytes(totalJS)}`);
  console.log(`Total CSS:    ${formatBytes(totalCSS)}`);
  console.log(`Total Assets: ${formatBytes(totalJS + totalCSS)}`);
  console.log(`Warnings:     ${warnings}`);
  console.log('─'.repeat(60));
  console.log('');

  // Exit code
  if (warnings > 5) {
    console.log('⚠️  Consider optimizing before deployment\n');
    process.exit(1);
  } else {
    console.log('✅ Build looks good!\n');
    process.exit(0);
  }
}

analyzeAssets();
