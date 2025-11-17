import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { locales } from '@/i18n'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soloestate.com'

async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      select: {
        slug: true,
        updatedAt: true,
      },
    })
    return projects
  } catch {
    return []
  }
}

async function getArticles() {
  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      select: {
        slug: true,
        updatedAt: true,
      },
    })
    return articles
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects()
  const articles = await getArticles()

  const staticPages = [
    '',
    '/projects',
    '/about',
    '/services',
    '/contact',
    '/faq',
    '/insights',
  ]

  // Generate URLs for all locales
  const urls: MetadataRoute.Sitemap = []

  // Static pages in all languages
  for (const locale of locales) {
    for (const page of staticPages) {
      urls.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : page === '/projects' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : page === '/projects' ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${baseUrl}/${loc}${page}`])
          ),
        },
      })
    }
  }

  // Project pages in all languages
  for (const project of projects) {
    for (const locale of locales) {
      urls.push({
        url: `${baseUrl}/${locale}/projects/${project.slug}`,
        lastModified: new Date(project.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.9,
      })
    }
  }

  // Article pages in all languages
  for (const article of articles) {
    for (const locale of locales) {
      urls.push({
        url: `${baseUrl}/${locale}/insights/${article.slug}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return urls
}
