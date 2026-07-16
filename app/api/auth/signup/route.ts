import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { query } from '@/lib/db';

// Helper to hash password
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(req: Request) {
  try {
    const { name, email, password, phone } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: 'Missing name, email, or password' }, { status: 400 });
    }

    // Step 1: Ensure users table exists
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
      console.error('Failed to create users table:', tblErr);
      return NextResponse.json({ 
        success: false, 
        error: 'Database connection failed. Please ensure MySQL is running in XAMPP on port 3306.' 
      }, { status: 500 });
    }

    // Step 2: Check if email already registered
    const findUserSql = 'SELECT * FROM users WHERE email = ?';
    const existingUsers: any = await query(findUserSql, [email]);
    
    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json({ success: false, error: 'Email address is already registered.' }, { status: 400 });
    }

    // Step 3: Insert user into database
    const hashedPassword = hashPassword(password);
    const insertUserSql = `
      INSERT INTO users (name, email, password, phone, address)
      VALUES (?, ?, ?, ?, ?)
    `;
    const insertResult: any = await query(insertUserSql, [name, email, hashedPassword, phone || '', '']);

    if (insertResult === null) {
      return NextResponse.json({ 
        success: false, 
        error: 'Database insert failed. Please make sure MySQL is configured and active.' 
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Account created successfully!',
      user: {
        name,
        email,
        phone: phone || '',
        address: ''
      }
    });

  } catch (error: any) {
    console.error('Signup Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}
