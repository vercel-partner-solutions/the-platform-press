import Link from "next/link";
import { getCategories } from "@/lib/cms";
import { unstable_cacheTag as cacheTag } from "next/cache";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

export default async function Footer() {
  "use cache: remote";
  cacheLife("days");

  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-neutral-50 py-12 border-t border-neutral-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-center space-x-16">
          <div className="max-w-[300px]">
            <h3 className="text-lg font-bold text-black mb-4 font-heading">
              The Platform Press
            </h3>
            <p className="text-sm text-neutral-600 mb-4">
              Your source for the latest news, analysis, and insights from
              around the world.
            </p>
            <p className="text-xs text-neutral-500">
              Crafted with care for a well-informed world.
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

  const categories = await getCategories();

  // revalidate if any of the categories change or with the global tag
  cacheTag(...categories.map((c) => c.id), "categories");

  return (
    <div>
      <h4 className="text-md font-semibold text-black mb-4">Categories</h4>
      <nav className="space-y-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug.toLowerCase()}`}
            className="block text-sm text-neutral-600 hover:text-accent transition-colors"
          >
            {category.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
