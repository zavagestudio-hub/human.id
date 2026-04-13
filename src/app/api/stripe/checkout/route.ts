import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe/client'
import { ADD_ON_PRICE_MAP, type AddOnType } from '@/lib/stripe/products'

export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const { items } = await request.json() as { items: AddOnType[] }

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .single()

  if (!sub?.stripe_customer_id) {
    return NextResponse.json({ error: 'Sin suscripción activa' }, { status: 400 })
  }

  const lineItems = items
    .filter(item => ADD_ON_PRICE_MAP[item])
    .map(item => ({ price: ADD_ON_PRICE_MAP[item], quantity: 1 }))

  if (lineItems.length === 0) {
    return NextResponse.json({ error: 'Sin productos válidos' }, { status: 400 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const session = await stripe.checkout.sessions.create({
    customer: sub.stripe_customer_id,
    mode: 'payment',
    line_items: lineItems,
    success_url: `${appUrl}/pago/exito?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/cuenta/membresia`,
    locale: 'es',
  })

  return NextResponse.json({ checkoutUrl: session.url })
}
