import type { Article, Category } from "./types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";

// Contentful-specific types
interface ContentfulSys {
  id: string;
  publishedAt?: string;
  firstPublishedAt?: string;
}

interface ContentfulAsset {
  sys: ContentfulSys;
  url: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  contentType?: string;
}

interface ContentfulAuthor {
  sys: ContentfulSys;
  slug: string;
  name: string;
  title: string;
}

interface ContentfulCategory {
  sys: ContentfulSys;
  slug: string;
  title: string;
}

interface ContentfulArticle {
  sys: ContentfulSys;
  slug: string;
  title: string;
  excerpt: string;
  content: Document;
  featuredImage: ContentfulAsset;
  publishDate: string;
  readingTime: number;
  isBreakingNews?: boolean;
  metaDescription?: string;
  metaKeywords?: string;
  author: ContentfulAuthor;
  category: ContentfulCategory;
  relatedArticles?: ContentfulArticle[];
}

interface ContentfulResponse<T> {
  data: T;
  errors?: any[];
}

interface ArticleCollection {
  articleCollection: {
    total: number;
    items: ContentfulArticle[];
  };
}

interface CategoryCollection {
  categoryCollection: {
    total: number;
    items: ContentfulCategory[];
  };
}

const richTextOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      if (!node.data?.target?.url) {
        return "";
      }
      const { url, title, description, width, height } = node.data.target;
      return `<img src="${url}" alt="${description || title || ""}" width="${
        width || "auto"
      }" height="${height || "auto"}" class="w-full h-auto" />`;
    },
    [BLOCKS.PARAGRAPH]: (node: any, next: any) =>
      `<p class="mb-4">${next(node.content)}</p>`,
    [BLOCKS.HEADING_1]: (node: any, next: any) =>
      `<h1 class="text-4xl font-bold mb-4">${next(node.content)}</h1>`,
    [BLOCKS.HEADING_2]: (node: any, next: any) =>
      `<h2 class="text-3xl font-bold mb-3">${next(node.content)}</h2>`,
    [BLOCKS.HEADING_3]: (node: any, next: any) =>
      `<h3 class="text-2xl font-bold mb-3">${next(node.content)}</h3>`,
    [BLOCKS.HEADING_4]: (node: any, next: any) =>
      `<h4 class="text-xl font-bold mb-2">${next(node.content)}</h4>`,
    [BLOCKS.HEADING_5]: (node: any, next: any) =>
      `<h5 class="text-lg font-bold mb-2">${next(node.content)}</h5>`,
    [BLOCKS.HEADING_6]: (node: any, next: any) =>
      `<h6 class="text-base font-bold mb-2">${next(node.content)}</h6>`,
    [BLOCKS.UL_LIST]: (node: any, next: any) =>
      `<ul class="list-disc pl-6 mb-4">${next(node.content)}</ul>`,
    [BLOCKS.OL_LIST]: (node: any, next: any) =>
      `<ol class="list-decimal pl-6 mb-4">${next(node.content)}</ol>`,
    [BLOCKS.LIST_ITEM]: (node: any, next: any) =>
      `<li class="mb-1">${next(node.content)}</li>`,
    [BLOCKS.QUOTE]: (node: any, next: any) =>
      `<blockquote class="border-l-4 border-gray-300 pl-4 italic mb-4">${next(
        node.content
      )}</blockquote>`,
    [BLOCKS.HR]: () => `<hr class="my-6 border-gray-300" />`,
    [INLINES.HYPERLINK]: (node: any, next: any) => {
      const { uri } = node.data;
      return `<a href="${uri}" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">${next(
        node.content
      )}</a>`;
    },
  },
  renderMark: {
    bold: (text: string) => `<strong>${text}</strong>`,
    italic: (text: string) => `<em>${text}</em>`,
    underline: (text: string) => `<u>${text}</u>`,
    code: (text: string) =>
      `<code class="bg-gray-100 px-1 py-0.5 rounded">${text}</code>`,
  },
};

