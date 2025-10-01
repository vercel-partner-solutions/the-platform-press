import { getArticles } from "@/lib/cms";
import {
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife,
} from "next/cache";
import type { Category } from "@/lib/types";
import CategoryArticlesList from "@/components/category/category-articles-list";

interface CategoryArticlesProps {
  locale: string;
  category: Category;
  searchParams: Promise<{ q?: string }>;
}

export default async function CategoryArticles({
  category,
  locale,
  searchParams,
}: CategoryArticlesProps) {
  const { q: searchQuery } = await searchParams;
  const articles = await searchArticles(category, searchQuery);

  const hasMore = articles.length === 10;
  const initialArticles = articles.slice(0, 9);

  return (
    <CategoryArticlesList
      articles={initialArticles}
      hasMore={hasMore}
      category={category}
      locale={locale}
      searchQuery={searchQuery}
    />
  );
}

async function searchArticles(category: Category, searchQuery?: string) {
  "use cache: remote";
  cacheLife("max");

  const articles = await getArticles({
    categoryId: category.id,
    sortBy: "datePublished",
    limit: 10,
    searchQuery,
  });

  // revalidate if any articles change, their categories change, article lists may change, or via global tag
  cacheTag(
    ...articles.map((a) => a.id),
    ...articles.map((a) => a.categoryId),
    "article-list",
    "articles"
  );

  return articles;
}
