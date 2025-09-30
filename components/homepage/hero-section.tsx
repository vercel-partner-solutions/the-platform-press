import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/lib/cms";
import type { Article } from "@/lib/types";
import CategoryBadge from "../ui/category-badge";
import {
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife,
} from "next/cache";

export default async function HeroSection() {
  "use cache: remote";
  cacheLife("max");

  const featuredArticles = await getArticles({
    isFeatured: true,
    limit: 1,
    sortBy: "datePublished",
  });
  const featuredArticle = featuredArticles[0];

  const excludedIds: string[] = [];

  if (featuredArticle) {
    excludedIds.push(featuredArticle.id);
  }

  const secondaryArticles = await getArticles({
    limit: 3,
    excludeIds: excludedIds,
    sortBy: "datePublished",
  });

  if (!featuredArticle) return null;

  // revalidate if the featured or secondary articles change, their categories change, if a list of articles may change, or via global tag
  cacheTag(
    featuredArticle.id,
    featuredArticle.categoryId,
    ...secondaryArticles.map((a) => a.id),
    ...secondaryArticles.map((a) => a.categoryId),
    "article-list",
    "articles"
  );

  return (
    <section aria-labelledby="hero-heading" className="mb-10">
      <h2 id="hero-heading" className="sr-only">
        Featured News
      </h2>
      <div className="grid grid-cols-12 gap-6">
        <FeaturedArticleCard article={featuredArticle} />

        {secondaryArticles.length > 0 && (
          <div className="col-span-12 lg:col-span-4 bg-neutral-50 rounded-lg p-6 flex flex-col justify-center">
            <div className="space-y-6 divide-y divide-neutral-200">
              {secondaryArticles.map((article, index) => (
                <div key={article.id} className={index === 0 ? "" : "pt-6"}>
                  <SecondaryArticleCard article={article} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedArticleCard({ article }: { article: Article }) {
  return (
    <article className="col-span-12 lg:col-span-8 relative group rounded-lg overflow-hidden h-[450px] bg-black">
      <Link href={`/articles/${article.slug}`} className="block w-full h-full">
        <Image
          src={
            article.imageUrl ||
            `/placeholder.svg?width=800&height=450&query=${"news"}`
          }
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
          <div className="mb-2">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-sm bg-black/60 text-white backdrop-blur-sm">
              {article.category}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight group-hover:underline drop-shadow-lg">
            {article.title}
          </h2>
        </div>
      </Link>
    </article>
  );
}

function SecondaryArticleCard({ article }: { article: Article }) {
  return (
    <article className="group">
      <Link href={`/articles/${article.slug}`} className="block">
        <div className="mb-1.5">
          <CategoryBadge category={article.category} />
        </div>
        <h3 className="text-lg font-semibold text-black group-hover:underline leading-tight">
          {article.title}
        </h3>
        <p className="text-sm text-neutral-600 mt-1.5 line-clamp-2">
          By {article.author}
        </p>
      </Link>
    </article>
  );
}