function convertRichTextToHtml(richTextDocument: Document): string {
  if (!richTextDocument) {
    return "";
  }
  return documentToHtmlString(richTextDocument, richTextOptions);
}

const GET_ARTICLES_QUERY = `
  query GetArticles($limit: Int, $skip: Int, $preview: Boolean) {
    articleCollection(limit: $limit, skip: $skip, preview: $preview, order: publishDate_DESC) {
      total
      items {
        sys {
          id
          publishedAt
          firstPublishedAt
        }
        slug
        title
        excerpt
        content {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                url
                title
                description
                width
                height
                contentType
              }
            }
          }
        }
        featuredImage {
          sys {
            id
          }
          url
          title
          description
          width
          height
          contentType
        }
        publishDate
        readingTime
        isBreakingNews
        metaDescription
        metaKeywords
        author {
          sys {
            id
          }
          slug
          name
          title
        }
        category {
          sys {
            id
          }
          slug
          title
        }
      }
    }
  }
`;

const GET_ARTICLE_BY_SLUG_QUERY = `
  query GetArticleBySlug($slug: String!, $preview: Boolean) {
    articleCollection(where: { slug: $slug }, limit: 1, preview: $preview) {
      items {
        sys {
          id
          publishedAt
          firstPublishedAt
        }
        slug
        title
        excerpt
        content {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                url
                title
                description
                width
                height
                contentType
              }
            }
          }
        }
        featuredImage {
          sys {
            id
          }
          url
          title
          description
          width
          height
          contentType
        }
        publishDate
        readingTime
        isBreakingNews
        metaDescription
        metaKeywords
        author {
          sys {
            id
          }
          slug
          name
          title
        }
        category {
          sys {
            id
          }
          slug
          title
        }
        relatedArticlesCollection(limit: 3) {
          items {
            sys {
              id
            }
            slug
            title
            excerpt
          }
        }
      }
    }
  }
`;

const GET_CATEGORIES_QUERY = `
  query GetCategories($preview: Boolean) {
    categoryCollection(preview: $preview, order: [title_ASC]) {
      total
      items {
        sys {
          id
        }
        slug
        title
      }
    }
  }
`;

// Contentful GraphQL fetcher
async function fetchContent<T = any>(
  query: string,
  variables: Record<string, any> = {},
  preview = false
): Promise<T> {
  const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
  const CONTENTFUL_ACCESS_TOKEN = preview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN;

  if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN) {
    throw new Error("Missing Contentful environment variables");
  }

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json: ContentfulResponse<T> = await response.json();

  if (json.errors) {
    console.error("GraphQL errors:", json.errors);
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
}

// Helper function to merge rich text links into the document
function mergeRichTextLinks(content: any): Document {
  if (!content || !content.json) {
    return content?.json || { nodeType: "document", data: {}, content: [] };
  }

  const json = content.json;
  const links = content.links;

  // If there are embedded assets, we need to map them
  if (links?.assets?.block?.length) {
    const assetMap = new Map(
      links.assets.block.map((asset: any) => [asset.sys.id, asset])
    );

    // Recursively process the document to replace asset references
    const processNode = (node: any): any => {
      if (node.nodeType === "embedded-asset-block") {
        const assetId = node.data?.target?.sys?.id;
        if (assetId && assetMap.has(assetId)) {
          return {
            ...node,
            data: {
              ...node.data,
              target: assetMap.get(assetId),
            },
          };
        }
      }

      if (node.content) {
        return {
          ...node,
          content: node.content.map(processNode),
        };
      }

      return node;
    };

    return processNode(json);
  }

  return json;
}

