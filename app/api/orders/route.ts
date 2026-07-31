import { NextResponse } from 'next/server';
import { query, testConnection } from '@/lib/db';

export const dynamic = 'force-dynamic';

// In-memory fallback store for offline DB mode
let memoryOrders: any[] = [];
let memoryOrderCounter = 500;

async function ensureOrdersTable() {
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

  // Safe alter columns if table pre-existed with different columns
  try {
    const cols = await query<any[]>('SHOW COLUMNS FROM orders');
    const existingColNames = cols ? cols.map(c => c.Field) : [];

    if (!existingColNames.includes('order_number')) {
      await query('ALTER TABLE orders ADD COLUMN order_number VARCHAR(50) DEFAULT NULL');
    }
    if (!existingColNames.includes('shipping_address')) {
      await query('ALTER TABLE orders ADD COLUMN shipping_address TEXT DEFAULT NULL');
    }
    if (!existingColNames.includes('payment_id')) {
      await query('ALTER TABLE orders ADD COLUMN payment_id VARCHAR(100) DEFAULT NULL');
    }
    if (!existingColNames.includes('order_date')) {
      await query('ALTER TABLE orders ADD COLUMN order_date VARCHAR(50) DEFAULT NULL');
    }
  } catch (err) {
    console.warn('Orders alter columns check warning:', err);
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    const isDbConnected = await testConnection();
    if (!isDbConnected) {
      const filteredMem = email && email !== 'all'
        ? memoryOrders.filter(o => o.customer_email === email)
        : memoryOrders;
      return NextResponse.json({
        success: true,
        source: 'memory_fallback',
        orders: filteredMem
      });
    }

    await ensureOrdersTable();

    let dbOrders: any[] | null = null;
    if (email && email !== 'all') {
      dbOrders = await query<any[]>(
        'SELECT * FROM orders WHERE customer_email = ? ORDER BY id DESC',
        [email]
      );
    } else {
      dbOrders = await query<any[]>('SELECT * FROM orders ORDER BY id DESC');
    }

    if (!dbOrders) {
      return NextResponse.json({
        success: true,
        orders: []
      });
    }

    const orders = dbOrders.map(order => {
      let items = [];
      try {
        if (typeof order.items_json === 'string' && order.items_json.trim() !== '') {
          items = JSON.parse(order.items_json);
        } else if (Array.isArray(order.items_json)) {
          items = order.items_json;
        }
      } catch (err) {
        console.error(`Error parsing items_json for order ${order.id}:`, err);
      }
      return {
        ...order,
        shipping_address: order.shipping_address || order.address || '',
        items
      };
    });

    return NextResponse.json({
      success: true,
      orders
    });

  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE' || error?.message?.includes('DYNAMIC_SERVER_USAGE')) {
      throw error;
    }
    console.error('API GET Orders error:', error);
    return NextResponse.json({
      success: true,
      orders: memoryOrders
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      address,
      city,
      state,
      pincode,
      items,
      total_amount,
      payment_method,
      payment_status,
      payment_id,
      order_number,
      courier_partner,
      tracking_number,
      shipping_status
    } = body;

    if (!customer_name || !customer_phone || !items || !total_amount) {
      return NextResponse.json({
        success: false,
        error: 'Missing required order fields (customer_name, customer_phone, items, total_amount)'
      }, { status: 400 });
    }

    const finalAddress = shipping_address || address || '';
    const finalOrderNumber = order_number || `PP-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const orderDate = new Date().toISOString().split('T')[0];
    const itemsJson = typeof items === 'string' ? items : JSON.stringify(items);

    const isDbConnected = await testConnection();

    if (!isDbConnected) {
      memoryOrderCounter += 1;
      const memOrder = {
        id: memoryOrderCounter,
        order_number: finalOrderNumber,
        customer_name: customer_name.trim(),
        customer_email: (customer_email || '').trim(),
        customer_phone: customer_phone.trim(),
        shipping_address: finalAddress,
        address: finalAddress,
        city: city || '',
        state: state || '',
        pincode: pincode || '',
        items: Array.isArray(items) ? items : JSON.parse(itemsJson),
        total_amount: parseFloat(total_amount),
        payment_method: payment_method || 'Prepaid - Razorpay',
        payment_status: payment_status || 'Paid',
        payment_id: payment_id || `pay_${Date.now()}`,
        shipping_status: shipping_status || 'Processing',
        courier_partner: courier_partner || 'BlueDart Express',
        tracking_number: tracking_number || `BD${Date.now().toString().slice(-8)}`,
        order_date: orderDate,
        created_at: new Date().toISOString()
      };

      memoryOrders.unshift(memOrder);

      return NextResponse.json({
        success: true,
        source: 'memory_fallback',
        message: 'Order saved successfully!',
        orderNumber: finalOrderNumber,
        orderId: memoryOrderCounter
      });
    }

    await ensureOrdersTable();

    const sql = `
      INSERT INTO orders (
        order_number,
        customer_name,
        customer_email,
        customer_phone,
        shipping_address,
        address,
        city,
        state,
        pincode,
        items_json,
        total_amount,
        payment_method,
        payment_status,
        payment_id,
        shipping_status,
        courier_partner,
        tracking_number,
        order_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      finalOrderNumber,
      customer_name.trim(),
      (customer_email || '').trim(),
      customer_phone.trim(),
      finalAddress,
      finalAddress,
      city || '',
      state || '',
      pincode || '',
      itemsJson,
      parseFloat(total_amount),
      payment_method || 'Prepaid - Razorpay',
      payment_status || 'Paid',
      payment_id || `pay_${Date.now()}`,
      shipping_status || 'Processing',
      courier_partner || 'BlueDart Express',
      tracking_number || `BD${Date.now().toString().slice(-8)}`,
      orderDate
    ];

    const result: any = await query(sql, values);

    return NextResponse.json({
      success: true,
      source: 'database',
      message: 'Order saved successfully to database!',
      orderNumber: finalOrderNumber,
      orderId: result?.insertId
    });

  } catch (error: any) {
    console.error('API POST Orders error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to save order'
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
    const { id, shipping_status, courier_partner, tracking_number, payment_status } = data;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Order ID is required' }, { status: 400 });
    }

    const fieldsToUpdate: string[] = [];
    const values: any[] = [];

    if (shipping_status !== undefined) {
      fieldsToUpdate.push('shipping_status = ?');
      values.push(shipping_status);
    }
    if (payment_status !== undefined) {
      fieldsToUpdate.push('payment_status = ?');
      values.push(payment_status);
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
