import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const LOGO_BASE_URL = 'https://storage.googleapis.com/bd-ge-01/developer_image/logo/'

const developerLogos = [
  { slug: 'archi', logoFile: '657.jpg' },
  { slug: 'gumbati-group', logoFile: '655.png' },
  { slug: 'biograpi', logoFile: '1107.jpg' },
  { slug: 'x2-development', logoFile: '89.png' },
  { slug: 'apart-development', logoFile: '554.jpg' },
  { slug: 'metropol', logoFile: '752.jpg' },
  { slug: 'alliance-group', logoFile: '654.jpg' },
  { slug: 'vr-holding', logoFile: '1520.jpg' },
  { slug: 'monolith-group', logoFile: '61.png' },
  { slug: 'index-wealth-management', logoFile: '1494.jpg' },
  { slug: 'next-group', logoFile: '656.jpg' },
  { slug: 'elt-building', logoFile: '5191.jpg' },
  { slug: 'domus-development', logoFile: '2863.png' },
  { slug: 'anagi-development', logoFile: '462.jpg' },
  { slug: 'blox', logoFile: '641.png' },
  { slug: 'pillar-group', logoFile: '435.png' },
]

async function main() {
  console.log('🎨 Starting developer logo update...\n')

  let updatedCount = 0
  let skippedCount = 0

  for (const { slug, logoFile } of developerLogos) {
    const logoUrl = `${LOGO_BASE_URL}${logoFile}`

    try {
      const developer = await prisma.developer.findUnique({
        where: { slug },
      })

      if (!developer) {
        console.log(`⚠️  Developer not found: ${slug}`)
        skippedCount++
        continue
      }

      await prisma.developer.update({
        where: { slug },
        data: { logo: logoUrl },
      })

      console.log(`✅ Updated ${developer.name} → ${logoFile}`)
      updatedCount++
    } catch (error) {
      console.error(`❌ Error updating ${slug}:`, error)
      skippedCount++
    }
  }

  console.log('\n' + '═'.repeat(70))
  console.log(`\n✅ Logo update completed!`)
  console.log(`   - Updated: ${updatedCount} developers`)
  console.log(`   - Skipped: ${skippedCount} developers\n`)
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
