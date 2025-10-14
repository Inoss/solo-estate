import { Card, CardContent } from '@/components/ui/card'
import { formatPrice, formatPercent } from '@/lib/utils'
import type { Locale } from '@/i18n'

interface ProjectMetricsProps {
  project: any
  locale: Locale
}

export function ProjectMetrics({ project, locale }: ProjectMetricsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Key Investment Metrics</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Price */}
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Price</p>
            <p className="text-2xl font-bold text-primary">
              {formatPrice(project.pricing.price, project.pricing.currency)}
            </p>
            {project.pricing.pricePerSqm && (
              <p className="text-xs text-muted-foreground mt-1">
                {formatPrice(project.pricing.pricePerSqm, project.pricing.currency)}/m²
              </p>
            )}
          </CardContent>
        </Card>

        {/* Yield */}
        {project.investment?.yield && (
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Projected Yield</p>
              <p className="text-2xl font-bold text-accent">
                {formatPercent(project.investment.yield)}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Area */}
        {project.area && (
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Area</p>
              <p className="text-2xl font-bold">
                {project.area} m²
              </p>
            </CardContent>
          </Card>
        )}

        {/* Delivery */}
        {project.delivery && (
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Delivery</p>
              <p className="text-2xl font-bold">
                {project.delivery.quarter} {project.delivery.year}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Monthly Rent */}
        {project.investment?.monthlyRent && (
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Est. Monthly Rent</p>
              <p className="text-xl font-bold">
                {formatPrice(project.investment.monthlyRent, project.pricing.currency)}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Cap Rate */}
        {project.investment?.capRate && (
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Cap Rate</p>
              <p className="text-xl font-bold">
                {formatPercent(project.investment.capRate)}
              </p>
            </CardContent>
          </Card>
        )}

        {/* IRR */}
        {project.investment?.irr && (
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">IRR</p>
              <p className="text-xl font-bold">
                {formatPercent(project.investment.irr)}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Management Fee */}
        {project.investment?.managementFee && (
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Management Fee</p>
              <p className="text-xl font-bold">
                {formatPercent(project.investment.managementFee)}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Highlights</h3>
          <div className="flex flex-wrap gap-2">
            {project.highlights.map((highlight: string, index: number) => (
              <span
                key={index}
                className="inline-block bg-muted text-foreground text-sm px-3 py-1.5 rounded-full"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
