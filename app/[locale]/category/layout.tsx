import type React from "react";
import CategorySidebar from "@/components/category/category-sidebar";

export default async function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <div className="max-w-8xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 py-8">
        <CategorySidebar />
        {children}
      </div>
    </div>
  );
}
