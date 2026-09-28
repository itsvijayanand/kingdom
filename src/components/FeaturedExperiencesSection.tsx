'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/Button';
import { 
  Crown, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  Ticket, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Music,
  Tv
} from 'lucide-react';

interface EventExperience {
  id: string;
  title: string;
  category: string;
  headlineArtist: string;
  venue: string;
  city: string;
  date: string;
  time: string;
  priceStart: number;
  image: string;
  badge: string;
  highlights: string[];
}

const FEATURED_EVENTS: EventExperience[] = [
  {
    id: 'evt-nocturne-2026',
    title: 'NOCTURNE VELOCITY: WORLD TOUR 2026',
    category: 'Electronic & Raves',
    headlineArtist: 'VEX & THE SYNTH SYNDICATE',
    venue: 'Cyberdome Arena & Exhibition Grounds',
    city: 'MUMBAI',
    date: 'OCTOBER 31, 2026',
    time: '20:00 IST',
    priceStart: 1499,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
    badge: 'FEATURED KINGDOM HEADLINER',
    highlights: ['120,000 Watts Horn Bass Subwoofers', '360° Volumetric Laser Matrix', 'HMAC QR Fast-Track Entry']
  },
  {
    id: 'evt-symphony-opera',
    title: 'ROYAL CYBER SYMPHONY & HOLOGRAM CHOIR',
    category: 'Cyber Symphony & Opera',
    headlineArtist: 'KINGDOM PHILHARMONIC ORCHESTRA',
    venue: 'Royal Grand Opera & Performing Arts',
    city: 'MUMBAI',
    date: 'NOVEMBER 12, 2026',
    time: '19:30 IST',
    priceStart: 2199,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    badge: 'ACOUSTIC SUITE EXCLUSIVE',
    highlights: ['Live 80-Piece Orchestral Score', 'Volumetric Holographic Visuals', 'VIP Champagne Lounge Access']
  },
  {
    id: 'evt-neotokyo-edm',
    title: 'NEO-TOKYO SYNTH & EDM LIGHTS FESTIVAL',
    category: 'Electronic & Raves',
    headlineArtist: 'DJ CYBERPULSE & SPECIAL GUESTS',
    venue: 'Sub-Zero Dome Complex',
    city: 'MUMBAI',
    date: 'DECEMBER 05, 2026',
    time: '21:00 IST',
    priceStart: 1899,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
    badge: 'ALL-NIGHT FESTIVAL',
    highlights: ['Dual Arena Stages', 'Immersive Pyro & Laser Cannons', 'Exclusive Merch Pavilion']
  },
  {
    id: 'evt-arena-comedy',
    title: 'KINGDOM ARENA COMEDY & MAGIC SPECIAL',
    category: 'Arena Comedy',
    headlineArtist: 'INTERNATIONAL ALL-STAR LINEUP',
    venue: 'Kingdom Amphitheater BKC',
    city: 'MUMBAI',
    date: 'DECEMBER 19, 2026',
    time: '20:00 IST',
    priceStart: 999,
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop',
    badge: 'STANDUP SPECIAL',
    highlights: ['2 Hour Uncensored Comedy', 'Illusion & Stage Magic', 'Food & Beverage Service']
  }
];

