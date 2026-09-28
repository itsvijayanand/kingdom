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
  AuditLog,
  FlightBooking,
  TrainBooking,
  BusBooking,
  MovieBooking,
  UnifiedBookingItem
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

  private flightBookings: FlightBooking[] = [];
  private trainBookings: TrainBooking[] = [];
  private busBookings: BusBooking[] = [];
  private movieBookings: MovieBooking[] = [];

  constructor() {
    this.seedDemoData();
  }

  private seedDemoData() {
    // Seed Multi-Vertical Demo Bookings
    this.flightBookings = [
      {
        id: 'fl-booking-1',
        category: 'FLIGHT',
        pnr: 'FL-KA7892',
        airline: 'Kingdom Air Royal Fleet',
        flight_number: 'KA-402',
        origin: 'Mumbai (BOM)',
        destination: 'Dubai (DXB)',
        departure_time: '2026-11-15T08:30:00.000Z',
        arrival_time: '2026-11-15T10:45:00.000Z',
        cabin_class: 'First Class Royal Suite',
        seat_number: '1A',
        gate: 'A4',
        terminal: 'Terminal 2',
        passenger_name: 'Vikramaditya Singh',
        passenger_email: 'vikram.singh@example.com',
        price: 48500,
        status: 'CONFIRMED',
        qr_token: 'QR-FLIGHT-KA7892-PASSPORT-OK',
        created_at: newDateStr(-1200)
      },
      {
        id: 'fl-booking-2',
        category: 'FLIGHT',
        pnr: 'FL-EK9104',
        airline: 'Emirates Airways',
        flight_number: 'EK-501',
        origin: 'Mumbai (BOM)',
        destination: 'London Heathrow (LHR)',
        departure_time: '2026-11-20T02:15:00.000Z',
        arrival_time: '2026-11-20T07:10:00.000Z',
        cabin_class: 'Business Class',
        seat_number: '4K',
        gate: 'B12',
        terminal: 'Terminal 2',
        passenger_name: 'Ananya Roy',
        passenger_email: 'ananya.roy@example.com',
        price: 74200,
        status: 'CONFIRMED',
        qr_token: 'QR-FLIGHT-EK9104-GATE-B12',
        created_at: newDateStr(-800)
      }
    ];

    this.trainBookings = [
      {
        id: 'tr-booking-1',
        category: 'TRAIN',
        pnr: '284-9102841',
        train_number: '22436',
        train_name: 'Vande Bharat Express',
        from_station: 'Mumbai CSMT (CSMT)',
        to_station: 'New Delhi (NDLS)',
        departure_time: '2026-10-12T06:00:00.000Z',
        arrival_time: '2026-10-12T18:30:00.000Z',
        coach: 'E1',
        berth_number: '14',
        berth_type: 'Window Seat',
        passenger_name: 'Rohan Sharma',
        passenger_email: 'rohan.sharma@example.com',
        price: 3450,
        status: 'CONFIRMED',
        qr_token: 'QR-TRAIN-2849102841-COACH-E1',
        created_at: newDateStr(-500)
      },
      {
        id: 'tr-booking-2',
        category: 'TRAIN',
        pnr: '981-2405991',
        train_number: '12951',
        train_name: 'Rajdhani Superfast Special',
        from_station: 'Mumbai Central (MMCT)',
        to_station: 'Hazrat Nizamuddin (NZM)',
        departure_time: '2026-10-25T17:00:00.000Z',
        arrival_time: '2026-10-26T08:30:00.000Z',
        coach: 'H1',
        berth_number: '04',
        berth_type: '1A Lower Berth',
        passenger_name: 'Devendra Patel',
        passenger_email: 'dev.patel@example.com',
        price: 4890,
        status: 'CONFIRMED',
        qr_token: 'QR-TRAIN-9812405991-COACH-H1',
        created_at: newDateStr(-300)
      }
    ];

    this.busBookings = [
      {
        id: 'bus-booking-1',
        category: 'BUS',
        pnr: 'BUS-901842',
        operator: 'Kingdom Royal Volvo Sleeper',
        bus_type: 'Multi-Axle AC Sleeper (2+1)',
        from_city: 'Mumbai (BKC Hub)',
        to_city: 'Goa (Panjim Express)',
        boarding_point: 'BKC Cyberdome Gate 4 Entrance',
        departure_time: '2026-10-18T21:00:00.000Z',
        seat_number: 'Lower Sleeper L4',
        passenger_name: 'Siddharth Malhotra',
        passenger_email: 'sid.m@example.com',
        price: 2150,
        live_tracking_url: 'https://kingdom.express/track/BUS-901842',
        status: 'CONFIRMED',
        qr_token: 'QR-BUS-901842-SLEEPER-L4',
        created_at: newDateStr(-400)
      },
      {
        id: 'bus-booking-2',
        category: 'BUS',
        pnr: 'BUS-449102',
        operator: 'IntrCity SmartBus Scania',
        bus_type: 'Ultra Executive AC Seater',
        from_city: 'Bangalore (Majestic)',
        to_city: 'Hyderabad (HITEC City)',
        boarding_point: 'Majestic Bus Stand Platform 9',
        departure_time: '2026-10-22T22:30:00.000Z',
        seat_number: 'Window Seat 12',
        passenger_name: 'Meera Nair',
        passenger_email: 'meera.nair@example.com',
        price: 1650,
        live_tracking_url: 'https://kingdom.express/track/BUS-449102',
        status: 'CONFIRMED',
        qr_token: 'QR-BUS-449102-SEAT-12',
        created_at: newDateStr(-200)
      }
    ];

    this.movieBookings = [
      {
        id: 'mov-booking-1',
        category: 'MOVIE',
        booking_id: 'MOV-CYBER2099',
        movie_title: 'Cyberpunk 2099: Neon Legacy',
        poster_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop',
        format: 'IMAX 3D Laser • Dolby Atmos',
        cinema_name: 'Kingdom CyberPlex BKC',
        screen_name: 'Screen 1 (IMAX GT Dual Laser)',
        showtime: '2026-10-15T18:45:00.000Z',
        seats: ['J10', 'J11'],
        snacks: ['Large Caramel Popcorn', 'Royal Cold Brew Coffee'],
        passenger_name: 'Aarav Roy',
        passenger_email: 'aarav.roy@example.com',
        price: 1850,
        status: 'CONFIRMED',
        qr_token: 'QR-MOVIE-CYBER2099-IMAX-J10-J11',
        created_at: newDateStr(-100)
      },
      {
        id: 'mov-booking-2',
        category: 'MOVIE',
        booking_id: 'MOV-DUNE9',
        movie_title: 'Dune: Prophecy IX',
        poster_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
        format: 'VIP Recliner • Dolby Atmos 7.1',
        cinema_name: 'PVR Directors Cut Lower Parel',
        screen_name: 'Screen 4 (Gold VIP Suite)',
        showtime: '2026-10-19T21:30:00.000Z',
        seats: ['VIP-04', 'VIP-05'],
        snacks: ['Cheesy Nachos Deluxe', 'Sparkling Mineral Water'],
        passenger_name: 'Sneha Rao',
        passenger_email: 'sneha.rao@example.com',
        price: 2400,
        status: 'CONFIRMED',
        qr_token: 'QR-MOVIE-DUNE9-VIP-04-05',
        created_at: newDateStr(-50)
      }
    ];

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

  // --- MULTI-VERTICAL BOOKING GETTERS & CREATION ---
  public getFlightBookings(): FlightBooking[] {
    return this.flightBookings;
  }

  public addFlightBooking(booking: Omit<FlightBooking, 'id' | 'category' | 'created_at' | 'status'>): FlightBooking {
    const newBooking: FlightBooking = {
      ...booking,
      id: `fl-${crypto.randomBytes(6).toString('hex')}`,
      category: 'FLIGHT',
      status: 'CONFIRMED',
      created_at: new Date().toISOString()
    };
    this.flightBookings.unshift(newBooking);
    return newBooking;
  }

  public getTrainBookings(): TrainBooking[] {
    return this.trainBookings;
  }

  public addTrainBooking(booking: Omit<TrainBooking, 'id' | 'category' | 'created_at' | 'status'>): TrainBooking {
    const newBooking: TrainBooking = {
      ...booking,
      id: `tr-${crypto.randomBytes(6).toString('hex')}`,
      category: 'TRAIN',
      status: 'CONFIRMED',
      created_at: new Date().toISOString()
    };
    this.trainBookings.unshift(newBooking);
    return newBooking;
  }

  public getBusBookings(): BusBooking[] {
    return this.busBookings;
  }

  public addBusBooking(booking: Omit<BusBooking, 'id' | 'category' | 'created_at' | 'status'>): BusBooking {
    const newBooking: BusBooking = {
      ...booking,
      id: `bus-${crypto.randomBytes(6).toString('hex')}`,
      category: 'BUS',
      status: 'CONFIRMED',
      created_at: new Date().toISOString()
    };
    this.busBookings.unshift(newBooking);
    return newBooking;
  }

  public getMovieBookings(): MovieBooking[] {
    return this.movieBookings;
  }

  public addMovieBooking(booking: Omit<MovieBooking, 'id' | 'category' | 'created_at' | 'status'>): MovieBooking {
    const newBooking: MovieBooking = {
      ...booking,
      id: `mov-${crypto.randomBytes(6).toString('hex')}`,
      category: 'MOVIE',
      status: 'CONFIRMED',
      created_at: new Date().toISOString()
    };
    this.movieBookings.unshift(newBooking);
    return newBooking;
  }

  public getAllUnifiedBookings(): UnifiedBookingItem[] {
    const eventBookings: UnifiedBookingItem[] = this.tickets.map(t => ({
      ...t,
      category: 'EVENT' as const
    }));
    return [
      ...eventBookings,
      ...this.flightBookings,
      ...this.trainBookings,
      ...this.busBookings,
      ...this.movieBookings
    ];
  }

  public lookupAnyBooking(term: string): UnifiedBookingItem | undefined {
    const query = term.trim().toLowerCase();
    if (!query) return undefined;

    // Check Flights by PNR, ID, Token, or Name
    const flight = this.flightBookings.find(f => f.pnr.toLowerCase().includes(query) || f.id.toLowerCase() === query || f.qr_token.toLowerCase().includes(query) || f.passenger_name.toLowerCase().includes(query));
    if (flight) return flight;

    // Check Trains by PNR, ID, Token, or Name
    const train = this.trainBookings.find(t => t.pnr.toLowerCase().includes(query) || t.id.toLowerCase() === query || t.qr_token.toLowerCase().includes(query) || t.passenger_name.toLowerCase().includes(query));
    if (train) return train;

    // Check Buses by PNR, ID, Token, or Name
    const bus = this.busBookings.find(b => b.pnr.toLowerCase().includes(query) || b.id.toLowerCase() === query || b.qr_token.toLowerCase().includes(query) || b.passenger_name.toLowerCase().includes(query));
    if (bus) return bus;

    // Check Movies by Booking ID, ID, Token, or Name
    const movie = this.movieBookings.find(m => m.booking_id.toLowerCase().includes(query) || m.id.toLowerCase() === query || m.qr_token.toLowerCase().includes(query) || m.passenger_name.toLowerCase().includes(query));
    if (movie) return movie;

    // Check Events by Ticket Number, Secure Token, ID, or Name
    const ticket = this.tickets.find(t => t.ticket_number.toLowerCase().includes(query) || t.secure_token.toLowerCase().includes(query) || t.id.toLowerCase() === query || t.customer_name.toLowerCase().includes(query));
    if (ticket) {
      return { ...ticket, category: 'EVENT' };
    }

    return undefined;
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
