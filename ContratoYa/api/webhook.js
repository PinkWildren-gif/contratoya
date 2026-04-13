import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const config = {
  api: { bodyParser: false },
}

async function buffer(readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const buf = await buffer(req)
  const sig = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).json({ error: `Webhook Error: ${err.message}` })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const userId = session.client_reference_id

    if (!userId) {
      console.error('No client_reference_id in checkout session')
      return res.status(400).json({ error: 'Missing client_reference_id' })
    }

    // Determine subscription duration from the amount
    // Monthly: €9.99 (999 cents), Yearly: €79.99 (7999 cents)
    const amountTotal = session.amount_total
    const durationMonths = amountTotal >= 7000 ? 12 : 1

    const expiresAt = new Date()
    expiresAt.setMonth(expiresAt.getMonth() + durationMonths)

    const { error } = await supabase
      .from('users')
      .update({
        subscription_tier: 'pro',
        subscription_expires_at: expiresAt.toISOString(),
      })
      .eq('id', userId)

    if (error) {
      console.error('Failed to upgrade user:', error)
      return res.status(500).json({ error: 'Failed to upgrade user' })
    }

    console.log(`User ${userId} upgraded to Pro for ${durationMonths} month(s)`)
  }

  return res.status(200).json({ received: true })
}
