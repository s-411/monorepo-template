"use client";

import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";

// Validate required environment variables
const CONVEX_URL = process.env.EXPO_PUBLIC_CONVEX_URL;
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!CONVEX_URL) {
  throw new Error(
    "Missing EXPO_PUBLIC_CONVEX_URL environment variable.\n" +
    "Please create apps/native/.env.local and add:\n" +
    "EXPO_PUBLIC_CONVEX_URL=your_convex_url_here"
  );
}

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error(
    "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable.\n" +
    "Please create apps/native/.env.local and add:\n" +
    "EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key_here"
  );
}

const convex = new ConvexReactClient(CONVEX_URL);

export default function ConvexClientProvider({ children }) {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
