'use client';

import React from 'react';
import Link from 'next/link';
import KingdomLogo from '@/components/KingdomLogo';
import { Lock, Shield, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#070A0F] border-t border-[#D4AF5A]/25 relative overflow-hidden text-[#9CA3AF] font-sans text-xs">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF5A] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Large Official Kingdom Logo Branding Header */}
        <div className="border-b border-[#D4AF5A]/20 pb-12 mb-12 text-center flex flex-col items-center">
          <KingdomLogo size="lg" />
          <p className="text-[#E6C878] font-serif text-sm tracking-[0.25em] uppercase mt-4">
            ROYAL LUXURY MEETS MODERN LIVE ENTERTAINMENT
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: About Kingdom */}
          <div className="space-y-4">
            <h3 className="text-[#E8E8E5] font-serif font-bold tracking-[0.2em] uppercase text-sm border-l-2 border-[#D4AF5A] pl-2.5">
              ABOUT KINGDOM
            </h3>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Kingdom Events and Entertainment creates premium live experiences, high-profile concerts, and exclusive entertainment events across international arenas.
            </p>
            <div className="flex items-center gap-4 text-[10px] text-[#9CA3AF] pt-1 font-mono">
              <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-[#D4AF5A]" /> 256-BIT SSL</span>
              <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-[#D4AF5A]" /> HMAC SECURED</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-[#E8E8E5] font-serif font-bold tracking-[0.2em] uppercase text-sm border-l-2 border-[#D4AF5A] pl-2.5">
              NAVIGATION
            </h3>
            <ul className="space-y-2 uppercase tracking-wider text-xs">
              <li><Link href="/" className="hover:text-[#D4AF5A] transition-colors">HOME ARCHIVE</Link></li>
              <li><Link href="/event" className="hover:text-[#D4AF5A] transition-colors">CONCERT EVENT</Link></li>
              <li><Link href="/artist" className="hover:text-[#D4AF5A] transition-colors">ARTIST SHOWCASE</Link></li>
              <li><Link href="/tickets" className="hover:text-[#D4AF5A] transition-colors">TICKET DECK</Link></li>
              <li><Link href="/venue" className="hover:text-[#D4AF5A] transition-colors">CYBERDOME ARENA MAP</Link></li>
              <li><Link href="/faq" className="hover:text-[#D4AF5A] transition-colors">SECURITY & GATE FAQ</Link></li>
            </ul>
          </div>

          {/* Col 3: Portal & Legal */}
          <div className="space-y-3">
            <h3 className="text-[#E8E8E5] font-serif font-bold tracking-[0.2em] uppercase text-sm border-l-2 border-[#D4AF5A] pl-2.5">
              PORTALS & LEGAL
            </h3>
            <ul className="space-y-2 uppercase tracking-wider text-xs">
              <li><Link href="/my-ticket" className="hover:text-[#D4AF5A] transition-colors">CUSTOMER PASS PORTAL</Link></li>
              <li><Link href="/staff" className="hover:text-[#D4AF5A] transition-colors">STAFF SCANNER PWA</Link></li>
              <li><Link href="/admin" className="hover:text-[#D4AF5A] transition-colors">ADMIN CONTROL HUB</Link></li>
              <li><Link href="/terms" className="hover:text-[#D4AF5A] transition-colors">TERMS OF SERVICE</Link></li>
              <li><Link href="/privacy" className="hover:text-[#D4AF5A] transition-colors">PRIVACY POLICY</Link></li>
              <li><Link href="/refund-policy" className="hover:text-[#D4AF5A] transition-colors">REFUND POLICY</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h3 className="text-[#E8E8E5] font-serif font-bold tracking-[0.2em] uppercase text-sm border-l-2 border-[#D4AF5A] pl-2.5">
              KINGDOM DISPATCH
            </h3>
            <p className="text-[#9CA3AF] text-xs leading-relaxed">
              Subscribe for private pre-sale announcements, artist meet-and-greet releases, and royal VIP deck access.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Kingdom Events dispatch.'); }} className="flex flex-col sm:flex-row gap-2 pt-1">
              <input
                type="email"
                placeholder="Enter email address..."
                required
                className="w-full bg-[#071B36] border border-[#D4AF5A]/30 text-white px-4 py-2.5 text-xs rounded-full focus:border-[#D4AF5A] focus:outline-none"
              />
              <button
                type="submit"
                className="gold-gradient-bg text-[#070A0F] font-bold px-5 py-2.5 rounded-full hover:brightness-110 transition-all flex items-center justify-center shrink-0 gold-border-glow text-xs"
              >
                SUBSCRIBE <ArrowUpRight className="w-4 h-4 text-[#070A0F] ml-1" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Editorial Bar */}
        <div className="mt-14 pt-8 border-t border-[#D4AF5A]/15 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#9CA3AF] gap-4">
          <p>© 2026 KINGDOM EVENTS AND ENTERTAINMENT. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6 font-mono">
            <span>DOMAIN: www.ahuja-concert.com</span>
            <span>SYSTEM STATUS: OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
