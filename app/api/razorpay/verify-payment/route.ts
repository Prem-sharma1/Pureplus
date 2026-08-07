import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret || keySecret === 'your_razorpay_key_secret_here') {
      return NextResponse.json({
        success: false,
        error: 'Razorpay keys are not configured. Please add RAZORPAY_KEY_SECRET to your .env.local file.',
      }, { status: 400 });
    }

    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      items,
      amount
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({
        success: false,
        error: 'Missing required validation fields (order_id, payment_id, or signature)',
      }, { status: 400 });
    }

    // Step 1: Create HMAC SHA-256 hash using the Razorpay Secret Key
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    // Step 2: Compare generated signature with the signature returned from client
    const isSignatureValid = generatedSignature === razorpay_signature;

    if (isSignatureValid) {
      const order_date = new Date().toISOString().split('T')[0];
      const order_number = String(Math.floor(1000000000 + Math.random() * 9000000000));

      let courier_partner = '';
      let tracking_number = '';
      let shipping_status = 'Processing';

      // Update the order created by the frontend
      const updateSql = `
        UPDATE orders 
        SET shipping_status = ?, courier_partner = ?, tracking_number = ?
        WHERE payment_id = ?
      `;

      const values = [
        shipping_status,
        courier_partner,
        tracking_number,
        razorpay_payment_id
      ];

      let dbLogged = false;
      try {
        const result = await query(updateSql, values);
        if (result !== null) {
          dbLogged = true;
        }
      } catch (dbErr) {
        console.error('Failed to write order to database:', dbErr);
      }

      return NextResponse.json({
        success: true,
        message: 'Payment verified.',
        orderNumber: order_number,
        trackingNumber: tracking_number,
        courierPartner: courier_partner,
        dbLogged: dbLogged
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Payment verification failed. Signatures do not match.',
      }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Razorpay Payment Verification Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Server error',
    }, { status: 500 });
  }
}

