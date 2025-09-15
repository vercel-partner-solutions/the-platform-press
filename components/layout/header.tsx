import { Link } from '@/i18n/navigation';
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import LocaleSwitcher from "./locale-switcher";
import { Today } from "./today";
import { StockTicker } from "./stock-ticker";
import { getCategories } from '@/lib/cms';
import { getLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

export async function Header() {
  const categories = await getCategories();
  const locale = await getLocale();
  const t = await getTranslations("Layout");

  const translations = {
    subscribe: t("subscribe"),
    login: t("login"),
  };

  return (
    <NextIntlClientProvider locale={locale} messages={null}>
      <div className="bg-white border-b border-neutral-200">
        <div className="border-b border-neutral-100 hidden md:block">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 items-center h-12">
              <div>
                <Search size={16} />
              </div>
              <Suspense>
                <LocaleSwitcher />
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
        </div>

        {/* Main header section - responsive layout */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-16 md:h-20">
            <Today />
            <Link
              href="/"
              className="font-heading text-lg md:text-4xl font-bold tracking-tight text-black transition-colors hover:text-neutral-700 justify-self-center text-center leading-tight whitespace-nowrap"
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

      {/* Sticky navigation - desktop only */}
      <header
        className={`bg-white sticky top-0 z-50 border-b border-neutral-200 transition-all duration-300 ease-in-out hidden md:block`}
      >
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
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5"
                >
                  SUBSCRIBE
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs font-medium border-neutral-300 text-neutral-700 hover:bg-neutral-50 px-3 py-1.5 bg-transparent"
                >
                  LOG IN
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </NextIntlClientProvider>
  );
}
