import Link from "next/link";
import { getArticles } from "@/lib/cms";
import {
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife,
} from "next/cache";

export default async function BreakingNewsBanner() {
  "use cache: remote";
  cacheLife("max");

  const breakingArticles = await getArticles({
    isBreaking: true,
    limit: 1,
    sortBy: "datePublished",
  });

  const article = breakingArticles[0];

  if (!article) return null;

  // revalidate if this article changes, its category changes, a list of articles may change (since this grabs the top 1), or via global tag
  cacheTag(article.id, article.categoryId, "article-list", "articles");

  return (
    <div className="px-4 py-4">
      <div className="container mx-auto flex items-center justify-center text-sm font-medium">
        <span className="mr-2 text-red-500 font-bold">BREAKING</span>
        <Link
          href={`/articles/${article.slug}`}
          className="hover:underline text-center line-clamp-1"
        >
          {article.title}
        </Link>
      </div>
    </div>
  );
}
