# Environment Variables Master Guide

This document contains **ALL** environment variables needed for the entire monorepo. Use this as your single source of truth when setting up a new instance.

---

## 🎯 Quick Setup Checklist

- [ ] Setup Convex backend (`npm run setup --workspace packages/backend`)
- [ ] Create Clerk account and JWT template
- [ ] Add Convex environment variables in dashboard
- [ ] Create `apps/web/.env.local`
- [ ] Create `apps/native/.env.local`
- [ ] (Optional) Setup Stripe and add keys
- [ ] Run `npm run dev` to verify everything works

---

## 📦 Backend (Convex)

**Location**: Added via [Convex Dashboard](https://dashboard.convex.dev/) → Your Project → Settings → Environment Variables

**IMPORTANT**: These are NOT stored in `.env` files. They must be added through the Convex dashboard.

### Required

```bash
# Clerk JWT Issuer URL
# Where to get: Clerk Dashboard > JWT Templates > Create "convex" template > Copy issuer URL
# Example: https://blessed-pony-12.clerk.accounts.dev
CLERK_ISSUER_URL=
```

### Optional (Stripe Integration)

```bash
# Stripe Secret Key
# Where to get: https://dashboard.stripe.com/apikeys
# Use test key (sk_test_...) for development
STRIPE_SECRET_KEY=

# Stripe Webhook Secret
# Where to get: https://dashboard.stripe.com/webhooks
# Create endpoint pointing to: https://your-convex-url.convex.cloud/stripe/webhook
# Use test webhook secret (whsec_...) for development
STRIPE_WEBHOOK_SECRET=

# Stripe Price IDs for subscription plans
# Where to get: https://dashboard.stripe.com/products
# Create products and copy their price IDs
STRIPE_PRICE_ID_PRO_MONTHLY=
STRIPE_PRICE_ID_PRO_YEARLY=

# Your application URL (for Stripe redirect URLs)
# Development: http://localhost:5173
# Production: https://yourdomain.com
SITE_URL=http://localhost:5173
```

### Optional (OpenAI Integration)

```bash
# OpenAI API Key (for AI features)
# Where to get: https://platform.openai.com/api-keys
OPENAI_API_KEY=
```

---

## 🌐 Web App (Vite + React)

**Location**: `apps/web/.env.local`

**IMPORTANT**: Vite requires the `VITE_` prefix for environment variables to be exposed to the client.

```bash
# Clerk Publishable Key
# Where to get: https://dashboard.clerk.com/last-active?path=api-keys
# Copy the "Publishable key" (starts with pk_test_ or pk_live_)
VITE_CLERK_PUBLISHABLE_KEY=

# Convex Deployment URL
# Where to get: After running `npm run setup --workspace packages/backend`
# Copy from: packages/backend/.env.local
# Example: https://blessed-pony-12.convex.cloud
VITE_PUBLIC_CONVEX_URL=

# Stripe Publishable Key (Optional)
# Where to get: https://dashboard.stripe.com/apikeys
# Copy the "Publishable key" (starts with pk_test_ or pk_live_)
VITE_STRIPE_PUBLISHABLE_KEY=
```

**Example `apps/web/.env.local`**:
```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_YmxlzXNlZC1wb255LTEyLmNsZXJrLmFjY291bnRzLmRldgYQ
VITE_PUBLIC_CONVEX_URL=https://blessed-pony-12.convex.cloud
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51234567890abcdefghijklmnopqrstuvwxyz
```

---

## 📱 Native App (React Native + Expo)

**Location**: `apps/native/.env.local`

**IMPORTANT**: Expo requires the `EXPO_PUBLIC_` prefix for environment variables to be exposed to the client.

```bash
# Convex Deployment URL
# Where to get: After running `npm run setup --workspace packages/backend`
# Copy from: packages/backend/.env.local
# Example: https://blessed-pony-12.convex.cloud
EXPO_PUBLIC_CONVEX_URL=

# Clerk Publishable Key
# Where to get: https://dashboard.clerk.com/last-active?path=api-keys
# Copy the "Publishable key" (starts with pk_test_ or pk_live_)
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=
```

**Example `apps/native/.env.local`**:
```bash
EXPO_PUBLIC_CONVEX_URL=https://blessed-pony-12.convex.cloud
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YmxlzXNlZC1wb255LTEyLmNsZXJrLmFjY291bnRzLmRldgYQ
```

**Note**: After creating or modifying `.env.local`, restart the Expo dev server.

---

## 🔐 Security Notes

### Git Ignore

All `.env.local` files are already in `.gitignore`. **NEVER** commit:
- `.env.local`
- `.env`
- Any file containing API keys

### Key Types

- **Test keys**: Use during development (contain `test` in the key)
- **Production keys**: Use in production (contain `live` in the key)

### Clerk Social Providers

For React Native to work, you **MUST** enable these providers in Clerk:
1. Go to [Clerk Dashboard](https://dashboard.clerk.com/) → Your App → Social Connections
2. Enable **Google** (required)
3. Enable **Apple** (required)

---

## 📝 Step-by-Step Setup

### 1. Convex Backend

```bash
# Run setup
npm run setup --workspace packages/backend

# This creates: packages/backend/.env.local
# Copy the CONVEX_URL from this file - you'll need it for the apps
```

### 2. Clerk Setup

1. Create account at [clerk.com](https://clerk.com)
2. Create new application
3. Go to **JWT Templates** → Create new template
4. Name it "convex"
5. Copy the **Issuer URL** → Add to Convex dashboard
6. Go to **API Keys** → Copy **Publishable key**
7. Go to **Social Connections** → Enable Google and Apple

### 3. Web App Environment

```bash
# Create file
cp apps/web/.env.example apps/web/.env.local

# Edit and add:
# - VITE_CLERK_PUBLISHABLE_KEY (from Clerk API Keys)
# - VITE_PUBLIC_CONVEX_URL (from packages/backend/.env.local)
```

### 4. Native App Environment

```bash
# Create file
cp apps/native/.env.example apps/native/.env.local

# Edit and add:
# - EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY (from Clerk API Keys)
# - EXPO_PUBLIC_CONVEX_URL (from packages/backend/.env.local)
```

### 5. (Optional) Stripe Setup

See [STRIPE_SETUP.md](./STRIPE_SETUP.md) for detailed guide.

Quick version:
1. Create Stripe account
2. Get API keys from dashboard
3. Create products and price IDs
4. Add all Stripe variables to Convex dashboard
5. Add `VITE_STRIPE_PUBLISHABLE_KEY` to `apps/web/.env.local`
6. Setup webhook endpoint

---

## 🧪 Verification

### Test Web App

```bash
cd apps/web && npm run dev
```

Visit http://localhost:5173

- [ ] Can see home page
- [ ] Can click sign in
- [ ] Redirects to Clerk
- [ ] After sign in, can see dashboard
- [ ] Dashboard shows Clerk user info
- [ ] Dashboard shows Convex query result

### Test Native App

```bash
cd apps/native && npm run dev
```

Scan QR code with Expo Go app:

- [ ] App loads without errors
- [ ] Can see login screen
- [ ] Can sign in with Google or Apple
- [ ] After sign in, see dashboard
- [ ] Dashboard shows Clerk user info
- [ ] Dashboard shows Convex query result

---

## 🚨 Common Issues

### "Missing environment variable" error

**Cause**: Environment variable not set or has wrong prefix

**Fix**:
- Web: Must use `VITE_` prefix
- Native: Must use `EXPO_PUBLIC_` prefix
- Backend: Set in Convex dashboard (no prefix)

### Clerk authentication fails

**Cause**: Missing Google/Apple social providers

**Fix**: Enable Google and Apple in Clerk → Social Connections

### Stripe webhook fails signature verification

**Cause**: Wrong webhook secret

**Fix**:
1. Get secret from Stripe Dashboard → Webhooks
2. Add to Convex dashboard as `STRIPE_WEBHOOK_SECRET`
3. Ensure webhook endpoint matches your Convex URL

### Native app can't connect to Convex

**Cause**: Environment variable not loaded

**Fix**:
1. Verify `.env.local` exists in `apps/native/`
2. Restart Expo dev server completely
3. Clear Expo cache: `npx expo start -c`

---

## 📚 Additional Resources

- [Convex Documentation](https://docs.convex.dev/)
- [Clerk Documentation](https://clerk.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Vite Environment Variables](https://vite.dev/guide/env-and-mode.html)
- [Expo Environment Variables](https://docs.expo.dev/guides/environment-variables/)

---

## 🎉 You're Done!

Once all environment variables are set and verification passes, you're ready to start building!

Run all apps:
```bash
npm run dev
```

Happy coding! 🚀
