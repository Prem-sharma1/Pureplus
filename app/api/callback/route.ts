import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, Email, and Mobile number are required fields.' },
        { status: 400 }
      );
    }

    // Console logging callback request for record keeping / server side handling
    console.log('[CALLBACK_REQUEST_RECEIVED]', {
      name,
      email,
      phone,
      message,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your call back request has been submitted. Our team will contact you shortly.',
    });
  } catch (err: unknown) {
    console.error('[CALLBACK_REQUEST_ERROR]', err);
    return NextResponse.json(
      { error: 'Failed to submit callback request. Please try again or email impexsaish@gmail.com directly.' },
      { status: 500 }
    );
  }
}
