import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if user is  signed in and the current path is /auth/login redirect the user to /profile
  if (
    user && (req.nextUrl.pathname === '/auth/login' ||
    req.nextUrl.pathname === '/auth/signup')
  ) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  if (
    !user &&
    req.nextUrl.pathname !== '/auth/login' &&
    req.nextUrl.pathname !== '/auth/signup'
  ) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
  }

  return res;
}

export const config = {
  matcher: ['/profile', '/transactions', '/', '/auth/login', '/auth/signup'],
};
