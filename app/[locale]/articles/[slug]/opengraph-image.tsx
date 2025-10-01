import OpengraphImage from "@/components/opengraph-image";
import { getArticleBySlug } from "@/lib/cms";

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return await OpengraphImage({ title: "Article Not Found" });
  }

  const articleInfo = [];

  if (article.category) {
    articleInfo.push(article.category.toUpperCase());
  }

  if (article.author) {
    articleInfo.push(`By ${article.author}`);
  }

  if (article.datePublished) {
    const formattedDate = new Date(article.datePublished).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );
    articleInfo.push(formattedDate);
  }

  return await OpengraphImage({
    title: article.title,
    bottomText: articleInfo.length > 0 ? articleInfo.join(" • ") : undefined,
  });
}
