import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const url = new URL(req.url);
  const baseUrl = url.origin;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if user is  signed in and the current path is /auth/login redirect the user to /profile
  if (user && req.nextUrl.pathname === '/auth/login') {
    return NextResponse.redirect(new URL('/profile', req.nextUrl));
  }

  // if user is not signed in
  if (!user && req.nextUrl.pathname !== '/auth/login') {
    return NextResponse.redirect(`${baseUrl}/auth/login`);
  }

  return res;
}

export const config = {
  matcher: ["/profile"]
};