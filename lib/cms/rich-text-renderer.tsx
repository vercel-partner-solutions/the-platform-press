import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
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
        <div className="relative w-full my-10">
          <Image
            src={url}
            alt={description || title || ""}
            width={width || 1200}
            height={height || 675}
            className="w-full h-auto rounded-lg shadow-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
          {(description || title) && (
            <p className="text-sm text-neutral-600 italic mt-3 text-center">
              {description || title}
            </p>
          )}
        </div>
      );
    },
    [BLOCKS.PARAGRAPH]: (node: any, children: ReactNode): ReactNode => (
      <p className="mb-6 leading-relaxed text-lg text-neutral-800">
        {children}
      </p>
    ),
    [BLOCKS.HEADING_1]: (node: any, children: ReactNode): ReactNode => (
      <h1 className="text-4xl font-bold mt-12 mb-6 text-black leading-tight">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: ReactNode): ReactNode => (
      <h2 className="text-3xl font-bold mt-10 mb-4 text-black leading-tight">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: ReactNode): ReactNode => (
      <h3 className="text-2xl font-bold mt-8 mb-4 text-black leading-tight">
        {children}
      </h3>
    ),
    [BLOCKS.HEADING_4]: (node: any, children: ReactNode): ReactNode => (
      <h4 className="text-xl font-bold mt-6 mb-3 text-black">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (node: any, children: ReactNode): ReactNode => (
      <h5 className="text-lg font-bold mt-6 mb-3 text-black">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (node: any, children: ReactNode): ReactNode => (
      <h6 className="text-base font-bold mt-4 mb-3 text-black">{children}</h6>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: ReactNode): ReactNode => (
      <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: ReactNode): ReactNode => (
      <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: ReactNode): ReactNode => (
      <li className="leading-relaxed text-lg text-neutral-800">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node: any, children: ReactNode): ReactNode => (
      <blockquote className="border-l-4 border-accent pl-6 py-4 my-8 bg-neutral-50 italic text-lg text-neutral-700 rounded-r-lg">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: (): ReactNode => <hr className="my-12 border-neutral-300" />,
    [INLINES.HYPERLINK]: (node: any, children: ReactNode): ReactNode => {
      const { uri } = node.data;
      return (
        <a
          href={uri}
          className="text-accent font-medium underline decoration-blue-200 underline-offset-2 transition-colors hover:decoration-accent hover:text-blue-600"
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
      <code className="bg-neutral-100 px-2 py-1 rounded font-mono text-sm text-neutral-800">
        {text}
      </code>
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
