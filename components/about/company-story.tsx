import { Card } from '@/components/ui/card'

export function CompanyStory({ locale }: { locale: string }) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                SOLO Estate was founded with a clear mission: to make high-quality real estate
                investment in Georgia accessible, transparent, and profitable for investors worldwide.
              </p>
              <p>
                We recognized that many investors struggled with finding reliable information,
                understanding local market dynamics, and identifying truly profitable opportunities
                in Georgia's booming real estate market.
              </p>
              <p>
                Today, we've built a comprehensive platform that combines deep local expertise
                with international best practices, providing our clients with thoroughly vetted
                properties, transparent financial metrics, and end-to-end support.
              </p>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <Card className="p-8 bg-secondary">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Verified Properties</h3>
                    <p className="text-muted-foreground">
                      Every property undergoes rigorous due diligence
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    📊
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Transparent Metrics</h3>
                    <p className="text-muted-foreground">
                      Clear ROI projections and realistic return expectations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    🤝
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Full Support</h3>
                    <p className="text-muted-foreground">
                      From selection to management, we're with you every step
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
