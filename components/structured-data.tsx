export function StructuredData({ locale }: { locale: string }) {

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'SOLO Estate',
    description: 'Premium real estate investment services in Georgia. Verified properties in Tbilisi and Batumi with guaranteed returns.',
    url: `https://solo-estate.com/${locale}`,
    logo: 'https://solo-estate.com/logo.png',
    image: 'https://solo-estate.com/logo.png',
    telephone: '+995-XXX-XXX-XXX',
    email: 'info@solo-estate.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GE',
      addressLocality: 'Tbilisi',
      addressRegion: 'Tbilisi',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '41.7151',
      longitude: '44.8271',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Tbilisi',
        '@id': 'https://www.wikidata.org/wiki/Q994',
      },
      {
        '@type': 'City',
        name: 'Batumi',
        '@id': 'https://www.wikidata.org/wiki/Q130856',
      },
      {
        '@type': 'Country',
        name: 'Georgia',
        '@id': 'https://www.wikidata.org/wiki/Q230',
      },
    ],
    sameAs: [
      'https://facebook.com/soloestate',
      'https://instagram.com/soloestate',
      'https://linkedin.com/company/soloestate',
      'https://twitter.com/soloestate',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+995-XXX-XXX-XXX',
      contactType: 'Customer Service',
      availableLanguage: ['en', 'ka', 'ru', 'he', 'az', 'hy', 'uk'],
      areaServed: 'GE',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
      bestRating: '5',
      worstRating: '1',
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SOLO Estate',
    alternateName: 'SOLO Estate Georgia',
    url: `https://solo-estate.com/${locale}`,
    description: 'Find and buy premium real estate in Georgia. Apartments in Tbilisi, Batumi properties, investment opportunities with verified returns.',
    inLanguage: [locale],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://solo-estate.com/${locale}/projects?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://solo-estate.com/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projects',
        item: `https://solo-estate.com/${locale}/projects`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Services',
        item: `https://solo-estate.com/${locale}/services`,
      },
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Real Estate Investment Services',
    provider: {
      '@type': 'RealEstateAgent',
      name: 'SOLO Estate',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Georgia',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Real Estate Investment Properties',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Apartments in Tbilisi',
            description: 'Premium apartments in Tbilisi with investment returns up to 30%',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Batumi Real Estate',
            description: 'Seaside properties in Batumi for investment and residence',
          },
        },
      ],
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '40000',
      highPrice: '5000000',
      offerCount: '574',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can foreigners buy real estate in Georgia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, foreigners have 100% ownership rights for real estate in Georgia, same as local citizens. There are no restrictions on property ownership for international buyers.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the average ROI for rental properties in Georgia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Georgia offers exceptional rental yields. Long-term rentals provide 8-12% annual ROI, while short-term vacation rentals can achieve 15-30% annual returns, especially in Tbilisi and Batumi.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does an apartment cost in Tbilisi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Apartment prices in Tbilisi start from $800 per m² for new construction projects. Resale properties typically start from $1,200 per m². Prices vary based on location, finishing, and developer.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is it possible to buy property remotely in Georgia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can purchase property in Georgia completely remotely with virtual tours, digital document signing, remote notarization, and international payment options including SWIFT and cryptocurrency.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
