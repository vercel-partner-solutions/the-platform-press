"use client";

import { useEffect } from "react";
import { trackArticleView } from "@/app/actions/articles";

export function ArticleTracker({ slug }: { slug: string }) {
  useEffect(() => {
    // Fire and forget - no await needed for non-blocking behavior
    trackArticleView(slug);
  }, [slug]);

  return null; // Renders nothing - zero impact on layout
}