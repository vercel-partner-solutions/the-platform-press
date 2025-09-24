
import type { Metadata } from "next";
import { getArticles } from "@/lib/cms";
import CategorySearchClient from "./category-search-client";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
  searchParams: Promise<{
    q?: string;
  }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = decodeURIComponent(slug);
  
  return {
    title: `${category} | The Platform Press`,
    description: `Stay updated with the latest ${category} news, analysis, and insights from The Platform Press.`,
    openGraph: {
      title: `${category} | The Platform Press`,
      description: `Stay updated with the latest ${category} news, analysis, and insights from The Platform Press.`,
      type: "website",
      url: `/category/${slug}`,
    },
  };
}

export default async function CategorySearchPage({
  params,
  searchParams,
}: Props) {
  const { slug, locale } = await params;
  const { q } = await searchParams;

  const category = decodeURIComponent(slug);
  const articles = await getArticles({
    category: category,
  });

  return (
    <CategorySearchClient
      initialArticles={articles}
      totalCount={articles.length}
      hasMore={articles.length > 9}
      category={category}
      searchParams={q ? { q } : {}}
      locale={locale}
    />
  );
}
