import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/uploads directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate a unique filename using timestamp
    const ext = path.extname(file.name) || '.png';
    const filename = `${Date.now()}_${Math.floor(Math.random() * 1000)}${ext}`;
    const filePath = path.join(uploadDir, filename);

    // Write file to filesystem
    await fs.promises.writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      message: 'Image uploaded successfully',
      filePath: filename
    });
  } catch (error: any) {
    console.error('API Upload route error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}
