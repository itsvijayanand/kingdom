'use client';

import React, { useState, useEffect } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import KingdomLogo from '@/components/KingdomLogo';
import { Button } from '@/components/Button';
import { 
  Ticket, 
  Plane, 
  Train, 
  Bus, 
  Film, 
  Search, 
  QrCode, 
  Printer, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  ShieldCheck, 
  ExternalLink,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { BookingCategory, UnifiedBookingItem } from '@/lib/types';
import QRCode from 'qrcode';

export default function YourBookingsSection() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [allBookings, setAllBookings] = useState<UnifiedBookingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Verification simulator modal
  const [verifyingBooking, setVerifyingBooking] = useState<UnifiedBookingItem | null>(null);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  // QR Code canvas maps
  const [qrDataUrls, setQrDataUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchDefaultBookings();
  }, []);

  const fetchDefaultBookings = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      // Seed realistic demo bookings across all 5 verticals
      const mockItems: UnifiedBookingItem[] = [
        {
          id: 'tkt-demo-vip',
          category: 'EVENT',
          ticket_number: 'TKT-8F7200K9D1',
          order_id: 'ord-demo-1',
          event_id: 'evt-nocturne-2026',
          ticket_type_id: 'tt-vip',
          ticket_type_name: 'VIP ELEVATED ACCESS',
          customer_name: 'Rahul Sharma',
          customer_email: 'rahul.sharma@example.com',
          secure_token: 'QR-NOCTURNE-VIP-8F7200K9D1',
          status: 'VALID',
          created_at: new Date().toISOString()
        },
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
          created_at: new Date().toISOString()
        },
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
          created_at: new Date().toISOString()
        },
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
          created_at: new Date().toISOString()
        },
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
          created_at: new Date().toISOString()
        }
      ];

      setAllBookings(mockItems);
      generateQRCodes(mockItems);
    } catch (e) {
      setErrorMsg('Failed to load passes.');
    } finally {
      setLoading(false);
    }
  };

  const generateQRCodes = async (items: UnifiedBookingItem[]) => {
    const urls: Record<string, string> = {};
    for (const item of items) {
      const token = (item as any).pnr || (item as any).booking_id || (item as any).ticket_number || (item as any).secure_token || item.id;
      try {
        const url = await QRCode.toDataURL(token, { margin: 1, width: 220, color: { dark: '#070A0F', light: '#FFFFFF' } });
        urls[item.id] = url;
      } catch (err) {
        // fallback
      }
    }
    setQrDataUrls(urls);
  };

  const handleLookupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchDefaultBookings();
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/v1/customer/ticket/${searchQuery.trim()}`);
      const json = await res.json();

      if (json.success && json.data?.booking) {
        setAllBookings([json.data.booking]);
        generateQRCodes([json.data.booking]);
      } else {
        setErrorMsg(`No pass found for '${searchQuery}'. Displaying active demo wallet.`);
        fetchDefaultBookings();
      }
    } catch (err) {
      setErrorMsg('Lookup error.');
      fetchDefaultBookings();
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateScan = (item: UnifiedBookingItem) => {
    setVerifyingBooking(item);
    setVerificationResult('VERIFYING CRYPTOGRAPHIC TOKEN...');
    setTimeout(() => {
      setVerificationResult('✓ VALID PASS — ENTRY AUTHORIZED & LOGGED TO AUDIT TRAIL');
    }, 1200);
  };

  const filteredBookings = activeFilter === 'ALL'
    ? allBookings
    : allBookings.filter(b => b.category === activeFilter);

  return (
    <section id="your-bookings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24 print:p-0 print:m-0">
      
      {/* SECTION HEADER */}
      <ScrollReveal variant="fade-up">
        <div className="text-center mb-10 space-y-3 print:hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#071B36] border border-[#D4AF5A]/30 text-[#D4AF5A] text-xs font-mono uppercase mb-2">
            <Lock className="w-3.5 h-3.5 text-[#D4AF5A]" />
            KINGDOM CENTRAL E-TICKET & PASS VAULT
          </div>
          
          <h2 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-wider uppercase">
            YOUR <span className="gold-gradient-text">BOOKINGS</span>
          </h2>
          <p className="text-xs text-[#9CA3AF] font-mono max-w-2xl mx-auto">
            Flights • Train Tickets • Bus Tickets • Movie Tickets • Event VIP Passes
          </p>
        </div>
      </ScrollReveal>

      {/* SEARCH / PNR LOOKUP BAR */}
      <form onSubmit={handleLookupSubmit} className="max-w-xl mx-auto mb-10 print:hidden">
        <div className="flex flex-col sm:flex-row gap-2 font-mono">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search PNR (e.g. FL-KA7892, 284-9102841, MOV-CYBER2099)..."
            className="flex-1 bg-[#071B36] border border-[#D4AF5A]/40 text-white px-5 py-3.5 text-xs rounded-full focus:border-[#D4AF5A] focus:outline-none"
          />
          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            size="md"
            icon={<Search className="w-4 h-4 text-[#070A0F]" />}
          >
            {loading ? 'LOOKUP...' : 'FIND PASS'}
          </Button>
        </div>
      </form>

      {errorMsg && (
        <div className="max-w-xl mx-auto mb-8 p-3 bg-[#071B36] border border-[#D4AF5A]/40 text-[#E6C878] text-xs font-mono text-center rounded-xl print:hidden">
          {errorMsg}
        </div>
      )}

      {/* CATEGORY FILTER TABS: ALL | FLIGHTS | TRAINS | BUSES | MOVIES | EVENTS */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 print:hidden">
        {[
          { key: 'ALL', label: 'All Tickets', icon: Ticket },
          { key: 'FLIGHT', label: 'Flights', icon: Plane },
          { key: 'TRAIN', label: 'Train tickets', icon: Train },
          { key: 'BUS', label: 'Bus tickets', icon: Bus },
          { key: 'MOVIE', label: 'Movie tickets', icon: Film },
          { key: 'EVENT', label: 'Event tickets', icon: Ticket },
        ].map((tab) => {
          const IconComp = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all ${
                activeFilter === tab.key
                  ? 'gold-gradient-bg text-[#070A0F] shadow-[0_0_15px_rgba(212,175,90,0.4)]'
                  : 'bg-[#071B36] text-[#E8E8E5] border border-[#D4AF5A]/25 hover:border-[#D4AF5A]'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* RENDER PASSES LIST */}
      <div className="space-y-8">
        {filteredBookings.map((item) => {
          const qrUrl = qrDataUrls[item.id];

          return (
            <ScrollReveal key={item.id} variant="fade-up">
              <div className="bg-[#071B36] border-2 border-[#D4AF5A]/40 rounded-3xl p-6 sm:p-8 relative overflow-hidden gold-border-glow shadow-2xl print:p-6 print:border-black">
                
                {/* DECORATIVE TOP BADGE */}
                <div className="flex flex-wrap items-center justify-between border-b border-[#D4AF5A]/30 pb-4 mb-6 gap-3">
                  <div className="flex items-center gap-2">
                    <KingdomLogo size="sm" showLink={false} />
                    <span className="text-[#D4AF5A] font-serif font-extrabold text-xs uppercase tracking-widest">
                      KINGDOM OFFICIAL {item.category} PASS
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-950 border border-emerald-500/50 text-emerald-400 font-mono text-[10px] uppercase font-bold rounded-full">
                      ✓ {(item as any).status || 'CONFIRMED'}
                    </span>
                    <span className="text-xs text-[#E6C878] font-mono">
                      {(item as any).pnr || (item as any).booking_id || (item as any).ticket_number}
                    </span>
                  </div>
                </div>

                {/* TICKET BODY CONTENT BASED ON CATEGORY */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* LEFT DETAILS */}
                  <div className="lg:col-span-8 space-y-6">
                    
                    {/* FLIGHT TICKET DETAILS */}
                    {item.category === 'FLIGHT' && (
                      <div className="space-y-4 font-mono">
                        <div>
                          <span className="text-[10px] text-[#D4AF5A] uppercase tracking-widest block">AIRLINE & FLIGHT NO</span>
                          <h3 className="font-serif font-black text-2xl text-white uppercase">{item.airline} ({item.flight_number})</h3>
                          <p className="text-xs text-[#E6C878]">{item.cabin_class}</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#070A0F] border border-[#D4AF5A]/20 rounded-2xl text-xs">
                          <div>
                            <span className="text-[9px] text-[#9CA3AF] uppercase block">ROUTE</span>
                            <span className="font-bold text-white">{item.origin} → {item.destination}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-[#9CA3AF] uppercase block">SEAT & CABIN</span>
                            <span className="font-bold text-[#E6C878]">{item.seat_number}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-[#9CA3AF] uppercase block">GATE & TERMINAL</span>
                            <span className="font-bold text-white">{item.gate} • {item.terminal}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-[#9CA3AF] uppercase block">PASSENGER</span>
                            <span className="font-bold text-white truncate block">{item.passenger_name}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TRAIN TICKET DETAILS */}
                    {item.category === 'TRAIN' && (
                      <div className="space-y-4 font-mono">
                        <div>
                          <span className="text-[10px] text-[#D4AF5A] uppercase tracking-widest block">INDIAN RAILWAYS E-TICKET</span>
                          <h3 className="font-serif font-black text-2xl text-white uppercase">{item.train_name} ({item.train_number})</h3>
                          <p className="text-xs text-[#E6C878]">PNR: {item.pnr}</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#070A0F] border border-[#D4AF5A]/20 rounded-2xl text-xs">
                          <div>
                            <span className="text-[9px] text-[#9CA3AF] uppercase block">FROM / TO</span>
                            <span className="font-bold text-white">{item.from_station} → {item.to_station}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-[#9CA3AF] uppercase block">COACH / BERTH</span>
                            <span className="font-bold text-[#E6C878]">{item.coach} • Berth {item.berth_number}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-[#9CA3AF] uppercase block">BERTH TYPE</span>
                            <span className="font-bold text-white">{item.berth_type}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-[#9CA3AF] uppercase block">PASSENGER</span>
                            <span className="font-bold text-white truncate block">{item.passenger_name}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* BUS TICKET DETAILS */}
                    {item.category === 'BUS' && (
                      <div className="space-y-4 font-mono">
                        <div>
                          <span className="text-[10px] text-[#D4AF5A] uppercase tracking-widest block">INTERCITY BUS M-TICKET</span>
                          <h3 className="font-serif font-black text-2xl text-white uppercase">{item.operator}</h3>
                          <p className="text-xs text-[#E6C878]">{item.bus_type} • PNR: {item.pnr}</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#070A0F] border border-[#D4AF5A]/20 rounded-2xl text-xs">
                          <div>
                            <span className="text-[9px] text-[#9CA3AF] uppercase block">ROUTE</span>
                            <span className="font-bold text-white">{item.from_city} → {item.to_city}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-[#9CA3AF] uppercase block">SEAT NO</span>
                            <span className="font-bold text-[#E6C878]">{item.seat_number}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-[#9CA3AF] uppercase block">BOARDING POINT</span>
                            <span className="font-bold text-white truncate block">{item.boarding_point}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-[#9CA3AF] uppercase block">PASSENGER</span>
                            <span className="font-bold text-white truncate block">{item.passenger_name}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* MOVIE TICKET DETAILS */}
                    {item.category === 'MOVIE' && (
                      <div className="space-y-4 font-mono">
                        <div>
                          <span className="text-[10px] text-[#D4AF5A] uppercase tracking-widest block">CINEMA M-TICKET PASS</span>
                          <h3 className="font-serif font-black text-2xl text-white uppercase">{item.movie_title}</h3>
                          <p className="text-xs text-[#E6C878]">{item.cinema_name} • {item.format}</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#070A0F] border border-[#D4AF5A]/20 rounded-2xl text-xs">
                          <div>
                            <span className="text-[9px] text-[#9CA3AF] uppercase block">SCREEN</span>
                            <span className="font-bold text-white">{item.screen_name}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-[#9CA3AF] uppercase block">SEATS</span>
                            <span className="font-bold text-[#E6C878]">{item.seats.join(', ')}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-[#9CA3AF] uppercase block">SNACK VOUCHER</span>
                            <span className="font-bold text-white truncate block">{item.snacks.join(' + ')}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-[#9CA3AF] uppercase block">GUEST</span>
                            <span className="font-bold text-white truncate block">{item.passenger_name}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* EVENT TICKET DETAILS */}
                    {item.category === 'EVENT' && (
                      <div className="space-y-4 font-mono">
                        <div>
                          <span className="text-[10px] text-[#D4AF5A] uppercase tracking-widest block">CONCERT VIP PASS</span>
                          <h3 className="font-serif font-black text-2xl text-white uppercase">NOCTURNE VELOCITY WORLD TOUR 2026</h3>
                          <p className="text-xs text-[#E6C878]">VEX & THE SYNTH SYNDICATE • TICKET NO: {item.ticket_number}</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#070A0F] border border-[#D4AF5A]/20 rounded-2xl text-xs">
                          <div>
                            <span className="text-[9px] text-[#9CA3AF] uppercase block">CATEGORY TIER</span>
                            <span className="font-bold text-[#E6C878]">{item.ticket_type_name}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-[#9CA3AF] uppercase block">VENUE</span>
                            <span className="font-bold text-white">CYBERDOME ARENA MUMBAI</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-[#9CA3AF] uppercase block">ENTRY GATE</span>
                            <span className="font-bold text-white">GATE 4 VIP PORTAL</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-[#9CA3AF] uppercase block">ATTENDEE</span>
                            <span className="font-bold text-white truncate block">{item.customer_name}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PASS ACTIONS */}
                    <div className="flex flex-wrap items-center gap-3 pt-2 print:hidden">
                      <button
                        onClick={() => window.print()}
                        className="px-4 py-2 bg-[#070A0F] border border-[#D4AF5A]/30 text-[#E8E8E5] hover:text-[#D4AF5A] font-mono text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5 text-[#D4AF5A]" />
                        <span>PRINT / PDF E-TICKET</span>
                      </button>

                      <button
                        onClick={() => handleSimulateScan(item)}
                        className="px-4 py-2 bg-[#070A0F] border border-[#D4AF5A]/30 text-emerald-400 font-mono text-xs rounded-xl flex items-center gap-1.5 hover:bg-emerald-950/40 transition-colors"
                      >
                        <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                        <span>SIMULATE STAFF GATE SCAN</span>
                      </button>
                    </div>

                  </div>

                  {/* RIGHT QR CODE & BARCODE PANEL */}
                  <div className="lg:col-span-4 bg-[#070A0F] p-6 rounded-2xl border border-[#D4AF5A]/30 flex flex-col items-center justify-center text-center space-y-3">
                    <span className="text-[9px] text-[#D4AF5A] font-mono uppercase tracking-widest">
                      HMAC CRYPTOGRAPHIC SCANNER QR
                    </span>

                    {qrUrl ? (
                      <img src={qrUrl} alt="E-Ticket QR" className="w-40 h-40 bg-white p-2 rounded-xl shadow-lg border border-[#D4AF5A]" />
                    ) : (
                      <div className="w-40 h-40 bg-white/10 rounded-xl flex items-center justify-center font-mono text-xs text-zinc-400">
                        LOADING QR...
                      </div>
                    )}

                    <div className="text-[10px] font-mono text-[#9CA3AF] tracking-widest">
                      TOKEN: {(item as any).pnr || (item as any).booking_id || (item as any).ticket_number}
                    </div>
                  </div>

                </div>

              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* SIMULATE SCAN VERIFICATION MODAL */}
      {verifyingBooking && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#071B36] border border-[#D4AF5A] max-w-md w-full rounded-3xl p-6 space-y-6 shadow-2xl relative gold-border-glow animate-fadeIn text-center">
            
            <button
              onClick={() => setVerifyingBooking(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            <div className="mx-auto w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center shadow-lg">
              <QrCode className="w-8 h-8 text-[#070A0F]" />
            </div>

            <div className="space-y-1 font-mono">
              <span className="text-[10px] text-[#D4AF5A] uppercase tracking-widest">// STAFF GATE VERIFICATION ENGINE</span>
              <h3 className="font-serif font-black text-xl text-white uppercase">
                {(verifyingBooking as any).pnr || (verifyingBooking as any).booking_id || (verifyingBooking as any).ticket_number}
              </h3>
            </div>

            <div className="p-4 bg-[#070A0F] border border-emerald-500/40 rounded-2xl text-xs font-mono text-emerald-300">
              {verificationResult}
            </div>

            <Button
              onClick={() => setVerifyingBooking(null)}
              variant="primary"
              fullWidth
              size="md"
            >
              CLOSE VERIFIER
            </Button>

          </div>
        </div>
      )}

    </section>
  );
}
