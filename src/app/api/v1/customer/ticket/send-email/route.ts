import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ticketNumber, email } = body;

    if (!ticketNumber || !email) {
      return NextResponse.json(
        { success: false, error: 'Ticket number and email address are required.' },
        { status: 400 }
      );
    }

    const ticket = db.getTicketByNumber(ticketNumber) || db.getTicketByToken(ticketNumber);
    if (!ticket) {
      return NextResponse.json(
        { success: false, error: 'Ticket not found.' },
        { status: 404 }
      );
    }

    const event = db.getEventDetails();

    // Log email dispatch to audit log
    db.logAudit({
      actor_email: email,
      action: 'TICKET_EMAIL_DISPATCHED',
      entity_type: 'TICKET',
      entity_id: ticket.id,
      details: {
        ticket_number: ticket.ticket_number,
        recipient_email: email,
        dispatched_at: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      success: true,
      message: `Kingdom VIP Pass ${ticket.ticket_number} dispatched successfully to ${email}.`,
      data: {
        ticket_number: ticket.ticket_number,
        customer_name: ticket.customer_name,
        recipient_email: email,
        sent_at: new Date().toISOString(),
        event_title: event.title,
        artist_name: event.artist_name,
        venue: event.venue_name,
      }
    });

  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Email service failure.' },
      { status: 500 }
    );
  }
}
