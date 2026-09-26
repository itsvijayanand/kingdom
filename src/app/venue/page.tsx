'use client';

import React from 'react';
import { Button } from '@/components/Button';
import { MapPin, Shield, Sparkles } from 'lucide-react';

export default function VenuePage() {
  return (
    <div className="pt-28 pb-20 bg-[#070A0F] min-h-screen text-[#E8E8E5] font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3">
          <span className="text-xs text-[#D4AF5A] tracking-[0.2em] font-mono uppercase">VENUE & GATE DIRECTIONS</span>
          <h1 className="font-serif font-black text-4xl sm:text-6xl text-white tracking-wider uppercase">
            CYBERDOME <span className="gold-gradient-text">ARENA</span>
          </h1>
          <p className="text-xs text-[#9CA3AF] max-w-2xl mx-auto">
            BKC Complex, Bandra East, Mumbai • Premier 5,000+ Capacity Live Music Dome
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#071B36]/60 border border-[#D4AF5A]/30 p-6 space-y-4 rounded-2xl">
            <h2 className="font-serif font-bold text-xl text-white uppercase flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#D4AF5A]" /> ARENA LOCATION
            </h2>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Located in the heart of Mumbai’s commercial hub, Cyberdome Arena offers seamless connectivity via Eastern Express Highway, Western Express Highway, and BKC Metro Line.
            </p>
            <div className="p-4 bg-[#070A0F] border border-[#D4AF5A]/20 text-xs space-y-1 rounded-xl">
              <div className="text-white font-bold">ADDRESS FOR CAB / NAVIGATION:</div>
              <div className="text-[#9CA3AF]">Cyberdome Arena, Gate 4, BKC Complex, Bandra East, Mumbai, Maharashtra 400051</div>
            </div>
          </div>

          <div className="bg-[#071B36]/60 border border-[#D4AF5A]/30 p-6 space-y-4 rounded-2xl">
            <h2 className="font-serif font-bold text-xl text-white uppercase flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" /> ENTRANCE GATE POLICIES
            </h2>
            <ul className="text-xs text-[#9CA3AF] space-y-2 list-disc pl-4">
              <li>Have your digital QR pass ready on your smartphone screen.</li>
              <li>Government issued photo ID matching customer name required.</li>
              <li>No outside food, liquids, professional DSLR zoom cameras, or sharp objects.</li>
              <li>Strict no re-entry policy once ticket is scanned USED at gate.</li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-4">
          <Button
            href="/checkout"
            variant="primary"
            size="lg"
            icon={<Sparkles className="w-4 h-4 text-[#070A0F]" />}
          >
            SECURE YOUR TICKETS
          </Button>
        </div>

      </div>
    </div>
  );
}
