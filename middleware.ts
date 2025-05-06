import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;
  
  // Skip auth check for login and reset password pages
  if (pathname === '/admin/login' || pathname === '/admin/reset-password') {
    return res;
  }
  
  // Create Supabase client using middleware helpers
  const supabase = createMiddlewareClient({ req, res });
  
  // Check for session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  // If no session and trying to access admin route, redirect to login
  if (!session && pathname.startsWith('/admin')) {
    const url = new URL('/admin/login', req.url);
    return NextResponse.redirect(url);
  }
  
  return res;
}

// Only run middleware on admin routes
export const config = {
  matcher: ['/admin/:path*'],
}; 