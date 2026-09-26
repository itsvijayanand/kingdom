'use client';

import React from 'react';

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 bg-[#050505] min-h-screen font-mono text-zinc-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="font-display font-black text-3xl text-white tracking-widest uppercase border-b border-zinc-800 pb-4">
          TERMS OF <span className="text-[#FF1010]">SERVICE</span>
        </h1>
        <div className="space-y-4 text-xs leading-relaxed text-zinc-400">
          <p>1. <strong>TICKET ISSUANCE:</strong> All tickets issued through Nocturne Velocity 2026 are cryptographically tokenized digital passes. The buyer is responsible for safeguarding their digital token link.</p>
          <p>2. <strong>ENTRY VALIDATION:</strong> Tickets are single-entry only. Once scanned at any authorized gate, the status is atomically locked to USED. Duplicate scans will be rejected immediately by security.</p>
          <p>3. <strong>AGE RESTRICTION:</strong> Attendees must be 18 years of age or older. Government issued photo ID is required at gate security.</p>
        </div>
      </div>
    </div>
  );
}
