'use client';

import React from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import TicketSelector from '@/components/TicketSelector';
import KingdomLogo from '@/components/KingdomLogo';
import { Button } from '@/components/Button';
import { ArrowUpRight, Sparkles, MapPin, Calendar, ShieldCheck, Crown } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-24 bg-[#070A0F] text-[#E8E8E5] font-sans">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <HeroSection />

      {/* 2. ABOUT KINGDOM EVENTS & ENTERTAINMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-[#071B36]/60 border border-[#D4AF5A]/30 p-8 lg:p-14 relative overflow-hidden gold-border-glow">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
              <KingdomLogo size="lg" showLink={false} />
              <span className="text-xs text-[#D4AF5A] font-bold tracking-[0.25em] uppercase">
                // WORLD-CLASS LIVE CONCERTS & EXPERIENCES
              </span>
            </div>

            <div className="lg:col-span-7 space-y-6 text-sm text-[#9CA3AF] leading-relaxed">
              <h2 className="font-serif font-black text-3xl sm:text-4xl text-white uppercase tracking-wider">
                CREATING <span className="gold-gradient-text">UNFORGETTABLE</span> LIVE MOMENTS
              </h2>
              <p>
                Kingdom Events and Entertainment creates premium live experiences, concerts, and high-profile entertainment events across international arenas. Designed with uncompromised acoustic fidelity, visual splendor, and cryptographic ticket security.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-xs">
                <div className="p-4 bg-[#070A0F] border border-[#D4AF5A]/20">
                  <div className="font-serif font-extrabold text-2xl text-white">5,000+</div>
                  <div className="text-[#9CA3AF] text-[10px] tracking-widest uppercase">ARENA GUEST CAPACITY</div>
                </div>
                <div className="p-4 bg-[#070A0F] border border-[#D4AF5A]/20">
                  <div className="font-serif font-extrabold text-2xl text-[#E6C878]">100%</div>
                  <div className="text-[#9CA3AF] text-[10px] tracking-widest uppercase">HMAC QR TICKET INTEGRITY</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. FEATURED EVENT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#071B36] border border-[#D4AF5A]/40 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            <div className="lg:col-span-7 p-8 lg:p-12 space-y-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#070A0F] border border-[#D4AF5A]/40 text-[#E6C878] text-xs uppercase tracking-[0.2em]">
                <Crown className="w-3.5 h-3.5 text-[#D4AF5A]" /> FEATURED KINGDOM CONCERT
              </div>

              <h2 className="font-serif font-black text-4xl sm:text-6xl text-white uppercase tracking-wider leading-none">
                NOCTURNE VELOCITY <br />
                <span className="gold-gradient-text">WORLD TOUR 2026</span>
              </h2>

              <p className="text-xs text-[#9CA3AF] max-w-xl leading-relaxed uppercase tracking-wider font-mono">
                HEADLINER VEX & THE SYNTH SYNDICATE LIVE AT CYBERDOME ARENA MUMBAI. FULL 120,000 WATTS HORN SUB-BASS & 360° LASER MATRIX.
              </p>

              <div className="flex items-center gap-6 text-xs text-[#E6C878] font-mono">
                <span>OCTOBER 31, 2026</span>
                <span>•</span>
                <span>CYBERDOME ARENA, MUMBAI</span>
              </div>

              <div className="pt-2">
                <Button
                  href="/checkout"
                  variant="primary"
                  size="lg"
                  icon={<ArrowUpRight className="w-4 h-4 text-[#070A0F]" />}
                >
                  SECURE YOUR TICKETS NOW
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[320px]">
              <img
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop"
                alt="Featured Event Stage"
                className="w-full h-full object-cover filter contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B36] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#071B36] lg:to-transparent" />
            </div>

          </div>
        </div>
      </section>

      {/* 4. ARTIST SHOWCASE */}
      <section className="bg-[#071B36]/40 border-y border-[#D4AF5A]/25 py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-end justify-between border-b border-[#D4AF5A]/20 pb-8 mb-12">
            <div>
              <span className="text-xs text-[#D4AF5A] font-bold tracking-[0.25em] uppercase">// HEADLINE ARTIST</span>
              <h2 className="font-serif font-black text-4xl sm:text-6xl text-white tracking-wider uppercase mt-1">
                VEX & THE <span className="gold-gradient-text">SYNTH SYNDICATE</span>
              </h2>
            </div>
            <Link href="/artist" className="mt-4 md:mt-0 text-xs text-[#E6C878] hover:text-[#D4AF5A] flex items-center gap-1 uppercase tracking-widest font-mono">
              VIEW ARTIST SHOWCASE <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#070A0F] p-6 border border-[#D4AF5A]/25 space-y-4">
              <img
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop"
                alt="Artist Live"
                className="w-full h-60 object-cover border border-zinc-900 filter contrast-125"
              />
              <h3 className="font-serif font-bold text-xl text-white uppercase">WORLD TOUR HEADLINER</h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Performing tracks from their chart-topping album <i>Nocturne Velocity</i> live with real-time synthesizer improvisation.
              </p>
            </div>

            <div className="bg-[#070A0F] p-6 border border-[#D4AF5A]/25 space-y-4">
              <img
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop"
                alt="Synth Rig"
                className="w-full h-60 object-cover border border-zinc-900 filter contrast-125"
              />
              <h3 className="font-serif font-bold text-xl text-white uppercase">ANALOG MODULAR RIGS</h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Raw modular synth wall rigs using vintage Moog, Prophet, and custom Buchla sequencers.
              </p>
            </div>

            <div className="bg-[#070A0F] p-6 border border-[#D4AF5A]/25 space-y-4">
              <img
                src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop"
                alt="Crowd Energy"
                className="w-full h-60 object-cover border border-zinc-900 filter contrast-125"
              />
              <h3 className="font-serif font-bold text-xl text-[#E6C878] uppercase">MUMBAI EXCLUSIVE SHOW</h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                The single Asia stop on the 2026 World Tour. Expected attendance exceeds 5,000 guests across 5 gate portals.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. TICKET CATEGORIES DECK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <TicketSelector />
      </section>

      {/* 6. UPCOMING WORLD DATES */}
      <section className="bg-[#071B36] text-white py-20 relative overflow-hidden border-t border-[#D4AF5A]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-end justify-between border-b border-[#D4AF5A]/20 pb-8 mb-12">
            <div>
              <span className="text-xs text-[#D4AF5A] font-bold tracking-[0.25em] uppercase">// KINGDOM TOUR ITINERARY</span>
              <h2 className="font-serif font-black text-4xl sm:text-6xl text-white tracking-wider uppercase mt-1">
                UPCOMING WORLD EVENTS
              </h2>
            </div>
            <span className="text-xs font-mono text-[#E6C878] uppercase">
              2026 INTERNATIONAL DATES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
            
            <div className="bg-[#070A0F] text-white p-6 border border-[#D4AF5A]/40 space-y-3">
              <span className="text-[#D4AF5A] font-bold text-sm">OCTOBER 31, 2026</span>
              <h3 className="font-serif font-black text-2xl text-white uppercase">MUMBAI • CYBERDOME ARENA</h3>
              <p className="text-[#9CA3AF] text-xs">Asia Headline Leg • Tickets Currently On Sale</p>
              <Link href="/tickets" className="inline-block pt-2 text-[#D4AF5A] font-bold hover:underline uppercase">
                GET TICKETS →
              </Link>
            </div>

            <div className="bg-[#070A0F] text-white p-6 border border-zinc-800 space-y-3">
              <span className="text-[#9CA3AF] font-bold text-sm">NOVEMBER 14, 2026</span>
              <h3 className="font-serif font-black text-2xl text-white uppercase">BERLIN • KRAFTWERK DOME</h3>
              <p className="text-[#9CA3AF] text-xs">Europe Headline Leg • Pre-sale Phase 2</p>
              <span className="inline-block pt-2 text-zinc-500 font-bold uppercase">
                SOON ON SALE
              </span>
            </div>

            <div className="bg-[#070A0F] text-white p-6 border border-zinc-800 space-y-3">
              <span className="text-[#9CA3AF] font-bold text-sm">DECEMBER 05, 2026</span>
              <h3 className="font-serif font-black text-2xl text-white uppercase">TOKYO • SHINAGAWA HALL</h3>
              <p className="text-[#9CA3AF] text-xs">Japan Finale Show • Announced</p>
              <span className="inline-block pt-2 text-zinc-500 font-bold uppercase">
                ANNOUNCED
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* 7. VENUE & LOCATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <span className="text-xs text-[#D4AF5A] font-bold tracking-[0.25em] uppercase">// VENUE LOCATION & ACCESS</span>
          <h2 className="font-serif font-black text-4xl sm:text-6xl text-white tracking-wider uppercase mt-1">
            CYBERDOME <span className="gold-gradient-text">ARENA</span>
          </h2>
          <p className="text-[#9CA3AF] text-xs mt-2 uppercase">
            Gate 4, BKC Complex, Bandra East, Mumbai • 5 Fast-Track Access Portals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans">
          <div className="p-6 bg-[#071B36] border border-[#D4AF5A]/25 space-y-2">
            <div className="text-[#D4AF5A] font-bold text-sm">GATE 1 & GATE 2</div>
            <div className="text-white font-serif font-bold text-base">NORTH & SOUTH GA PORTAL</div>
            <p className="text-[#9CA3AF]">Dedicated for Regular GA & Early Access pass holders with 8 scanning channels.</p>
          </div>

          <div className="p-6 bg-[#071B36] border border-[#D4AF5A]/25 space-y-2">
            <div className="text-emerald-400 font-bold text-sm">VIP PORTAL</div>
            <div className="text-white font-serif font-bold text-base">RED CARPET WEST PAVILION</div>
            <p className="text-[#9CA3AF]">Fast-track VIP entrance with welcome beverage & elevated seating access.</p>
          </div>

          <div className="p-6 bg-[#071B36] border border-[#D4AF5A]/25 space-y-2">
            <div className="text-[#E6C878] font-bold text-sm">BACKSTAGE PORTAL</div>
            <div className="text-white font-serif font-bold text-base">ARTIST & HOSPITALITY WING</div>
            <p className="text-[#9CA3AF]">Restricted security scan portal for All-Access Backstage pass holders.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
