import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getCategoryBySlug } from "@/lib/cms";
import CategoryHeader from "@/components/category/category-header";
import ArticlesGridSkeleton from "@/components/category/articles-grid-skeleton";
import CategoryArticles from "./category-articles";
import {
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife,
} from "next/cache";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
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
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: Props) {
  "use cache: remote";
  cacheLife("max");

  const { slug, locale } = await params;

  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  cacheTag(category.id);

  return (
    <div className="flex-1 min-w-0">
      <CategoryHeader category={category} />
      <Suspense fallback={<ArticlesGridSkeleton showSearchInput />}>
        <CategoryArticles category={category} locale={locale} />
      </Suspense>
    </div>
  );
}
