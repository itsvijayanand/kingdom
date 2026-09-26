import React from 'react';
import { Button } from '@/components/Button';
import { Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function ArtistPage() {
  return (
    <div className="pt-28 pb-20 bg-[#070A0F] min-h-screen text-[#E8E8E5] font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <ScrollReveal variant="fade-up">
          <div className="text-center space-y-3">
            <span className="text-xs text-[#D4AF5A] tracking-[0.2em] font-mono uppercase">HEADLINE ARTIST SPOTLIGHT</span>
            <h1 className="font-serif font-black text-4xl sm:text-6xl text-white tracking-wider uppercase">
              VEX & THE <span className="gold-gradient-text">SYNTH SYNDICATE</span>
            </h1>
            <p className="text-xs text-[#9CA3AF] max-w-2xl mx-auto">
              Pioneering industrial darkwave electro acoustic collective based in Berlin & London.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <ScrollReveal variant="slide-right" delay={100}>
            <img
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop"
              alt="Artist Spotlight"
              className="w-full h-80 object-cover border border-[#D4AF5A]/30 rounded-2xl filter grayscale contrast-125"
            />
          </ScrollReveal>

          <ScrollReveal variant="slide-left" delay={200}>
            <div className="space-y-4 text-xs font-sans">
              <h2 className="font-serif font-bold text-2xl text-white uppercase">ANALOG SOUNDSCAPES</h2>
              <p className="text-[#9CA3AF] leading-relaxed">
                Formed in 2021, Vex & The Synth Syndicate revolutionized live electronic performances by abandoning digital playback laptops in favor of raw wall-sized analog modular synthesizers and acoustic live drums.
              </p>
              <div className="p-4 bg-[#071B36]/60 border border-[#D4AF5A]/30 space-y-1 rounded-xl">
                <div className="text-white font-bold text-sm font-serif">DISCOGRAPHY HIGHLIGHTS:</div>
                <div className="text-[#9CA3AF]">• Nocturne Velocity LP (2025) — #1 Electronic Chart</div>
                <div className="text-[#9CA3AF]">• Cybernetic Pulse (2024) — Platinum Single</div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="scale-up" delay={300}>
          <div className="text-center pt-6">
            <Button
              href="/tickets"
              variant="primary"
              size="lg"
              icon={<Sparkles className="w-4 h-4 text-[#070A0F]" />}
            >
              SECURE YOUR PASS FOR THE SHOW
            </Button>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
