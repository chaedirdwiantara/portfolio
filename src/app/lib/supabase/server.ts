import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Create a direct client for server usage that doesn't rely on auth helpers
export function createServerSupabaseClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
      }
    }
  );
} 