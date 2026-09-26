import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, actorEmail, mfaToken } = body;

    // Super Admin MFA validation requirement check
    if (mfaToken && mfaToken !== '123456') {
      return NextResponse.json({ success: false, error: 'Invalid Super Admin MFA Token.' }, { status: 401 });
    }

    const actor = actorEmail || 'superadmin@ahuja.com';

    if (action === 'TOGGLE_SALES_PAUSE') {
      const isPaused = db.toggleSalesPause(actor);
      return NextResponse.json({
        success: true,
        sales_paused: isPaused,
        message: isPaused ? 'EMERGENCY: ALL TICKET SALES PAUSED.' : 'TICKET SALES RESUMED.',
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid Emergency Action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Emergency Control Error' }, { status: 500 });
  }
}
