"use server";

import { cookies } from "next/headers";

export async function trackArticleView(slug: string): Promise<void> {
  try {
    const cookieStore = await cookies();

    if (!cookieStore.has("platform-press-subscription")) {
      return;
    }

    const existingCookie = cookieStore.get("platform-press-visited-articles");
    let visitedArticles: string[] = [];

    if (existingCookie?.value) {
      visitedArticles = JSON.parse(existingCookie.value);
    }

    // Remove the slug if it already exists to move it to the front
    visitedArticles = visitedArticles.filter((s) => s !== slug);

    // Add the current slug to the front
    visitedArticles.unshift(slug);

    visitedArticles = visitedArticles.slice(0, 3);

    cookieStore.set(
      "platform-press-visited-articles",
      JSON.stringify(visitedArticles),
      {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      },
    );
  } catch (error) {
    console.error("Error tracking article view:", error);
  }
}
