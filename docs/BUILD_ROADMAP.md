# 🚀 Build Roadmap: From Template to App Store

Your simple step-by-step guide for building a mobile app from this template.

---

## Phase 0: Preview Setup

Get your mobile development environment ready so you can see what you're building.

**0.1** - Install Expo Go app on your phone (from App Store or Google Play)

**0.2** - Start the template: `cd apps/native && npm run dev`

**0.3** - Scan the QR code with your phone to see the app running

**0.4** - Optional: Set up iOS Simulator (Mac only) or Android Emulator to preview on desktop

**Why this matters**: You need to actually see your mobile app as you build it. Desktop simulator is fast for quick checks, but your real phone shows the true experience.

---

## Phase 1: Foundation Setup

Clone the template and get all the essential services connected.

**1.1** - Clone this template repo: `git clone [your-repo-url]`

**1.2** - Install everything: `npm install` from the root folder

**1.3** - Set up Clerk authentication:
- Create account at clerk.com
- Create new application
- Enable Google and Apple social login (required for mobile)
- Copy publishable key and issuer URL

**1.4** - Set up Convex backend:
- Run `npm run setup --workspace packages/backend`
- This creates your database and gives you a URL
- Copy the Convex URL from `packages/backend/.env.local`

**1.5** - Set up Stripe payments (optional but recommended):
- Create account at stripe.com
- Get your test keys (publishable and secret)
- Create two products: Monthly ($10) and Yearly ($100)
- Save the price IDs

**1.6** - Add environment variables:
- Create `apps/native/.env.local` with your Clerk and Convex keys
- Add Stripe keys to Convex dashboard
- See ENV_MASTER.md for the complete list

**1.7** - Test it works:
- Start the app: `npm run dev` from root
- Sign in with Google or Apple on your phone
- You should see the dashboard screen

**Why this matters**: Everything needs to be connected before you start building your actual app. Get this right once and you won't have to think about it again.

---

## Phase 2: Design Upload

Upload all your app screens from Sleek.Design (or wherever you designed them).

**2.1** - Export all screens from Sleek.Design as React Native code

**2.2** - Create a folder: `apps/native/src/screens/imported/`

**2.3** - Copy all exported screen files into this folder

**2.4** - Create a simple list somewhere to see all your screens:
- This helps you visualize what you're building
- Just a temporary navigation list

**Why this matters**: You designed the app for a reason. Having all the screens ready means you can focus on making them work, not designing them from scratch.

---

## Phase 3: Planning Conversation with Claude

Have a detailed conversation with Claude Code about your app structure.

**3.1** - Open Claude Code and share all your imported screens

**3.2** - Walk through each user journey:
- "User opens app → sees this screen → taps this button → goes here"
- "User creates a [thing] → fills out this form → saves → sees it in the list"

**3.3** - Explain all the data:
- What information does the user enter?
- What does each screen need to display?
- How does data connect between screens?

**3.4** - Ask Claude to design your database schema:
- Claude will create tables, fields, and relationships
- This goes in `packages/backend/convex/schema.ts`

**3.5** - Review and approve the schema:
- Make sure it covers all your app's needs
- This is the foundation everything else builds on

**Why this matters**: This is the most important phase. Get the database right and everything else is easy. Get it wrong and you'll be refactoring for weeks. Claude needs to understand your entire app vision to build the right structure.

---

## Phase 4: Build Static Screens

Turn all your imported designs into actual app screens that you can navigate between.

**4.1** - Create screen files in `apps/native/src/screens/`:
- Move each imported screen from the temporary folder
- Set up React Navigation to connect them all

**4.2** - Use hardcoded fake data:
- If a screen shows a list, use 3-5 fake items
- If it shows user info, make up a fake name and email
- Don't connect to the database yet

**4.3** - Add all navigation:
- Every button should go to the right screen
- You should be able to tap through your entire app

**4.4** - Test the complete flow:
- Navigate through every screen
- Make sure nothing crashes
- Verify all the designs look right on your phone

**Why this matters**: Now you can actually "use" your app even though it doesn't save any real data yet. This helps you spot design problems and understand the full user experience before worrying about databases.

---

## Phase 5: Build the Backend

Implement the database schema and create all the backend functions.

**5.1** - Add the schema Claude designed to `packages/backend/convex/schema.ts`

**5.2** - Create backend files for each data type:
- Example: `entries.ts`, `goals.ts`, `analytics.ts`
- Each file has functions to get, create, update, and delete data

**5.3** - Ask Claude to write these files:
- Share your schema
- Describe what each function should do
- Claude will write all the backend code

**5.4** - Test in Convex dashboard:
- Go to dashboard.convex.dev
- Run your functions manually
- Verify they work before connecting to the app

**Why this matters**: The backend is separate from the app screens. Build it completely and test it separately. Then connecting them is just a simple step.

---

## Phase 6: Connect Screens to Backend

