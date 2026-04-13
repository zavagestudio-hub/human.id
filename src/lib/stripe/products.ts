export const ANUALIDAD_PRICE_ID          = process.env.STRIPE_PRICE_ANUALIDAD_YEARLY!
export const ID_POCKET_PRICE_ID          = process.env.STRIPE_PRICE_ID_POCKET!
export const ID_TOKEN_PRICE_ID           = process.env.STRIPE_PRICE_ID_TOKEN!
export const ID_CARD_REPLACEMENT_PRICE_ID = process.env.STRIPE_PRICE_ID_CARD_REPLACEMENT!

export type AddOnType = 'id_pocket' | 'id_token' | 'id_card_replacement'

export const ADD_ON_PRICE_MAP: Record<AddOnType, string> = {
  id_pocket:           ID_POCKET_PRICE_ID,
  id_token:            ID_TOKEN_PRICE_ID,
  id_card_replacement: ID_CARD_REPLACEMENT_PRICE_ID,
}
