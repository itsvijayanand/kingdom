import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, staffId, gateId } = body;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'QR Token is required for scanning validation.' },
        { status: 400 }
      );
    }

    // Atomic execution with lock semantics to prevent dual-gate entry
    const scanResult = db.scanTicketAtomic(token, staffId || 'staff-gate1', gateId || 'gate-1');

    return NextResponse.json({
      success: scanResult.result_status === 'VALID',
      result_status: scanResult.result_status,
      message: scanResult.message,
      ticket: scanResult.ticket,
      scan_log: scanResult.scan_log,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Scanner API Error' },
      { status: 500 }
    );
  }
}
