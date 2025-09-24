import Link from "next/link";

interface CategorySidebarProps {
  categories: string[];
  currentCategory: string;
}

export default function CategorySidebar({ categories, currentCategory }: CategorySidebarProps) {

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
      </div>
    </aside>
  );
}
