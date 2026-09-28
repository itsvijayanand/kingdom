'use client';

import React, { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/Button';
import { 
  Film, 
  Sparkles, 
  Clock, 
  MapPin, 
  Tv, 
  Popcorn, 
  Check, 
  ArrowRight,
  Play,
  Ticket,
  CheckCircle2
} from 'lucide-react';

interface MovieItem {
  id: string;
  title: string;
  genre: string;
  duration: string;
  rating: string;
  format: string;
  image: string;
  cinemas: string[];
  showtimes: string[];
  description: string;
}

const MOVIES_LIST: MovieItem[] = [
  {
    id: 'mov-cyberpunk',
    title: 'CYBERPUNK 2099: NEON LEGACY',
    genre: 'Sci-Fi / Cyberpunk Action',
    duration: '2h 45m',
    rating: 'UA 16+',
    format: 'IMAX 3D Laser • Dolby Atmos',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop',
    cinemas: ['Kingdom CyberPlex BKC', 'IMAX Phoenix Palladium', 'Cinepolis Grand Mall'],
    showtimes: ['10:30 AM', '02:15 PM', '06:45 PM (IMAX)', '10:00 PM (VIP)'],
    description: 'In a dystopian mega-city ruled by artificial neural networks, an rogue hacker fights to liberate human consciousness.'
  },
  {
    id: 'mov-dune',
    title: 'DUNE: PROPHECY IX',
    genre: 'Epic Sci-Fi / Adventure',
    duration: '2h 35m',
    rating: 'UA 13+',
    format: 'Dolby Atmos 7.1 • 4K Laser',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    cinemas: ['Kingdom CyberPlex BKC', 'PVR Directors Cut Lower Parel'],
    showtimes: ['11:00 AM', '03:30 PM', '07:15 PM', '10:45 PM'],
    description: 'The ancient Sisterhood navigates deep space conspiracies and spice wars to preserve the sacred destiny of the cosmos.'
  },
  {
    id: 'mov-symphony-film',
    title: 'KINGDOM SYMPHONY: LIVE IN BERLIN',
    genre: 'Music / Concert Film',
    duration: '2h 10m',
    rating: 'U Universal',
    format: 'IMAX 70mm Sound Uncut',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop',
    cinemas: ['Kingdom CyberPlex BKC', 'IMAX Phoenix Palladium'],
    showtimes: ['01:00 PM', '05:00 PM', '08:30 PM'],
    description: 'The legendary Kraftwerk Berlin concert captured in 8K resolution with 64-channel immersive spatial audio.'
  },
  {
    id: 'mov-shadow-light',
    title: 'SHADOW & LIGHT',
    genre: 'Neo-Noir Thriller',
    duration: '2h 15m',
    rating: 'A 18+',
    format: 'VIP Recliner Suite',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop',
    cinemas: ['PVR Directors Cut Lower Parel', 'Cinepolis Grand Mall'],
    showtimes: ['04:00 PM', '07:45 PM', '11:15 PM'],
    description: 'An elite detective uncovers high-profile corporate espionage inside Tokyo synth laboratories.'
  }
];

export default function MoviesSection() {
  const [selectedMovie, setSelectedMovie] = useState<MovieItem>(MOVIES_LIST[0]);
  const [selectedCinema, setSelectedCinema] = useState<string>(MOVIES_LIST[0].cinemas[0]);
  const [selectedShowtime, setSelectedShowtime] = useState<string>(MOVIES_LIST[0].showtimes[2]);
  
  // Seat grid interactive state
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['E6', 'E7']);
  const [addSnacks, setAddSnacks] = useState<boolean>(true);

  // Booking Modal
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string | null>(null);

  const seatPriceMap: Record<string, number> = {
    'A': 900, 'B': 900, // VIP Recliners
    'C': 650, 'D': 650, 'E': 650, // Executive
    'F': 450, 'G': 450, 'H': 450  // Standard Club
  };

  const calculateSeatTotal = () => {
    let seatTotal = selectedSeats.reduce((sum, seat) => {
      const row = seat.charAt(0);
      return sum + (seatPriceMap[row] || 500);
    }, 0);

    if (addSnacks) seatTotal += 550; // Popcorn + Drink Combo
    return seatTotal;
  };

  const toggleSeat = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length >= 6) return;
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleMovieBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || selectedSeats.length === 0) return;

    const bookingCode = `MOV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setBookingSuccessMsg(`M-Ticket Reserved! ${selectedMovie.title} (${selectedSeats.join(', ')}) • Code: ${bookingCode}`);

    setTimeout(() => {
      setIsBookingModalOpen(false);
      setBookingSuccessMsg(null);
      // Navigate to Your Bookings
      const targetEl = document.getElementById('your-bookings');
      if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
    }, 1800);
  };

  return (
    <section id="movies" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24">
      
      {/* SECTION HEADER */}
      <ScrollReveal variant="fade-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D4AF5A]/30 pb-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#071B36] border border-[#D4AF5A]/30 text-[#D4AF5A] text-xs font-mono uppercase mb-2">
              <Film className="w-3.5 h-3.5 text-[#D4AF5A]" />
              KINGDOM BOX OFFICE & CINEMAS
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-wider uppercase">
              MOVIES — <span className="gold-gradient-text">CINEMAS & SHOWTIMES</span>
            </h2>
          </div>

          <p className="mt-3 md:mt-0 text-xs text-[#9CA3AF] font-mono uppercase tracking-wider max-w-sm">
            IMAX Dual Laser, Dolby Atmos 7.1, VIP Recliner Suite, and instant M-Ticket QR generation.
          </p>
        </div>
      </ScrollReveal>

      {/* MOVIES SELECTOR GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* LEFT: MOVIE POSTERS LIST */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs text-[#D4AF5A] font-mono uppercase tracking-widest block">SELECT NOW SHOWING MOVIE:</span>
          
          <div className="space-y-3">
            {MOVIES_LIST.map((m) => (
              <div
                key={m.id}
                onClick={() => {
                  setSelectedMovie(m);
                  setSelectedCinema(m.cinemas[0]);
                  setSelectedShowtime(m.showtimes[0]);
                }}
                className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-4 ${
                  selectedMovie.id === m.id
                    ? 'bg-[#071B36] border-[#D4AF5A] gold-border-glow shadow-xl'
                    : 'bg-[#070A0F]/80 border-[#D4AF5A]/20 hover:border-[#D4AF5A]/50'
                }`}
              >
                <img src={m.image} alt={m.title} className="w-16 h-20 object-cover rounded-xl border border-[#D4AF5A]/30 shrink-0" />
                <div className="space-y-1 overflow-hidden">
                  <span className="text-[10px] text-[#E6C878] font-mono uppercase block">{m.format}</span>
                  <h4 className="font-serif font-bold text-base text-white truncate uppercase">{m.title}</h4>
                  <p className="text-xs text-[#9CA3AF] font-mono">{m.genre} • {m.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: MOVIE DETAIL & SHOWTIMES SELECTOR */}
        <div className="lg:col-span-7 bg-[#071B36]/60 border border-[#D4AF5A]/30 p-6 sm:p-8 rounded-3xl space-y-6 gold-border-glow">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D4AF5A]/20 pb-4">
            <div>
              <span className="text-xs text-[#D4AF5A] font-mono uppercase tracking-widest">{selectedMovie.rating} • {selectedMovie.genre}</span>
              <h3 className="font-serif font-black text-3xl text-white uppercase">{selectedMovie.title}</h3>
              <p className="text-xs text-[#E6C878] font-mono">{selectedMovie.format} • {selectedMovie.duration}</p>
            </div>

            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-6 py-3 gold-gradient-bg text-[#070A0F] font-black text-xs uppercase tracking-widest rounded-full hover:scale-105 transition-transform flex items-center gap-2 shrink-0"
            >
              <Ticket className="w-4 h-4 text-[#070A0F]" />
              <span>SELECT SEATS</span>
            </button>
          </div>

          <p className="text-xs text-[#9CA3AF] leading-relaxed font-sans">
            {selectedMovie.description}
          </p>

          {/* CINEMA SELECTOR */}
          <div className="space-y-2 font-mono text-xs">
            <span className="text-[#D4AF5A] block uppercase tracking-wider">CHOOSE PREMIER CINEMA THEATER:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedMovie.cinemas.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCinema(c)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedCinema === c
                      ? 'bg-[#070A0F] border-[#D4AF5A] text-white font-bold'
                      : 'bg-[#070A0F]/50 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF5A] inline mr-1.5" />
                  <span>{c}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SHOWTIMES SELECTOR */}
          <div className="space-y-2 font-mono text-xs">
            <span className="text-[#D4AF5A] block uppercase tracking-wider">SELECT SHOWTIME FOR TODAY:</span>
            <div className="flex flex-wrap items-center gap-2">
              {selectedMovie.showtimes.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedShowtime(st)}
                  className={`px-4 py-2.5 rounded-xl border font-bold transition-all ${
                    selectedShowtime === st
                      ? 'gold-gradient-bg text-[#070A0F] border-transparent shadow-[0_0_15px_rgba(212,175,90,0.4)]'
                      : 'bg-[#070A0F] border-[#D4AF5A]/30 text-white hover:border-[#D4AF5A]'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 inline mr-1.5" />
                  <span>{st}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SEAT GRID PREVIEW SUMMARY */}
          <div className="p-4 bg-[#070A0F] border border-[#D4AF5A]/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="text-[#9CA3AF] block">SELECTED SEATS ({selectedSeats.length}):</span>
              <span className="text-[#E6C878] font-bold text-sm">{selectedSeats.join(', ') || 'None selected'}</span>
            </div>

            <div>
              <span className="text-[#9CA3AF] block">TOTAL AMOUNT:</span>
              <span className="font-serif font-black text-xl text-white">₹{calculateSeatTotal().toLocaleString('en-IN')}</span>
            </div>

            <Button
              onClick={() => setIsBookingModalOpen(true)}
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4 text-[#070A0F]" />}
            >
              BOOK M-TICKET NOW
            </Button>
          </div>

        </div>

      </div>

      {/* INTERACTIVE 2D CINEMA SEAT MAP & BOOKING MODAL */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#071B36] border border-[#D4AF5A] max-w-2xl w-full rounded-3xl p-6 space-y-6 shadow-2xl relative gold-border-glow animate-fadeIn my-8">
            
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            <div className="space-y-1 text-center border-b border-[#D4AF5A]/20 pb-4">
              <span className="text-[10px] text-[#D4AF5A] font-mono uppercase tracking-widest">// INTERACTIVE CINEMA SEAT MATRIX</span>
              <h3 className="font-serif font-black text-2xl text-white uppercase">{selectedMovie.title}</h3>
              <p className="text-xs text-[#9CA3AF] font-mono">{selectedCinema} • {selectedShowtime}</p>
            </div>

            {/* SCREEN CURVE INDICATOR */}
            <div className="text-center space-y-2">
              <div className="w-3/4 mx-auto h-2 bg-gradient-to-r from-transparent via-[#D4AF5A] to-transparent rounded-full shadow-[0_0_20px_#D4AF5A]" />
              <span className="text-[9px] text-[#D4AF5A] font-mono uppercase tracking-[0.3em]">SCREEN THIS WAY</span>
            </div>

            {/* 2D SEAT MATRIX GRID */}
            <div className="space-y-2 py-4 bg-[#070A0F] border border-[#D4AF5A]/20 p-4 rounded-2xl">
              {['A', 'C', 'E', 'G'].map((row) => (
                <div key={row} className="flex items-center justify-center gap-1.5 font-mono text-[10px]">
                  <span className="w-4 text-[#D4AF5A] font-bold text-center">{row}</span>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((col) => {
                    const seatId = `${row}${col}`;
                    const isSelected = selectedSeats.includes(seatId);
                    const isOccupied = (row === 'C' && (col === 3 || col === 4)) || (row === 'G' && col === 8);

                    return (
                      <button
                        key={seatId}
                        type="button"
                        disabled={isOccupied}
                        onClick={() => toggleSeat(seatId)}
                        className={`w-7 h-7 rounded-md font-bold transition-all ${
                          isOccupied
                            ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700'
                            : isSelected
                            ? 'gold-gradient-bg text-[#070A0F] scale-110 shadow-[0_0_10px_#D4AF5A]'
                            : 'bg-[#071B36] text-[#E8E8E5] border border-[#D4AF5A]/30 hover:border-[#D4AF5A]'
                        }`}
                      >
                        {col}
                      </button>
                    );
                  })}
                </div>
              ))}

              <div className="pt-3 flex items-center justify-center gap-6 font-mono text-[10px] text-[#9CA3AF]">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-[#071B36] border border-[#D4AF5A]/40 rounded" /> Available</div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 gold-gradient-bg rounded" /> Selected</div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-zinc-800 rounded" /> Occupied</div>
              </div>
            </div>

            {/* SNACK ADD-ON OPTION */}
            <div className="p-3 bg-[#070A0F] border border-[#D4AF5A]/20 rounded-xl flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <Popcorn className="w-4 h-4 text-[#D4AF5A]" />
                <div>
                  <div className="font-bold text-white">ADD KINGDOM COMBO SNACK (+₹550)</div>
                  <div className="text-[10px] text-[#9CA3AF]">Large Caramel Popcorn + Royal Cold Brew</div>
                </div>
              </div>

              <input
                type="checkbox"
                checked={addSnacks}
                onChange={(e) => setAddSnacks(e.target.checked)}
                className="w-5 h-5 accent-[#D4AF5A] cursor-pointer"
              />
            </div>

            {/* PASSENGER CHECKOUT FORM */}
            <form onSubmit={handleMovieBooking} className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-[#D4AF5A] block mb-1">GUEST NAME:</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Aarav Roy"
                  className="w-full bg-[#070A0F] border border-[#D4AF5A]/40 text-white p-3 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#D4AF5A] block mb-1">EMAIL FOR M-TICKET QR:</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="e.g. aarav.roy@example.com"
                  className="w-full bg-[#070A0F] border border-[#D4AF5A]/40 text-white p-3 rounded-xl focus:outline-none"
                />
              </div>

              <div className="p-3 bg-[#070A0F] border border-[#D4AF5A]/30 rounded-xl flex items-center justify-between">
                <span className="text-[#9CA3AF]">TOTAL DUE:</span>
                <span className="font-serif font-black text-xl text-[#E6C878]">
                  ₹{calculateSeatTotal().toLocaleString('en-IN')}
                </span>
              </div>

              {bookingSuccessMsg && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs rounded-xl text-center">
                  {bookingSuccessMsg}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                icon={<ArrowRight className="w-4 h-4 text-[#070A0F]" />}
              >
                PAY & CONFIRM M-TICKET
              </Button>

            </form>

          </div>
        </div>
      )}

    </section>
  );
}
