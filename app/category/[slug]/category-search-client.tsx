"use client"

import { useState, useTransition, useEffect, type FormEvent, useRef } from "react"
import { usePathname } from "next/navigation"
import type { Article } from "@/lib/types"
import ArticleCard from "@/components/ui/article-card"
import { Button } from "@/components/ui/button"
import CategorySearchInput from "@/components/ui/category-search-input"
import { searchArticlesAction } from "../actions"

interface CategorySearchClientProps {
  initialArticles: Article[]
  totalCount: number
  hasMore: boolean
  category: string
  searchQuery: string // Receive initial search query from server
}

export default function CategorySearchClient({
  initialArticles,
  totalCount: initialTotalCount,
  hasMore: initialHasMore,
  category,
  searchQuery: initialSearchQuery,
}: CategorySearchClientProps) {
  const pathname = usePathname()
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const wasPending = useRef(false)

  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [totalCount, setTotalCount] = useState(initialTotalCount)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [activeSearchQuery, setActiveSearchQuery] = useState(initialSearchQuery)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    // When a search transition completes, re-focus the input.
    if (wasPending.current && !isPending) {
      inputRef.current?.focus()
    }
    wasPending.current = isPending
  }, [isPending])

  const triggerSearch = (query: string) => {
    // Update URL using browser history API to prevent a page reload
    const params = new URLSearchParams(window.location.search)
    if (query) {
      params.set("q", query)
    } else {
      params.delete("q")
    }
    window.history.replaceState(null, "", `${pathname}?${params.toString()}`)
    setActiveSearchQuery(query)

    startTransition(async () => {
      const fetchCategory =
        category === "opinion"
          ? "Opinion"
          : category === "latest"
            ? undefined
            : category.charAt(0).toUpperCase() + category.slice(1)

      const fetchedArticles = await searchArticlesAction({
        category: fetchCategory,
        sortBy: "datePublished",
        searchQuery: query,
      })
      setArticles(fetchedArticles)
      setTotalCount(fetchedArticles.length)
      setHasMore(false) // Pagination is disabled for client-side search results
    })
  }

  const clearSearch = () => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    setSearchQuery("")
    setActiveSearchQuery("")
    setArticles(initialArticles)
    setTotalCount(initialTotalCount)
    setHasMore(initialHasMore)
    const params = new URLSearchParams(window.location.search)
    params.delete("q")
    window.history.replaceState(null, "", `${pathname}?${params.toString()}`)
  }

  // Effect to update state when navigating between categories (server-provided props change)
  useEffect(() => {
    setArticles(initialArticles)
    setTotalCount(initialTotalCount)
    setHasMore(initialHasMore)
    setSearchQuery(initialSearchQuery)
    setActiveSearchQuery(initialSearchQuery)
  }, [initialArticles, initialTotalCount, initialHasMore, initialSearchQuery])

  // Effect for debounced search-as-you-type
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    // Don't run search for the initial query on load
    if (searchQuery === initialSearchQuery) {
      return
    }

    if (searchQuery.length === 0) {
      // If search is cleared, reset to initial state
      clearSearch()
      return
    }

    if (searchQuery.length >= 3) {
      debounceTimer.current = setTimeout(() => {
        triggerSearch(searchQuery)
      }, 500) // 500ms debounce delay
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [searchQuery, category, initialArticles, initialTotalCount, initialHasMore, initialSearchQuery, pathname])

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    // Hitting enter now performs the search immediately
    if (searchQuery.length > 0) {
      triggerSearch(searchQuery)
    } else {
      // If enter is pressed on an empty input, clear/reset
      clearSearch()
    }
  }

  const loadMore = () => {
    startTransition(async () => {
      const fetchCategory =
        category === "opinion"
          ? "Opinion"
          : category === "latest"
            ? undefined
            : category.charAt(0).toUpperCase() + category.slice(1)

      const allArticles = await searchArticlesAction({
        category: fetchCategory,
        sortBy: "datePublished",
      })

      const nextBatch = allArticles.slice(articles.length, articles.length + 9)
      const updatedArticles = [...articles, ...nextBatch]

      setArticles(updatedArticles)
      setHasMore(updatedArticles.length < allArticles.length)
    })
  }

  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case "all":
        return "All Articles"
      case "opinion":
        return "Opinions & Analysis"
      case "latest":
        return "Latest News"
      default:
        return category.charAt(0).toUpperCase() + category.slice(1)
    }
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black mb-2">{getCategoryDisplayName(category)}</h1>
        <div className="w-16 h-1 bg-blue-600 rounded"></div>
      </div>

      <CategorySearchInput
        ref={inputRef}
        value={searchQuery}
        onChange={setSearchQuery}
        onSubmit={handleSearchSubmit}
        onClear={clearSearch}
        isSearching={isPending}
      />

      {isPending && activeSearchQuery ? (
        <div className="text-center py-12">
          <p className="text-neutral-600">Searching...</p>
        </div>
      ) : articles.length === 0 ? (
        <section className="text-center py-12">
          <p className="text-neutral-600 text-lg mb-4">
            {activeSearchQuery ? `No articles found for "${activeSearchQuery}"` : "No articles found in this section."}
          </p>
          <p className="text-neutral-500">
            {activeSearchQuery
              ? "Try a different search term or clear the search."
              : "Check back later for new content."}
          </p>
        </section>
      ) : (
        <section>
          {activeSearchQuery && (
            <div className="mb-6 text-sm text-neutral-600">
              Showing {totalCount} {totalCount === 1 ? "result" : "results"} for{" "}
              <span className="font-semibold text-black">"{activeSearchQuery}"</span>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {hasMore && !activeSearchQuery && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={loadMore}
                disabled={isPending}
                variant="outline"
                className="px-8 py-2 border-neutral-300 text-black hover:bg-neutral-50 hover:border-black transition-colors bg-transparent"
              >
                {isPending ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}

          {!hasMore && !activeSearchQuery && articles.length > 9 && (
            <div className="text-center mt-8">
              <p className="text-neutral-500 text-sm">
                Showing all {totalCount} {totalCount === 1 ? "article" : "articles"}
              </p>
            </div>
          )}
        </section>
      )}
    </>
  )
}
