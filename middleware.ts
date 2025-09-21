import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { i18n } from "./i18n.config";

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-expect-error locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

function handleArticlePaywall(request: NextRequest, pathname: string): NextResponse | null {
  // Check if the path contains /articles/ pattern (but not paywall routes)
  const articlesMatch = pathname.match(/\/articles\/([^\/]+)(?!\/paywall)$/);

  if (!articlesMatch || !articlesMatch[1]) {
    return null;
  }

  const slug = articlesMatch[1];
  const hasSubscription = request.cookies.has("platform-press-subscription");

  if (hasSubscription) {
    return null;
  }

  // User doesn't have subscription, rewrite to paywall
  // Extract locale from pathname (guaranteed to be there after locale redirect)
  const pathSegments = pathname.split("/").filter(Boolean);
  const locale = pathSegments[0];

  const paywallPath = `/${locale}/articles/${slug}/paywall`;
  const paywallUrl = new URL(paywallPath, request.url);
  paywallUrl.search = request.nextUrl.search;

  return NextResponse.rewrite(paywallUrl);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }

  // Check for article paywall after locale is guaranteed
  const paywallResponse = handleArticlePaywall(request, pathname);
  if (paywallResponse) {
    return paywallResponse;
  }

  // Continue with normal request
  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|placeholder.svg).*)"],
};
