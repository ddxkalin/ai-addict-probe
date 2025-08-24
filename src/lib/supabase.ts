import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface QuizResult {
  id: string
  user_id: string
  score: number
  answers: any[]
  paid: boolean
  created_at: string
}

export interface User {
  id: string
  email: string
  created_at: string
  stripe_customer_id?: string
}