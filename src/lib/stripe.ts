import { Stripe, loadStripe } from '@stripe/stripe-js';
let created: Stripe | null;
export const prepareStripeClient = async () => {
  if (!created) {
    created = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  }
  return created;
};
