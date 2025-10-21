"use server";

import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { getArticles, getCategoryBySlug } from "@/lib/cms";

interface SearchResult {
  id: number;
  title: string;
  url: string;
  category: string;
  excerpt: string;
}

export async function searchArticlesAction(
  query: string,
  categorySlug?: string
): Promise<SearchResult[]> {
  "use cache";
  cacheLife("max");

  // Revalidate if articles may change
  cacheTag("article:list");
  cacheTag("article:search");

  let categoryId: string | undefined;

  if (categorySlug) {
    const category = await getCategoryBySlug(categorySlug);
    if (category) {
      categoryId = category.id;
    }
  }

  const results = await getArticles({
    limit: 3,
    searchQuery: query,
    categoryId,
    sortBy: "views",
  });

  return results.map((article) => ({
    id: parseInt(article.id, 10),
    title: article.title,
    url: `/articles/${article.slug}`,
    category: article.category || "",
    excerpt: article.excerpt,
  }));
}
