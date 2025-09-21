import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the path contains /articles/ pattern to detect article routes (but not paywall routes)
  const articlesMatch = pathname.match(/\/articles\/([^\/]+)(?!\/paywall)$/);

  if (articlesMatch && articlesMatch[1]) {
    const slug = articlesMatch[1];

    const hasSubscription = request.cookies.has("platform-press-subscription");

    // if the user does not have a subscription, then rewrite to the paywall
    if (!hasSubscription) {
      // Extract locale from pathname to construct proper rewrite URL
      const pathSegments = pathname.split("/").filter(Boolean);
      const possibleLocale = pathSegments[0];
      const supportedLocales = routing.locales;
      const hasLocalePrefix = supportedLocales.includes(possibleLocale as any);

      // Construct rewrite URL with proper locale handling
      let paywallPath;
      if (hasLocalePrefix) {
        paywallPath = `/${possibleLocale}/articles/${slug}/paywall`;
      } else {
        // Default locale (en-US) - no prefix needed in URL but needed for rewrite
        paywallPath = `/en-US/articles/${slug}/paywall`;
      }

      const paywallUrl = new URL(paywallPath, request.url);

      // Preserve any search parameters
      paywallUrl.search = request.nextUrl.search;

      return NextResponse.rewrite(paywallUrl);
    }
  }

  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(request);
  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
