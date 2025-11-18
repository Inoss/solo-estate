import Script from 'next/script'

interface OrganizationSchemaProps {
  locale: string
}

export function OrganizationSchema({ locale }: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'SOLO Estate',
    description: 'Investment real estate agency in Georgia specializing in verified property opportunities with transparent metrics',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`,
    logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
    telephone: '+995-511-107-142',
    email: 'sales@soloestate.ge',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GE',
      addressLocality: 'Tbilisi',
      addressRegion: 'Tbilisi',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '41.6938',
      longitude: '44.8015',
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Georgia',
      },
    ],
    knowsAbout: [
      'Real Estate Investment',
      'Property Management',
      'Real Estate Development',
      'Investment Advisory',
    ],
    slogan: 'Verified investment real estate with transparent metrics',
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface PropertySchemaProps {
  property: any
  locale: string
}

export function PropertySchema({ property, locale }: PropertySchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title[locale] || property.title.en,
    description: property.description?.[locale] || property.description?.en,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/projects/${property.slug.current}`,
    image: property.coverImage,
    offers: {
      '@type': 'Offer',
      price: property.pricing?.startingPrice,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GE',
      addressLocality: property.location?.city,
      addressRegion: property.location?.region,
      streetAddress: property.location?.address,
    },
    geo: property.location?.coordinates && {
      '@type': 'GeoCoordinates',
      latitude: property.location.coordinates.lat,
      longitude: property.location.coordinates.lng,
    },
    floorSize: property.area && {
      '@type': 'QuantitativeValue',
      value: property.area.total,
      unitCode: 'MTK',
    },
  }

  return (
    <Script
      id="property-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ArticleSchemaProps {
  article: any
  locale: string
}

export function ArticleSchema({ article, locale }: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title[locale] || article.title.en,
    description: article.excerpt?.[locale] || article.excerpt?.en,
    image: article.coverImage,
    datePublished: article.publishedAt,
    dateModified: article._updatedAt,
    author: {
      '@type': 'Organization',
      name: 'SOLO Estate',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SOLO Estate',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/insights/${article.slug.current}`,
    },
  }

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
