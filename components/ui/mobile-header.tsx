import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
import { LocaleSwitcher } from "../layout/locale-switcher";
import { Subscribe } from "./subscribe";
import { unstable_cacheTag as cacheTag } from "next/cache";
import { Suspense } from "react";

export async function MobileHeader({ locale }: { locale: string }) {
  return (
    <div className="md:hidden flex items-center justify-between w-full h-16 px-4">
      <div className="flex flex-1 items-center px-2">
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

      <div className="items-center justify-end flex flex-1">
        <MobileMenu locale={locale} />
      </div>
    </div>
  );
}

async function MobileMenu({ locale }: { locale: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full">
        <SheetHeader>
          <SheetTitle className="text-center">The Platform Press</SheetTitle>
          <div className="flex flex-col gap-2 items-center">
            <Suspense>
              <Subscribe
                className="max-w-[200px]"
                subscribeText="Subscribe"
                unsubscribeText="Unsubscribe"
              />
            </Suspense>
          </div>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 p-4">
          <LocaleSwitcher activeLocale={locale} />
          <MobileCategories />
        </div>
      </SheetContent>
    </Sheet>
  );
}

async function MobileCategories() {
  "use cache: remote";

  const categories = await getCategories();

  // revalidate if any of the categories change or with the global tag
  cacheTag(...categories.map((c) => c.id), "categories");

  return (
    <div>
      {categories.map((category) => (
        <div
          className="block px-3 py-2 text-sm rounded-md transition-colors group w-full"
          key={category.slug}
        >
          <Link
            href={`/category/${category.slug.toLowerCase()}`}
            className="w-full h-full block"
          >
            <SheetClose>{category.title}</SheetClose>
          </Link>
        </div>
      ))}
    </div>
  );
}
