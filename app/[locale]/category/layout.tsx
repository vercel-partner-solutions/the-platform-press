import type React from "react";
import { getCategories } from "@/lib/cms";
import CategorySidebar from "./category-sidebar";
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

export default async function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();
  const locale = await getLocale();

  return (
    <div className="max-w-8xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 py-8">
        <CategorySidebar categories={categories} />
        <NextIntlClientProvider locale={locale} messages={null}>
          <div className="flex-1 min-w-0">{children} </div>
        </NextIntlClientProvider>
      </div>
    </div>
  );
}
