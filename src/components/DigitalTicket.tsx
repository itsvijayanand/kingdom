'use client';

import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import KingdomLogo from '@/components/KingdomLogo';
import { Button } from '@/components/Button';
import { TicketItem } from '@/lib/types';
import { Download, Printer, ShieldCheck, Calendar, MapPin, Ticket, User, CheckCircle2, AlertCircle, Crown, Mail, Send, X, FileText, Clock, Sparkles } from 'lucide-react';

interface DigitalTicketProps {
  ticket: TicketItem;
  event: {
    title: string;
    artist_name: string;
    event_date: string;
    doors_open?: string;
    venue_name: string;
    city: string;
    ticket_image?: string;
    hero_image?: string;
    banner_image?: string;
  };
}

export default function DigitalTicket({ ticket, event }: DigitalTicketProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ticketRef = useRef<HTMLDivElement | null>(null);

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailInput, setEmailInput] = useState(ticket.customer_email || '');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Concert center artwork resolution
  const concertArtwork = 
    event.ticket_image || 
    event.hero_image || 
    event.banner_image || 
    '/images/kingdom-concert-hero.jpg';

  // Dynamic gate number formatting
  const rawGate = (ticket as any).gate || ticket.used_gate_name || '04';
  const gateNumOnly = String(rawGate).replace(/ENTRY|GATE/gi, '').trim() || '04';
  const gateNumber = gateNumOnly.padStart(2, '0');

  useEffect(() => {
    if (canvasRef.current && ticket.secure_token) {
      QRCode.toCanvas(canvasRef.current, ticket.secure_token, {
        width: 240,
        margin: 2,
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

  // Save Digital Pass directly as PDF tightly fitting the ticket pass
  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    setToastMsg(null);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = ticketRef.current;
      if (!element) return;

      const opt = {
        margin: [5, 5, 5, 5],
        filename: `Kingdom-Pass-${ticket.ticket_number}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2.5, 
          useCORS: true, 
          backgroundColor: '#071B36',
          letterRendering: true,
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: { unit: 'mm', format: [280, 125], orientation: 'landscape' },
        pagebreak: { mode: ['avoid-all'] }
      };

      await html2pdf().set(opt).from(element).save();
      setToastMsg(`✓ Kingdom Pass ${ticket.ticket_number} saved as PDF!`);
    } catch (err) {
      console.error('PDF export error:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Dispatch Ticket Pass over Email API
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    setSendingEmail(true);
    try {
      const res = await fetch('/api/v1/customer/ticket/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketNumber: ticket.ticket_number,
          email: emailInput.trim(),
        }),
      });

      const json = await res.json();
      if (json.success) {
        setToastMsg(`✓ Official Ticket Pass ${ticket.ticket_number} sent to ${emailInput}! Check your inbox.`);
        setShowEmailModal(false);
      } else {
        alert(json.error || 'Failed to dispatch ticket email.');
      }
    } catch (err) {
      alert('Email server connection error.');
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto font-sans text-[#E8E8E5] px-2 sm:px-0">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="mb-6 p-4 bg-[#071B36] border border-[#D4AF5A] text-[#E6C878] text-xs font-mono flex items-center justify-between rounded-2xl gold-border-glow animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
            <span>{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg(null)} className="text-[#9CA3AF] hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* LUXURY PHYSICAL CONCERT PASS (3-ZONE DESKTOP / STACKED MOBILE) */}
      <div
        ref={ticketRef}
        className="printable-ticket relative bg-[#071B36] border-2 border-[#D4AF5A] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden h-auto gold-border-glow-strong"
      >
        
        {/* Left & Right Physical Ticket Stub Notches (Behind Content z-0) */}
        <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 rounded-full bg-[#070A0F] border-r-2 border-[#D4AF5A] z-0 hidden lg:block" />
        <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 rounded-full bg-[#070A0F] border-l-2 border-[#D4AF5A] z-0 hidden lg:block" />

        {/* Top Metallic Gold Accent Bar */}
        <div className="h-2 bg-gradient-to-r from-[#D4AF5A] via-[#E6C878] to-[#D4AF5A]" />

        {/* Main 3-Zone Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10 items-stretch">
          
          {/* ===================================================
              ZONE 1: LEFT INFORMATION PANEL (~28-30% Desktop)
             =================================================== */}
          <div className="lg:col-span-4 p-6 sm:p-7 bg-[#071B36] flex flex-col justify-between space-y-6 border-b lg:border-b-0 lg:border-r border-[#D4AF5A]/30">
            
            {/* Header Brand */}
            <div className="flex items-center justify-between border-b border-[#D4AF5A]/25 pb-4">
              <KingdomLogo size="sm" showLink={false} />
              <div className="flex items-center gap-1 text-[10px] font-mono text-[#D4AF5A] uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-[#E6C878]" /> VIP ADMIT ONE
              </div>
            </div>

            {/* Concert Headline & Titles */}
            <div className="space-y-1.5">
              <span className="text-[10px] tracking-[0.25em] text-[#D4AF5A] font-mono font-bold uppercase block">
                // HEADLINE WORLD TOUR 2026
              </span>
              <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#E6C878] uppercase tracking-wider leading-tight drop-shadow-md break-words">
                {event.artist_name || 'VEX & THE SYNTH SYNDICATE'}
              </h2>
              <p className="text-xs text-[#C8CBD0] font-mono font-bold tracking-widest uppercase break-words leading-relaxed pt-1">
                {event.title || 'NOCTURNE VELOCITY: LIVE WORLD TOUR'}
              </p>
            </div>

            {/* Structured Pass Information Box */}
            <div className="bg-[#070A0F]/80 p-4 sm:p-5 border border-[#D4AF5A]/30 rounded-2xl space-y-3.5 text-xs font-mono">
              
              {/* Pass Holder */}
              <div>
                <span className="text-[9px] text-[#9CA3AF] flex items-center gap-1 uppercase tracking-widest font-bold">
                  <User className="w-3 h-3 text-[#D4AF5A]" /> PASS HOLDER
                </span>
                <div className="font-bold text-white text-sm sm:text-base pt-0.5 leading-snug break-words">
                  {ticket.customer_name || 'Vijayanand'}
                </div>
              </div>

              {/* Date & Time Row */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#D4AF5A]/15">
                <div>
                  <span className="text-[9px] text-[#9CA3AF] flex items-center gap-1 uppercase tracking-widest font-bold">
                    <Calendar className="w-3 h-3 text-[#D4AF5A]" /> DATE
                  </span>
                  <div className="font-bold text-[#E8E8E5] text-xs pt-0.5 leading-snug">
                    {event.event_date || 'OCT 31, 2026'}
                  </div>
                </div>
                <div>
                  <span className="text-[9px] text-[#9CA3AF] flex items-center gap-1 uppercase tracking-widest font-bold">
                    <Clock className="w-3 h-3 text-[#D4AF5A]" /> TIME
                  </span>
                  <div className="font-bold text-[#E8E8E5] text-xs pt-0.5 leading-snug">
                    {event.doors_open || '8:00 PM'}
                  </div>
                </div>
              </div>

              {/* Venue & Gate Row */}
              <div className="pt-1 border-t border-[#D4AF5A]/15">
                <span className="text-[9px] text-[#9CA3AF] flex items-center gap-1 uppercase tracking-widest font-bold">
                  <MapPin className="w-3 h-3 text-[#D4AF5A]" /> VENUE & GATE
                </span>
                <div className="font-bold text-[#E8E8E5] text-xs pt-0.5 leading-snug break-words whitespace-normal">
                  {event.venue_name || 'CYBERDOME ARENA & EXHIBITION GROUNDS'}
                </div>
                <div className="text-[#D4AF5A] text-xs font-bold font-mono mt-1">
                  GATE {gateNumber}
                </div>
              </div>

            </div>

            {/* Left Footer Security Note */}
            <div className="pt-2 border-t border-[#D4AF5A]/15 flex items-center justify-between text-[10px] font-mono text-[#9CA3AF]">
              <span className="flex items-center gap-1.5 text-[#22C55E] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E] shrink-0" /> ✓ VERIFIED DIGITAL PASS
              </span>
              <span className="text-[9px] text-[#D4AF5A]/80 font-bold uppercase tracking-widest">
                KINGDOM ACCESS
              </span>
            </div>

          </div>

          {/* ===================================================
              ZONE 2: CENTER EVENT ARTWORK PANEL (~42% Desktop)
             =================================================== */}
          <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full overflow-hidden bg-[#070A0F] flex items-center justify-center border-b lg:border-b-0 lg:border-r border-[#D4AF5A]/30">
            
            {/* Background Concert Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url(${concertArtwork})` }}
            />

            {/* Gradient Overlay for Contrast & Navy Integration */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#071B36] via-[#070A0F]/40 to-[#071B36]/80" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#071B36]/20 to-[#071B36]" />

            {/* Center Floating Editorial Crest */}
            <div className="relative z-10 text-center p-6 space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#070A0F]/80 border-2 border-[#D4AF5A] flex items-center justify-center mx-auto shadow-2xl backdrop-blur-md">
                <Crown className="w-6 h-6 text-[#E6C878]" />
              </div>
              <div className="inline-block px-4 py-1 bg-[#070A0F]/90 border border-[#D4AF5A]/60 rounded-full text-[10px] font-mono text-[#E6C878] font-bold tracking-[0.25em] uppercase shadow-lg backdrop-blur-sm">
                LIVE CONCERT EXPERIENCE
              </div>
              <div className="text-[11px] text-white/90 font-serif font-bold uppercase tracking-widest drop-shadow-md">
                WORLD TOUR 2026 • OFFICIAL PASS
              </div>
            </div>

            {/* Perforation Line Effect */}
            <div className="absolute right-0 top-0 bottom-0 w-px border-r-2 border-dashed border-[#D4AF5A]/40 hidden lg:block" />
          </div>

          {/* ===================================================
              ZONE 3: RIGHT QR & VERIFICATION PANEL (~30% Desktop)
             =================================================== */}
          <div className="lg:col-span-3 p-6 sm:p-7 bg-[#070A0F] flex flex-col items-center justify-between text-center space-y-5">
            
            {/* Ticket Type Badge */}
            <div className="w-full space-y-2">
              <div className="inline-block px-4 py-1.5 bg-[#071B36] border border-[#D4AF5A] rounded-md text-xs font-serif text-[#E6C878] font-bold tracking-widest uppercase shadow-md">
                {ticket.ticket_type_name || 'EARLY BIRD PASS'}
              </div>
              
              <div className="text-[11px] font-mono text-white font-bold uppercase tracking-wider pt-1">
                ENTRY GATE {gateNumber}
              </div>
            </div>

            {/* Crisp Scannable White QR Code */}
            <div className="p-3 bg-white rounded-2xl border-2 border-[#D4AF5A] shadow-xl inline-block max-w-[240px] mx-auto">
              <canvas ref={canvasRef} className="w-full max-w-[210px] h-auto block mx-auto aspect-square" />
            </div>

            {/* Dynamic Status Indicator */}
            <div className="font-mono text-xs space-y-2 w-full flex flex-col items-center">
              {ticket.status === 'VALID' && (
                <span className="inline-flex items-center gap-1.5 text-[#22C55E] font-bold text-xs bg-emerald-950/90 px-4 py-1.5 border border-emerald-500/70 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" /> ✓ VALID ENTRY PASS
                </span>
              )}
              {ticket.status === 'USED' && (
                <span className="inline-flex items-center gap-1.5 text-amber-400 font-bold text-xs bg-amber-950/90 px-4 py-1.5 border border-amber-500/70 rounded-full">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" /> ✕ TICKET ALREADY USED
                </span>
              )}
              {ticket.status === 'CANCELLED' && (
                <span className="inline-flex items-center gap-1.5 text-red-400 font-bold text-xs bg-red-950/90 px-4 py-1.5 border border-red-500/70 rounded-full">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" /> ✕ TICKET CANCELLED
                </span>
              )}
              {ticket.status === 'REFUNDED' && (
                <span className="inline-flex items-center gap-1.5 text-purple-400 font-bold text-xs bg-purple-950/90 px-4 py-1.5 border border-purple-500/70 rounded-full">
                  <AlertCircle className="w-4 h-4 text-purple-400 shrink-0" /> ✕ TICKET REFUNDED
                </span>
              )}
              {ticket.status !== 'VALID' && ticket.status !== 'USED' && ticket.status !== 'CANCELLED' && ticket.status !== 'REFUNDED' && (
                <span className="inline-flex items-center gap-1.5 text-red-400 font-bold text-xs bg-red-950/90 px-4 py-1.5 border border-red-500/70 rounded-full">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" /> ✕ TICKET BLOCKED ({ticket.status})
                </span>
              )}

              <p className="text-[10px] text-[#9CA3AF] pt-0.5 max-w-[190px] leading-tight font-mono">
                Present QR code at gate scanner.
              </p>
            </div>

            {/* Public Ticket ID Section */}
            <div className="w-full pt-2 border-t border-[#D4AF5A]/20 font-mono text-center">
              <span className="text-[9px] text-[#9CA3AF] uppercase tracking-widest block font-bold">
                TICKET NO.
              </span>
              <div className="font-bold text-[#E6C878] text-sm tracking-wider">
                {ticket.ticket_number}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Metallic Gold Accent Bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#D4AF5A] via-[#E6C878] to-[#D4AF5A]" />

      </div>

      {/* Action Buttons (Print, Save PDF, Email Pass) - Hidden on Print */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 print:hidden">
        <Button
          onClick={handlePrint}
          variant="secondary"
          size="md"
          icon={<Printer className="w-4 h-4 text-[#D4AF5A]" />}
          iconPosition="left"
        >
          PRINT OFFICIAL PASS
        </Button>

        <Button
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          variant="primary"
          size="md"
          icon={<FileText className="w-4 h-4 text-[#070A0F]" />}
          iconPosition="left"
        >
          {isGeneratingPdf ? 'GENERATING PDF...' : 'SAVE DIGITAL PASS (PDF)'}
        </Button>

        <Button
          onClick={() => setShowEmailModal(true)}
          variant="secondary"
          size="md"
          icon={<Mail className="w-4 h-4 text-[#D4AF5A]" />}
          iconPosition="left"
        >
          SEND TO MAIL
        </Button>
      </div>

      {/* Modal for Email Ticket Dispatch */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-[#071B36] border-2 border-[#D4AF5A] p-6 rounded-3xl shadow-2xl space-y-5 gold-border-glow relative">
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute top-4 right-4 text-[#9CA3AF] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-[#070A0F] border border-[#D4AF5A] flex items-center justify-center rounded-full mx-auto">
                <Mail className="w-6 h-6 text-[#D4AF5A]" />
              </div>
              <h3 className="font-serif font-black text-xl text-white uppercase tracking-wider">
                DISPATCH PASS TO MAIL
              </h3>
              <p className="text-xs text-[#9CA3AF] font-mono">
                Enter customer email address for instant cryptographic ticket dispatch.
              </p>
            </div>

            <form onSubmit={handleSendEmail} className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-[#9CA3AF] block mb-1 uppercase">DESTINATION EMAIL ADDRESS:</label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="customer@example.com"
                  className="w-full bg-[#070A0F] border border-[#D4AF5A]/30 text-white px-4 py-3 rounded-xl focus:border-[#D4AF5A] focus:outline-none"
                />
              </div>

              <div className="p-3 bg-[#070A0F] border border-[#D4AF5A]/20 text-[10px] text-[#9CA3AF] rounded-xl font-mono">
                <span className="text-[#E6C878] font-bold">ATTACHMENTS INCLUDED:</span> Digital Pass PDF, Cryptographic QR Gate Token, & Arena Access Directives.
              </div>

              <Button
                type="submit"
                disabled={sendingEmail || !emailInput}
                variant="primary"
                size="lg"
                fullWidth
                icon={<Send className="w-4 h-4 text-[#070A0F]" />}
              >
                {sendingEmail ? 'DISPATCHING MAIL...' : 'SEND EMAIL PASS NOW'}
              </Button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}


