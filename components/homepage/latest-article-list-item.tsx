import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import CategoryBadge from "../ui/category-badge";

export default async function LatestArticleListItem({
  article,
  locale,
}: {
  article: Article;
  locale: string;
}) {
  const date = new Date(article.datePublished);
  const dateTime = date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <li className="relative pl-8 mb-10 last:mb-0">
      {/* Timeline marker */}
      <div className="absolute w-3 h-3 bg-neutral-300 rounded-full -left-[7px] top-2.5 border-2 border-white" />

      <div className="flex flex-col sm:flex-row gap-6 py-2">
        {/* Image */}
        <Link
          href={`/${article.slug}`}
          className="sm:w-40 md:w-48 shrink-0 block"
        >
          <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden">
            <Image
              src={
                article.imageUrl ||
                `/placeholder.svg?width=192&height=108&query=${encodeURIComponent(
                  "news",
                )}`
              }
              alt={article.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 160px, 192px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        <div className="flex flex-col flex-grow mt-2 sm:mt-0">
          <div className="flex items-center gap-3 mb-1.5">
            <CategoryBadge category={article.category} />
            <time className="text-xs text-neutral-500">{dateTime}</time>
          </div>

          <Link href={`/${article.slug}`} className="block">
            <h3 className="text-lg font-semibold text-black group-hover:underline leading-tight mb-1.5">
              {article.title}
            </h3>
          </Link>

          <p className="text-sm text-neutral-700 mb-2 line-clamp-2 flex-grow">
            {article.excerpt}
          </p>

          <div className="text-xs text-neutral-500 mt-auto flex items-center gap-x-2">
            <span>{article.author}</span>
            <span className="text-neutral-400">·</span>
            <span>{article.readingTime} min read</span>
          </div>
        </div>
      </div>
    </li>
  );
}
