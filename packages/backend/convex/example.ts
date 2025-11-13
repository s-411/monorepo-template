import { query } from "./_generated/server";
import { v } from "convex/values";

// Example query - shows Convex is working
export const hello = query({
  args: {},
  handler: async () => {
    return "Hello from Convex!";
  },
});

// Example authenticated query - shows auth integration is working
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }
    return {
      name: identity.name,
      email: identity.email,
      userId: identity.subject,
    };
  },
});
