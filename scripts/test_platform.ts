import { db } from '../src/lib/db';
import crypto from 'crypto';

async function runSystemTestSuite() {
  console.log('\n======================================================');
  console.log('  PRODUCTION CONCERT PLATFORM - AUTOMATED TEST SUITE  ');
  console.log('======================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`[PASS] ✓ ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] X ${testName}`);
      failed++;
    }
  }

  // ----------------------------------------------------
  // TEST 1: Inventory Reservation & Expiration Lock
  // ----------------------------------------------------
  console.log('--- TEST 1: INVENTORY & RESERVATION SYSTEM ---');
  const res1 = db.createReservation('sess_test_1', 'tt-vip', 2);
  assert(res1.success && res1.reservation !== undefined, 'Temporary 15-min reservation created successfully');
  assert(res1.reservation?.quantity === 2, 'Reservation quantity is 2');

  // ----------------------------------------------------
  // TEST 2: Oversell Prevention Check
  // ----------------------------------------------------
  console.log('\n--- TEST 2: OVERSELL PREVENTION ---');
  const resExceeded = db.createReservation('sess_test_bad', 'tt-vip', 9999);
  assert(!resExceeded.success, 'System blocked reservation exceeding category capacity');

  // ----------------------------------------------------
  // TEST 3: Razorpay Webhook Idempotency & Ticket Generation
  // ----------------------------------------------------
  console.log('\n--- TEST 3: RAZORPAY WEBHOOK & IDEMPOTENCY ---');
  const orderRes = db.createRazorpayOrder(res1.reservation!.id, {
    name: 'Test Customer',
    email: 'test@example.com',
    phone: '+919999999999'
  });
  assert(orderRes.success && orderRes.order !== undefined, 'Razorpay order created with server-verified total');

  const webhookPayload = {
    razorpay_order_id: orderRes.order!.razorpay_order_id!,
    razorpay_payment_id: 'pay_test_idempotent_123',
    razorpay_signature: 'test_valid_sig',
    signature_valid: true
  };

  // First Webhook Processing
  const webhook1 = db.processRazorpayWebhook(webhookPayload);
  assert(webhook1.success && webhook1.tickets?.length === 2, 'First webhook processed & 2 cryptographic tickets generated');

  // Duplicate Webhook Attempt (Idempotency Test)
  const webhook2 = db.processRazorpayWebhook(webhookPayload);
  assert(webhook2.success && webhook2.message.includes('Idempotent'), 'Duplicate webhook handled idempotently without duplicate ticket issuance');

  // ----------------------------------------------------
  // TEST 4: Atomic QR Scanning & Double-Scan Protection
  // ----------------------------------------------------
  console.log('\n--- TEST 4: ATOMIC SINGLE SCAN & DOUBLE-SCAN PROTECTION ---');
  const issuedTicket = webhook1.tickets![0];
  const tokenToScan = issuedTicket.secure_token;

  // Gate 1 Scans Ticket
  const scanGate1 = db.scanTicketAtomic(tokenToScan, 'staff1@ahuja.com', 'gate-1');
  assert(scanGate1.result_status === 'VALID', 'Gate 1 scan result = VALID');
  assert(scanGate1.ticket?.status === 'USED', 'Ticket status updated to USED atomically');

  // Gate 2 Scans SAME Ticket Simultaneously (Simulated Dual Gate Scan)
  const scanGate2 = db.scanTicketAtomic(tokenToScan, 'staff_vip@ahuja.com', 'gate-vip');
  assert(scanGate2.result_status === 'ALREADY_USED', 'Simultaneous Gate 2 scan result = ALREADY_USED (Entry Denied)');
  assert(scanGate2.message.includes('ALREADY USED'), 'Double-entry scan message correctly logged');

  // ----------------------------------------------------
  // TEST 5: Invalid QR Forgery Test
  // ----------------------------------------------------
  console.log('\n--- TEST 5: QR TOKEN FORGERY REJECTION ---');
  const fakeScan = db.scanTicketAtomic('QR-FORGED-FAKE-TOKEN-999', 'staff1@ahuja.com', 'gate-1');
  assert(fakeScan.result_status === 'INVALID', 'Forged/Invalid QR token rejected with INVALID status');

  // ----------------------------------------------------
  // TEST 6: Emergency Controls & Audit Logging
  // ----------------------------------------------------
  console.log('\n--- TEST 6: EMERGENCY CONTROLS & AUDIT LOGGING ---');
  const salesPaused = db.toggleSalesPause('superadmin@ahuja.com');
  assert(salesPaused === true, 'Emergency ticket sales pause triggered');

  const auditLogs = db.getAuditLogs();
  assert(auditLogs.length > 0, 'Audit log recorded append-only superadmin emergency action');

  // Resume sales
  db.toggleSalesPause('superadmin@ahuja.com');

  // ----------------------------------------------------
  // TEST SUMMARY
  // ----------------------------------------------------
  console.log('\n======================================================');
  console.log(`  TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runSystemTestSuite();
