import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, phone, email, interest, requirements } = body;

    if (!fullName || !phone || !email) {
      return NextResponse.json(
        { error: 'Full Name, Phone Number, and Email are required fields.' },
        { status: 400 }
      );
    }

    // Log B2B enquiry to console / server logs for tracking
    console.log('[B2B_PARTNERSHIP_ENQUIRY]', {
      fullName,
      phone,
      email,
      interest: interest || 'Distributor / Retail Store Supply',
      requirements: requirements || 'N/A',
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your B2B enquiry has been received. Our corporate team will contact you shortly.',
    });
  } catch (err: unknown) {
    console.error('[B2B_ENQUIRY_ERROR]', err);
    return NextResponse.json(
      { error: 'Failed to process B2B enquiry. Please try again or contact us via WhatsApp.' },
      { status: 500 }
    );
  }
}
