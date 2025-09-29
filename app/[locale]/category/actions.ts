"use server";

import { getArticles } from "@/lib/cms";
import type { Article } from "@/lib/types";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";

interface SearchArticlesParams {
  categoryId?: string;
  sortBy?: "datePublished" | "views";
  searchQuery?: string;
  skip?: number;
  limit?: number;
}

export async function searchArticlesAction(
  params: SearchArticlesParams
): Promise<Article[]> {
  "use cache";
  cacheLife("max");
  cacheTag("article-list");
  return getArticles({
    categoryId: params.categoryId,
    sortBy: params.sortBy,
    searchQuery: params.searchQuery,
    skip: params.skip,
    limit: params.limit,
  });
}
