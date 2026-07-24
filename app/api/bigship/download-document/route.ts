import { NextResponse } from 'next/server';
import { downloadBigshipDocument } from '@/lib/bigship';

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
    console.error('Bigship Document Download API Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal Server Error',
    }, { status: 500 });
  }
}
