import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { isSubscribed } from "@/app/actions/subscription";
import { getArticleBySlug, getArticles, getCategoryById } from "@/lib/cms";
import type { Article } from "@/lib/types";

async function ContinueReadingCard({
  article,
  locale,
}: {
  article: Article;
  locale: string;
}) {
  const date = new Date(article.datePublished);
  const dateTime = date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="group bg-white">
      <Link href={`/articles/${article.slug}`} className="block">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md mb-3">
          <Image
            src={
              article.imageUrl ||
              `/placeholder.svg?width=400&height=225&query=${encodeURIComponent(
                "news",
              )}`
            }
            alt={article.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex flex-col">
        <Link href={`/articles/${article.slug}`} className="block">
          <h3 className="text-lg font-semibold text-black group-hover:underline transition-colors mb-2 leading-tight line-clamp-2">
            {article.title}
          </h3>
        </Link>
        <p className="text-neutral-700 text-sm mb-3 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="text-xs text-neutral-500 flex items-center justify-between mt-auto">
          <span>{dateTime}</span>
          <span>{article.readingTime} min read</span>
        </div>
      </div>
    </article>
  );
}

export default async function ContinueReadingSection({
  fallbackCategoryId,
  locale,
  draft = false,
}: {
  fallbackCategoryId: string;
  locale: string;
  draft?: boolean;
}) {
  const subscribed = await isSubscribed();
  let articles: Article[] = [];

  const fallbackCategory = await getCategoryById(fallbackCategoryId, draft);
  if (!fallbackCategory) return null;

  let sectionTitle = fallbackCategory.title;

  if (subscribed) {
    // Get visited articles for subscribed users
    const cookieStore = await cookies();
    const visitedCookie = cookieStore.get("platform-press-visited-articles");

    if (visitedCookie?.value) {
      try {
        const visitedSlugs: string[] = JSON.parse(visitedCookie.value);

        if (visitedSlugs.length > 0) {
          // Fetch articles by slug in parallel
          const articlePromises = visitedSlugs.map((slug) =>
            getArticleBySlug(slug, draft),
          );
          const fetchedArticles = await Promise.all(articlePromises);

          // Filter out any undefined results
          articles = fetchedArticles.filter(
            (article: Article | undefined): article is Article =>
              article !== undefined,
          );

          if (articles.length > 0) {
            sectionTitle = "Continue Reading";
          }
        }
      } catch (error) {
        console.error("Error parsing visited articles cookie:", error);
      }
    }
  }

  // If no visited articles or not subscribed, use fallback category
  if (articles.length === 0) {
    articles = await getArticles({
      categoryId: fallbackCategoryId,
      limit: 3,
      draft,
    });
  }

  if (!articles || articles.length === 0) return null;

  return (
    <section aria-labelledby="continue-reading-heading" className="mb-10">
      <div className="border-b-2 border-black pb-2 mb-6">
        <h2
          id="continue-reading-heading"
          className="text-2xl font-bold uppercase tracking-tight text-black"
        >
          {sectionTitle}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ContinueReadingCard
            key={article.id}
            article={article}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}
