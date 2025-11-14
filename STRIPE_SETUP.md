# 💳 Stripe Payment Integration Setup

Complete guide to get Stripe payments working in your app.

---

## ⏱️ Time Required: ~10 minutes

---

## 📋 Prerequisites

- Stripe account ([sign up free](https://dashboard.stripe.com/register))
- Convex backend already configured
- App deployed or running locally

---

## 🚀 Quick Setup Steps

### Step 1️⃣: Create Stripe Account & Get API Keys

1. **Go to**: [Stripe Dashboard](https://dashboard.stripe.com)
2. **Navigate to**: Developers → API Keys
3. **Copy these keys**:

| Key Name | Starts With | Where to Use |
|----------|-------------|--------------|
| **Publishable key** | `pk_test_xxx` | `apps/web/.env.local` |
| **Secret key** | `sk_test_xxx` | Convex Environment Variables |

⚠️ **Important**: Start in **test mode** (keys start with `_test_`). Switch to live mode only when ready for production.

---

### Step 2️⃣: Create Products & Prices

1. **Go to**: [Stripe Products](https://dashboard.stripe.com/products)
2. **Click**: "+ Add product"
3. **Create your pricing plan** (example):
   - **Name**: Pro Plan
   - **Description**: Full access to all features
   - **Pricing**:
     - Monthly: $10/month → Save the **Price ID** (starts with `price_xxx`)
     - Yearly: $100/year → Save the **Price ID**

4. **Copy the Price IDs** - You'll need these for configuration.

---

### Step 3️⃣: Set Up Webhook Endpoint

Webhooks keep your database in sync with Stripe events.

#### 3.1 - Get Your Webhook URL

**Format**: `https://YOUR_DEPLOYMENT_NAME.convex.cloud/stripe/webhook`

To find your deployment URL:
```bash
# If Convex is running, check:
cat packages/backend/.env.local
# Look for: CONVEX_URL=https://your-deployment.convex.cloud

# Webhook URL is:
https://your-deployment.convex.cloud/stripe/webhook
```

#### 3.2 - Configure Webhook in Stripe

1. **Go to**: [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. **Click**: "+ Add endpoint"
3. **Endpoint URL**: Paste your webhook URL
4. **Events to listen**:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

5. **Click**: "Add endpoint"
6. **Click** on your newly created webhook
7. **Copy**: The "Signing secret" (starts with `whsec_xxx`)

---

### Step 4️⃣: Add Environment Variables

#### 4.1 - Convex Environment Variables

1. **Go to**: [Convex Dashboard](https://dashboard.convex.dev)
2. **Navigate to**: Your Project → Settings → Environment Variables
3. **Add these variables**:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `STRIPE_SECRET_KEY` | Your secret key from Step 1 | `sk_test_xxx...` |
| `STRIPE_WEBHOOK_SECRET` | Your webhook secret from Step 3 | `whsec_xxx...` |
| `SITE_URL` (optional) | Your app URL | `http://localhost:5173` or production URL |

**Optional Price IDs** (can also hardcode in config):
| Variable Name | Value |
|--------------|-------|
| `STRIPE_PRICE_ID_PRO_MONTHLY` | Monthly price ID from Step 2 |
| `STRIPE_PRICE_ID_PRO_YEARLY` | Yearly price ID from Step 2 |

#### 4.2 - Web App Environment Variable

Update `apps/web/.env.local`:

```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx...

# Existing variables (keep these):
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxx...
VITE_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

---

### Step 5️⃣: Update Price IDs in Code

Open `packages/backend/convex/stripe/config.ts`:

```typescript
// Find this section and update with YOUR price IDs:
export const PRICE_IDS = {
  PRO_MONTHLY: "price_1234567890abcdef",  // ← Replace with your monthly price ID
  PRO_YEARLY: "price_0987654321fedcba",   // ← Replace with your yearly price ID
} as const;
```

**Alternative**: Use environment variables (recommended for multiple environments):
- Set `STRIPE_PRICE_ID_PRO_MONTHLY` in Convex dashboard
- Set `STRIPE_PRICE_ID_PRO_YEARLY` in Convex dashboard
- The config will use these automatically

---

### Step 6️⃣: Install Dependencies & Deploy

```bash
# From root directory:
npm install

# Deploy to Convex (if not auto-deploying):
cd packages/backend
npx convex dev
```

---

### Step 7️⃣: Test the Integration

#### Test Cards (Stripe Test Mode)

| Card Number | Result |
|------------|--------|
| `4242 4242 4242 4242` | Success |
| `4000 0000 0000 0002` | Decline |
| `4000 0025 0000 3155` | Requires authentication (3D Secure) |

**Card Details** (any valid values):
- **Expiry**: Any future date (e.g., 12/34)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any 5 digits (e.g., 12345)

#### Testing Flow

1. **Start your app**: `npm run dev`
2. **Sign in** with Clerk
3. **Use** the checkout button component:
   ```tsx
   import CheckoutButton from '@/components/stripe/CheckoutButton'

   <CheckoutButton priceKey="PRO_MONTHLY">
     Subscribe Now
   </CheckoutButton>
   ```
4. **Enter** test card: `4242 4242 4242 4242`
5. **Complete** checkout
6. **Verify**:
   - You're redirected back to your app
   - Subscription appears in Convex database (check dashboard)
   - Subscription status shows in your app

---

## 🛠️ Using Stripe Components

### Basic Checkout Flow

```tsx
import CheckoutButton from '@/components/stripe/CheckoutButton'

export default function PricingPage() {
  return (
    <div>
      <h2>Pro Plan - $10/month</h2>
      <CheckoutButton priceKey="PRO_MONTHLY">
        Subscribe to Pro
      </CheckoutButton>
    </div>
  )
}
```

### Show Subscription Status

```tsx
import SubscriptionStatus from '@/components/stripe/SubscriptionStatus'

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <SubscriptionStatus />
    </div>
  )
}
```

### Customer Portal (Manage Subscription)

```tsx
import PortalButton from '@/components/stripe/PortalButton'

export default function SettingsPage() {
  return (
    <div>
      <h2>Billing Settings</h2>
      <PortalButton>
        Manage Subscription
      </PortalButton>
    </div>
  )
}
```

### Check if User Has Access

```tsx
import { useQuery } from 'convex/react'
import { api } from '@packages/backend/convex/_generated/api'

export default function PremiumFeature() {
  const hasSubscription = useQuery(api.stripe.subscriptions.hasActive)

  if (!hasSubscription) {
    return <div>Upgrade to Pro to access this feature</div>
  }

  return <div>Premium content here!</div>
}
```

---

## 🎨 Example: Simple Pricing Page

Create `apps/web/src/pages/Pricing.tsx`:

```tsx
import Header from '@/components/Header'
import CheckoutButton from '@/components/stripe/CheckoutButton'
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'

export default function Pricing() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Pricing</h1>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly Plan */}
          <div className="border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-2">Pro Monthly</h2>
            <div className="text-4xl font-bold mb-4">$10<span className="text-lg text-gray-600">/month</span></div>
            <ul className="space-y-2 mb-8">
              <li>✓ All features</li>
              <li>✓ Unlimited access</li>
              <li>✓ Priority support</li>
            </ul>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full px-6 py-3 bg-gray-300 text-gray-700 rounded-lg">
                  Sign in to Subscribe
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <CheckoutButton priceKey="PRO_MONTHLY" className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Subscribe Monthly
              </CheckoutButton>
            </SignedIn>
          </div>

          {/* Yearly Plan */}
          <div className="border-2 border-blue-600 rounded-lg p-8 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
              Best Value
            </div>
            <h2 className="text-2xl font-bold mb-2">Pro Yearly</h2>
            <div className="text-4xl font-bold mb-4">$100<span className="text-lg text-gray-600">/year</span></div>
            <ul className="space-y-2 mb-8">
              <li>✓ All features</li>
              <li>✓ Unlimited access</li>
              <li>✓ Priority support</li>
              <li>✓ Save $20/year</li>
            </ul>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full px-6 py-3 bg-gray-300 text-gray-700 rounded-lg">
                  Sign in to Subscribe
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <CheckoutButton priceKey="PRO_YEARLY" className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Subscribe Yearly
              </CheckoutButton>
            </SignedIn>
          </div>
        </div>
      </main>
    </div>
  )
}
```

Add route in `apps/web/src/App.tsx`:

```tsx
import Pricing from './pages/Pricing'

// Add this route:
<Route path="/pricing" element={<Pricing />} />
```

---

## 🔄 Going to Production

### 1. Switch to Live Mode

1. **Stripe Dashboard** → Toggle from "Test mode" to "Live mode"
2. **Get new API keys**:
   - Live publishable key (starts with `pk_live_`)
   - Live secret key (starts with `sk_live_`)

### 2. Create Production Products

1. Create same products/prices in live mode
2. Copy new live price IDs

### 3. Update Environment Variables

- Replace test keys with live keys
- Update price IDs with live price IDs
- Update webhook endpoint to production URL

### 4. Update Webhook

1. Create new webhook endpoint for production
2. Use production URL: `https://your-production-deployment.convex.cloud/stripe/webhook`
3. Copy new live webhook secret

---

## 🐛 Troubleshooting

### "No price ID found"
- ✅ Check you updated PRICE_IDS in `convex/stripe/config.ts`
- ✅ Or set environment variables in Convex dashboard

### "Webhook signature verification failed"
- ✅ Check `STRIPE_WEBHOOK_SECRET` matches your webhook in Stripe dashboard
- ✅ Make sure you're using the correct environment (test vs live)

### "No Stripe customer found"
- ✅ User needs to complete checkout first
- ✅ Check webhook events are being received (Stripe dashboard → Webhooks → click your endpoint → see logs)

### Webhook not receiving events
- ✅ Check webhook URL is correct
- ✅ Check Convex is deployed and running
- ✅ Check webhook secret is added to Convex environment variables
- ✅ Test webhook with Stripe CLI: `stripe listen --forward-to your-webhook-url`

---

## 📚 Resources

- **Stripe Dashboard**: https://dashboard.stripe.com
- **Stripe Docs**: https://stripe.com/docs
- **Test Cards**: https://stripe.com/docs/testing
- **Convex Docs**: https://docs.convex.dev
- **Webhook Events**: https://stripe.com/docs/api/events

---

**🎉 You're all set! Your app now has a fully functioning payment system.**
