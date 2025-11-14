import { internalMutation, internalQuery, query } from "../_generated/server";
import { v } from "convex/values";

/**
 * Get subscription by Stripe subscription ID
 */
export const getByStripeId = internalQuery({
  args: { stripeSubscriptionId: v.string() },
  handler: async (ctx, { stripeSubscriptionId }) => {
    return await ctx.db
      .query("subscriptions")
      .withIndex("by_subscription", (q) =>
        q.eq("stripeSubscriptionId", stripeSubscriptionId)
      )
      .first();
  },
});

/**
 * Get user's current subscription
 */
export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    // Get the most recent subscription for this user
    const subscriptions = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    // Return the active one, or the most recent
    const active = subscriptions.find((sub) => sub.status === "active");
    if (active) return active;

    // If no active, return most recent
    return subscriptions.sort((a, b) => b.currentPeriodEnd - a.currentPeriodEnd)[0] || null;
  },
});

/**
 * Check if user has an active subscription
 */
export const hasActive = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return false;
    }

    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .filter((q) => q.eq(q.field("status"), "active"))
      .first();

    return subscription !== null;
  },
});

/**
 * Create or update subscription
 * Called from webhook
 */
export const upsert = internalMutation({
  args: {
    userId: v.string(),
    stripeSubscriptionId: v.string(),
    stripePriceId: v.string(),
    stripeProductId: v.string(),
    status: v.string(),
    currentPeriodEnd: v.number(),
    cancelAtPeriodEnd: v.boolean(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("subscriptions")
      .withIndex("by_subscription", (q) =>
        q.eq("stripeSubscriptionId", args.stripeSubscriptionId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        stripePriceId: args.stripePriceId,
        stripeProductId: args.stripeProductId,
        status: args.status,
        currentPeriodEnd: args.currentPeriodEnd,
        cancelAtPeriodEnd: args.cancelAtPeriodEnd,
      });
      return existing._id;
    } else {
      return await ctx.db.insert("subscriptions", args);
    }
  },
});

/**
 * Delete subscription
 * Called from webhook when subscription is deleted
 */
export const remove = internalMutation({
  args: { stripeSubscriptionId: v.string() },
  handler: async (ctx, { stripeSubscriptionId }) => {
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_subscription", (q) =>
        q.eq("stripeSubscriptionId", stripeSubscriptionId)
      )
      .first();

    if (subscription) {
      await ctx.db.delete(subscription._id);
    }
  },
});
