import { stripe } from '@/lib/stripe/client'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import type Stripe from 'stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body, signature, process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const db = createAdminClient()

  switch (event.type) {

    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const customerId = session.customer as string
      const subscriptionId = session.subscription as string | null

      // Find user by stripe customer id
      const { data: sub } = await db
        .from('subscriptions')
        .select('user_id')
        .eq('stripe_customer_id', customerId)
        .single()

      if (!sub) break

      // Activate subscription row
      if (subscriptionId) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const stripeSub = await stripe.subscriptions.retrieve(subscriptionId) as any
        await db.from('subscriptions').update({
          stripe_subscription_id: subscriptionId,
          status: 'active',
          current_period_end: stripeSub.current_period_end
            ? new Date(stripeSub.current_period_end * 1000).toISOString()
            : null,
        }).eq('stripe_customer_id', customerId)
      }

      // Activate profile
      await db.from('profiles').update({ status: 'active' }).eq('user_id', sub.user_id)

      // Record one-time orders (add-ons)
      if (session.mode === 'payment' && session.payment_intent) {
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
        for (const item of lineItems.data) {
          const priceId = item.price?.id
          let productType: string | null = null
          if (priceId === process.env.STRIPE_PRICE_ID_POCKET)           productType = 'id_pocket'
          else if (priceId === process.env.STRIPE_PRICE_ID_TOKEN)        productType = 'id_token'
          else if (priceId === process.env.STRIPE_PRICE_ID_CARD_REPLACEMENT) productType = 'id_card_replacement'
          if (productType) {
            await db.from('orders').insert({
              user_id: sub.user_id,
              stripe_payment_intent_id: session.payment_intent as string,
              stripe_checkout_session_id: session.id,
              product_type: productType,
              amount_mxn: (item.amount_total ?? 0),
              status: 'paid',
            })
          }
        }
      }
      break
    }

    case 'invoice.paid': {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const invoice = event.data.object as any
      const customerId = invoice.customer as string
      const subscriptionId = invoice.subscription ?? invoice.parent?.subscription_details?.subscription
      if (!subscriptionId) break
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const stripeSub = await stripe.subscriptions.retrieve(subscriptionId) as any
      await db.from('subscriptions').update({
        status: 'active',
        current_period_end: stripeSub.current_period_end
          ? new Date(stripeSub.current_period_end * 1000).toISOString()
          : null,
      }).eq('stripe_customer_id', customerId)

      // Re-activate profile in case it was expired
      const { data: sub } = await db.from('subscriptions').select('user_id').eq('stripe_customer_id', customerId).single()
      if (sub) await db.from('profiles').update({ status: 'active' }).eq('user_id', sub.user_id)
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      await db.from('subscriptions').update({ status: 'past_due' })
        .eq('stripe_customer_id', invoice.customer as string)
      break
    }

    case 'customer.subscription.deleted': {
      const stripeSub = event.data.object as Stripe.Subscription
      const customerId = stripeSub.customer as string
      await db.from('subscriptions').update({ status: 'canceled' })
        .eq('stripe_customer_id', customerId)
      const { data: sub } = await db.from('subscriptions').select('user_id').eq('stripe_customer_id', customerId).single()
      if (sub) await db.from('profiles').update({ status: 'expired' }).eq('user_id', sub.user_id)
      break
    }
  }

  return NextResponse.json({ received: true })
}
