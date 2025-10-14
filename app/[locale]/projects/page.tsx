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
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Investment Properties</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Discover {projects.length} real investment opportunities in Georgia's real estate market from korter.ge.
          Browse apartments, commercial properties, and villas in Tbilisi.
        </p>
      </div>

      <ProjectsList projects={projects} />
    </div>
  )
}
