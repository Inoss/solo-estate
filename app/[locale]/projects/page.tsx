import { getTranslations } from 'next-intl/server'
import { ProjectsList } from '@/components/projects-list'
import { getKorterProjects } from '@/lib/get-korter-projects'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: 'Investment Projects - SOLO Estate',
    description: 'Browse 574 real estate investment projects in Georgia from korter.ge with transparent metrics',
    openGraph: {
      title: 'Investment Projects - SOLO Estate',
      description: 'Browse 574 real estate projects in Georgia',
      locale: locale,
      type: 'website',
    },
  }
}

export default async function ProjectsPage() {
  // Load all Korter.ge projects
  const projects = await getKorterProjects()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-secondary/10 to-white">
      {/* Hero Header Section */}
      <div className="relative bg-gradient-to-br from-primary via-primary/95 to-accent overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-20 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
              <span className="text-sm font-bold text-white">Premium Investment Portfolio</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Exclusive Real Estate
              <span className="block mt-2 text-accent">Investment Opportunities</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
              Discover {projects.length} carefully curated investment properties in Georgia's most prestigious locations.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <ProjectsList projects={projects} />
      </div>
    </div>
  )
}
