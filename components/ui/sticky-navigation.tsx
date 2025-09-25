import { Suspense } from "react";
import { Subscribe } from "./subscribe";
import Link from "next/link";
import { getDictionary } from "@/dictionaries";
import { getCategories } from "@/lib/cms";
import { unstable_cacheTag as cacheTag } from "next/cache";

export async function StickyNavigation({ locale }: { locale: string }) {
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

          <Categories />

          <div className="animate-reveal-right">
            <Suspense>
              <Subscribe
                size="sm"
                className="text-xs font-medium px-3 py-1.5"
                unsubscribeText={t.Layout.unsubscribe}
                subscribeText={t.Layout.subscribe}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

async function Categories() {
  "use cache: remote";
  cacheTag("categories");

  const categories = await getCategories();

  return (
    <nav className="flex items-center gap-6 overflow-x-auto">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/category/${category.slug.toLowerCase()}`}
          className="text-sm font-medium text-black hover:underline whitespace-nowrap"
        >
          {category.title}
        </Link>
      ))}
    </nav>
  );
}
