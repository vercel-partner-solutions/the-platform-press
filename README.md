[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel-partner-solutions%2Fthe-platform-press&env=DRAFT_MODE_SECRET,REVALIDATE_SECRET&project-name=the-platform-press&repository-name=the-platform-press&demo-title=The%20Platform%20Press&demo-description=A%20high%20performance%20content-driven%20Next.js%20application&demo-url=https%3A%2F%2Fthe-platform-press.vercel.app)

# The Platform Press

A high-performance, server-rendered Next.js 16 App Router news application using React Server Components, Server Actions, Cache Components and Suspense. This composable, content-driven application features flexible revalidation strategies handled at the component level via `use cache`, `cacheTag` and `revalidateTag`.

## Architecture

This template demonstrates modern Next.js patterns for building scalable content-driven websites:

- **React Server Components** for optimal performance and SEO
- **Server Actions** for seamless server-side operations
- **Suspense boundaries** for progressive loading states
- **Cache Components** with granular revalidation via cache tags
- **Tailwind CSS** with a custom design system and shadcn/ui components

## CMS Integration

This template is designed to be CMS-agnostic, making it simple to integrate with your preferred content management system. The entire CMS integration is consolidated in the `lib/cms` directory, allowing the rest of the application to remain independent of the specific CMS implementation.

### Contentful Example Available

This repository contains a [Contentful](https://github.com/vercel-partner-solutions/the-platform-press/tree/contentful) example on the `contentful` branch that demonstrates a complete CMS integration with:

- Full content type mapping for articles, authors, and categories
- Draft mode support for content preview
- Live preview capabilities
- Automatic cache revalidation on content updates

The Contentful branch shows how to implement a production-ready CMS integration while keeping the implementation details isolated to the `lib/cms` module.

### Integration Approach

The CMS abstraction layer in `lib/cms` provides a clean interface for content operations such as:

```typescript
// Core content operations
getArticles();
getArticleBySlug();
getCategories();
getAuthorById();
// ... and more
```

To integrate your own CMS, simply replace the implementation in `lib/cms` while maintaining the same interface.

## Features

- **Dynamic article pages** with markdown/HTML content support
- **Category pages** with search and filtering
- **Homepage sections** including hero, breaking news, and featured content
- **Internationalization** support with locale routing
- **Responsive design** optimized for all devices
- **SEO optimized** with proper meta tags and structured data
- **Subscribe** overlay for viewing full article details
- **Continue reading** personalized content for subscribed users
- **Dynamic elements** like weather showcasing dynamic content with static performance

## Getting Started

### Prerequisites

- Node.js 18 or later
- pnpm package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/vercel-partner-solutions/the-platform-press.git
cd the-platform-press
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.local
```

4. Run the development server:

```bash
pnpm dev
```

Your app should now be running on [http://localhost:3000](http://localhost:3000).

## Development Commands

- `pnpm dev` - Start the development server with Turbopack
- `pnpm build` - Build for production with Turbopack
- `pnpm start` - Start the production server

## Environment Variables

Key environment variables for configuration:

- `DRAFT_MODE_SECRET` - Secret token for draft mode authentication
- `REVALIDATE_SECRET` - Secret token for on-demand revalidation
- `ENABLE_DRAFT_MODE_DEV` - Uncomment to enable draft mode API in development (optional)
