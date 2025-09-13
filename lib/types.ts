export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or HTML string
  imageUrl: string;
  category: string;
  author: string;
  datePublished: string; // ISO 8601 format
  readingTime: number;
  isBreaking?: boolean;
  isFeatured?: boolean;
  views?: number; // For "popular" section simulation
  location?: string; // For local news articles
}

export interface Category {
  slug: string;
  title: string;
}

export interface Author {
  slug: string;
  name: string;
  title: string;
}

export interface CMSData {
  articles: Article[];
}
