import { loadStripe, type Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null> | null = null

export default function getStripe(): Promise<Stripe | null> {
  const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  if (!key) {
    console.warn('Stripe publishable key not configured. Set VITE_STRIPE_PUBLISHABLE_KEY in .env')
    return Promise.resolve(null)
  }

  if (!stripePromise) {
    stripePromise = loadStripe(key)
  }
  return stripePromise
}
