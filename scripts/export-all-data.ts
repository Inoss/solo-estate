import { prisma } from '../lib/db'
import * as fs from 'fs'
import * as path from 'path'

/**
 * Export all developers and projects from local SQLite to JSON
 * Run: npx tsx scripts/export-all-data.ts
 */

async function exportAllData() {
  try {
    console.log('📖 Exporting from local SQLite database...\n')

    // Export developers
    const developers = await prisma.developer.findMany({
      orderBy: { nameEn: 'asc' }
    })

    // Export projects
    const projects = await prisma.project.findMany({
      include: {
        developer: {
          select: {
            slug: true
          }
        }
      },
      orderBy: { titleEn: 'asc' }
    })

    const exportData = {
      developers,
      projects: projects.map(p => ({
        ...p,
        developerSlug: p.developer?.slug || null,
        developer: undefined, // Remove the relation object
        id: undefined, // Remove ID, will be auto-generated
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
        publishedAt: p.publishedAt?.toISOString() || null,
        completionDate: p.completionDate?.toISOString() || null,
      }))
    }

    const filePath = path.join(process.cwd(), 'production-data.json')
    fs.writeFileSync(filePath, JSON.stringify(exportData, null, 2))

    console.log(`✅ Exported ${developers.length} developers and ${projects.length} projects`)
    console.log(`📁 Saved to: production-data.json\n`)

    // Show summary
    const withImages = projects.filter(p => p.coverImage).length
    console.log(`Projects with images: ${withImages}/${projects.length}`)

    await prisma.$disconnect()
  } catch (error) {
    console.error('❌ Export error:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

exportAllData()
