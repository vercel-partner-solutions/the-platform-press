import Link from "next/link";

import { getDictionary } from "@/dictionaries";
import { getCategories } from "@/lib/cms";
import { LocaleSwitcher } from "../layout/locale-switcher";
import { StockTicker } from "../layout/stock-ticker";
import { Today } from "../layout/today";
import { SearchBox } from "./search-box";
import { Subscribe } from "./subscribe";

export const DesktopHeader = async ({ locale }: { locale: string }) => {
  const t = await getDictionary(locale);
  const categories = await getCategories();
  return (
    <>
      {/* Main header content - not sticky */}
      <div className="bg-white border-b border-neutral-200 hidden md:block">
        <div className="border-b border-neutral-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 items-center h-12">
              <div className="justify-self-start">
                <SearchBox />
              </div>

              <LocaleSwitcher />

              <div className="justify-self-end flex items-center gap-3">
                <Subscribe
                  className="px-4 py-2"
                  unsubscribeText={t.Layout.unsubscribe}
                  subscribeText={t.Layout.subscribe}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Desktop header section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-16 md:h-20">
            <Today locale={locale} />

            <Link
              href="/"
              className="font-heading text-4xl font-bold tracking-tight text-black transition-colors hover:text-neutral-700 justify-self-center text-center leading-tight whitespace-nowrap"
            >
              The Platform Press
            </Link>

            {/* Desktop: Stock ticker */}
            <div className="hidden md:block text-right justify-self-end">
              <div className="w-32 text-right">
                <StockTicker />
              </div>
            </div>
          </div>
        </div>
      </div>
      <StickyCategories categories={categories} locale={locale} />
    </>
  );
};

export const StickyCategories = async ({
  categories,
  locale,
}: {
  categories: string[];
  locale: string;
}) => {
  const t = await getDictionary(locale);
  return (
    <div className="bg-white sticky top-0 z-50 border-b border-neutral-200 shadow-sm hidden md:block">
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
            {categories.map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="text-sm font-medium text-black hover:underline whitespace-nowrap"
              >
                {category}
              </Link>
            ))}
            <Link
              href="/category/opinion"
              className="text-sm font-medium text-black hover:underline whitespace-nowrap"
            >
              Opinion
            </Link>
            <Link
              href="/category/latest"
              className="text-sm font-medium hover:underline whitespace-nowrap cursor-pointer"
              style={{
                color: "#dc2626",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                boxShadow: "none",
              }}
            >
              Live
            </Link>
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
