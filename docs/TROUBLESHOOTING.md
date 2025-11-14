# Template Setup Issues & Fixes

## Summary

This document covers critical issues that may occur when setting up the template and their solutions. The template has been updated to fix these issues, but this guide remains useful for understanding what was fixed and why.

---

## Issue 1: React Version Conflict (CRITICAL - App Crashes)

### Problem

The template failed to run immediately after `npm install` due to a React version conflict that caused the application to crash with "Invalid hook call" errors.

**Error message**:
```
Invalid hook call. Hooks can only be called inside of the body of a function component.
This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
```

### Root Cause

When running `npm ls react`, the dependency tree showed:
- Some packages using `react@19.1.0`
- Other packages using `react@19.2.0`
- Dependencies like `@clerk/clerk-react`, `@radix-ui/*`, `react-router-dom`, etc. were resolving to different React versions

npm's dependency resolution can install multiple versions of React when different packages specify different version ranges. React hooks rely on a single React instance - multiple versions break this fundamental requirement.

### Solution

Add npm overrides to the root `package.json` to force all dependencies to use the same React version:

```json
{
  "name": "convex-monorepo",
  "overrides": {
    "react": "19.2.0",
    "react-dom": "19.2.0"
  }
}
```

Then reinstall all dependencies:

```bash
rm -rf node_modules package-lock.json apps/*/node_modules apps/*/package-lock.json packages/*/node_modules packages/*/package-lock.json
npm install
```

**Verify the fix**:
```bash
npm ls react
# Should show only 19.2.0 throughout the entire tree
```

### Why This Matters

- Without overrides, npm's dependency resolution can install multiple React versions
- React hooks rely on a single React instance - multiple versions break this
- This is a **critical blocker** - the app won't render at all without this fix
- The app crashes immediately on load with no clear indication of the root cause

**Status**: ✅ Fixed in template (overrides added to root `package.json`)

---

## Issue 2: Stripe Eager Initialization (Blocks Convex Deployment)

### Problem

The Convex backend failed to deploy with this error:

```
Failed to analyze http.js: Uncaught Error: Neither apiKey nor config.authenticator provided
at new Stripe (../../../../node_modules/stripe/esm/stripe.core.js:109:4)
at <anonymous> (../../convex/stripe/config.ts:5:2)
```

### Root Cause

In `packages/backend/convex/stripe/config.ts`, the Stripe client was initialized immediately when the module loaded:

```typescript
// ❌ BEFORE - Eager initialization
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});
```

The `STRIPE_SECRET_KEY` environment variable didn't exist yet during initial setup, causing the deployment to fail even though Stripe is optional.

### Solution

Changed to lazy initialization - only create the Stripe client when it's actually needed:

```typescript
// ✅ AFTER - Lazy initialization
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

Then update all usages from `stripe.customers.create()` to `stripe().customers.create()`:

**Files updated**:
- `packages/backend/convex/stripe/checkout.ts`
- `packages/backend/convex/stripe/customers.ts`
- `packages/backend/convex/stripe/webhooks.ts`

### Why This Matters

- Allows Convex deployment to succeed even without Stripe keys configured
- Stripe is optional in the template - shouldn't be required for basic setup
- Provides better error messages when Stripe features are actually used
- Follows the principle of failing late (when the feature is used) rather than early (when the app loads)

**Status**: ✅ Fixed in template (lazy initialization implemented)

---

## Issue 3: React Router Future Flag Warnings (Non-Critical)

### Problem

Console warnings about upcoming React Router v7 changes:

```
⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7
⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7
```

### Root Cause

React Router v6 emits warnings when features that will change in v7 are not explicitly opted into.

### Solution

Add future flags to `BrowserRouter` in `apps/web/src/App.tsx`:

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

### Why This Matters

- Eliminates console warnings during development
- Prepares codebase for React Router v7 upgrade
- Better developer experience
- Shows awareness of upcoming breaking changes

**Status**: ✅ Fixed in template (future flags added)

---

## Issue 4: Stripe API Version Mismatch (TypeScript Error)

### Problem

TypeScript error when using Stripe API version:

```
Type '"2024-11-20.acacia"' is not assignable to type '"2025-02-24.acacia"'
```

### Root Cause

The Stripe package was updated but the API version string in the code was outdated.

### Solution

Update the Stripe API version in `packages/backend/convex/stripe/config.ts`:

```typescript
apiVersion: "2025-02-24.acacia"
```

And ensure the latest Stripe package is installed:

```bash
cd packages/backend && npm install stripe@latest
```

### Why This Matters

- Ensures compatibility with the latest Stripe package
- Avoids TypeScript errors during build
- Takes advantage of latest Stripe API features and fixes

**Status**: ✅ Fixed in template (API version updated)

---

## Complete Setup Checklist

After cloning the template, follow these steps:

### 1. Install Dependencies
```bash
npm install
```

### 2. Verify React Version (Critical)
```bash
npm ls react
```
**Expected**: Only `react@19.2.0` should appear in the tree. If you see multiple versions, the overrides may not be working correctly.

### 3. Setup Convex Backend
```bash
npm run setup --workspace packages/backend
```

This will:
- Log into Convex (or create an account)
- Create a new Convex project
- Generate `packages/backend/.env.local` with `CONVEX_URL`
- Wait for you to configure environment variables in the Convex dashboard

### 4. Configure Clerk Authentication

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Enable Google and Apple social connections (required for React Native)
4. Create a JWT template and copy the Issuer URL
5. Add `CLERK_ISSUER_URL` to Convex environment variables

See [Convex + Clerk docs](https://docs.convex.dev/auth/clerk) for detailed steps.

### 5. Configure App Environment Variables

**Web app** (`apps/web/.env.local`):
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...  # Optional
```

