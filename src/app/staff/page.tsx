'use client';

import React, { useState, useEffect } from 'react';
import QRScanner from '@/components/QRScanner';
import KingdomLogo from '@/components/KingdomLogo';
import { Gate } from '@/lib/types';
import { QrCode, Lock, LogOut, ShieldCheck, Key } from 'lucide-react';
import { Button } from '@/components/Button';

export default function StaffScannerPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [staffEmail, setStaffEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const [gates, setGates] = useState<Gate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('kingdom_staff_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
      const savedEmail = sessionStorage.getItem('kingdom_staff_email');
      if (savedEmail) setStaffEmail(savedEmail);
    }
  }, []);

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

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      staffEmail.trim() &&
      (passcode === 'staff2026' || passcode === '123456' || passcode === 'staff')
    ) {
      sessionStorage.setItem('kingdom_staff_auth', 'true');
      sessionStorage.setItem('kingdom_staff_email', staffEmail.trim());
      setIsAuthenticated(true);
      setLoginError(null);
    } else {
      setLoginError('Invalid staff credentials or passcode. Use demo credentials below.');
    }
  };

  const handleDemoLogin = () => {
    const demoEmail = 'staff1@ahuja.com';
    setStaffEmail(demoEmail);
    setPasscode('staff2026');
    sessionStorage.setItem('kingdom_staff_auth', 'true');
    sessionStorage.setItem('kingdom_staff_email', demoEmail);
    setIsAuthenticated(true);
    setLoginError(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('kingdom_staff_auth');
    sessionStorage.removeItem('kingdom_staff_email');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-24 pb-16 bg-[#070A0F] min-h-screen font-sans text-zinc-300 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#071B36] border-2 border-[#D4AF5A]/40 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 gold-border-glow">
          
          <div className="text-center space-y-3">
            <KingdomLogo size="sm" showLink={false} />

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#070A0F] border border-[#D4AF5A]/30 text-emerald-400 text-[11px] font-mono uppercase rounded-full">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              STAFF BOUNCER SCANNER LOGIN
            </div>

            <h1 className="font-serif font-black text-2xl text-white tracking-wider uppercase">
              GATE ACCESS CONTROL
            </h1>
            <p className="text-[11px] text-[#9CA3AF] font-mono">
              Authorized gate staff login portal.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-950/80 border border-red-500 text-red-400 text-xs font-mono text-center rounded-xl">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 font-mono text-xs">
            <div>
              <label className="text-[#9CA3AF] block mb-1 uppercase">STAFF EMAIL / EMAIL ID:</label>
              <input
                type="email"
                required
                value={staffEmail}
                onChange={(e) => setStaffEmail(e.target.value)}
                placeholder="staff1@ahuja.com"
                className="w-full bg-[#070A0F] border border-[#D4AF5A]/30 text-white px-4 py-3 rounded-xl focus:border-[#D4AF5A] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[#9CA3AF] block mb-1 uppercase">STAFF PASSCODE / GATE KEY:</label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#070A0F] border border-[#D4AF5A]/30 text-white px-4 py-3 rounded-xl focus:border-[#D4AF5A] focus:outline-none"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              icon={<ShieldCheck className="w-4 h-4 text-[#070A0F]" />}
            >
              AUTHENTICATE SCANNER
            </Button>
          </form>

          {/* Quick Demo Login Preset Helper */}
          <div className="pt-4 border-t border-[#D4AF5A]/20 text-center font-mono text-xs space-y-2">
            <div className="text-[10px] text-[#9CA3AF]">DEMO STAFF CREDENTIALS:</div>
            <div className="p-3 bg-[#070A0F] border border-[#D4AF5A]/25 rounded-xl text-left text-[11px] space-y-1">
              <div><span className="text-[#9CA3AF]">Staff Email:</span> <span className="text-[#E6C878] font-bold">staff1@ahuja.com</span></div>
              <div><span className="text-[#9CA3AF]">Security Key:</span> <span className="text-emerald-400 font-bold">staff2026</span></div>
            </div>

            <button
              onClick={handleDemoLogin}
              className="w-full py-2 bg-[#070A0F] border border-emerald-500/50 text-emerald-400 font-bold hover:bg-emerald-950/40 rounded-xl transition-colors"
            >
              ⚡ AUTO-FILL STAFF LOGIN
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-[#070A0F] min-h-screen font-sans text-zinc-300">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-6 space-y-3">
          <KingdomLogo size="sm" showLink={false} />

          <div className="flex items-center justify-between bg-[#071B36] border border-[#D4AF5A]/30 px-4 py-2 rounded-2xl text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
              <QrCode className="w-4 h-4 text-emerald-400" />
              BOUNCER SCANNER ({staffEmail || 'staff1@ahuja.com'})
            </div>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-white flex items-center gap-1 font-bold text-[10px] uppercase"
            >
              <LogOut className="w-3.5 h-3.5" /> LOGOUT
            </button>
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
