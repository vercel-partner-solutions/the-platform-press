import type { Article, Category } from "../types";
import type { Document } from "@contentful/rich-text-types";

// Special category ID for "ALL" category - shows all articles when selected
const ALL_CATEGORY_ID = "6135cHC0KiZsW2dMOEuMHL";

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
  isFeatured?: boolean;
  metaDescription?: string;
  metaKeywords?: string;
  author: ContentfulAuthor;
  category: ContentfulCategory;
  views?: number;
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

const GET_ARTICLES_QUERY = `
  query GetArticles($limit: Int, $skip: Int, $where: ArticleFilter, $preview: Boolean, $order: [ArticleOrder]) {
    articleCollection(limit: $limit, skip: $skip, where: $where, preview: $preview, order: $order) {
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
        isFeatured
        metaDescription
        metaKeywords
        views
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
        isFeatured
        metaDescription
        metaKeywords
        views
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

const GET_CATEGORY_BY_SLUG_QUERY = `
  query GetCategoryBySlug($slug: String!, $preview: Boolean) {
    categoryCollection(where: { slug: $slug }, limit: 1, preview: $preview) {
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

const GET_CATEGORY_BY_ID_QUERY = `
  query GetCategoryById($id: String!, $preview: Boolean) {
    categoryCollection(where: { sys: { id: $id } }, limit: 1, preview: $preview) {
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
    const errorText = await response.text();
    console.error(
      `HTTP error! status: ${response.status}, response:`,
      errorText
    );
    throw new Error(
      `HTTP error! status: ${response.status}, response: ${errorText}`
    );
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

function reshapeToArticle(item: ContentfulArticle): Article {
  // Merge rich text links but keep as Document for React component rendering
  const richTextDocument = mergeRichTextLinks(item.content);

  return {
    id: item.sys.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    content: richTextDocument,
    imageUrl:
      item.featuredImage?.url || "/placeholder.svg?width=800&height=450",
    categoryId: item.category?.sys?.id || "",
    category: item.category?.title || "Uncategorized",
    author: item.author?.name || "Unknown Author",
    datePublished:
      item.publishDate || item.sys.firstPublishedAt || new Date().toISOString(),
    readingTime: item.readingTime || 5,
    isBreaking: item.isBreakingNews || false,
    isFeatured: item.isFeatured || false,
    views: item.views || 0,
  };
}

function reshapeToCategory(item: ContentfulCategory): Category {
  return {
    id: item.sys.id,
    slug: item.slug,
    title: item.title,
  };
}

export const homepageConfig = {
  sections: {
    authoredSection: {
      categoryId: "3LcBoYnuugO6HO4uQBMVlp",
      sectionTitle: "Customer Stories",
    },
    firstCategorySection: {
      categoryId: "6z4OY83zIVZCVuB7WEM4Ru",
      sectionTitle: "Company News",
    },
    secondCategorySection: {
      categoryId: "2iVXH95RmH4IzVHncEeN7M",
      sectionTitle: "Changelog",
    },
    continueReadingFallback: {
      categoryId: "6i75OQ1y6V1Ym4cOKf5dp5",
      sectionTitle: "Community",
    },
  },
};

export async function getArticles({
  limit,
  skip,
  categoryId,
  sortBy,
  excludeIds,
  isFeatured,
  isBreaking,
  excludeFeatured,
  searchQuery,
}: {
  limit?: number;
  skip?: number;
  categoryId?: string;
  sortBy?: "datePublished" | "views";
  excludeIds?: string[];
  isFeatured?: boolean;
  isBreaking?: boolean;
  excludeFeatured?: boolean;
  searchQuery?: string;
} = {}): Promise<Article[]> {
  try {
    const where: any = {};

    if (isFeatured !== undefined) {
      where.isFeatured = isFeatured;
    }

    if (isBreaking !== undefined) {
      where.isBreakingNews = isBreaking;
    }

    // Skip filtering if category is the "all" category (shows all articles)
    if (categoryId && categoryId !== ALL_CATEGORY_ID) {
      where.category = { sys: { id: categoryId } };
    }

    if (excludeIds && excludeIds.length > 0) {
      where.sys = { id_not_in: excludeIds };
    }

    if (excludeFeatured) {
      where.isFeatured_not = true;
    }

    if (searchQuery) {
      where.OR = [
        { title_contains: searchQuery },
        { excerpt_contains: searchQuery },
      ];
    }

    // Determine sort order
    const order = sortBy === "views" ? ["views_DESC"] : ["publishDate_DESC"];

    const response = await fetchContent<ArticleCollection>(GET_ARTICLES_QUERY, {
      limit: limit || 10,
      skip: skip || 0,
      where: Object.keys(where).length > 0 ? where : undefined,
      order,
      preview: false,
    });

    if (!response?.articleCollection?.items) {
      console.warn("No articles found in Contentful response");
      return [];
    }

    let articles = response.articleCollection.items.map(reshapeToArticle);

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

export async function getCategories(): Promise<Category[]> {
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

    return categories.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error("Error fetching categories from Contentful:", error);
    return [];
  }
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  try {
    const response = await fetchContent<CategoryCollection>(
      GET_CATEGORY_BY_SLUG_QUERY,
      {
        slug,
        preview: false,
      }
    );

    if (!response?.categoryCollection?.items?.length) {
      console.warn(`Category with slug "${slug}" not found`);
      return undefined;
    }

    return reshapeToCategory(response.categoryCollection.items[0]);
  } catch (error) {
    console.error(`Error fetching category with slug "${slug}":`, error);
    return undefined;
  }
}

export async function getCategoryById(
  id: string
): Promise<Category | undefined> {
  try {
    const response = await fetchContent<CategoryCollection>(
      GET_CATEGORY_BY_ID_QUERY,
      {
        id,
        preview: false,
      }
    );

    if (!response?.categoryCollection?.items?.length) {
      console.warn(`Category with id "${id}" not found`);
      return undefined;
    }

    return reshapeToCategory(response.categoryCollection.items[0]);
  } catch (error) {
    console.error(`Error fetching category with id "${id}":`, error);
    return undefined;
  }
}
