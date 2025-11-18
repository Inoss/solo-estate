import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';
import { NextResponse, type NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Always use locale prefix
  localePrefix: 'always',

  // Disable automatic locale detection
  localeDetection: false
});

export default async function middleware(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  // Handle admin routes - authentication is handled in layouts
  if (isAdminRoute) {
    return NextResponse.next();
  }

  // For non-admin routes, use internationalization middleware
  return intlMiddleware(req);
}

export const config = {
  // Match all routes except static files
  matcher: ['/', '/(ka|ru|he|az|hy|uk|en)/:path*', '/admin/:path*']
};
