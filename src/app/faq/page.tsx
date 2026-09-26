'use client';

import React from 'react';

export default function FAQPage() {
  const faqs = [
    {
      q: "HOW DO I RECEIVE MY TICKET AFTER PAYMENT?",
      a: "Upon confirmed Razorpay payment, your ticket is instantly generated server-side with a unique cryptographic HMAC QR token. You can view, download, or print it immediately, and a backup link is sent to your email."
    },
    {
      q: "WHAT PREVENTS DUPLICATE SCANNING AT GATES?",
      a: "Our backend utilizes atomic database row-locking (FOR UPDATE). The instant your QR code is scanned at Gate 1, its state transitions from VALID to USED. Any duplicate scan at another gate immediately displays ENTRY DENIED."
    },
    {
      q: "CAN I TRANSFER MY TICKET TO A FRIEND?",
      a: "Yes. Simply share your digital ticket URL or PDF pass with your friend. Ensure they bring a valid ID matching the guest name listed on the pass."
    },
    {
      q: "WHAT IF INTERNET FAILS AT THE ENTRANCE GATE?",
      a: "Our staff app connects via secure HTTPS API. In case of localized carrier outages, gate staff switch to dedicated supervisor local mesh validation endpoints."
    },
  ];

  return (
    <div className="pt-28 pb-20 bg-[#050505] min-h-screen font-mono text-zinc-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs text-[#FF1010] tracking-widest uppercase">HELP CENTER</span>
          <h1 className="font-display font-black text-4xl text-white tracking-widest uppercase">
            FREQUENTLY ASKED <span className="text-[#FF1010]">QUESTIONS</span>
          </h1>
        </div>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="p-6 bg-[#0C0C0E] border border-zinc-800 space-y-2">
              <h3 className="font-display font-bold text-lg text-white tracking-wider">{f.q}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
