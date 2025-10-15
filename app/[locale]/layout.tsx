import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Noto_Sans_Georgian, Noto_Sans_Hebrew, Noto_Sans_Armenian } from 'next/font/google';
import { locales } from '@/i18n';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { GoogleAnalytics } from '@/components/analytics';
import { TawkChat } from '@/components/tawk-chat';
import { CookieConsent } from '@/components/cookie-consent';
import { StructuredData } from '@/components/structured-data';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const notoGeorgian = Noto_Sans_Georgian({
  subsets: ['georgian'],
  variable: '--font-georgian',
  display: 'swap',
});

const notoHebrew = Noto_Sans_Hebrew({
  subsets: ['hebrew'],
  variable: '--font-hebrew',
  display: 'swap',
});

const notoArmenian = Noto_Sans_Armenian({
  subsets: ['armenian'],
  variable: '--font-armenian',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const seo = (messages as any).seo || {};

  return {
    title: seo.title || 'SOLO Estate - Investment Real Estate in Georgia',
    description: seo.description || 'Verified investment real estate projects in Georgia with transparent metrics and guaranteed returns',
    keywords: seo.keywords || 'Real Estate Georgia, Apartments Tbilisi, Investment Property, Real Estate Investments',
    authors: [{ name: 'SOLO Estate' }],
    creator: 'SOLO Estate',
    publisher: 'SOLO Estate',
    alternates: {
      canonical: `https://solo-estate.com/${locale}`,
      languages: {
        'en': 'https://solo-estate.com/en',
        'ka': 'https://solo-estate.com/ka',
        'ru': 'https://solo-estate.com/ru',
        'he': 'https://solo-estate.com/he',
        'az': 'https://solo-estate.com/az',
        'hy': 'https://solo-estate.com/hy',
        'uk': 'https://solo-estate.com/uk',
      },
    },
    icons: {
      icon: [
        { url: '/logo.png', sizes: '256x256', type: 'image/png' },
      ],
      apple: [
        { url: '/logo.png', sizes: '256x256', type: 'image/png' },
      ],
      shortcut: '/logo.png',
    },
    openGraph: {
      title: seo.ogTitle || 'SOLO Estate - Investment Real Estate',
      description: seo.ogDescription || 'Verified investment real estate projects in Georgia',
      locale: locale,
      type: 'website',
      url: `https://solo-estate.com/${locale}`,
      siteName: 'SOLO Estate',
      images: [
        {
          url: 'https://solo-estate.com/logo.png',
          width: 1200,
          height: 630,
          alt: 'SOLO Estate - Premium Real Estate Investments',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.twitterTitle || 'SOLO Estate - Investment Real Estate',
      description: seo.twitterDescription || 'Verified investment real estate projects in Georgia',
      images: ['https://solo-estate.com/logo.png'],
      creator: '@soloestate',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages({ locale });

  // Set direction based on locale (Hebrew is RTL)
  const dir = locale === 'he' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${inter.variable} ${notoGeorgian.variable} ${notoHebrew.variable} ${notoArmenian.variable} font-sans antialiased`}
      >
        <GoogleAnalytics />
        <TawkChat />
        <CookieConsent />
        <StructuredData locale={locale} />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