// Reshape functions
function reshapeToArticle(item: ContentfulArticle): Article {
  // Merge rich text links and convert to HTML
  const richTextDocument = mergeRichTextLinks(item.content);
  const htmlContent = convertRichTextToHtml(richTextDocument);

  return {
    id: item.sys.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    content: htmlContent,
    imageUrl:
      item.featuredImage?.url || "/placeholder.svg?width=800&height=450",
    category: item.category?.title || "Uncategorized",
    author: item.author?.name || "Unknown Author",
    datePublished:
      item.publishDate || item.sys.firstPublishedAt || new Date().toISOString(),
    readingTime: item.readingTime || 5,
    isBreaking: item.isBreakingNews || false,
    isFeatured: false, // We can add this field to Contentful later if needed
    views: Math.floor(Math.random() * 2000) + 100, // Simulated for now
  };
}

function reshapeToCategory(item: ContentfulCategory): Category {
  return {
    slug: item.slug,
    title: item.title,
  };
}

export async function getArticles({
  limit,
  category,
  location,
  sortBy,
  excludeIds,
  isFeatured,
  isBreaking,
  excludeFeatured,
  searchQuery,
}: {
  limit?: number;
  category?: string;
  location?: string;
  sortBy?: "datePublished" | "views";
  excludeIds?: string[];
  isFeatured?: boolean;
  isBreaking?: boolean;
  excludeFeatured?: boolean;
  searchQuery?: string;
} = {}): Promise<Article[]> {
  try {
    const response = await fetchContent<ArticleCollection>(GET_ARTICLES_QUERY, {
      limit: limit || 100,
      skip: 0,
      preview: false,
    });

    if (!response?.articleCollection?.items) {
      console.warn("No articles found in Contentful response");
      return [];
    }

    let articles = response.articleCollection.items.map(reshapeToArticle);

    if (category) {
      articles = articles.filter(
        (article) => article.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (location) {
      articles = articles.filter(
        (article) => (article as any).location === location
      );
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      articles = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(lowerQuery) ||
          article.excerpt.toLowerCase().includes(lowerQuery) ||
          article.author.toLowerCase().includes(lowerQuery)
      );
    }

    if (isBreaking !== undefined) {
      articles = articles.filter(
        (article) => article.isBreaking === isBreaking
      );
    }

    if (isFeatured !== undefined) {
      articles = articles.filter(
        (article) => article.isFeatured === isFeatured
      );
    }

    if (excludeFeatured) {
      articles = articles.filter((article) => !article.isFeatured);
    }

    if (excludeIds && excludeIds.length > 0) {
      articles = articles.filter((article) => !excludeIds.includes(article.id));
    }

    if (sortBy === "views") {
      articles.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else {
      // Default sort by datePublished (newest first)
      articles.sort(
        (a, b) =>
          new Date(b.datePublished).getTime() -
          new Date(a.datePublished).getTime()
      );
    }

    if (limit && articles.length > limit) {
      return articles.slice(0, limit);
    }

    return articles;
  } catch (error) {
    console.error("Error fetching articles from Contentful:", error);
    return [];
  }
}

export async function getArticleBySlug(
  slug: string
): Promise<Article | undefined> {
  try {
    const response = await fetchContent<ArticleCollection>(
      GET_ARTICLE_BY_SLUG_QUERY,
      {
        slug,
        preview: false,
      }
    );

    if (!response?.articleCollection?.items?.length) {
      console.warn(`Article with slug "${slug}" not found`);
      return undefined;
    }

    return reshapeToArticle(response.articleCollection.items[0]);
  } catch (error) {
    console.error(`Error fetching article with slug "${slug}":`, error);
    return undefined;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetchContent<CategoryCollection>(
      GET_CATEGORIES_QUERY,
      {
        preview: false,
      }
    );

    if (!response?.categoryCollection?.items) {
      console.warn("No categories found in Contentful response");
      return [];
    }

    const categories = response.categoryCollection.items.map(reshapeToCategory);

    return categories.map((cat) => cat.title).sort();
  } catch (error) {
    console.error("Error fetching categories from Contentful:", error);
    return [];
  }
}
