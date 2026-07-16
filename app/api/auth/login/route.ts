import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { query } from '@/lib/db';

// Helper to hash password
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Missing email or password' }, { status: 400 });
    }

    // Step 1: Ensure users table exists (just in case login is called first)
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;
    
    try {
      await query(createTableSql);
    } catch (tblErr) {
      console.error('Failed to create users table on login:', tblErr);
      return NextResponse.json({ 
        success: false, 
        error: 'Database connection failed. Please ensure MySQL is running in XAMPP on port 3306.' 
      }, { status: 500 });
    }

    // Step 2: Retrieve user details
    const findUserSql = 'SELECT * FROM users WHERE email = ?';
    const users: any = await query(findUserSql, [email]);

    if (!users || users.length === 0) {
      return NextResponse.json({ success: false, error: 'Invalid email address or password.' }, { status: 400 });
    }

    const user = users[0];
    const hashedPassword = hashPassword(password);

    // Step 3: Validate password
    if (user.password !== hashedPassword) {
      return NextResponse.json({ success: false, error: 'Invalid email address or password.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful!',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || ''
      }
    });

  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}
