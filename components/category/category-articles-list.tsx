"use client";

import { useEffect, useState, useTransition } from "react";
import { searchArticlesAction } from "@/app/[locale]/category/actions";
import ArticlesGridSkeleton from "@/components/category/articles-grid-skeleton";
import ArticleCard from "@/components/ui/article-card";
import { Button } from "@/components/ui/button";
import type { Article, Category } from "@/lib/types";

interface CategoryArticlesListProps {
  articles: Article[];
  hasMore: boolean;
  locale: string;
  category: Category;
  searchQuery?: string;
  draft?: boolean;
}

export default function CategoryArticlesList({
  articles,
  hasMore: initialHasMore,
  category,
  locale,
  searchQuery,
  draft = false,
}: CategoryArticlesListProps) {
  const [additionalArticles, setAdditionalArticles] = useState<Article[]>([]);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isPending, startTransition] = useTransition();

  // Reset additional articles when search changes
  useEffect(() => {
    setAdditionalArticles([]);
    setHasMore(initialHasMore);
  }, [searchQuery, initialHasMore]);

  // Combine initial and additional articles
  const allArticles = [...articles, ...additionalArticles];

  const loadMore = () => {
    startTransition(async () => {
      const nextArticles = await searchArticlesAction({
        categoryId: category.id,
        sortBy: "datePublished",
        searchQuery: searchQuery || undefined,
        skip: allArticles.length,
        limit: 9,
        draft,
      });

      setAdditionalArticles((prev) => [...prev, ...nextArticles]);
      setHasMore(nextArticles.length === 9);
    });
  };

  if (allArticles.length === 0) {
    return (
      <section className="text-center py-12">
        <p className="text-neutral-600 text-lg mb-4">
          {searchQuery
            ? `No articles found for "${searchQuery}"`
            : "No articles found in this section."}
        </p>
        <p className="text-neutral-500">
          {searchQuery
            ? "Try a different search term or clear the search."
            : "Check back later for new content."}
        </p>
      </section>
    );
  }

  return (
    <section>
      {searchQuery && (
        <div className="mb-6 text-sm text-neutral-600">
          Showing {allArticles.length}{" "}
          {allArticles.length === 1 ? "result" : "results"} for{" "}
          <span className="font-semibold text-black">"{searchQuery}"</span>
        </div>
      )}
      {!searchQuery && (
        <div className="mb-6 text-sm text-neutral-600">
          Showing {allArticles.length}{" "}
          {allArticles.length === 1 ? "article" : "articles"} in{" "}
          <span className="font-semibold text-black">{category.title}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {allArticles.map((article) => (
          <ArticleCard key={article.id} article={article} locale={locale} />
        ))}
      </div>

      {isPending && <ArticlesGridSkeleton />}

      {hasMore && !isPending && (
        <div className="flex justify-center mt-8">
          <Button
            type="button"
            onClick={loadMore}
            disabled={isPending}
            variant="outline"
          >
            Load More
          </Button>
        </div>
      )}
    </section>
  );
}
