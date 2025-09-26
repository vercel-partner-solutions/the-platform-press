import type React from "react";
import CategorySidebar from "@/components/category/category-sidebar";
import { Suspense } from "react";

export default async function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-8xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 py-8">
        <CategorySidebar />
        <div className="flex-1 min-w-0">
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
