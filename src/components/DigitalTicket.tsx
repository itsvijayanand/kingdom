'use client';

import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import KingdomLogo from '@/components/KingdomLogo';
import { Button } from '@/components/Button';
import { TicketItem } from '@/lib/types';
import { Download, Printer, ShieldCheck, Calendar, MapPin, Ticket, User, CheckCircle2, AlertCircle } from 'lucide-react';

interface DigitalTicketProps {
  ticket: TicketItem;
  event: {
    title: string;
    artist_name: string;
    event_date: string;
    venue_name: string;
    city: string;
  };
}

export default function DigitalTicket({ ticket, event }: DigitalTicketProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current && ticket.secure_token) {
      QRCode.toCanvas(canvasRef.current, ticket.secure_token, {
        width: 180,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }, (err) => {
        if (err) console.error('QR Render Error:', err);
      });
    }
  }, [ticket]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-xl mx-auto font-sans text-[#E8E8E5]">
      
      {/* Royal VIP Pass Container */}
      <div className="bg-[#071B36] border-2 border-[#D4AF5A] shadow-2xl relative overflow-hidden gold-border-glow-strong">
        
        {/* Top Kingdom Header Banner */}
        <div className="bg-[#070A0F] border-b border-[#D4AF5A]/30 px-6 py-6 flex flex-col items-center justify-center text-center space-y-2">
          <KingdomLogo size="sm" showLink={false} />
          <span className="font-serif text-[10px] text-[#E6C878] tracking-[0.3em] uppercase font-bold">
            ROYAL VIP ADMISSION PASS
          </span>
        </div>

        {/* Ticket Content Body */}
        <div className="p-6 space-y-6">
          
          {/* Main Titles */}
          <div className="border-b border-[#D4AF5A]/20 pb-4 text-center sm:text-left">
            <span className="text-[10px] tracking-[0.25em] text-[#D4AF5A] font-bold uppercase block">HEADLINE CONCERT</span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-white uppercase tracking-wider gold-gradient-text mt-0.5">
              {event.artist_name}
            </h2>
            <p className="text-xs text-[#E6C878] font-bold tracking-widest uppercase mt-1">
              {event.title}
            </p>
          </div>

          {/* Grid Metadata */}
          <div className="grid grid-cols-2 gap-4 text-xs border-b border-[#D4AF5A]/20 pb-4 font-mono">
            <div>
              <span className="text-[10px] text-[#9CA3AF] flex items-center gap-1 uppercase">
                <User className="w-3 h-3 text-[#D4AF5A]" /> PASS HOLDER
              </span>
              <div className="font-bold text-white text-sm mt-0.5">{ticket.customer_name}</div>
            </div>

            <div>
              <span className="text-[10px] text-[#9CA3AF] flex items-center gap-1 uppercase">
                <Ticket className="w-3 h-3 text-[#D4AF5A]" /> TICKET NO.
              </span>
              <div className="font-bold text-[#E6C878] text-sm mt-0.5">{ticket.ticket_number}</div>
            </div>

            <div>
              <span className="text-[10px] text-[#9CA3AF] flex items-center gap-1 uppercase">
                <Calendar className="w-3 h-3 text-[#D4AF5A]" /> DATE & TIME
              </span>
              <div className="font-bold text-zinc-200 mt-0.5">OCTOBER 31, 2026 • 8:00 PM</div>
            </div>

            <div>
              <span className="text-[10px] text-[#9CA3AF] flex items-center gap-1 uppercase">
                <MapPin className="w-3 h-3 text-[#D4AF5A]" /> LOCATION
              </span>
              <div className="font-bold text-zinc-200 mt-0.5">{event.venue_name}, {event.city}</div>
            </div>
          </div>

          {/* Protected Clean QR Code Container */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-5 bg-[#070A0F] border border-[#D4AF5A]/30">
            <div className="flex flex-col items-center">
              {/* High Contrast Clean White Background for 100% Scan Reliability */}
              <div className="p-2 bg-white rounded-sm shadow-md">
                <canvas ref={canvasRef} className="block" />
              </div>
              <span className="text-[9px] text-[#9CA3AF] mt-2 font-mono tracking-widest uppercase">
                CRYPTOGRAPHIC TOKEN
              </span>
            </div>

            <div className="space-y-3 text-center sm:text-left font-mono">
              <div>
                <span className="text-[10px] text-[#9CA3AF] uppercase">GATE ENTRY STATUS</span>
                <div className="mt-1 flex items-center justify-center sm:justify-start gap-1.5 font-bold text-xs">
                  {ticket.status === 'VALID' && (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> ENTRY APPROVED (VALID)
                    </span>
                  )}
                  {ticket.status === 'USED' && (
                    <span className="text-[#FF4A00] flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> ALREADY SCANNED AT GATE
                    </span>
                  )}
                  {ticket.status !== 'VALID' && ticket.status !== 'USED' && (
                    <span className="text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> STATUS: {ticket.status}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-[11px] text-[#9CA3AF]">
                Present this QR code to the Kingdom gate staff scanner upon entry.
              </div>
            </div>
          </div>

          {/* Footer Security Note */}
          <div className="flex items-center justify-between text-[10px] text-[#9CA3AF] pt-2 border-t border-[#D4AF5A]/15 font-mono">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> HMAC SIGNED KINGDOM SECURE PASS
            </span>
            <span>TOKEN: {ticket.secure_token.substring(0, 18)}...</span>
          </div>

        </div>

        {/* Decorative Ticket Gold Barcode Line */}
        <div className="h-4 bg-[#070A0F] flex items-center justify-around px-2 overflow-hidden border-t border-[#D4AF5A]/30">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className={`h-full ${i % 2 === 0 ? 'w-1 bg-[#071B36]' : 'w-0.5 bg-[#D4AF5A]'}`} />
          ))}
        </div>

      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <Button
          onClick={handlePrint}
          variant="secondary"
          size="md"
          icon={<Printer className="w-4 h-4 text-[#D4AF5A]" />}
          iconPosition="left"
        >
          PRINT PASS
        </Button>

        <Button
          onClick={() => alert(`Pass token: ${ticket.secure_token}`)}
          variant="primary"
          size="md"
          icon={<Download className="w-4 h-4 text-[#070A0F]" />}
          iconPosition="left"
        >
          SAVE DIGITAL PASS
        </Button>
      </div>

    </div>
  );
}
