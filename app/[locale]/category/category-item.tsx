import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryItem({ category }: { category: string }) {
  const pathname = usePathname();
  const currentCategory = pathname.split("/category/")[1] || "";
  return (
    <Link
      href={`/category/${category.toLowerCase()}`}
      className={`block px-3 py-2 text-sm rounded-md transition-colors group ${
        currentCategory === "all"
          ? "bg-blue-500 text-white"
          : "text-neutral-700 hover:text-black hover:bg-white"
      }`}
    >
      <span
        className={
          currentCategory === category.toLowerCase()
            ? ""
            : "group-hover:underline"
        }
      >
        {category}
      </span>
    </Link>
  );
}
