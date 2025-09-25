import Link from "next/link";
import { getArticles } from "@/lib/cms";

export default async function BreakingNewsBanner() {
  "use cache";
  const breakingArticles = await getArticles({
    isBreaking: true,
    limit: 1,
    sortBy: "datePublished",
  });
  const article = breakingArticles[0];

  if (!article) return null;

  return (
    <div className="px-4 py-4">
      <div className="container mx-auto flex items-center justify-center text-sm font-medium">
        <span className="mr-2 text-red-500 font-bold">LIVE</span>
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
