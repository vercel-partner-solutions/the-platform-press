import type React from "react";

import CategorySidebar from "./category-sidebar";
import { Suspense } from "react";
import { getCategories } from "@/lib/cms";

export default async function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();
  return (
    <div className="max-w-8xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <CategorySidebar categories={categories} />
        </Suspense>

        <div className="flex-1 min-w-0">{children} </div>
      </div>
    </div>
  );
}
