import { prisma } from './prisma'
import type { Locale } from '@/i18n'

// Helper function to get localized field
function getLocalizedField<T extends Record<string, any>>(
  obj: T,
  fieldBase: string,
  locale: Locale,
  fallbackLocale: Locale = 'en'
): string {
  const localizedKey = `${fieldBase}${locale.charAt(0).toUpperCase() + locale.slice(1)}` as keyof T
  const fallbackKey = `${fieldBase}${fallbackLocale.charAt(0).toUpperCase() + fallbackLocale.slice(1)}` as keyof T

  return (obj[localizedKey] as string) || (obj[fallbackKey] as string) || ''
}

// Transform Prisma project to the format expected by components
export function transformProject(project: any, locale: Locale = 'en') {
  return {
    _id: project.id,
    _type: 'project' as const,
    title: {
      en: project.titleEn,
      ka: project.titleKa || project.titleEn,
      ru: project.titleRu || project.titleEn,
      he: project.titleHe || project.titleEn,
      az: project.titleAz || project.titleEn,
      hy: project.titleHy || project.titleEn,
      uk: project.titleUk || project.titleEn,
    },
    slug: { current: project.slug },
    developer: project.developerId ? { _type: 'reference' as const, _ref: project.developerId } : null,
    status: project.status as 'offPlan' | 'underConstruction' | 'ready',
    propertyType: project.propertyType,
    location: {
      city: project.locationCity || '',
      area: project.locationArea || '',
      address: project.locationAddress || '',
      lat: project.locationLat,
      lng: project.locationLng,
    },
    pricing: {
      price: project.price,
      pricePerSqm: project.pricePerSqm,
      currency: project.currency,
      priceRange: project.priceRangeMin && project.priceRangeMax ? {
        min: project.priceRangeMin,
        max: project.priceRangeMax,
      } : undefined,
    },
    investment: {
      yield: project.yield,
      capRate: project.capRate,
      irr: project.irr,
    },
    delivery: project.deliveryYear ? {
      quarter: project.deliveryQuarter,
      year: project.deliveryYear,
    } : null,
    area: project.area,
    coverImageUrl: project.coverImage,
    galleryUrls: project.gallery ? JSON.parse(project.gallery as string) : [],
    description: {
      en: project.descriptionEn || '',
      ka: project.descriptionKa || project.descriptionEn || '',
      ru: project.descriptionRu || project.descriptionEn || '',
      he: project.descriptionHe || project.descriptionEn || '',
      az: project.descriptionAz || project.descriptionEn || '',
      hy: project.descriptionHy || project.descriptionEn || '',
      uk: project.descriptionUk || project.descriptionEn || '',
    },
    highlights: project.highlights ? JSON.parse(project.highlights as string) : [],
    featured: project.featured,
    publishedAt: project.publishedAt.toISOString(),
    sourceUrl: '', // Not applicable for own data
    korterBuildingId: '', // Not applicable for own data
  }
}

/**
 * Get all published projects
 */
export async function getProjects(locale: Locale = 'en') {
  const projects = await prisma.project.findMany({
    where: {
      published: true,
    },
    include: {
      developer: true,
    },
    orderBy: [
      { featured: 'desc' },
      { publishedAt: 'desc' },
    ],
  })

  return projects.map(p => transformProject(p, locale))
}

/**
 * Get featured projects
 */
export async function getFeaturedProjects(limit = 6, locale: Locale = 'en') {
  const projects = await prisma.project.findMany({
    where: {
      published: true,
      featured: true,
      coverImage: {
        not: null,
      },
    },
    include: {
      developer: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
    take: limit,
  })

  return projects.map(p => transformProject(p, locale))
}

/**
 * Get project by slug
 */
export async function getProjectBySlug(slug: string, locale: Locale = 'en') {
  const project = await prisma.project.findUnique({
    where: {
      slug,
      published: true,
    },
    include: {
      developer: true,
    },
  })

  if (!project) return null

  return transformProject(project, locale)
}

/**
 * Get project statistics
 */
export async function getProjectStats() {
  const [totalProjects, avgPriceResult, cities] = await Promise.all([
    prisma.project.count({
      where: { published: true },
    }),
    prisma.project.aggregate({
      where: {
        published: true,
        price: {
          gt: 0,
        },
      },
      _avg: {
        price: true,
      },
    }),
    prisma.project.findMany({
      where: { published: true },
      distinct: ['locationCity'],
      select: { locationCity: true },
    }),
  ])

  const withImages = await prisma.project.count({
    where: {
      published: true,
      coverImage: {
        not: null,
      },
    },
  })

  return {
    totalProjects,
    avgPrice: Math.round(avgPriceResult._avg.price || 0),
    cities: cities.filter(c => c.locationCity).length,
    withImages,
  }
}

/**
 * Search and filter projects
 */
export async function searchProjects({
  query,
  city,
  propertyType,
  status,
  minPrice,
  maxPrice,
  minYield,
  locale = 'en',
}: {
  query?: string
  city?: string
  propertyType?: string
  status?: string
  minPrice?: number
  maxPrice?: number
  minYield?: number
  locale?: Locale
}) {
  const projects = await prisma.project.findMany({
    where: {
      published: true,
      AND: [
        query ? {
          OR: [
            { titleEn: { contains: query, mode: 'insensitive' } },
            { descriptionEn: { contains: query, mode: 'insensitive' } },
          ],
        } : {},
        city ? { locationCity: city } : {},
        propertyType ? { propertyType } : {},
        status ? { status } : {},
        minPrice ? { price: { gte: minPrice } } : {},
        maxPrice ? { price: { lte: maxPrice } } : {},
        minYield ? { yield: { gte: minYield } } : {},
      ],
    },
    include: {
      developer: true,
    },
    orderBy: [
      { featured: 'desc' },
      { publishedAt: 'desc' },
    ],
  })

  return projects.map(p => transformProject(p, locale))
}
