# Product Requirements Document (PRD)
## React Native Boilerplate App with Clerk + Convex + Stripe

**Project Name:** React Native Template App
**Target Platform:** iOS & Android (React Native / Expo)
**Developer:** Rourke
**Date:** 2025-11-14

---

## 1. CRITICAL CONSTRAINTS

**⚠️ IMPORTANT - DO NOT IMPLEMENT:**
- **NO custom database** - Use Convex only
- **NO custom authentication system** - Use Clerk only
- **NO custom payment processing** - Use Stripe only
- **NO backend code** - All backend logic is provided via Convex

**YOU MUST USE:**
- **Clerk** for authentication (OAuth with Google and Apple)
- **Convex** for backend/database (will be provided as shared package)
- **Stripe** for payments (checkout sessions and webhooks)

---

## 2. PROJECT OVERVIEW

This is a **minimal boilerplate React Native app** that demonstrates a production-ready integration of:
1. **Clerk authentication** (Google & Apple OAuth)
2. **Convex backend** (realtime database with TypeScript)
3. **Stripe payments** (checkout flow with webhook verification)

The app should be **super basic** with minimal UI/UX polish. The focus is on **proving that all integrations work correctly** through visible verification data on each screen.

This template will serve as the foundation for building many production apps.

---

## 3. TECHNICAL STACK

### Required Technologies:
- **React Native** (via Expo)
- **TypeScript** (strict mode)
- **Expo Router** or **React Navigation** for navigation
- **Clerk Expo SDK** (`@clerk/clerk-expo`)
- **Convex React SDK** (`convex/react`)
- **React Native** styling (StyleSheet, no fancy UI libraries needed)

### Backend Integration:
- You will receive a **shared Convex package** (`@packages/backend`) that contains:
  - Database schema (users, customers, subscriptions)
  - Queries and mutations for data access
  - Stripe integration (checkout, webhooks, customer management)
  - Authentication configuration

**DO NOT create any backend code.** Simply import and use the provided Convex queries/mutations.

---

## 4. APP SCREENS & NAVIGATION

The app must have **4 screens**:

### 4.1 Login Screen
**Route:** `/login` or initial screen when not authenticated

**UI Elements:**
- App logo (can be a simple placeholder image)
- Title: "Log in to your account"
- Subtitle: "Welcome! Please login below."
- **Google Sign-In Button**
  - Text: "Continue with Google"
  - Uses Clerk OAuth strategy: `oauth_google`
- **Apple Sign-In Button**
  - Text: "Continue with Apple"
  - Uses Clerk OAuth strategy: `oauth_apple`
- Simple text at bottom: "Don't have an account? Sign up above."

**Functionality:**
- Uses `@clerk/clerk-expo` hook: `useOAuth()`
- On successful authentication, navigate to Dashboard
- Handle OAuth errors gracefully (console log + alert)

**Reference Implementation:** `/apps/native/src/screens/LoginScreen.tsx`

---

### 4.2 Dashboard Screen
**Route:** `/dashboard` (protected, requires authentication)

**UI Elements:**
- Title: "Dashboard"
- Display current user information in cards:

**Card 1: Clerk User**
- Show: Name, Email from `useUser()` hook

**Card 2: Convex Query**
- Show: Result of `api.example.hello` query
- Purpose: Verify Convex connection works

**Card 3: Convex + Clerk Integration**
- Show: User data from `api.example.getCurrentUser` query
- Display: User ID, Name, Email from Convex backend
- Purpose: Verify Clerk authentication is synced with Convex

