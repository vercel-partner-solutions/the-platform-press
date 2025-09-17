import Link from "next/link";
import { getFormatter } from "next-intl/server";
import { getArticles } from "@/lib/cms";
import type { Article } from "@/lib/types";

async function PopularArticleListItem({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  const formatter = await getFormatter();
  const date = new Date(article.datePublished);
  const dateTime = formatter.dateTime(date, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <li className="py-5 border-b border-neutral-200 last:border-b-0">
      <div className="flex items-start gap-4 sm:gap-5">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-accent text-accent-foreground rounded-full font-bold text-sm">
          {index + 1}
        </div>
        <div className="flex-grow">
          <Link href={`/${article.slug}`} className="block">
            <h3 className="text-lg font-bold text-black hover:underline leading-tight">
              {article.title}
            </h3>
          </Link>
          <p className="text-xs font-semibold text-neutral-500 mt-1.5 tracking-wider">
            <span>{article.author.toUpperCase()}</span>
            <span className="mx-1.5">&middot;</span>
            <span>{dateTime}</span>
          </p>
        </div>
      </div>
    </li>
  );
}

export default async function PopularArticlesSection({
  isHomepage = false,
}: {
  isHomepage?: boolean;
}) {
  const articles = await getArticles({
    limit: 5,
    sortBy: "views",
    ...(isHomepage && { excludeFeatured: true }),
  });

  if (!articles || articles.length === 0) return null;

  return (
    <div className="relative">
      <section
        aria-labelledby="popular-heading"
        className="relative z-10 bg-white border-2 border-black rounded-2xl p-4 sm:p-6"
      >
        <h3
          id="popular-heading"
          className="text-sm font-bold uppercase tracking-widest text-black mb-4"
        >
          Most Popular
        </h3>
        <ol>
          {articles.map((article, index) => (
            <PopularArticleListItem
              key={article.id}
              article={article}
              index={index}
            />
          ))}
        </ol>
      </section>
    </div>
  );
}
