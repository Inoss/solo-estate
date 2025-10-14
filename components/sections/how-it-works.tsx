'use client'

import { useTranslations } from 'next-intl'
import { MessageSquare, Search, FileCheck, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useLocale } from 'next-intl'

export function HowItWorks() {
  const t = useTranslations('home.howItWorks')
  const locale = useLocale()

  const steps = [
    {
      number: '01',
      title: 'Tell Us Your Goals',
      description: 'Share your investment budget, preferred location, and return expectations. Our experts will understand your unique requirements.',
      icon: MessageSquare,
      color: 'accent',
      bgColor: 'bg-accent/10',
    },
    {
      number: '02',
      title: 'Expert Property Selection',
      description: 'Receive a curated list of properties matching your criteria. We analyze 574+ properties to find your perfect investment.',
      icon: Search,
      color: 'accent',
      bgColor: 'bg-accent/10',
    },
    {
      number: '03',
      title: 'Due Diligence & Verification',
      description: 'We verify developer credentials, legal documents, and property details. Complete transparency at every step.',
      icon: FileCheck,
      color: 'accent',
      bgColor: 'bg-accent/10',
    },
    {
      number: '04',
      title: 'Invest & Earn Returns',
      description: 'Complete your purchase with confidence. Track your investment performance and receive regular updates on returns.',
      icon: TrendingUp,
      color: 'accent',
      bgColor: 'bg-accent/10',
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent mb-4">
            <span className="mr-2">🚀</span>
            Simple & Transparent Process
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            Your Journey to
            <span className="block mt-2 bg-gradient-to-r from-accent to-yellow-500 bg-clip-text text-transparent">
              Smart Real Estate Investment
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            From consultation to closing in 4 simple steps. We handle everything so you can focus on returns.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50 h-full card-hover-lift">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full gradient-gold text-white font-bold text-lg flex items-center justify-center shadow-lg z-10">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`mb-6 inline-flex p-4 rounded-xl ${step.bgColor} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`h-8 w-8 text-${step.color}`} />
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Connecting Arrow (desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <ArrowRight className="h-6 w-6 text-accent" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Link href={`/${locale}/contact`}>
              <Button size="lg" className="gradient-gold text-white hover:opacity-90 px-8 py-6 h-auto text-lg font-bold shadow-xl group">
                <span>Start Your Investment Journey</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href={`/${locale}/projects`}>
              <Button size="lg" variant="outline" className="border-2 px-8 py-6 h-auto text-lg font-semibold">
                Browse Properties First
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            🎯 <strong>No commitment required</strong> • Free consultation • Expert guidance
          </p>
        </div>
      </div>
    </section>
  )
}
