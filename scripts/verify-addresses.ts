import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const projects = await prisma.project.findMany({
    where: {
      OR: [
        { slug: 'monolith-dighomi-city' },
        { slug: 'krtsanisi-margaliti' }
      ]
    },
    select: {
      titleEn: true,
      locationCity: true,
      locationArea: true,
      locationAddress: true,
    }
  })

  console.log('\n📍 Verifying Location Addresses:\n')
  console.log('═'.repeat(70))

  projects.forEach(project => {
    console.log(`\n✓ ${project.titleEn}`)
    console.log(`  City: ${project.locationCity}`)
    console.log(`  Area: ${project.locationArea || 'N/A'}`)
    console.log(`  Address: ${project.locationAddress || '❌ MISSING'}`)
  })

  console.log('\n' + '═'.repeat(70))
  console.log(`\n✅ Verification complete!\n`)
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
