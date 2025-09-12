import { getArticles, getCategories } from "@/lib/cms"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import CategorySearchClient from "./category-search-client"

type Props = {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{
    q?: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = decodeURIComponent((await params).slug)

  if (category === "all") {
    return {
      title: "All Articles",
      description: "Browse all articles from The Platform Press across all categories.",
    }
  }

  if (category === "opinion") {
    return {
      title: "Opinions & Analysis",
      description: "Browse all opinion articles and analysis pieces from The Platform Press.",
    }
  }

  if (category === "latest") {
    return {
      title: "Latest News",
      description: "Browse the latest news articles from The Platform Press.",
    }
  }

  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1)
  return {
    title: `${capitalizedCategory} Articles`,
    description: `Browse all ${capitalizedCategory.toLowerCase()} articles from The Platform Press.`,
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  const params = categories.map((category) => ({
    category: category.toLowerCase(),
  }))

  // Add special routes
  params.push({ category: "all" })
  params.push({ category: "opinion" })
  params.push({ category: "latest" })

  return params
}

export default async function CategorySearchPage({ params, searchParams }: Props) {
  const category = decodeURIComponent((await params).slug)
  const searchQuery = (await searchParams)?.q || ""
  const categories = await getCategories()

  let totalArticles: any[] = []

  if (category === "all") {
    totalArticles = await getArticles({ searchQuery })
  } else if (category === "opinion") {
    totalArticles = await getArticles({ category: "Opinion", searchQuery, sortBy: "datePublished" })
  } else if (category === "latest") {
    totalArticles = await getArticles({ searchQuery, sortBy: "datePublished" })
  } else {
    // Check if the category exists (case-insensitive)
    const validCategory = categories.find((cat) => cat.toLowerCase() === category.toLowerCase())

    if (!validCategory) {
      notFound()
    }

    // Fetch articles for this category
    totalArticles = await getArticles({
      category: validCategory,
      sortBy: "datePublished",
      searchQuery,
    })
  }

  // If a search is active, show all results. Otherwise, paginate.
  const isSearching = searchQuery.length > 0
  const initialArticles = isSearching ? totalArticles : totalArticles.slice(0, 9)
  const hasMore = !isSearching && totalArticles.length > 9

  return (
    <CategorySearchClient
      initialArticles={initialArticles}
      totalCount={totalArticles.length}
      hasMore={hasMore}
      category={category}
      searchQuery={searchQuery}
    />
  )
}
