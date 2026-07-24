import { NextResponse } from 'next/server';
import { downloadBigshipDocument } from '@/lib/bigship';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');
    const docType = (searchParams.get('type') || 'label') as 'label' | 'invoice' | 'manifest' | 'ewaybill';

    if (!orderId) {
      return NextResponse.json({
        success: false,
        error: 'Bigship CustomGlobalOrderId is required',
      }, { status: 400 });
    }

    const docData = await downloadBigshipDocument(orderId, docType);

    if (docData && docData.status && docData.data?.AttachmentData) {
      return NextResponse.json({
        success: true,
        downloadUrl: docData.data.AttachmentData,
        mimeType: docData.data.File_extention || 'application/pdf',
      });
    } else {
      return NextResponse.json({
        success: false,
        error: docData?.message || `Failed to download Bigship ${docType} document`,
      }, { status: 400 });
    }
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE' || error?.message?.includes('DYNAMIC_SERVER_USAGE')) {
      throw error;
    }
    console.error('Bigship Document Download API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to download Bigship document',
    }, { status: 500 });
  }
}
