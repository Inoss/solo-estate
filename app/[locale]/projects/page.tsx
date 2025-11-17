import { getTranslations } from 'next-intl/server'
import { ProjectsList } from '@/components/projects-list'
import { getProjects } from '@/lib/projects'
import type { Locale } from '@/i18n'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  const titles: Record<string, string> = {
    en: 'Real Estate Projects Georgia | 574+ Apartments for Sale Tbilisi & Batumi - SOLO Estate',
    ru: 'Проекты Недвижимости Грузия | 574+ Квартир на Продажу Тбилиси и Батуми - SOLO Estate',
    ka: 'უძრავი ქონების პროექტები საქართველო | 574+ ბინა გასაყიდად თბილისი და ბათუმი - SOLO Estate',
    he: 'פרויקטי נדל״ן בג׳ורג׳יה | 574+ דירות למכירה בטביליסי ובבאטומי - SOLO Estate',
    az: 'Gürcüstan Daşınmaz Əmlak Layihələri | 574+ Mənzil Satılır Tbilisi və Batumi - SOLO Estate',
    hy: 'Անշարժ Գույքի Նախագծեր Վրաստան | 574+ Բնակարան Վաճառքի Թբիլիսի և Բաթումի - SOLO Estate',
    uk: 'Проєкти Нерухомості Грузія | 574+ Квартир на Продаж Тбілісі та Батумі - SOLO Estate',
  }

  const descriptions: Record<string, string> = {
    en: 'Browse 574+ verified real estate investment projects in Georgia. Apartments in Tbilisi, Batumi properties with 30% ROI. Filter by location, price, yield. Expert support, transparent pricing.',
    ru: 'Просмотрите 574+ проверенных проектов недвижимости в Грузии. Квартиры в Тбилиси, недвижимость Батуми с доходностью 30%. Фильтр по расположению, цене, доходности. Экспертная поддержка.',
    ka: 'დაათვალიერეთ 574+ გადამოწმებული უძრავი ქონების პროექტი საქართველოში. ბინები თბილისში, ბათუმის უძრავი ქონება 30% ROI-ით. ფილტრი ადგილმდებარეობით, ფასით, შემოსავლიანობით.',
    he: 'עיין ב-574+ פרויקטי נדל״ן מאומתים בג׳ורג׳יה. דירות בטביליסי, נכסים בבאטומי עם תשואה של 30%. סנן לפי מיקום, מחיר, תשואה. תמיכת מומחים, תמחור שקוף.',
    az: '574+ təsdiqlənmiş daşınmaz əmlak layihəsinə baxın. Tbilisidə mənzillər, Batumidə əmlak 30% ROI ilə. Yer, qiymət, gəlir üzrə filter. Ekspert dəstəyi, şəffaf qiymət.',
    hy: 'Դիտեք 574+ հաստատված անշարժ գույքի նախագծեր Վրաստանում. Բնակարաններ Թբիլիսիում, Բաթումիի անշարժ գույք 30% ROI-ով. Զտել ըստ տեղանքի, գնի, եկամտաբերության.',
    uk: 'Перегляньте 574+ перевірених проєктів нерухомості в Грузії. Квартири в Тбілісі, нерухомість Батумі з прибутковістю 30%. Фільтр за розташуванням, ціною, прибутковістю.',
  }

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: 'Real Estate Projects Georgia, Apartments for Sale Tbilisi, Batumi Real Estate, Investment Properties, New Construction Georgia, Property Listings, Real Estate Search Georgia, Buy Apartment Georgia, Property Investment Opportunities',
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      locale: locale,
      type: 'website',
      url: `https://solo-estate.com/${locale}/projects`,
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
    alternates: {
      canonical: `https://solo-estate.com/${locale}/projects`,
    },
  }
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  // Load all projects from our database
  const projects = await getProjects(locale as Locale)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-secondary/10 to-white">
      {/* Hero Header Section */}
      <div className="relative bg-gradient-to-br from-primary via-primary/95 to-accent overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-20 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
              <span className="text-sm font-bold text-white">Premium Investment Portfolio</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Exclusive Real Estate
              <span className="block mt-2 text-accent">Investment Opportunities</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
              Discover {projects.length} carefully curated investment properties in Georgia's most prestigious locations.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <ProjectsList projects={projects} />
      </div>
    </div>
  )
}
