import { getArticles } from "@/lib/cms";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("c") ?? "";

  const results = await getArticles({
    limit: 3,
    searchQuery: query,
    category,
    sortBy: "views",
  });

  // Transform articles to match SearchBox interface
  const articles = results.map((article) => ({
    id: parseInt(article.id),
    title: article.title,
    url: `/${article.slug}`,
    category: article.category,
    excerpt: article.excerpt,
  }));

  return Response.json({ articles });
}
