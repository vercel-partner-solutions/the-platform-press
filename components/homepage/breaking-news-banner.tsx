import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import Link from "next/link";
import { getArticles } from "@/lib/cms";

export default async function BreakingNewsBanner({
  draft = false,
}: {
  draft?: boolean;
}) {
  "use cache: remote";
  cacheLife("max");

  const breakingArticles = await getArticles({
    isBreaking: true,
    limit: 1,
    sortBy: "datePublished",
    draft,
  });

  const article = breakingArticles[0];

  if (!article) return null;

  // revalidate if article categories change, article lists may change, or via global tag
  cacheTag(`category:${article.categoryId}`, "article:list", "article:all");

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
