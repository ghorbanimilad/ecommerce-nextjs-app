import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECURE_KEY!);
