"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface MobileMenuToggleProps {
  categories: string[];
}

export function MobileMenu({ categories }: MobileMenuToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLiveClick = () => {
    router.push("/category/latest");
  };

  return (
    <>
      <button
        className="p-2 text-neutral-600 hover:text-black transition-colors"
        aria-label="Menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={18} />
      </button>

      {/* Mobile navigation menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 absolute top-full left-0 right-0 z-40">
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
              <span
                onClick={handleLiveClick}
                onKeyDown={(e) => e.key === "Enter" && handleLiveClick()}
                tabIndex={0}
                className="text-sm font-medium py-2 cursor-pointer hover:underline"
                style={{
                  color: "#dc2626",
                  backgroundColor: "transparent",
                  border: "none",
                }}
              >
                Live
              </span>
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
