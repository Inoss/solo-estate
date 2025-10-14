import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { client } from '@/sanity/lib/client'
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
  const query = `*[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    coverImage,
    author,
    category,
    tags,
    publishedAt,
    readTime,
    seo
  }`

  try {
    const article = await client.fetch(query, { slug })
    return article
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

async function getRelatedArticles(category: string, currentId: string) {
  const query = `*[_type == "article" && category == $category && _id != $currentId] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    readTime
  }`

  try {
    const articles = await client.fetch(query, { category, currentId })
    return articles
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
