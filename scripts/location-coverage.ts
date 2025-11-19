import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const projects = await prisma.project.findMany({
    select: {
      titleEn: true,
      locationCity: true,
      locationArea: true,
      locationAddress: true,
    },
    orderBy: {
      titleEn: 'asc'
    }
  })

  console.log('\n📊 LOCATION DATA COVERAGE:\n')
  console.log('═'.repeat(70))

  const stats = {
    total: projects.length,
    withCity: projects.filter(p => p.locationCity).length,
    withArea: projects.filter(p => p.locationArea).length,
    withAddress: projects.filter(p => p.locationAddress).length,
    complete: projects.filter(p => p.locationCity && p.locationArea && p.locationAddress).length,
  }

  console.log(`\n✅ Total Projects: ${stats.total}`)
  console.log(`   - With City: ${stats.withCity} (${(stats.withCity/stats.total*100).toFixed(1)}%)`)
  console.log(`   - With Area/District: ${stats.withArea} (${(stats.withArea/stats.total*100).toFixed(1)}%)`)
  console.log(`   - With Street Address: ${stats.withAddress} (${(stats.withAddress/stats.total*100).toFixed(1)}%)`)
  console.log(`   - Complete (City + Area + Address): ${stats.complete} (${(stats.complete/stats.total*100).toFixed(1)}%)`)

  console.log('\n📍 Projects WITHOUT specific street addresses:\n')
  const withoutAddress = projects.filter(p => !p.locationAddress)

  if (withoutAddress.length > 0) {
    console.log(`Found ${withoutAddress.length} projects without street addresses:\n`)
    withoutAddress.slice(0, 10).forEach(p => {
      console.log(`  • ${p.titleEn} (${p.locationCity}${p.locationArea ? ', ' + p.locationArea : ''})`)
    })
    if (withoutAddress.length > 10) {
      console.log(`  ... and ${withoutAddress.length - 10} more`)
    }
  } else {
    console.log('All projects have street addresses!')
  }

  console.log('\n' + '═'.repeat(70))
  console.log(`\n✅ Location coverage analysis complete!\n`)
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
