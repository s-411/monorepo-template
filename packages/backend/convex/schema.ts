import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Simple example schema - replace with your own tables
export default defineSchema({
  users: defineTable({
    userId: v.string(),
    name: v.string(),
    email: v.optional(v.string()),
  }),
});
