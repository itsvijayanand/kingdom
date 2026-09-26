'use client';

import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import KingdomLogo from '@/components/KingdomLogo';
import { Button } from '@/components/Button';
import { TicketItem } from '@/lib/types';
import { Download, Printer, ShieldCheck, Calendar, MapPin, Ticket, User, CheckCircle2, AlertCircle, Crown, Mail, Send, X, FileText } from 'lucide-react';

interface DigitalTicketProps {
  ticket: TicketItem;
  event: {
    title: string;
    artist_name: string;
    event_date: string;
    venue_name: string;
    city: string;
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

  useEffect(() => {
    if (canvasRef.current && ticket.secure_token) {
      QRCode.toCanvas(canvasRef.current, ticket.secure_token, {
        width: 170,
        margin: 1,
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

  // 1. Save Digital Pass directly as PDF file
  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    setToastMsg(null);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = ticketRef.current;
      if (!element) return;

      const opt = {
        margin: [8, 8, 8, 8],
        filename: `Kingdom-VIP-Pass-${ticket.ticket_number}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#070A0F' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
      };

      await html2pdf().set(opt).from(element).save();
      setToastMsg(`✓ Kingdom Pass ${ticket.ticket_number} downloaded in PDF format!`);
    } catch (err) {
      console.error('PDF export error:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // 2. Dispatch Ticket Pass over Email API
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
    <div className="w-full max-w-2xl mx-auto font-sans text-[#E8E8E5] px-2 sm:px-0">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="mb-6 p-4 bg-[#071B36] border border-[#D4AF5A] text-[#E6C878] text-xs font-mono flex items-center justify-between rounded-2xl gold-border-glow animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg(null)} className="text-[#9CA3AF] hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ROYAL PHYSICAL CONCERT TICKET STUB (PRINT & PDF TARGET) */}
      <div
        ref={ticketRef}
        className="printable-ticket relative bg-[#071B36] border-2 border-[#D4AF5A] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden gold-border-glow-strong"
      >
        
        {/* Left & Right Authentic Ticket Stub Notches */}
        <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 rounded-full bg-[#070A0F] border-r-2 border-[#D4AF5A] z-20 hidden sm:block" />
        <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 rounded-full bg-[#070A0F] border-l-2 border-[#D4AF5A] z-20 hidden sm:block" />

        {/* Top Gold Foil Accent Bar */}
        <div className="h-2 bg-gradient-to-r from-[#D4AF5A] via-[#E6C878] to-[#D4AF5A]" />

        {/* Main Ticket Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
          
          {/* Main Pass Section (Col 8) */}
          <div className="lg:col-span-8 p-6 sm:p-8 space-y-6 lg:border-r-2 lg:border-dashed lg:border-[#D4AF5A]/35">
            
            {/* Header Brand & Category Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D4AF5A]/25 pb-4">
              <KingdomLogo size="sm" showLink={false} />
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#070A0F] border border-[#D4AF5A]/40 rounded-full">
                <Crown className="w-3.5 h-3.5 text-[#D4AF5A]" />
                <span className="font-serif text-[10px] text-[#E6C878] tracking-[0.2em] uppercase font-bold">
                  {ticket.ticket_type_name || 'ROYAL VIP ADMISSION'}
                </span>
              </div>
            </div>

            {/* Concert Headline & Tour Info */}
            <div>
              <span className="text-[10px] tracking-[0.3em] text-[#D4AF5A] font-mono font-bold uppercase block">// HEADLINE WORLD TOUR 2026</span>
              <h2 className="font-serif font-black text-3xl sm:text-4xl text-white uppercase tracking-wider gold-gradient-text mt-1 leading-tight">
                {event.artist_name}
              </h2>
              <p className="text-xs text-[#E6C878] font-mono font-bold tracking-widest uppercase mt-1">
                {event.title}
              </p>
            </div>

            {/* Event Metadata Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-[#070A0F]/70 p-4 border border-[#D4AF5A]/25 rounded-2xl">
              <div>
                <span className="text-[9px] text-[#9CA3AF] flex items-center gap-1 uppercase">
                  <User className="w-3 h-3 text-[#D4AF5A]" /> PASS HOLDER
                </span>
                <div className="font-bold text-white text-sm mt-0.5 truncate">{ticket.customer_name}</div>
              </div>

              <div>
                <span className="text-[9px] text-[#9CA3AF] flex items-center gap-1 uppercase">
                  <Ticket className="w-3 h-3 text-[#D4AF5A]" /> TICKET NO.
                </span>
                <div className="font-bold text-[#E6C878] text-sm mt-0.5 truncate">{ticket.ticket_number}</div>
              </div>

              <div>
                <span className="text-[9px] text-[#9CA3AF] flex items-center gap-1 uppercase">
                  <Calendar className="w-3 h-3 text-[#D4AF5A]" /> DATE & TIME
                </span>
                <div className="font-bold text-zinc-200 mt-0.5">OCT 31, 2026 • 8:00 PM</div>
              </div>

              <div>
                <span className="text-[9px] text-[#9CA3AF] flex items-center gap-1 uppercase">
                  <MapPin className="w-3 h-3 text-[#D4AF5A]" /> ARENA & GATE
                </span>
                <div className="font-bold text-zinc-200 mt-0.5 truncate">{event.venue_name}</div>
              </div>
            </div>

            {/* Security HMAC Footer */}
            <div className="flex items-center justify-between text-[10px] text-[#9CA3AF] pt-2 border-t border-[#D4AF5A]/15 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" /> HMAC SIGNED PASS
              </span>
              <span className="truncate">TOKEN: {ticket.secure_token.substring(0, 16)}...</span>
            </div>

          </div>

          {/* Right Validation QR Stub Section (Col 4) */}
          <div className="lg:col-span-4 p-6 bg-[#070A0F] flex flex-col items-center justify-between text-center space-y-4">
            
            <div className="space-y-1">
              <span className="text-[9px] text-[#D4AF5A] font-mono tracking-[0.2em] uppercase font-bold block">GATE SCAN TOKEN</span>
              <div className="text-white font-serif text-sm font-bold uppercase">ENTRY PORTAL 4</div>
            </div>

            {/* Crisp High Contrast White QR Canvas Container */}
            <div className="p-2.5 bg-white rounded-xl shadow-xl border-2 border-[#D4AF5A]">
              <canvas ref={canvasRef} className="block mx-auto max-w-full" />
            </div>

            {/* Status Indicator Badge */}
            <div className="font-mono text-xs space-y-1">
              {ticket.status === 'VALID' && (
                <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-xs bg-emerald-950/80 px-3 py-1 border border-emerald-500 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" /> VALID ENTRY PASS
                </span>
              )}
              {ticket.status === 'USED' && (
                <span className="inline-flex items-center gap-1 text-[#FF4A00] font-bold text-xs bg-amber-950/80 px-3 py-1 border border-amber-500 rounded-full">
                  <AlertCircle className="w-3.5 h-3.5" /> ALREADY SCANNED
                </span>
              )}
              {ticket.status !== 'VALID' && ticket.status !== 'USED' && (
                <span className="inline-flex items-center gap-1 text-red-500 font-bold text-xs bg-red-950/80 px-3 py-1 border border-red-500 rounded-full">
                  <AlertCircle className="w-3.5 h-3.5" /> STATUS: {ticket.status}
                </span>
              )}

              <p className="text-[10px] text-[#9CA3AF] pt-1">
                Present QR code to Kingdom Staff Bouncer Scanner.
              </p>
            </div>

            {/* Ticket Barcode Line */}
            <div className="w-full h-8 bg-[#071B36] flex items-center justify-between px-2 overflow-hidden border border-[#D4AF5A]/30 rounded-lg">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className={`h-full ${i % 2 === 0 ? 'w-1 bg-[#D4AF5A]' : 'w-0.5 bg-[#070A0F]'}`} />
              ))}
            </div>

          </div>

        </div>

        {/* Bottom Gold Accent Bar */}
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
