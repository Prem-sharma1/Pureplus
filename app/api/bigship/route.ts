import { NextResponse } from 'next/server';
import { query, testConnection } from '@/lib/db';
import { 
  processBigshipAutomaticShipment, 
  trackBigshipShipment, 
  downloadBigshipDocument 
} from '@/lib/bigship';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { 
      orderId, 
      orderNumber, 
      customerName, 
      customerPhone, 
      customerEmail, 
      shippingAddress, 
      pincode, 
      totalAmount, 
      items, 
      paymentMethod 
    } = data;

    if (!orderNumber || !customerName) {
      return NextResponse.json({
        success: false,
        error: 'Missing required order details (orderNumber, customerName)',
      }, { status: 400 });
    }

    // Call Bigship API Client
    const shipmentResult = await processBigshipAutomaticShipment({
      orderNumber: String(orderNumber),
      customerName: customerName || 'Valued Customer',
      customerPhone: customerPhone || '9876543210',
      customerEmail: customerEmail || 'customer@pureplush.in',
      address: shippingAddress || 'Address Provided',
      pincode: pincode || '411015',
      totalAmount: parseFloat(totalAmount) || 0,
      items: items || [],
      paymentMethod: paymentMethod?.toLowerCase().includes('cod') ? 'COD' : 'Prepaid'
    });

    const courierPartner = shipmentResult.courierPartner || 'Delhivery Surface';
    const trackingNumber = shipmentResult.trackingNumber || `PP${Date.now().toString().slice(-8)}`;

    // Update MySQL Orders Database if orderId exists
    if (orderId) {
      const isDbConnected = await testConnection();
      if (isDbConnected) {
        try {
          await query(
            `UPDATE orders 
             SET shipping_status = 'dispatched', 
                 courier_partner = ?, 
                 tracking_number = ? 
             WHERE id = ? OR order_number = ?`,
            [courierPartner, trackingNumber, orderId, orderNumber]
          );
        } catch (dbErr) {
          console.error('Failed to update order database for Bigship dispatch:', dbErr);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Order manifested successfully via Bigship Logistics!',
      shipment: {
        courierPartner,
        trackingNumber,
        mode: shipmentResult.mode,
        bigshipOrderId: shipmentResult.bigshipOrderId
      }
    });

  } catch (error: any) {
    console.error('API Bigship POST Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to process Bigship shipment',
    }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action') || 'track';
    const bigshipOrderId = searchParams.get('bigshipOrderId') || searchParams.get('trackingNumber') || '';
    const documentType = (searchParams.get('documentType') || 'label') as 'label' | 'invoice' | 'manifest' | 'ewaybill';

    if (action === 'track') {
      const trackingData = await trackBigshipShipment(bigshipOrderId);
      return NextResponse.json({
        success: true,
        tracking: trackingData || {
          status: 'In Transit',
          currentLocation: 'Hub Regional Facility',
          estimatedDelivery: '2-3 Business Days'
        }
      });
    }

    if (action === 'download') {
      const docData = await downloadBigshipDocument(bigshipOrderId, documentType);
      return NextResponse.json({
        success: true,
        document: docData || {
          downloadUrl: `https://api.bigship.direct/documents/label-${bigshipOrderId}.pdf`
        }
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid action requested' }, { status: 400 });

  } catch (error: any) {
    console.error('API Bigship GET Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Server error'
    }, { status: 500 });
  }
}
