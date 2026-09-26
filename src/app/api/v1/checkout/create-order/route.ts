import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reservationId, customerName, customerEmail, customerPhone } = body;

    if (!reservationId || !customerName || !customerEmail || !customerPhone) {
      return NextResponse.json(
        { success: false, error: 'Missing required customer details.' },
        { status: 400 }
      );
    }

    const result = db.createRazorpayOrder(reservationId, {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        order: result.order,
        razorpayKeyId: result.razorpayKeyId,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to create payment order.' },
      { status: 500 }
    );
  }
}
