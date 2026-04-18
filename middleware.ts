import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './src/lib/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin route protection (works for all locales) ──
  // Match /en/admin/*, /ar/admin/*, /admin/* but NOT */admin/login
  const adminPattern = /^\/(en|ar)?\/admin(?!\/login)/;
  const isAdminRoute = adminPattern.test(pathname);

  if (isAdminRoute) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      // Extract locale from path or default
      const localeMatch = pathname.match(/^\/(en|ar)/);
      const locale = localeMatch ? localeMatch[1] : 'en';
      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Lightweight JWT structure check (no signature verify in edge)
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Bad token');
      const payload = JSON.parse(atob(parts[1]));
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        throw new Error('Expired');
      }
    } catch {
      const localeMatch = pathname.match(/^\/(en|ar)/);
      const locale = localeMatch ? localeMatch[1] : 'en';
      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ── Redirect from admin/login if already authenticated ──
  const loginPattern = /^\/(en|ar)?\/admin\/login$/;
  if (loginPattern.test(pathname)) {
    const token = request.cookies.get('admin_token')?.value;
    if (token) {
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          if (payload.exp && payload.exp * 1000 > Date.now()) {
            const localeMatch = pathname.match(/^\/(en|ar)/);
            const locale = localeMatch ? localeMatch[1] : 'en';
            return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
          }
        }
      } catch {
        // Invalid token — let them see login
      }
    }
  }

  // ── Let next-intl handle locale routing for everything ──
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except API routes, _next, and static files
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
