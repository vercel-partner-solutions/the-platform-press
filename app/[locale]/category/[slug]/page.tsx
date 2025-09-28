import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticles, getCategories, getCategoryBySlug } from "@/lib/cms";
import CategorySearchClient from "./category-search-client";
import {
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife,
} from "next/cache";
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
  cacheLife("max");

  const { slug } = await params;

  let title: string;
  let description: string;
  let cacheTagId: string | undefined;

  if (slug === "all") {
    title = "All Articles | The Platform Press";
    description = "Browse all articles from The Platform Press across all categories.";
  } else {
    const category = await getCategoryBySlug(slug);
    if (!category) {
      notFound();
    }
    title = `${category.title} | The Platform Press`;
    description = `Stay updated with the latest ${category.title} news from The Platform Press.`;
    cacheTagId = category.id;
  }

  // revalidate if this category changes or via global tag
  if (cacheTagId) {
    cacheTag(cacheTagId, "categories");
  }

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/category/${slug}`,
      siteName: "The Platform Press",
      images: [
        {
          url: `/category/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return [
    { slug: "all" },
    ...categories.map((c) => ({ slug: c.slug }))
  ];
}

export default async function CategorySearchPage({
  params,
  searchParams,
}: Props) {
  const { slug, locale } = await params;
  const { q } = await searchParams;

  // Handle "all" slug specially
  if (slug === "all") {
    const articles = await getInitialArticles(null);

    return (
      <CategorySearchClient
        initialArticles={articles}
        totalCount={articles.length}
        hasMore={articles.length > 9}
        category="all"
        searchParams={q ? { q } : {}}
        locale={locale}
      />
    );
  }

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

async function getInitialArticles(category: Category | null) {
  "use cache: remote";
  cacheLife("max");

  const articles = await getArticles({
    category: category?.slug,
    sortBy: "datePublished",
    limit: 9,
  });

  cacheTag(...articles.map((a) => a.id), "article-list", "articles");

  return articles;
}
