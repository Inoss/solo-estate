'use client'

import { useTranslations } from 'next-intl'
import { DollarSign, Target, CreditCard, MapPin, Building2, CheckCircle, Clock, Sparkles } from 'lucide-react'

export function PropertyFinder() {
  const t = useTranslations('home.propertyFinder')

  const parameters = [
    {
      icon: DollarSign,
      title: t('param1Title'),
      description: t('param1Desc'),
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
    {
      icon: Target,
      title: t('param2Title'),
      description: t('param2Desc'),
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
    {
      icon: CreditCard,
      title: t('param3Title'),
      description: t('param3Desc'),
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
    {
      icon: MapPin,
      title: t('param4Title'),
      description: t('param4Desc'),
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
    {
      icon: Building2,
      title: t('param5Title'),
      description: t('param5Desc'),
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
    {
      icon: CheckCircle,
      title: t('param6Title'),
      description: t('param6Desc'),
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
  ]

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-premium pattern-grid texture-noise overflow-hidden">
      {/* Floating Gradient Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl float-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl float-medium" />
      <div className="geometric-square w-32 h-32 bg-accent top-1/4 right-1/3" />

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

          {/* Guarantee Badge */}
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-8 py-5 shadow-xl border-2 border-accent/30 mb-6">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-yellow-500 shadow-lg">
              <Clock className="h-7 w-7 text-white" />
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold text-foreground">{t('guaranteeDays')}</div>
              <div className="text-sm text-muted-foreground">{t('guaranteeText')}</div>
            </div>
          </div>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
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
                <span className="text-sm font-bold">{t('resultBadge')}</span>
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                {t('resultTitle')}
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                {t('resultDesc')}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-4xl font-bold mb-2">{t('stat1')}</div>
                  <div className="text-sm text-white/80">{t('stat1Desc')}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-4xl font-bold mb-2">{t('stat2')}</div>
                  <div className="text-sm text-white/80">{t('stat2Desc')}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-4xl font-bold mb-2">{t('stat3')}</div>
                  <div className="text-sm text-white/80">{t('stat3Desc')}</div>
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
            <h3 className="text-2xl font-bold text-foreground mb-3">{t('processTitle')}</h3>
            <p className="text-muted-foreground">{t('processSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: t('step1Title'), desc: t('step1Desc') },
              { step: '2', title: t('step2Title'), desc: t('step2Desc') },
              { step: '3', title: t('step3Title'), desc: t('step3Desc') },
              { step: '4', title: t('step4Title'), desc: t('step4Desc') },
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
