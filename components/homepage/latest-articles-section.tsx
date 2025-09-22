import Link from "next/link";
import { getArticles } from "@/lib/cms";
import LatestArticleListItem from "./latest-article-list-item";

export default async function LatestArticlesSection({
  isHomepage = false,
  locale,
}: {
  isHomepage?: boolean;
  locale: string;
}) {
  const articles = await getArticles({
    limit: 4,
    sortBy: "datePublished",
    ...(isHomepage && { excludeFeatured: true }),
  });

  if (!articles || articles.length === 0) return null;

  return (
    <section aria-labelledby="latest-news-heading">
      <div className="flex items-baseline justify-between border-b-2 border-black pb-2 mb-6">
        <h2
          id="latest-news-heading"
          className="text-2xl font-bold uppercase tracking-tight text-black"
        >
          Latest News
        </h2>
        <Link
          href="/category/latest"
          className="text-sm font-medium text-black hover:underline"
        >
          View all &rarr;
        </Link>
      </div>
      <ol className="relative border-l-2 border-neutral-200">
        {articles.map((article) => (
          <LatestArticleListItem
            key={article.id}
            article={article}
            locale={locale}
          />
        ))}
      </ol>
    </section>
  );
}
