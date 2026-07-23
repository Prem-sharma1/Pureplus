import { NextResponse } from 'next/server';
import { query, testConnection } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    const isDbConnected = await testConnection();
    if (!isDbConnected) {
      return NextResponse.json({
        success: false,
        error: 'Database connection failed',
        orders: []
      });
    }

    let dbOrders: any[] | null = null;

    // Ensure orders table exists in MySQL database
    await query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(255),
        customer_email VARCHAR(255),
        customer_phone VARCHAR(50),
        address TEXT,
        city VARCHAR(100),
        state VARCHAR(100),
        pincode VARCHAR(20),
        items_json LONGTEXT,
        total_amount DECIMAL(10, 2),
        payment_method VARCHAR(50) DEFAULT 'COD',
        payment_status VARCHAR(50) DEFAULT 'Pending',
        shipping_status VARCHAR(50) DEFAULT 'Processing',
        courier_partner VARCHAR(100) DEFAULT NULL,
        tracking_number VARCHAR(100) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    if (email && email !== 'all') {
      dbOrders = await query<any[]>(
        'SELECT * FROM orders WHERE customer_email = ? ORDER BY id DESC',
        [email]
      );
    } else {
      // Fetch all orders for Admin view
      dbOrders = await query<any[]>('SELECT * FROM orders ORDER BY id DESC');
    }

    if (!dbOrders) {
      return NextResponse.json({
        success: true,
        orders: []
      });
    }

    // Parse JSON items string back into an object array for the client
    const orders = dbOrders.map(order => {
      let items = [];
      try {
        if (order.items_json) {
          items = JSON.parse(order.items_json);
        }
      } catch (err) {
        console.error(`Error parsing items_json for order ${order.id}:`, err);
      }
      return {
        ...order,
        items
      };
    });

    return NextResponse.json({
      success: true,
      orders
    });

  } catch (error: any) {
    console.error('API GET Orders error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Server error',
      orders: []
    }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const isDbConnected = await testConnection();
    if (!isDbConnected) {
      return NextResponse.json({ success: false, error: 'Database connection failed' }, { status: 500 });
    }

    const data = await req.json();
    const { id, shipping_status, courier_partner, tracking_number } = data;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Order ID is required' }, { status: 400 });
    }

    const fieldsToUpdate: string[] = [];
    const values: any[] = [];

    if (shipping_status !== undefined) {
      fieldsToUpdate.push('shipping_status = ?');
      values.push(shipping_status);
    }
    if (courier_partner !== undefined) {
      fieldsToUpdate.push('courier_partner = ?');
      values.push(courier_partner);
    }
    if (tracking_number !== undefined) {
      fieldsToUpdate.push('tracking_number = ?');
      values.push(tracking_number);
    }

    if (fieldsToUpdate.length === 0) {
      return NextResponse.json({ success: false, error: 'No fields provided for update' }, { status: 400 });
    }

    values.push(id);
    const sql = `UPDATE orders SET ${fieldsToUpdate.join(', ')} WHERE id = ?`;
    await query(sql, values);

    return NextResponse.json({
      success: true,
      message: 'Order updated successfully'
    });
  } catch (error: any) {
    console.error('API PUT Orders error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}
