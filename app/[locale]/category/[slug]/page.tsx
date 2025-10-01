import type { Metadata } from "next";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ArticlesGridSkeleton from "@/components/category/articles-grid-skeleton";
import CategoryHeader from "@/components/category/category-header";
import { getCategories, getCategoryBySlug } from "@/lib/cms";
import CategoryArticles from "./category-articles";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
  searchParams: Promise<{ q: string | undefined }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  "use cache: remote";
  cacheLife("max");

  const { slug } = await params;

  const category = await getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const title = `${category.title} | The Platform Press`;
  const description = `Stay updated with the latest ${category.title} news from The Platform Press.`;

  // revalidate if this category changes or via global tag
  cacheTag(category.id, "categories");

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
  "use cache: remote";
  cacheLife("max");
  cacheTag("categories");

  const categories = await getCategories();

  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category, locale } = await getCategoryParams({ params });

  return (
    <div className="flex-1 min-w-0">
      <CategoryHeader category={category} />
      <Suspense fallback={<ArticlesGridSkeleton showSearchInput />}>
        <CategoryArticles
          category={category}
          locale={locale}
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
}

async function getCategoryParams({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  "use cache: remote";
  cacheLife("max");

  const { slug, locale } = await params;

  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  cacheTag(category.id, "categories");

  return { category, locale };
}
