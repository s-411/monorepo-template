# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a fullstack TypeScript monorepo featuring a note-taking app with AI summarization capabilities. It demonstrates shared backend logic between web and native platforms using:

- **Turborepo**: Monorepo orchestration with workspace management
- **Vite + React**: Fast web application with modern tooling
- **Expo (React Native)**: Native mobile app with New Architecture
- **Convex**: Backend platform serving both web and native with realtime database
- **Clerk**: Authentication provider (requires Google and Apple social connections)
- **OpenAI**: Optional AI text summarization

## Monorepo Structure

```
apps/
  web/           - Vite + React + TypeScript web application
  native/        - React Native Expo mobile app
packages/
  backend/       - Convex backend (shared by both apps)
    convex/      - Server functions, schema, and auth config
```

## Development Commands

### Initial Setup

1. **Install dependencies**: `npm install` from the root

2. **Setup Convex backend**:
   ```bash
   npm run setup --workspace packages/backend
   ```
   This logs into Convex, creates a project, and waits for environment variables to be configured in the Convex dashboard.

3. **Configure Clerk authentication**:
   - Follow https://docs.convex.dev/auth/clerk
   - Add `CLERK_ISSUER_URL` from Clerk JWT template to Convex environment variables
   - Enable Google and Apple social connection providers (required for React Native)

4. **Configure app environment variables**:
   - Create `apps/web/.env.local` from `apps/web/.env.example`
   - Create `apps/native/.env.local` from `apps/native/.example.env`
   - Use `CONVEX_URL` from `packages/backend/.env.local`
   - Get Clerk keys from Clerk dashboard

5. **Optional**: Add `OPENAI_API_KEY` to Convex environment variables for AI summaries

### Running the Apps

- **All apps in parallel**: `npm run dev` (uses TUI for separate logs per app)
  - Remove `"ui": "tui"` from `turbo.json` to see all logs together
- **Web only**: `cd apps/web && npm run dev` (runs on http://localhost:5173)
- **Native only**: `cd apps/native && npm run dev`
- **Backend only**: `cd packages/backend && npm run dev`

### Native-Specific Commands

From `apps/native/`:
- **Start Expo**: `npm run dev` or `npm start`
- **Run on Android**: `npm run android`
- **Run on iOS**: `npm run ios`

### Build & Lint

- **Build all**: `npm run build`
- **Build specific app**: `turbo run build --filter=web-app` or `--filter=native-app`
- **Lint web**: `cd apps/web && npm run lint`
- **Format all**: `npm run format`
- **Clean all**: `npm run clean`

## Architecture & Key Concepts

### Shared Backend Pattern

The Convex backend (`packages/backend`) is imported as a workspace dependency (`@packages/backend`) in both apps. This enables:

- **End-to-end type safety**: Schema definitions in `convex/schema.ts` generate TypeScript types used by both frontends
- **Shared API**: Same queries/mutations serve web and native apps
- **Realtime by default**: Convex queries automatically subscribe to data changes

### Convex Backend Structure

Located in `packages/backend/convex/`:

- **schema.ts**: Database schema definitions (e.g., `notes` table with `userId`, `title`, `content`, `summary`)
- **notes.ts**: Query and mutation functions for CRUD operations on notes
- **openai.ts**: Action function for AI summarization using OpenAI API
- **auth.config.js**: Clerk authentication configuration
- **utils.ts**: Shared utility functions
- **_generated/**: Auto-generated types and API definitions (do not edit)

### Authentication Flow

- Clerk handles user authentication on both platforms
- `getUserId()` utility in `convex/notes.ts` extracts user identity from context
- Server functions access `ctx.auth.getUserIdentity()` to get authenticated user
- All note queries are automatically filtered by `userId`

### Async Background Jobs

The `createNote` mutation demonstrates scheduling background work:
```typescript
await ctx.scheduler.runAfter(0, internal.openai.summary, { id, title, content });
```
This triggers the OpenAI summarization action asynchronously without blocking the mutation.

### Frontend Structure

**Web App** (`apps/web/src/`):
- `pages/`: React Router pages
  - `Home.tsx`: Marketing/landing page
  - `Dashboard.tsx`: Notes dashboard with Convex queries
  - `NoteDetail.tsx`: Individual note view
- `components/`: Shared React components
  - `Header.tsx`: Navigation with Clerk authentication
  - `ProtectedRoute.tsx`: Client-side route guard
- `App.tsx`: React Router setup
- `main.tsx`: Entry point with ClerkProvider and ConvexProviderWithClerk

**Native App** (`apps/native/src/`):
- `navigation/Navigation.tsx`: React Navigation setup
- `screens/`: Screen components
  - `LoginScreen.tsx`: Clerk OAuth login
  - `NotesDashboardScreen.tsx`: Notes list
  - `CreateNoteScreen.tsx`: Note creation
  - `InsideNoteScreen.tsx`: Note detail view

## Deployment

To deploy the web app as a static site with Convex backend:

```bash
cd packages/backend && npx convex deploy --cmd 'cd ../../apps/web && npm run build' --cmd-url-env-var-name VITE_PUBLIC_CONVEX_URL
```

This command:
1. Deploys Convex backend to production
2. Runs the Vite build with the production Convex URL injected
3. Deploy the `apps/web/dist/` directory to any static hosting (Vercel, Netlify, Cloudflare Pages, etc.)

## Adding Dependencies

Navigate to the specific workspace directory before adding packages:

```bash
cd packages/backend && npm install mypackage@latest
cd apps/web && npm install mypackage@latest
cd apps/native && npm install mypackage@latest
```

## Environment Variables

**Convex** (`packages/backend`):
- `CLERK_ISSUER_URL`: Required - Clerk JWT issuer URL
- `OPENAI_API_KEY`: Optional - Enables AI summarization

**Web** (`apps/web/.env.local`):
- `VITE_CLERK_PUBLISHABLE_KEY`: Clerk public key (note VITE_ prefix)
- `VITE_PUBLIC_CONVEX_URL`: Convex deployment URL (note VITE_ prefix)

**Native** (`apps/native/.env.local`):
- `EXPO_PUBLIC_CONVEX_URL`: Convex deployment URL
- `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk public key

**Important**: Vite requires the `VITE_` prefix for environment variables to be exposed to the client. This is different from Next.js which used `NEXT_PUBLIC_`.

## Key Technologies

- **Node.js**: >=18.8.0 required
- **Package Manager**: npm (with workspaces)
- **React**: Version 19 with concurrent features
- **TypeScript**: ~5.9.3
- **Vite**: v7 - Fast build tool and dev server
- **React Router**: v6 - Client-side routing
- **Tailwind CSS**: v3 with utility-first styling
- **Convex**: Realtime database with TypeScript server functions
- **Clerk**: Modern authentication with social logins

## Migration Notes

This monorepo was migrated from Next.js 15 to Vite + React:

### Key Differences:
1. **Build Tool**: Vite instead of Next.js (much faster dev server)
2. **Routing**: React Router instead of Next.js App Router
3. **Environment Variables**: `VITE_*` prefix instead of `NEXT_PUBLIC_*`
4. **Authentication**: Client-side route guards instead of Next.js middleware
5. **No SSR**: Fully client-side rendered (CSR) application
6. **Build Output**: `dist/` directory instead of `.next/`

### Benefits:
- Faster development server and HMR
- Simpler deployment (static files)
- More explicit about what's client-side
- Better alignment with React Native app (both are fully client-side)
