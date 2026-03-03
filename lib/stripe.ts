// Stripe is scaffolded but not yet activated.
// To activate: uncomment the client initialization and wire up checkout.
import Stripe from "stripe";

// Server-side Stripe instance (used in API routes)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export const STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
