import type { Metadata } from "next";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ArticlesGridSkeleton from "@/components/category/articles-grid-skeleton";
import CategoryArticles from "@/components/category/category-articles";
import CategorySearchForm from "@/components/category/category-search-form";
import { getCategories, getCategoryBySlug } from "@/lib/cms";

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
  cacheTag(`category:${category.id}`, "category:all");

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

export default async function CategoryPage({ params, searchParams }: Props) {
  const { isEnabled: draftEnabled } = await draftMode();

  // get cached slug and category from params to pass into CategoryArticles within Suspense
  const { slug, category, locale } = await getCategoryParams({
    params,
    draft: draftEnabled,
  });

  return (
    <div className="flex-1 min-w-0">
      <CategoryHeader params={params} draft={draftEnabled} />
      <Suspense fallback={<CategoryPageSkeleton />}>
        <CategorySearchForm categorySlug={slug} locale={locale} />
        <CategoryArticles
          category={category}
          locale={locale}
          searchParams={searchParams}
          draft={draftEnabled}
        />
      </Suspense>
    </div>
  );
}

async function CategoryHeader({
  params,
  draft = false,
}: {
  params: Promise<{ slug: string }>;
  draft?: boolean;
}) {
  "use cache: remote";
  cacheLife("max");

  const { slug } = await params;

  const category = await getCategoryBySlug(slug, draft);

  if (!category) {
    notFound();
  }

  // revalidate if this category changes or via the global tag
  cacheTag(`category:${category.id}`, "category:all");

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-black mb-2">{category.title}</h1>
      <div className="w-16 h-1 bg-blue-600 rounded"></div>
    </div>
  );
}

async function getCategoryParams({
  params,
  draft = false,
}: {
  params: Promise<{ slug: string; locale: string }>;
  draft?: boolean;
}) {
  "use cache: remote";
  cacheLife("max");

  const { slug, locale } = await params;

  const category = await getCategoryBySlug(slug, draft);

  if (!category) {
    notFound();
  }

  // revalidate if lists of articles may change or via global tag
  cacheTag("category:list", "category:all");

  return { slug, category, locale };
}

function CategoryPageSkeleton() {
  return (
    <div>
      <div className="mb-8">
        <div className="h-12 bg-neutral-200 rounded-lg animate-pulse"></div>
      </div>
      <ArticlesGridSkeleton />
    </div>
  );
}
