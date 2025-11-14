# 🚀 Build Roadmap: From Template to Production App

This is your step-by-step guide for building a production app from this template. Follow these phases in order for the smoothest development experience.

---

## Overview: The 10 Phases

1. **Foundation & Planning** - Design everything, plan the database
2. **UI Shell** - Build all pages as static UI (no data yet)
3. **Backend Implementation** - Create database schema and functions
4. **Feature Implementation** - Connect UI to backend, one feature at a time
5. **Monetization** - Add subscription paywalls (optional)
6. **Onboarding Flow** - Build the first-time user experience (CRITICAL)
7. **Testing & Refinement** - User testing, analytics, A/B testing
8. **Production Deployment** - Deploy to production (web + backend)
9. **Mobile App Deployment** - Submit to App Store and Google Play
10. **Post-Launch** - Monitor, iterate, and improve

**Time Estimate**: 3-6 weeks from start to App Store submission, depending on complexity.

---

## Phase 1: Foundation & Planning (Do This First)

**Goal**: Have a complete plan before writing any code.

### Step 1.1: Export ALL Design Screens

If you're using a design tool (Figma, Sleek.Design, etc.):

1. **Export all screens as code** (React components if available)
   - Web version
   - Mobile version (if building native app)
2. **Organize exports** in a temporary folder:
   ```
   /design-exports/
     web/
       home.tsx
       dashboard.tsx
       feature-list.tsx
       analytics.tsx
     mobile/
       HomeScreen.tsx
       DashboardScreen.tsx
       FeatureListScreen.tsx
   ```

**If you don't have designs yet**: Skip to Step 1.2 and work with wireframes or text descriptions.

---

### Step 1.2: Database Schema Planning Session

**This is the most important step.** Get this right and everything else is easy.

#### Open a Planning Session with Claude Code

Share ALL your design screens (or wireframes) and walk through:

**1. User Journeys**
- "User creates an entry → saves data → sees it on the list page"
- "User views analytics → filters by date range → sees insights"
- "User sets goals → tracks progress → gets notifications"

**2. Data Inputs** (What information does the user enter?)
- Example: "They enter: title, date, rating (1-5), category, notes, optional photo"

**3. Data Connections** (What data does each page need?)
- Example: "Analytics page needs: all user entries grouped by week, average ratings, most common category"

**4. Relationships** (How does data connect?)
- "Each entry belongs to one user"
- "Each user has multiple entries"
- "Each user has one settings record"
- "Each user has one subscription record (via Stripe integration)"

#### Output: Complete Database Schema

Claude will create a `schema.ts` file with all tables, fields, indexes, and relationships.

**Example Schema Structure** (your actual schema will be different):
```typescript
// Example - yours will be specific to your app
export default defineSchema({
  entries: defineTable({
    userId: v.string(),
    title: v.string(),
    date: v.number(), // timestamp
    rating: v.number(), // 1-5
    category: v.string(),
    notes: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_date", ["userId", "date"]),

  goals: defineTable({
    userId: v.string(),
    targetCount: v.number(),
    period: v.string(), // "daily", "weekly", "monthly"
  })
    .index("by_user", ["userId"]),
});
```

**Save this schema** - you'll implement it in Phase 3.

---

## Phase 2: UI Shell (Static Pages Only)

**Goal**: Build the entire UI without any backend connections. Just static pages.

### Step 2.1: Create All Pages at Once

Convert ALL design exports (or wireframes) to React components:

**Web App** (`apps/web/src/pages/`):
```
YourFeature.tsx
FeatureList.tsx
Analytics.tsx
Settings.tsx
```

**Mobile App** (`apps/native/src/screens/`):
```
YourFeatureScreen.tsx
FeatureListScreen.tsx
AnalyticsScreen.tsx
SettingsScreen.tsx
```

**Important**:
- ✅ Make them completely static
- ✅ Use hardcoded mock data
- ✅ Focus on layout, styling, components
- ❌ No Convex queries/mutations yet
- ❌ No form submissions
- ❌ No real data

**Example Static Page**:
```tsx
export default function FeatureList() {
  // Mock data for now
  const mockData = [
    { id: 1, title: "Example Entry", date: "2025-01-15", rating: 4 },
    { id: 2, title: "Another Entry", date: "2025-01-14", rating: 5 },
  ];

  return (
    <div>
      <h1>My Entries</h1>
      {mockData.map(item => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.date} - Rating: {item.rating}/5</p>
        </div>
      ))}
    </div>
  );
}
```

