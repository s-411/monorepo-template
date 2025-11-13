# 🚀 5-Minute Setup Guide

Get this Vite + React + Convex + Clerk template running in 5 minutes.

---

## ✅ Prerequisites

- **Node.js**: Version 18.8.0 or higher
- **Package Manager**: npm (comes with Node.js)
- **Accounts Needed**:
  - [Convex Account](https://convex.dev) (free)
  - [Clerk Account](https://clerk.com) (free)
  - [OpenAI Account](https://platform.openai.com) (optional, for AI summaries)

---

## 📋 Quick Setup Checklist

### Step 1️⃣: Clone & Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd <repo-name>

# Install all dependencies
npm install
```

✅ **Done!** Move to Step 2.

---

### Step 2️⃣: Convex Backend Setup

#### 2.1 - Create Convex Project & Get URL

```bash
# Run the Convex setup (this will pause and wait for you)
npm run setup --workspace packages/backend
```

This command will:
- Log you into Convex (opens browser)
- Create a new Convex project
- Generate `packages/backend/.env.local` with your `CONVEX_URL`
- **PAUSE** and wait for you to add environment variables in the dashboard

#### 2.2 - Get Your Convex URL

After running the setup command, your Convex URL will be in:
```
packages/backend/.env.local
```

Look for:
```bash
CONVEX_URL=https://your-project-name.convex.cloud
```

**Copy this URL** - you'll need it for Step 4.

#### 2.3 - Add Clerk to Convex

The setup command is now waiting. Go to your Convex dashboard:

1. **Open**: [Convex Dashboard](https://dashboard.convex.dev)
2. **Navigate to**: Your Project → Settings → Environment Variables
3. **Add this variable**:

| Variable Name | Value | Where to Get It |
|--------------|-------|-----------------|
| `CLERK_ISSUER_URL` | Get from Clerk (Step 3.3 below) | Wait until Step 3 |

**DON'T CONTINUE THE SETUP YET** - First get your Clerk Issuer URL in Step 3.

#### 2.4 - Add OpenAI Key (Optional)

If you want AI-powered note summaries:

| Variable Name | Value | Where to Get It |
|--------------|-------|-----------------|
| `OPENAI_API_KEY` | `sk-proj-...` | [OpenAI API Keys](https://platform.openai.com/api-keys) |

---

### Step 3️⃣: Clerk Authentication Setup

#### 3.1 - Create Clerk Application

1. **Go to**: [Clerk Dashboard](https://dashboard.clerk.com)
2. **Click**: "+ Create Application"
3. **Name**: Your app name (e.g., "Notes App")
4. **Enable Social Connections**:
   - ✅ **Google** (required for React Native)
   - ✅ **Apple** (required for React Native)
5. **Click**: "Create Application"

#### 3.2 - Get Clerk Publishable Key

1. **Go to**: [API Keys](https://dashboard.clerk.com/last-active?path=api-keys)
2. **Copy**: `Publishable key` (starts with `pk_test_...` or `pk_live_...`)

**Save this key** - you'll need it for Step 4.

#### 3.3 - Create JWT Template for Convex

This is **required** for Convex + Clerk integration.

1. **Go to**: [JWT Templates](https://dashboard.clerk.com/last-active?path=jwt-templates)
2. **Click**: "+ New template"
3. **Select**: "Convex" (pre-configured template)
4. **Name it**: "convex" (lowercase, important!)
5. **Click**: "Create"
6. **Copy**: The `Issuer URL` shown (looks like: `https://your-app.clerk.accounts.dev`)

#### 3.4 - Add Issuer URL to Convex

**NOW** go back to your Convex dashboard:

1. **Open**: [Convex Environment Variables](https://dashboard.convex.dev/deployment/settings/environment-variables)
2. **Add**:
   ```
   CLERK_ISSUER_URL=https://your-app.clerk.accounts.dev
   ```
3. **Save**

✅ **The `npm run setup` command in your terminal should now complete!**

---

### Step 4️⃣: Create Environment Files

You need to create `.env.local` files for each app.

#### 4.1 - Web App Environment

Create: `apps/web/.env.local`

```bash
# Copy this template:
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxx
VITE_PUBLIC_CONVEX_URL=https://your-project-name.convex.cloud
```

**Replace with your values**:
- `VITE_CLERK_PUBLISHABLE_KEY`: From Step 3.2
- `VITE_PUBLIC_CONVEX_URL`: From Step 2.2 (your `CONVEX_URL`)

#### 4.2 - Native App Environment

Create: `apps/native/.env.local`

```bash
# Copy this template:
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxx
EXPO_PUBLIC_CONVEX_URL=https://your-project-name.convex.cloud
```

**Replace with your values**:
- `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`: From Step 3.2 (same as web)
- `EXPO_PUBLIC_CONVEX_URL`: From Step 2.2 (your `CONVEX_URL`)

---

### Step 5️⃣: Run Everything! 🎉

```bash
npm run dev
```

This starts:
- 🌐 **Vite Web App**: http://localhost:5173
- 📱 **Expo React Native**: Expo dev server
- ⚡ **Convex Backend**: Real-time sync

---

## ✅ Verification Checklist

Test that everything works:

### Web App (http://localhost:5173):
- [ ] Page loads without errors
- [ ] "Sign In" and "Sign Up" buttons appear in header
- [ ] Clicking "Sign In" opens Clerk modal
- [ ] Can sign in with Google or email
- [ ] After signing in, see "My Notes" link and user avatar
- [ ] Can navigate to "/notes" (notes dashboard)
- [ ] Can create a new note
- [ ] Note appears in real-time

### React Native App:
- [ ] Expo dev server starts
- [ ] Can scan QR code with Expo Go app
- [ ] App loads on mobile device
- [ ] Can sign in with Clerk

---

## 🔧 Troubleshooting

### "Missing VITE_CLERK_PUBLISHABLE_KEY"
- ✅ Check `apps/web/.env.local` exists
- ✅ Verify the key starts with `pk_test_` or `pk_live_`
- ✅ Restart the dev server after creating `.env.local`

### "Missing VITE_PUBLIC_CONVEX_URL"
- ✅ Check `apps/web/.env.local` exists
- ✅ Verify the URL format: `https://your-project.convex.cloud`
- ✅ Make sure Convex setup completed successfully

### Clerk Authentication Not Working
- ✅ Verify Google & Apple are enabled in Clerk dashboard
- ✅ Verify JWT template is named "convex" (lowercase)
- ✅ Verify `CLERK_ISSUER_URL` is added to Convex environment variables
- ✅ Check the Issuer URL matches your Clerk application

### Notes Not Saving
- ✅ Make sure you're signed in
- ✅ Check Convex dev server is running (`npm run dev`)
- ✅ Check browser console for errors
- ✅ Verify Convex functions deployed successfully

---

## 📚 Quick Reference

### Environment Variables Summary

| Variable | Where | Value |
|----------|-------|-------|
| `CONVEX_URL` | Auto-created in `packages/backend/.env.local` | `https://xxx.convex.cloud` |
| `CLERK_ISSUER_URL` | Convex Dashboard → Environment Variables | `https://xxx.clerk.accounts.dev` |
| `VITE_CLERK_PUBLISHABLE_KEY` | `apps/web/.env.local` | `pk_test_xxx...` |
| `VITE_PUBLIC_CONVEX_URL` | `apps/web/.env.local` | Same as `CONVEX_URL` |
| `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` | `apps/native/.env.local` | Same as web Clerk key |
| `EXPO_PUBLIC_CONVEX_URL` | `apps/native/.env.local` | Same as `CONVEX_URL` |
| `OPENAI_API_KEY` (optional) | Convex Dashboard → Environment Variables | `sk-proj-xxx...` |

### Important Links

- **Convex Dashboard**: https://dashboard.convex.dev
- **Convex Environment Variables**: https://dashboard.convex.dev/deployment/settings/environment-variables
- **Clerk Dashboard**: https://dashboard.clerk.com
- **Clerk API Keys**: https://dashboard.clerk.com/last-active?path=api-keys
- **Clerk JWT Templates**: https://dashboard.clerk.com/last-active?path=jwt-templates
- **OpenAI API Keys**: https://platform.openai.com/api-keys

---

## 🎨 Next Steps

Now that your app is running:

1. **Start designing**: Modify components in `apps/web/src/`
2. **Add features**: Create new pages in `apps/web/src/pages/`
3. **Backend logic**: Add Convex functions in `packages/backend/convex/`
4. **Database schema**: Update `packages/backend/convex/schema.ts`
5. **Styling**: Customize Tailwind in `apps/web/tailwind.config.js`

---

## 💡 Pro Tips

- **Hot Reload**: Both web and backend hot-reload automatically
- **Type Safety**: Import types from `@packages/backend/convex/_generated/api`
- **Real-time**: All Convex queries are real-time by default
- **Deployment**: See [CLAUDE.md](./CLAUDE.md) for deployment instructions

---

**🎉 You're all set! Happy coding!**
