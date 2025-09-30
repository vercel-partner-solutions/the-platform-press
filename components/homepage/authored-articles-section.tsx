import Image from "next/image";
import Link from "next/link";
import { getArticles, getCategoryById } from "@/lib/cms";
import type { Article } from "@/lib/types";
import {
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife,
} from "next/cache";

export default async function AuthoredArticlesSection({
  categoryId,
  sectionTitle,
  isHomepage = false,
}: {
  categoryId: string;
  sectionTitle: string;
  isHomepage?: boolean;
}) {
  "use cache: remote";
  cacheLife("max");

  const category = await getCategoryById(categoryId);
  if (!category) return null;

  const articles = await getArticles({
    limit: 3,
    categoryId: categoryId,
    sortBy: "datePublished",
    ...(isHomepage && { excludeFeatured: true }),
  });

  if (!articles || articles.length === 0) return null;

  // revalidate if any of these articles changes, their categories change, a list of articles may change, or via global tag
  cacheTag(
    ...articles.map((a) => a.id),
    ...articles.map((a) => a.categoryId),
    "article-list",
    "articles"
  );

  return (
    <section aria-labelledby={`${category.slug}-heading`} className="mb-10">
      <div className="flex items-baseline justify-between border-b-2 border-black pb-2 mb-6">
        <h2
          id={`${category.slug}-heading`}
          className="text-2xl font-bold uppercase tracking-tight text-black"
        >
          {sectionTitle}
        </h2>
        <Link
          href={`/category/${category.slug}`}
          className="text-sm font-medium text-black hover:underline"
        >
          View all &rarr;
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <AuthorArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}

function AuthorArticleCard({ article }: { article: Article }) {
  return (
    <article className="group bg-neutral-50 p-4 rounded-lg hover:bg-neutral-100 transition-colors">
      <div className="flex items-start gap-3 mb-4">
        <div>
          <h4 className="text-sm font-semibold text-black">{article.author}</h4>
          <p className="text-xs text-neutral-600">Contributor</p>
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
        Read full details &rarr;
      </Link>
    </article>
  );
}
