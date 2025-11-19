import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Image data collected from korter.ge
 * Format: slug -> array of image URLs
 */
const projectImages: Record<string, string[]> = {
  // VR HOLDING
  'vr-vake-sky-tower': [
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/37090.jpg',
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/37097.jpg',
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/37095.jpg',
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/37091.jpg',
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/37092.jpg',
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/37087.jpg',
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/37094.jpg',
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/37096.jpg',
  ],
  'krtsanisi-resort-residence': [
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/35045.jpg',
  ],

  // BIOGRAPI LIVING
  'hisni-by-biograpi': [
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/30050.jpg',
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/28312.jpg',
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/30048.jpg',
  ],
  'sakeni-by-biograpi': [
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/23239.jpg',
  ],

  // MONOLITH GROUP
  'monolith-green-city': [
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/14977.jpg',
  ],

  // NEXT GROUP
  'next-downtown-batumi': [
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/31252.jpg',
  ],
  'wyndham-residence-batumi': [
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/16322.jpg',
  ],
  'radisson-residences-gonio': [
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/17654.jpg',
  ],
  'next-collection-makhinjauri': [
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/24112.jpg',
  ],

  // METROPOL
  'metropol-oval': [
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/33055.jpg',
  ],
  'metropol-kavtaradze': [
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/23563.jpg',
  ],

  // GUMBATI GROUP
  'portline-by-gumbati': [
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/13947.jpg',
  ],
  'midtown-batumi': [
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/22215.jpg',
  ],

  // DOMUS DEVELOPMENT
  'domus-chavchavadze-31': [
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/32956.jpg',
  ],

  // BLOX
  'blox-gudauri': [
    'https://storage.googleapis.com/bd-ge-01/buildings-v2/2560x1920/31827.jpg',
  ],
}

async function main() {
  console.log('\n🖼️  Starting project images update...\n')
  console.log('═'.repeat(70))

  let updatedCount = 0
  let skippedCount = 0
  const totalProjects = Object.keys(projectImages).length

  for (const [slug, images] of Object.entries(projectImages)) {
    try {
      const project = await prisma.project.findUnique({
        where: { slug },
        select: { id: true, titleEn: true }
      })

      if (!project) {
        console.log(`⚠️  Project not found: ${slug}`)
        skippedCount++
        continue
      }

      if (images.length === 0) {
        console.log(`⚠️  No images for: ${project.titleEn}`)
        skippedCount++
        continue
      }

      // Update project with cover image and gallery
      await prisma.project.update({
        where: { slug },
        data: {
          coverImage: images[0], // First image as cover
          gallery: JSON.stringify(images), // All images in gallery
        },
      })

      console.log(`✅ ${project.titleEn} → ${images.length} images`)
      updatedCount++
    } catch (error) {
      console.error(`❌ Error updating ${slug}:`, error)
      skippedCount++
    }
  }

  console.log('\n' + '═'.repeat(70))
  console.log(`\n📊 Image update summary:`)
  console.log(`   - Total projects with images: ${totalProjects}`)
  console.log(`   - Successfully updated: ${updatedCount}`)
  console.log(`   - Skipped: ${skippedCount}`)
  console.log(`   - Remaining to collect: ${87 - totalProjects}\n`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
