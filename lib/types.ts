export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  categoryId: string;
  category?: string;
  author: string;
  datePublished: string;
  readingTime: number;
  isBreaking?: boolean;
  isFeatured?: boolean;
  views?: number;
  lastUpdated?: string;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  lastUpdated?: string;
}

export interface Author {
  slug: string;
  name: string;
  title: string;
}

export interface Stock {
  symbol: string;
  change: number;
  isPositive: boolean;
}

export interface CMSData {
  articles: Article[];
}

export interface CMSArticle extends Article {}

export interface CMSCategory {
  id: string;
  slug: string;
  title: string;
}

export interface CMSAuthor {
  slug: string;
  name: string;
  title: string;
}
