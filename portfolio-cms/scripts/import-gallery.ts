import { getCliClient } from 'sanity/cli'
import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'

const client = getCliClient()
const imagesDir = path.resolve(__dirname, '../../public/images/gallery')

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

async function processAndUpload() {
  console.log(`Reading from: ${imagesDir}`)
  const files = fs.readdirSync(imagesDir)
    .filter(file => /\.(jpe?g|png|heic)$/i.test(file) && !file.startsWith('.'))
  
  console.log(`Found ${files.length} images to process.`)

  for (const file of files) {
    const filePath = path.join(imagesDir, file)
    const normalizedName = file.replace(/\.(heic|jpeg|jpg|png)$/i, '.jpg')
    const outPath = path.join(__dirname, 'temp_' + normalizedName)
    
    console.log(`\nProcessing: ${file}...`)
    try {
      // Use macOS native sips to convert to JPEG and resize to max 1920px (maintains aspect ratio)
      execSync(`sips -s format jpeg -Z 1920 "${filePath}" -o "${outPath}"`)
      
      const compressedSize = fs.statSync(outPath).size / 1024 / 1024
      console.log(`  Converted and Compressed to size: ${compressedSize.toFixed(2)} MB`)

      console.log(`  Uploading to Sanity...`)
      const asset = await client.assets.upload('image', fs.createReadStream(outPath), {
        filename: normalizedName
      })

      console.log(`  Creating Gallery Document...`)
      const title = file.replace(/\.(heic|jpeg|jpg|png)$/i, '').replace(/[-_]/g, ' ')
      const doc = {
        _type: 'galleryItem',
        title: title,
        alt: `Robin Francis - ${title}`,
        tags: ['Robin Francis', 'Gallery'],
        height: [300, 400, 500, 600][Math.floor(Math.random() * 4)],
        image: {
          _type: 'image',
          asset: {
            _ref: asset._id
          }
        }
      }

      await client.create(doc)
      console.log(`  Success! Added document for ${title}.`)

      // Cleanup
      fs.unlinkSync(outPath)
      
      // Throttle to prevent API rate limits
      await delay(1000)
    } catch (error) {
      console.error(`  Failed on ${file}:`, error)
    }
  }

  console.log('\nAll done!')
}

processAndUpload().catch(console.error)
