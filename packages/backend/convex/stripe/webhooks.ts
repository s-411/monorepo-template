import { httpAction } from "../_generated/server";
import { internal } from "../_generated/api";
import Stripe from "stripe";
import { stripe } from "./config";

/**
 * Stripe Webhook Handler
 * IMPORTANT: Webhook endpoint uses .convex.site domain, NOT .convex.cloud
 * Endpoint: https://your-deployment.convex.site/stripe/webhook
 *
 * Configure in Stripe Dashboard → Webhooks → Add endpoint
 * Events to select:
 * - checkout.session.completed
 * - customer.subscription.created
 * - customer.subscription.updated
 * - customer.subscription.deleted
 * - invoice.payment_succeeded
 * - invoice.payment_failed
 */
export const webhook = httpAction(async (ctx, request) => {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return new Response("No signature", { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return new Response("Webhook secret not configured", { status: 500 });
  }

  let event: Stripe.Event;

  try {
    const body = await request.text();
    // Use constructEventAsync for async webhook verification
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response("Webhook signature verification failed", {
      status: 400,
    });
  }

  console.log(`Processing webhook event: ${event.type}`);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(ctx, session);
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(ctx, subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(ctx, subscription);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`Payment succeeded for invoice: ${invoice.id}`);
        // Optionally: Send email, update usage, etc.
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`Payment failed for invoice: ${invoice.id}`);
        // Optionally: Send notification, pause service, etc.
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Webhook processing failed", { status: 500 });
  }
});

/**
 * Handle checkout session completed
 * Creates/updates customer and subscription records
 */
async function handleCheckoutCompleted(
  ctx: any,
  session: Stripe.Checkout.Session
) {
  const userId = session.metadata?.userId;
  if (!userId) {
    console.error("No userId in checkout session metadata");
    return;
  }

  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  // Get full customer details from Stripe
  const customer = await stripe.customers.retrieve(customerId);
  if (customer.deleted) {
    console.error("Customer was deleted");
    return;
  }

  // Upsert customer
  await ctx.runMutation(internal.stripe.customers.upsert, {
    userId,
    stripeCustomerId: customer.id,
    email: customer.email!,
    name: customer.name || undefined,
  });

  // Get full subscription details from Stripe
  if (subscriptionId) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    await handleSubscriptionChange(ctx, subscription);
  }
}

/**
 * Handle subscription created or updated
 */
async function handleSubscriptionChange(
  ctx: any,
  subscription: Stripe.Subscription
) {
  const customerId = subscription.customer as string;

  // Get customer from our database to find userId
  const customer = await ctx.runQuery(internal.stripe.customers.getByStripeId, {
    stripeCustomerId: customerId,
  });

  if (!customer) {
    console.error(`No customer found for Stripe customer: ${customerId}`);
    return;
  }

  const subscriptionItem = subscription.items.data[0];
  if (!subscriptionItem) {
    console.error("No subscription item found in subscription");
    return;
  }

  const price = subscriptionItem.price;
  if (!price) {
    console.error("No price found in subscription item");
    return;
  }

  // In Stripe API version 2025-02-24.acacia and later,
  // current_period_end moved from subscription root to subscription items
  const currentPeriodEnd = subscriptionItem.current_period_end;
  if (!currentPeriodEnd) {
    console.error("No current_period_end found in subscription item");
    return;
  }

  // Upsert subscription
  await ctx.runMutation(internal.stripe.subscriptions.upsert, {
    userId: customer.userId,
    stripeSubscriptionId: subscription.id,
    stripePriceId: price.id,
    stripeProductId: price.product as string,
    status: subscription.status,
    currentPeriodEnd: currentPeriodEnd,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
  });
}

/**
 * Handle subscription deleted
 */
async function handleSubscriptionDeleted(
  ctx: any,
  subscription: Stripe.Subscription
) {
  await ctx.runMutation(internal.stripe.subscriptions.remove, {
    stripeSubscriptionId: subscription.id,
  });
}
