import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/ui/search-box";
import { MobileMenu } from "@/components/ui/mobile-menu";
import { StickyNavigation } from "@/components/ui/sticky-navigation";
import { StockTicker } from "../ui/stock-ticker";
import { getCategories } from "@/lib/cms";

export async function Header() {
  const categories = await getCategories();
  return (
    <>
      <div className="bg-white border-b border-neutral-200">
        {/* Top utility bar - hidden on mobile */}
        <div className="border-b border-neutral-200 hidden md:block">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 items-center h-12">
              <div className="justify-self-start">
                <SearchBox />
              </div>

              <nav className="justify-self-center flex items-center gap-6">
                <span className="text-xs font-medium text-neutral-600 uppercase tracking-wide cursor-default">
                  English
                </span>
                <span className="text-xs font-medium text-neutral-600 uppercase tracking-wide cursor-default">
                  Español
                </span>
                <span className="text-xs font-medium text-neutral-800 tracking-wide cursor-default whitespace-nowrap">
                  中文
                </span>
              </nav>

              <div className="justify-self-end flex items-center gap-3">
                <Button
                  variant="default"
                  size="sm"
                  className="text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                >
                  SUBSCRIBE FOR $1/WEEK
                </Button>
                <Button variant="secondary" size="sm" className="text-xs">
                  LOG IN
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main header section - responsive layout */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-16 md:h-20">
            {/* Mobile: Search and Menu */}
            <div className="flex items-center gap-2 md:hidden">
              <Link
                href="/category/all"
                className="p-2 text-neutral-600 hover:text-black transition-colors"
                aria-label="Search"
              >
                <Search width="18" height="18" />
              </Link>
              <MobileMenu categories={categories} />
            </div>

            {/* Desktop: Date and Today's Paper */}
            <div className="hidden md:flex flex-col justify-self-start">
              <div className="flex items-center gap-4 text-sm text-neutral-600 mb-1">
                <span>Tuesday, September 9, 2025</span>
                <div className="flex items-center gap-1">
                  <span>☁️</span>
                  <span>77°F</span>
                </div>
              </div>
              <span className="text-sm font-medium text-neutral-700">
                Today's Paper
              </span>
            </div>

            {/* Logo - responsive sizing */}
            <Link
              href="/"
              className="font-heading text-lg md:text-4xl font-bold tracking-tight text-black transition-colors hover:text-neutral-700 justify-self-center text-center leading-tight whitespace-nowrap"
            >
              The Platform Press
            </Link>

            {/* Mobile: CTAs */}
            <div className="flex items-center gap-2 md:hidden justify-self-end">
              <Button
                variant="default"
                size="sm"
                className="text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white px-2 py-1"
              >
                Subscribe
              </Button>
            </div>

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
      <StickyNavigation categories={categories} />
    </>
  );
}
