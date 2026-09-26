'use client';

import React, { useState, useEffect } from 'react';
import QRScanner from '@/components/QRScanner';
import KingdomLogo from '@/components/KingdomLogo';
import { Gate } from '@/lib/types';
import { QrCode } from 'lucide-react';

export default function StaffScannerPage() {
  const [gates, setGates] = useState<Gate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGates() {
      try {
        const res = await fetch('/api/v1/event');
        const json = await res.json();
        if (json.success && json.data.gates) {
          setGates(json.data.gates);
        }
      } catch (err) {
        console.error('Failed to load gates:', err);
      } finally {
        setLoading(false);
      }
    }
    loadGates();
  }, []);

  return (
    <div className="pt-24 pb-16 bg-[#070A0F] min-h-screen font-sans text-zinc-300">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-6 space-y-3">
          <KingdomLogo size="sm" showLink={false} />

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#071B36] border border-[#D4AF5A]/30 text-emerald-400 text-[11px] font-mono uppercase">
            <QrCode className="w-3.5 h-3.5 text-emerald-400" />
            KINGDOM STAFF BOUNCER SCANNER PWA
          </div>
          <h1 className="font-serif font-black text-2xl text-white tracking-wider uppercase">
            GATE ACCESS CONTROL
          </h1>
          <p className="text-[11px] text-[#9CA3AF] font-mono">
            URL: staff.ahuja-concert.com • Atomic SQL FOR UPDATE Gate Protection Active
          </p>
        </div>

        {loading ? (
          <div className="text-center p-12 text-zinc-500 text-xs font-mono">
            Initializing Kingdom scanner engine...
          </div>
        ) : (
          <QRScanner gates={gates} />
        )}

      </div>
    </div>
  );
}
