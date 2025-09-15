import { getArticles, getCategories } from "@/lib/cms"
import CategorySearchClient from "./category-search-client"
import { setRequestLocale } from "next-intl/server"
import { Suspense } from "react"

type Props = {
  params: Promise<{ slug: string, locale: string }>
  searchParams: Promise<{
    q?: string
  }>
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
  const { slug, locale, } = await params;
  setRequestLocale(locale);

  const category = decodeURIComponent(slug)
  const articles = await getArticles({
    category: category,
  })

  return (
    <Suspense>
      <CategorySearchClient
        initialArticles={articles}
        totalCount={articles.length}
        hasMore={articles.length > 9}
        category={category}
        searchParams={searchParams}
      />
    </Suspense>
  )
}
