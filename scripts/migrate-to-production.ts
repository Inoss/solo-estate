import { PrismaClient } from '@prisma/client'

/**
 * Migrate all projects from local SQLite to production PostgreSQL
 *
 * Usage:
 * 1. First run against local DB to get data: npx tsx scripts/migrate-to-production.ts
 * 2. Then run against production: DATABASE_URL="postgres://..." npx tsx scripts/migrate-to-production.ts --write
 */

const localPrisma = new PrismaClient()
const isWriteMode = process.argv.includes('--write')

async function migrateToProduction() {
  try {
    if (!isWriteMode) {
      // READ MODE: Export data from local database
      console.log('📖 Reading from local SQLite database...\n')

      const projects = await localPrisma.project.findMany({
        include: {
          developer: {
            select: {
              slug: true
            }
          }
        },
        orderBy: {
          titleEn: 'asc'
        }
      })

      console.log(`Found ${projects.length} projects in local database\n`)

      // Show sample
      console.log('Sample projects:')
      projects.slice(0, 5).forEach((p, i) => {
        console.log(`  ${i + 1}. ${p.titleEn}`)
        console.log(`     Developer: ${p.developer?.slug || 'none'}`)
        console.log(`     Cover: ${p.coverImage ? 'Yes' : 'No'}`)
        console.log(`     Gallery: ${p.gallery ? JSON.parse(p.gallery).length + ' images' : 'No'}`)
      })

      console.log(`\n✓ Found ${projects.length} projects ready to migrate`)
      console.log('\nTo write these to production, run:')
      console.log('DATABASE_URL="your-production-url" npx tsx scripts/migrate-to-production.ts --write')

    } else {
      // WRITE MODE: Read from local and write to production
      console.log('📖 Reading from local database...\n')

      // Connect to local DB to read
      const { PrismaClient: LocalPrismaClient } = await import('@prisma/client')
      const localDb = new LocalPrismaClient({
        datasources: {
          db: {
            url: 'file:./prisma/prisma/dev.db'
          }
        }
      })

      const projects = await localDb.project.findMany({
        include: {
          developer: {
            select: {
              slug: true
            }
          }
        },
        orderBy: {
          titleEn: 'asc'
        }
      })

      await localDb.$disconnect()

      console.log(`Found ${projects.length} projects to migrate\n`)

      // Now write to production (localPrisma is using DATABASE_URL from env)
      console.log('✍️  Writing to production PostgreSQL database...\n')

      // First, ensure developers exist
      const developers = [...new Set(projects.map(p => p.developer?.slug).filter(Boolean))]

      for (const devSlug of developers) {
        const devData = await localDb.developer.findUnique({
          where: { slug: devSlug }
        })
        if (devData) {
          await localPrisma.developer.upsert({
            where: { slug: devSlug },
            update: {},
            create: {
              slug: devData.slug,
              nameEn: devData.nameEn,
              nameKa: devData.nameKa,
              nameRu: devData.nameRu,
              nameHe: devData.nameHe,
              nameAz: devData.nameAz,
              nameHy: devData.nameHy,
              nameUk: devData.nameUk,
              descriptionEn: devData.descriptionEn,
              descriptionKa: devData.descriptionKa,
              descriptionRu: devData.descriptionRu,
              descriptionHe: devData.descriptionHe,
              descriptionAz: devData.descriptionAz,
              descriptionHy: devData.descriptionHy,
              descriptionUk: devData.descriptionUk,
              logo: devData.logo,
              website: devData.website,
              featured: devData.featured,
            }
          })
        }
      }

      console.log(`✓ Ensured ${developers.length} developers exist\n`)

      // Now migrate projects
      let created = 0
      let updated = 0
      let errors = 0

      for (const project of projects) {
        try {
          const existing = await localPrisma.project.findUnique({
            where: { slug: project.slug }
          })

          const projectData = {
            slug: project.slug,
            developerId: project.developerId,
            titleEn: project.titleEn,
            titleKa: project.titleKa,
            titleRu: project.titleRu,
            titleHe: project.titleHe,
            titleAz: project.titleAz,
            titleHy: project.titleHy,
            titleUk: project.titleUk,
            descriptionEn: project.descriptionEn,
            descriptionKa: project.descriptionKa,
            descriptionRu: project.descriptionRu,
            descriptionHe: project.descriptionHe,
            descriptionAz: project.descriptionAz,
            descriptionHy: project.descriptionHy,
            descriptionUk: project.descriptionUk,
            propertyType: project.propertyType,
            status: project.status,
            city: project.city,
            cityEn: project.cityEn,
            cityKa: project.cityKa,
            cityRu: project.cityRu,
            cityHe: project.cityHe,
            cityAz: project.cityAz,
            cityHy: project.cityHy,
            cityUk: project.cityUk,
            location: project.location,
            locationEn: project.locationEn,
            locationKa: project.locationKa,
            locationRu: project.locationRu,
            locationHe: project.locationHe,
            locationAz: project.locationAz,
            locationHy: project.locationHy,
            locationUk: project.locationUk,
            priceFrom: project.priceFrom,
            priceTo: project.priceTo,
            pricePerSqm: project.pricePerSqm,
            minSqm: project.minSqm,
            maxSqm: project.maxSqm,
            completionDate: project.completionDate,
            yieldPercent: project.yieldPercent,
            roiPercent: project.roiPercent,
            coverImage: project.coverImage,
            gallery: project.gallery,
            featured: project.featured,
            publishedAt: project.publishedAt,
          }

          if (existing) {
            await localPrisma.project.update({
              where: { slug: project.slug },
              data: projectData
            })
            updated++
          } else {
            await localPrisma.project.create({
              data: projectData
            })
            created++
          }

          console.log(`✓ ${created + updated}/${projects.length} ${project.titleEn}`)
        } catch (error) {
          errors++
          console.error(`✗ Error with ${project.titleEn}:`, error instanceof Error ? error.message : error)
        }
      }

      console.log(`\n✅ Migration complete!`)
      console.log(`   Created: ${created}`)
      console.log(`   Updated: ${updated}`)
      console.log(`   Errors: ${errors}`)
      console.log(`   Total: ${projects.length}`)
    }

    await localPrisma.$disconnect()
  } catch (error) {
    console.error('❌ Migration error:', error)
    await localPrisma.$disconnect()
    process.exit(1)
  }
}

migrateToProduction()
