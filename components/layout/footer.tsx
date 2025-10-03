import { unstable_cacheTag as cacheTag } from "next/cache";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import Link from "next/link";
import { getCategories } from "@/lib/cms";

export default async function Footer() {
  "use cache: remote";
  cacheLife("days");

  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-neutral-50 py-12 border-t border-neutral-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-black mb-4 font-heading">
              The Platform Press
            </h3>
            <p className="text-sm text-neutral-600 mb-4">
              Your source for the latest news, analysis, and insights from
              around the world.
            </p>
          </div>
          <FooterCategories />
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-neutral-200 text-center">
          <p className="text-sm text-neutral-700">
            &copy; {currentYear} The Platform Press. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

async function FooterCategories() {
  "use cache: remote";
  cacheLife("max");

  const categories = await getCategories();

  // revalidate if any of the categories change or with the global tag
  cacheTag(...categories.map((c) => `category:${c.id}`), "category");

  return (
    <div>
      <h4 className="text-md font-semibold text-black mb-4">Categories</h4>
      <nav className="flex flex-wrap gap-x-4 gap-y-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug.toLowerCase()}`}
            className="text-sm text-neutral-600 hover:text-accent transition-colors"
          >
            {category.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
