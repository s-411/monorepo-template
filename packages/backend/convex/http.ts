import { httpRouter } from "convex/server";
import { webhook } from "./stripe/webhooks";

const http = httpRouter();

// Stripe webhook endpoint
// URL: https://your-deployment.convex.cloud/stripe/webhook
http.route({
  path: "/stripe/webhook",
  method: "POST",
  handler: webhook,
});

export default http;
