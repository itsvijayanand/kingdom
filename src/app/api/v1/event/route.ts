import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const event = db.getEventInfo();
    const ticketTypes = db.getTicketTypes();
    const gates = db.getGates();

    return NextResponse.json({
      success: true,
      data: {
        event,
        ticketTypes,
        gates,
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch event data.' },
      { status: 500 }
    );
  }
}
