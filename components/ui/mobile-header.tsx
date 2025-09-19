import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getCategories } from "@/lib/cms";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "../layout/locale-switcher";

export async function MobileHeader() {
  const categories = await getCategories();
  return (
    <div className="md:hidden flex items-center justify-between w-full h-16 px-4">
      {/* Left: menu and search */}
      <div className="flex flex-1 items-center">
        <MobileMenu categories={categories} />
        <Link href="/category/all">
          <Search size={16} />
        </Link>
      </div>

      <div className="flex flex-1 justify-center">
        <Link href="/">
          <h1 className="text-2xl font-bold text-center whitespace-nowrap">
            The Platform Press
          </h1>
        </Link>
      </div>

      {/* Right: subscribe button */}
      <div className="items-center justify-end flex flex-1">
        <Link
          className={cn(
            buttonVariants({ variant: "default" }),
            "hidden sm:block",
          )}
          href="/subscribe"
        >
          Subscribe
        </Link>
      </div>
    </div>
  );
}

async function MobileMenu({ categories }: { categories: string[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full">
        <SheetHeader>
          <SheetTitle>The Platform Press</SheetTitle>
          <div className="flex flex-col gap-2 px-4">
            <Link
              href="/sign-in"
              className={cn(buttonVariants({ variant: "default" }), "w-full")}
            >
              Sign In
            </Link>
            <Link
              href="/subscribe"
              className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
            >
              Subscribe
            </Link>
          </div>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 p-4">
          <LocaleSwitcher />

          {categories.map((category) => (
            <div
              className="block px-3 py-2 text-sm rounded-md transition-colors group w-full"
              key={category}
            >
              <Link
                href={`/category/${category.toLowerCase()}`}
                className="w-full h-full block"
              >
                <SheetClose>{category}</SheetClose>
              </Link>
            </div>
          ))}
        </div>
        <SheetFooter>
          <LocaleSwitcher />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
