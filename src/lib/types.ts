export type UserRole = 'SUPER_ADMIN' | 'EVENT_MANAGER' | 'GATE_MANAGER' | 'STAFF' | 'CUSTOMER';
export type OrderStatus = 'PENDING' | 'PAID' | 'CANCELLED' | 'EXPIRED' | 'REFUNDED';
export type TicketStatus = 'PAYMENT_PENDING' | 'VALID' | 'USED' | 'CANCELLED' | 'REFUNDED' | 'BLOCKED';
export type PaymentStatus = 'CREATED' | 'AUTHORIZED' | 'CAPTURED' | 'FAILED' | 'REFUNDED';

export interface ConcertEvent {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  artist_name: string;
  artist_bio: string;
  venue_name: string;
  venue_address: string;
  city: string;
  event_date: string;
  doors_open: string;
  banner_image: string;
  gallery_images: string[];
  is_active: boolean;
  sales_paused: boolean;
}

export interface TicketType {
  id: string;
  event_id: string;
  name: string;
  code: string;
  description: string;
  price: number;
  capacity: number;
  sold_count: number;
  reserved_count: number;
  max_per_order: number;
  sale_start: string;
  sale_end: string;
  is_enabled: boolean;
}

export interface TicketReservation {
  id: string;
  session_id: string;
  ticket_type_id: string;
  quantity: number;
  expires_at: string;
  is_fulfilled: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_amount: number;
  currency: string;
  status: OrderStatus;
  razorpay_order_id?: string;
  idempotency_key?: string;
  created_at: string;
  updated_at: string;
}

export interface TicketItem {
  id: string;
  ticket_number: string;
  order_id: string;
  event_id: string;
  ticket_type_id: string;
  ticket_type_name: string;
  customer_name: string;
  customer_email: string;
  secure_token: string;
  status: TicketStatus;
  used_at?: string;
  used_gate_id?: string;
  used_gate_name?: string;
  used_by_staff_id?: string;
  used_by_staff_name?: string;
  created_at: string;
  quantity?: number;
  admit_count?: number;
}

export interface PaymentRecord {
  id: string;
  order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  amount: number;
  status: PaymentStatus;
  payload?: any;
  processed_at: string;
}

export interface Gate {
  id: string;
  event_id: string;
  name: string;
  location_description: string;
  is_active: boolean;
}

export interface StaffUser {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  gate_id?: string;
  gate_name?: string;
  mfa_enabled: boolean;
}

export interface ScanLog {
  id: string;
  ticket_id?: string;
  ticket_number?: string;
  scanned_token: string;
  staff_id?: string;
  staff_name?: string;
  gate_id?: string;
  gate_name?: string;
  result_status: 'VALID' | 'ALREADY_USED' | 'INVALID' | 'BLOCKED' | 'CANCELLED' | 'REFUNDED';
  message: string;
  ip_address?: string;
  scanned_at: string;
}

export interface AuditLog {
  id: string;
  actor_email: string;
  action: string;
  entity_type: string;
  entity_id: string;
  changes?: Record<string, any>;
  ip_address?: string;
  created_at: string;
}

export type BookingCategory = 'FLIGHT' | 'TRAIN' | 'BUS' | 'MOVIE' | 'EVENT';

export interface FlightBooking {
  id: string;
  category: 'FLIGHT';
  pnr: string;
  airline: string;
  flight_number: string;
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  cabin_class: string;
  seat_number: string;
  gate: string;
  terminal: string;
  passenger_name: string;
  passenger_email: string;
  price: number;
  status: 'CONFIRMED' | 'BOARDED' | 'CANCELLED';
  qr_token: string;
  created_at: string;
}

export interface TrainBooking {
  id: string;
  category: 'TRAIN';
  pnr: string;
  train_number: string;
  train_name: string;
  from_station: string;
  to_station: string;
  departure_time: string;
  arrival_time: string;
  coach: string;
  berth_number: string;
  berth_type: string;
  passenger_name: string;
  passenger_email: string;
  price: number;
  status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  qr_token: string;
  created_at: string;
}

export interface BusBooking {
  id: string;
  category: 'BUS';
  pnr: string;
  operator: string;
  bus_type: string;
  from_city: string;
  to_city: string;
  boarding_point: string;
  departure_time: string;
  seat_number: string;
  passenger_name: string;
  passenger_email: string;
  price: number;
  live_tracking_url: string;
  status: 'CONFIRMED' | 'IN_TRANSIT' | 'CANCELLED';
  qr_token: string;
  created_at: string;
}

export interface MovieBooking {
  id: string;
  category: 'MOVIE';
  booking_id: string;
  movie_title: string;
  poster_url: string;
  format: string;
  cinema_name: string;
  screen_name: string;
  showtime: string;
  seats: string[];
  snacks: string[];
  passenger_name: string;
  passenger_email: string;
  price: number;
  status: 'CONFIRMED' | 'USED' | 'CANCELLED';
  qr_token: string;
  created_at: string;
}

export type UnifiedBookingItem = 
  | (TicketItem & { category: 'EVENT' })
  | FlightBooking
  | TrainBooking
  | BusBooking
  | MovieBooking;

