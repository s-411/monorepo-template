import { internalMutation, internalQuery, query } from "../_generated/server";
import { v } from "convex/values";
import { stripe } from "./config";

/**
 * Get customer by Clerk user ID
 */
export const getByUserId = internalQuery({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("customers")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();
  },
});

/**
 * Get customer by Stripe customer ID
 */
export const getByStripeId = internalQuery({
  args: { stripeCustomerId: v.string() },
  handler: async (ctx, { stripeCustomerId }) => {
    return await ctx.db
      .query("customers")
      .withIndex("by_stripe_customer", (q) =>
        q.eq("stripeCustomerId", stripeCustomerId)
      )
      .first();
  },
});

/**
 * Get or create a Stripe customer
 * This is called from checkout flow
 */
export const getOrCreate = internalQuery({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, { userId, email, name }) => {
    // Check if customer already exists
    const existing = await ctx.db
      .query("customers")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (existing) {
      return existing;
    }

    // Create new Stripe customer
    const stripeCustomer = await stripe.customers.create({
      email,
      name,
      metadata: {
        userId,
      },
    });

    // Save to database
    const customerId = await ctx.db.insert("customers", {
      userId,
      stripeCustomerId: stripeCustomer.id,
      email,
      name,
    });

    return await ctx.db.get(customerId);
  },
});

/**
 * Create or update customer record
 * Called from webhook when customer is created/updated in Stripe
 */
export const upsert = internalMutation({
  args: {
    userId: v.string(),
    stripeCustomerId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, { userId, stripeCustomerId, email, name }) => {
    const existing = await ctx.db
      .query("customers")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        stripeCustomerId,
        email,
        name,
      });
      return existing._id;
    } else {
      return await ctx.db.insert("customers", {
        userId,
        stripeCustomerId,
        email,
        name,
      });
    }
  },
});

/**
 * Get current user's customer record (public query)
 */
export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    return await ctx.db
      .query("customers")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .first();
  },
});
