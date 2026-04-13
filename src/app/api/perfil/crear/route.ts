import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { stripe } from '@/lib/stripe/client'
import { ANUALIDAD_PRICE_ID, ADD_ON_PRICE_MAP, type AddOnType } from '@/lib/stripe/products'
import { generateSlug } from '@/lib/utils'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const body = await request.json()
  const { formData, addOns = [] } = body as { formData: Record<string, unknown>, addOns: AddOnType[] }

  const slug = generateSlug((formData.name as string) || 'usuario')

  const medicalData = {
    name: formData.name,
    age: formData.age ? Number(formData.age) : null,
    sex: formData.sex,
    weight: formData.weight ? Number(formData.weight) : null,
    height: formData.height ? Number(formData.height) : null,
    nationality: formData.nationality,
    allergies: formData.allergies ?? [],
    medications: formData.medications ?? [],
    conditions: formData.conditions ?? [],
    disabilities: formData.disabilities ?? [],
    surgeries: (formData.surgeries as Array<{description: string; year: string}> ?? [])
      .map(s => ({ description: s.description, year: Number(s.year) })),
    vaccines: formData.vaccines ?? [],
    emergencyContacts: formData.contacts ?? [],
    doctor: { name: formData.doctorName, phone: formData.doctorPhone, clinic: formData.doctorClinic },
    hasPacemaker: formData.hasPacemaker ?? false,
    hasProsthetics: formData.hasProsthetics ?? false,
    organDonor: formData.organDonor ?? false,
    specialInstructions: formData.specialInstructions ?? '',
    insurance: { company: formData.insuranceCompany, policyNumber: formData.insurancePolicyNumber },
    discipline: formData.discipline,
    regularEvents: formData.events ?? [],
  }

  // Check if user already has a profile
  const { data: existing } = await supabase.from('profiles').select('id').eq('user_id', user.id).single()
  if (existing) {
    return NextResponse.json({ error: 'El usuario ya tiene un perfil' }, { status: 409 })
  }

  // Save profile (pending until payment confirmed)
  const db = createAdminClient()
  const { error: profileError } = await db.from('profiles').insert({
    user_id: user.id,
    slug,
    blood_type: (formData.bloodType as string) || null,
    medical_data: medicalData,
    status: 'pending',
  })

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 })
  }

  // Create or retrieve Stripe customer
  const existingCustomers = await stripe.customers.list({ email: user.email, limit: 1 })
  const customer = existingCustomers.data.length > 0
    ? existingCustomers.data[0]
    : await stripe.customers.create({
        email: user.email!,
        metadata: { supabase_user_id: user.id },
      })

  // Save subscription row
  await db.from('subscriptions').upsert({
    user_id: user.id,
    stripe_customer_id: customer.id,
    status: 'incomplete',
  }, { onConflict: 'user_id' })

  // Build line items: subscription + optional add-ons
  const lineItems: Array<{ price: string; quantity: number }> = [
    { price: ANUALIDAD_PRICE_ID, quantity: 1 },
  ]
  for (const addOn of addOns) {
    if (ADD_ON_PRICE_MAP[addOn]) {
      lineItems.push({ price: ADD_ON_PRICE_MAP[addOn], quantity: 1 })
    }
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    mode: 'subscription',
    line_items: lineItems,
    success_url: `${appUrl}/pago/exito?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/pago/cancelado`,
    locale: 'es',
    subscription_data: {
      metadata: { supabase_user_id: user.id, slug },
    },
  })

  return NextResponse.json({ checkoutUrl: session.url })
}
