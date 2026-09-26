'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TicketType } from '@/lib/types';
import { Button } from '@/components/Button';
import { Ticket, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function TicketSelector() {
  const router = useRouter();
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTypeId, setSelectedTypeId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEventData() {
      try {
        const res = await fetch('/api/v1/event');
        const json = await res.json();
        if (json.success && json.data.ticketTypes) {
          setTicketTypes(json.data.ticketTypes);
          if (json.data.ticketTypes.length > 0) {
            setSelectedTypeId(json.data.ticketTypes[1]?.id || json.data.ticketTypes[0]?.id);
          }
        }
      } catch (err) {
        console.error('Failed to load tickets', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEventData();
  }, []);

  const handleStartCheckout = async () => {
    if (!selectedTypeId) return;
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const sessionId = `sess_${Math.random().toString(36).substring(2, 10)}`;
      const res = await fetch('/api/v1/tickets/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          ticketTypeId: selectedTypeId,
          quantity,
        }),
      });

      const json = await res.json();
      if (!json.success) {
        setErrorMsg(json.error || 'Ticket reservation failed.');
        setSubmitting(false);
        return;
      }

      router.push(`/checkout?reservationId=${json.data.id}`);
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
      setSubmitting(false);
    }
  };

  const selectedCategory = ticketTypes.find(t => t.id === selectedTypeId);

  return (
    <div className="w-full max-w-5xl mx-auto font-sans text-[#E8E8E5]" id="tickets">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-xs text-[#D4AF5A] font-bold tracking-[0.25em] uppercase flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF5A]" /> KINGDOM TICKET DECK
        </span>
        <h2 className="font-serif font-black text-4xl sm:text-5xl uppercase text-white tracking-wider mt-1">
          SELECT YOUR <span className="gold-gradient-text">PASS CATEGORY</span>
        </h2>
        <p className="text-[#9CA3AF] text-xs mt-2 uppercase tracking-widest">
          15-MINUTE AUTOMATED RESERVATION ENGINE — GUARANTEED TICKET LOCK
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-950/80 border border-red-500 text-red-400 text-xs flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center text-[#9CA3AF] text-xs">
          Loading live Kingdom ticket availability & pricing...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Ticket Category Cards List (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            {ticketTypes.map((tt) => {
              const remaining = tt.capacity - tt.sold_count;
              const soldPercentage = Math.round((tt.sold_count / tt.capacity) * 100);
              const isSelected = tt.id === selectedTypeId;

              return (
                <div
                  key={tt.id}
                  onClick={() => tt.is_enabled && remaining > 0 && setSelectedTypeId(tt.id)}
                  className={`p-6 bg-[#071B36]/80 border transition-all cursor-pointer relative ${
                    isSelected ? 'border-[#D4AF5A] bg-[#0B2345] gold-border-glow' : 'border-[#D4AF5A]/25 hover:border-[#D4AF5A]/60'
                  } ${!tt.is_enabled || remaining <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-extrabold text-xl text-white tracking-wider uppercase">{tt.name}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#D4AF5A]" />}
                        {tt.code === 'VIP' && (
                          <span className="text-[9px] px-2.5 py-0.5 gold-gradient-bg text-[#070A0F] font-bold uppercase tracking-wider">
                            ROYAL VIP
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#9CA3AF]">{tt.description}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-serif font-black text-3xl text-[#E6C878]">
                        ₹{tt.price.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-[#9CA3AF] mt-0.5 font-mono">
                        {remaining > 0 ? `${remaining} / ${tt.capacity} PASSES LEFT` : 'SOLD OUT'}
                      </div>
                    </div>
                  </div>

                  {/* Editorial Capacity Bar */}
                  <div className="mt-4 pt-3 border-t border-[#D4AF5A]/15 flex items-center justify-between text-[10px] font-mono gap-2">
                    <span className="text-[#9CA3AF] uppercase truncate">SALES CAPACITY ({soldPercentage}%)</span>
                    <div className="w-24 sm:w-48 h-1.5 bg-[#070A0F] overflow-hidden shrink-0">
                      <div 
                        className={`h-full ${soldPercentage > 85 ? 'bg-[#FF4A00]' : 'gold-gradient-bg'}`} 
                        style={{ width: `${soldPercentage}%` }} 
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Summary & Checkout Box (1 col) */}
          <div className="bg-[#071B36] border border-[#D4AF5A]/30 p-6 flex flex-col justify-between h-full space-y-6">
            <div>
              <h3 className="font-serif font-black text-white text-xl tracking-wider border-b border-[#D4AF5A]/20 pb-4 flex items-center justify-between uppercase">
                <span>ORDER SUMMARY</span>
                <Ticket className="w-5 h-5 text-[#D4AF5A]" />
              </h3>

              {selectedCategory && (
                <div className="mt-6 space-y-4 text-xs font-sans">
                  <div className="flex justify-between text-[#9CA3AF]">
                    <span>CATEGORY:</span>
                    <span className="font-bold text-white uppercase">{selectedCategory.name}</span>
                  </div>

                  <div className="flex justify-between text-[#9CA3AF]">
                    <span>UNIT PRICE:</span>
                    <span className="font-bold text-[#E6C878]">₹{selectedCategory.price.toLocaleString()}</span>
                  </div>

                  {/* Quantity Counter */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#D4AF5A]/20">
                    <span className="text-[#9CA3AF]">QUANTITY:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 bg-[#070A0F] border border-[#D4AF5A]/30 text-white font-bold rounded-full hover:border-[#D4AF5A] flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <span className="font-bold text-white px-3">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(selectedCategory.max_per_order, quantity + 1))}
                        className="w-8 h-8 bg-[#070A0F] border border-[#D4AF5A]/30 text-white font-bold rounded-full hover:border-[#D4AF5A] flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#D4AF5A]/20 flex justify-between items-center">
                    <span className="text-[#9CA3AF]">TOTAL AMOUNT:</span>
                    <span className="font-serif font-black text-3xl gold-gradient-text">
                      ₹{(selectedCategory.price * quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-6 p-4 bg-[#070A0F] border border-[#D4AF5A]/20 text-[11px] text-[#9CA3AF] space-y-1 rounded-2xl">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 15-MINUTE RESERVATION LOCK
                </div>
                <p>Proceeding locks your ticket in database memory for 15 minutes while you enter customer details.</p>
              </div>
            </div>

            <Button
              onClick={handleStartCheckout}
              disabled={submitting || !selectedCategory}
              variant="primary"
              size="lg"
              fullWidth
              icon={<ArrowRight className="w-4 h-4 text-[#070A0F]" />}
            >
              {submitting ? 'RESERVING TICKET...' : 'PROCEED TO CHECKOUT'}
            </Button>
          </div>

        </div>
      )}
    </div>
  );
}
