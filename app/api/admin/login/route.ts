import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const adminEmail = process.env.ADMIN_EMAIL ?? '';
  const adminPassword = process.env.ADMIN_PASSWORD ?? '';

  if (email === adminEmail && password === adminPassword) {
    const response = NextResponse.json({ success: true });
    // Set a simple HttpOnly cookie to mark admin session
    response.cookies.set({
      name: 'admin_auth',
      value: 'true',
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 day
    });
    return response;
  }

  return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
}
