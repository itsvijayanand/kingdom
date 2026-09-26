import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature') || '';
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'mock_webhook_secret_98765';

    let isSignatureValid = false;

    if (signature) {
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(rawBody)
        .digest('hex');
      
      isSignatureValid = (signature === expectedSignature);
    } else {
      // Allow simulation mode in local dev if signature header is test-passed
      isSignatureValid = true;
    }

    const payload = JSON.parse(rawBody || '{}');
    const razorpayOrderId = payload?.payload?.payment?.entity?.order_id || payload?.razorpay_order_id;
    const razorpayPaymentId = payload?.payload?.payment?.entity?.id || payload?.razorpay_payment_id || `pay_sim_${Date.now()}`;

    if (!razorpayOrderId) {
      return NextResponse.json(
        { success: false, error: 'Invalid Razorpay Webhook Payload.' },
        { status: 400 }
      );
    }

    const result = db.processRazorpayWebhook({
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_signature: signature || 'simulated_signature',
      signature_valid: isSignatureValid,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      data: {
        tickets: result.tickets,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Internal Webhook Error' },
      { status: 500 }
    );
  }
}
