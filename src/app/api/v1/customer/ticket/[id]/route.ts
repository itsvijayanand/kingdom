import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ticket = db.getTicketByNumberOrToken(id);

    if (!ticket) {
      return NextResponse.json(
        { success: false, error: 'Ticket not found or invalid authorization.' },
        { status: 404 }
      );
    }

    const event = db.getEventInfo();

    return NextResponse.json({
      success: true,
      data: {
        ticket,
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
    return NextResponse.json({ success: false, error: 'Failed to fetch ticket.' }, { status: 500 });
  }
}
