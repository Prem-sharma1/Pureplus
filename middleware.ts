import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and API routes through
  if (
    pathname === '/admin/login' ||
    pathname.startsWith('/api/admin/')
  ) {
    return NextResponse.next();
  }

  // Protect all /admin routes
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const adminAuth = request.cookies.get('admin_auth');
    if (!adminAuth?.value) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
