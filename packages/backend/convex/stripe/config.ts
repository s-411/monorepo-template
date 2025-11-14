import Stripe from "stripe";
import { missingEnvVariableUrl } from "../utils";

// Initialize Stripe SDK
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

// Validate Stripe environment variables
export function validateStripeEnv() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
      missingEnvVariableUrl(
        "STRIPE_SECRET_KEY",
        "https://dashboard.stripe.com/apikeys"
      )
    );
  }
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error(
      missingEnvVariableUrl(
        "STRIPE_WEBHOOK_SECRET",
        "https://dashboard.stripe.com/webhooks"
      )
    );
  }
}

// Price IDs - UPDATE THESE WITH YOUR ACTUAL STRIPE PRICE IDS
export const PRICE_IDS = {
  // Replace these with your actual price IDs from Stripe Dashboard
  // Example: PRO_MONTHLY: "price_1234567890abcdef",
  PRO_MONTHLY: process.env.STRIPE_PRICE_ID_PRO_MONTHLY || "price_REPLACE_ME",
  PRO_YEARLY: process.env.STRIPE_PRICE_ID_PRO_YEARLY || "price_REPLACE_ME",
} as const;

// Get price ID by key
export function getPriceId(key: keyof typeof PRICE_IDS): string {
  const priceId = PRICE_IDS[key];
  if (priceId === "price_REPLACE_ME") {
    throw new Error(
      `Price ID for ${key} not set. Update PRICE_IDS in convex/stripe/config.ts`
    );
  }
  return priceId;
}
