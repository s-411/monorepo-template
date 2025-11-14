# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **minimal, production-ready** fullstack TypeScript monorepo template for building modern applications with shared backend logic between web and native platforms using:

- **Turborepo**: Monorepo orchestration with workspace management
- **Vite + React 19**: Fast web application with modern tooling and HMR
- **Expo (React Native)**: Native mobile app with New Architecture
- **Convex**: Backend platform serving both web and native with realtime database
- **Clerk**: Authentication provider (requires Google and Apple social connections)
- **Stripe**: Payment processing (pre-configured, optional)
- **Tailwind CSS v3**: Utility-first styling

This is a **starter template**, not a feature-complete app. It provides:
- Minimal authentication flow (login → dashboard)
- Shared backend infrastructure
- Type-safe API between frontend and backend
- Stripe payment boilerplate (ready to use by adding keys)

## Monorepo Structure

```
apps/
  web/           - Vite + React + TypeScript web application
    src/
      pages/       - React Router pages (Home, Dashboard)
      components/  - Reusable components (Header, ProtectedRoute, Stripe components)
      App.tsx      - Router configuration
      main.tsx     - Entry point with providers
  native/        - React Native Expo mobile app
    src/
      screens/     - App screens (LoginScreen, DashboardScreen)
      navigation/  - React Navigation setup
    App.tsx      - Entry point with providers
packages/
  backend/       - Convex backend (shared by both apps)
    convex/
      schema.ts        - Database schema (users, customers, subscriptions)
      example.ts       - Example queries and mutations
      stripe/          - Stripe integration (checkout, webhooks, customers)
      http.ts          - HTTP routes (webhook endpoint)
      auth.config.js   - Clerk authentication config
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
   - Create `apps/native/.env.local` from `apps/native/.env.example`
   - Use `CONVEX_URL` from `packages/backend/.env.local`
   - Get Clerk keys from Clerk dashboard

5. **Optional - Stripe Integration**:
   - See [STRIPE_SETUP.md](./STRIPE_SETUP.md) for complete guide
   - Add Stripe keys to Convex environment variables
   - Add `VITE_STRIPE_PUBLISHABLE_KEY` to `apps/web/.env.local`
   - Configure webhook endpoint

**For complete environment variable setup, see [ENV_MASTER.md](./ENV_MASTER.md)**

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

- **schema.ts**: Database schema definitions
  - `users`: Basic user information
  - `customers`: Stripe customer mapping
  - `subscriptions`: Stripe subscription data
- **example.ts**: Example queries showing Convex and Clerk integration
  - `hello`: Simple query returning a message
  - `getCurrentUser`: Authenticated query returning user info
- **stripe/**: Complete Stripe integration
  - `config.ts`: Stripe SDK initialization and price IDs
  - `checkout.ts`: Actions for creating checkout and portal sessions
  - `customers.ts`: Queries/mutations for customer management
  - `subscriptions.ts`: Queries/mutations for subscription management
  - `webhooks.ts`: HTTP action handling Stripe webhook events
- **http.ts**: HTTP router for webhook endpoints
- **auth.config.js**: Clerk authentication configuration
- **_generated/**: Auto-generated types and API definitions (do not edit)

### Authentication Flow

- Clerk handles user authentication on both platforms
- Server functions access `ctx.auth.getUserIdentity()` to get authenticated user
- Web app uses `ProtectedRoute` component for route guards
- Native app navigates to `DashboardScreen` after successful OAuth

### Stripe Integration

The template includes production-ready Stripe integration:

1. **Checkout Flow**:
   - User clicks `CheckoutButton` component
   - Convex action creates Stripe Checkout Session
   - User completes payment on Stripe-hosted page
   - Webhook processes `checkout.session.completed` event
   - Customer and subscription records created in Convex

2. **Subscription Management**:
   - `PortalButton` opens Stripe Customer Portal
   - Users can update payment methods, cancel subscriptions
   - Webhooks sync all changes back to Convex

3. **Webhook Events Handled**:
   - `checkout.session.completed`: Create customer and subscription
   - `customer.subscription.updated`: Update subscription status
   - `customer.subscription.deleted`: Handle cancellations
   - `invoice.payment_succeeded`/`failed`: Track payment status

### Frontend Structure

**Web App** (`apps/web/src/`):
- `pages/`: React Router pages
  - `Home.tsx`: Minimal landing page with sign-in buttons
  - `Dashboard.tsx`: Simple dashboard showing Clerk + Convex integration
- `components/`: Shared React components
  - `Header.tsx`: Navigation with Clerk UserButton
  - `ProtectedRoute.tsx`: Client-side route guard for authenticated routes
  - `stripe/`: Stripe payment components (CheckoutButton, PortalButton, SubscriptionStatus)
- `App.tsx`: React Router setup with routes
- `main.tsx`: Entry point with ClerkProvider and ConvexProviderWithClerk

**Native App** (`apps/native/src/`):
- `navigation/Navigation.tsx`: React Navigation setup (LoginScreen, DashboardScreen)
- `screens/`: Screen components
  - `LoginScreen.tsx`: Clerk OAuth login with Google and Apple
  - `DashboardScreen.tsx`: Simple dashboard matching web app structure

## Deployment

### Web App (Static Hosting)

To deploy the web app as a static site with Convex backend:

```bash
cd packages/backend && npx convex deploy --cmd 'cd ../../apps/web && npm run build' --cmd-url-env-var-name VITE_PUBLIC_CONVEX_URL
```

This command:
1. Deploys Convex backend to production
2. Runs the Vite build with the production Convex URL injected
3. Outputs static files to `apps/web/dist/`
4. Deploy the `dist/` directory to any static hosting (Vercel, Netlify, Cloudflare Pages, etc.)

### Native App

Follow [Expo's deployment guide](https://docs.expo.dev/distribution/introduction/) for publishing to:
- Apple App Store (iOS)
- Google Play Store (Android)
- Expo Go development builds

## Adding Dependencies

Navigate to the specific workspace directory before adding packages:

```bash
cd packages/backend && npm install mypackage@latest
cd apps/web && npm install mypackage@latest
cd apps/native && npm install mypackage@latest
```

## Environment Variables

See [ENV_MASTER.md](./ENV_MASTER.md) for the complete guide with all variables in one place.

### Quick Reference

**Convex** (`packages/backend` - added via Convex Dashboard):
- `CLERK_ISSUER_URL`: Required - Clerk JWT issuer URL
- `STRIPE_SECRET_KEY`: Optional - Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Optional - Stripe webhook secret
- `STRIPE_PRICE_ID_PRO_MONTHLY`: Optional - Stripe price ID
- `STRIPE_PRICE_ID_PRO_YEARLY`: Optional - Stripe price ID
- `SITE_URL`: Optional - Your app URL (for Stripe redirects), defaults to http://localhost:5173
- `OPENAI_API_KEY`: Optional - Enables AI features

**Web** (`apps/web/.env.local`):
- `VITE_CLERK_PUBLISHABLE_KEY`: Clerk public key (note VITE_ prefix)
- `VITE_PUBLIC_CONVEX_URL`: Convex deployment URL (note VITE_ prefix)
- `VITE_STRIPE_PUBLISHABLE_KEY`: Optional - Stripe public key

**Native** (`apps/native/.env.local`):
- `EXPO_PUBLIC_CONVEX_URL`: Convex deployment URL
- `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk public key

