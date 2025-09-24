"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  type FormEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import ArticleCard from "@/components/ui/article-card";
import { Button } from "@/components/ui/button";
import CategorySearchInput from "@/components/ui/category-search-input";
import type { Article } from "@/lib/types";
import { searchArticlesAction } from "../actions";

// Subcomponents
function CategoryHeader({ category }: { category: string }) {
  const getCategoryDisplayName = (category: string) => {
    return category === "all"
      ? "All Articles"
      : category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-black mb-2">
        {getCategoryDisplayName(category)}
      </h1>
      <div className="w-16 h-1 bg-blue-600 rounded"></div>
    </div>
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

function SearchResultsInfo({ totalCount, activeSearchQuery }: { totalCount: number; activeSearchQuery: string }) {
  if (!activeSearchQuery) return null;

  return (
    <div className="mb-6 text-sm text-neutral-600">
      Showing {totalCount} {totalCount === 1 ? "result" : "results"} for{" "}
      <span className="font-semibold text-black">
        "{activeSearchQuery}"
      </span>
    </div>
  );
}

function ArticlesGrid({ articles, locale }: { articles: Article[]; locale: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} locale={locale} />
      ))}
    </div>
  );
}

function LoadMoreButton({ onClick, isPending }: { onClick: () => void; isPending: boolean }) {
  return (
    <div className="flex justify-center mt-8">
      <Button
        type="button"
        onClick={onClick}
        disabled={isPending}
        variant="outline"
        className="px-8 py-2 border-neutral-300 text-black hover:bg-neutral-50 hover:border-black transition-colors bg-transparent"
      >
        Load More
      </Button>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="text-center py-12">
      <p className="text-neutral-600">Searching...</p>
    </div>
  );
}

function ArticleCount({ totalCount }: { totalCount: number }) {
  return (
    <div className="text-center mt-8">
      <p className="text-neutral-500 text-sm">
        Showing all {totalCount}{" "}
        {totalCount === 1 ? "article" : "articles"}
      </p>
    </div>
  );
}

interface CategorySearchClientProps {
  initialArticles: Article[];
  totalCount: number;
  hasMore: boolean;
  category: string;
  searchParams: {
    q?: string;
  };
  locale: string;
}

export default function CategorySearchClient({
  initialArticles,
  totalCount: initialTotalCount,
  hasMore: initialHasMore,
  category,
  searchParams,
  locale,
}: CategorySearchClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wasPending = useRef(false);

  const { q } = searchParams;

  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [searchQuery, setSearchQuery] = useState(q || "");
  const [activeSearchQuery, setActiveSearchQuery] = useState(q || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // When a search transition completes, re-focus the input.
    if (wasPending.current && !isPending) {
      inputRef.current?.focus();
    }
    wasPending.current = isPending;
  }, [isPending]);

  const triggerSearch = (query: string) => {
    const params = new URLSearchParams(window.location.search);
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    setCurrentPage(1);
    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
    setActiveSearchQuery(query);

    startTransition(async () => {
      const fetchCategory =
        category === "all"
          ? undefined
          : category.charAt(0).toUpperCase() + category.slice(1);

      const fetchedArticles = await searchArticlesAction({
        category: fetchCategory,
        sortBy: "datePublished",
        searchQuery: query,
      });
      setArticles(fetchedArticles);
      setTotalCount(fetchedArticles.length);
      setHasMore(false);
    });
  };

  const clearSearch = () => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    setSearchQuery("");
    const params = new URLSearchParams(window.location.search);
    params.delete("q");
    setCurrentPage(1);
    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
    setActiveSearchQuery("");
    setArticles(initialArticles);
    setTotalCount(initialTotalCount);
    setHasMore(initialHasMore);
  };

  // Effect to update state when navigating between categories (server-provided props change)
  useEffect(() => {
    setArticles(initialArticles);
    setTotalCount(initialTotalCount);
    setHasMore(initialHasMore);
    setSearchQuery(q || "");
    setActiveSearchQuery(q || "");
    setCurrentPage(1);
  }, [initialArticles, initialTotalCount, initialHasMore, q]);

  // Effect for debounced search-as-you-type
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Don't run search for the initial query on load
    if (searchQuery === (q || "")) {
      return;
    }

    if (searchQuery.length >= 2) {
      debounceTimer.current = setTimeout(() => {
        triggerSearch(searchQuery);
      }, 300);
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [
    searchQuery,
    category,
    initialArticles,
    initialTotalCount,
    initialHasMore,
    q,
    pathname,
  ]);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    // Hitting enter now performs the search immediately
    if (searchQuery.length > 0) {
      triggerSearch(searchQuery);
    } else {
      // If enter is pressed on an empty input, clear/reset
      clearSearch();
    }
  };

  const loadMore = () => {
    setCurrentPage(currentPage + 1);

    startTransition(async () => {
      const fetchCategory =
        category === "all"
          ? undefined
          : category.charAt(0).toUpperCase() + category.slice(1);

      const allArticles = await searchArticlesAction({
        category: fetchCategory,
        sortBy: "datePublished",
      });

      const nextBatch = allArticles.slice(articles.length, articles.length + 9);
      const updatedArticles = [...articles, ...nextBatch];

      setArticles(updatedArticles);
      setHasMore(updatedArticles.length < allArticles.length);
    });
  };

  return (
    <>
      <CategoryHeader category={category} />

      <CategorySearchInput
        ref={inputRef}
        value={searchQuery}
        onChange={setSearchQuery}
        onSubmit={handleSearchSubmit}
        onClear={clearSearch}
        isSearching={isPending}
      />

      {isPending && activeSearchQuery ? (
        <LoadingState />
      ) : articles.length === 0 ? (
        <EmptyState activeSearchQuery={activeSearchQuery} />
      ) : (
        <section>
          <SearchResultsInfo totalCount={totalCount} activeSearchQuery={activeSearchQuery} />
          <ArticlesGrid articles={articles} locale={locale} />

          {hasMore && !activeSearchQuery && (
            <LoadMoreButton onClick={loadMore} isPending={isPending} />
          )}

          {!hasMore && !activeSearchQuery && articles.length > 9 && (
            <ArticleCount totalCount={totalCount} />
          )}
        </section>
      )}
    </>
  );
}
