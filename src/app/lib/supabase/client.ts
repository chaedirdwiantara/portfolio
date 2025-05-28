import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Create a direct client for browser usage that doesn't rely on auth helpers
export const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables:', { 
      url: !!supabaseUrl, 
      key: !!supabaseKey 
    });
    throw new Error('Supabase URL and anon key must be defined');
  }
  
  console.log('Creating Supabase client with URL:', supabaseUrl);
  
  return createClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storageKey: 'portfolio-admin-auth',
        detectSessionInUrl: true,
        flowType: 'pkce'
      }
    }
  );
}

// Create a server client for API routes
export const createServerClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables:', { 
      url: !!supabaseUrl, 
      key: !!supabaseKey 
    });
    throw new Error('Supabase URL and anon key must be defined');
  }
  
  return createClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );
} 