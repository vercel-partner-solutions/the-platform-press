import { revalidatePath, revalidateTag } from "next/cache";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const secret = searchParams.get("secret");
  const tag = searchParams.get("tag");
  const path = searchParams.get("path");

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!tag && !path) {
    return new Response("Missing tag or path parameter", { status: 400 });
  }

  try {
    const revalidated = [];

    if (tag) {
      revalidateTag(tag, "max");
      revalidated.push(`tag: ${tag}`);
    }

    if (path) {
      revalidatePath(path);
      revalidated.push(`path: ${path}`);
    }

    return Response.json({
      success: true,
      message: "Revalidated successfully",
      revalidated,
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
