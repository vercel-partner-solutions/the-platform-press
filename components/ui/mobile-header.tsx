import { Menu, Search } from "lucide-react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Suspense } from "react";
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
import { Link } from "@/i18n/navigation";
import { getCategories } from "@/lib/cms";
import { LocaleSwitcher } from "../layout/locale-switcher";
import { SubscribeButton } from "./subscribe-button";
import { isSubscribed } from "@/app/actions/subscription";

export async function MobileHeader() {
  const categories = await getCategories();
  const subscribed = await isSubscribed();

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
        <MobileMenu categories={categories} subscribed={subscribed} />
      </div>
    </div>
  );
}

async function MobileMenu({
  categories,
  subscribed,
}: {
  categories: string[];
  subscribed: boolean;
}) {
  const locale = await getLocale();
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
          <div className="flex flex-col gap-2 px-4 items-center">
            <SubscribeButton
              key={subscribed ? "subscribed" : "unsubscribed"}
              initialState={subscribed}
              className="max-w-[200px]"
            />
          </div>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 p-4">
          <NextIntlClientProvider locale={locale} messages={null}>
            <Suspense>
              <LocaleSwitcher />
            </Suspense>
          </NextIntlClientProvider>
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
          <NextIntlClientProvider locale={locale} messages={null}>
            <Suspense>
              <LocaleSwitcher />
            </Suspense>
          </NextIntlClientProvider>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
