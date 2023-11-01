import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const session = await getToken({ req });

  if (req.nextUrl.pathname.startsWith('/login') && !session) {
    return;
  }

  if (req.nextUrl.pathname.startsWith('/register') && !session) {
    return;
  }

  if (
    req.url.includes('/login') ||
    (req.url.includes('/register') && session)
  ) {
    return NextResponse.redirect(new URL('/gallery', req.url));
  }

  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: [
    '/login',
    '/login/:path*',
    '/register',
    '/register/:path*',
    '/gallery',
    '/gallery/:path*',
    '/albums',
    '/albums/:path*',
    '/favorites',
    '/favorites/:path*',
    '/edit',
    '/edit/:path*',
  ],
};
