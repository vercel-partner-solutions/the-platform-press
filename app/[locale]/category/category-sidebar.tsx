"use client";

import { Clock, MessageSquareText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategorySidebarProps {
  categories: string[];
}

export default function CategorySidebar({ categories }: CategorySidebarProps) {
  const pathname = usePathname();
  const currentCategory = pathname.split("/category/")[1] || "";

  return (
    <aside className="lg:w-64 flex-shrink-0">
      <div className="bg-neutral-50 rounded-lg p-6 sticky top-24">
        {/* Categories Section */}
        <div className="mb-6">
          <div className="mb-4">
            <h3 className="font-bold text-black text-base">Categories</h3>
          </div>
          <nav className="space-y-2">
            <Link
              href="/category/all"
              className={`block px-3 py-2 text-sm rounded-md transition-colors group ${
                currentCategory === "all"
                  ? "bg-blue-500 text-white"
                  : "text-neutral-700 hover:text-black hover:bg-white"
              }`}
            >
              <span
                className={
                  currentCategory === "all" ? "" : "group-hover:underline"
                }
              >
                All
              </span>
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase()}`}
                className={`block px-3 py-2 text-sm rounded-md transition-colors group ${
                  cat.toLowerCase() === currentCategory.toLowerCase()
                    ? "bg-blue-500 text-white"
                    : "text-neutral-700 hover:text-black hover:bg-white"
                }`}
              >
                <span
                  className={
                    cat.toLowerCase() === currentCategory.toLowerCase()
                      ? ""
                      : "group-hover:underline"
                  }
                >
                  {cat}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Browse Section */}
        <div className="border-t border-neutral-200 pt-6">
          <h3 className="text-md font-semibold text-black mb-4">Browse</h3>
          <nav className="space-y-2">
            <Link
              href="/category/latest"
              className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors group ${
                currentCategory === "latest"
                  ? "bg-blue-500 text-white"
                  : "text-neutral-700 hover:text-black hover:bg-white"
              }`}
            >
              <Clock size={16} className="mr-2" />
              <span
                className={
                  currentCategory === "latest" ? "" : "group-hover:underline"
                }
              >
                Latest News
              </span>
            </Link>
            <Link
              href="/category/opinion"
              className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors group ${
                currentCategory === "opinion"
                  ? "bg-blue-500 text-white"
                  : "text-neutral-700 hover:text-black hover:bg-white"
              }`}
            >
              <MessageSquareText size={16} className="mr-2" />
              <span
                className={
                  currentCategory === "opinion" ? "" : "group-hover:underline"
                }
              >
                Opinions & Analysis
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
}