---

### Step 2.2: Set Up Routing

Add all routes so you can navigate between pages (even if they don't do anything yet).

**Web** (`apps/web/src/App.tsx`):
```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
  <Route path="/entries" element={<ProtectedRoute><FeatureList /></ProtectedRoute>} />
  <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
  <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
</Routes>
```

**Mobile** (`apps/native/src/navigation/Navigation.tsx`):
```tsx
<Stack.Navigator>
  <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="Dashboard" component={DashboardScreen} />
  <Stack.Screen name="FeatureList" component={FeatureListScreen} />
  <Stack.Screen name="Analytics" component={AnalyticsScreen} />
</Stack.Navigator>
```

---

### Why Build All Pages at Once?

1. **See the full app flow** - Navigate through the entire app
2. **Spot design inconsistencies** - Notice patterns, repeated components
3. **Better database planning** - You already did this in Phase 1, but seeing it visually helps
4. **Parallel work** - You (or team members) can work on styling while planning backend
5. **Motivating** - You can "use" the app even though it's not real yet

---

## Phase 3: Backend Implementation

**Goal**: Create the database schema and all backend functions.

### Step 3.1: Implement Convex Schema

Add the schema you planned in Phase 1 to `packages/backend/convex/schema.ts`.

**Example**:
```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  entries: defineTable({
    userId: v.string(),
    title: v.string(),
    date: v.number(),
    rating: v.number(),
    category: v.string(),
    notes: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_date", ["userId", "date"]),

  goals: defineTable({
    userId: v.string(),
    targetCount: v.number(),
    period: v.string(),
  })
    .index("by_user", ["userId"]),

  // Stripe tables already exist: customers, subscriptions
});
```

---

### Step 3.2: Create Convex Functions

Create files for each table with CRUD operations.

**Example** (`packages/backend/convex/entries.ts`):
```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// GET: List all entries for current user
export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("entries")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc") // newest first
      .collect();
  },
});

// CREATE: Add new entry
export const create = mutation({
  args: {
    title: v.string(),
    date: v.number(),
    rating: v.number(),
    category: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const entryId = await ctx.db.insert("entries", {
      userId: identity.subject,
      ...args,
    });

    return entryId;
  },
});

// UPDATE: Edit existing entry
export const update = mutation({
  args: {
    id: v.id("entries"),
    title: v.optional(v.string()),
    rating: v.optional(v.number()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, { id, ...updates }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Verify ownership
    const entry = await ctx.db.get(id);
    if (!entry || entry.userId !== identity.subject) {
      throw new Error("Not found or unauthorized");
    }

    await ctx.db.patch(id, updates);
  },
});

// DELETE: Remove entry
export const remove = mutation({
  args: { id: v.id("entries") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const entry = await ctx.db.get(id);
    if (!entry || entry.userId !== identity.subject) {
      throw new Error("Not found or unauthorized");
    }

    await ctx.db.delete(id);
  },
});
```

**Create similar files for each table**:
- `entries.ts`
- `goals.ts`
- `analytics.ts` (if you have computed data/aggregations)

---

## Phase 4: Connect UI to Backend (One Feature at a Time)

**Goal**: Make the app functional by connecting one feature at a time.

### Step 4.1: Start with Core Feature

**Pick the most important feature** (usually "Create Entry" or similar).

Connect that ONE page to Convex:

**Example**: Make the "Add Entry" form work

**Before** (static):
```tsx
export default function AddEntry() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Does nothing
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

**After** (connected):
```tsx
import { useMutation } from "convex/react";
import { api } from "@packages/backend/convex/_generated/api";

export default function AddEntry() {
  const createEntry = useMutation(api.entries.create);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    await createEntry({
      title: formData.get("title"),
      date: Date.now(),
      rating: Number(formData.get("rating")),
      category: formData.get("category"),
      notes: formData.get("notes") || undefined,
    });

    // Show success message, redirect, etc.
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

**Test it end-to-end**:
1. Fill out the form
2. Submit
3. Check Convex dashboard - see the data in the database
4. Go to the list page - see the data appear

---

### Step 4.2: Add Features Incrementally

Connect features one at a time in priority order:

1. **Core feature** (create/add)
2. **List view** (show all entries)
3. **Detail view** (show one entry)
4. **Edit/Delete** (modify entries)
5. **Analytics/Insights** (computed data)
6. **Settings** (user preferences)
7. **Advanced features** (search, filters, export, etc.)

**Example**: Connect List View

```tsx
import { useQuery } from "convex/react";
import { api } from "@packages/backend/convex/_generated/api";

export default function FeatureList() {
  const entries = useQuery(api.entries.list);

  if (!entries) return <div>Loading...</div>;

  return (
    <div>
      <h1>My Entries</h1>
      {entries.map(entry => (
        <div key={entry._id}>
          <h3>{entry.title}</h3>
          <p>{new Date(entry.date).toLocaleDateString()} - Rating: {entry.rating}/5</p>
        </div>
      ))}
    </div>
  );
}
```

---

### Why One Feature at a Time?

- ✅ You can test as you go
- ✅ Easier to debug (you know what you just changed)
- ✅ You'll see patterns and can copy-paste similar implementations
- ✅ You ship working features incrementally
- ✅ Less overwhelming than trying to do everything at once

---

## Phase 5: Monetization (Optional)

**Goal**: Add subscription paywalls to monetize your app.

### Step 5.1: Define Free vs Pro Features

**Free Tier**:
- Basic feature creation (e.g., up to 10 entries/month)
- View list of entries
- Basic insights

**Pro Tier** ($10/month):
- Unlimited entries
- Advanced analytics
- Export data (CSV, PDF)
- Custom categories/tags
- Priority support

---

### Step 5.2: Add Paywalls

Use the existing Stripe integration (already in template).

**Check Subscription Status**:
```tsx
import { useQuery } from "convex/react";
import { api } from "@packages/backend/convex/_generated/api";

export default function AdvancedAnalytics() {
  const subscription = useQuery(api.stripe.subscriptions.getCurrentUserSubscription);
  const hasActiveSubscription = subscription?.status === "active";

  if (!hasActiveSubscription) {
    return (
      <div className="paywall">
        <h2>Unlock Advanced Analytics</h2>
        <p>Upgrade to Pro to see detailed insights, trends, and export your data.</p>
        <CheckoutButton priceKey="PRO_MONTHLY">
          Upgrade to Pro - $10/month
        </CheckoutButton>
      </div>
    );
  }

  return (
    <div>
      {/* Advanced analytics content */}
    </div>
  );
}
```

**Create Helper Hook** (optional):
```tsx
// hooks/useSubscription.ts
import { useQuery } from "convex/react";
import { api } from "@packages/backend/convex/_generated/api";

export function useSubscription() {
  const subscription = useQuery(api.stripe.subscriptions.getCurrentUserSubscription);

  return {
    isLoading: subscription === undefined,
    isPro: subscription?.status === "active",
    subscription,
  };
}

// Usage in components:
const { isPro, isLoading } = useSubscription();
```

**Gate Features at Backend Level**:
```typescript
// packages/backend/convex/analytics.ts
export const advancedInsights = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Check subscription
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .first();

    if (!subscription || subscription.status !== "active") {
      throw new Error("Pro subscription required");
    }

    // Return advanced analytics...
  },
});
```

---

## Phase 6: Onboarding Flow (CRITICAL)

**Goal**: Build the first-time user experience that gets 90% of users into the app.

> **Why This Matters**: You could build the best app in the world, but if only 20% of people complete onboarding, 80% will never see it. Conversely, epic onboarding with 90% completion means most users actually experience your app. **Onboarding determines your monetization success.**

### Why Build Onboarding AFTER the Core App?

**The Onboarding Dilemma**:
- Onboarding comes first in the user journey
- But it depends on understanding what you're onboarding people TO
- And it needs to collect data that feeds into your database

**The Solution**: Build onboarding after the core app is functional.

**Reasons**:
1. ✅ You know what data the app needs
2. ✅ You've built the screens users will eventually reach
3. ✅ Database schema exists to store onboarding data
4. ✅ You understand the user journey inside the app
5. ✅ You avoid rework (if you change the app, you'd have to rebuild onboarding)

---

### Step 6.1: Design Onboarding Flow

**Before writing code**, design the complete onboarding experience:

**Map out 20-30 steps** (typical for conversion-optimized onboarding):

**Example Onboarding Flow** (adapt to your app):
```
1-2:   Welcome screens + value proposition
3-5:   Collect basic user info (name, goals, preferences)
6-10:  Explain key features with interactive demos
11-15: Collect detailed preferences/settings
16-18: Show social proof (testimonials, ratings)
19:    Paywall - "Start Free Trial" or "Upgrade to Pro"
20:    Final confirmation → mark onboardingCompleted = true
```

**Design these screens in your design tool** (Figma, Sleek.Design):
- Keep them visually distinct from the main app
- Use progressive disclosure (one question per screen)
- Include compelling visuals and copy
- Test different paywall positions (A/B test later)

---

### Step 6.2: Database Preparation

Add onboarding-related fields to your schema:

```typescript
// packages/backend/convex/schema.ts
users: defineTable({
  userId: v.string(),
  onboardingCompleted: v.boolean(), // ← Key field!
  onboardingStep: v.optional(v.number()), // Track progress
  name: v.optional(v.string()),
  // ... other fields collected during onboarding
})
  .index("by_user", ["userId"])
  .index("by_onboarding_status", ["onboardingCompleted"]),

// Table for onboarding-specific data
userPreferences: defineTable({
  userId: v.string(),
  goal: v.optional(v.string()),
  reminderTime: v.optional(v.string()),
  notificationsEnabled: v.boolean(),
  // ... preferences collected during onboarding
})
  .index("by_user", ["userId"]),
```

**Create Convex functions**:
```typescript
// packages/backend/convex/onboarding.ts
export const completeOnboarding = mutation({
  args: {
    name: v.string(),
    goal: v.string(),
    preferences: v.object({...}),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Save user data
    await ctx.db.patch(userId, {
      onboardingCompleted: true,
      name: args.name,
    });

    // Save preferences
    await ctx.db.insert("userPreferences", {
      userId: identity.subject,
      ...args.preferences,
    });
  },
});

export const getOnboardingStatus = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .first();

    return {
      completed: user?.onboardingCompleted ?? false,
      currentStep: user?.onboardingStep ?? 0,
    };
  },
});
```

---

### Step 6.3: Build Onboarding Pages

Create a separate folder for onboarding:

**Web** (`apps/web/src/pages/onboarding/`):
```
Welcome.tsx          // Step 1: Welcome
Goals.tsx            // Step 2: Set goals
Preferences.tsx      // Step 3: Preferences
Features.tsx         // Step 4-5: Feature walkthrough
Paywall.tsx          // Step 6: Upgrade prompt
Complete.tsx         // Step 7: Completion
```

**Mobile** (`apps/native/src/screens/onboarding/`):
```
WelcomeScreen.tsx
GoalsScreen.tsx
PreferencesScreen.tsx
FeaturesScreen.tsx
PaywallScreen.tsx
CompleteScreen.tsx
```

**Example Onboarding Screen**:
```tsx
// apps/web/src/pages/onboarding/Goals.tsx
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@packages/backend/convex/_generated/api";
import { useNavigate } from "react-router-dom";

export default function Goals() {
  const [goal, setGoal] = useState("");
  const saveProgress = useMutation(api.onboarding.saveStep);
  const navigate = useNavigate();

  const handleNext = async () => {
    await saveProgress({ step: 2, data: { goal } });
    navigate("/onboarding/preferences");
  };

  return (
    <div className="onboarding-container">
      <h1>What's your main goal?</h1>
      <div className="goal-options">
        <button onClick={() => setGoal("improve")}>
          Improve my habits
        </button>
        <button onClick={() => setGoal("track")}>
          Track my progress
        </button>
        <button onClick={() => setGoal("understand")}>
          Understand patterns
        </button>
      </div>
      <button onClick={handleNext} disabled={!goal}>
        Continue
      </button>
      <div className="progress-bar">Step 2 of 7</div>
    </div>
  );
}
```

---

### Step 6.4: Onboarding Routing Logic

Add smart routing to show onboarding only for new users:

**Web** (`apps/web/src/App.tsx`):
```tsx
import { useQuery } from "convex/react";
import { api } from "@packages/backend/convex/_generated/api";
import { Navigate, Routes, Route } from "react-router-dom";
import OnboardingFlow from "./pages/onboarding/OnboardingFlow";

function App() {
  const onboardingStatus = useQuery(api.onboarding.getOnboardingStatus);

  // Show loading while checking onboarding status
  if (onboardingStatus === undefined) {
    return <div>Loading...</div>;
  }

  // New users → onboarding
  // Returning users → main app
  const hasCompletedOnboarding = onboardingStatus?.completed ?? false;

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />

      {!hasCompletedOnboarding ? (
        // First-time users see onboarding
        <>
          <Route path="/onboarding/*" element={<OnboardingFlow />} />
          <Route path="*" element={<Navigate to="/onboarding/welcome" replace />} />
        </>
      ) : (
        // Returning users see main app
        <>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/entries" element={<ProtectedRoute><FeatureList /></ProtectedRoute>} />
          {/* ... other app routes */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </>
      )}
    </Routes>
  );
}
```

**Mobile** (`apps/native/src/navigation/Navigation.tsx`):
```tsx
import { useQuery } from "convex/react";
import { api } from "@packages/backend/convex/_generated/api";

export default function Navigation() {
  const onboardingStatus = useQuery(api.onboarding.getOnboardingStatus);

  if (onboardingStatus === undefined) {
    return <LoadingScreen />;
  }

  const hasCompletedOnboarding = onboardingStatus?.completed ?? false;

  return (
    <NavigationContainer>
      {!hasCompletedOnboarding ? (
        <OnboardingNavigator />
      ) : (
        <AppNavigator />
      )}
    </NavigationContainer>
  );
}
```

---

### Step 6.5: Add Paywall to Onboarding

**Integrate Stripe paywall** at the optimal point in onboarding (usually 60-80% through):

```tsx
// apps/web/src/pages/onboarding/Paywall.tsx
import CheckoutButton from "@/components/stripe/CheckoutButton";
import { useMutation } from "convex/react";
import { api } from "@packages/backend/convex/_generated/api";
import { useNavigate } from "react-router-dom";

export default function Paywall() {
  const completeOnboarding = useMutation(api.onboarding.completeOnboarding);
  const navigate = useNavigate();

  const handleSkip = async () => {
    // User continues with free version
    await completeOnboarding({ tier: "free" });
    navigate("/dashboard");
  };

  return (
    <div className="paywall-container">
      <h1>Unlock Pro Features</h1>
      <div className="benefits">
        <div className="benefit">✓ Unlimited entries</div>
        <div className="benefit">✓ Advanced analytics</div>
        <div className="benefit">✓ Export your data</div>
        <div className="benefit">✓ Priority support</div>
      </div>

      <div className="pricing">
        <CheckoutButton
          priceKey="PRO_MONTHLY"
          onSuccess={() => navigate("/dashboard")}
        >
          Start 7-Day Free Trial - $10/month
        </CheckoutButton>
      </div>

      <button className="skip-button" onClick={handleSkip}>
        Continue with Free Version
      </button>
    </div>
  );
}
```

---

### Step 6.6: Test Complete User Flow

**Test the entire journey**:

1. **Sign up** with Clerk (new user)
2. **Go through onboarding** (all 20-30 steps)
3. **Hit the paywall** → test both "Upgrade" and "Skip" paths
4. **Land in the main app** with `onboardingCompleted = true`
5. **Sign out and sign back in** → should skip onboarding and go straight to app

**Verify in Convex Dashboard**:
- Check `users` table has `onboardingCompleted = true`
- Check onboarding data was saved correctly
- Check subscription was created (if they upgraded)

---

## Phase 7: Testing & Refinement

**Goal**: Optimize conversion and fix bugs before launch.

### Step 7.1: User Testing

**Test with 5-10 real people** (friends, family, beta users):

**What to observe**:
- Where do they get confused?
- Which onboarding steps take too long?
- Do they understand the value proposition?
- At what point do they want to quit?
- Does the paywall feel too early/late?

**Tools**:
- **Screen recording** (Loom, QuickTime) - watch them use the app
- **Think-aloud protocol** - ask them to narrate their thoughts
- **Post-test interview** - "What was confusing?" "Would you pay for this?"

---

### Step 7.2: Add Analytics

**Track user behavior** to identify drop-off points:

**Integrate analytics** (choose one):
- [Posthog](https://posthog.com/) (recommended - open source, privacy-friendly)
- [Mixpanel](https://mixpanel.com/)
- [Amplitude](https://amplitude.com/)

**Key events to track**:
```typescript
// Example with Posthog
analytics.track("onboarding_step_completed", {
  step: 2,
  stepName: "goals",
  timeSpent: 15, // seconds
});

analytics.track("paywall_viewed", {
  location: "onboarding",
  step: 6,
});

analytics.track("subscription_started", {
  plan: "PRO_MONTHLY",
  source: "onboarding",
});

analytics.track("onboarding_completed", {
  totalTime: 180, // seconds
  tier: "free" | "pro",
});
```

**Create funnel analysis**:
- How many people start onboarding?
- How many complete each step?
- How many see the paywall?
- How many convert to paid?
- Where do most people drop off?

---

### Step 7.3: A/B Test Paywalls

**Test different variations** to maximize conversion:

**Variables to test**:
- Paywall position (step 5 vs step 7 vs step 10)
- Pricing ($8/month vs $10/month vs $12/month)
- Trial length (3 days vs 7 days vs 14 days)
- Copy ("Start Free Trial" vs "Unlock Pro Features")
- Benefits shown (3 vs 5 vs 7 bullet points)

**Example A/B test**:
```typescript
// Randomly assign variant
const variant = Math.random() < 0.5 ? "A" : "B";

// Track which variant user saw
analytics.track("paywall_variant_shown", {
  variant,
  priceShown: variant === "A" ? 8 : 10,
});

// Show different price based on variant
const price = variant === "A" ? "PRICE_8_MONTHLY" : "PRICE_10_MONTHLY";
```

**Measure**:
- Conversion rate (% who subscribe)
- Revenue per user
- Lifetime value (LTV)

---

### Step 7.4: Iterate Based on Data

**Make data-driven improvements**:

1. **Fix drop-off points** - if 50% quit at step 5, simplify or remove it
2. **Optimize paywall** - use the variant that converts best
3. **Improve copy** - rewrite confusing instructions
4. **Speed up onboarding** - reduce steps if it's too long
5. **Add value** - show more benefits if conversion is low

**Goal**: Get onboarding completion rate to **70-90%** and paywall conversion to **10-30%**.

---

## Phase 8: Production Deployment

**Goal**: Deploy your app to production (web + backend).

### Step 8.1: Deploy Convex Backend to Production

```bash
cd packages/backend
npx convex deploy
```

This creates a **production deployment** separate from your dev environment.

**Copy the production URL** (e.g., `https://happy-animal-123.convex.cloud`)

---

### Step 8.2: Update Production Environment Variables

**In Convex Dashboard** (production environment):

1. Go to Settings → Environment Variables
2. Add all variables:
   - `CLERK_ISSUER_URL` (production Clerk)
   - `STRIPE_SECRET_KEY` (LIVE key, starts with `sk_live_`)
   - `STRIPE_WEBHOOK_SECRET` (production webhook)
   - `STRIPE_PRICE_ID_PRO_MONTHLY` (live price ID)
   - `STRIPE_PRICE_ID_PRO_YEARLY` (live price ID)
   - `SITE_URL` (your production domain, e.g., `https://myapp.com`)

---

### Step 8.3: Switch Stripe to Live Mode

1. **Stripe Dashboard** → Toggle "View test data" OFF
2. **Create products and prices** in live mode (same as test mode)
3. **Copy live price IDs** and update Convex env vars
4. **Create webhook endpoint** for production:
   - URL: `https://happy-animal-123.convex.site/stripe/webhook` (note `.site` not `.cloud`)
   - Events: Same as before
   - Copy webhook secret → add to Convex

**Test with real card**:
- Use your own card
- Subscribe to verify checkout works
- Check webhook events arrive
- Cancel subscription to test cancellation flow

---

### Step 8.4: Configure Production Clerk

1. **Create production Clerk application** (or use the same one)
2. **Update environment variables**:
   - `CLERK_ISSUER_URL` → Add to Convex production
   - `CLERK_PUBLISHABLE_KEY` → Will use in web app build
3. **Add production domain** to Clerk allowed URLs

---

### Step 8.5: Build and Deploy Web App

**Build static site** with production Convex URL:

```bash
cd packages/backend
npx convex deploy --cmd 'cd ../../apps/web && npm run build' --cmd-url-env-var-name VITE_PUBLIC_CONVEX_URL
```

This:
1. Deploys Convex backend
2. Builds web app with production URL injected
3. Outputs to `apps/web/dist/`

**Deploy `dist/` folder** to static hosting:

**Options**:
- **Vercel**: `npx vercel --prod`
- **Netlify**: Drag `dist/` to Netlify dashboard or `netlify deploy --prod`
- **Cloudflare Pages**: `npx wrangler pages publish dist`

**Add environment variables** to hosting platform:
- `VITE_CLERK_PUBLISHABLE_KEY` (production key)
- `VITE_PUBLIC_CONVEX_URL` (auto-injected during build, but verify)
- `VITE_STRIPE_PUBLISHABLE_KEY` (live key, starts with `pk_live_`)

---

### Step 8.6: Test Production App

**Complete end-to-end test** in production:

1. Visit your production URL
2. Sign up (creates real Clerk user)
3. Complete onboarding
4. Create some entries
5. Subscribe with real card
6. Check data in Convex production dashboard
7. Check subscription in Stripe live dashboard
8. Test all major features
9. Cancel subscription
10. Verify cancellation works

---

## Phase 9: Mobile App Deployment

**Goal**: Submit native apps to App Store and Google Play.

### Step 9.1: Update App Configuration

**iOS** (`apps/native/app.json`):
```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp",
      "buildNumber": "1"
    }
  }
}
```

**Android** (`apps/native/app.json`):
```json
{
  "expo": {
    "android": {
      "package": "com.yourcompany.yourapp",
      "versionCode": 1
    }
  }
}
```

---

### Step 9.2: Build Native Apps

**Install EAS CLI**:
```bash
npm install -g eas-cli
```

**Configure builds**:
```bash
cd apps/native
eas build:configure
```

**Build iOS app**:
```bash
eas build --platform ios --profile production
```

**Build Android app**:
```bash
eas build --platform android --profile production
```

This creates production `.ipa` (iOS) and `.aab` (Android) files.

---

### Step 9.3: Prepare App Store Assets

**Required for both stores**:
- App icon (1024x1024px)
- Screenshots (various sizes)
- App description
- Keywords (for search)
- Privacy policy URL
- Support URL

**iOS-specific**:
- App Store screenshots (6.5", 5.5", 12.9" iPad)
- App preview video (optional)

**Android-specific**:
- Google Play screenshots (phone, 7" tablet, 10" tablet)
- Feature graphic (1024x500px)

---

### Step 9.4: Submit to App Stores

**iOS (App Store Connect)**:
1. Create app in App Store Connect
2. Upload `.ipa` file (via EAS or Xcode)
3. Fill out app information
4. Add screenshots and description
5. Submit for review

**Android (Google Play Console)**:
1. Create app in Play Console
2. Upload `.aab` file
3. Fill out store listing
4. Add screenshots and description
5. Submit for review

**Review time**:
- iOS: 1-3 days typically
- Android: Few hours to 1 day

---

## Phase 10: Post-Launch

**Goal**: Monitor, fix bugs, and iterate based on real user data.

### Step 10.1: Monitor Analytics

**Daily checks** (first week):
- New signups
- Onboarding completion rate
- Paywall conversion rate
- Subscription revenue
- User retention (day 1, day 7, day 30)

**Weekly checks** (ongoing):
- Monthly recurring revenue (MRR)
- Churn rate (% who cancel)
- Customer acquisition cost (CAC)
- Lifetime value (LTV)

**Tools**:
- Analytics dashboard (Posthog, Mixpanel)
- Stripe dashboard (revenue)
- Convex dashboard (database growth)

---

### Step 10.2: Fix Critical Bugs

**Priority bugs** (fix immediately):
- Crashes or data loss
- Payment failures
- Authentication issues
- Broken core features

**Non-critical bugs** (fix next release):
- UI glitches
- Minor UX improvements
- Edge cases

**Process**:
1. User reports bug → create issue
2. Reproduce locally
3. Fix and test
4. Deploy fix to production
5. Notify user

---

### Step 10.3: Iterate Based on Feedback

**Collect user feedback**:
- In-app feedback form
- App Store reviews
- Email support
- User interviews

**Common improvements**:
- Simplify onboarding (if completion rate < 70%)
- Adjust paywall position (if conversion < 10%)
- Add requested features
- Improve unclear UI
- Fix confusing copy

**Prioritize** based on:
- Impact on revenue
- Number of users affected
- Ease of implementation

---

### Step 10.4: Plan Version 2

**After 2-4 weeks** of real usage data, plan next features:

**Potential v2 features**:
- Social sharing
- Integrations (Apple Health, Google Fit, etc.)
- Advanced analytics
- Team/family plans
- API access
- White-label options

**Release cycle**:
- Every 2-4 weeks for web
- Every 4-6 weeks for mobile (App Store review time)

---

## 🎯 Summary: The Complete Workflow

| Phase | What You're Building | Time Estimate |
|-------|---------------------|---------------|
| **1. Foundation** | Design exports + database schema | 1-2 days |
| **2. UI Shell** | All pages (static, no data) | 3-5 days |
| **3. Backend** | Convex schema + functions | 2-3 days |
| **4. Features** | Connect UI to backend, one at a time | 1-2 weeks |
| **5. Monetization** | Stripe paywalls in main app | 1-2 days |
| **6. Onboarding** | First-time user experience | 3-5 days |
| **7. Testing** | User testing, analytics, A/B tests | 3-5 days |
| **8. Production** | Deploy web app + backend | 1 day |
| **9. Mobile** | App Store + Google Play submission | 2-3 days |
| **10. Post-Launch** | Monitor, fix, iterate | Ongoing |

**Total**: 3-6 weeks from start to production.

---

## 🚀 Quick Start Checklist

**Initial Setup**:
- [ ] Clone this template repo
- [ ] Run `npm install`
- [ ] Configure Clerk authentication
- [ ] Configure Convex backend
- [ ] (Optional) Configure Stripe payments

**Phase 1-5** (Core App):
- [ ] Export all app designs (not onboarding yet)
- [ ] Complete database schema planning
- [ ] Build all pages as static UI
- [ ] Implement Convex backend
- [ ] Connect features one at a time
- [ ] Add Stripe paywalls in main app

**Phase 6-7** (Onboarding & Testing):
- [ ] Design onboarding flow (20-30 steps)
- [ ] Build onboarding pages
- [ ] Add onboarding routing logic
- [ ] Place paywall in onboarding
- [ ] Test with 5-10 real users
- [ ] Add analytics tracking
- [ ] A/B test paywall variations

**Phase 8-9** (Production):
- [ ] Deploy to production (web + backend)
- [ ] Switch Stripe to live mode
- [ ] Test with real payment
- [ ] Build mobile apps (EAS)
- [ ] Submit to App Store
- [ ] Submit to Google Play

**Phase 10** (Post-Launch):
- [ ] Monitor analytics daily (first week)
- [ ] Fix critical bugs immediately
- [ ] Iterate based on user feedback
- [ ] Plan v2 features

---

## 💡 Pro Tips

### Development
1. **Don't skip Phase 1** - Planning the database correctly saves you weeks of refactoring
2. **Build all pages in Phase 2** - It's faster to do them all at once than piecemeal
3. **Start with one feature in Phase 4** - Don't try to connect everything at once
4. **Test as you go** - After each feature, test it end-to-end
5. **Use the existing Stripe integration** - Payments are already set up, just add the paywalls

### Onboarding (CRITICAL)
6. **Build onboarding AFTER the core app** - You need to know what you're onboarding people TO
7. **Target 70-90% completion rate** - This is more important than perfect features
8. **Place paywall at 60-80% through onboarding** - After users see value, before they're tired
9. **Use progressive disclosure** - One question per screen, don't overwhelm
10. **A/B test everything** - Price, position, copy, trial length

### Production
11. **Test production with real money** - Use your own card to verify the full flow works
12. **Monitor analytics daily** - First week is critical for catching issues
13. **Respond to App Store reviews** - Especially negative ones, shows you care
14. **Keep web and mobile in sync** - Deploy features to both platforms
15. **Plan for iteration** - Your v1 won't be perfect, that's okay

### Monetization
16. **Free tier should be limited but functional** - Users need to see value before paying
17. **Pro tier should be obviously better** - Make the benefits clear and compelling
18. **Track the right metrics** - MRR, churn rate, LTV, not just signups
19. **Optimize for revenue, not downloads** - 100 paying customers > 10,000 free users
20. **Consider annual plans** - Higher LTV and better cash flow

---

## 📚 Additional Resources

- [CLAUDE.md](../CLAUDE.md) - Project overview and troubleshooting
- [ENV_MASTER.md](../ENV_MASTER.md) - Environment variable setup
- [STRIPE_SETUP.md](../STRIPE_SETUP.md) - Stripe integration guide
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues and fixes

---

**Ready to build? Start with Phase 1! 🎉**
