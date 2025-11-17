import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getProjectBySlug } from '@/lib/projects'
import { ProjectHero } from '@/components/project-detail/project-hero'
import { ProjectMetrics } from '@/components/project-detail/project-metrics'
import { ProjectDescription } from '@/components/project-detail/project-description'
import { ProjectGallery } from '@/components/project-detail/project-gallery'
import { ProjectLocation } from '@/components/project-detail/project-location'
import { RequestOfferForm } from '@/components/request-offer-form'
import type { Locale } from '@/i18n'

interface Props {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  const project = await getProjectBySlug(slug, locale as Locale)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  const title = project.title[locale as Locale] || project.title.en
  const description = project.description?.[locale as Locale] || project.description?.en || ''

  return {
    title: `${title} - SOLO Estate`,
    description: description.substring(0, 160),
    openGraph: {
      title: `${title} - SOLO Estate`,
      description: description.substring(0, 160),
      locale: locale,
      type: 'website',
    },
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params
  const project = await getProjectBySlug(slug, locale as Locale)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Main Image */}
      <ProjectHero
        project={project}
        locale={locale as Locale}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Metrics */}
            <ProjectMetrics
              project={project}
              locale={locale as Locale}
            />

            {/* Description */}
            <ProjectDescription
              project={project}
              locale={locale as Locale}
            />

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <ProjectGallery
                gallery={project.gallery}
                title={project.title[locale as Locale] || project.title.en}
              />
            )}

            {/* Location */}
            {project.location && (
              <ProjectLocation
                location={project.location}
              />
            )}
          </div>

          {/* Sidebar - Right Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <RequestOfferForm
                projectId={project._id}
                projectTitle={project.title[locale as Locale] || project.title.en}
                locale={locale as Locale}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
