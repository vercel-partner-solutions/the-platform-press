import {
  cacheLife,
  cacheTag,
} from "next/cache";
import Link from "next/link";
import { getArticles, getCategoryById } from "@/lib/cms";
import CategoryArticleCard from "./category-article-card";

export default async function CategoryArticlesSection({
  categoryId,
  sectionTitle,
  draft = false,
}: {
  categoryId: string;
  sectionTitle: string;
  draft?: boolean;
}) {
  "use cache: remote";
  cacheLife("max");

  const category = await getCategoryById(categoryId, draft);
  if (!category) return null;

  const articles = await getArticles({
    categoryId: categoryId,
    limit: 4,
    sortBy: "datePublished",
    excludeFeatured: true,
    draft,
  });

  if (!articles || articles.length === 0) return null;

  // revalidate if article categories change, article lists may change, or via global tag
  cacheTag(
    ...articles.map((a) => `category:${a.categoryId}`),
    "article:list",
    "article:all",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
        {articles.map((article) => (
          <CategoryArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
