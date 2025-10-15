import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import {
  Building2,
  Home,
  Scale,
  DollarSign,
  Calculator,
  ArrowRightLeft,
  Bitcoin,
  FileText,
  CheckCircle,
  Sparkles,
  Landmark,
  TrendingUp
} from 'lucide-react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })

  return {
    title: `${t('title')} - SOLO Estate`,
    description: t('description'),
    openGraph: {
      title: `${t('title')} - SOLO Estate`,
      description: t('description'),
      locale: locale,
      type: 'website',
    },
  }
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })

  const services = [
    {
      icon: Building2,
      title: t('newConstruction.title'),
      description: t('newConstruction.description'),
      features: [
        t('newConstruction.feature1'),
        t('newConstruction.feature2'),
        t('newConstruction.feature3'),
        t('newConstruction.feature4'),
      ],
    },
    {
      icon: Home,
      title: t('secondaryMarket.title'),
      description: t('secondaryMarket.description'),
      features: [
        t('secondaryMarket.feature1'),
        t('secondaryMarket.feature2'),
        t('secondaryMarket.feature3'),
      ],
    },
    {
      icon: Scale,
      title: t('legalConsulting.title'),
      description: t('legalConsulting.description'),
      features: [
        t('legalConsulting.feature1'),
        t('legalConsulting.feature2'),
        t('legalConsulting.feature3'),
        t('legalConsulting.feature4'),
      ],
    },
    {
      icon: DollarSign,
      title: t('funding.title'),
      description: t('funding.description'),
      features: [
        t('funding.feature1'),
        t('funding.feature2'),
        t('funding.feature3'),
        t('funding.feature4'),
      ],
    },
    {
      icon: CheckCircle,
      title: t('investmentConsulting.title'),
      description: t('investmentConsulting.description'),
      features: [
        t('investmentConsulting.feature1'),
        t('investmentConsulting.feature2'),
        t('investmentConsulting.feature3'),
        t('investmentConsulting.feature4'),
      ],
    },
    {
      icon: Calculator,
      title: t('investmentCalculator.title'),
      description: t('investmentCalculator.description'),
      features: [
        t('investmentCalculator.feature1'),
        t('investmentCalculator.feature2'),
        t('investmentCalculator.feature3'),
      ],
    },
    {
      icon: ArrowRightLeft,
      title: t('internationalTransactions.title'),
      description: t('internationalTransactions.description'),
      features: [
        t('internationalTransactions.feature1'),
        t('internationalTransactions.feature2'),
        t('internationalTransactions.feature3'),
      ],
    },
    {
      icon: Bitcoin,
      title: t('cryptoAcceptance.title'),
      description: t('cryptoAcceptance.description'),
      features: [
        t('cryptoAcceptance.feature1'),
        t('cryptoAcceptance.feature2'),
        t('cryptoAcceptance.feature3'),
      ],
    },
    {
      icon: FileText,
      title: t('residencePermit.title'),
      description: t('residencePermit.description'),
      features: [
        t('residencePermit.feature1'),
        t('residencePermit.feature2'),
        t('residencePermit.feature3'),
        t('residencePermit.feature4'),
      ],
    },
    {
      icon: Sparkles,
      title: t('vipService.title'),
      description: t('vipService.description'),
      features: [
        t('vipService.feature1'),
        t('vipService.feature2'),
        t('vipService.feature3'),
        t('vipService.feature4'),
      ],
    },
    {
      icon: Landmark,
      title: t('bankAccount.title'),
      description: t('bankAccount.description'),
      features: [
        t('bankAccount.feature1'),
        t('bankAccount.feature2'),
        t('bankAccount.feature3'),
        t('bankAccount.feature4'),
      ],
    },
    {
      icon: TrendingUp,
      title: t('liquidity.title'),
      description: t('liquidity.description'),
      features: [
        t('liquidity.feature1'),
        t('liquidity.feature2'),
        t('liquidity.feature3'),
        t('liquidity.feature4'),
      ],
    },
  ]

  const process = [
    {
      step: '01',
      title: t('process.step1.title'),
      description: t('process.step1.description'),
    },
    {
      step: '02',
      title: t('process.step2.title'),
      description: t('process.step2.description'),
    },
    {
      step: '03',
      title: t('process.step3.title'),
      description: t('process.step3.description'),
    },
    {
      step: '04',
      title: t('process.step4.title'),
      description: t('process.step4.description'),
    },
    {
      step: '05',
      title: t('process.step5.title'),
      description: t('process.step5.description'),
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2400&auto=format&fit=crop"
            alt="Luxury Real Estate Background"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/85"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10 z-[1]">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse-glow"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-5 py-2.5 bg-accent/20 backdrop-blur-sm text-accent-foreground rounded-full text-sm font-medium mb-6 border border-accent/30 shadow-lg">
              {t('hero.badge')}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground drop-shadow-2xl leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/95 max-w-2xl mx-auto drop-shadow-lg leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              {t('ourServicesBadge')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('ourServices')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('servicesSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-border bg-card hover:bg-card-hover hover:border-accent/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center mb-6 transition-colors">
                  <service.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2.5">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              {t('process.badge')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('process.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('process.subtitle')}
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {process.map((item, index) => (
              <div
                key={index}
                className="group flex gap-6 items-start p-8 rounded-2xl border border-border bg-card hover:bg-card-hover hover:border-accent/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-lg font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground rounded-3xl p-12 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-48 h-48 bg-accent rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('cta.title')}</h2>
              <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                {t('cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`/${locale}/contact`}
                  className="inline-block bg-accent text-accent-foreground px-8 py-4 rounded-xl font-semibold hover:bg-accent/90 transition-all hover:scale-105 shadow-lg"
                >
                  {t('cta.button')}
                </a>
                <a
                  href={`/${locale}/projects`}
                  className="inline-block bg-primary-foreground text-primary px-8 py-4 rounded-xl font-semibold hover:bg-primary-foreground/90 transition-all hover:scale-105"
                >
                  {t('cta.secondaryButton')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
