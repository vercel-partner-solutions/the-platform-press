import type { Category } from "@/lib/types";

interface CategoryHeaderProps {
  category: Category;
}

export default function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-black mb-2">{category.title}</h1>
      <div className="w-16 h-1 bg-blue-600 rounded"></div>
    </div>
  );
}
