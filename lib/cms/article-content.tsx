import type { Document } from "@contentful/rich-text-types";
import type { RichTextContent } from "@/lib/types";
import RichTextRenderer from "./rich-text-renderer";

interface ArticleContentProps {
  content: RichTextContent;
}

/**
 * Public-facing component for rendering article content.
 * Abstracts away Contentful implementation details from the UI layer.
 */
export function ArticleContent({ content }: ArticleContentProps) {
  // Cast the opaque type back to Document internally (only in CMS layer)
  return <RichTextRenderer content={content as Document} />;
}