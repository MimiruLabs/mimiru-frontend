import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PUBLIC_ROUTES } from '@/constants/publicRoutes';
import { ROUTES } from '@/constants';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  const isPublic = PUBLIC_ROUTES.some((route) => req.nextUrl.pathname.startsWith(route));

  if (!session && !isPublic) {
    return NextResponse.redirect(new URL(ROUTES.SIGN_IN, req.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
}; 