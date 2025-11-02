import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth-storage')?.value;
  let isAuthenticated = false;

  if (authCookie) {
    try {
      const decodedCookie = decodeURIComponent(authCookie);
      const authData = JSON.parse(decodedCookie);
      isAuthenticated = authData?.state?.accessToken !== null && authData?.state?.accessToken !== undefined;
    } catch {
      // Invalid cookie, treat as not authenticated
      isAuthenticated = false;
    }
  }

  const isAuthPage =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register');
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboard && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard/projects', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
