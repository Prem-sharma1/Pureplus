import { NextResponse } from 'next/server';
import { trackBigshipShipment } from '@/lib/bigship';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json({
        success: false,
        error: 'Bigship CustomGlobalOrderId is required',
      }, { status: 400 });
    }

    const trackData = await trackBigshipShipment(orderId);

    if (trackData && trackData.status) {
      return NextResponse.json({
        success: true,
        data: trackData.data,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: trackData?.message || 'Failed to fetch live Bigship tracking status',
      }, { status: 400 });
    }
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE' || error?.message?.includes('DYNAMIC_SERVER_USAGE')) {
      throw error;
    }
    console.error('Bigship Tracking API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch Bigship tracking info',
    }, { status: 500 });
  }
}
