import { getTranslations } from 'next-intl/server'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Locale } from '@/i18n'

async function getArticles() {
  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
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
        author: true,
        category: true,
        tags: true,
        publishedAt: true,
        readTime: true,
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
      author: article.author,
      category: article.category,
      tags: article.tags,
      publishedAt: article.publishedAt?.toISOString() || new Date().toISOString(),
      readTime: article.readTime,
    }))
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'insights' })

  return {
    title: `${t('title')} - SOLO Estate`,
    description: t('description'),
    openGraph: {
      title: `${t('title')} - SOLO Estate`,
      description: t('description'),
      locale: locale,
      type: 'website',
    },
  }
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const articles = await getArticles()
  const t = await getTranslations({ locale, namespace: 'insights' })

  const categories = [
    { id: 'all', label: t('categories.all') },
    { id: 'market', label: t('categories.market') },
    { id: 'investment', label: t('categories.investment') },
    { id: 'legal', label: t('categories.legal') },
    { id: 'lifestyle', label: t('categories.lifestyle') },
  ]

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">{t('hero.title')}</h1>
            <p className="text-xl text-muted-foreground">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                className="px-6 py-2 rounded-full border hover:bg-muted transition-colors"
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article: any) => (
                <Link
                  key={article._id}
                  href={`/${locale}/insights/${article.slug.current}`}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
                    {article.coverImage && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={article.coverImage}
                          alt={article.title[locale as Locale] || article.title.en}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
                        {article.readTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{article.readTime} min read</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {article.title[locale as Locale] || article.title.en}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3 mb-4">
                        {article.excerpt?.[locale as Locale] || article.excerpt?.en || ''}
                      </p>
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <span>{t('readMore')}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-8">
                {t('noArticles')}
              </p>
              <p className="text-muted-foreground">
                {t('checkBackSoon')}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
