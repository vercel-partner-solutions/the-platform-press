# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - Start Next.js development server
- **Build**: `npm run build` - Build for production 
- **Lint**: `npm run lint` - Run ESLint (note: currently ignores build errors)
- **Start production**: `npm run start` - Start production server

## Project Architecture

This is a **Next.js 15** news website called "The Platform Press" built with:

- **Framework**: Next.js 15 with App Router
- **TypeScript**: Full TypeScript configuration with strict mode
- **Styling**: Tailwind CSS with custom design system and shadcn/ui components
- **UI Library**: Radix UI primitives with shadcn/ui component library
- **Package Manager**: Uses pnpm (based on pnpm-lock.yaml)

### Directory Structure

```
app/                    # Next.js App Router pages
├── (articles)/[slug]/  # Dynamic article pages
├── category/[slug]/    # Category pages with search functionality
├── globals.css         # Global styles and Tailwind imports
└── page.tsx           # Homepage

components/
├── homepage/          # Homepage-specific sections
├── layout/           # Header, footer, navigation
├── ui/              # Reusable UI components (shadcn/ui)
└── theme-provider.tsx # Dark mode support

lib/
├── cms.ts            # Content management and data fetching
├── types.ts          # TypeScript interfaces
└── utils.ts          # Utility functions (cn, etc.)
```

### Key Architectural Patterns

**Content Management**: Currently uses placeholder data in `lib/cms.ts` with functions like `getArticles()`, `getArticleBySlug()`. The code includes TODO comments indicating plans to integrate with a real CMS.

**Data Types**: Articles have properties including `id`, `slug`, `title`, `excerpt`, `content` (markdown/HTML), `category`, `author`, `datePublished`, `readingTimeMinutes`, `views`, and optional `isBreaking`/`isFeatured` flags.

**Component Organization**: 
- Homepage sections are modular (hero, breaking news, latest articles, popular articles, opinion articles, local news)
- Each section has its own component in `components/homepage/`
- Loading states are implemented with Suspense boundaries

**Styling System**: 
- Uses Tailwind with custom design tokens in `tailwind.config.ts`
- HSL color variables for theming support
- Custom font family: Poppins for headings
- Neutral color scheme as base color

**Path Aliases**: Uses `@/` for absolute imports configured in `tsconfig.json`

### Development Notes

- **Build Configuration**: TypeScript and ESLint errors are ignored during builds (`ignoreBuildErrors: true`, `ignoreDuringBuilds: true`)
- **Images**: Unoptimized images enabled for easier development
- **Theme Support**: Implements dark/light mode via `next-themes`
- **Component Library**: Uses shadcn/ui with Lucide React icons
- **CMS Integration**: Placeholder implementation ready for real CMS integration

### v0.dev Integration

This project was initially generated with v0.dev and maintains sync capabilities with the v0 platform for continued development.