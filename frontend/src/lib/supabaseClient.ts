import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Used client-side for Supabase Storage (thumbnails, PDFs, resources).
// Primary auth + data access goes through the Spring Boot backend.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
