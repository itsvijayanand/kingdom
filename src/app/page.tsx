import React from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import UnifiedSearchBar from '@/components/UnifiedSearchBar';
import FeaturedExperiencesSection from '@/components/FeaturedExperiencesSection';
import TravelSection from '@/components/TravelSection';
import MoviesSection from '@/components/MoviesSection';
import YourBookingsSection from '@/components/YourBookingsSection';
import TicketSelector from '@/components/TicketSelector';
import KingdomLogo from '@/components/KingdomLogo';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/Button';
import { ArrowUpRight, Crown, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-16 bg-[#070A0F] text-[#E8E8E5] font-sans overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <HeroSection />

      {/* 2. UNIVERSAL FINDER: "WHAT ARE YOU LOOKING FOR?" */}
      <UnifiedSearchBar />

      {/* 3. FEATURED EXPERIENCES (Concerts / Events / Shows) */}
      <FeaturedExperiencesSection />

      {/* 4. TRAVEL (Flights | Trains | Buses) */}
      <TravelSection />

      {/* 5. MOVIES (Movies | Cinemas | Showtimes) */}
      <MoviesSection />

      {/* 6. YOUR BOOKINGS (Flights | Train tickets | Bus tickets | Movie tickets | Event tickets) */}
      <YourBookingsSection />

      {/* 7. ABOUT KINGDOM EVENTS & ENTERTAINMENT */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24">
        <ScrollReveal variant="fade-up" duration={800}>
          <div className="bg-[#071B36]/60 border border-[#D4AF5A]/30 p-8 lg:p-14 relative overflow-hidden gold-border-glow rounded-3xl">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
                <KingdomLogo size="lg" showLink={false} />
                <span className="text-xs text-[#D4AF5A] font-bold tracking-[0.25em] uppercase font-mono">
                  // UNIFIED ENTERTAINMENT & TRAVEL PLATFORM
                </span>
              </div>

              <div className="lg:col-span-7 space-y-6 text-sm text-[#9CA3AF] leading-relaxed">
                <h2 className="font-serif font-black text-3xl sm:text-4xl text-white uppercase tracking-wider">
                  CREATING <span className="gold-gradient-text">UNFORGETTABLE</span> MOMENTS
                </h2>
                <p>
                  Celestia Booking powers world-class live concerts, premier cinema box office tickets, luxury travel flights, express trains, and intercity sleeper buses. Engineered with uncompromised fidelity, dynamic 2D seat selection, and cryptographic HMAC QR security.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-xs">
                  <div className="p-4 bg-[#070A0F] border border-[#D4AF5A]/20 rounded-2xl">
                    <div className="font-serif font-extrabold text-2xl text-white">500,000+</div>
                    <div className="text-[#9CA3AF] text-[10px] tracking-widest uppercase">TICKETS & PASSES ISSUED</div>
                  </div>
                  <div className="p-4 bg-[#070A0F] border border-[#D4AF5A]/20 rounded-2xl">
                    <div className="font-serif font-extrabold text-2xl text-[#E6C878]">100%</div>
                    <div className="text-[#9CA3AF] text-[10px] tracking-widest uppercase">HMAC QR VERIFICATION INTEGRITY</div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* 8. FEATURED HEADLINER BANNER */}
      <section id="concert-headliner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 scroll-mt-24">
        <ScrollReveal variant="scale-up" duration={900}>
          <div className="relative bg-[#071B36] border border-[#D4AF5A]/40 overflow-hidden shadow-2xl rounded-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              <div className="lg:col-span-7 p-8 lg:p-12 space-y-6 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#070A0F] border border-[#D4AF5A]/40 text-[#E6C878] text-xs uppercase tracking-[0.2em] w-fit font-mono rounded-full">
                  <Crown className="w-3.5 h-3.5 text-[#D4AF5A]" /> FEATURED WORLD TOUR
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
                    SECURE CONCERT TICKETS NOW
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
        </ScrollReveal>
      </section>

      {/* 9. TICKET TIER SELECTION DECK */}
      <section id="tickets" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 scroll-mt-24">
        <ScrollReveal variant="fade-up">
          <TicketSelector />
        </ScrollReveal>
      </section>

      {/* 10. VENUE & ACCESS PORTALS */}
      <section id="venue" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-12">
            <span className="text-xs text-[#D4AF5A] font-bold tracking-[0.25em] uppercase font-mono">// ARENA ACCESS & MAPS</span>
            <h2 className="font-serif font-black text-4xl sm:text-6xl text-white tracking-wider uppercase mt-1">
              CYBERDOME <span className="gold-gradient-text">ARENA</span>
            </h2>
            <p className="text-[#9CA3AF] text-xs mt-2 uppercase font-mono">
              Gate 4, BKC Complex, Bandra East, Mumbai • 5 Fast-Track Access Portals
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans">
          <ScrollReveal variant="slide-right" delay={100}>
            <div className="p-6 bg-[#071B36] border border-[#D4AF5A]/25 space-y-2 h-full rounded-2xl">
              <div className="text-[#D4AF5A] font-bold text-sm font-mono">GATE 1 & GATE 2</div>
              <div className="text-white font-serif font-bold text-base">NORTH & SOUTH GA PORTAL</div>
              <p className="text-[#9CA3AF]">Dedicated for Regular GA & Early Access pass holders with 8 scanning channels.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200}>
            <div className="p-6 bg-[#071B36] border border-[#D4AF5A]/25 space-y-2 h-full rounded-2xl">
              <div className="text-emerald-400 font-bold text-sm font-mono">VIP PORTAL</div>
              <div className="text-white font-serif font-bold text-base">RED CARPET WEST PAVILION</div>
              <p className="text-[#9CA3AF]">Fast-track VIP entrance with welcome beverage & elevated seating access.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slide-left" delay={300}>
            <div className="p-6 bg-[#071B36] border border-[#D4AF5A]/25 space-y-2 h-full rounded-2xl">
              <div className="text-[#E6C878] font-bold text-sm font-mono">BACKSTAGE PORTAL</div>
              <div className="text-white font-serif font-bold text-base">ARTIST & HOSPITALITY WING</div>
              <p className="text-[#9CA3AF]">Restricted security scan portal for All-Access Backstage pass holders.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
