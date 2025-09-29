import { getCategories } from "@/lib/cms";
import CategoryNavigation from "./category-navigation";
import {
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife,
} from "next/cache";

export default async function CategorySidebar() {
  "use cache: remote";
  cacheLife("max");

  const categories = await getCategories();

  // revalidate if any of the categories change or with the global tag
  cacheTag(...categories.map((c) => c.id), "categories");

  return <CategoryNavigation categories={categories} />;
}
