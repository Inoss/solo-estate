import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const developers = await prisma.developer.findMany({
    select: {
      name: true,
      slug: true,
      rating: true,
      completedProjects: true,
      website: true,
      descriptionEn: true,
    },
    orderBy: {
      rating: 'desc',
    },
  })

  console.log('\n📋 DEVELOPERS IN DATABASE:\n')
  console.log('═'.repeat(70))

  developers.forEach((dev, i) => {
    console.log(`\n${i + 1}. ${dev.name}`)
    console.log(`   Slug: ${dev.slug}`)
    console.log(`   Rating: ⭐ ${dev.rating}/5.0`)
    console.log(`   Completed Projects: ${dev.completedProjects}`)
    if (dev.website) {
      console.log(`   Website: ${dev.website}`)
    }
    console.log(`   Description: ${dev.descriptionEn.substring(0, 100)}...`)
  })

  console.log('\n' + '═'.repeat(70))
  console.log(`\n✅ Total: ${developers.length} developers created\n`)
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
