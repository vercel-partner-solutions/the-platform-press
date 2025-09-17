"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface StickyNavigationProps {
  categories: string[];
}

export function StickyNavigation({ categories }: StickyNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`bg-white sticky top-0 z-50 border-b border-neutral-200 transition-all duration-300 ease-in-out hidden md:block ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div
            className={`transition-all duration-300 ease-in-out ${
              isScrolled
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4"
            }`}
          >
            <Link
              href="/"
              className="font-heading text-lg font-bold tracking-tight text-black transition-colors hover:text-neutral-700 whitespace-nowrap"
            >
              The Platform Press
            </Link>
          </div>

          <nav className="flex items-center gap-6 overflow-x-auto">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="text-sm font-medium text-black hover:underline whitespace-nowrap"
              >
                {category}
              </Link>
            ))}
            <Link
              href="/category/opinion"
              className="text-sm font-medium text-black hover:underline whitespace-nowrap"
            >
              Opinion
            </Link>
            <Link
              href="/category/latest"
              className="text-sm font-medium hover:underline whitespace-nowrap"
              style={{
                color: "#dc2626",
              }}
            >
              Live
            </Link>
          </nav>

          <div
            className={`transition-all duration-300 ease-in-out ${
              isScrolled
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            }`}
          >
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                size="sm"
                className="text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5"
              >
                SUBSCRIBE
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-medium border-neutral-300 text-neutral-700 hover:bg-neutral-50 px-3 py-1.5 bg-transparent"
              >
                LOG IN
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}