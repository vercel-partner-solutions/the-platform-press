import { getArticles } from "@/lib/cms";
import {
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife,
} from "next/cache";
import type { Category } from "@/lib/types";
import CategoryArticlesSearch from "./category-articles-search";

interface CategoryArticlesProps {
  locale: string;
  category: Category;
}

export default async function CategoryArticles({
  category,
  locale,
}: CategoryArticlesProps) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  cacheTag(category.id);
  const articles = await getInitialArticles(category);

  const hasMore = articles.length === 10;
  const initialArticles = articles.slice(0, 9);

  return (
    <CategoryArticlesSearch
      initialArticles={initialArticles}
      totalCount={initialArticles.length}
      hasMore={hasMore}
      category={category}
      locale={locale}
    />
  );
}

async function getInitialArticles(category: Category) {
  "use cache: remote";
  cacheLife("max");

  const articles = await getArticles({
    categoryId: category.id,
    sortBy: "datePublished",
    limit: 10,
  });

  cacheTag(...articles.map((a) => a.id), "article-list", "articles");

  return articles;
}
