import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/types";
import CategoryBadge from "./category-badge";

export default function ArticleCard({
  article,
  priorityImage = false,
}: {
  article: Article;
  priorityImage?: boolean;
}) {
  const formattedDate = new Date(article.datePublished).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <article className="bg-white group flex flex-col">
      <Link href={`/${article.slug}`} className="block">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md">
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
            priority={priorityImage}
          />
        </div>
      </Link>
      <div className="pt-4 pb-2 flex flex-col flex-grow">
        <div className="mb-1.5">
          <CategoryBadge category={article.category} />
        </div>
        <Link href={`/${article.slug}`} className="block">
          <h2 className="text-lg font-semibold text-black group-hover:underline transition-colors mb-1.5 leading-tight">
            {article.title}
          </h2>
        </Link>
        <p className="text-neutral-700 text-sm mb-3 flex-grow line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-neutral-500 mt-auto">
          <span>{formattedDate}</span>
          <span>{article.readingTime} min read</span>
        </div>
      </div>
    </article>
  );
}
