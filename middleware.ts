import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Handle Legacy PHP 301 Redirects for indexed search engine URLs
  if (pathname.includes('product2.php') || pathname.includes('product.php')) {
    const id = searchParams.get('id');
    if (id === '1') {
      return NextResponse.redirect(new URL('/product/105', request.url), 301);
    }
    if (id === '2') {
      return NextResponse.redirect(new URL('/product/108', request.url), 301);
    }
    if (id === '3') {
      return NextResponse.redirect(new URL('/product/28', request.url), 301);
    }
    if (id === '8') {
      return NextResponse.redirect(new URL('/product/107', request.url), 301);
    }
    return NextResponse.redirect(new URL('/shop', request.url), 301);
  }

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
  matcher: ['/admin', '/admin/:path*', '/product2.php', '/product.php'],
};
