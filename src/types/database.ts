import type { HumanProfile } from './index'

export interface ProfileRow {
  id: string
  user_id: string
  slug: string
  blood_type: string | null
  medical_data: HumanProfile
  photo_url: string | null
  status: 'pending' | 'active' | 'expired'
  created_at: string
  updated_at: string
}

export interface SubscriptionRow {
  id: string
  user_id: string
  stripe_customer_id: string
  stripe_subscription_id: string | null
  status: 'incomplete' | 'active' | 'past_due' | 'canceled' | 'unpaid'
  current_period_end: string | null
  created_at: string
  updated_at: string
}

export interface OrderRow {
  id: string
  user_id: string
  stripe_payment_intent_id: string
  stripe_checkout_session_id: string | null
  product_type: 'id_pocket' | 'id_token' | 'id_card_replacement'
  amount_mxn: number
  status: 'pending' | 'paid' | 'fulfilled' | 'refunded'
  shipping_address: Record<string, string> | null
  created_at: string
  updated_at: string
}