**Important**:
- Vite requires the `VITE_` prefix for environment variables to be exposed to the client
- Expo requires the `EXPO_PUBLIC_` prefix
- This is different from Next.js which used `NEXT_PUBLIC_`

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
- **Stripe**: v17 - Payment processing

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
- Faster development server and HMR (Hot Module Replacement)
- Simpler deployment (static files)
- More explicit about what's client-side
- Better alignment with React Native app (both are fully client-side)
- Smaller bundle size and faster cold starts

## Template Philosophy

This is a **minimal starter template**, not a feature-complete application. The goal is to provide:

1. **Working infrastructure**: Auth, backend, and payment systems connected and functional
2. **Type safety**: End-to-end TypeScript types from database to UI
3. **Clone-and-go**: Add environment variables and start building immediately
4. **Production-ready patterns**: Webhook handling, error boundaries, proper env validation

**What's included**:
- ✅ Authentication (Clerk with Google/Apple OAuth)
- ✅ Backend (Convex with realtime database)
- ✅ Payment processing (Stripe with webhooks)
- ✅ Minimal UI (landing page, dashboard)
- ✅ Type safety (schema → API → frontend)

**What's NOT included** (intentionally):
- ❌ Complex UI designs or themes
- ❌ Feature-complete applications
- ❌ Opinionated component libraries
- ❌ Marketing pages or content

**Your job**: Build your actual application on top of this foundation.

## Common Tasks

### Adding a new database table

1. Edit `packages/backend/convex/schema.ts`
2. Define your table with validators
3. Create a new file in `packages/backend/convex/` for queries/mutations
4. Import and use `api.yourfile.yourfunction` in frontend

### Adding a new page (web)

1. Create file in `apps/web/src/pages/YourPage.tsx`
2. Add route in `apps/web/src/App.tsx`
3. Add navigation link in `apps/web/src/components/Header.tsx`

### Adding a new screen (native)

1. Create file in `apps/native/src/screens/YourScreen.tsx`
2. Add screen in `apps/native/src/navigation/Navigation.tsx`
3. Navigate using `navigation.navigate('YourScreen')`

### Using Stripe payments

1. Complete setup in [STRIPE_SETUP.md](./STRIPE_SETUP.md)
2. Import `CheckoutButton` component
3. Pass price key: `<CheckoutButton priceKey="PRO_MONTHLY" />`
4. Webhooks automatically sync subscription to database
5. Use `useQuery(api.stripe.subscriptions.getCurrentUserSubscription)` to check status

