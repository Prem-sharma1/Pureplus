import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

// Auto-clean conflicting route.ts file on build/execution
try {
  const conflictingRoute = path.join(process.cwd(), 'app', 'admin', 'route.ts');
  if (fs.existsSync(conflictingRoute)) {
    fs.unlinkSync(conflictingRoute);
    console.log('Successfully removed conflicting app/admin/route.ts file');
  }
} catch (e) {
  // Ignore file lock errors if any
}

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
