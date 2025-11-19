import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

/**
 * Import all developers and projects from production-data.json to production PostgreSQL
 *
 * Usage:
 * DATABASE_URL="postgres://..." npx tsx scripts/import-to-production.ts
 */

const prisma = new PrismaClient()

async function importToProduction() {
  try {
    console.log('📖 Reading production-data.json...\n')

    const filePath = path.join(process.cwd(), 'production-data.json')

    if (!fs.existsSync(filePath)) {
      console.error('❌ production-data.json not found!')
      console.log('Run: npx tsx scripts/export-all-data.ts first')
      process.exit(1)
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const { developers, projects } = data

    console.log(`Found ${developers.length} developers and ${projects.length} projects\n`)

    // Step 1: Import developers
    console.log('📝 Importing developers...\n')
    let devCreated = 0
    let devUpdated = 0

    for (const dev of developers) {
      const existing = await prisma.developer.findUnique({
        where: { slug: dev.slug }
      })

      if (existing) {
        await prisma.developer.update({
          where: { slug: dev.slug },
          data: {
            name: dev.name,
            logo: dev.logo,
            descriptionEn: dev.descriptionEn,
            descriptionKa: dev.descriptionKa,
            descriptionRu: dev.descriptionRu,
            descriptionHe: dev.descriptionHe,
            descriptionAz: dev.descriptionAz,
            descriptionHy: dev.descriptionHy,
            descriptionUk: dev.descriptionUk,
            rating: dev.rating,
            completedProjects: dev.completedProjects,
            website: dev.website,
          }
        })
        devUpdated++
      } else {
        await prisma.developer.create({
          data: {
            slug: dev.slug,
            name: dev.name,
            logo: dev.logo,
            descriptionEn: dev.descriptionEn,
            descriptionKa: dev.descriptionKa,
            descriptionRu: dev.descriptionRu,
            descriptionHe: dev.descriptionHe,
            descriptionAz: dev.descriptionAz,
            descriptionHy: dev.descriptionHy,
            descriptionUk: dev.descriptionUk,
            rating: dev.rating,
            completedProjects: dev.completedProjects,
            website: dev.website,
          }
        })
        devCreated++
      }
      console.log(`✓ ${dev.name}`)
    }

    console.log(`\n✅ Developers: ${devCreated} created, ${devUpdated} updated\n`)

    // Step 2: Import projects
    console.log('📝 Importing projects...\n')
    let projCreated = 0
    let projUpdated = 0
    let projErrors = 0

    for (const proj of projects) {
      try {
        // Find developer ID if developer slug exists
        let developerId = null
        if (proj.developerSlug) {
          const developer = await prisma.developer.findUnique({
            where: { slug: proj.developerSlug }
          })
          developerId = developer?.id || null
        }

        const existing = await prisma.project.findUnique({
          where: { slug: proj.slug }
        })

        // Calculate price - use priceFrom if available, otherwise default to 100000
        const price = proj.priceFrom || 100000

        const projectData = {
          slug: proj.slug,
          developerId,
          titleEn: proj.titleEn,
          titleKa: proj.titleKa,
          titleRu: proj.titleRu,
          titleHe: proj.titleHe,
          titleAz: proj.titleAz,
          titleHy: proj.titleHy,
          titleUk: proj.titleUk,
          descriptionEn: proj.descriptionEn,
          descriptionKa: proj.descriptionKa,
          descriptionRu: proj.descriptionRu,
          descriptionHe: proj.descriptionHe,
          descriptionAz: proj.descriptionAz,
          descriptionHy: proj.descriptionHy,
          descriptionUk: proj.descriptionUk,
          propertyType: proj.propertyType,
          status: proj.status,
          price: price, // Required field in production schema
          pricePerSqm: proj.pricePerSqm,
          coverImage: proj.coverImage,
          gallery: proj.gallery,
          featured: proj.featured,
          publishedAt: proj.publishedAt ? new Date(proj.publishedAt) : new Date(),
        }

        if (existing) {
          await prisma.project.update({
            where: { slug: proj.slug },
            data: projectData
          })
          projUpdated++
        } else {
          await prisma.project.create({
            data: projectData
          })
          projCreated++
        }

        console.log(`✓ ${projCreated + projUpdated}/${projects.length} ${proj.titleEn}`)
      } catch (error) {
        projErrors++
        console.error(`✗ Error with ${proj.titleEn}:`, error instanceof Error ? error.message : error)
      }
    }

    console.log(`\n✅ Import complete!`)
    console.log(`   Projects created: ${projCreated}`)
    console.log(`   Projects updated: ${projUpdated}`)
    console.log(`   Errors: ${projErrors}`)
    console.log(`   Total: ${projects.length}`)

    // Final check
    const totalProjects = await prisma.project.count()
    const withImages = await prisma.project.count({
      where: { coverImage: { not: null } }
    })

    console.log(`\n📊 Production database now has:`)
    console.log(`   ${totalProjects} projects`)
    console.log(`   ${withImages} with images (${Math.round(withImages/totalProjects*100)}%)`)

    await prisma.$disconnect()
  } catch (error) {
    console.error('❌ Import error:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

importToProduction()
