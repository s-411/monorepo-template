# Fullstack TypeScript Monorepo Template

**Vite + React + Expo + Convex + Clerk + Stripe**

A production-ready monorepo template for building modern fullstack applications with shared backend logic between web and native platforms.

Hi

## Tech Stack

- **[Turborepo](https://turbo.build/)**: Monorepo orchestration with workspace management
- **[Vite](https://vite.dev/)**: Lightning-fast web application with modern tooling
- **[React 19](https://react.dev/)**: Latest React with concurrent features
- **[Expo](https://expo.dev/)**: Native mobile app with New Architecture
- **[Convex](https://convex.dev/)**: Realtime backend serving both web and native
- **[Clerk](https://clerk.dev/)**: Authentication with social providers
- **[Stripe](https://stripe.com/)**: Payment processing (pre-configured)
- **[Tailwind CSS v3](https://tailwindcss.com/)**: Utility-first styling

## Features

- ✅ **Shared Backend**: Single Convex backend serves both web and native apps
- ✅ **End-to-End Type Safety**: Schema definitions generate TypeScript types
- ✅ **Realtime by Default**: Automatic data synchronization
- ✅ **Authentication Ready**: Clerk integrated with Google and Apple OAuth
- ✅ **Payment Ready**: Stripe boilerplate with webhooks configured
- ✅ **Modern Tooling**: Fast development with Vite HMR
- ✅ **Monorepo Structure**: Clean separation with shared packages

## Project Structure

```
apps/
  web/           - Vite + React + TypeScript web application
  native/        - React Native Expo mobile app
packages/
  backend/       - Convex backend (shared by both apps)
    convex/      - Server functions, schema, and auth config
```

## Quick Start

### Prerequisites

- Node.js >= 18.8.0
- npm (workspaces)

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Convex Backend

```bash
npm run setup --workspace packages/backend
```

This will:
- Log you into Convex (or create account)
- Create a new Convex project
- Wait for you to configure environment variables

### 3. Configure Clerk Authentication

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Follow the [Convex + Clerk guide](https://docs.convex.dev/auth/clerk)
3. Create a JWT template named "convex" in [Clerk Dashboard](https://dashboard.clerk.com/last-active?path=jwt-templates)
4. Add `CLERK_ISSUER_URL` to [Convex environment variables](https://dashboard.convex.dev/)
5. **Important**: Enable **Google** and **Apple** as Social Connection providers in Clerk (required for React Native)

### 4. Configure App Environment Variables

**Web app** (`apps/web/.env.local`):
```bash
cp apps/web/.env.example apps/web/.env.local
```

**Native app** (`apps/native/.env.local`):
```bash
cp apps/native/.env.example apps/native/.env.local
```

Fill in:
- `CONVEX_URL` from `packages/backend/.env.local`
- `CLERK_PUBLISHABLE_KEY` from [Clerk Dashboard](https://dashboard.clerk.com/last-active?path=api-keys)

### 5. (Optional) Configure Stripe

See [STRIPE_SETUP.md](./STRIPE_SETUP.md) for complete Stripe integration guide.

Quick setup:
1. Add Stripe keys to Convex environment variables
2. Add `STRIPE_PUBLISHABLE_KEY` to web app `.env.local`
3. Configure webhook endpoint
4. Update price IDs in Convex environment variables

### 6. Run the Apps

**All apps in parallel** (with TUI for separate logs):
```bash
npm run dev
```

**Individual apps**:
```bash
# Web only (http://localhost:5173)
cd apps/web && npm run dev

# Native only
cd apps/native && npm run dev

# Backend only
cd packages/backend && npm run dev
```

Remove `"ui": "tui"` from `turbo.json` to see all logs together.

## Development Commands

### Building

```bash
# Build all
npm run build

# Build specific app
turbo run build --filter=web-app
turbo run build --filter=native-app
```

### Linting & Formatting

```bash
# Lint web app
cd apps/web && npm run lint

# Format all
npm run format

# Clean all build artifacts
npm run clean
```

### Native-Specific Commands

From `apps/native/`:
```bash
npm run dev        # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm start          # Alternative to npm run dev
```

## Architecture

### Shared Backend Pattern

The Convex backend (`packages/backend`) is imported as a workspace dependency (`@packages/backend`) in both apps, enabling:

- **Type Safety**: Schema in `convex/schema.ts` generates types for both frontends
- **Shared API**: Same queries/mutations serve web and native
- **Realtime**: Convex queries automatically subscribe to data changes

### Authentication Flow

- Clerk handles user authentication on both platforms
- Server functions access `ctx.auth.getUserIdentity()` for authenticated user
- Client-side route guards protect authenticated pages

### Stripe Integration

- **Checkout**: Convex actions create Stripe Checkout Sessions
- **Webhooks**: HTTP endpoint at `/stripe/webhook` processes events
- **Database**: Customer and subscription data synced to Convex
- **Components**: Pre-built `CheckoutButton`, `PortalButton`, and `SubscriptionStatus`

## Deployment

### Web App (Static Hosting)

```bash
cd packages/backend && npx convex deploy --cmd 'cd ../../apps/web && npm run build' --cmd-url-env-var-name VITE_PUBLIC_CONVEX_URL
```

Then deploy `apps/web/dist/` to:
- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting

### Native App

Follow [Expo deployment guide](https://docs.expo.dev/distribution/introduction/) for:
- App Store (iOS)
- Google Play (Android)
- Expo Go development builds

## Environment Variables

### Backend (`packages/backend`)

Add to [Convex Dashboard](https://dashboard.convex.dev/):

```bash
CLERK_ISSUER_URL=                    # Required - Clerk JWT issuer URL
STRIPE_SECRET_KEY=                   # Optional - Stripe secret key
STRIPE_WEBHOOK_SECRET=               # Optional - Stripe webhook secret
STRIPE_PRICE_ID_PRO_MONTHLY=         # Optional - Stripe price ID
STRIPE_PRICE_ID_PRO_YEARLY=          # Optional - Stripe price ID
SITE_URL=http://localhost:5173       # Your app URL (for Stripe redirects)
OPENAI_API_KEY=                      # Optional - For AI features
```

### Web (`apps/web/.env.local`)

**Note**: Vite requires `VITE_` prefix for client-side variables.

```bash
VITE_CLERK_PUBLISHABLE_KEY=
VITE_PUBLIC_CONVEX_URL=
VITE_STRIPE_PUBLISHABLE_KEY=  # Optional
```

### Native (`apps/native/.env.local`)

```bash
EXPO_PUBLIC_CONVEX_URL=
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=
```

## Adding Dependencies

Navigate to the specific workspace before installing:

```bash
cd packages/backend && npm install mypackage@latest
cd apps/web && npm install mypackage@latest
cd apps/native && npm install mypackage@latest
```

## Migration from Next.js

This template was migrated from Next.js 15 to Vite for:
- **Faster Dev Server**: Instant HMR with Vite
- **Simpler Deployment**: Static files instead of server infrastructure
- **Better Alignment**: Both web and native are client-side rendered
- **Explicit Architecture**: Clear about what's client vs server

### Key Differences

| Aspect | Next.js | Vite |
|--------|---------|------|
| Build Tool | Next.js | Vite |
| Routing | App Router | React Router |
| Env Vars | `NEXT_PUBLIC_*` | `VITE_*` |
| Auth Guards | Middleware | Client-side |
| Rendering | SSR/SSG/CSR | CSR only |
| Output | `.next/` | `dist/` |

## Documentation

- [CLAUDE.md](./CLAUDE.md) - Guidance for AI coding assistants
- [STRIPE_SETUP.md](./STRIPE_SETUP.md) - Complete Stripe integration guide
- Backend `.env.example` - All Convex environment variables documented

## What is Convex?

[Convex](https://convex.dev) is a hosted backend platform with a built-in reactive database. Write your [database schema](https://docs.convex.dev/database/schemas) and [server functions](https://docs.convex.dev/functions) in [TypeScript](https://docs.convex.dev/typescript). Server-side [queries](https://docs.convex.dev/functions/query-functions) automatically [cache](https://docs.convex.dev/functions/query-functions#caching--reactivity) and [subscribe](https://docs.convex.dev/client/react#reactivity) to data, powering a [realtime `useQuery` hook](https://docs.convex.dev/client/react#fetching-data).

Key features:
- **Realtime Database**: NoSQL documents with relationships and indexes
- **Type Safety**: End-to-end TypeScript
- **ACID Guarantees**: Immediate consistency, serializable isolation
- **Built-in Features**: Pagination, file storage, search, webhooks
- **Cloud-First**: Hot reloads, dashboard UI, automatic scaling
- **Free to Start**: [Generous free tier](https://www.convex.dev/plans)

## License

MIT
