import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import BreakingNewsBanner from "@/components/homepage/breaking-news-banner";
import CategoryArticlesSection from "@/components/homepage/category-articles-section";
import HeroSection from "@/components/homepage/hero-section";
import LatestArticlesSection from "@/components/homepage/latest-articles-section";
import LocalNews from "@/components/homepage/local-news";
import OpinionArticlesSection from "@/components/homepage/opinion-articles-section";
import PopularArticlesSection from "@/components/homepage/popular-articles-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Homepage");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Suspense>
        <BreakingNewsBanner />
      </Suspense>
      <div className="space-y-16 pt-0">
        <Suspense>
          <HeroSection />
        </Suspense>

        <LocalNews />

        <Suspense>
          <CategoryArticlesSection
            title="Technology"
            categorySlug="technology"
            isHomepage
          />
        </Suspense>

        {/* Two-column layout for Latest News and Popular This Week */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-10">
          <div className="lg:col-span-2">
            <Suspense>
              <LatestArticlesSection isHomepage />
            </Suspense>
          </div>
          <div>
            <Suspense>
              <PopularArticlesSection isHomepage />
            </Suspense>
          </div>
        </div>

        <Suspense>
          <OpinionArticlesSection isHomepage />
        </Suspense>

        <Suspense>
          <CategoryArticlesSection
            title="Business"
            categorySlug="business"
            isHomepage
          />
        </Suspense>
      </div>
    </>
  );
}
