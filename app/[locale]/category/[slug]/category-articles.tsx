import { getArticles } from "@/lib/cms";
import {
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife,
} from "next/cache";
import { Article, Category } from "@/lib/types";
import CategoryArticlesSearch from "./category-articles-search";

interface CategoryArticlesProps {
  category?: Category;
  locale: string;
}

export default async function CategoryArticles({
  category,
  locale,
}: CategoryArticlesProps) {
  let articles: Article[] = [];

  if (!category) {
    // "all" case - no specific category
    articles = await getInitialArticles();
  } else {
    cacheTag(category.id);
    articles = await getInitialArticles(category);
  }

  const categoryName = category ? category.title : "all";

  return (
    <CategoryArticlesSearch
      initialArticles={articles}
      totalCount={articles.length}
      hasMore={articles.length > 9}
      category={categoryName}
      locale={locale}
    />
  );
}

async function getInitialArticles(category?: Category) {
  "use cache: remote";
  cacheLife("max");

  const articles = await getArticles({
    category: category?.slug,
    sortBy: "datePublished",
    limit: 9,
  });

  cacheTag(...articles.map((a) => a.id), "article-list", "articles");

  return articles;
}
