'use client';

import React, { useState } from 'react';
import KingdomLogo from '@/components/KingdomLogo';
import DigitalTicket from '@/components/DigitalTicket';
import { Button } from '@/components/Button';
import { TicketItem } from '@/lib/types';
import { Search, Lock, AlertCircle } from 'lucide-react';

export default function MyTicketPage() {
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState<TicketItem | null>(null);
  const [eventData, setEventData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    setTicket(null);

    try {
      const res = await fetch(`/api/v1/customer/ticket/${searchInput.trim()}`);
      const json = await res.json();

      if (json.success) {
        setTicket(json.data.ticket);
        setEventData(json.data.event);
      } else {
        setErrorMsg('No valid ticket found for the provided identifier.');
      }
    } catch (err) {
      setErrorMsg('Lookup error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[#070A0F] min-h-screen font-sans text-zinc-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10 space-y-3">
          <KingdomLogo size="sm" showLink={false} />

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#071B36] border border-[#D4AF5A]/30 text-[#9CA3AF] text-xs font-mono uppercase mb-2">
            <Lock className="w-3.5 h-3.5 text-[#D4AF5A]" />
            SERVER AUTHORIZED LOOKUP (ANTI-IDOR PROTECTED)
          </div>

          <h1 className="font-serif font-black text-4xl text-white tracking-wider uppercase">
            RECOVER YOUR <span className="gold-gradient-text">DIGITAL PASS</span>
          </h1>
          <p className="text-xs text-[#9CA3AF] font-mono">
            Enter your Ticket No (e.g. TKT-8F72K9D1) or Cryptographic QR Token to access your pass.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleLookup} className="max-w-xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row gap-2 font-mono">
            <input
              type="text"
              required
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="e.g. TKT-8F72K9D1"
              className="flex-1 bg-[#071B36] border border-[#D4AF5A]/30 text-white px-5 py-3.5 text-sm rounded-full focus:border-[#D4AF5A] focus:outline-none"
            />
            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              size="md"
              icon={<Search className="w-4 h-4 text-[#070A0F]" />}
              iconPosition="left"
            >
              {loading ? 'SEARCHING...' : 'SEARCH PASS'}
            </Button>
          </div>
        </form>

        {errorMsg && (
          <div className="max-w-xl mx-auto p-4 bg-red-950/80 border border-red-500 text-red-400 text-xs flex items-center gap-3 font-mono">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {ticket && eventData && (
          <div className="animate-fadeIn">
            <DigitalTicket ticket={ticket} event={eventData} />
          </div>
        )}

      </div>
    </div>
  );
}
