import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getCategoryBySlug } from "@/lib/cms";
import CategoryHeader from "@/components/category/category-header";
import CategorySearchSkeleton from "@/components/category/category-search-skeleton";
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

  let title: string;
  let description: string;
  let cacheTagId: string | undefined;

  if (slug === "all") {
    title = "All Articles | The Platform Press";
    description =
      "Browse all articles from The Platform Press across all categories.";
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
  return [{ slug: "all" }, ...categories.map((c) => ({ slug: c.slug }))];
}

export default async function CategoryPage({ params }: Props) {
  "use cache: remote";
  cacheLife("max");

  const { slug, locale } = await params;

  let category;
  let categoryName: string;

  if (slug === "all") {
    categoryName = "all";
  } else {
    category = await getCategoryBySlug(slug);

    if (!category) {
      notFound();
    }

    cacheTag(category.id);
    categoryName = category.title;
  }

  return (
    <div className="flex-1 min-w-0">
      <CategoryHeader category={categoryName} />
      <Suspense fallback={<CategorySearchSkeleton />}>
        <CategoryArticles category={category} locale={locale} />
      </Suspense>
    </div>
  );
}
