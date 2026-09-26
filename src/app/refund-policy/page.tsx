'use client';

import React from 'react';

export default function RefundPolicyPage() {
  return (
    <div className="pt-28 pb-20 bg-[#050505] min-h-screen font-mono text-zinc-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="font-display font-black text-3xl text-white tracking-widest uppercase border-b border-zinc-800 pb-4">
          REFUND & <span className="text-[#FF1010]">CANCELLATION POLICY</span>
        </h1>
        <div className="space-y-4 text-xs leading-relaxed text-zinc-400">
          <p>1. <strong>ALL SALES ARE FINAL:</strong> Tickets purchased for Nocturne Velocity 2026 are non-refundable except in the official event cancellation scenario.</p>
          <p>2. <strong>EVENT CANCELLATION GUARANTEE:</strong> In the unlikely event of concert cancellation due to force majeure, 100% of the ticket purchase price will be automatically refunded to the original Razorpay payment method within 5 to 7 business days.</p>
          <p>3. <strong>RE-ASSIGNMENT & TRANSFERS:</strong> Ticket holders can transfer their pass to another guest by sharing the digital ticket URL or QR code pass.</p>
        </div>
      </div>
    </div>
  );
}
