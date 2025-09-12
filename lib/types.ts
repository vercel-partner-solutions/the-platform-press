export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string // Markdown or HTML string
  imageUrl: string
  imageQuery: string // For placeholder generation
  category: string
  author: string
  datePublished: string // ISO 8601 format
  readingTimeMinutes: number
  isBreaking?: boolean
  isFeatured?: boolean
  type?: "article" | "opinion" // Default to 'article' if not specified
  views?: number // For "popular" section simulation
  location?: string // For local news articles
}

export interface CMSData {
  articles: Article[]
}
