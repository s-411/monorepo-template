import { action } from "../_generated/server";
import { v } from "convex/values";
import { stripe, getPriceId } from "./config";

/**
 * Create a Stripe Checkout Session
 * Returns a URL that redirects the user to Stripe's checkout page
 */
export const createCheckoutSession = action({
  args: {
    priceKey: v.string(), // e.g., "PRO_MONTHLY" or "PRO_YEARLY"
  },
  handler: async (ctx, { priceKey }) => {
    // Get authenticated user
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    const email = identity.email!;

    // Get the price ID
    const priceId = getPriceId(priceKey as "PRO_MONTHLY" | "PRO_YEARLY");

    // Get or create Stripe customer
    const customer = await ctx.runQuery(
      internal.stripe.customers.getOrCreate,
      { userId, email, name: identity.name }
    );

    // Get site URL with fallback
    const siteUrl = process.env.SITE_URL || "http://localhost:5173";

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.stripeCustomerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${siteUrl}/dashboard?success=true`,
      cancel_url: `${siteUrl}/pricing?canceled=true`,
      metadata: {
        userId,
      },
    });

    if (!session.url) {
      throw new Error("Failed to create checkout session");
    }

    return { url: session.url };
  },
});

/**
 * Create a Stripe Customer Portal Session
 * Returns a URL that redirects the user to manage their subscription
 */
export const createPortalSession = action({
  args: {},
  handler: async (ctx) => {
    // Get authenticated user
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    // Get customer from database
    const customer = await ctx.runQuery(
      internal.stripe.customers.getByUserId,
      { userId }
    );

    if (!customer) {
      throw new Error("No Stripe customer found");
    }

    // Get site URL with fallback
    const siteUrl = process.env.SITE_URL || "http://localhost:5173";

    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.stripeCustomerId,
      return_url: `${siteUrl}/dashboard`,
    });

    return { url: session.url };
  },
});

// Note: internal imports will be added to this file
import { internal } from "../_generated/api";
