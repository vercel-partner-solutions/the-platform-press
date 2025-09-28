"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useState, useTransition } from "react";
import ArticleCard from "@/components/ui/article-card";
import CategorySearchInput from "@/components/category/category-search-input";
import ArticlesGridSkeleton from "@/components/category/articles-grid-skeleton";
import type { Article } from "@/lib/types";
import { searchArticlesAction } from "../actions";

interface CategoryArticlesSearchProps {
  initialArticles: Article[];
  totalCount: number;
  category: string;
  locale: string;
}

export default function CategoryArticlesSearch({
  initialArticles,
  totalCount: initialTotalCount,
  category,
  locale,
}: CategoryArticlesSearchProps) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const pathname = usePathname();
  const router = useRouter();

  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [searchQuery, setSearchQuery] = useState(q || "");
  const [activeSearchQuery, setActiveSearchQuery] = useState(q || "");
  const [isPending, startTransition] = useTransition();

  const getFetchCategory = () => {
    return category === "all"
      ? undefined
      : category.charAt(0).toUpperCase() + category.slice(1);
  };

  const triggerSearch = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
    setActiveSearchQuery(query);

    startTransition(async () => {
      const fetchedArticles = await searchArticlesAction({
        category: getFetchCategory(),
        sortBy: "datePublished",
        searchQuery: query,
      });
      setArticles(fetchedArticles);
      setTotalCount(fetchedArticles.length);
    });
  };

  const clearSearch = () => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
    setActiveSearchQuery("");
    setArticles(initialArticles);
    setTotalCount(initialTotalCount);
  };

  // Effect to update state when navigating between categories (server-provided props change)
  useEffect(() => {
    setArticles(initialArticles);
    setTotalCount(initialTotalCount);
    setSearchQuery(q || "");
    setActiveSearchQuery(q || "");
  }, [initialArticles, initialTotalCount, q]);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.length > 0) {
      triggerSearch(searchQuery);
    } else {
      clearSearch();
    }
  };


  return (
    <>
      <CategorySearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        onSubmit={handleSearchSubmit}
        onClear={clearSearch}
        isPending={isPending}
      />

      {isPending && activeSearchQuery ? (
        <ArticlesGridSkeleton />
      ) : articles.length === 0 ? (
        <EmptyState activeSearchQuery={activeSearchQuery} />
      ) : (
        <section>
          <SearchResultsInfo
            totalCount={totalCount}
            activeSearchQuery={activeSearchQuery}
            category={category}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function EmptyState({ activeSearchQuery }: { activeSearchQuery: string }) {
  return (
    <section className="text-center py-12">
      <p className="text-neutral-600 text-lg mb-4">
        {activeSearchQuery
          ? `No articles found for "${activeSearchQuery}"`
          : "No articles found in this section."}
      </p>
      <p className="text-neutral-500">
        {activeSearchQuery
          ? "Try a different search term or clear the search."
          : "Check back later for new content."}
      </p>
    </section>
  );
}

function SearchResultsInfo({
  totalCount,
  activeSearchQuery,
  category,
}: {
  totalCount: number;
  activeSearchQuery: string;
  category: string;
}) {
  if (activeSearchQuery) {
    return (
      <div className="mb-6 text-sm text-neutral-600">
        Showing {totalCount} {totalCount === 1 ? "result" : "results"} for{" "}
        <span className="font-semibold text-black">"{activeSearchQuery}"</span>
      </div>
    );
  }

  // Show category article count when no search is active
  const categoryDisplayName =
    category === "all"
      ? "All Categories"
      : category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="mb-6 text-sm text-neutral-600">
      Showing {totalCount} {totalCount === 1 ? "article" : "articles"} in{" "}
      <span className="font-semibold text-black">{categoryDisplayName}</span>
    </div>
  );
}



