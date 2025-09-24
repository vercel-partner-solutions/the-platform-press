
import { getArticles } from "@/lib/cms";
import CategorySearchClient from "./category-search-client";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function CategorySearchPage({
  params,
  searchParams,
}: Props) {
  const { slug, locale } = await params;
  const { q } = await searchParams;

  const category = decodeURIComponent(slug);
  const articles = await getArticles({
    category: category === "all" ? undefined : category,
  });

  const initialArticles = articles.slice(0, 9);

  return (
    <CategorySearchClient
      initialArticles={initialArticles}
      totalCount={articles.length}
      hasMore={articles.length > 9}
      category={category}
      searchParams={q ? { q } : {}}
      locale={locale}
    />
  );
}
