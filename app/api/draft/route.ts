import { getArticleBySlug } from "@/lib/cms";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (!process.env.DRAFT_MODE_SECRET_TOKEN) {
    return new Response("Draft mode secret not configured", { status: 500 });
  }

  if (secret !== process.env.DRAFT_MODE_SECRET_TOKEN) {
    return new Response("Invalid token", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  // If a slug is provided, validate the article exists and redirect to it
  if (slug) {
    // Pass draft = true to fetch draft content
    const article = await getArticleBySlug(slug, true);

    if (article?.slug) {
      redirect(`/articles/${article.slug}`);
    }

    return new Response(`Article with slug "${slug}" not found`, {
      status: 404,
    });
  }

  return new Response("Draft mode enabled", { status: 200 });
}
