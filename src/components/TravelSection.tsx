'use client';

import React, { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/Button';
import { 
  Plane, 
  Train, 
  Bus, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Search,
  ShieldCheck,
  Compass,
  Zap,
  Luggage,
  Sparkles
} from 'lucide-react';
import { FlightBooking, TrainBooking, BusBooking } from '@/lib/types';

export default function TravelSection() {
  const [activeTab, setActiveTab] = useState<'FLIGHT' | 'TRAIN' | 'BUS'>('FLIGHT');
  const [selectedSeat, setSelectedSeat] = useState<string>('1A');

  // Modal / Booking State
  const [bookingModal, setBookingModal] = useState<any | null>(null);
  const [passengerName, setPassengerName] = useState('');
  const [passengerEmail, setPassengerEmail] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Sample Flight Routes
  const flightRoutes = [
    {
      id: 'fl-1',
      airline: 'Kingdom Air Royal Fleet',
      flightNumber: 'KA-402',
      origin: 'Mumbai (BOM)',
      destination: 'Dubai (DXB)',
      depTime: '08:30 IST',
      arrTime: '10:45 GST',
      duration: '3h 45m',
      cabin: 'First Class Royal Suite',
      price: 48500,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'fl-2',
      airline: 'Emirates Airways',
      flightNumber: 'EK-501',
      origin: 'Mumbai (BOM)',
      destination: 'London Heathrow (LHR)',
      depTime: '02:15 IST',
      arrTime: '07:10 BST',
      duration: '9h 25m',
      cabin: 'Business Class Lounge',
      price: 74200,
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'fl-3',
      airline: 'Singapore Airlines',
      flightNumber: 'SQ-421',
      origin: 'Delhi (DEL)',
      destination: 'Singapore Changi (SIN)',
      depTime: '09:55 IST',
      arrTime: '18:10 SGT',
      duration: '5h 45m',
      cabin: 'Premium Economy',
      price: 32900,
      image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=800&auto=format&fit=crop'
    }
  ];

  // Sample Train Routes
  const trainRoutes = [
    {
      id: 'tr-1',
      trainName: 'Vande Bharat Express',
      trainNumber: '#22436',
      fromStation: 'Mumbai CSMT (CSMT)',
      toStation: 'New Delhi (NDLS)',
      depTime: '06:00 IST',
      arrTime: '18:30 IST',
      coach: 'Executive Chair Car (EC)',
      price: 3450,
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'tr-2',
      trainName: 'Rajdhani Superfast Express',
      trainNumber: '#12951',
      fromStation: 'Mumbai Central (MMCT)',
      toStation: 'Hazrat Nizamuddin (NZM)',
      depTime: '17:00 IST',
      arrTime: '08:30 IST (Next Day)',
      coach: '1A AC First Class Cabin',
      price: 4890,
      image: 'https://images.unsplash.com/photo-1532105956626-9569c03602f6?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'tr-3',
      trainName: 'Kingdom Bullet Express Line',
      trainNumber: '#20901',
      fromStation: 'Mumbai BKC Bullet Hub',
      toStation: 'Ahmedabad Junction (ADI)',
      depTime: '07:15 IST',
      arrTime: '09:45 IST',
      duration: '2h 30m High Speed',
      coach: 'Gran Class Suite',
      price: 2950,
      image: 'https://images.unsplash.com/photo-1515165562839-97840139bc66?q=80&w=800&auto=format&fit=crop'
    }
  ];

  // Sample Bus Routes
  const busRoutes = [
    {
      id: 'bus-1',
      operator: 'Kingdom Royal Volvo Sleeper',
      busType: 'Multi-Axle AC Sleeper (2+1)',
      fromCity: 'Mumbai BKC Portal',
      toCity: 'Goa (Panjim Express)',
      depTime: '21:00 IST',
      boardingPoint: 'BKC Cyberdome Gate 4 Plaza',
      seatType: 'Lower Sleeper L4',
      price: 2150,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'bus-2',
      operator: 'IntrCity SmartBus Executive',
      busType: 'Scania Ultra AC Seater',
      fromCity: 'Bangalore (Majestic)',
      toCity: 'Hyderabad (HITEC City)',
      depTime: '22:30 IST',
      boardingPoint: 'Platform 9, Majestic Hub',
      seatType: 'Window Seat 12',
      price: 1650,
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'bus-3',
      operator: 'Zingbus Premium Sleeper',
      busType: 'Volvo 9600 Luxury Sleeper',
      fromCity: 'Delhi (Kashmere Gate)',
      toCity: 'Manali (Private Volvo Stand)',
      depTime: '20:15 IST',
      boardingPoint: 'ISBT Kashmere Gate Platform 4',
      seatType: 'Upper Sleeper U08',
      price: 1950,
      image: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?q=80&w=800&auto=format&fit=crop'
    }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passengerName || !passengerEmail || !bookingModal) return;

    const pnrGenerated = `PNR-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    setBookingSuccess(`Booking Confirmed! ${bookingModal.title || bookingModal.airline || bookingModal.trainName || bookingModal.operator} • PNR: ${pnrGenerated}`);

    setTimeout(() => {
      setBookingModal(null);
      setBookingSuccess(null);
      // Navigate to My Tickets tab
      const myTicketEl = document.getElementById('your-bookings');
      if (myTicketEl) myTicketEl.scrollIntoView({ behavior: 'smooth' });
    }, 1800);
  };

  return (
    <section id="travel" className="bg-[#071B36]/40 border-y border-[#D4AF5A]/30 py-20 relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D4AF5A]/30 pb-6 mb-10">
            <div>
              <span className="text-xs text-[#D4AF5A] font-bold tracking-[0.25em] font-mono uppercase">// KINGDOM TRAVEL FLEET</span>
              <h2 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-wider uppercase mt-1">
                TRAVEL — <span className="gold-gradient-text">FLIGHTS | TRAINS | BUSES</span>
              </h2>
            </div>

            <p className="mt-3 md:mt-0 text-xs text-[#9CA3AF] font-mono uppercase tracking-wider max-w-sm">
              Instant E-Tickets, PNR Status Tracking, Berth & Seat Selection Grid with QR Validation.
            </p>
          </div>
        </ScrollReveal>

        {/* SUB-TABS: FLIGHTS | TRAINS | BUSES */}
        <div className="flex items-center justify-center gap-3 mb-12">
          
          <button
            onClick={() => setActiveTab('FLIGHT')}
            className={`flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-bold font-mono uppercase tracking-widest transition-all duration-300 ${
              activeTab === 'FLIGHT'
                ? 'gold-gradient-bg text-[#070A0F] shadow-[0_0_25px_rgba(212,175,90,0.5)] scale-105'
                : 'bg-[#070A0F] text-[#E8E8E5] border border-[#D4AF5A]/30 hover:border-[#D4AF5A]'
            }`}
          >
            <Plane className="w-4 h-4" />
            <span>FLIGHTS</span>
          </button>

          <button
            onClick={() => setActiveTab('TRAIN')}
            className={`flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-bold font-mono uppercase tracking-widest transition-all duration-300 ${
              activeTab === 'TRAIN'
                ? 'gold-gradient-bg text-[#070A0F] shadow-[0_0_25px_rgba(212,175,90,0.5)] scale-105'
                : 'bg-[#070A0F] text-[#E8E8E5] border border-[#D4AF5A]/30 hover:border-[#D4AF5A]'
            }`}
          >
            <Train className="w-4 h-4" />
            <span>TRAINS</span>
          </button>

          <button
            onClick={() => setActiveTab('BUS')}
            className={`flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-bold font-mono uppercase tracking-widest transition-all duration-300 ${
              activeTab === 'BUS'
                ? 'gold-gradient-bg text-[#070A0F] shadow-[0_0_25px_rgba(212,175,90,0.5)] scale-105'
                : 'bg-[#070A0F] text-[#E8E8E5] border border-[#D4AF5A]/30 hover:border-[#D4AF5A]'
            }`}
          >
            <Bus className="w-4 h-4" />
            <span>BUSES</span>
          </button>

        </div>

        {/* FLIGHTS GRID */}
        {activeTab === 'FLIGHT' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {flightRoutes.map((fl, idx) => (
              <ScrollReveal key={fl.id} variant="fade-up" delay={idx * 150}>
                <div className="bg-[#070A0F] border border-[#D4AF5A]/30 rounded-2xl overflow-hidden hover:border-[#D4AF5A] transition-all duration-300 flex flex-col justify-between h-full gold-border-glow">
                  
                  <div className="relative h-48 overflow-hidden">
                    <img src={fl.image} alt={fl.airline} className="w-full h-full object-cover filter contrast-125" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070A0F] via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 bg-[#071B36]/90 border border-[#D4AF5A]/40 text-[#E6C878] text-[10px] font-mono px-3 py-1 rounded-full uppercase">
                      {fl.cabin}
                    </span>
                  </div>

                  <div className="p-6 space-y-4 font-sans text-xs">
                    
                    <div>
                      <span className="text-[10px] text-[#D4AF5A] font-mono tracking-widest uppercase block">FLIGHT {fl.flightNumber}</span>
                      <h3 className="font-serif font-bold text-xl text-white uppercase">{fl.airline}</h3>
                    </div>

                    <div className="p-3 bg-[#071B36]/60 border border-[#D4AF5A]/20 rounded-xl flex items-center justify-between font-mono">
                      <div>
                        <div className="font-bold text-sm text-white">{fl.origin}</div>
                        <div className="text-[10px] text-[#9CA3AF]">{fl.depTime}</div>
                      </div>
                      <div className="text-center text-[10px] text-[#D4AF5A]">
                        <span>✈ {fl.duration}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm text-white">{fl.destination}</div>
                        <div className="text-[10px] text-[#9CA3AF]">{fl.arrTime}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#D4AF5A]/20">
                      <div>
                        <span className="text-[10px] text-[#9CA3AF] font-mono uppercase block">FARE FROM</span>
                        <span className="font-serif font-black text-2xl text-[#E6C878]">₹{fl.price.toLocaleString('en-IN')}</span>
                      </div>

                      <button
                        onClick={() => setBookingModal({ ...fl, type: 'FLIGHT' })}
                        className="px-5 py-2.5 gold-gradient-bg text-[#070A0F] font-black text-xs uppercase tracking-widest rounded-full hover:scale-105 transition-transform flex items-center gap-1"
                      >
                        BOOK FLIGHT
                      </button>
                    </div>

                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* TRAINS GRID */}
        {activeTab === 'TRAIN' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainRoutes.map((tr, idx) => (
              <ScrollReveal key={tr.id} variant="fade-up" delay={idx * 150}>
                <div className="bg-[#070A0F] border border-[#D4AF5A]/30 rounded-2xl overflow-hidden hover:border-[#D4AF5A] transition-all duration-300 flex flex-col justify-between h-full gold-border-glow">
                  
                  <div className="relative h-48 overflow-hidden">
                    <img src={tr.image} alt={tr.trainName} className="w-full h-full object-cover filter contrast-125" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070A0F] via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 bg-[#071B36]/90 border border-[#D4AF5A]/40 text-[#E6C878] text-[10px] font-mono px-3 py-1 rounded-full uppercase">
                      {tr.trainNumber} • {tr.coach}
                    </span>
                  </div>

                  <div className="p-6 space-y-4 font-sans text-xs">
                    
                    <div>
                      <span className="text-[10px] text-[#D4AF5A] font-mono tracking-widest uppercase block">INDIAN RAILWAYS EXPRESS</span>
                      <h3 className="font-serif font-bold text-xl text-white uppercase">{tr.trainName}</h3>
                    </div>

                    <div className="p-3 bg-[#071B36]/60 border border-[#D4AF5A]/20 rounded-xl flex items-center justify-between font-mono">
                      <div>
                        <div className="font-bold text-xs text-white">{tr.fromStation}</div>
                        <div className="text-[10px] text-[#9CA3AF]">{tr.depTime}</div>
                      </div>
                      <div className="text-center text-[10px] text-[#D4AF5A]">
                        <span>🚆 DIRECT</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xs text-white">{tr.toStation}</div>
                        <div className="text-[10px] text-[#9CA3AF]">{tr.arrTime}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#D4AF5A]/20">
                      <div>
                        <span className="text-[10px] text-[#9CA3AF] font-mono uppercase block">TICKET FARE</span>
                        <span className="font-serif font-black text-2xl text-[#E6C878]">₹{tr.price.toLocaleString('en-IN')}</span>
                      </div>

                      <button
                        onClick={() => setBookingModal({ ...tr, type: 'TRAIN' })}
                        className="px-5 py-2.5 gold-gradient-bg text-[#070A0F] font-black text-xs uppercase tracking-widest rounded-full hover:scale-105 transition-transform flex items-center gap-1"
                      >
                        BOOK TICKET
                      </button>
                    </div>

                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* BUSES GRID */}
        {activeTab === 'BUS' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {busRoutes.map((bs, idx) => (
              <ScrollReveal key={bs.id} variant="fade-up" delay={idx * 150}>
                <div className="bg-[#070A0F] border border-[#D4AF5A]/30 rounded-2xl overflow-hidden hover:border-[#D4AF5A] transition-all duration-300 flex flex-col justify-between h-full gold-border-glow">
                  
                  <div className="relative h-48 overflow-hidden">
                    <img src={bs.image} alt={bs.operator} className="w-full h-full object-cover filter contrast-125" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070A0F] via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 bg-[#071B36]/90 border border-[#D4AF5A]/40 text-[#E6C878] text-[10px] font-mono px-3 py-1 rounded-full uppercase">
                      {bs.busType}
                    </span>
                  </div>

                  <div className="p-6 space-y-4 font-sans text-xs">
                    
                    <div>
                      <span className="text-[10px] text-[#D4AF5A] font-mono tracking-widest uppercase block">INTERCITY LUXURY EXPRESS</span>
                      <h3 className="font-serif font-bold text-xl text-white uppercase">{bs.operator}</h3>
                    </div>

                    <div className="p-3 bg-[#071B36]/60 border border-[#D4AF5A]/20 rounded-xl flex items-center justify-between font-mono">
                      <div>
                        <div className="font-bold text-xs text-white">{bs.fromCity}</div>
                        <div className="text-[10px] text-[#9CA3AF]">{bs.depTime}</div>
                      </div>
                      <div className="text-center text-[10px] text-[#D4AF5A]">
                        <span>🚌 DIRECT</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xs text-white">{bs.toCity}</div>
                        <div className="text-[10px] text-[#9CA3AF]">Overnight</div>
                      </div>
                    </div>

                    <div className="text-[11px] text-[#9CA3AF] font-mono flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF5A] shrink-0" />
                      <span className="truncate">Boarding: {bs.boardingPoint}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#D4AF5A]/20">
                      <div>
                        <span className="text-[10px] text-[#9CA3AF] font-mono uppercase block">SEAT FARE</span>
                        <span className="font-serif font-black text-2xl text-[#E6C878]">₹{bs.price.toLocaleString('en-IN')}</span>
                      </div>

                      <button
                        onClick={() => setBookingModal({ ...bs, type: 'BUS' })}
                        className="px-5 py-2.5 gold-gradient-bg text-[#070A0F] font-black text-xs uppercase tracking-widest rounded-full hover:scale-105 transition-transform flex items-center gap-1"
                      >
                        RESERVE SEAT
                      </button>
                    </div>

                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

      </div>

      {/* TRAVEL BOOKING MODAL */}
      {bookingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#071B36] border border-[#D4AF5A] max-w-lg w-full rounded-3xl p-6 space-y-6 shadow-2xl relative gold-border-glow animate-fadeIn">
            
            <button
              onClick={() => setBookingModal(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[10px] text-[#D4AF5A] font-mono uppercase tracking-widest">
                // KINGDOM {bookingModal.type} BOOKING PORTAL
              </span>
              <h3 className="font-serif font-black text-2xl text-white uppercase">
                {bookingModal.airline || bookingModal.trainName || bookingModal.operator}
              </h3>
              <p className="text-xs text-[#9CA3AF] font-mono">
                {bookingModal.origin || bookingModal.fromStation || bookingModal.fromCity} → {bookingModal.destination || bookingModal.toStation || bookingModal.toCity}
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4 font-mono text-xs">
              
              <div>
                <label className="text-[#D4AF5A] block mb-1">PASSENGER FULL NAME:</label>
                <input
                  type="text"
                  required
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  placeholder="e.g. Vikramaditya Singh"
                  className="w-full bg-[#070A0F] border border-[#D4AF5A]/40 text-white p-3 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#D4AF5A] block mb-1">EMAIL FOR E-TICKET QR:</label>
                <input
                  type="email"
                  required
                  value={passengerEmail}
                  onChange={(e) => setPassengerEmail(e.target.value)}
                  placeholder="e.g. vikram.singh@example.com"
                  className="w-full bg-[#070A0F] border border-[#D4AF5A]/40 text-white p-3 rounded-xl focus:outline-none"
                />
              </div>

              {/* SEAT/BERTH SELECTION PREVIEW */}
              <div>
                <label className="text-[#D4AF5A] block mb-1">CHOOSE PREFERRED SEAT / BERTH:</label>
                <select
                  value={selectedSeat}
                  onChange={(e) => setSelectedSeat(e.target.value)}
                  className="w-full bg-[#070A0F] border border-[#D4AF5A]/40 text-white p-3 rounded-xl focus:outline-none"
                >
                  <option value="1A">Window Seat 1A (Royal Front View)</option>
                  <option value="2K">Aisle Seat 2K (Extra Legroom)</option>
                  <option value="4B">Upper Berth / Suite 4B</option>
                  <option value="L4">Lower Sleeper L4 (Quiet Zone)</option>
                </select>
              </div>

              <div className="p-3 bg-[#070A0F] border border-[#D4AF5A]/30 rounded-xl flex items-center justify-between">
                <span className="text-[#9CA3AF]">TOTAL FARE:</span>
                <span className="font-serif font-black text-xl text-[#E6C878]">
                  ₹{bookingModal.price?.toLocaleString('en-IN')}
                </span>
              </div>

              {bookingSuccess && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs rounded-xl text-center">
                  {bookingSuccess}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                icon={<ArrowRight className="w-4 h-4 text-[#070A0F]" />}
              >
                PAY & GENERATE {bookingModal.type} PASS
              </Button>

            </form>

          </div>
        </div>
      )}

    </section>
  );
}
