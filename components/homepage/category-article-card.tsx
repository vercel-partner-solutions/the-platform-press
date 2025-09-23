import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import CategoryBadge from "../ui/category-badge";

export default function CategoryArticleCard({ article }: { article: Article }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/articles/${article.slug}`} className="block">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md bg-neutral-100">
          <Image
            src={
              article.imageUrl ||
              `/placeholder.svg?width=400&height=225&query=${encodeURIComponent(
                "news"
              )}`
            }
            alt={article.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="pt-3">
        <div className="mb-1.5">
          <CategoryBadge category={article.category} />
        </div>
        <Link href={`/articles/${article.slug}`} className="block">
          <h3 className="text-md font-semibold text-black group-hover:underline transition-colors leading-tight line-clamp-3">
            {article.title}
          </h3>
        </Link>
      </div>
    </article>
  );
}
