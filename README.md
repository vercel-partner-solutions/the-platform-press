[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel-partner-solutions%2Fthe-platform-press%2Ftree%2Fcontentful&env=CONTENTFUL_SPACE_ID,CONTENTFUL_ACCESS_TOKEN,CONTENTFUL_PREVIEW_ACCESS_TOKEN,DRAFT_MODE_SECRET_TOKEN,REVALIDATE_SECRET,CONTENTFUL_CMA_TOKEN,ENABLE_DRAFT_MODE_DEV&project-name=the-platform-press&repository-name=the-platform-press&demo-title=The%20Platform%20Press&demo-description=A%20high%20performance%20content-driven%20Next.js%20application&demo-url=https%3A%2F%2Fthe-platform-press.vercel.app)

# The Platform Press

A high-performance, server-rendered Next.js 16 App Router news application with Contentful. Built with React Server Components, Server Actions, Cache Components and Suspense. This content-driven application features revalidation strategies handled at the component level with `use cache`, `cacheTag` and `revalidateTag`.

> This is the Contentful-integrated version of The Platform Press. For the CMS-agnostic template, see the [main](https://github.com/vercel-partner-solutions/the-platform-press/tree/main) branch.

## Architecture

This implementation demonstrates modern Next.js patterns with Contentful:

- **React Server Components** for optimal performance and SEO
- **Server Actions** for seamless server-side operations
- **Suspense boundaries** for progressive loading states
- **Cache Components** with granular revalidation via cache tags
- **Tailwind CSS** with a custom design system and shadcn/ui components

## Content Model

- **Article** - Articles with rich text content, featured images, and metadata
- **Category** - Content categorization for navigation and filtering
- **Author** - Author profiles

## Features

- **Dynamic article pages** with rich text content and embedded media
- **Category pages** with search and filtering
- **Homepage sections** including hero, breaking news, and featured content
- **Content preview** for reviewing draft content before publishing
- **Internationalization** support with locale routing
- **SEO optimized** with fast performance and structured metadata
- **Webhook revalidation** to update page content on publish

## Development Commands

- `pnpm dev` - Start the development server
- `pnpm build` - Build for production
- `pnpm start` - Start the production server

## Project Structure

```
app/                  # Next.js App Router pages
├── [locale]/         # Internationalized routes
│   ├── articles/     # Article pages with preview support
│   ├── category/     # Category pages
│   └── layout.tsx    # Root layout
├── api/              # API routes
│   ├── draft/        # Draft mode endpoint
│   └── revalidate/   # Webhook revalidation endpoint
└── globals.css       # Global styles

components/
├── homepage/         # Homepage sections
├── layout/           # Header, footer, navigation
└── ui/               # Reusable UI components

lib/
├── cms/              # Contentful integration
│   ├── index.ts      # GraphQL client and data fetching
│   ├── rich-text-renderer.tsx  # Rich text components
│   ├── article-content.tsx     # Article rendering
|   └── contentful-live-preview-provider.tsx  # Live preview support
├── types.ts          # TypeScript interfaces
└── utils.ts          # Utility functions

scripts/
└── fetch-contentful-schema.ts  # Schema retrieval for AI development

dictionaries/         # i18n translations
hooks/                # Custom React hooks
schema.json           # Auto-generated Contentful schema
```

## Getting Started

### Installation

- Clone the repository and switch to the Contentful branch:

```bash
git clone https://github.com/vercel-partner-solutions/the-platform-press.git
cd the-platform-press
git checkout contentful
```

- Install dependencies:

```bash
pnpm install
```

- Follow the Contentful Setup section below to configure your CMS, set your environment variables, and then run:

```bash
pnpm dev
```

Your app should now be running on [http://localhost:3000](http://localhost:3000).

## Contentful Setup

The following is required to configure Contentful with this repository:

- A [Contentful](https://www.contentful.com) account
- An empty Contentful space
- The [Contentful CLI](https://www.contentful.com/developers/docs/tutorials/cli/) is installed

### Import Content with the Contentful CLI

This repository includes a Contentful space export with content model and sample content. Follow these steps to import it:

```bash
# Install the Contentful CLI (if not already installed):
npm install -g contentful-cli
# Login to Contentful:
contentful login
# Select your space:
contentful space use
# Import the content model and sample data:
contentful space import --content-file ./scripts/initial-content.json
```

This import includes:

- Complete content model: article, author, and category content types with all fields configured
- Sample content: example articles, authors, and categories to get started

> Run this import only on an empty space. Importing into a space with existing content may cause conflicts.

### Environment Variables

After importing the content, configure these environment variables:

```bash
CONTENTFUL_SPACE_ID="your-space-id"
CONTENTFUL_ACCESS_TOKEN="your-content-delivery-api-token"
CONTENTFUL_PREVIEW_ACCESS_TOKEN="your-preview-api-token"
DRAFT_MODE_SECRET_TOKEN="your-draft-mode-secret"
REVALIDATE_SECRET="your-revalidation-secret"
# Optional: For schema fetching
CONTENTFUL_CMA_TOKEN="your-management-api-token"
# Optional: Enable draft mode in development
ENABLE_DRAFT_MODE_DEV=true
```

Refer to the Contentful [API reference](https://www.contentful.com/developers/docs/references/) to retrieve your access tokens.

### Webhook Configuration

To enable on-demand revalidation when content changes in Contentful:

- In your Contentful space, go to Settings → Webhooks
- Create a new webhook with:
  - URL: `https://your-domain.vercel.app/api/revalidate?secret=your-revalidate-secret`
  - Events: Select article and category content types
- Save the webhook

### Preview Configuration

This application supports [Contentful Live preview](https://www.contentful.com/developers/docs/tutorials/preview/live-preview/) for viewing unpublished content via [Next.js Draft Mode](https://nextjs.org/docs/app/guides/draft-mode).

To configure live preview in your Contentful space:

- Go to Settings → Content preview
- Add a new preview platform with:
  - Name: "Next.js Preview"
  - Description: "Preview draft article content"
  - Preview URL:
    ```
    https://your-domain.vercel.app/api/draft?secret={secret}&slug={entry.fields.slug}
    ```
  - Replace `{secret}` with your actual `DRAFT_MODE_SECRET_TOKEN`
  - The `{entry.fields.slug}` and `{locale}` placeholders will be automatically populated by Contentful
- Select the article content type to have preview enabled
- Save the configuration

### `schema.json`

This project includes a schema fetching script that keeps AI development tools (like Claude Code, v0.app, Cursor, or GitHub Copilot) aware of your Contentful content structure:

```bash
npm run fetch-schema
```

This command:

- Connects to your Contentful space using the Contentful Management API
- Fetches all content type definitions
- Saves them to `schema.json` for AI development tool awareness
- Should be run whenever you update content types in Contentful
