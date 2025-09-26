import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";
import Image from "next/image";
import type { ReactNode } from "react";

interface RichTextRendererProps {
  content: Document;
}

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any): ReactNode => {
      if (!node.data?.target?.url) {
        return null;
      }
      const { url, title, description, width, height } = node.data.target;
      return (
        <div className="relative w-full my-6">
          <Image
            src={url}
            alt={description || title || ""}
            width={width || 1200}
            height={height || 675}
            className="w-full h-auto rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
      );
    },
    [BLOCKS.PARAGRAPH]: (node: any, children: ReactNode): ReactNode => (
      <p className="mb-4">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: any, children: ReactNode): ReactNode => (
      <h1 className="text-4xl font-bold mb-4">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: ReactNode): ReactNode => (
      <h2 className="text-3xl font-bold mb-3">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: ReactNode): ReactNode => (
      <h3 className="text-2xl font-bold mb-3">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (node: any, children: ReactNode): ReactNode => (
      <h4 className="text-xl font-bold mb-2">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (node: any, children: ReactNode): ReactNode => (
      <h5 className="text-lg font-bold mb-2">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (node: any, children: ReactNode): ReactNode => (
      <h6 className="text-base font-bold mb-2">{children}</h6>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: ReactNode): ReactNode => (
      <ul className="list-disc pl-6 mb-4">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: ReactNode): ReactNode => (
      <ol className="list-decimal pl-6 mb-4">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: ReactNode): ReactNode => (
      <li className="mb-1">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node: any, children: ReactNode): ReactNode => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: (): ReactNode => <hr className="my-6 border-gray-300" />,
    [INLINES.HYPERLINK]: (node: any, children: ReactNode): ReactNode => {
      const { uri } = node.data;
      return (
        <a
          href={uri}
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
  },
  renderMark: {
    bold: (text: ReactNode): ReactNode => <strong>{text}</strong>,
    italic: (text: ReactNode): ReactNode => <em>{text}</em>,
    underline: (text: ReactNode): ReactNode => <u>{text}</u>,
    code: (text: ReactNode): ReactNode => (
      <code className="bg-gray-100 px-1 py-0.5 rounded">{text}</code>
    ),
  },
};

export default function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content) {
    return null;
  }

  return (
    <div className="prose prose-neutral lg:prose-lg max-w-none">
      {documentToReactComponents(content, options)}
    </div>
  );
}