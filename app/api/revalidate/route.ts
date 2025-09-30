import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch (error) {
    console.error("Failed to parse request body:", error);
    return new Response("Invalid request body", { status: 400 });
  }

  const webhookSecret = request.headers.get("x-contentful-webhook-secret");

  if (!webhookSecret || webhookSecret !== process.env.REVALIDATE_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const tagsToRevalidate: string[] = [];

  if (body && body.sys) {
    const contentType = body.sys.contentType?.sys?.id || body.sys.contentType;
    const entryId = body.sys.id;

    if (!contentType || !entryId) {
      return new Response(
        "Invalid webhook payload: missing contentType or entryId",
        { status: 400 }
      );
    }

    if (contentType === "article") {
      // Revalidate the specific article by its ID
      tagsToRevalidate.push(entryId);
      // Revalidate article-list tag (for homepage sections, category pages)
      tagsToRevalidate.push("article-list");
    } else if (contentType === "category") {
      // Revalidate the specific category by its ID
      tagsToRevalidate.push(entryId);
      // Revalidate categories tag (for navigation, footer - acceptable since few categories)
      tagsToRevalidate.push("categories");
    } else {
      return new Response(`Unsupported content type: ${contentType}`, {
        status: 400,
      });
    }
  } else {
    return new Response("No valid webhook body", { status: 400 });
  }

  try {
    for (const tagToRevalidate of tagsToRevalidate) {
      revalidateTag(tagToRevalidate);
    }

    const response = {
      success: true,
      message: "Revalidated successfully",
      revalidated: tagsToRevalidate,
      webhook: {
        contentType: body?.sys?.contentType?.sys?.id || body?.sys?.contentType,
        entryId: body?.sys?.id,
        action: body?.sys?.type,
      },
    };

    return Response.json(response);
  } catch (error) {
    console.error("Revalidation error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
