'use client'

import { DollarSign, Target, CreditCard, MapPin, Building2, CheckCircle, Clock, Sparkles } from 'lucide-react'

export function PropertyFinder() {
  const parameters = [
    {
      icon: DollarSign,
      title: 'Purchase Budget',
      description: 'The price of apartments in new buildings starts from $800 per m², resale property - from $1,200 per m².',
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
    {
      icon: Target,
      title: 'Purchase Goal',
      description: 'For permanent or seasonal residence, investment, relocation, or obtaining a residence permit.',
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
    {
      icon: CreditCard,
      title: 'Payment Method',
      description: 'Cash, SWIFT transfer, cryptocurrency. Interest-free installments and mortgages are also available.',
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
    {
      icon: MapPin,
      title: 'Location',
      description: 'Tourist place, "green" zone, distance to the sea and mountains, nearby presence of universities, schools and business centers.',
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
    {
      icon: Building2,
      title: 'Nearby Infrastructure',
      description: 'Surroundings, sports complex, SPA, security, concierge service on the territory of the residential complex.',
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
    {
      icon: CheckCircle,
      title: 'Property Condition',
      description: 'Is the property ready for exploitation or still under construction, is there finishing inside, is it a new building or a secondary housing.',
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
  ]

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-background via-secondary/20 to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      {/* Floating Gradient Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/20 to-yellow-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-accent/30 shadow-lg mb-6">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-sm font-bold text-accent">Our Proven Process</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            We Guarantee Finding the
            <span className="block mt-2 bg-gradient-to-r from-accent to-yellow-500 bg-clip-text text-transparent">
              Perfect Property
            </span>
          </h2>

          {/* Guarantee Badge */}
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-8 py-5 shadow-xl border-2 border-accent/30 mb-6">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-yellow-500 shadow-lg">
              <Clock className="h-7 w-7 text-white" />
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold text-foreground">1-3 Days</div>
              <div className="text-sm text-muted-foreground">Property selection guarantee</div>
            </div>
          </div>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our experts analyze your requirements across 6 key parameters to find properties that perfectly match your needs and investment goals.
          </p>
        </div>

        {/* Parameters Grid */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parameters.map((param, index) => {
              const Icon = param.icon
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-7 shadow-md hover:shadow-2xl transition-all duration-500 border border-border/50 hover:border-accent/50 card-hover-lift"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Number Badge */}
                  <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-gradient-to-br from-foreground to-primary text-white font-bold flex items-center justify-center shadow-lg text-sm z-10">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="mb-5">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${param.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {param.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {param.description}
                  </p>

                  {/* Bottom Border on Hover */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${param.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Result CTA Section */}
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-primary via-primary/95 to-accent rounded-3xl p-10 lg:p-14 shadow-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_50%)]" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-6 border border-white/30">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-bold">Guaranteed Results</span>
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                Finally, You Get a Perfect Selection
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Properties ideally suited to your purposes and requirements. The deal can be arranged in just 1 day!
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-4xl font-bold mb-2">10+</div>
                  <div className="text-sm text-white/80">Properties analyzed per request</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-4xl font-bold mb-2">1 Day</div>
                  <div className="text-sm text-white/80">To complete the deal</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-sm text-white/80">Satisfaction guarantee</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          </div>
        </div>

        {/* Process Timeline - Optional Enhancement */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-foreground mb-3">How It Works</h3>
            <p className="text-muted-foreground">Simple, transparent, and efficient process</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Tell Us', desc: 'Share your requirements' },
              { step: '2', title: 'We Analyze', desc: 'Match 1000+ properties' },
              { step: '3', title: 'You Choose', desc: 'Review top 10 options' },
              { step: '4', title: 'Deal Done', desc: 'Sign in 1 day' },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent to-yellow-500 text-white font-bold text-2xl mb-4 shadow-xl">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-accent to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
