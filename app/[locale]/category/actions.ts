"use server";

import { getArticles } from "@/lib/cms";
import type { Article } from "@/lib/types";

interface SearchArticlesParams {
  category?: string;
  sortBy?: "datePublished" | "views";
  searchQuery?: string;
}

export async function searchArticlesAction(
  params: SearchArticlesParams,
): Promise<Article[]> {
  // The getArticles function from lib/cms is now safely called on the server
  return getArticles(params);
}
