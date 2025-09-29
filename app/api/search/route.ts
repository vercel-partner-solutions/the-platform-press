import { getArticles, getCategoryBySlug } from "@/lib/cms";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const categorySlug = searchParams.get("c") ?? "";

  let categoryId: string | undefined;
  if (categorySlug) {
    const category = await getCategoryBySlug(categorySlug);
    if (category) {
      categoryId = category.id;
    }
  }

  const results = await getArticles({
    limit: 3,
    searchQuery: query,
    categoryId,
    sortBy: "views",
  });

  const articles = results.map((article) => ({
    id: parseInt(article.id, 10),
    title: article.title,
    url: `/articles/${article.slug}`,
    category: article.category,
    excerpt: article.excerpt,
  }));

  return Response.json({ articles });
}
