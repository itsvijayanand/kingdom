'use client';

import React from 'react';
import { Button } from '@/components/Button';
import { Calendar, MapPin, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export default function EventInfoPage() {
  return (
    <div className="pt-28 pb-20 bg-[#070A0F] min-h-screen text-[#E8E8E5] font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs text-[#D4AF5A] tracking-[0.2em] font-mono uppercase">CONCERT INFORMATION</span>
          <h1 className="font-serif font-black text-4xl sm:text-6xl text-white tracking-wider uppercase">
            NOCTURNE VELOCITY <span className="gold-gradient-text">LIVE 2026</span>
          </h1>
          <p className="text-xs text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
            Full production timeline, doors opening schedule, arena entrance security, and emergency safety guidelines for Nocturne Velocity 2026.
          </p>
        </div>

        {/* Schedule Timeline Grid */}
        <div className="bg-[#071B36]/60 border border-[#D4AF5A]/30 p-8 space-y-6 rounded-2xl">
          <h2 className="font-serif font-bold text-2xl text-white tracking-wider uppercase border-b border-[#D4AF5A]/20 pb-4">
            EVENT DAY SCHEDULE — OCTOBER 31, 2026
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-[#070A0F] border border-[#D4AF5A]/20 flex items-center justify-between rounded-xl">
              <div>
                <span className="text-xs text-[#E6C878] font-bold font-mono">06:00 PM</span>
                <div className="font-bold text-white text-base">OUTSIDE BOX OFFICE & GATES OPEN</div>
                <p className="text-xs text-[#9CA3AF]">Security screening begins across Gate 1, 2, 3, VIP & Backstage.</p>
              </div>
              <span className="text-[10px] px-3 py-1 bg-[#071B36] text-[#E8E8E5] rounded-full border border-[#D4AF5A]/30 font-mono">GATES ONLINE</span>
            </div>

            <div className="p-4 bg-[#070A0F] border border-[#D4AF5A]/20 flex items-center justify-between rounded-xl">
              <div>
                <span className="text-xs text-[#E6C878] font-bold font-mono">07:30 PM</span>
                <div className="font-bold text-white text-base">SUPPORTING INDUSTRIAL DJ SET</div>
                <p className="text-xs text-[#9CA3AF]">Opening warm-up set by Berlin synth collective.</p>
              </div>
              <span className="text-[10px] px-3 py-1 bg-[#071B36] text-[#E8E8E5] rounded-full border border-[#D4AF5A]/30 font-mono">WARM UP</span>
            </div>

            <div className="p-4 bg-[#070A0F] border border-[#D4AF5A]/40 flex items-center justify-between border-l-4 border-l-[#D4AF5A] rounded-xl">
              <div>
                <span className="text-xs text-[#D4AF5A] font-bold font-mono">09:00 PM</span>
                <div className="font-bold text-white text-base">HEADLINER: VEX & THE SYNTH SYNDICATE</div>
                <p className="text-xs text-[#9CA3AF]">Main 2.5 hour headline performance with 360° laser staging.</p>
              </div>
              <span className="text-[10px] px-3 py-1 gold-gradient-bg text-[#070A0F] font-black rounded-full uppercase tracking-wider font-mono">MAIN EVENT</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Button
            href="/checkout"
            variant="primary"
            size="lg"
            icon={<Sparkles className="w-4 h-4 text-[#070A0F]" />}
          >
            BOOK YOUR TICKETS
          </Button>
        </div>

      </div>
    </div>
  );
}
