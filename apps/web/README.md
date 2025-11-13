# Web App - Minimal Vite + React + TypeScript Starter

A clean, minimal starter template with authentication (Clerk) and real-time backend (Convex) already configured.

## What's Included

✅ **Vite** - Lightning-fast dev server
✅ **React 19** - Latest React with hooks
✅ **TypeScript** - Full type safety
✅ **Clerk** - Authentication already working
✅ **Convex** - Real-time backend already integrated
✅ **React Router** - Client-side routing
✅ **Tailwind CSS** - Utility-first styling (default config)
✅ **Protected Routes** - Auth guard component ready to use

## Quick Start

See [SETUP.md](../../SETUP.md) in the root for complete setup instructions.

**TL;DR:**
1. `npm install` from root
2. Set up Convex & Clerk (see SETUP.md)
3. Create `.env.local` with your keys
4. `npm run dev`

## Development

```bash
# From root (recommended - runs all apps)
npm run dev

# Or from this directory
npm run dev
```

App runs at: http://localhost:5173

## Building

```bash
npm run build  # Output: dist/
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Simple header with auth buttons
│   └── ProtectedRoute.tsx  # Auth guard for routes
├── pages/
│   ├── Home.tsx           # Landing page
│   └── Dashboard.tsx      # Protected dashboard (example)
├── App.tsx                # Router setup
├── main.tsx               # Providers (Clerk + Convex)
└── index.css              # Tailwind imports
```

## Start Building

This is a **minimal** starter - replace/extend as needed:

1. **Change branding**: Update "Your App" in Header.tsx and Home.tsx
2. **Add pages**: Create new components in `src/pages/`
3. **Add routes**: Update `src/App.tsx`
4. **Backend logic**: Add Convex functions in `packages/backend/convex/`
5. **Database schema**: Update `packages/backend/convex/schema.ts`
6. **Styling**: Extend `tailwind.config.js` with your theme

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk authentication key |
| `VITE_PUBLIC_CONVEX_URL` | Convex backend URL |

Create `.env.local` (use `.env.example` as template)

**Note**: Vite requires `VITE_` prefix for client-side variables.

## What's Different From Other Templates?

- **No opinionated design** - Just basic HTML + Tailwind
- **No example features** - Clean slate for your app
- **Minimal dependencies** - Only essentials included
- **Easy to understand** - Simple structure, clear purpose
- **Ready to build** - Auth & backend already working

## Docs

- Full monorepo docs: [CLAUDE.md](../../CLAUDE.md)
- Setup guide: [SETUP.md](../../SETUP.md)
- Convex docs: https://docs.convex.dev
- Clerk docs: https://clerk.com/docs
