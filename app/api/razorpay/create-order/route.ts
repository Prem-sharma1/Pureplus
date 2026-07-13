import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret || keyId === 'your_razorpay_key_id_here' || keySecret === 'your_razorpay_key_secret_here') {
      return NextResponse.json({
        success: false,
        error: 'Razorpay keys are not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env.local file.',
      }, { status: 400 });
    }

    const { amount } = await req.json();

    if (!amount || isNaN(amount)) {
      return NextResponse.json({ success: false, error: 'Invalid or missing amount' }, { status: 400 });
    }

    // Razorpay expects amount in paise (1 INR = 100 Paise)
    const amountInPaise = Math.round(parseFloat(amount) * 100);

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    const res = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `receipt_rcpt_${Date.now()}`,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error('Razorpay Order API error:', errorData);
      return NextResponse.json({ success: false, error: 'Failed to create order with Razorpay.' }, { status: res.status });
    }

    const order = await res.json();

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error: any) {
    console.error('Razorpay Create Order Route Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Server error',
    }, { status: 500 });
  }
}