Replace the fake data with real database connections, one screen at a time.

**6.1** - Start with the most important screen (usually "Create [Thing]"):
- Replace fake form submission with real Convex mutation
- Test: Create something → check Convex dashboard → see the data saved

**6.2** - Connect the list screen next:
- Replace fake array with Convex query
- Test: See the thing you just created appear in the list

**6.3** - Connect detail screens:
- Show real data for each item
- Add edit and delete buttons

**6.4** - Connect the rest one by one:
- Settings screen
- Analytics screen
- Any other screens

**6.5** - Test the complete flow after each connection:
- Don't move to the next screen until the current one works perfectly

**Why this matters**: Doing one screen at a time means you always know what broke if something stops working. It's also motivating to see features come alive one by one.

---

## Phase 7: Add Paywalls

Add subscription paywalls to monetize your app (if you set up Stripe).

**7.1** - Decide what's free vs paid:
- Free: Basic features, limited usage
- Pro: Advanced features, unlimited usage

**7.2** - Add paywall screens:
- Use the Stripe components that are already in the template
- Show benefits of upgrading
- Add "Start Free Trial" button

**7.3** - Lock pro features:
- Check subscription status before showing pro screens
- Show upgrade prompt if user is free tier

**7.4** - Test the payment flow:
- Use Stripe test card: 4242 4242 4242 4242
- Complete checkout
- Verify subscription appears in Convex and Stripe dashboards

**Why this matters**: If you plan to make money, build the payment system before onboarding. That way you can test the entire flow including payments.

---

## Phase 8: Build Onboarding

Create the first-time user experience that gets people using your app.

**8.1** - Design 15-20 onboarding screens:
- Welcome + value proposition (2-3 screens)
- Collect user preferences (5-7 screens)
- Explain key features (5-7 screens)
- Show paywall with free trial offer (1 screen)
- Final confirmation screen

**8.2** - Build onboarding screens in `apps/native/src/screens/onboarding/`

**8.3** - Add onboarding routing logic:
- New users see onboarding first
- After completing, they see the main app
- Returning users skip straight to the main app

**8.4** - Track completion in database:
- Add `onboardingCompleted` field to users table
- Set to true when they finish

**8.5** - Test the full user journey:
- Sign up as new user
- Go through all onboarding screens
- Hit the paywall
- Land in the main app
- Sign out and back in (should skip onboarding)

**Why this matters**: Great onboarding gets 70-90% of people into your app. Bad onboarding loses them before they even see what you built. This determines whether your app succeeds or fails.

---

## Phase 9: Testing & Polish

Get real people to use your app and fix what's broken or confusing.

**9.1** - Test with 5-10 real people (friends, family, beta users):
- Watch them use the app
- Note where they get confused
- Ask what's unclear

**9.2** - Add analytics tracking:
- Use Posthog or Mixpanel
- Track: signups, onboarding completion, paywall views, subscriptions

**9.3** - Fix the obvious problems:
- Bugs that crash the app
- Confusing screens
- Steps where people quit

**9.4** - Polish the experience:
- Add loading states
- Add error messages
- Make buttons more obvious
- Speed up slow screens

**Why this matters**: You can't see your own app clearly anymore. Fresh eyes will spot problems you're blind to. Fix those before launching to the world.

---

## Phase 10: Deploy to Production

Get your app live for real users.

**10.1** - Deploy Convex backend to production:
- Run: `npx convex deploy` from `packages/backend`
- Copy the production URL

**10.2** - Switch Stripe to live mode:
- Create same products in live mode
- Get live API keys
- Update Convex environment variables with live keys
- Create production webhook endpoint

**10.3** - Update app to use production:
- Change `EXPO_PUBLIC_CONVEX_URL` to production URL
- Add production Clerk keys
- Test everything works with production backend

**10.4** - Build the production app:
- Run: `eas build --platform ios --profile production`
- Run: `eas build --platform android --profile production`

**10.5** - Prepare App Store assets:
- App icon (1024x1024)
- Screenshots (various sizes)
- App description
- Privacy policy
- Support email

**10.6** - Submit to stores:
- iOS: App Store Connect
- Android: Google Play Console
- Wait 1-3 days for review

**Why this matters**: Your app isn't real until people can download it from the app stores. This is the finish line.

---

## Phase 11: Post-Launch

Monitor your live app and make it better based on real usage.

**11.1** - Check analytics daily (first week):
- How many people sign up?
- How many complete onboarding?
- How many subscribe?
- Where do people drop off?

**11.2** - Fix critical bugs immediately:
- Crashes
- Payment failures
- Login issues

**11.3** - Respond to user feedback:
- App Store reviews
- Support emails
- Feature requests

**11.4** - Plan next version:
- What features do people want most?
- What's confusing that needs fixing?
- What would make people pay?

**11.5** - Release updates regularly:
- Every 2-4 weeks for bug fixes
- Every 4-6 weeks for new features

