import { getCategories } from "@/lib/cms";
import CategoryNavigation from "./category-navigation";
import { unstable_cacheTag as cacheTag } from "next/cache";

export default async function CategorySidebar() {
  "use cache";
  cacheTag("categories");

  const categories = await getCategories();

  return <CategoryNavigation categories={categories} />;
}
