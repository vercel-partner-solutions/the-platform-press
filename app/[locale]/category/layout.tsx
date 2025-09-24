import type React from "react";

import { getCategories } from "@/lib/cms";
import CategorySidebar from "./category-sidebar";

export default async function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug?: string }>;
}) {
  const categories = await getCategories();
  const { slug } = await params;
  const currentCategory = slug ? decodeURIComponent(slug) : "";

  return (
    <div className="max-w-8xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 py-8">
        <CategorySidebar categories={categories} currentCategory={currentCategory} />
        <div className="flex-1 min-w-0">{children} </div>
      </div>
    </div>
  );
}
