import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";

async function LocalNewsCard({
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
                "news"
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

export default function LocalNewsSection({
  articles,
  location,
  locale,
}: {
  articles: Article[];
  location: string;
  locale: string;
}) {
  if (!articles || articles.length === 0) return null;
  return (
    <section aria-labelledby="local-news-heading" className="mb-10">
      <div className="border-b-2 border-black pb-2 mb-6">
        <h2
          id="local-news-heading"
          className="text-2xl font-bold uppercase tracking-tight text-black"
        >
          Local News - {location}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <LocalNewsCard key={article.id} article={article} locale={locale} />
        ))}
      </div>
    </section>
  );
}
