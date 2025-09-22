"use cache";

import Link from "next/link";
import { getCategories } from "@/lib/cms";

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const categories = await getCategories();

  return (
    <footer className="bg-neutral-50 py-12 border-t border-neutral-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
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

          {/* Categories */}
          <div>
            <h4 className="text-md font-semibold text-black mb-4">
              Categories
            </h4>
            <nav className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase()}`}
                  className="block text-sm text-neutral-600 hover:text-accent transition-colors"
                >
                  {category}
                </Link>
              ))}
            </nav>
          </div>

          {/* Special Sections */}
          <div>
            <h4 className="text-md font-semibold text-black mb-4">Browse</h4>
            <nav className="space-y-2">
              <Link
                href="/category/latest"
                className="block text-sm text-neutral-600 hover:text-accent transition-colors"
              >
                Latest News
              </Link>
              <Link
                href="/category/opinion"
                className="block text-sm text-neutral-600 hover:text-accent transition-colors"
              >
                Opinions & Analysis
              </Link>
            </nav>
          </div>
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
