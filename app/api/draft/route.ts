import { getArticleBySlug } from "@/lib/cms";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const isDraftModeAllowed =
    process.env.NODE_ENV === "production" ||
    process.env.ENABLE_DRAFT_MODE_DEV === "true";

  if (!isDraftModeAllowed) {
    return new Response("Draft mode is disabled in development", {
      status: 404,
    });
  }

  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const locale = searchParams.get("locale") || "en";

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
    const article = await getArticleBySlug(slug, true);

    if (article?.slug) {
      // Redirect to the preview route instead of regular article page
      redirect(`/${locale}/articles/${article.slug}`);
    }

    return new Response(`Article with slug "${slug}" not found`, {
      status: 404,
    });
  }

  return new Response("Draft mode enabled", { status: 200 });
}
