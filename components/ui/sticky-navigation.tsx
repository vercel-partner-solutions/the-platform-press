import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import { getDictionary } from "@/dictionaries";
import { getCategories } from "@/lib/cms";
import { Subscribe } from "./subscribe";

export async function StickyNavigation({ locale }: { locale: string }) {
  const t = await getDictionary(locale);
  return (
    <div className="bg-white sticky top-0 z-50 border-b border-neutral-200 shadow-sm hidden md:block">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-14">
          <div className="animate-reveal-left">
            <Link
              href="/"
              className="font-heading text-lg font-bold tracking-tight text-black transition-colors hover:text-neutral-700 whitespace-nowrap"
            >
              The Platform Press
            </Link>
          </div>

          <div className="justify-self-center relative z-10">
            <Categories />
          </div>

          <div className="animate-reveal-right justify-self-end">
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
  cacheLife("max");

  const categories = await getCategories();

  // revalidate if any of the categories change or with the global tag
  cacheTag(...categories.map((c) => `category:${c.id}`), "category");

  return (
    <nav className="flex items-center gap-6 overflow-x-auto">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/category/${category.slug}`}
          className="text-sm font-medium text-black hover:underline whitespace-nowrap"
        >
          {category.title}
        </Link>
      ))}
    </nav>
  );
}
