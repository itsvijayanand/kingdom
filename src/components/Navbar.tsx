'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import KingdomLogo from '@/components/KingdomLogo';
import { Button } from '@/components/Button';
import { Ticket, Plane, Train, Bus, Film, QrCode, ShieldAlert, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (targetId: string) => {
    setMobileOpen(false);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
      <div className={`max-w-[1550px] mx-auto rounded-full border transition-all duration-300 px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4 shadow-2xl pointer-events-auto ${
        scrolled 
          ? 'bg-[#070A0F]/85 backdrop-blur-xl border-[#D4AF5A]/40 gold-border-glow' 
          : 'bg-[#070A0F]/45 backdrop-blur-md border-[#D4AF5A]/25 hover:border-[#D4AF5A]/40'
      }`}>
        
        {/* Kingdom Official Brand Emblem */}
        <div className="shrink-0 flex items-center">
          <KingdomLogo size="sm" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 font-sans text-[11px] font-bold tracking-[0.15em] text-[#E8E8E5] uppercase">
          <a href="#featured" onClick={(e) => { e.preventDefault(); handleNavClick('featured'); }} className="hover:text-[#D4AF5A] transition-colors flex items-center gap-1.5">
            <Ticket className="w-3.5 h-3.5 text-[#D4AF5A]" /> EVENTS
          </a>
          <a href="#travel" onClick={(e) => { e.preventDefault(); handleNavClick('travel'); }} className="hover:text-[#D4AF5A] transition-colors flex items-center gap-1.5">
            <Plane className="w-3.5 h-3.5 text-[#D4AF5A]" /> FLIGHTS
          </a>
          <a href="#travel" onClick={(e) => { e.preventDefault(); handleNavClick('travel'); }} className="hover:text-[#D4AF5A] transition-colors flex items-center gap-1.5">
            <Train className="w-3.5 h-3.5 text-[#D4AF5A]" /> TRAINS
          </a>
          <a href="#travel" onClick={(e) => { e.preventDefault(); handleNavClick('travel'); }} className="hover:text-[#D4AF5A] transition-colors flex items-center gap-1.5">
            <Bus className="w-3.5 h-3.5 text-[#D4AF5A]" /> BUSES
          </a>
          <a href="#movies" onClick={(e) => { e.preventDefault(); handleNavClick('movies'); }} className="hover:text-[#D4AF5A] transition-colors flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5 text-[#D4AF5A]" /> MOVIES
          </a>
          <a href="#your-bookings" onClick={(e) => { e.preventDefault(); handleNavClick('your-bookings'); }} className="hover:text-[#D4AF5A] transition-colors">
            MY BOOKINGS
          </a>
        </nav>

        {/* Header Right Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            href="/my-ticket"
            variant="secondary"
            size="sm"
            className="h-8 px-3 text-[10px] font-bold border-[#D4AF5A]/25 bg-[#071B36]/50"
            icon={<Ticket className="w-3 h-3 text-[#D4AF5A]" />}
            iconPosition="left"
          >
            MY PASS
          </Button>

          <Button
            href="/staff"
            variant="secondary"
            size="sm"
            className="h-8 px-3 text-[10px] font-bold border-[#D4AF5A]/25 bg-[#071B36]/50"
            icon={<QrCode className="w-3 h-3 text-emerald-400" />}
            iconPosition="left"
          >
            STAFF SCANNER
          </Button>

          <Button
            href="/admin"
            variant="secondary"
            size="sm"
            className="h-8 px-3 text-[10px] font-bold border-[#D4AF5A]/25 bg-[#071B36]/50"
            icon={<ShieldAlert className="w-3 h-3 text-[#D4AF5A]" />}
            iconPosition="left"
          >
            ADMIN HUB
          </Button>

          <Button
            href="/checkout"
            variant="primary"
            size="sm"
            className="h-8 px-4 text-[11px] font-black"
            icon={<ArrowUpRight className="w-3.5 h-3.5 text-[#070A0F]" />}
            iconPosition="right"
          >
            GET TICKETS
          </Button>
        </div>

        {/* Mobile Actions & Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            href="/checkout"
            variant="primary"
            size="sm"
            className="h-8 px-3 text-[10px] font-black"
            icon={<ArrowUpRight className="w-3.5 h-3.5 text-[#070A0F]" />}
          >
            TICKETS
          </Button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-[#D4AF5A] hover:text-white p-1.5 rounded-full hover:bg-white/5 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="w-6 h-6 text-[#D4AF5A]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden max-w-[1550px] mx-auto mt-2 rounded-2xl bg-[#070A0F]/95 backdrop-blur-xl border border-[#D4AF5A]/30 px-6 py-6 flex flex-col gap-3 font-sans text-xs tracking-[0.15em] uppercase shadow-2xl animate-fadeIn pointer-events-auto">
          <a href="#featured" onClick={(e) => { e.preventDefault(); handleNavClick('featured'); }} className="text-white hover:text-[#D4AF5A] py-1 transition-colors flex items-center gap-2">
            <Ticket className="w-4 h-4 text-[#D4AF5A]" /> EVENTS & CONCERTS
          </a>
          <a href="#travel" onClick={(e) => { e.preventDefault(); handleNavClick('travel'); }} className="text-white hover:text-[#D4AF5A] py-1 transition-colors flex items-center gap-2">
            <Plane className="w-4 h-4 text-[#D4AF5A]" /> FLIGHTS
          </a>
          <a href="#travel" onClick={(e) => { e.preventDefault(); handleNavClick('travel'); }} className="text-white hover:text-[#D4AF5A] py-1 transition-colors flex items-center gap-2">
            <Train className="w-4 h-4 text-[#D4AF5A]" /> TRAINS
          </a>
          <a href="#travel" onClick={(e) => { e.preventDefault(); handleNavClick('travel'); }} className="text-white hover:text-[#D4AF5A] py-1 transition-colors flex items-center gap-2">
            <Bus className="w-4 h-4 text-[#D4AF5A]" /> BUSES
          </a>
          <a href="#movies" onClick={(e) => { e.preventDefault(); handleNavClick('movies'); }} className="text-white hover:text-[#D4AF5A] py-1 transition-colors flex items-center gap-2">
            <Film className="w-4 h-4 text-[#D4AF5A]" /> MOVIES & CINEMAS
          </a>
          <a href="#your-bookings" onClick={(e) => { e.preventDefault(); handleNavClick('your-bookings'); }} className="text-white hover:text-[#D4AF5A] py-1 transition-colors flex items-center gap-2">
            <Ticket className="w-4 h-4 text-[#D4AF5A]" /> MY BOOKINGS
          </a>

          <div className="pt-4 border-t border-[#D4AF5A]/20 flex flex-col gap-3 font-mono">
            <Link href="/my-ticket" onClick={() => setMobileOpen(false)} className="text-[#E8E8E5] flex items-center gap-2 py-1 hover:text-[#D4AF5A]">
              <Ticket className="w-4 h-4 text-[#D4AF5A]" /> MY PASS PORTAL
            </Link>
            <Link href="/staff" onClick={() => setMobileOpen(false)} className="text-emerald-400 flex items-center gap-2 py-1 hover:text-emerald-300">
              <QrCode className="w-4 h-4 text-emerald-400" /> STAFF SCANNER PWA
            </Link>
            <Link href="/admin" onClick={() => setMobileOpen(false)} className="text-[#D4AF5A] flex items-center gap-2 py-1 hover:text-white">
              <ShieldAlert className="w-4 h-4 text-[#D4AF5A]" /> ADMIN CONTROL CENTER
            </Link>
            <div className="pt-2">
              <Button
                href="/checkout"
                onClick={() => setMobileOpen(false)}
                variant="primary"
                fullWidth
                size="md"
                icon={<ArrowUpRight className="w-4 h-4 text-[#070A0F]" />}
              >
                GET TICKETS NOW
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

