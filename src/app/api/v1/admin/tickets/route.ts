import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { action, ticketTypeId, price, capacity, isEnabled, ticketId, newStatus, actorEmail } = body;

    const actor = actorEmail || 'superadmin@ahuja.com';

    if (action === 'UPDATE_CONFIG') {
      const ok = db.updateTicketTypePriceAndCapacity(ticketTypeId, Number(price), Number(capacity), Boolean(isEnabled), actor);
      if (!ok) {
        return NextResponse.json({ success: false, error: 'Ticket type not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: 'Ticket category config updated successfully.' });
    }

    if (action === 'CHANGE_STATUS') {
      const ok = db.blockOrCancelTicket(ticketId, newStatus, actor);
      if (!ok) {
        return NextResponse.json({ success: false, error: 'Ticket not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: `Ticket status updated to ${newStatus}.` });
    }

    return NextResponse.json({ success: false, error: 'Invalid admin action.' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Failed to update ticket.' }, { status: 500 });
  }
}
