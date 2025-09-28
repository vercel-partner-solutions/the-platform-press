interface CategoryHeaderProps {
  category: string;
}

export default function CategoryHeader({ category }: CategoryHeaderProps) {
  const getCategoryDisplayName = (category: string) => {
    return category === "all"
      ? "All Articles"
      : category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-black mb-2">
        {getCategoryDisplayName(category)}
      </h1>
      <div className="w-16 h-1 bg-blue-600 rounded"></div>
    </div>
  );
}