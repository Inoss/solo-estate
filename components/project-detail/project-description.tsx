import type { Locale } from '@/i18n'

interface ProjectDescriptionProps {
  project: any
  locale: Locale
}

export function ProjectDescription({ project, locale }: ProjectDescriptionProps) {
  const description = project.description?.[locale] || project.description?.en

  if (!description) return null

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">About This Property</h2>
      <div className="prose max-w-none">
        <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
          {description}
        </p>
      </div>

      {/* Developer Info */}
      {project.developer && (
        <div className="mt-6 p-6 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Developer</h3>
          <p className="text-xl font-bold text-primary mb-1">
            {project.developer.name}
          </p>
          {project.developer.description?.[locale] && (
            <p className="text-sm text-muted-foreground">
              {project.developer.description[locale]}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
