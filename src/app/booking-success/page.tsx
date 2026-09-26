'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import KingdomLogo from '@/components/KingdomLogo';
import DigitalTicket from '@/components/DigitalTicket';
import { TicketItem } from '@/lib/types';
import { CheckCircle2, AlertCircle } from 'lucide-react';

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const ticketNumber = searchParams.get('ticketNumber') || 'TKT-8F72K9D1';

  const [ticket, setTicket] = useState<TicketItem | null>(null);
  const [eventData, setEventData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTicket() {
      try {
        const res = await fetch(`/api/v1/customer/ticket/${ticketNumber}`);
        const json = await res.json();
        if (json.success) {
          setTicket(json.data.ticket);
          setEventData(json.data.event);
        }
      } catch (err) {
        console.error('Failed to load ticket:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTicket();
  }, [ticketNumber]);

  return (
    <div className="pt-28 pb-20 bg-[#070A0F] min-h-screen font-sans text-zinc-300 print:p-0 print:m-0 print:bg-[#071B36] print:min-h-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 print:p-0 print:m-0 print:max-w-full">
        
        {/* Banner - Hidden on Print */}
        <div className="text-center mb-10 space-y-4 print:hidden">
          <KingdomLogo size="sm" showLink={false} />
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#071B36] border border-[#D4AF5A]/40 text-[#E6C878] text-xs uppercase tracking-widest rounded-full font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            PAYMENT CONFIRMED & TICKET ISSUED
          </div>
          
          <h1 className="font-serif font-black text-4xl sm:text-6xl text-white tracking-wider uppercase">
            BOOKING <span className="gold-gradient-text">CONFIRMED</span>
          </h1>
          <p className="text-xs text-[#9CA3AF] max-w-md mx-auto uppercase tracking-widest font-mono">
            YOUR PLACE IS RESERVED. A CONFIRMATION EMAIL HAS BEEN DISPATCHED WITH YOUR VIP PASS.
          </p>
        </div>

        {loading ? (
          <div className="text-center p-12 text-zinc-500 text-xs font-mono">
            Loading secure Kingdom ticket pass...
          </div>
        ) : ticket && eventData ? (
          <DigitalTicket ticket={ticket} event={eventData} />
        ) : (
          <div className="p-8 bg-red-950/80 border border-red-500 text-red-400 text-center text-xs font-mono">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            Ticket not found for ticket number: {ticketNumber}
          </div>
        )}

      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="pt-28 pb-20 bg-[#070A0F] text-center font-sans text-zinc-400">Loading success page...</div>}>
      <BookingSuccessContent />
    </Suspense>
  );
}
