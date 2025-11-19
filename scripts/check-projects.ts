import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const projects = await prisma.project.findMany({
    include: {
      developer: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
    orderBy: [
      { featured: 'desc' },
      { price: 'desc' },
    ],
  })

  console.log('\n📋 PROJECTS IN DATABASE:\n')
  console.log('═'.repeat(90))

  console.log(`\n🌟 FEATURED PROJECTS (${projects.filter(p => p.featured).length}):\n`)
  projects.filter(p => p.featured).forEach((proj, i) => {
    console.log(`${i + 1}. ${proj.titleEn}`)
    console.log(`   Developer: ${proj.developer?.name || 'N/A'}`)
    console.log(`   Location: ${proj.locationCity}${proj.locationArea ? ', ' + proj.locationArea : ''}`)
    console.log(`   Price: $${proj.price.toLocaleString()}${proj.pricePerSqm ? ` ($${proj.pricePerSqm}/m²)` : ''}`)
    console.log(`   Type: ${proj.propertyType} | Status: ${proj.status}`)
    console.log(`   Delivery: ${proj.deliveryQuarter || ''} ${proj.deliveryYear || ''}`)
    console.log('')
  })

  console.log('═'.repeat(90))
  console.log(`\n📦 ALL PROJECTS (${projects.length}):\n`)

  const byDeveloper = projects.reduce((acc, proj) => {
    const devName = proj.developer?.name || 'Unknown'
    if (!acc[devName]) acc[devName] = []
    acc[devName].push(proj)
    return acc
  }, {} as Record<string, typeof projects>)

  Object.entries(byDeveloper).sort(([a], [b]) => a.localeCompare(b)).forEach(([devName, devProjects]) => {
    console.log(`\n${devName} (${devProjects.length} projects):`)
    devProjects.forEach(p => {
      const featured = p.featured ? '⭐' : '  '
      console.log(`  ${featured} ${p.titleEn} - $${p.price.toLocaleString()} (${p.status})`)
    })
  })

  console.log('\n' + '═'.repeat(90))
  console.log(`\n✅ Total: ${projects.length} projects`)
  console.log(`   - Featured: ${projects.filter(p => p.featured).length}`)
  console.log(`   - Under Construction: ${projects.filter(p => p.status === 'underConstruction').length}`)
  console.log(`   - Ready/Completed: ${projects.filter(p => p.status === 'ready').length}`)
  console.log(`   - Off Plan: ${projects.filter(p => p.status === 'offPlan').length}`)
  console.log(`   - Developers: ${Object.keys(byDeveloper).length}\n`)
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
