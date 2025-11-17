import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { prisma } from '@/lib/prisma'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { Locale } from '@/i18n'

interface Props {
  params: Promise<{
    locale: string
    slug: string
  }>
}

async function getArticle(slug: string) {
  try {
    const article = await prisma.article.findFirst({
      where: { slug, published: true },
      select: {
        id: true,
        titleEn: true,
        titleKa: true,
        titleRu: true,
        titleHe: true,
        titleAz: true,
        titleHy: true,
        titleUk: true,
        slug: true,
        excerptEn: true,
        excerptKa: true,
        excerptRu: true,
        excerptHe: true,
        excerptAz: true,
        excerptHy: true,
        excerptUk: true,
        contentEn: true,
        contentKa: true,
        contentRu: true,
        contentHe: true,
        contentAz: true,
        contentHy: true,
        contentUk: true,
        coverImage: true,
        category: true,
        tags: true,
        publishedAt: true,
        metaTitle: true,
        metaDescription: true,
        ogImage: true,
      },
    })

    if (!article) return null

    // Transform to expected format
    return {
      _id: article.id,
      title: {
        en: article.titleEn,
        ka: article.titleKa || article.titleEn,
        ru: article.titleRu || article.titleEn,
        he: article.titleHe || article.titleEn,
        az: article.titleAz || article.titleEn,
        hy: article.titleHy || article.titleEn,
        uk: article.titleUk || article.titleEn,
      },
      slug: { current: article.slug },
      excerpt: {
        en: article.excerptEn,
        ka: article.excerptKa || article.excerptEn,
        ru: article.excerptRu || article.excerptEn,
        he: article.excerptHe || article.excerptEn,
        az: article.excerptAz || article.excerptEn,
        hy: article.excerptHy || article.excerptEn,
        uk: article.excerptUk || article.excerptEn,
      },
      content: {
        en: article.contentEn,
        ka: article.contentKa || article.contentEn,
        ru: article.contentRu || article.contentEn,
        he: article.contentHe || article.contentEn,
        az: article.contentAz || article.contentEn,
        hy: article.contentHy || article.contentEn,
        uk: article.contentUk || article.contentEn,
      },
      coverImage: article.coverImage,
      category: article.category,
      tags: article.tags,
      publishedAt: article.publishedAt?.toISOString() || new Date().toISOString(),
      seo: {
        metaTitle: article.metaTitle,
        metaDescription: article.metaDescription,
        ogImage: article.ogImage,
      },
    }
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

async function getRelatedArticles(category: string, currentId: string) {
  try {
    const articles = await prisma.article.findMany({
      where: {
        category,
        id: { not: currentId },
        published: true,
      },
      orderBy: { publishedAt: 'desc' },
      take: 3,
      select: {
        id: true,
        titleEn: true,
        titleKa: true,
        titleRu: true,
        titleHe: true,
        titleAz: true,
        titleHy: true,
        titleUk: true,
        slug: true,
        excerptEn: true,
        excerptKa: true,
        excerptRu: true,
        excerptHe: true,
        excerptAz: true,
        excerptHy: true,
        excerptUk: true,
        coverImage: true,
        publishedAt: true,
      },
    })

    // Transform to expected format
    return articles.map(article => ({
      _id: article.id,
      title: {
        en: article.titleEn,
        ka: article.titleKa || article.titleEn,
        ru: article.titleRu || article.titleEn,
        he: article.titleHe || article.titleEn,
        az: article.titleAz || article.titleEn,
        hy: article.titleHy || article.titleEn,
        uk: article.titleUk || article.titleEn,
      },
      slug: { current: article.slug },
      excerpt: {
        en: article.excerptEn,
        ka: article.excerptKa || article.excerptEn,
        ru: article.excerptRu || article.excerptEn,
        he: article.excerptHe || article.excerptEn,
        az: article.excerptAz || article.excerptEn,
        hy: article.excerptHy || article.excerptEn,
        uk: article.excerptUk || article.excerptEn,
      },
      coverImage: article.coverImage,
      publishedAt: article.publishedAt?.toISOString() || new Date().toISOString(),
    }))
  } catch (error) {
    console.error('Error fetching related articles:', error)
    return []
  }
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  const title = article.title[locale as Locale] || article.title.en
  const description = article.excerpt?.[locale as Locale] || article.excerpt?.en || ''

  return {
    title: `${title} - SOLO Estate`,
    description: description.substring(0, 160),
    openGraph: {
      title: `${title} - SOLO Estate`,
      description: description.substring(0, 160),
      locale: locale,
      type: 'article',
      publishedTime: article.publishedAt,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = await getRelatedArticles(article.category, article._id)
  const t = await getTranslations({ locale, namespace: 'insights' })

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const title = article.title[locale as Locale] || article.title.en
  const content = article.content?.[locale as Locale] || article.content?.en || ''

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-8">
        <Link
          href={`/${locale}/insights`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('backToArticles')}</span>
        </Link>
      </div>

      {/* Article Header */}
      <article className="pb-20">
        <header className="container mx-auto px-4 mb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">{title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              {article.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{article.readTime} min read</span>
                </div>
              )}
              {article.category && (
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {article.category}
                </span>
              )}
            </div>

            {article.coverImage && (
              <div className="aspect-video rounded-2xl overflow-hidden mb-12">
                <img
                  src={article.coverImage}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </header>

        {/* Article Content */}
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full bg-muted text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="container mx-auto px-4 mt-20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">{t('relatedArticles')}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((related: any) => (
                  <Link
                    key={related._id}
                    href={`/${locale}/insights/${related.slug.current}`}
                    className="group"
                  >
                    <div className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      {related.coverImage && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={related.coverImage}
                            alt={related.title[locale as Locale] || related.title.en}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                          {related.title[locale as Locale] || related.title.en}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {related.excerpt?.[locale as Locale] || related.excerpt?.en || ''}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
