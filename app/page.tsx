import type { Metadata } from "next";
import { Suspense } from "react";
import BreakingNewsBanner from "../components/homepage/breaking-news-banner";
import HeroSection from "@/components/homepage/hero-section";
import CategoryArticlesSection from "@/components/homepage/category-articles-section";
import LatestArticlesSection from "@/components/homepage/latest-articles-section";
import PopularArticlesSection from "@/components/homepage/popular-articles-section";
import OpinionArticlesSection from "@/components/homepage/opinion-articles-section";
import LocalNews from "@/components/homepage/local-news";

export const metadata: Metadata = {
  title: "Homepage | The Platform Press",
  description:
    "Discover the latest news, in-depth analysis, and compelling stories from The Platform Press.",
};

export default function HomePage() {
  return (
    <>
      <Suspense>
        <BreakingNewsBanner />
      </Suspense>
      <div className="space-y-16 pt-0">
        <Suspense fallback={<HeroSectionLoading />}>
          <HeroSection />
        </Suspense>

        <LocalNews />

        <Suspense fallback={<CategorySectionLoading title="Technology" />}>
          <CategoryArticlesSection
            title="Technology"
            categorySlug="technology"
            isHomepage
          />
        </Suspense>

        {/* Two-column layout for Latest News and Popular This Week */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-10">
          <div className="lg:col-span-2">
            <Suspense fallback={<LatestSectionLoading />}>
              <LatestArticlesSection isHomepage />
            </Suspense>
          </div>
          <div>
            <Suspense fallback={<PopularSectionLoading />}>
              <PopularArticlesSection isHomepage />
            </Suspense>
          </div>
        </div>

        <Suspense fallback={<OpinionSectionLoading />}>
          <OpinionArticlesSection isHomepage />
        </Suspense>

        <Suspense fallback={<CategorySectionLoading title="Business" />}>
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

// Loading components
function HeroSectionLoading() {
  return (
    <section className="mb-10">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 animate-pulse bg-neutral-200 rounded-lg h-[450px]"></div>
        <div className="col-span-12 lg:col-span-4 bg-neutral-50 rounded-lg p-6 flex flex-col justify-center animate-pulse">
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                <div className="h-5 bg-neutral-200 rounded w-full"></div>
                <div className="h-5 bg-neutral-200 rounded w-3/4"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/2 mt-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategorySectionLoading({ title }: { title: string }) {
  return (
    <section className="mb-10">
      <div className="flex items-baseline justify-between border-b-2 border-black pb-2 mb-6">
        <h2 className="text-2xl font-bold uppercase tracking-tight text-black">
          {title}
        </h2>
        <div className="h-4 bg-neutral-200 rounded w-16 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="w-full aspect-[16/9] bg-neutral-200 rounded-md mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-neutral-200 rounded w-20"></div>
              <div className="h-5 bg-neutral-200 rounded w-full"></div>
              <div className="h-5 bg-neutral-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LatestSectionLoading() {
  return (
    <section>
      <div className="flex items-baseline justify-between border-b-2 border-black pb-2 mb-6">
        <h2 className="text-2xl font-bold uppercase tracking-tight text-black">
          Latest News
        </h2>
        <div className="h-4 bg-neutral-200 rounded w-16 animate-pulse"></div>
      </div>
      <div className="relative border-l-2 border-neutral-200 animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="relative mb-6 pl-8 last:mb-0">
            <div className="absolute w-3 h-3 bg-neutral-200 rounded-full -left-[7px] top-2.5"></div>
            <div className="flex flex-col sm:flex-row gap-4 py-2">
              <div className="sm:w-40 md:w-48 shrink-0 aspect-[16/9] bg-neutral-200 rounded-md"></div>
              <div className="flex-grow space-y-2">
                <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                <div className="h-5 bg-neutral-200 rounded w-full"></div>
                <div className="h-5 bg-neutral-200 rounded w-3/4"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/2 mt-1"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PopularSectionLoading() {
  return (
    <section className="relative animate-pulse">
      <div className="relative z-10 bg-white border-2 border-black rounded-2xl p-4 sm:p-6">
        <div className="h-4 bg-neutral-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start gap-4 sm:gap-5">
              <div className="w-8 h-8 bg-neutral-200 rounded-full shrink-0"></div>
              <div className="flex-grow space-y-2">
                <div className="h-5 bg-neutral-200 rounded w-full"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OpinionSectionLoading() {
  return (
    <section className="mb-10">
      <div className="flex items-baseline justify-between border-b-2 border-black pb-2 mb-6">
        <h2 className="text-2xl font-bold uppercase tracking-tight text-black">
          Opinions & Analysis
        </h2>
        <div className="h-4 bg-neutral-200 rounded w-16 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-neutral-50 p-4 rounded-lg animate-pulse">
            <div className="flex items-start gap-3 mb-2">
              <div className="w-12 h-12 bg-neutral-200 rounded-full shrink-0"></div>
              <div className="space-y-1">
                <div className="h-4 bg-neutral-200 rounded w-20"></div>
                <div className="h-3 bg-neutral-200 rounded w-24"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-5 bg-neutral-200 rounded w-full"></div>
              <div className="h-5 bg-neutral-200 rounded w-3/4"></div>
              <div className="h-4 bg-neutral-200 rounded w-full"></div>
              <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
