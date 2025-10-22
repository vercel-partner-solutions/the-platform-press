import {
  cacheLife,
  cacheTag,
} from "next/cache";
import CategoryArticlesList from "@/components/category/category-articles-list";
import { getArticles } from "@/lib/cms";
import type { Category } from "@/lib/types";

interface CategoryArticlesProps {
  locale: string;
  category: Category;
  searchParams: Promise<{ q?: string }>;
  draft?: boolean;
}

export default async function CategoryArticles({
  category,
  locale,
  searchParams,
  draft = false,
}: CategoryArticlesProps) {
  const { q: searchQuery } = await searchParams;
  const articles = await searchArticles(category, searchQuery, draft);

  const hasMore = articles.length === 10;
  const initialArticles = articles.slice(0, 9);

  return (
    <CategoryArticlesList
      articles={initialArticles}
      hasMore={hasMore}
      category={category}
      locale={locale}
      searchQuery={searchQuery}
      draft={draft}
    />
  );
}

async function searchArticles(
  category: Category,
  searchQuery?: string,
  draft = false,
) {
  "use cache: remote";
  cacheLife("max");

  const articles = await getArticles({
    categoryId: category.id,
    sortBy: "datePublished",
    limit: 10,
    searchQuery,
    draft,
  });

  // revalidate if article categories change, article lists may change, or via global tag
  cacheTag(
    ...articles.map((a) => `category:${a.categoryId}`),
    "article:list",
    "article:all",
  );

  return articles;
}