## Troubleshooting

### "Invalid hook call" error (CRITICAL)

**Problem**: App crashes immediately with error:
```
Invalid hook call. Hooks can only be called inside of the body of a function component.
This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
```

**Root Cause**: Multiple versions of React are installed (19.1.0 and 19.2.0) due to npm's dependency resolution. Dependencies like `@clerk/clerk-react`, `@radix-ui/*`, and `react-router-dom` may resolve to different React versions.

**Solution**: Add npm overrides to the root `package.json`:
```json
{
  "name": "convex-monorepo",
  "overrides": {
    "react": "19.2.0",
    "react-dom": "19.2.0"
  }
}
```

Then reinstall dependencies:
```bash
rm -rf node_modules package-lock.json apps/*/node_modules apps/*/package-lock.json packages/*/node_modules packages/*/package-lock.json
npm install
```

**Verify the fix**: Run `npm ls react` - you should see only one version (19.2.0) throughout the tree.

### Convex deployment fails with "Neither apiKey nor config.authenticator provided"

**Problem**: Backend deployment fails with:
```
Failed to analyze http.js: Uncaught Error: Neither apiKey nor config.authenticator provided
at new Stripe (../../../../node_modules/stripe/esm/stripe.core.js:109:4)
```

**Root Cause**: The Stripe client in `packages/backend/convex/stripe/config.ts` was initialized immediately when the module loaded, but `STRIPE_SECRET_KEY` doesn't exist during initial setup.

**Solution**: This has been fixed in the template with lazy initialization. The Stripe client is now created only when actually needed:

```typescript
// ✅ Lazy initialization (current template)
let _stripe: Stripe | null = null;
export const stripe = (): Stripe => {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error(
        missingEnvVariableUrl(
          "STRIPE_SECRET_KEY",
          "https://dashboard.stripe.com/apikeys"
        )
      );
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia",
    });
  }
  return _stripe;
};
```

All Stripe usages call `stripe()` as a function: `stripe().customers.create()` instead of `stripe.customers.create()`.

**Why this matters**: Stripe is optional in the template and shouldn't block initial deployment. You only need Stripe keys when actually using payment features.

### React Router v7 warnings

**Problem**: Console warnings about upcoming React Router changes:
```
⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7
⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7
```

**Solution**: Add future flags to `BrowserRouter` in `apps/web/src/App.tsx`:
```typescript
<BrowserRouter
  future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}
>
  {/* routes */}
</BrowserRouter>
```

### Stripe API version TypeScript error

**Problem**: TypeScript error when building:
```
Type '"2024-11-20.acacia"' is not assignable to type '"2025-02-24.acacia"'
```

**Solution**: The template now uses the latest Stripe API version (`2025-02-24.acacia`) in `packages/backend/convex/stripe/config.ts`. Ensure your Stripe package is up to date:
```bash
cd packages/backend && npm install stripe@latest
```

### Build errors in backend package

If you see TypeScript errors when building, the build script uses `vite build` (not `tsc`) to avoid strict type checking during development.

### Environment variables not working

- **Web**: Restart Vite dev server, ensure `VITE_` prefix
- **Native**: Restart Expo completely (`npm run dev` again), ensure `EXPO_PUBLIC_` prefix
- **Backend**: Add to Convex dashboard, not `.env` files

### Clerk authentication fails

- Ensure Google and Apple are enabled in Clerk → Social Connections
- Verify `CLERK_ISSUER_URL` in Convex matches Clerk JWT template
- Check that publishable key is correct in app `.env.local`

### Stripe webhook fails

- Verify webhook secret in Convex environment variables
- Ensure webhook endpoint URL is correct: `https://your-deployment.convex.cloud/stripe/webhook`
- Check Stripe dashboard → Webhooks for delivery attempts and errors

### General debugging steps

If you encounter issues after cloning:

1. **Clean install**:
   ```bash
   rm -rf node_modules package-lock.json apps/*/node_modules apps/*/package-lock.json packages/*/node_modules packages/*/package-lock.json
   npm install
   ```

2. **Verify React version**:
   ```bash
   npm ls react
   # Should show only 19.2.0 throughout the tree
   ```

3. **Check environment files exist**:
   ```bash
   ls apps/web/.env.local
   ls apps/native/.env.local
   ls packages/backend/.env.local
   ```

4. **Verify Convex deployment**:
   ```bash
   cd packages/backend && npx convex dev
   # Should connect without errors
   ```

## Additional Resources

- [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) - Comprehensive troubleshooting guide with setup fixes
- [ENV_MASTER.md](./ENV_MASTER.md) - Complete environment variable guide
- [STRIPE_SETUP.md](./STRIPE_SETUP.md) - Stripe integration guide
- [Convex Documentation](https://docs.convex.dev/)
- [Clerk Documentation](https://clerk.com/docs)
- [Vite Documentation](https://vite.dev/)
