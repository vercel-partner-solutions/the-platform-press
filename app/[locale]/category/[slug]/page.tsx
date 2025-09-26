import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticles, getCategories, getCategoryBySlug } from "@/lib/cms";
import CategorySearchClient from "./category-search-client";
import { unstable_cacheTag as cacheTag } from "next/cache";
import { Category } from "@/lib/types";

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
  "use cache: remote";

  const { slug } = await params;

  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  // revalidate if this category changes or via global tag
  cacheTag(category.id, "categories");

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  return {
    title: `${category.title} | The Platform Press`,
    description: `Stay updated with the latest ${category.title} news, analysis, and insights from The Platform Press.`,
    openGraph: {
      type: "website",
      title: `${category.title} | The Platform Press`,
      description: `Stay updated with the latest ${category.title} news, analysis, and insights from The Platform Press.`,
      url: `${baseUrl}/category/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
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

  const articles = await getInitialArticles(category);

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

async function getInitialArticles(category: Category) {
  "use cache";

  const articles = await getArticles({
    category: category.slug,
    sortBy: "datePublished",
    limit: 9,
  });

  cacheTag(...articles.map((a) => a.id), "article-list", "articles");

  return articles;
}
