'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import KingdomLogo from '@/components/KingdomLogo';
import { Button } from '@/components/Button';
import { ArrowUpRight, Calendar, MapPin, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';
import { useSmoothScroll } from '@/components/SmoothScrollProvider';

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 36, hours: 14, minutes: 22, seconds: 45 });
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const target = new Date('2026-10-31T20:00:00.000Z').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[92vh] bg-[#070A0F] overflow-hidden pt-28 pb-16 flex flex-col justify-center">
      
      {/* Background Concert Photography with Dark Navy Overlay & Gold Ambient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1920&auto=format&fit=crop"
          alt="Kingdom Live Concert"
          className="w-full h-full object-cover object-center opacity-25 filter contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070A0F] via-[#071B36]/80 to-[#070A0F]" />
        <div className="absolute inset-0 gold-ambient" />
        <div className="absolute inset-0 navy-ambient" />
      </div>

      {/* Controlled Hero Content Container */}
      <div className="relative z-10 max-w-[1550px] w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mx-auto px-4 sm:px-6 lg:px-10 text-center flex flex-col items-center">
        
        {/* Top Kingdom Logo Emblem Header */}
        <div className="mb-4 transform hover:scale-105 transition-transform duration-500 shrink-0">
          <KingdomLogo size="lg" showLink={false} />
        </div>

        {/* Refined Status Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#071B36]/70 border border-[#D4AF5A]/35 text-[#E6C878] text-[9px] sm:text-xs font-mono tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-4 sm:mb-5 rounded-full gold-border-glow backdrop-blur-md">
          <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#D4AF5A] shrink-0" />
          <span className="truncate">PRESENTS NOCTURNE VELOCITY LIVE 2026</span>
        </div>

        {/* Main Hero Headline with Responsive Clamp Font Size */}
        <h1 className="font-serif font-black text-[clamp(32px,8.5vw,115px)] tracking-tight uppercase text-white leading-[0.94] drop-shadow-2xl max-w-6xl mx-auto">
          <span className="text-[#E8E8E5] block">EXPERIENCE THE</span>
          <span className="gold-gradient-text block">EXTRAORDINARY</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-4 sm:mt-5 text-xs sm:text-xl lg:text-2xl font-serif text-[#E6C878] tracking-[0.12em] sm:tracking-[0.18em] uppercase font-semibold max-w-3xl">
          LIVE HEADLINER: VEX & THE SYNTH SYNDICATE
        </p>

        {/* Location & Acoustics Details */}
        <p className="mt-2 text-[10px] sm:text-xs md:text-sm font-sans text-[#9CA3AF] max-w-2xl leading-relaxed uppercase tracking-[0.08em] sm:tracking-[0.12em]">
          MUMBAI • CYBERDOME ARENA • 120,000 WATTS ACOUSTICS & 360° LASER MATRIX
        </p>

        {/* Meta Info Bar */}
        <div className="mt-6 sm:mt-7 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 w-full max-w-3xl text-left font-sans text-xs">
          <div className="p-3 sm:p-3.5 bg-[#071B36]/70 border border-[#D4AF5A]/25 backdrop-blur-md flex items-center gap-3 rounded-2xl">
            <Calendar className="w-4 h-4 text-[#D4AF5A] shrink-0" />
            <div>
              <div className="text-[#9CA3AF] text-[9px] tracking-widest uppercase">CONCERT DATE</div>
              <div className="text-[#E8E8E5] font-bold text-xs">OCTOBER 31, 2026</div>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 bg-[#071B36]/70 border border-[#D4AF5A]/25 backdrop-blur-md flex items-center gap-3 rounded-2xl">
            <MapPin className="w-4 h-4 text-[#D4AF5A] shrink-0" />
            <div>
              <div className="text-[#9CA3AF] text-[9px] tracking-widest uppercase">ARENA LOCATION</div>
              <div className="text-[#E8E8E5] font-bold text-xs">CYBERDOME ARENA, MUMBAI</div>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 bg-[#071B36]/70 border border-[#D4AF5A]/25 backdrop-blur-md flex items-center gap-3 rounded-2xl">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div className="text-[#9CA3AF] text-[9px] tracking-widest uppercase">ENTRY SECURITY</div>
              <div className="text-emerald-400 font-bold text-xs">HMAC QR GATE VERIFIED</div>
            </div>
          </div>
        </div>

        {/* Countdown Grid */}
        <div className="mt-6 grid grid-cols-4 sm:flex items-center gap-1.5 sm:gap-5 font-mono text-center w-full max-w-sm sm:max-w-none">
          <div className="bg-[#071B36]/80 border border-[#D4AF5A]/30 p-2 sm:p-2.5 rounded-xl">
            <div className="font-serif font-black text-lg sm:text-3xl text-[#D4AF5A]">{timeLeft.days}</div>
            <div className="text-[7px] sm:text-[9px] text-[#9CA3AF] tracking-widest uppercase">DAYS</div>
          </div>
          <div className="bg-[#071B36]/80 border border-[#D4AF5A]/30 p-2 sm:p-2.5 rounded-xl">
            <div className="font-serif font-black text-lg sm:text-3xl text-white">{timeLeft.hours}</div>
            <div className="text-[7px] sm:text-[9px] text-[#9CA3AF] tracking-widest uppercase">HOURS</div>
          </div>
          <div className="bg-[#071B36]/80 border border-[#D4AF5A]/30 p-2 sm:p-2.5 rounded-xl">
            <div className="font-serif font-black text-lg sm:text-3xl text-white">{timeLeft.minutes}</div>
            <div className="text-[7px] sm:text-[9px] text-[#9CA3AF] tracking-widest uppercase">MINS</div>
          </div>
          <div className="bg-[#071B36]/80 border border-[#D4AF5A]/30 p-2 sm:p-2.5 rounded-xl">
            <div className="font-serif font-black text-lg sm:text-3xl text-[#E6C878]">{timeLeft.seconds}</div>
            <div className="text-[7px] sm:text-[9px] text-[#9CA3AF] tracking-widest uppercase">SECS</div>
          </div>
        </div>

        {/* Primary & Secondary Call To Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-none">
          <Button
            href="/checkout"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto h-11 sm:h-12 px-8 text-xs font-black shadow-[0_0_30px_rgba(212,175,90,0.35)]"
            icon={<ArrowUpRight className="w-4 h-4 text-[#070A0F]" />}
          >
            GET TICKETS
          </Button>

          <Button
            href="#about"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto h-11 sm:h-12 px-8 text-xs font-bold"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#about');
            }}
          >
            EXPLORE EVENT
          </Button>
        </div>

        {/* Smooth Scroll Down Indicator */}
        <button
          onClick={() => scrollTo('#about')}
          className="mt-10 group flex flex-col items-center gap-1.5 text-[#D4AF5A] hover:text-[#E6C878] transition-colors focus:outline-none"
          aria-label="Scroll down to content"
        >
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">SCROLL TO DISCOVER</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>

      </div>
    </section>
  );
}
