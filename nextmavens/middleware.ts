import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/dashboard/:path*', '/company/:path*']
};

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  if (!session) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  try {
    const response = await fetch(`${request.nextUrl.origin}/api/auth/session`, {
      headers: {
        Cookie: `session=${session.value}`
      },
    });

    const data = await response.json();

    if (!data.isLoggedIn) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    const path = request.nextUrl.pathname;
    const userRole = data.user?.role || 'customer';

    if (path.startsWith('/company') && userRole !== 'companyadmin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (path.startsWith('/dashboard') && userRole !== 'customer') {
      return NextResponse.redirect(new URL('/company', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
} 