**Native app** (`apps/native/.env.local`):
```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
EXPO_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

### 6. (Optional) Configure Stripe

If you want to use Stripe payments, see [STRIPE_SETUP.md](../STRIPE_SETUP.md) for complete instructions.

**Convex environment variables** (add via Convex Dashboard):
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_PRO_MONTHLY=price_...
STRIPE_PRICE_ID_PRO_YEARLY=price_...
SITE_URL=http://localhost:5173  # or your production URL
```

### 7. Run the Apps

```bash
npm run dev
```

This starts all apps in parallel with a TUI (Terminal UI) for separate logs.

Or run individually:
```bash
cd apps/web && npm run dev       # Web app only
cd apps/native && npm run dev    # Native app only
cd packages/backend && npm run dev  # Backend only
```

---

## Debugging Steps

### If the app crashes with "Invalid hook call"

1. **Check React versions**:
   ```bash
   npm ls react
   ```
   Should show only `19.2.0`. If you see multiple versions, the overrides aren't working.

2. **Verify overrides in root package.json**:
   ```json
   {
     "overrides": {
       "react": "19.2.0",
       "react-dom": "19.2.0"
     }
   }
   ```

3. **Clean reinstall**:
   ```bash
   rm -rf node_modules package-lock.json apps/*/node_modules apps/*/package-lock.json packages/*/node_modules packages/*/package-lock.json
   npm install
   ```

4. **Verify again**:
   ```bash
   npm ls react
   ```

### If Convex deployment fails

1. **Check if Stripe is the issue**:
   Look for "Neither apiKey nor config.authenticator provided" in the error.

2. **Verify lazy initialization**:
   Open `packages/backend/convex/stripe/config.ts` and ensure it exports `stripe()` as a function, not a constant.

3. **Check Stripe usage**:
   All files should call `stripe().customers.create()` not `stripe.customers.create()`.

### If environment variables aren't working

1. **Web app (Vite)**:
   - Ensure `VITE_` prefix
   - Restart dev server completely
   - Check `apps/web/.env.local` exists

2. **Native app (Expo)**:
   - Ensure `EXPO_PUBLIC_` prefix
   - Restart Expo completely (kill the process and run `npm run dev` again)
   - Check `apps/native/.env.local` exists

3. **Backend (Convex)**:
   - Environment variables are set in Convex Dashboard, not `.env` files
   - Check Convex Dashboard → Settings → Environment Variables

---

## Summary of Template Fixes

All of these issues have been fixed in the current template:

| Issue | Status | Fix |
|-------|--------|-----|
| React version conflict | ✅ Fixed | Added overrides to root `package.json` |
| Stripe eager initialization | ✅ Fixed | Changed to lazy initialization pattern |
| React Router warnings | ✅ Fixed | Added future flags to BrowserRouter |
| Stripe API version | ✅ Fixed | Updated to `2025-02-24.acacia` |

---

## Additional Resources

- [DESIGN_CONVERSION_GUIDE.md](./DESIGN_CONVERSION_GUIDE.md) - Converting Figma/Sleek Design to Vite + React Native (hex to HSL, Tailwind setup)
- [ENV_MASTER.md](../ENV_MASTER.md) - Complete environment variable reference
- [STRIPE_SETUP.md](../STRIPE_SETUP.md) - Stripe integration guide
- [CLAUDE.md](../CLAUDE.md) - Project overview and development guide
- [BUILD_ROADMAP.md](./BUILD_ROADMAP.md) - Complete guide from template to App Store
- [Convex Documentation](https://docs.convex.dev/)
- [Clerk Documentation](https://clerk.com/docs)
- [Vite Documentation](https://vite.dev/)
- [React Router Documentation](https://reactrouter.com/)