**Why this matters**: Version 1 is never perfect. The real work starts after launch - listening to users and making your app better every week.

---

## Timeline

Realistic timeframes if you work on this full-time:

- Phase 0 (Preview): 30 minutes
- Phase 1 (Setup): 2-3 hours
- Phase 2 (Upload designs): 1-2 hours
- Phase 3 (Planning with Claude): 3-4 hours
- Phase 4 (Static screens): 2-3 days
- Phase 5 (Backend): 1-2 days
- Phase 6 (Connect to backend): 3-5 days
- Phase 7 (Paywalls): 1 day
- Phase 8 (Onboarding): 2-3 days
- Phase 9 (Testing): 2-3 days
- Phase 10 (Deploy): 1 day
- Phase 11 (Post-launch): Ongoing

**Total: 2-3 weeks from start to App Store submission**

---

## Key Success Factors

**Get these right and everything else works:**

1. **Database planning** (Phase 3) - Spend the time to get this perfect
2. **One feature at a time** (Phase 6) - Don't rush ahead
3. **Onboarding completion** (Phase 8) - Aim for 70-90%
4. **Real user testing** (Phase 9) - You need fresh eyes
5. **Monitor analytics** (Phase 11) - Data tells you what to fix

---

## Web App Enhancements

The web application includes professional pricing, account management, and subscription features.

### Features Included

**Navigation & Layout:**
- Header with subscription badge (✨ Pro badge for active subscribers)
- Pricing link visible to all users
- Account link for signed-in users
- Enhanced UserButton with Account and Billing menu items
- ErrorBoundary for graceful error handling

**Pages:**
1. **Pricing Page** (`/pricing`)
   - Public page showing monthly and annual subscription plans
   - Professional card-based design with feature lists
   - Monthly: $9.99/month, Annual: $39.99/year (67% savings)
   - "Best Value" badge on annual plan
   - Test mode notice with Stripe test card info
   - Integration with CheckoutButton component
   - Shows current subscription status if user is signed in

2. **Account Page** (`/account`)
   - Protected route for signed-in users
   - Profile information (name, email, user ID)
   - Subscription status card with:
     - Loading state
     - Active subscription details (using SubscriptionStatus component)
     - "No subscription" state with CTA to pricing page
   - Billing information (Stripe customer ID)
   - Quick actions card with links to Dashboard and Pricing

3. **Enhanced Dashboard** (`/dashboard`)
   - Personalized welcome message
   - Subscription status card
   - Quick actions card (Pricing and Account links)
   - System status section with colored cards:
     - Clerk Authentication (green)
     - Convex Backend (blue)
     - Type Safety (purple)
   - "All Systems Operational" status banner

**Components:**
- `SubscriptionBadge.tsx` - Displays "✨ Pro" badge when user has active subscription
- `ErrorBoundary.tsx` - Catches React errors and shows recovery UI
- Updated `Header.tsx` - Enhanced navigation with badge and custom UserButton menu

**Backend Requirements:**
All required Convex queries already exist in the template:
- `api.stripe.subscriptions.getCurrent` - Returns subscription object or null
- `api.stripe.subscriptions.hasActive` - Returns boolean
- `api.stripe.customers.getCurrent` - Returns customer object or null

### File Structure

```
apps/web/src/
├── components/
│   ├── Header.tsx (enhanced)
│   ├── SubscriptionBadge.tsx (new)
│   ├── ErrorBoundary.tsx (new)
│   └── stripe/
│       ├── CheckoutButton.tsx (existing)
│       ├── PortalButton.tsx (existing)
│       └── SubscriptionStatus.tsx (existing)
├── pages/
│   ├── Home.tsx (unchanged)
│   ├── Dashboard.tsx (enhanced)
│   ├── Pricing.tsx (new)
│   └── Account.tsx (new)
└── App.tsx (enhanced with new routes)
```

### User Experience Benefits

✅ Clear separation of concerns (pricing vs dashboard vs account)
✅ Consistent navigation across all pages
✅ Visual feedback of subscription status (badge)
✅ Easy subscription management from multiple places
✅ Professional, polished design
✅ Graceful error handling
✅ Better component reuse (CheckoutButton, SubscriptionStatus)
✅ Mobile-responsive design with Tailwind CSS

### Testing the Web App

1. Start the development server:
   ```bash
   cd apps/web && npm run dev
   ```

2. Visit http://localhost:5173 and test:
   - Public pages: Home (`/`), Pricing (`/pricing`)
   - Protected pages: Dashboard (`/dashboard`), Account (`/account`)
   - Sign in with Clerk to access protected routes
   - Create test subscription using Stripe test card: `4242 4242 4242 4242`
   - Verify "✨ Pro" badge appears in header after subscription

3. Build for production:
   ```bash
   cd apps/web && npm run build
   ```

---

**Ready to start? Begin with Phase 0! 🚀**
