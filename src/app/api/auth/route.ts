import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { Database } from '@/app/lib/supabase/database.types';

export async function POST(request: Request) {
  // Create supabase client dynamically inside the function
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: 'Supabase configuration is missing' }, 
      { status: 500 }
    );
  }

  const supabase = createClient<Database>(supabaseUrl, supabaseKey);

  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Get auth data
  const { session } = data;
  
  // Set session data in response headers
  const response = NextResponse.redirect(`${requestUrl.origin}/admin`, {
    status: 301,
  });

  // Set auth cookie
  response.cookies.set('sb-auth-token', session?.access_token || '', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: session?.expires_in || 0,
  });

  return response;
} 