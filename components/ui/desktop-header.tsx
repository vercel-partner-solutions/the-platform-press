import Link from "next/link";
import { Suspense } from "react";
import { getDictionary } from "@/dictionaries";
import { getCategories } from "@/lib/cms";
import { LocaleSwitcher } from "../layout/locale-switcher";
import { StockTicker } from "../layout/stock-ticker";
import { Today } from "../layout/today";
import { Button } from "./button";
import { SearchBox } from "./search-box";
import { Skeleton } from "./skeleton";
import { Subscribe } from "./subscribe";

export const DesktopHeader = async ({ locale }: { locale: string }) => {
  return (
    <div className="hidden md:flex flex-col h-full">
      <TopHeaderBar locale={locale} />
      <MainHeaderBar locale={locale} />
    </div>
  );
};

export const StickyDesktopNavigation = async ({
  locale,
}: {
  locale: string;
}) => {
  const t = await getDictionary(locale);
  const categories = await getCategories();
  return (
    <div className="sticky top-0 z-50 border-b border-neutral-200 shadow-sm hidden md:block bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="animate-reveal-left">
            <Link
              href="/"
              className="font-heading text-lg font-bold tracking-tight text-black transition-colors hover:text-neutral-700 whitespace-nowrap"
            >
              The Platform Press
            </Link>
          </div>

          <nav className="flex items-center gap-6 overflow-x-auto">
            {categories.map((category: string) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="text-sm font-medium text-black hover:underline whitespace-nowrap"
              >
                {category}
              </Link>
            ))}
          </nav>

          <div className="animate-reveal-right">
            <Subscribe
              size="sm"
              className="text-xs font-medium px-3 py-1.5"
              unsubscribeText={t.Layout.unsubscribe}
              subscribeText={t.Layout.subscribe}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TopHeaderBar = async ({ locale }: { locale: string }) => {
  const t = await getDictionary(locale);
  const translations = {
    subscribe: t.Layout.subscribe,
    login: t.Layout.login,
  };
  return (
    <div className="container mx-auto py-2 px-4 sm:px-6 lg:px-8 border-b border-neutral-100">
      <div className="grid grid-cols-3 items-center">
        <div className="justify-self-start">
          <SearchBox />
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <LocaleSwitcher activeLocale={locale} />
        </Suspense>

        <div className="justify-self-end flex items-center gap-3">
          <Button
            variant="default"
            size="sm"
            className="text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
          >
            {translations.subscribe}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs font-medium border-neutral-300 text-neutral-700 hover:bg-neutral-50 px-4 py-2 bg-transparent"
          >
            {translations.login}
          </Button>
        </div>
      </div>
    </div>
  );
};

const MainHeaderBar = async ({ locale }: { locale: string }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
      <div className="grid grid-cols-3 items-center h-16 md:h-20">
        <Suspense fallback={<div>Loading...</div>}>
          <Today locale={locale} />
        </Suspense>

        <Link
          href="/"
          className="font-heading text-4xl font-bold tracking-tight text-black transition-colors hover:text-neutral-700 justify-self-center text-center leading-tight whitespace-nowrap"
        >
          The Platform Press
        </Link>

        {/* Desktop: Stock ticker */}
        <div className="hidden md:block text-right justify-self-end">
          <div className="w-32 text-right">
            <Suspense fallback={<Skeleton className="w-32 h-6" />}>
              <StockTicker />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};
