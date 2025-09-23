"use client";

import { useEffect } from "react";
import { trackArticleView } from "@/app/actions/articles";

export function ArticleTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackArticleView(slug);
  }, [slug]);

  return null;
}
