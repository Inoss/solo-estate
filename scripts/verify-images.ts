import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const projects = await prisma.project.findMany({
    select: {
      titleEn: true,
      slug: true,
      coverImage: true,
      gallery: true,
      featured: true,
      developer: {
        select: {
          name: true,
        },
      },
    },
    orderBy: [
      { featured: 'desc' },
      { titleEn: 'asc' },
    ],
  })

  console.log('\n📷 PROJECT IMAGES STATUS:\n')
  console.log('═'.repeat(70))

  const stats = {
    total: projects.length,
    withCover: projects.filter(p => p.coverImage).length,
    withGallery: projects.filter(p => p.gallery).length,
    withoutImages: projects.filter(p => !p.coverImage && !p.gallery).length,
    featured: projects.filter(p => p.featured).length,
    featuredWithImages: projects.filter(p => p.featured && p.coverImage).length,
  }

  console.log(`\n📊 Summary:`)
  console.log(`   - Total Projects: ${stats.total}`)
  console.log(`   - With Cover Image: ${stats.withCover} (${(stats.withCover/stats.total*100).toFixed(1)}%)`)
  console.log(`   - With Gallery: ${stats.withGallery} (${(stats.withGallery/stats.total*100).toFixed(1)}%)`)
  console.log(`   - Without Images: ${stats.withoutImages} (${(stats.withoutImages/stats.total*100).toFixed(1)}%)`)
  console.log(`   - Featured Projects: ${stats.featured}`)
  console.log(`   - Featured with Images: ${stats.featuredWithImages}/${stats.featured}`)

  console.log('\n✅ Projects WITH images:\n')
  const withImages = projects.filter(p => p.coverImage)
  withImages.forEach((p, i) => {
    const galleryCount = p.gallery ? JSON.parse(p.gallery).length : 0
    const star = p.featured ? '⭐' : '  '
    console.log(`${star} ${i + 1}. ${p.titleEn} (${p.developer?.name || 'N/A'})`)
    console.log(`   Gallery: ${galleryCount} images`)
  })

  console.log('\n❌ Projects WITHOUT images (first 20):\n')
  const withoutImages = projects.filter(p => !p.coverImage)
  withoutImages.slice(0, 20).forEach((p, i) => {
    const star = p.featured ? '⭐' : '  '
    console.log(`${star} ${i + 1}. ${p.titleEn} (${p.developer?.name || 'N/A'}) - ${p.slug}`)
  })

  if (withoutImages.length > 20) {
    console.log(`   ... and ${withoutImages.length - 20} more`)
  }

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
