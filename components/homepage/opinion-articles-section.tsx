import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/lib/cms";
import type { Article } from "@/lib/types";

function OpinionArticleCard({ article }: { article: Article }) {
  return (
    <article className="group bg-neutral-50 p-4 rounded-lg hover:bg-neutral-100 transition-colors">
      <div className="flex items-start gap-3 mb-2">
        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
          <Image
            src={`/placeholder.svg?width=48&height=48&query=author ${
              article.author.split(" ")[0]
            }`}
            alt={article.author}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-black">{article.author}</h4>
          <p className="text-xs text-neutral-600">Opinion Contributor</p>
        </div>
      </div>
      <Link href={`/articles/${article.slug}`}>
        <h3 className="text-lg font-semibold text-black group-hover:underline mb-1 leading-tight line-clamp-3">
          {article.title}
        </h3>
      </Link>
      <p className="text-sm text-neutral-700 line-clamp-2 mb-3">
        {article.excerpt}
      </p>
      <Link
        href={`/articles/${article.slug}`}
        className="text-sm text-black hover:underline font-medium"
      >
        Read full opinion &rarr;
      </Link>
    </article>
  );
}

export default async function OpinionArticlesSection({
  isHomepage = false,
}: {
  isHomepage?: boolean;
}) {
  "use cache: remote";

  const articles = await getArticles({
    limit: 3,
    category: "Opinion",
    sortBy: "datePublished",
    ...(isHomepage && { excludeFeatured: true }),
  });

  if (!articles || articles.length === 0) return null;

  return (
    <section aria-labelledby="opinion-heading" className="mb-10">
      <div className="flex items-baseline justify-between border-b-2 border-black pb-2 mb-6">
        <h2
          id="opinion-heading"
          className="text-2xl font-bold uppercase tracking-tight text-black"
        >
          Opinions & Analysis
        </h2>
        <Link
          href="/category/opinion"
          className="text-sm font-medium text-black hover:underline"
        >
          View all &rarr;
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <OpinionArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
