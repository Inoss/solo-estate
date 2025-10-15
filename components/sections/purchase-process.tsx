'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  FileText,
  Search,
  Eye,
  FileCheck,
  Trophy,
  Plane,
  User,
  Building,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Star,
  Clock,
  Shield
} from 'lucide-react'

export function PurchaseProcess() {
  const t = useTranslations('home.purchaseProcess')
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const steps = [
    {
      number: t('step1Number'),
      title: t('step1Title'),
      subtitle: t('step1Subtitle'),
      description: t('step1Desc'),
      details: [
        t('step1Detail1'),
        t('step1Detail2'),
        t('step1Detail3'),
        t('step1Detail4')
      ],
      icon: FileText,
      gradient: 'from-accent via-accent/90 to-accent/70',
      bgColor: 'bg-accent/10'
    },
    {
      number: t('step2Number'),
      title: t('step2Title'),
      subtitle: t('step2Subtitle'),
      description: t('step2Desc'),
      details: [
        t('step2Detail1'),
        t('step2Detail2'),
        t('step2Detail3'),
        t('step2Detail4')
      ],
      icon: Search,
      gradient: 'from-accent via-accent/90 to-accent/70',
      bgColor: 'bg-accent/10'
    },
    {
      number: t('step3Number'),
      title: t('step3Title'),
      subtitle: t('step3Subtitle'),
      description: t('step3Desc'),
      details: [
        t('step3Detail1'),
        t('step3Detail2'),
        t('step3Detail3'),
        t('step3Detail4')
      ],
      icon: Eye,
      gradient: 'from-accent via-accent/90 to-accent/70',
      bgColor: 'bg-accent/10'
    },
    {
      number: t('step4Number'),
      title: t('step4Title'),
      subtitle: t('step4Subtitle'),
      description: t('step4Desc'),
      details: [
        t('step4Detail1'),
        t('step4Detail2'),
        t('step4Detail3'),
        t('step4Detail4')
      ],
      icon: FileCheck,
      gradient: 'from-accent via-accent/90 to-accent/70',
      bgColor: 'bg-accent/10'
    },
    {
      number: t('step5Number'),
      title: t('step5Title'),
      subtitle: t('step5Subtitle'),
      description: t('step5Desc'),
      details: [
        t('step5Detail1'),
        t('step5Detail2'),
        t('step5Detail3'),
        t('step5Detail4')
      ],
      icon: Trophy,
      gradient: 'from-accent to-accent/70',
      bgColor: 'bg-accent/10'
    }
  ]

  const premiumServices = [
    {
      icon: Plane,
      title: t('vip1Title'),
      description: t('vip1Desc'),
      color: 'from-accent via-accent/80 to-accent/60'
    },
    {
      icon: User,
      title: t('vip2Title'),
      description: t('vip2Desc'),
      color: 'from-accent via-accent/80 to-accent/60'
    },
    {
      icon: Building,
      title: t('vip3Title'),
      description: t('vip3Desc'),
      color: 'from-accent via-accent/80 to-accent/60'
    },
    {
      icon: MapPin,
      title: t('vip4Title'),
      description: t('vip4Desc'),
      color: 'from-accent via-accent/80 to-accent/60'
    }
  ]

  const guarantees = [
    { icon: Clock, text: t('guarantee1'), subtext: t('guarantee1Sub') },
    { icon: Shield, text: t('guarantee2'), subtext: t('guarantee2Sub') },
    { icon: Star, text: t('guarantee3'), subtext: t('guarantee3Sub') }
  ]

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2400&auto=format&fit=crop"
          alt="Luxury Interior Background"
          fill
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 image-overlay-light" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/20 to-yellow-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-accent/30 shadow-lg mb-6">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-sm font-bold text-accent">{t('badge')}</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {t('title')}
            <span className="block mt-2 bg-gradient-to-r from-accent to-yellow-500 bg-clip-text text-transparent">
              {t('titleHighlight')}
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            {t('subtitle')}
          </p>

          {/* Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {guarantees.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="flex items-center gap-3 bg-white rounded-xl px-5 py-3 shadow-md border border-border/50">
                  <Icon className="h-5 w-5 text-accent" />
                  <div className="text-left">
                    <div className="font-bold text-sm text-foreground">{item.text}</div>
                    <div className="text-xs text-muted-foreground">{item.subtext}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Steps Timeline */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = activeStep === index

              return (
                <div
                  key={index}
                  className="group relative"
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-accent/30 to-transparent hidden lg:block" />
                  )}

                  <div className={`relative bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${
                    isActive ? 'border-accent scale-[1.02]' : 'border-border/50'
                  }`}>
                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                      {/* Left: Number and Icon */}
                      <div className="flex-shrink-0">
                        <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-8 w-8 text-white" />
                          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-foreground text-white font-bold flex items-center justify-center text-sm shadow-lg">
                            {step.number}
                          </div>
                        </div>
                      </div>

                      {/* Middle: Content */}
                      <div className="flex-1">
                        <div className="mb-4">
                          <div className="text-sm font-bold text-accent mb-1">{step.subtitle}</div>
                          <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>

                        {/* Details List */}
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 overflow-hidden transition-all duration-500 ${
                          isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 lg:max-h-96 lg:opacity-100'
                        }`}>
                          {step.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-foreground">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Step Indicator (Desktop) */}
                      <div className="hidden lg:block">
                        <div className={`w-32 h-32 rounded-2xl ${step.bgColor} flex items-center justify-center border-2 border-border/50 group-hover:border-accent transition-colors`}>
                          <div className="text-center">
                            <div className="text-4xl font-bold text-foreground mb-1">{index + 1}</div>
                            <div className="text-xs text-muted-foreground font-semibold">of {steps.length}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Border on Hover */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Premium Services Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-primary via-primary/95 to-accent rounded-3xl p-10 lg:p-14 shadow-2xl overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_50%)]" />
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-4 border border-white/30">
                  <Star className="h-5 w-5 text-white" />
                  <span className="text-sm font-bold text-white">{t('vipBadge')}</span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  {t('vipTitle')}
                </h3>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  {t('vipSubtitle')}
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {premiumServices.map((service, idx) => {
                  const Icon = service.icon
                  return (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-bold text-white mb-2 text-lg">{service.title}</h4>
                      <p className="text-sm text-white/80">{service.description}</p>
                    </div>
                  )
                })}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 px-10 py-7 h-auto text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <span>{t('ctaButton1')}</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-10 py-7 h-auto text-lg font-bold transition-all duration-300"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  <span>{t('ctaButton2')}</span>
                </Button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          </div>
        </div>

        {/* Final CTA Stats */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-border/50 text-center hover:shadow-xl transition-shadow">
              <div className="text-5xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent mb-2">
                {t('stat1')}
              </div>
              <div className="text-sm text-muted-foreground font-semibold">{t('stat1Desc')}</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-border/50 text-center hover:shadow-xl transition-shadow">
              <div className="text-5xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent mb-2">
                {t('stat2')}
              </div>
              <div className="text-sm text-muted-foreground font-semibold">{t('stat2Desc')}</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-border/50 text-center hover:shadow-xl transition-shadow">
              <div className="text-5xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent mb-2">
                {t('stat3')}
              </div>
              <div className="text-sm text-muted-foreground font-semibold">{t('stat3Desc')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
