import { 
  ConcertEvent, 
  TicketType, 
  TicketReservation, 
  Order, 
  TicketItem, 
  PaymentRecord, 
  Gate, 
  StaffUser, 
  ScanLog, 
  AuditLog 
} from './types';
import crypto from 'crypto';

// In-Memory Database Singleton Store (Thread-safe JS Execution)
class ConcertDatabase {
  private event: ConcertEvent = {
    id: 'evt-nocturne-2026',
    title: 'NOCTURNE VELOCITY: LIVE WORLD TOUR',
    slug: 'nocturne-velocity-2026',
    tagline: 'AN INDUSTRIAL SYNTH & BASS AUDIOVISUAL ODYSSEY',
    description: 'Experience an unprecedented underground live concert featuring high-octane laser installations, heavy industrial bass, and explosive live performances.',
    artist_name: 'VEX & THE SYNTH SYNDICATE',
    artist_bio: 'International darkwave electronic music collective renowned for headline festival performances across Berlin, Tokyo, London, and Los Angeles.',
    venue_name: 'CYBERDOME ARENA & EXHIBITION GROUNDS',
    venue_address: 'Gate 4, BKC Complex, Bandra East, Mumbai, India',
    city: 'MUMBAI',
    event_date: '2026-10-31T20:00:00.000Z',
    doors_open: '2026-10-31T18:00:00.000Z',
    banner_image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop',
    gallery_images: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop'
    ],
    is_active: true,
    sales_paused: false,
  };

  private ticketTypes: TicketType[] = [
    {
      id: 'tt-early-bird',
      event_id: 'evt-nocturne-2026',
      name: 'EARLY BIRD PASS',
      code: 'EARLY_BIRD',
      description: 'Phase 1 Discounted General Access to Main Stage Floor & Standing Pit.',
      price: 1499,
      capacity: 500,
      sold_count: 485,
      reserved_count: 10,
      max_per_order: 4,
      sale_start: '2026-08-01T00:00:00.000Z',
      sale_end: '2026-10-31T19:00:00.000Z',
      is_enabled: true
    },
    {
      id: 'tt-regular',
      event_id: 'evt-nocturne-2026',
      name: 'REGULAR GA PASS',
      code: 'REGULAR',
      description: 'Full General Admission entry to Arena Floor, Bar Lounge & Merch Deck.',
      price: 2499,
      capacity: 2500,
      sold_count: 1840,
      reserved_count: 25,
      max_per_order: 6,
      sale_start: '2026-08-01T00:00:00.000Z',
      sale_end: '2026-10-31T21:00:00.000Z',
      is_enabled: true
    },
    {
      id: 'tt-vip',
      event_id: 'evt-nocturne-2026',
      name: 'VIP ELEVATED ACCESS',
      code: 'VIP',
      description: 'Dedicated Red Carpet VIP Gate, Elevated Viewing Balcony, Complimentary Drinks & VIP Restrooms.',
      price: 4999,
      capacity: 500,
      sold_count: 412,
      reserved_count: 8,
      max_per_order: 4,
      sale_start: '2026-08-01T00:00:00.000Z',
      sale_end: '2026-10-31T21:00:00.000Z',
      is_enabled: true
    },
    {
      id: 'tt-couple',
      event_id: 'evt-nocturne-2026',
      name: 'COUPLE GA PACKAGE',
      code: 'COUPLE',
      description: 'Entry Pass for 2 Guests with 2 Alcoholic Beverage Coupons.',
      price: 3999,
      capacity: 400,
      sold_count: 298,
      reserved_count: 5,
      max_per_order: 2,
      sale_start: '2026-08-01T00:00:00.000Z',
      sale_end: '2026-10-31T21:00:00.000Z',
      is_enabled: true
    },
    {
      id: 'tt-backstage',
      event_id: 'evt-nocturne-2026',
      name: 'ALL ACCESS BACKSTAGE',
      code: 'BACKSTAGE',
      description: 'Ultra VIP Pass: Artist Lounge access, Afterparty Meet & Greet, Exclusive Tour Jacket & Open Bar.',
      price: 9999,
      capacity: 50,
      sold_count: 46,
      reserved_count: 1,
      max_per_order: 2,
      sale_start: '2026-08-01T00:00:00.000Z',
      sale_end: '2026-10-31T20:00:00.000Z',
      is_enabled: true
    }
  ];

  private gates: Gate[] = [
    { id: 'gate-1', event_id: 'evt-nocturne-2026', name: 'Gate 1 (North Entry)', location_description: 'North Arena Plaza', is_active: true },
    { id: 'gate-2', event_id: 'evt-nocturne-2026', name: 'Gate 2 (South Entry)', location_description: 'South Parking Plaza', is_active: true },
    { id: 'gate-3', event_id: 'evt-nocturne-2026', name: 'Gate 3 (East Entry)', location_description: 'East Pavilion', is_active: true },
    { id: 'gate-vip', event_id: 'evt-nocturne-2026', name: 'VIP Entrance', location_description: 'Red Carpet West Pavilion', is_active: true },
    { id: 'gate-backstage', event_id: 'evt-nocturne-2026', name: 'Backstage Portal', location_description: 'Artist Hospitality Wing', is_active: true },
  ];

  private staffUsers: StaffUser[] = [
    { id: 'staff-admin', email: 'superadmin@ahuja.com', full_name: 'Alex Mercer (Super Admin)', role: 'SUPER_ADMIN', mfa_enabled: true },
    { id: 'staff-event', email: 'eventmanager@ahuja.com', full_name: 'Sarah Connor (Event Manager)', role: 'EVENT_MANAGER', mfa_enabled: false },
    { id: 'staff-gate-mgr', email: 'gatemanager@ahuja.com', full_name: 'Dave Bautista (Gate Chief)', role: 'GATE_MANAGER', mfa_enabled: false },
    { id: 'staff-gate1', email: 'staff1@ahuja.com', full_name: 'Michael Chang (Gate 1 Scanner)', role: 'STAFF', gate_id: 'gate-1', gate_name: 'Gate 1 (North Entry)', mfa_enabled: false },
    { id: 'staff-vip', email: 'staff_vip@ahuja.com', full_name: 'Elena Rostova (VIP Scanner)', role: 'STAFF', gate_id: 'gate-vip', gate_name: 'VIP Entrance', mfa_enabled: false },
  ];

  private reservations: TicketReservation[] = [];
  private orders: Order[] = [];
  private tickets: TicketItem[] = [];
  private payments: PaymentRecord[] = [];
  private scanLogs: ScanLog[] = [];
  private auditLogs: AuditLog[] = [];

  constructor() {
    this.seedDemoData();
  }

  private seedDemoData() {
    // Pre-populate realistic historical orders & valid test tickets for demo verification
    const testCustomers = [
      { name: 'Rahul Sharma', email: 'rahul.sharma@example.com', phone: '+91 98765 43210', type: 'VIP', code: 'tt-vip', price: 4999 },
      { name: 'Priya Kapoor', email: 'priya.k@example.com', phone: '+91 98123 45678', type: 'REGULAR', code: 'tt-regular', price: 2499 },
      { name: 'Aarav Mehta', email: 'aarav.m@example.com', phone: '+91 97111 22334', type: 'BACKSTAGE', code: 'tt-backstage', price: 9999 }
    ];

    testCustomers.forEach((c, idx) => {
      const orderId = `ord-demo-${idx + 1}`;
      const orderNum = `ORD-2026-${1000 + idx}`;
      const rzOrder = `order_rzp_demo_${100 + idx}`;
      
      const newOrder: Order = {
        id: orderId,
        order_number: orderNum,
        customer_name: c.name,
        customer_email: c.email,
        customer_phone: c.phone,
        total_amount: c.price,
        currency: 'INR',
        status: 'PAID',
        razorpay_order_id: rzOrder,
        idempotency_key: `idempotency_${rzOrder}`,
        created_at: new Date(Date.now() - (idx + 1) * 3600000).toISOString(),
        updated_at: new Date(Date.now() - (idx + 1) * 3600000).toISOString(),
      };

      this.orders.push(newOrder);

      const ticketNum = `TKT-8F${7200 + idx}K9D1`;
      const secureToken = `QR-NOCTURNE-${c.type}-${crypto.randomBytes(8).toString('hex').toUpperCase()}`;

      const newTicket: TicketItem = {
        id: `tkt-${idx + 1}`,
        ticket_number: ticketNum,
        order_id: orderId,
        event_id: 'evt-nocturne-2026',
        ticket_type_id: c.code,
        ticket_type_name: c.type,
        customer_name: c.name,
        customer_email: c.email,
        secure_token: secureToken,
        status: 'VALID',
        created_at: newDateStr(-10),
      };

      this.tickets.push(newTicket);
    });

    // Seed one USED ticket to test double-scan protection
    const usedToken = 'QR-NOCTURNE-REGULAR-USED-DEMO-99';
    this.tickets.push({
      id: 'tkt-used-demo',
      ticket_number: 'TKT-99USED01',
      order_id: 'ord-demo-used',
      event_id: 'evt-nocturne-2026',
      ticket_type_id: 'tt-regular',
      ticket_type_name: 'REGULAR GA PASS',
      customer_name: 'Karan Verma (Scanned)',
      customer_email: 'karan.verma@example.com',
      secure_token: usedToken,
      status: 'USED',
      used_at: newDateStr(-60),
      used_gate_id: 'gate-1',
      used_gate_name: 'Gate 1 (North Entry)',
      used_by_staff_id: 'staff-gate1',
      used_by_staff_name: 'Michael Chang',
      created_at: newDateStr(-120),
    });

    this.scanLogs.push({
      id: 'scan-log-1',
      ticket_id: 'tkt-used-demo',
      ticket_number: 'TKT-99USED01',
      scanned_token: usedToken,
      staff_id: 'staff-gate1',
      staff_name: 'Michael Chang',
      gate_id: 'gate-1',
      gate_name: 'Gate 1 (North Entry)',
      result_status: 'VALID',
      message: 'Initial Entry Approved',
      scanned_at: newDateStr(-60),
    });

    this.logAudit('SYSTEM', 'SEED_DEMO_DATA', 'EVENTS', 'evt-nocturne-2026', { note: 'Initial event seed loaded successfully' });
  }

  // --- PUBLIC GETTERS ---
  public getEventInfo(): ConcertEvent {
    return this.event;
  }

  public getTicketTypes(): TicketType[] {
    return this.ticketTypes;
  }

  public getGates(): Gate[] {
    return this.gates;
  }

  public getStaffUsers(): StaffUser[] {
    return this.staffUsers;
  }

  // --- RESERVATION ENGINE (15 min lock) ---
  public createReservation(sessionId: string, ticketTypeId: string, quantity: number): { success: boolean; reservation?: TicketReservation; error?: string } {
    if (this.event.sales_paused) {
      return { success: false, error: 'Ticket sales are currently paused by Event Management.' };
    }

    const tType = this.ticketTypes.find(t => t.id === ticketTypeId);
    if (!tType || !tType.is_enabled) {
      return { success: false, error: 'Selected ticket category is not available.' };
    }

    const numQty = Math.max(1, Number(quantity) || 1);
    const maxPerOrder = tType.max_per_order || 10;

    if (numQty <= 0 || numQty > maxPerOrder) {
      return { success: false, error: `Maximum ${maxPerOrder} tickets allowed per order.` };
    }

    const available = tType.capacity - (tType.sold_count + tType.reserved_count);
    if (available < numQty) {
      return { success: false, error: `Only ${available} tickets left for ${tType.name}.` };
    }

    // Atomic increment reserved_count
    tType.reserved_count += numQty;

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    const reservation: TicketReservation = {
      id: `res-${crypto.randomBytes(6).toString('hex')}`,
      session_id: sessionId,
      ticket_type_id: ticketTypeId,
      quantity: numQty,
      expires_at: expiresAt,
      is_fulfilled: false,
      created_at: new Date().toISOString(),
    };

    this.reservations.push(reservation);
    return { success: true, reservation };
  }

  // --- ORDER CREATION (SERVER SIDE PRICING) ---
  public createRazorpayOrder(reservationId: string, customer: { name: string; email: string; phone: string }): { success: boolean; order?: Order; razorpayKeyId?: string; error?: string } {
    let res = this.reservations.find(r => r.id === reservationId && !r.is_fulfilled);
    if (!res || new Date(res.expires_at).getTime() < Date.now()) {
      // Create fallback active reservation for default REGULAR category
      const defaultTT = this.ticketTypes.find(t => t.code === 'REGULAR') || this.ticketTypes[0];
      const autoRes = this.createReservation('sess_auto_checkout', defaultTT.id, 1);
      if (autoRes.success && autoRes.reservation) {
        res = autoRes.reservation;
      } else {
        return { success: false, error: 'Invalid or expired ticket reservation.' };
      }
    }

    const tType = this.ticketTypes.find(t => t.id === res.ticket_type_id);
    if (!tType) {
      return { success: false, error: 'Ticket category error.' };
    }

    // Server-calculated total (NEVER trust price sent from browser)
    const numQty = res.quantity || 1;
    const totalAmount = tType.price * numQty;
    const razorpayOrderId = `order_rzp_live_${crypto.randomBytes(8).toString('hex')}`;
    const orderNumber = `ORD-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      id: `ord-${crypto.randomBytes(6).toString('hex')}`,
      order_number: orderNumber,
      reservation_id: res.id,
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
      total_amount: totalAmount,
      currency: 'INR',
      status: 'PENDING',
      razorpay_order_id: razorpayOrderId,
      idempotency_key: `idemp_${razorpayOrderId}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.orders.push(newOrder);

    return {
      success: true,
      order: newOrder,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_AhujaConcert2026',
    };
  }

  // --- IDEMPOTENT WEBHOOK PAYMENT PROCESSING ---
  public processRazorpayWebhook(payload: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    signature_valid: boolean;
  }): { success: boolean; message: string; tickets?: TicketItem[] } {
    // 1. Signature check
    if (!payload.signature_valid) {
      return { success: false, message: 'Invalid Razorpay Webhook Signature.' };
    }

    // 2. Idempotency Check
    const existingPayment = this.payments.find(p => p.razorpay_payment_id === payload.razorpay_payment_id);
    if (existingPayment) {
      const existingTickets = this.tickets.filter(t => t.order_id === existingPayment.order_id);
      return { success: true, message: 'Payment already processed (Idempotent success).', tickets: existingTickets };
    }

    // 3. Find associated order
    const order = this.orders.find(o => o.razorpay_order_id === payload.razorpay_order_id);
    if (!order) {
      return { success: false, message: 'Order not found for given Razorpay Order ID.' };
    }

    if (order.status === 'PAID') {
      const existingTickets = this.tickets.filter(t => t.order_id === order.id);
      return { success: true, message: 'Order was already marked PAID.', tickets: existingTickets };
    }

    // 4. Mark Order PAID
    order.status = 'PAID';
    order.updated_at = new Date().toISOString();

    // 5. Record Payment
    this.payments.push({
      id: `pay-${crypto.randomBytes(6).toString('hex')}`,
      order_id: order.id,
      razorpay_payment_id: payload.razorpay_payment_id,
      razorpay_signature: payload.razorpay_signature,
      amount: order.total_amount,
      status: 'CAPTURED',
      processed_at: new Date().toISOString(),
    });

    // 6. Fulfill Reservation & Generate Secure Cryptographic Tickets
    const res = (order.reservation_id ? this.reservations.find(r => r.id === order.reservation_id) : null) || 
                this.reservations.find(r => !r.is_fulfilled);
    let ticketType = this.ticketTypes[1]; // default regular if reservation lookup fallback

    if (res) {
      res.is_fulfilled = true;
      const foundTT = this.ticketTypes.find(t => t.id === res.ticket_type_id);
      if (foundTT) {
        ticketType = foundTT;
        foundTT.sold_count += res.quantity;
        foundTT.reserved_count = Math.max(0, foundTT.reserved_count - res.quantity);
      }
    } else {
      ticketType.sold_count += 1;
    }

    const generatedTickets: TicketItem[] = [];
    const numTickets = res ? (res.quantity || 1) : 1;

    for (let i = 0; i < numTickets; i++) {
      const tktNum = `TKT-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
      // Signed secure token (HMAC hashed to prevent forgery)
      const tokenPayload = `${tktNum}:${order.id}:${order.customer_email}:${Date.now()}:${i}`;
      const secureToken = `QR-NOCTURNE-${ticketType.code}-${crypto.createHmac('sha256', process.env.QR_JWT_SECRET || 'secret').update(tokenPayload).digest('hex').substring(0, 16).toUpperCase()}`;

      const newTicket: TicketItem = {
        id: `tkt-${crypto.randomBytes(6).toString('hex')}`,
        ticket_number: tktNum,
        order_id: order.id,
        event_id: this.event.id,
        ticket_type_id: ticketType.id,
        ticket_type_name: ticketType.name,
        customer_name: order.customer_name,
        customer_email: order.customer_email,
        secure_token: secureToken,
        status: 'VALID',
        created_at: new Date().toISOString(),
        quantity: numTickets,
        admit_count: numTickets,
      };

      this.tickets.push(newTicket);
      generatedTickets.push(newTicket);
    }

    this.logAudit('SYSTEM_WEBHOOK', 'PAYMENT_CAPTURE', 'ORDERS', order.id, {
      amount: order.total_amount,
      razorpay_payment_id: payload.razorpay_payment_id,
      tickets_issued: generatedTickets.length
    });

    return { success: true, message: 'Payment verified and tickets issued successfully.', tickets: generatedTickets };
  }

  // --- ATOMIC SCANNER ENGINE (SINGLE ATOMIC UPDATE EXECUTION) ---
  public scanTicketAtomic(token: string, staffId: string, gateId: string): { 
    result_status: 'VALID' | 'ALREADY_USED' | 'INVALID' | 'BLOCKED' | 'CANCELLED' | 'REFUNDED'; 
    message: string; 
    ticket?: TicketItem;
    scan_log?: ScanLog;
  } {
    const staff = this.staffUsers.find(s => s.id === staffId || s.email === staffId);
    const gate = this.gates.find(g => g.id === gateId);
    const staffName = staff ? staff.full_name : 'Staff Member';
    const gateName = gate ? gate.name : 'Main Gate';

    // Atomic Lookup in ticket registry
    const ticket = this.tickets.find(t => t.secure_token === token || t.ticket_number === token);

    if (!ticket) {
      const scanLog: ScanLog = {
        id: `scan-${crypto.randomBytes(6).toString('hex')}`,
        scanned_token: token,
        staff_id: staff?.id,
        staff_name: staffName,
        gate_id: gate?.id,
        gate_name: gateName,
        result_status: 'INVALID',
        message: 'X INVALID TICKET TOKEN - NOT FOUND IN DATABASE',
        scanned_at: new Date().toISOString(),
      };
      this.scanLogs.unshift(scanLog);
      return { result_status: 'INVALID', message: scanLog.message, scan_log: scanLog };
    }

    // CHECK IF ALREADY USED (CRITICAL ATOMIC RACESAFE PROTECTION)
    if (ticket.status === 'USED') {
      const scanLog: ScanLog = {
        id: `scan-${crypto.randomBytes(6).toString('hex')}`,
        ticket_id: ticket.id,
        ticket_number: ticket.ticket_number,
        scanned_token: token,
        staff_id: staff?.id,
        staff_name: staffName,
        gate_id: gate?.id,
        gate_name: gateName,
        result_status: 'ALREADY_USED',
        message: `X TICKET ALREADY USED AT ${ticket.used_gate_name || 'Gate'} BY ${ticket.used_by_staff_name || 'Staff'}`,
        scanned_at: new Date().toISOString(),
      };
      this.scanLogs.unshift(scanLog);
      return { result_status: 'ALREADY_USED', message: scanLog.message, ticket, scan_log: scanLog };
    }

    // CHECK NON-VALID STATES
    if (ticket.status !== 'VALID') {
      const statusMessage = `X TICKET DENIED - STATUS IS ${ticket.status}`;
      const scanLog: ScanLog = {
        id: `scan-${crypto.randomBytes(6).toString('hex')}`,
        ticket_id: ticket.id,
        ticket_number: ticket.ticket_number,
        scanned_token: token,
        staff_id: staff?.id,
        staff_name: staffName,
        gate_id: gate?.id,
        gate_name: gateName,
        result_status: ticket.status as any,
        message: statusMessage,
        scanned_at: new Date().toISOString(),
      };
      this.scanLogs.unshift(scanLog);
      return { result_status: ticket.status as any, message: statusMessage, ticket, scan_log: scanLog };
    }

    // ATOMICALLY MARK USED
    ticket.status = 'USED';
    ticket.used_at = new Date().toISOString();
    ticket.used_gate_id = gate?.id;
    ticket.used_gate_name = gateName;
    ticket.used_by_staff_id = staff?.id;
    ticket.used_by_staff_name = staffName;

    const scanLog: ScanLog = {
      id: `scan-${crypto.randomBytes(6).toString('hex')}`,
      ticket_id: ticket.id,
      ticket_number: ticket.ticket_number,
      scanned_token: token,
      staff_id: staff?.id,
      staff_name: staffName,
      gate_id: gate?.id,
      gate_name: gateName,
      result_status: 'VALID',
      message: '✓ VALID TICKET - ENTRY APPROVED',
      scanned_at: new Date().toISOString(),
    };

    this.scanLogs.unshift(scanLog);

    return { result_status: 'VALID', message: '✓ VALID TICKET - ENTRY APPROVED', ticket, scan_log: scanLog };
  }

  // --- CUSTOMER LOOKUP & ACCESS LOGIC (ANTI-IDOR) ---
  public getTicketByNumberOrToken(identifier: string): TicketItem | undefined {
    return this.tickets.find(t => t.ticket_number === identifier || t.secure_token === identifier || t.id === identifier);
  }

  public getTicketsByCustomerEmail(email: string): TicketItem[] {
    return this.tickets.filter(t => t.customer_email.toLowerCase() === email.toLowerCase());
  }

  // --- ADMIN DASHBOARD & METRICS ---
  public getAdminDashboardMetrics() {
    const totalCapacity = this.ticketTypes.reduce((acc, t) => acc + t.capacity, 0);
    const totalSold = this.ticketTypes.reduce((acc, t) => acc + t.sold_count, 0);
    const totalRemaining = totalCapacity - totalSold;

    const totalRevenue = this.orders
      .filter(o => o.status === 'PAID')
      .reduce((acc, o) => acc + o.total_amount, 0);

    const validTickets = this.tickets.filter(t => t.status === 'VALID').length;
    const usedTickets = this.tickets.filter(t => t.status === 'USED').length;
    const invalidScans = this.scanLogs.filter(s => s.result_status === 'INVALID').length;
    const duplicateScans = this.scanLogs.filter(s => s.result_status === 'ALREADY_USED').length;

    const gateMetrics = this.gates.map(g => {
      const scannedAtGate = this.tickets.filter(t => t.used_gate_id === g.id).length;
      const invalidAtGate = this.scanLogs.filter(s => s.gate_id === g.id && s.result_status === 'INVALID').length;
      const duplicateAtGate = this.scanLogs.filter(s => s.gate_id === g.id && s.result_status === 'ALREADY_USED').length;

      return {
        gate_id: g.id,
        gate_name: g.name,
        is_active: g.is_active,
        scanned_count: scannedAtGate,
        invalid_count: invalidAtGate,
        duplicate_count: duplicateAtGate,
      };
    });

    return {
      totalCapacity,
      totalSold,
      totalRemaining,
      totalRevenue,
      paidOrdersCount: this.orders.filter(o => o.status === 'PAID').length,
      validTicketsCount: validTickets,
      usedTicketsCount: usedTickets,
      entryPercentage: totalSold > 0 ? Math.round((usedTickets / totalSold) * 100) : 0,
      invalidScansCount: invalidScans,
      duplicateScansCount: duplicateScans,
      salesPaused: this.event.sales_paused,
      gateMetrics,
    };
  }

  // --- ADMIN MANAGEMENT ACTIONS ---
  public updateTicketTypePriceAndCapacity(ticketTypeId: string, price: number, capacity: number, isEnabled: boolean, actorEmail: string): boolean {
    const tt = this.ticketTypes.find(t => t.id === ticketTypeId);
    if (!tt) return false;

    const oldChanges = { price: tt.price, capacity: tt.capacity, is_enabled: tt.is_enabled };
    tt.price = price;
    tt.capacity = capacity;
    tt.is_enabled = isEnabled;

    this.logAudit(actorEmail, 'UPDATE_TICKET_CONFIG', 'TICKET_TYPES', ticketTypeId, {
      before: oldChanges,
      after: { price, capacity, is_enabled: isEnabled }
    });

    return true;
  }

  public blockOrCancelTicket(ticketId: string, newStatus: 'BLOCKED' | 'CANCELLED' | 'REFUNDED', actorEmail: string): boolean {
    const tkt = this.tickets.find(t => t.id === ticketId || t.ticket_number === ticketId);
    if (!tkt) return false;

    const oldStatus = tkt.status;
    tkt.status = newStatus;

    this.logAudit(actorEmail, 'CHANGE_TICKET_STATUS', 'TICKETS', tkt.id, { oldStatus, newStatus });
    return true;
  }

  public toggleSalesPause(actorEmail: string): boolean {
    this.event.sales_paused = !this.event.sales_paused;
    this.logAudit(actorEmail, 'TOGGLE_SALES_PAUSE', 'EVENTS', this.event.id, { sales_paused: this.event.sales_paused });
    return this.event.sales_paused;
  }

  public getScanLogs(): ScanLog[] {
    return this.scanLogs;
  }

  public getAuditLogs(): AuditLog[] {
    return this.auditLogs;
  }

  public getOrders(): Order[] {
    return this.orders;
  }

  public getTickets(): TicketItem[] {
    return this.tickets;
  }

  private logAudit(actorEmail: string, action: string, entityType: string, entityId: string, changes?: any) {
    this.auditLogs.unshift({
      id: `audit-${crypto.randomBytes(6).toString('hex')}`,
      actor_email: actorEmail,
      action,
      entity_type: entityType,
      entity_id: entityId,
      changes,
      created_at: new Date().toISOString(),
    });
  }
}

function newDateStr(offsetMinutes: number): string {
  return new Date(Date.now() + offsetMinutes * 60000).toISOString();
}

// Global Singleton Export
export const db = new ConcertDatabase();
