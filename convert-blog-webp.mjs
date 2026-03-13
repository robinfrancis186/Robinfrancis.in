import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = '/Users/robinfrancis/Desktop/Robinfrancis.in/public/images/blog';

async function convertToWebp() {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
    
    for (const file of files) {
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, file.replace('.png', '.webp'));
      
      try {
        await sharp(inputPath)
          .webp({ quality: 80, effort: 6 })
          .toFile(outputPath);
          
        console.log(`Converted: ${file} -> ${path.basename(outputPath)}`);
      } catch (err) {
        console.error(`Failed to convert ${file}:`, err);
      }
    }
}

convertToWebp();
