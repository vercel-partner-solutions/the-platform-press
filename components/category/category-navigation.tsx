"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

interface CategorySidebarProps {
  categories: Category[];
}

export default function CategoryNavigation({
  categories,
}: CategorySidebarProps) {
  const pathname = usePathname();
  const currentCategory = pathname.split("/category/")[1] || "";

  return (
    <aside className="lg:w-64 flex-shrink-0">
      <div className="bg-neutral-50 rounded-lg p-6 sticky top-24">
        <div className="mb-6">
          <div className="mb-4">
            <h3 className="font-bold text-black text-base">Categories</h3>
          </div>
          <nav className="space-y-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.title.toLowerCase()}`}
                className={`block px-3 py-2 text-sm rounded-md transition-colors group ${
                  cat.slug.toLowerCase() === currentCategory.toLowerCase()
                    ? "bg-blue-500 text-white"
                    : "text-neutral-700 hover:text-black hover:bg-gray-200"
                }`}
              >
                <span
                  className={
                    cat.slug.toLowerCase() === currentCategory.toLowerCase()
                      ? ""
                      : "group-hover:underline"
                  }
                >
                  {cat.title}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
