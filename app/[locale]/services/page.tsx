import { getTranslations } from 'next-intl/server'
import { CheckCircle, Shield, TrendingUp, Users, FileCheck, Home, HeadphonesIcon } from 'lucide-react'

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
      icon: Users,
      title: t('consultation.title'),
      description: t('consultation.description'),
      features: [
        t('consultation.feature1'),
        t('consultation.feature2'),
        t('consultation.feature3'),
      ],
    },
    {
      icon: Shield,
      title: t('dueDiligence.title'),
      description: t('dueDiligence.description'),
      features: [
        t('dueDiligence.feature1'),
        t('dueDiligence.feature2'),
        t('dueDiligence.feature3'),
      ],
    },
    {
      icon: FileCheck,
      title: t('legal.title'),
      description: t('legal.description'),
      features: [
        t('legal.feature1'),
        t('legal.feature2'),
        t('legal.feature3'),
      ],
    },
    {
      icon: Home,
      title: t('management.title'),
      description: t('management.description'),
      features: [
        t('management.feature1'),
        t('management.feature2'),
        t('management.feature3'),
      ],
    },
    {
      icon: TrendingUp,
      title: t('investment.title'),
      description: t('investment.description'),
      features: [
        t('investment.feature1'),
        t('investment.feature2'),
        t('investment.feature3'),
      ],
    },
    {
      icon: HeadphonesIcon,
      title: t('support.title'),
      description: t('support.description'),
      features: [
        t('support.feature1'),
        t('support.feature2'),
        t('support.feature3'),
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
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">{t('hero.title')}</h1>
            <p className="text-xl text-muted-foreground">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('ourServices')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('servicesSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl border bg-card hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('process.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('process.subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {process.map((item, index) => (
              <div
                key={index}
                className="flex gap-6 items-start"
              >
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1 pt-3">
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-primary text-primary-foreground rounded-3xl p-12">
            <h2 className="text-4xl font-bold mb-6">{t('cta.title')}</h2>
            <p className="text-xl mb-8 opacity-90">{t('cta.subtitle')}</p>
            <a
              href={`/${locale}/contact`}
              className="inline-block bg-background text-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              {t('cta.button')}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