export default function FeaturedExperiencesSection() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeBookingEvent, setActiveBookingEvent] = useState<EventExperience | null>(null);
  const [selectedTier, setSelectedTier] = useState('REGULAR');
  const [ticketQty, setTicketQty] = useState(1);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string | null>(null);

  const filteredEvents = selectedFilter === 'All' 
    ? FEATURED_EVENTS 
    : FEATURED_EVENTS.filter(e => e.category === selectedFilter);

  const tierPrices: Record<string, number> = {
    'EARLY_BIRD': 1499,
    'REGULAR': 2499,
    'VIP': 4999,
    'COUPLE': 3999,
    'BACKSTAGE': 9999
  };

  const handleInstantBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBookingEvent) return;

    const unitPrice = tierPrices[selectedTier] || activeBookingEvent.priceStart;
    const totalPrice = unitPrice * ticketQty;

    setBookingSuccessMsg(`Pass Reserved! ${ticketQty}x ${selectedTier} Pass for ₹${totalPrice.toLocaleString('en-IN')}. Redirecting to Checkout...`);

    setTimeout(() => {
      window.location.href = `/checkout?tier=${selectedTier}&qty=${ticketQty}`;
    }, 1500);
  };

  return (
    <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
      
      {/* SECTION HEADER */}
      <ScrollReveal variant="fade-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D4AF5A]/30 pb-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#071B36] border border-[#D4AF5A]/30 text-[#D4AF5A] text-xs font-mono uppercase mb-2">
              <Crown className="w-3.5 h-3.5 text-[#D4AF5A]" />
              FEATURED EXPERIENCES
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-5xl text-white tracking-wider uppercase">
              CONCERTS / <span className="gold-gradient-text">EVENTS / SHOWS</span>
            </h2>
          </div>
          
          <p className="mt-3 md:mt-0 text-xs text-[#9CA3AF] max-w-md font-mono">
            World-class live acoustics, stadium laser matrix, and cryptographically verified VIP access passes.
          </p>
        </div>
      </ScrollReveal>

      {/* FILTER TABS */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {['All', 'Electronic & Raves', 'Cyber Symphony & Opera', 'Arena Comedy'].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
              selectedFilter === filter
                ? 'gold-gradient-bg text-[#070A0F] font-bold shadow-[0_0_15px_rgba(212,175,90,0.4)]'
                : 'bg-[#071B36]/60 text-[#E8E8E5] border border-[#D4AF5A]/25 hover:border-[#D4AF5A]/60'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* EVENT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredEvents.map((evt, idx) => (
          <ScrollReveal key={evt.id} variant="fade-up" delay={idx * 150}>
            <div className="bg-[#071B36]/70 border border-[#D4AF5A]/30 overflow-hidden hover:border-[#D4AF5A] transition-all duration-300 group flex flex-col justify-between h-full gold-border-glow">
              
              {/* IMAGE HEADER WITH BADGE */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B36] via-[#071B36]/30 to-transparent" />
                
                <div className="absolute top-4 left-4 bg-[#070A0F]/90 border border-[#D4AF5A]/50 px-3 py-1 text-[10px] text-[#E6C878] font-mono tracking-widest uppercase rounded-full backdrop-blur-md flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#D4AF5A]" />
                  {evt.badge}
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#E6C878] font-mono">
                  <span className="flex items-center gap-1 bg-[#070A0F]/80 px-2.5 py-1 rounded border border-[#D4AF5A]/20">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF5A]" /> {evt.date}
                  </span>
                  <span className="flex items-center gap-1 bg-[#070A0F]/80 px-2.5 py-1 rounded border border-[#D4AF5A]/20">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF5A]" /> {evt.time}
                  </span>
                </div>
              </div>

              {/* CARD DETAILS */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                
                <div className="space-y-2">
                  <span className="text-[10px] text-[#D4AF5A] font-mono tracking-widest uppercase">
                    HEADLINER: {evt.headlineArtist}
                  </span>
                  
                  <h3 className="font-serif font-black text-2xl text-white uppercase tracking-wider leading-tight">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-[#9CA3AF] flex items-center gap-1 font-sans">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF5A] shrink-0" />
                    <span>{evt.venue}, {evt.city}</span>
                  </p>
                </div>

                {/* HIGHLIGHTS BULLETS */}
                <div className="pt-2 border-t border-[#D4AF5A]/15 space-y-1.5 font-mono text-[11px] text-zinc-300">
                  {evt.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-[#D4AF5A] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* PRICING & BOOK ACTION */}
                <div className="pt-4 flex items-center justify-between border-t border-[#D4AF5A]/25">
                  <div>
                    <span className="text-[10px] text-[#9CA3AF] font-mono uppercase block">PASSES FROM</span>
                    <span className="font-serif font-black text-2xl text-[#E6C878]">
                      ₹{evt.priceStart.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveBookingEvent(evt)}
                      className="px-5 py-2.5 gold-gradient-bg text-[#070A0F] font-black text-xs uppercase tracking-widest rounded-full hover:scale-105 transition-transform flex items-center gap-1"
                    >
                      <span>BOOK PASS</span>
                      <ArrowUpRight className="w-4 h-4 text-[#070A0F]" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* QUICK BOOKING MODAL */}
      {activeBookingEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#071B36] border border-[#D4AF5A] max-w-lg w-full rounded-3xl p-6 space-y-6 shadow-2xl relative gold-border-glow animate-fadeIn">
            
            <button
              onClick={() => setActiveBookingEvent(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[10px] text-[#D4AF5A] font-mono uppercase tracking-widest">// INSTANT TICKET RESERVATION</span>
              <h3 className="font-serif font-black text-2xl text-white uppercase">{activeBookingEvent.title}</h3>
              <p className="text-xs text-[#9CA3AF]">{activeBookingEvent.venue} • {activeBookingEvent.date}</p>
            </div>

            <form onSubmit={handleInstantBooking} className="space-y-4 font-mono text-xs">
              
              <div>
                <label className="text-[#D4AF5A] block mb-1">SELECT TICKET TIER:</label>
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="w-full bg-[#070A0F] border border-[#D4AF5A]/40 text-white p-3 rounded-xl focus:outline-none"
                >
                  <option value="REGULAR">REGULAR GA PASS — ₹2,499</option>
                  <option value="EARLY_BIRD">EARLY BIRD PASS — ₹1,499</option>
                  <option value="VIP">VIP ELEVATED ACCESS — ₹4,999</option>
                  <option value="COUPLE">COUPLE GA PACKAGE — ₹3,999</option>
                  <option value="BACKSTAGE">ALL ACCESS BACKSTAGE — ₹9,999</option>
                </select>
              </div>

              <div>
                <label className="text-[#D4AF5A] block mb-1">QUANTITY:</label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={ticketQty}
                  onChange={(e) => setTicketQty(parseInt(e.target.value) || 1)}
                  className="w-full bg-[#070A0F] border border-[#D4AF5A]/40 text-white p-3 rounded-xl focus:outline-none"
                />
              </div>

              <div className="p-3 bg-[#070A0F] border border-[#D4AF5A]/30 rounded-xl flex items-center justify-between">
                <span className="text-[#9CA3AF]">TOTAL DUE:</span>
                <span className="font-serif font-black text-xl text-[#E6C878]">
                  ₹{((tierPrices[selectedTier] || activeBookingEvent.priceStart) * ticketQty).toLocaleString('en-IN')}
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
                icon={<ArrowUpRight className="w-4 h-4 text-[#070A0F]" />}
              >
                CONFIRM & PROCEED TO CHECKOUT
              </Button>

            </form>

          </div>
        </div>
      )}

    </section>
  );
}
