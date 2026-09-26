import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const metrics = db.getAdminDashboardMetrics();
    const recentScanLogs = db.getScanLogs().slice(0, 15);
    const tickets = db.getTickets();
    const orders = db.getOrders();
    const ticketTypes = db.getTicketTypes();

    return NextResponse.json({
      success: true,
      data: {
        metrics,
        recentScanLogs,
        tickets,
        orders,
        ticketTypes,
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Admin API error' },
      { status: 500 }
    );
  }
}
