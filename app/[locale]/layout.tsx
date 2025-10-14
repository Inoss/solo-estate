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

  return {
    title: 'SOLO Estate - Investment Real Estate in Georgia',
    description: 'Verified investment real estate projects in Georgia with transparent metrics and guaranteed returns',
    openGraph: {
      title: 'SOLO Estate - Investment Real Estate',
      description: 'Verified investment real estate projects in Georgia',
      locale: locale,
      type: 'website',
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
