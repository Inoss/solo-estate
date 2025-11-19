import { PrismaClient } from '@prisma/client'

/**
 * Seed production PostgreSQL database with all 87 real projects
 * Run with: DATABASE_URL="postgres://..." npx tsx scripts/seed-production.ts
 */

const prisma = new PrismaClient()

async function seedProduction() {
  try {
    console.log('Starting production database seed...\n')

    // First, check if developers exist, if not create them
    const developers = [
      {
        slug: 'next-group',
        nameEn: 'Next Group',
        nameKa: 'ნექსთ გრუპი',
        nameRu: 'Некст Групп',
      },
      {
        slug: 'biograpi-living',
        nameEn: 'Biograpi Living',
        nameKa: 'ბიოგრაფი ლივინგი',
        nameRu: 'Биографи Ливинг',
      },
      {
        slug: 'archi',
        nameEn: 'Archi',
        nameKa: 'არხი',
        nameRu: 'Архи',
      },
      {
        slug: 'x2-development',
        nameEn: 'X2 Development',
        nameKa: 'X2 დეველოპმენტი',
        nameRu: 'X2 Девелопмент',
      },
      {
        slug: 'metropol',
        nameEn: 'Metropol',
        nameKa: 'მეტროპოლი',
        nameRu: 'Метрополь',
      },
      {
        slug: 'blox',
        nameEn: 'Blox',
        nameKa: 'ბლოქსი',
        nameRu: 'Блокс',
      },
      {
        slug: 'elt-building',
        nameEn: 'ELT Building',
        nameKa: 'ELT ბილდინგი',
        nameRu: 'ELT Билдинг',
      },
      {
        slug: 'gumbati-group',
        nameEn: 'Gumbati Group',
        nameKa: 'გუმბათი გრუპი',
        nameRu: 'Гумбати Групп',
      },
      {
        slug: 'monolith-group',
        nameEn: 'Monolith Group',
        nameKa: 'მონოლით გრუპი',
        nameRu: 'Монолит Групп',
      },
      {
        slug: 'domus-development',
        nameEn: 'Domus Development',
        nameKa: 'დომუს დეველოპმენტი',
        nameRu: 'Домус Девелопмент',
      },
      {
        slug: 'alliance-group',
        nameEn: 'Alliance Group',
        nameKa: 'ალიანს გრუპი',
        nameRu: 'Альянс Групп',
      },
      {
        slug: 'index-i-wealth-management',
        nameEn: 'Index I Wealth Management',
        nameKa: 'ინდექს I ველზ მენეჯმენტი',
        nameRu: 'Индекс I Уэлс Менеджмент',
      },
      {
        slug: 'apart-development',
        nameEn: 'Apart Development',
        nameKa: 'აპარტ დეველოპმენტი',
        nameRu: 'Апарт Девелопмент',
      },
      {
        slug: 'anagi-development',
        nameEn: 'Anagi Development',
        nameKa: 'ანაგი დეველოპმენტი',
        nameRu: 'Анаги Девелопмент',
      },
      {
        slug: 'pillar-group',
        nameEn: 'Pillar Group',
        nameKa: 'პილარ გრუპი',
        nameRu: 'Пиллар Групп',
      },
      {
        slug: 'vr-holding',
        nameEn: 'VR Holding',
        nameKa: 'VR ჰოლდინგი',
        nameRu: 'VR Холдинг',
      },
    ]

    for (const dev of developers) {
      await prisma.developer.upsert({
        where: { slug: dev.slug },
        update: {},
        create: dev,
      })
    }

    console.log(`✓ Ensured ${developers.length} developers exist\n`)

    // Now seed all 87 projects
    // This data needs to be exported from your local database
    console.log('⚠️  To complete this seed, you need to:')
    console.log('1. Run the export script to generate project data')
    console.log('2. Update this file with the exported project data')
    console.log('3. Re-run this seed script')

    await prisma.$disconnect()
  } catch (error) {
    console.error('Error seeding production:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

seedProduction()
