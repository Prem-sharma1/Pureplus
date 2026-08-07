import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export const dynamic = 'force-dynamic';

export async function GET() {
  const output: string[] = [];
  
  try {
    const activePool = mysql.createPool({ host: '127.0.0.1', port: 3307, user: 'root', password: '', database: 'pureplush' });
    const query = async (sql: string, params: any[] = []) => {
      try {
        const [res] = await activePool.execute(sql, params);
        return res;
      } catch (err: any) {
        output.push(`[DB ERROR for ${sql.substring(0, 50)}...] ${err.message}`);
        return null;
      }
    };
    
    output.push('Testing CREATE TABLE...');
    await query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(50) DEFAULT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50) NOT NULL,
        shipping_address TEXT NOT NULL,
        address TEXT DEFAULT NULL,
        city VARCHAR(100) DEFAULT '',
        state VARCHAR(100) DEFAULT '',
        pincode VARCHAR(20) DEFAULT '',
        items_json LONGTEXT NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        payment_method VARCHAR(50) DEFAULT 'Online',
        payment_status VARCHAR(50) DEFAULT 'Paid',
        payment_id VARCHAR(100) DEFAULT NULL,
        shipping_status VARCHAR(50) DEFAULT 'Processing',
        courier_partner VARCHAR(100) DEFAULT NULL,
        tracking_number VARCHAR(100) DEFAULT NULL,
        order_date VARCHAR(50) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    output.push('Testing SHOW COLUMNS...');
    const cols = await query<any[]>('SHOW COLUMNS FROM orders');
    const existingColNames = cols ? cols.map(c => c.Field) : [];
    output.push('Cols: ' + JSON.stringify(existingColNames));
    
    output.push('Testing ALTER TABLE statements...');
    try {
      if (!existingColNames.includes('address')) await query('ALTER TABLE orders ADD COLUMN address TEXT DEFAULT NULL');
      if (!existingColNames.includes('city')) await query("ALTER TABLE orders ADD COLUMN city VARCHAR(100) DEFAULT ''");
      if (!existingColNames.includes('state')) await query("ALTER TABLE orders ADD COLUMN state VARCHAR(100) DEFAULT ''");
      if (!existingColNames.includes('pincode')) await query("ALTER TABLE orders ADD COLUMN pincode VARCHAR(20) DEFAULT ''");
      if (!existingColNames.includes('payment_method')) await query("ALTER TABLE orders ADD COLUMN payment_method VARCHAR(50) DEFAULT 'Online'");
      if (!existingColNames.includes('payment_status')) await query("ALTER TABLE orders ADD COLUMN payment_status VARCHAR(50) DEFAULT 'Paid'");
      if (!existingColNames.includes('shipping_status')) await query("ALTER TABLE orders ADD COLUMN shipping_status VARCHAR(50) DEFAULT 'Processing'");
      if (!existingColNames.includes('courier_partner')) await query('ALTER TABLE orders ADD COLUMN courier_partner VARCHAR(100) DEFAULT NULL');
      if (!existingColNames.includes('tracking_number')) await query('ALTER TABLE orders ADD COLUMN tracking_number VARCHAR(100) DEFAULT NULL');
      if (!existingColNames.includes('payment_id')) await query('ALTER TABLE orders ADD COLUMN payment_id VARCHAR(100) DEFAULT NULL');
      if (!existingColNames.includes('order_date')) await query('ALTER TABLE orders ADD COLUMN order_date VARCHAR(50) DEFAULT NULL');
      output.push('Alters completed successfully (or skipped).');
    } catch (err: any) {
      output.push('Alter error: ' + err.message);
    }
    
    output.push('Testing INSERT...');
    const sql = 'INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, shipping_address, address, city, state, pincode, items_json, total_amount, payment_method, payment_status, payment_id, shipping_status, courier_partner, tracking_number, order_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = ['PP-TEST', 'Test', 'test@test.com', '1234567890', 'Ship addr', 'addr', 'city', 'state', '12345', '[]', 100, 'Online', 'Paid', 'pay_test', 'Processing', 'BD', 'track', '2023-01-01'];
    
    try {
      const res = await query(sql, values);
      output.push('INSERT result: ' + JSON.stringify(res));
    } catch (err: any) {
      output.push('INSERT error: ' + err.message);
    }
    
    return NextResponse.json({ success: true, log: output });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message, log: output });
  }
}
