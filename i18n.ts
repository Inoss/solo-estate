import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Supported locales
export const locales = ['en', 'ka', 'ru', 'he', 'az', 'hy', 'uk'] as const;
export type Locale = typeof locales[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ka: 'ქართული',
  ru: 'Русский',
  he: 'עברית',
  az: 'Azərbaycan',
  hy: 'Հայերեն',
  uk: 'Українська',
};

export default getRequestConfig(async ({ locale }) => {
  // The middleware already validates the locale, so we don't need to check here
  // Just ensure we have a valid locale, defaulting to 'en' if not provided
  const validLocale = (locale && locales.includes(locale as Locale)) ? locale : 'en';

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default,
  };
});
