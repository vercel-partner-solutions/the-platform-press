import type { Metadata } from "next";
import { Suspense } from "react";
import BreakingNewsBanner from "@/components/homepage/breaking-news-banner";
import CategoryArticlesSection from "@/components/homepage/category-articles-section";
import HeroSection from "@/components/homepage/hero-section";
import LatestArticlesSection from "@/components/homepage/latest-articles-section";
import LocalNews from "@/components/homepage/local-news";
import OpinionArticlesSection from "@/components/homepage/opinion-articles-section";
import PopularArticlesSection from "@/components/homepage/popular-articles-section";
import { getDictionary } from "@/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale);

  return {
    title: t.Homepage.title,
    description: t.Homepage.description,
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <Suspense>
        <BreakingNewsBanner />
      </Suspense>
      <div className="space-y-16 pt-0">
        <Suspense>
          <HeroSection />
        </Suspense>

        <LocalNews locale={locale} />

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
              <LatestArticlesSection isHomepage locale={locale} />
            </Suspense>
          </div>
          <div>
            <Suspense>
              <PopularArticlesSection isHomepage locale={locale} />
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
