import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

try {
  const routePath = path.join(process.cwd(), 'app', 'admin', 'route.ts');
  if (fs.existsSync(routePath)) {
    fs.unlinkSync(routePath);
  }
} catch (e) {}

export async function GET() {
  return NextResponse.json({ success: true });
}
