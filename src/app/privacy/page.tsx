'use client';

import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 bg-[#050505] min-h-screen font-mono text-zinc-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="font-display font-black text-3xl text-white tracking-widest uppercase border-b border-zinc-800 pb-4">
          PRIVACY <span className="text-[#FF1010]">POLICY</span>
        </h1>
        <div className="space-y-4 text-xs leading-relaxed text-zinc-400">
          <p>1. <strong>DATA COLLECTION:</strong> We collect customer names, email addresses, and phone numbers strictly for ticket issuance, Razorpay payment reconciliation, and entrance security validation.</p>
          <p>2. <strong>PAYMENT INTEGRITY:</strong> Credit card, UPI, and financial credentials are processed directly via Razorpay PCI-DSS compliant infrastructure. We never store raw payment credentials on our servers.</p>
          <p>3. <strong>NO THIRD PARTY DATA SELLING:</strong> Your contact information is used solely for Nocturne Velocity tour updates and emergency venue dispatches.</p>
        </div>
      </div>
    </div>
  );
}
