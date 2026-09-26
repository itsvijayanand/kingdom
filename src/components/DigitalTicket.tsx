'use client';

import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import KingdomLogo from '@/components/KingdomLogo';
import { Button } from '@/components/Button';
import { TicketItem } from '@/lib/types';
import { Download, Printer, ShieldCheck, Calendar, MapPin, Ticket, User, CheckCircle2, AlertCircle, Smartphone } from 'lucide-react';

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
        width: 160,
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
    <div className="w-full max-w-sm sm:max-w-md mx-auto font-sans text-[#E8E8E5] px-2 sm:px-0">
      
      {/* Smartphone Device Frame Mockup Container */}
      <div className="relative mx-auto bg-[#070A0F] border-[6px] sm:border-[8px] border-[#121B2A] rounded-[42px] sm:rounded-[50px] shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden gold-border-glow-strong transition-all duration-300">
        
        {/* Phone Top Speaker & Dynamic Island Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-2">
          <div className="w-20 sm:w-28 h-4 sm:h-5 bg-black rounded-full border border-zinc-800 flex items-center justify-end px-3">
            <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-zinc-900 border border-zinc-700 rounded-full" />
          </div>
        </div>

        {/* Inner Phone Screen */}
        <div className="bg-[#071B36] pt-8 pb-4 relative overflow-hidden flex flex-col justify-between min-h-[560px] sm:min-h-[640px]">
          
          {/* Top Kingdom Header Banner */}
          <div className="bg-[#070A0F]/90 border-b border-[#D4AF5A]/30 px-4 sm:px-6 pt-4 pb-3 flex flex-col items-center justify-center text-center space-y-1 backdrop-blur-md">
            <KingdomLogo size="sm" showLink={false} />
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#071B36] border border-[#D4AF5A]/30 rounded-full">
              <Smartphone className="w-3 h-3 text-[#D4AF5A]" />
              <span className="font-serif text-[9px] sm:text-[10px] text-[#E6C878] tracking-[0.2em] uppercase font-bold">
                PASS PASSBOOK WALLET
              </span>
            </div>
          </div>

          {/* Ticket Content Body */}
          <div className="p-4 sm:p-6 space-y-5 flex-1 flex flex-col justify-between">
            
            {/* Main Titles */}
            <div className="border-b border-[#D4AF5A]/20 pb-3 text-center">
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#D4AF5A] font-bold uppercase block">// HEADLINE CONCERT</span>
              <h2 className="font-serif font-black text-2xl sm:text-3xl text-white uppercase tracking-wider gold-gradient-text mt-0.5 leading-tight">
                {event.artist_name}
              </h2>
              <p className="text-[11px] sm:text-xs text-[#E6C878] font-bold tracking-widest uppercase mt-1">
                {event.title}
              </p>
            </div>

            {/* Grid Metadata */}
            <div className="grid grid-cols-2 gap-3 text-xs border-b border-[#D4AF5A]/20 pb-3 font-mono">
              <div>
                <span className="text-[9px] sm:text-[10px] text-[#9CA3AF] flex items-center gap-1 uppercase truncate">
                  <User className="w-3 h-3 text-[#D4AF5A] shrink-0" /> PASS HOLDER
                </span>
                <div className="font-bold text-white text-xs sm:text-sm mt-0.5 truncate">{ticket.customer_name}</div>
              </div>

              <div>
                <span className="text-[9px] sm:text-[10px] text-[#9CA3AF] flex items-center gap-1 uppercase truncate">
                  <Ticket className="w-3 h-3 text-[#D4AF5A] shrink-0" /> TICKET NO.
                </span>
                <div className="font-bold text-[#E6C878] text-xs sm:text-sm mt-0.5 truncate">{ticket.ticket_number}</div>
              </div>

              <div>
                <span className="text-[9px] sm:text-[10px] text-[#9CA3AF] flex items-center gap-1 uppercase truncate">
                  <Calendar className="w-3 h-3 text-[#D4AF5A] shrink-0" /> DATE & TIME
                </span>
                <div className="font-bold text-zinc-200 text-[11px] sm:text-xs mt-0.5">OCT 31, 2026 • 8 PM</div>
              </div>

              <div>
                <span className="text-[9px] sm:text-[10px] text-[#9CA3AF] flex items-center gap-1 uppercase truncate">
                  <MapPin className="w-3 h-3 text-[#D4AF5A] shrink-0" /> LOCATION
                </span>
                <div className="font-bold text-zinc-200 text-[11px] sm:text-xs mt-0.5 truncate">{event.venue_name}</div>
              </div>
            </div>

            {/* Protected Clean QR Code Container */}
            <div className="flex flex-col items-center justify-center p-4 bg-[#070A0F] border border-[#D4AF5A]/35 rounded-2xl space-y-3">
              <div className="p-2 bg-white rounded-lg shadow-lg">
                <canvas ref={canvasRef} className="block max-w-full" />
              </div>
              
              <div className="text-center font-mono space-y-1">
                <div className="flex items-center justify-center gap-1 font-bold text-xs">
                  {ticket.status === 'VALID' && (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ENTRY APPROVED (VALID)
                    </span>
                  )}
                  {ticket.status === 'USED' && (
                    <span className="text-[#FF4A00] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> ALREADY SCANNED
                    </span>
                  )}
                  {ticket.status !== 'VALID' && ticket.status !== 'USED' && (
                    <span className="text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> STATUS: {ticket.status}
                    </span>
                  )}
                </div>

                <div className="text-[10px] text-[#9CA3AF]">
                  Hold smartphone pass against bouncer scanner at Gate 4.
                </div>
              </div>
            </div>

            {/* Footer Security Note */}
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-[#9CA3AF] pt-2 border-t border-[#D4AF5A]/15 font-mono">
              <span className="flex items-center gap-1 truncate">
                <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" /> HMAC SIGNED PASS
              </span>
              <span className="truncate">TOKEN: {ticket.secure_token.substring(0, 12)}...</span>
            </div>

          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="pt-2 pb-1 flex justify-center">
            <div className="w-32 h-1 bg-white/30 rounded-full" />
          </div>

        </div>

      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button
          onClick={handlePrint}
          variant="secondary"
          size="sm"
          className="text-xs"
          icon={<Printer className="w-3.5 h-3.5 text-[#D4AF5A]" />}
          iconPosition="left"
        >
          PRINT PASS
        </Button>

        <Button
          onClick={() => alert(`Pass token: ${ticket.secure_token}`)}
          variant="primary"
          size="sm"
          className="text-xs"
          icon={<Download className="w-3.5 h-3.5 text-[#070A0F]" />}
          iconPosition="left"
        >
          SAVE TO WALLET
        </Button>
      </div>

    </div>
  );
}
