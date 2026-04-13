export interface User {
  id: string
  email: string
  created_at: string
  subscription_tier: 'free' | 'pro'
  subscription_expires_at: string | null
  documents_generated_this_month: number
}

export interface BusinessProfile {
  id: string
  user_id: string
  name: string
  nif: string | null
  address: string | null
  city: string | null
  postal_code: string | null
  iae_activity: string | null
  phone: string | null
  email: string | null
  logo_url: string | null
  is_new_autonomo: boolean
  created_at: string
}

export interface Contact {
  id: string
  user_id: string
  name: string
  nif_cif: string | null
  address: string | null
  city: string | null
  postal_code: string | null
  email: string | null
  phone: string | null
  created_at: string
}

export interface Document {
  id: string
  user_id: string
  document_type: DocumentType
  title: string | null
  form_data: Record<string, unknown>
  pdf_url: string | null
  contact_id: string | null
  created_at: string
  updated_at: string
}

export type DocumentType =
  | 'service_contract'
  | 'invoice'
  | 'nda'
  | 'quote'
  | 'lease'
  | 'privacy_policy'

export interface InvoiceCounter {
  id: string
  user_id: string
  year: number
  last_number: number
  prefix: string
}
