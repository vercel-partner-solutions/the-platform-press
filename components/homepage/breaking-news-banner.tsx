import Link from "next/link"
import { getBreakingNews } from "@/lib/cms"

export default async function BreakingNewsBanner() {
  const article = await getBreakingNews()

  if (!article) return null

  return (
    <div className="px-4 py-4">
      <div className="container mx-auto flex items-center justify-center text-sm font-medium">
        <span className="mr-2 text-red-500 font-bold">LIVE</span>
        <Link href={`/${article.slug}`} className="hover:underline text-center line-clamp-1">
          {article.title}
        </Link>
      </div>
    </div>
  )
}
