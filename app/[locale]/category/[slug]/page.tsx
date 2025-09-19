import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
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
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Category");
  const category = decodeURIComponent(slug);
  
  return {
    title: t("title", { category }),
    description: t("description", { category }),
    openGraph: {
      title: t("title", { category }),
      description: t("description", { category }),
      type: "website",
      url: `/${locale}/category/${slug}`,
    },
  };
}

export default async function CategorySearchPage({
  params,
  searchParams,
}: Props) {
  const { slug, locale } = await params;
  const { q } = await searchParams;
  setRequestLocale(locale);

  const category = decodeURIComponent(slug);
  const articles = await getArticles({
    category: category,
  });

  return (
    <Suspense>
      <CategorySearchClient
        initialArticles={articles}
        totalCount={articles.length}
        hasMore={articles.length > 9}
        category={category}
        searchParams={q ? { q } : {}}
      />
    </Suspense>
  );
}