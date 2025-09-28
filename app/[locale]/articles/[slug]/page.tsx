import { CalendarDays, Clock, UserCircle } from "lucide-react";
import { marked } from "marked";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleTracker } from "@/components/article-tracker";
import ArticleCard from "@/components/ui/article-card";
import CategoryBadge from "@/components/ui/category-badge";
import { getArticleBySlug, getArticles } from "@/lib/cms";
import {
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife,
} from "next/cache";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  "use cache: remote";
  cacheLife("max");

  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // revalidate if this article changes or via global tag
  cacheTag(article.id, "articles");

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  return {
    title: `${article.title} | The Platform Press`,
    description: article.excerpt,
    openGraph: {
      type: "article",
      title: `${article.title} | The Platform Press`,
      description: article.excerpt,
      siteName: "The Platform Press",
      publishedTime: article.datePublished,
      authors: [article.author],
      section: article.category,
      url: `${baseUrl}/articles/${article.slug}`,
      images: [
        {
          url: `/articles/${article.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export const generateStaticParams = async () => {
  return (await getArticles({ isFeatured: true })).map((a) => ({
    slug: a.slug,
  }));
};

export default async function ArticlePage({
  params,
  previewOnly = false,
}: {
  params: Promise<{ slug: string; locale: string }>;
  previewOnly?: boolean;
}) {
  "use cache: remote";
  cacheLife("max");

  const { slug, locale } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // revalidate if this article changes or via global tag
  cacheTag(article.id, "articles");

  const date = new Date(article.datePublished);
  const dateTime = date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const parsedContent = await marked.parse(article.content);

  const relatedArticles = await getArticles({
    category: article.category,
    excludeIds: [article.id],
    limit: 2,
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <article className="bg-white py-8 sm:py-12">
        <header className="mb-10">
          <div className="mb-3">
            <CategoryBadge category={article.category} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center text-base text-neutral-600 gap-x-6 gap-y-2">
            <div className="flex items-center">
              <UserCircle size={16} className="mr-1.5 text-neutral-500" />
              <span>By {article.author}</span>
            </div>
            <div className="flex items-center">
              <CalendarDays size={16} className="mr-1.5 text-neutral-500" />
              <span>{dateTime}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1.5 text-neutral-500" />
              <span>{article.readingTime} min read</span>
            </div>
          </div>
        </header>

        <div className="relative w-full aspect-[16/9] mb-12 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={
              article.imageUrl ||
              `/placeholder.svg?width=1200&height=675&query=${encodeURIComponent(
                "news article"
              )}`
            }
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {!previewOnly && (
          <div
            className="prose prose-neutral lg:prose-lg max-w-none"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <we want to use the parsed HTML>
            dangerouslySetInnerHTML={{ __html: parsedContent }} // Use the parsed HTML
          />
        )}
      </article>

      {relatedArticles.length > 0 && (
        <section className="mt-16 pt-8 border-t border-neutral-200">
          <h2 className="text-3xl font-semibold text-black mb-6">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6">
            {relatedArticles.map((related) => (
              <ArticleCard key={related.id} article={related} locale={locale} />
            ))}
          </div>
        </section>
      )}
      <ArticleTracker slug={slug} />
    </div>
  );
}
