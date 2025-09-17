import { CalendarDays, Clock, UserCircle } from "lucide-react";
import { marked } from "marked"; // Import the markdown parser
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getFormatter, setRequestLocale } from "next-intl/server";
import ArticleCard from "@/components/ui/article-card";
import CategoryBadge from "@/components/ui/category-badge";
import { getArticleBySlug, getArticles } from "@/lib/cms";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  const article = await getArticleBySlug((await params).slug);
  if (!article) {
    return {
      title: "Article Not Found",
    };
  }
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [
        {
          url: article.imageUrl.startsWith("http")
            ? article.imageUrl
            : `https://yourdomain.com${article.imageUrl}`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const formatter = await getFormatter();
  const date = new Date(article.datePublished);
  const dateTime = formatter.dateTime(date, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Parse the markdown content to HTML
  const parsedContent = await marked.parse(article.content);

  const relatedArticles = await getArticles({
    category: article.category,
    excludeIds: [article.id],
    limit: 2,
  });

  return (
    <NextIntlClientProvider locale={locale} messages={null}>
      <div className="max-w-3xl mx-auto">
        <article className="bg-white py-6 sm:py-8">
          <header className="mb-6">
            <div className="mb-3">
              <CategoryBadge category={article.category} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-3 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center text-sm text-neutral-600 gap-x-4 gap-y-1.5">
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

          <div className="relative w-full aspect-[16/9] mb-6 rounded-lg overflow-hidden">
            <Image
              src={
                article.imageUrl ||
                `/placeholder.svg?width=1200&height=675&query=${encodeURIComponent(
                  "news article",
                )}`
              }
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div
            className="prose prose-neutral lg:prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: parsedContent }} // Use the parsed HTML
          />
        </article>

        {relatedArticles.length > 0 && (
          <section className="mt-10 pt-6">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6">
              {relatedArticles.map((related) => (
                <ArticleCard key={related.id} article={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </NextIntlClientProvider>
  );
}
