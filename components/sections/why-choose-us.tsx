'use client'

import { Shield, Award, Users, Clock, BarChart3, HeadphonesIcon } from 'lucide-react'

export function WhyChooseUs() {
  const benefits = [
    {
      icon: Shield,
      title: '100% Verified Properties',
      description: 'Every property undergoes rigorous verification. Legal documents, developer credentials, and construction quality all checked.',
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
    {
      icon: Award,
      title: 'Expert Guidance',
      description: 'Work with licensed real estate professionals who have 10+ years of experience in Georgian property market.',
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
    {
      icon: BarChart3,
      title: 'Transparent Returns',
      description: 'No hidden fees. Clear ROI projections based on actual market data and historical performance.',
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
    {
      icon: Users,
      title: '500+ Happy Investors',
      description: 'Join a community of successful investors who trust us with their real estate investments.',
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
    {
      icon: Clock,
      title: 'Fast Process',
      description: 'From consultation to property purchase in as little as 7 days. We handle all paperwork and legalities.',
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Round-the-clock customer support in multiple languages. We are here whenever you need us.',
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent mb-4">
            <Award className="h-4 w-4 mr-2" />
            Why Investors Choose Us
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            Your Success is
            <span className="block mt-2 bg-gradient-to-r from-accent to-yellow-500 bg-clip-text text-transparent">
              Our Priority
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            We combine local expertise, transparent processes, and proven results to make your real estate investment journey seamless and profitable.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-secondary/30 rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-border/50 card-hover-lift"
              >
                {/* Icon Container */}
                <div className="mb-6 inline-flex">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${benefit.gradient} shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>

                {/* Decorative Element */}
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`} />
              </div>
            )
          })}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4 bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-8 text-white shadow-xl">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">574+</div>
            <div className="text-sm opacity-90">Verified Properties</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">$50M+</div>
            <div className="text-sm opacity-90">Property Value</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">333</div>
            <div className="text-sm opacity-90">Trusted Developers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">98%</div>
            <div className="text-sm opacity-90">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  )
}
