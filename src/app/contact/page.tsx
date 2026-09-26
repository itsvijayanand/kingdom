'use client';

import React from 'react';
import { Button } from '@/components/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 bg-[#070A0F] min-h-screen text-[#E8E8E5] font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center space-y-2">
          <span className="text-xs text-[#D4AF5A] tracking-[0.2em] font-mono uppercase">CONCERT SUPPORT</span>
          <h1 className="font-serif font-black text-4xl text-white tracking-wider uppercase">
            GET IN <span className="gold-gradient-text">TOUCH</span>
          </h1>
          <p className="text-xs text-[#9CA3AF]">
            For corporate bookings, VIP lounge reservations, or ticket recovery assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#071B36]/60 border border-[#D4AF5A]/30 p-6 space-y-4 text-xs rounded-2xl">
            <h2 className="font-serif font-bold text-lg text-white uppercase">OFFICIAL DESK</h2>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#D4AF5A]" />
              <span>support@ahuja-concert.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#D4AF5A]" />
              <span>+91 (022) 8800-2026 (Mon-Sat 10am - 8pm)</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#D4AF5A]" />
              <span>Cyberdome Arena Office, Gate 4, BKC, Mumbai</span>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('Message sent to production support team.'); }} className="bg-[#071B36]/60 border border-[#D4AF5A]/30 p-6 space-y-4 text-xs rounded-2xl">
            <div>
              <label className="block text-[#9CA3AF] mb-1 font-mono">YOUR NAME:</label>
              <input type="text" required placeholder="Full Name" className="w-full bg-[#070A0F] border border-[#D4AF5A]/30 text-white px-3 py-2.5 rounded-lg focus:border-[#D4AF5A] focus:outline-none" />
            </div>

            <div>
              <label className="block text-[#9CA3AF] mb-1 font-mono">EMAIL ADDRESS:</label>
              <input type="email" required placeholder="email@domain.com" className="w-full bg-[#070A0F] border border-[#D4AF5A]/30 text-white px-3 py-2.5 rounded-lg focus:border-[#D4AF5A] focus:outline-none" />
            </div>

            <div>
              <label className="block text-[#9CA3AF] mb-1 font-mono">MESSAGE:</label>
              <textarea rows={3} required placeholder="How can we assist you?" className="w-full bg-[#070A0F] border border-[#D4AF5A]/30 text-white px-3 py-2.5 rounded-lg focus:border-[#D4AF5A] focus:outline-none" />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              icon={<Send className="w-4 h-4 text-[#070A0F]" />}
            >
              SEND INQUIRY
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}
