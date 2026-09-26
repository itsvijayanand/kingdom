import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, ticketTypeId, quantity } = body;

    if (!sessionId || !ticketTypeId || !quantity) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters: sessionId, ticketTypeId, quantity.' },
        { status: 400 }
      );
    }

    const result = db.createReservation(sessionId, ticketTypeId, Number(quantity));

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.reservation,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to process reservation request.' },
      { status: 500 }
    );
  }
}
