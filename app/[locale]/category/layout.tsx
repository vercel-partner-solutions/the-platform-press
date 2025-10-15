import type React from "react";
import { draftMode } from "next/headers";
import CategorySidebar from "@/components/category/category-sidebar";

export default async function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: draftEnabled } = await draftMode();

  return (
    <div className="max-w-8xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 py-8">
        <CategorySidebar draft={draftEnabled} />
        {children}
      </div>
    </div>
  );
}
