import Link from "next/link";
import { Suspense } from "react";
import { getDictionary } from "@/dictionaries";
import { LocaleSwitcher } from "../layout/locale-switcher";
import { StockTicker } from "../layout/stock-ticker";
import { Today } from "../layout/today";
import { SearchBox } from "./search-box";
import { Subscribe } from "./subscribe";

export const DesktopHeader = async ({ locale }: { locale: string }) => {
  const t = await getDictionary(locale);
  return (
    <div>
      <div className="bg-white border-b border-neutral-200 hidden md:block">
        <div className="border-b border-neutral-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 items-center h-12">
              <SearchBox />
              <LocaleSwitcher activeLocale={locale} />
              <Suspense>
                <Subscribe
                  className="px-4 py-2"
                  unsubscribeText={t.Layout.unsubscribe}
                  subscribeText={t.Layout.subscribe}
                />
              </Suspense>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-16 md:h-20">
            <Today locale={locale} />
            <Link
              href="/"
              className="font-heading text-4xl font-bold tracking-tight text-black transition-colors hover:text-neutral-700 justify-self-center text-center leading-tight whitespace-nowrap"
            >
              The Platform Press
            </Link>
            <Suspense fallback={<StockTickerSkeleton />}>
              <StockTicker />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

function StockTickerSkeleton() {
  return (
    <div className="hidden md:block text-right justify-self-end">
      <div className="w-32 text-right">
        <div className="relative text-sm font-medium text-neutral-700 text-center">
          <div className="relative h-16 flex items-center justify-center overflow-hidden">
            <div className="flex items-center gap-3">
              {/* Stock symbol skeleton */}
              <div className="h-4 w-12 bg-neutral-200 rounded animate-pulse" />
              {/* Stock change skeleton */}
              <div className="h-4 w-16 bg-neutral-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
