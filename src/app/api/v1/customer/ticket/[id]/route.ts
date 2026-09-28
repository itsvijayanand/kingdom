import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const booking = db.lookupAnyBooking(id);

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking or ticket not found for the provided identifier.' },
        { status: 404 }
      );
    }

    const event = db.getEventInfo();

    return NextResponse.json({
      success: true,
      data: {
        booking,
        ticket: booking, // fallback for legacy event consumers
        event: {
          title: event.title,
          artist_name: event.artist_name,
          event_date: event.event_date,
          venue_name: event.venue_name,
          city: event.city,
        }
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Failed to fetch booking details.' }, { status: 500 });
  }
}

