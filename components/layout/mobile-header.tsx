import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function MobileHeader({
  isMobileMenuOpen,
  categories,
}: {
  isMobileMenuOpen: boolean;
  categories: string[];
}) {
  return (
    <>
      {/* Mobile navigation menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-sm font-medium text-black py-2">
                Home
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase()}`}
                  className="text-sm font-medium text-black py-2"
                >
                  {category}
                </Link>
              ))}
              <Link
                href="/category/opinion"
                className="text-sm font-medium text-black py-2"
              >
                Opinion
              </Link>
              <Link
                href="/category/latest"
                className="text-sm font-medium py-2 cursor-pointer hover:underline"
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
              <div className="pt-3 border-t border-neutral-200 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-sm font-medium border-neutral-300 text-neutral-700 hover:bg-neutral-50 mb-2 bg-transparent"
                >
                  LOG IN
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
