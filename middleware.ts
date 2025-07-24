import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PUBLIC_ROUTES } from '@/constants/publicRoutes';
import { ROUTES } from '@/constants';

export async function middleware(req: NextRequest) {
  let supabaseResponse = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request: req,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  const isPublic = PUBLIC_ROUTES.some((route) => req.nextUrl.pathname.startsWith(route));

  if (!session && !isPublic) {
    return NextResponse.redirect(new URL(ROUTES.SIGN_IN, req.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
}; 