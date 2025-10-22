import {
  cacheLife,
  cacheTag,
} from "next/cache";
import { getCategories } from "@/lib/cms";
import CategoryNavigation from "./category-navigation";

export default async function CategorySidebar({
  draft = false,
}: {
  draft?: boolean;
}) {
  "use cache: remote";
  cacheLife("max");

  const categories = await getCategories(draft);

  // revalidate if any of the categories change or via the global tag
  cacheTag("category:list", "category:all");

  return <CategoryNavigation categories={categories} />;
}
