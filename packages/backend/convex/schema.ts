import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Simple example schema - replace with your own tables
export default defineSchema({
  users: defineTable({
    userId: v.string(),
    name: v.string(),
    email: v.optional(v.string()),
  }),

  // Stripe Customers - Links Clerk users to Stripe customers
  customers: defineTable({
    userId: v.string(),           // Clerk user ID
    stripeCustomerId: v.string(), // Stripe customer ID (cus_xxx)
    email: v.string(),
    name: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_stripe_customer", ["stripeCustomerId"]),

  // Stripe Subscriptions - Tracks user subscription status
  subscriptions: defineTable({
    userId: v.string(),                // Clerk user ID
    stripeSubscriptionId: v.string(),  // Stripe subscription ID (sub_xxx)
    stripePriceId: v.string(),         // Price ID (price_xxx)
    stripeProductId: v.string(),       // Product ID (prod_xxx)
    status: v.string(),                // active, canceled, past_due, etc.
    currentPeriodEnd: v.number(),      // Unix timestamp
    cancelAtPeriodEnd: v.boolean(),    // Whether subscription will cancel
  })
    .index("by_user", ["userId"])
    .index("by_subscription", ["stripeSubscriptionId"]),
});
