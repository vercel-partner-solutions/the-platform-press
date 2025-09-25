import Link from "next/link";
import { getArticles } from "@/lib/cms";
import CategoryArticleCard from "./category-article-card";
import { unstable_cacheTag as cacheTag } from "next/cache";

export default async function CategoryArticlesSection({
  title,
  categorySlug,
  isHomepage = false,
}: {
  title: string;
  categorySlug?: string;
  isHomepage?: boolean;
}) {
  "use cache: remote";

  const articles = await getArticles({
    category: title,
    limit: 4,
    sortBy: "datePublished",
    ...(isHomepage && { excludeFeatured: true }),
  });

  if (!articles || articles.length === 0) return null;

  // revalidate if any of these articles change, a list of articles may change, or via global tag
  cacheTag(...articles.map((a) => a.id), "article-list", "articles");

  return (
    <section
      aria-labelledby={`${categorySlug || title.toLowerCase()}-heading`}
      className="mb-10"
    >
      <div className="flex items-baseline justify-between border-b-2 border-black pb-2 mb-6">
        <h2
          id={`${categorySlug || title.toLowerCase()}-heading`}
          className="text-2xl font-bold uppercase tracking-tight text-black"
        >
          {title}
        </h2>
        {categorySlug && (
          <Link
            href={`/category/${categorySlug}`}
            className="text-sm font-medium text-black hover:underline"
          >
            View all &rarr;
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
        {articles.map((article) => (
          <CategoryArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
