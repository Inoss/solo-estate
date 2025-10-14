import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Always use locale prefix
  localePrefix: 'always',

  // Disable automatic locale detection
  localeDetection: false
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ka|ru|he|az|hy|uk|en)/:path*']
};
