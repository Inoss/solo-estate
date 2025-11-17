import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';
import { auth } from "@/auth";
import { NextResponse } from "next/server";

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

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  // Handle admin routes with authentication
  if (isAdminRoute) {
    const isLoggedIn = !!req.auth;
    const isLoginPage = req.nextUrl.pathname === "/admin/login";

    if (!isLoginPage && !isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    if (isLoginPage && isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    return NextResponse.next();
  }

  // For non-admin routes, use internationalization middleware
  return intlMiddleware(req);
});

export const config = {
  // Match all routes except static files
  matcher: ['/', '/(ka|ru|he|az|hy|uk|en)/:path*', '/admin/:path*']
};
