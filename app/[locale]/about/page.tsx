import { getTranslations } from 'next-intl/server'
import { AboutHero } from '@/components/about/about-hero'
import { CompanyStory } from '@/components/about/company-story'
import { OurValues } from '@/components/about/our-values'
import { Statistics } from '@/components/about/statistics'
import { WhyChooseUs } from '@/components/about/why-choose-us'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })

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

export default async function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <Statistics />
      <CompanyStory />
      <OurValues />
      <WhyChooseUs />
    </div>
  )
}
