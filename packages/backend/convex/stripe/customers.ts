import {
  internalMutation,
  internalQuery,
  query,
  internalAction,
} from "../_generated/server";
import { v } from "convex/values";
import { stripe } from "./config";
import { internal } from "../_generated/api";

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
 * NOTE: This MUST be an action because it calls the Stripe API
 */
export const getOrCreate = internalAction({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, { userId, email, name }) => {
    // Check if customer already exists (must use runQuery in actions)
    const existing = await ctx.runQuery(internal.stripe.customers.getByUserId, {
      userId,
    });

    if (existing) {
      return existing;
    }

    // Create new Stripe customer (this requires an action, not a query)
    const stripeCustomer = await stripe.customers.create({
      email,
      name,
      metadata: {
        userId,
      },
    });

    // Save to database (must use runMutation in actions)
    await ctx.runMutation(internal.stripe.customers.upsert, {
      userId,
      stripeCustomerId: stripeCustomer.id,
      email,
      name,
    });

    // Get and return the customer
    const customer = await ctx.runQuery(internal.stripe.customers.getByUserId, {
      userId,
    });

    return customer;
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