**Card 4: System Status Summary**
- Checkmarks showing:
  - ✅ Authentication is working (you're signed in)
  - ✅ Convex is connected and responding
  - ✅ Type safety is working (imports from backend)
  - "You can now start building your app!"

**Navigation Links:**
- Link to "Pricing" page
- Link to "Account" page
- Sign out button (optional, can use Clerk UserButton if available)

**Reference Implementation:** `/apps/web/src/pages/Dashboard.tsx` (web version)

---

### 4.3 Pricing Screen
**Route:** `/pricing` (protected, requires authentication)

**UI Elements:**
- Title: "Simple, Transparent Pricing"
- Subtitle: "Choose the plan that works best for you. Cancel anytime."

**Current Subscription Banner** (if user has subscription):
- Green banner at top
- Text: "✅ You have an active [monthly/annual] subscription"
- Link to "Manage your subscription" → navigates to Account screen

**Pricing Cards** (2 cards side by side or stacked):

**Card 1: Pro Monthly**
- Price: $9.99/month
- Features list:
  - All features included
  - Cancel anytime
  - Billed monthly
  - No long-term commitment
- "Subscribe Monthly" button → triggers Stripe checkout

**Card 2: Pro Annual** (highlighted as "BEST VALUE")
- Price: $39.99/year
- Badge: "BEST VALUE"
- Features list:
  - All features included
  - Cancel anytime
  - Billed annually
  - Best value - 67% savings
- "Subscribe Annually" button → triggers Stripe checkout

**Test Mode Notice:**
- Yellow box at bottom
- "🧪 Test Mode Active"
- "Use test card 4242 4242 4242 4242 with any future expiry and any CVC"

**Functionality:**
- Use Convex action: `api.stripe.checkout.createCheckoutSession`
- Pass `priceKey: "PRO_MONTHLY"` or `priceKey: "PRO_YEARLY"`
- Action returns `{ url }` which should be opened in browser/webview
- After payment, Stripe redirects back to app
- Subscription data is synced via webhooks automatically

**Reference Implementation:** `/apps/web/src/pages/Pricing.tsx`

---

### 4.4 Account Screen
**Route:** `/account` (protected, requires authentication)

**UI Elements:**
- Title: "Account Settings"
- Subtitle: "Manage your profile and subscription"

**Section 1: Profile Information** (card)
- Name: Display user's full name
- Email: Display user's email
- User ID: Display Clerk user ID (monospace font)

**Section 2: Subscription Status** (card)
- **If loading:** Show spinner
- **If has subscription:** Show subscription details:
  - Status badge (green if "active")
  - Current period end date
  - Text: "Renews on [date]" or "Cancels on [date]" if canceled
  - "Manage Subscription" button → opens Stripe Customer Portal
- **If no subscription:**
  - Icon (payment/money icon)
  - "No Active Subscription"
  - "Subscribe to unlock all features"
  - "View Pricing Plans" button → navigate to Pricing

**Section 3: Billing Information** (if customer exists, card)
- Stripe Customer ID (monospace)
- Customer Email

**Section 4: Quick Actions** (card)
- "Go to Dashboard" link
- "View Pricing" link

**Functionality:**
- Query: `api.stripe.customers.getCurrent` - get customer info
- Query: `api.stripe.subscriptions.getCurrent` - get subscription
- Action: `api.stripe.checkout.createPortalSession` - open billing portal
- Portal button opens Stripe-hosted page for managing subscription

**Reference Implementation:** `/apps/web/src/pages/Account.tsx`

---

## 5. NAVIGATION STRUCTURE

```
App
├── Unauthenticated Stack
│   └── Login Screen
└── Authenticated Stack (protected)
    ├── Dashboard Screen (default)
    ├── Pricing Screen
    └── Account Screen
```

**Navigation Rules:**
- If user is NOT signed in → show Login Screen
- If user IS signed in → show Dashboard (or last visited screen)
- All screens except Login require authentication
- Use Clerk's `useAuth()` or `useUser()` to check auth state

---

## 6. CONVEX INTEGRATION (Backend)

You will receive a shared package `@packages/backend` with the following:

### Available Queries:
```typescript
// Test queries
api.example.hello                        // Returns: "Hello from Convex!"
api.example.getCurrentUser              // Returns: { userId, name, email }

// Stripe queries
api.stripe.customers.getCurrent         // Returns current user's customer record
api.stripe.subscriptions.getCurrent     // Returns current user's subscription
```

### Available Actions:
```typescript
// Stripe actions
api.stripe.checkout.createCheckoutSession({ priceKey: "PRO_MONTHLY" | "PRO_YEARLY" })
  // Returns: { url: "https://checkout.stripe.com/..." }

api.stripe.checkout.createPortalSession()
  // Returns: { url: "https://billing.stripe.com/..." }
```

### How to Use:
```typescript
import { useQuery, useAction } from 'convex/react';
import { api } from '@packages/backend/convex/_generated/api';

// In component:
const currentUser = useQuery(api.example.getCurrentUser);
const subscription = useQuery(api.stripe.subscriptions.getCurrent);
const createCheckout = useAction(api.stripe.checkout.createCheckoutSession);
```

**DO NOT:**
- Modify the backend package
- Create your own queries/mutations
- Implement custom database logic

---

## 7. CLERK AUTHENTICATION

### Setup Requirements:
1. Use `@clerk/clerk-expo` package
2. Wrap app with `<ClerkProvider>` and `<ConvexProviderWithClerk>`
3. Configure OAuth providers in Clerk dashboard:
   - **Google** (OAuth 2.0)
   - **Apple** (Sign in with Apple)

### Authentication Flow:
```typescript
import { useOAuth } from '@clerk/clerk-expo';

const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

const handleLogin = async () => {
  const { createdSessionId, setActive } = await startOAuthFlow();
  if (createdSessionId) {
    setActive({ session: createdSessionId });
    // Navigate to dashboard
  }
};
```

### Environment Variables Needed:
```
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
EXPO_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
```

**Reference:** `/apps/native/src/screens/LoginScreen.tsx`

---

## 8. STRIPE INTEGRATION

### Checkout Flow:
1. User clicks "Subscribe Monthly" or "Subscribe Annually" button
2. Call Convex action: `createCheckoutSession({ priceKey })`
3. Action returns Stripe Checkout URL
4. Open URL in browser/webview (e.g., `Linking.openURL(url)`)
5. User completes payment on Stripe-hosted page
6. Stripe redirects back to app
7. Webhooks automatically sync subscription to Convex database

### Customer Portal Flow:
1. User clicks "Manage Subscription" button
2. Call Convex action: `createPortalSession()`
3. Action returns Stripe Portal URL
4. Open URL in browser/webview
5. User can update payment method, cancel subscription, etc.
6. Changes sync back via webhooks

### Test Payments:
- Use Stripe test mode
- Test card: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC

**NO STRIPE SDK NEEDED IN APP** - All Stripe logic is handled by Convex backend.

---

## 9. UI/UX REQUIREMENTS

### Design Principles:
- **Minimal and functional** - No fancy animations or complex UI
- **Clear verification data** - Show all API responses visibly
- **Basic styling** - Use React Native StyleSheet, simple colors
- **Responsive cards** - Use simple card components for data display

### Color Palette (suggested):
- Background: `#ffffff` (white) or `#f9fafb` (light gray)
- Cards: `#ffffff` with border `#e5e7eb`
- Primary button: `#2563eb` (blue)
- Success: `#10b981` (green)
- Warning: `#f59e0b` (yellow)
- Text: `#111827` (dark gray)

### Typography:
- Use system fonts (San Francisco on iOS, Roboto on Android)
- Clear hierarchy: Large titles (24-28pt), body text (14-16pt)

**NO UI LIBRARY REQUIRED** - Keep it simple with native components.

---

## 10. DATA VERIFICATION REQUIREMENTS

**CRITICAL:** Each screen must show **visible proof** that integrations work:

### Dashboard:
- ✅ Clerk user data displayed (name, email)
- ✅ Convex query responds (hello message)
- ✅ Convex + Clerk integration works (getCurrentUser returns data)
- ✅ Type safety confirmed (imports from @packages/backend work)

### Pricing:
- ✅ Subscription check works (banner shows if user has subscription)
- ✅ Checkout button creates valid Stripe session
- ✅ Redirect to Stripe checkout works

### Account:
- ✅ Customer query returns data (if user has subscribed)
- ✅ Subscription query returns accurate status
- ✅ Portal button opens Stripe billing portal
- ✅ Subscription details display correctly (status, renewal date, cancel status)

**The app is NOT about looking pretty - it's about proving everything works.**

---

## 11. ERROR HANDLING

### Required Error Handling:
1. **OAuth Errors:**
   - Catch errors in `startOAuthFlow()`
   - Show alert: "Failed to sign in. Please try again."
   - Log error to console

2. **Convex Query Errors:**
   - Show loading state while `undefined`
   - Show "Failed to load" if error
   - Retry mechanism optional

3. **Stripe Checkout Errors:**
   - Catch errors in `createCheckoutSession`
   - Show alert: "Failed to start checkout. Please try again."
   - Don't redirect if error occurs

4. **Network Errors:**
   - Show loading spinners for async operations
   - Graceful fallbacks for missing data

**Keep error handling simple** - alerts and console logs are sufficient.

---

## 12. ENVIRONMENT SETUP

### Required Environment Variables:
Create `.env.local` or use Expo env system:

```bash
# Clerk Authentication
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxx

# Convex Backend
EXPO_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

### Installation Steps:
```bash
# Install dependencies
npm install

# Install required packages
npm install @clerk/clerk-expo convex expo-linking expo-router
```

### Backend Setup:
The backend package will be provided separately. You'll import it as:
```typescript
import { api } from '@packages/backend/convex/_generated/api';
```

---

## 13. TESTING CHECKLIST

Before delivery, verify the following flow works end-to-end:

### 1. Authentication Test:
- [ ] Open app → shows Login screen
- [ ] Click "Continue with Google" → OAuth flow works
- [ ] Redirects to Dashboard after successful login
- [ ] Dashboard shows Clerk user data correctly

### 2. Convex Integration Test:
- [ ] Dashboard shows "Hello from Convex!" message
- [ ] Dashboard shows getCurrentUser data (name, email, userId)
- [ ] Data matches Clerk user info

### 3. Stripe Checkout Test:
- [ ] Navigate to Pricing screen
- [ ] Click "Subscribe Monthly" button
- [ ] Redirects to Stripe checkout page
- [ ] Enter test card: 4242 4242 4242 4242
- [ ] Complete payment successfully
- [ ] Return to app

### 4. Webhook Verification Test:
- [ ] After payment, go to Account screen
- [ ] Subscription Status shows "active"
- [ ] Current period end date is displayed
- [ ] Stripe Customer ID is visible

### 5. Portal Test:
- [ ] Click "Manage Subscription" button
- [ ] Opens Stripe Customer Portal
- [ ] Can view subscription details
- [ ] Can cancel subscription (test mode)
- [ ] Return to app, Account screen shows "Cancels on [date]"

### 6. Navigation Test:
- [ ] All navigation links work correctly
- [ ] Sign out works (redirects to Login)
- [ ] Reopening app maintains session

---

## 14. DELIVERABLES

### Required Files/Code:
1. **React Native App** (Expo project)
   - `screens/LoginScreen.tsx`
   - `screens/DashboardScreen.tsx`
   - `screens/PricingScreen.tsx`
   - `screens/AccountScreen.tsx`
   - Navigation setup (App.tsx or navigation folder)
   - Clerk + Convex provider setup

2. **Documentation:**
   - `.env.example` file with required variables
   - README.md with setup instructions
   - List of dependencies in `package.json`

3. **Proof of Integration:**
   - Screenshots or video showing:
     - Login flow working
     - Dashboard with all verification data
     - Pricing screen with subscription check
     - Account screen showing subscription status
     - Successful Stripe checkout flow

### What NOT to Include:
- ❌ Custom backend code
- ❌ Custom database schemas
- ❌ Custom authentication logic
- ❌ Fancy UI components or animations
- ❌ Additional features beyond the 4 screens

---

## 15. SUCCESS CRITERIA

The project is successful when:

1. ✅ All 4 screens are implemented and navigable
2. ✅ Clerk OAuth works (Google and Apple sign-in)
3. ✅ Convex queries return data and display correctly
4. ✅ Stripe checkout creates valid sessions and redirects
5. ✅ Webhooks sync subscription data to Convex (verified on Account screen)
6. ✅ Stripe Customer Portal opens and works
7. ✅ All verification data is visible on screens
8. ✅ No crashes or critical errors
9. ✅ TypeScript compiles without errors
10. ✅ App runs on both iOS and Android (Expo Go or development build)

**This is a boilerplate/template app.** The goal is NOT to build a production-ready consumer app, but to create a **verified foundation** that proves all integrations work correctly.

---

## 16. REFERENCE IMPLEMENTATIONS

You can reference the existing web app for implementation patterns:

### Web App Files (for reference only):
- **Login equivalent:** `/apps/web/src/pages/Home.tsx` (has sign-in buttons)
- **Dashboard:** `/apps/web/src/pages/Dashboard.tsx`
- **Pricing:** `/apps/web/src/pages/Pricing.tsx`
- **Account:** `/apps/web/src/pages/Account.tsx`
- **Checkout Button:** `/apps/web/src/components/stripe/CheckoutButton.tsx`
- **Subscription Status:** `/apps/web/src/components/stripe/SubscriptionStatus.tsx`

### Native App Files (current implementation):
- **Login:** `/apps/native/src/screens/LoginScreen.tsx`
- **Dashboard:** `/apps/native/src/screens/DashboardScreen.tsx`

**Note:** The current native app only has Login and Dashboard. You need to add Pricing and Account screens matching the web app's functionality.

---

## 17. TECHNICAL CONSTRAINTS

### Do NOT use:
- Custom REST APIs
- GraphQL
- Firebase, Supabase, or other backends
- Custom auth providers (Auth0, etc.)
- Payment processing other than Stripe
- Server components or SSR (this is a client app)

### You MUST use:
- Convex for all backend queries/mutations
- Clerk for all authentication
- Stripe for all payments (via Convex actions)
- TypeScript for type safety
- Expo for React Native development

---

## 18. QUESTIONS & CLARIFICATIONS

If you need clarification on any requirement, contact the project owner. Key points to confirm:

1. **Backend package location:** Where is `@packages/backend` located?
2. **Convex deployment URL:** What is the `EXPO_PUBLIC_CONVEX_URL`?
3. **Clerk publishable key:** What is the `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`?
4. **Stripe configuration:** Are test mode keys already configured in Convex?
5. **OAuth redirect URLs:** Are they configured in Clerk dashboard?

---

## 19. TIMELINE & PRIORITIES

### Priority Order:
1. **P0 (Critical):** Login screen with Clerk OAuth
2. **P0 (Critical):** Dashboard with Convex verification
3. **P1 (High):** Pricing screen with Stripe checkout
4. **P1 (High):** Account screen with subscription display
5. **P2 (Medium):** Error handling and loading states
6. **P3 (Nice to have):** UI polish and styling improvements

**Focus on getting P0 and P1 working perfectly.** P2 and P3 are secondary.

---

## 20. CONTACT & SUPPORT

**Project Owner:** [Your Name/Contact]
**Convex Backend:** Shared package will be provided
**Stripe Test Keys:** Already configured in Convex environment
**Clerk App:** OAuth providers already configured

**Documentation References:**
- Clerk Expo: https://clerk.com/docs/quickstarts/expo
- Convex React: https://docs.convex.dev/client/react
- Stripe Checkout: https://stripe.com/docs/payments/checkout
- Expo Linking: https://docs.expo.dev/guides/linking/

---

## FINAL NOTES

This is a **verification template**, not a consumer-facing app. The entire purpose is to:

1. Prove Clerk authentication works in React Native
2. Prove Convex backend queries work and return data
3. Prove Stripe checkout and webhooks sync correctly
4. Provide a **clean starting point** for building real apps

**Keep it simple. Make it work. Show the data.**

That's all that matters.

---

**END OF PRD**
