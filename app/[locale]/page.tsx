import type { Metadata } from "next";

import BreakingNewsBanner from "@/components/homepage/breaking-news-banner";
import CategoryArticlesSection from "@/components/homepage/category-articles-section";
import ContinueReading from "@/components/homepage/continue-reading";
import HeroSection from "@/components/homepage/hero-section";
import LatestArticlesSection from "@/components/homepage/latest-articles-section";
import AuthoredArticlesSection from "@/components/homepage/authored-articles-section";
import PopularArticlesSection from "@/components/homepage/popular-articles-section";
import { getDictionary } from "@/dictionaries";
import { homepageConfig } from "@/lib/cms";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale);

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  return {
    title: t.Homepage.title,
    description: t.Homepage.description,
    openGraph: {
      type: "website",
      title: "The Platform Press",
      description: t.Homepage.description,
      url: baseUrl,
    },
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
      <BreakingNewsBanner />

      <div className="space-y-16 pt-0">
        <HeroSection />

        <ContinueReading
          locale={locale}
          fallbackCategoryId={
            homepageConfig.sections.continueReadingFallback.categoryId
          }
        />

        <CategoryArticlesSection
          categoryId={homepageConfig.sections.firstCategorySection.categoryId}
          sectionTitle={homepageConfig.sections.firstCategorySection.sectionTitle}
          isHomepage
        />
        {/* Two-column layout for Latest News and Popular This Week */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-10">
          <div className="lg:col-span-2">
            <LatestArticlesSection isHomepage locale={locale} />
          </div>
          <div>
            <PopularArticlesSection isHomepage locale={locale} />
          </div>
        </div>
        <AuthoredArticlesSection
          categoryId={homepageConfig.sections.authoredSection.categoryId}
          sectionTitle={homepageConfig.sections.authoredSection.sectionTitle}
          isHomepage
        />
        <CategoryArticlesSection
          categoryId={homepageConfig.sections.secondCategorySection.categoryId}
          sectionTitle={homepageConfig.sections.secondCategorySection.sectionTitle}
          isHomepage
        />
      </div>
    </>
  );
}
