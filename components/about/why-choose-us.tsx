import { Card, CardContent } from '@/components/ui/card'

export function WhyChooseUs({ locale }: { locale: string }) {
  const reasons = [
    {
      icon: '🔍',
      title: 'Rigorous Due Diligence',
      description: 'Every property is thoroughly vetted for legal compliance, market viability, and investment potential before being listed.'
    },
    {
      icon: '📈',
      title: 'Transparent Analytics',
      description: 'Access detailed financial projections, market analysis, and realistic ROI expectations for every investment.'
    },
    {
      icon: '🌍',
      title: 'Local Expertise, Global Standards',
      description: 'Deep understanding of the Georgian market combined with international best practices in real estate investment.'
    },
    {
      icon: '🛡️',
      title: 'Investor Protection',
      description: 'Comprehensive legal support and secure transaction processes to protect your investment every step of the way.'
    },
    {
      icon: '💼',
      title: 'End-to-End Service',
      description: 'From property selection to management, we handle everything so you can enjoy passive income effortlessly.'
    },
    {
      icon: '🤝',
      title: 'Dedicated Support',
      description: 'Multilingual team available to answer questions and provide guidance throughout your investment journey.'
    }
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose SOLO Estate?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're not just another real estate agency. We're your strategic partner
            in building wealth through smart property investments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="text-5xl mb-4">{reason.icon}</div>
                <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
