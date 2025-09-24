
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticles, getCategoryBySlug } from "@/lib/cms";
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
  
  const category = await getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }
  
  return {
    title: `${category.title} | The Platform Press`,
    description: `Stay updated with the latest ${category.title} news, analysis, and insights from The Platform Press.`,
    openGraph: {
      title: `${category.title} | The Platform Press`,
      description: `Stay updated with the latest ${category.title} news, analysis, and insights from The Platform Press.`,
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

  const category = await getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const articles = await getArticles({
    category: category.title,
  });

  return (
    <CategorySearchClient
      initialArticles={articles}
      totalCount={articles.length}
      hasMore={articles.length > 9}
      category={category.title}
      searchParams={q ? { q } : {}}
      locale={locale}
    />
  );
}
