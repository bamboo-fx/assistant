# LockIn - Personal Accountability & AI Coach Platform

## Project Overview
A full-stack personal accountability app with domain-specific AI agents (gym, business, reading, self-improvement) that maintain persistent memory, enable conversational journaling, and synthesize insights.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Database:** MongoDB (via Mongoose)
- **Auth:** NextAuth.js
- **AI:** Claude API (Anthropic SDK)
- **UI:** Tailwind CSS + shadcn/ui
- **Language:** TypeScript

## Architecture
- `/src/app` - Next.js App Router pages and API routes
- `/src/components` - React components
- `/src/lib` - Utilities, DB connection, AI helpers
- `/src/models` - Mongoose schemas
- `/src/types` - TypeScript types

## Data Model
- **User** - auth, profile, preferences
- **Domain** - categories (gym, business, reading, self-improvement)
- **Entry** - timestamped journal messages per domain
- **Conversation** - chat threads with the AI agent per domain
- **Insight** - AI-generated summaries and patterns

## Key Patterns
- Each domain has its own AI agent with injected context from past entries
- Entries are stored with domain, timestamp, content, and optional structured metadata
- AI context window: retrieve recent entries + semantically relevant history
- Insights generated on-demand or via scheduled summaries

## Commands
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run lint` - Run ESLint
