'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Gate, ScanLog, TicketItem } from '@/lib/types';
import { QrCode, CheckCircle2, XCircle, AlertTriangle, Shield, RefreshCw, Camera, CameraOff, Upload, Keyboard, Sparkles } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { Button } from '@/components/Button';

interface QRScannerProps {
  gates: Gate[];
}

export default function QRScanner({ gates }: QRScannerProps) {
  const [selectedGateId, setSelectedGateId] = useState<string>(gates[0]?.id || 'gate-1');
  const [staffEmail, setStaffEmail] = useState<string>('staff1@ahuja.com');
  const [tokenInput, setTokenInput] = useState<string>('');
  const [scanning, setScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [scanMode, setScanMode] = useState<'camera' | 'upload' | 'manual'>('camera');
  
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    result_status: string;
    message: string;
    ticket?: TicketItem;
    scan_log?: ScanLog;
  } | null>(null);

  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);
  const lastScannedTokenRef = useRef<string>('');
  const lastScanTimeRef = useRef<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sound chime feedback generator using Web Audio API
  const playAudioFeedback = (type: 'valid' | 'invalid') => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'valid') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
        osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.25); // A2
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      // Audio context autoplay fallback
    }
  };

  const handleScanSubmit = async (tokenToVerify?: string) => {
    const token = tokenToVerify || tokenInput;
    if (!token) return;

    // Prevent double trigger within 2 seconds for same token
    const now = Date.now();
    if (token === lastScannedTokenRef.current && now - lastScanTimeRef.current < 2000) {
      return;
    }

    lastScannedTokenRef.current = token;
    lastScanTimeRef.current = now;

    setScanning(true);
    setScanResult(null);

    try {
      const res = await fetch('/api/v1/scanner/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token.trim(),
          staffId: staffEmail,
          gateId: selectedGateId,
        }),
      });

      const json = await res.json();
      setScanResult(json);

      if (json.result_status === 'VALID') {
        playAudioFeedback('valid');
      } else {
        playAudioFeedback('invalid');
      }
    } catch (err) {
      playAudioFeedback('invalid');
      setScanResult({
        success: false,
        result_status: 'ERROR',
        message: 'Network connection failure. Please contact gate supervisor.',
      });
    } finally {
      setScanning(false);
    }
  };

  // Start live camera stream
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (html5QrcodeRef.current) {
        if (html5QrcodeRef.current.isScanning) {
          await html5QrcodeRef.current.stop();
        }
      }

      const scanner = new Html5Qrcode("reader");
      html5QrcodeRef.current = scanner;

      await scanner.start(
        { facingMode: facingMode },
        {
          fps: 15,
          qrbox: (viewfinderWidth, viewfinderHeight) => {
            const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
            const size = Math.max(160, Math.floor(minEdge * 0.75));
            return { width: size, height: size };
          },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          handleScanSubmit(decodedText);
        },
        () => {
          // Normal frame parse pass
        }
      );

      setCameraActive(true);
    } catch (err: any) {
      console.error("Camera access error:", err);
      setCameraActive(false);
      setCameraError("Camera access unavailable. Please enable camera permissions or enter ticket token manually.");
    }
  };

  // Stop live camera stream
  const stopCamera = async () => {
    if (html5QrcodeRef.current && html5QrcodeRef.current.isScanning) {
      try {
        await html5QrcodeRef.current.stop();
      } catch (e) {
        console.error(e);
      }
    }
    setCameraActive(false);
  };

  // Toggle Camera
  useEffect(() => {
    if (scanMode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [scanMode, facingMode]);

  // File scan handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setScanning(true);
      const tempScanner = new Html5Qrcode("temp-reader");
      const decodedText = await tempScanner.scanFile(file, true);
      tempScanner.clear();
      setScanning(false);
      if (decodedText) {
        setTokenInput(decodedText);
        handleScanSubmit(decodedText);
      }
    } catch (err) {
      setScanning(false);
      alert("No valid QR code found in selected image.");
    }
  };

  const currentGate = gates.find(g => g.id === selectedGateId);

  return (
    <div className="w-full max-w-xl mx-auto font-sans text-[#E8E8E5]">
      
      {/* Hidden container for image file scanning */}
      <div id="temp-reader" className="hidden" />

      {/* Staff Header Card */}
      <div className="bg-[#071B36]/80 border border-[#D4AF5A]/30 p-4 mb-6 rounded-2xl flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-950/80 border border-emerald-500 flex items-center justify-center rounded-xl">
            <Shield className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-white font-bold text-xs tracking-wider uppercase font-mono">STAFF GATE SCANNER PWA</div>
            <div className="text-[11px] text-[#9CA3AF] font-mono">{staffEmail}</div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-[#9CA3AF] block font-mono">GATE SELECT:</span>
          <select
            value={selectedGateId}
            onChange={(e) => setSelectedGateId(e.target.value)}
            className="bg-[#070A0F] border border-[#D4AF5A]/30 text-xs text-emerald-400 font-bold px-3 py-1 rounded-lg focus:outline-none focus:border-[#D4AF5A]"
          >
            {gates.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setScanMode('camera')}
          className={`flex-1 py-2.5 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 border ${
            scanMode === 'camera'
              ? 'bg-[#071B36] border-[#D4AF5A] text-[#E6C878] shadow-[0_0_15px_rgba(212,175,90,0.2)]'
              : 'bg-[#070A0F] border-[#D4AF5A]/20 text-[#9CA3AF] hover:text-white'
          }`}
        >
          <Camera className="w-4 h-4 text-[#D4AF5A]" /> LIVE CAMERA
        </button>

        <button
          onClick={() => setScanMode('upload')}
          className={`flex-1 py-2.5 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 border ${
            scanMode === 'upload'
              ? 'bg-[#071B36] border-[#D4AF5A] text-[#E6C878] shadow-[0_0_15px_rgba(212,175,90,0.2)]'
              : 'bg-[#070A0F] border-[#D4AF5A]/20 text-[#9CA3AF] hover:text-white'
          }`}
        >
          <Upload className="w-4 h-4 text-[#D4AF5A]" /> UPLOAD FILE
        </button>

        <button
          onClick={() => setScanMode('manual')}
          className={`flex-1 py-2.5 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 border ${
            scanMode === 'manual'
              ? 'bg-[#071B36] border-[#D4AF5A] text-[#E6C878] shadow-[0_0_15px_rgba(212,175,90,0.2)]'
              : 'bg-[#070A0F] border-[#D4AF5A]/20 text-[#9CA3AF] hover:text-white'
          }`}
        >
          <Keyboard className="w-4 h-4 text-[#D4AF5A]" /> MANUAL TOKEN
        </button>
      </div>

      {/* Main Scanner Container */}
      <div className="bg-[#071B36]/60 border border-[#D4AF5A]/30 p-4 sm:p-6 rounded-3xl shadow-2xl relative backdrop-blur-md">
        
        {/* MODE 1: LIVE CAMERA */}
        {scanMode === 'camera' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
              <span className="flex items-center gap-1.5 font-mono text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                HIGH SPEED AUTO-SCAN ACTIVE
              </span>
              <button
                onClick={() => setFacingMode(facingMode === 'environment' ? 'user' : 'environment')}
                className="text-xs text-[#E6C878] hover:underline flex items-center gap-1"
              >
                Switch Camera ({facingMode === 'environment' ? 'Back' : 'Front'})
              </button>
            </div>

            {/* Responsive Video Viewport Container with Phone Aspect Ratio */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF5A]/40 bg-[#070A0F] w-full max-w-sm mx-auto aspect-square flex items-center justify-center shadow-inner">
              <div id="reader" className="w-full h-full" />

              {/* Decorative Scanning Overlay Line */}
              {cameraActive && (
                <div className="absolute inset-x-0 h-0.5 bg-emerald-400 shadow-[0_0_15px_#10B981] animate-bounce pointer-events-none top-1/2" />
              )}

              {cameraError && (
                <div className="p-6 text-center text-xs text-red-400 space-y-3 font-mono">
                  <CameraOff className="w-10 h-10 text-red-400 mx-auto" />
                  <p>{cameraError}</p>
                  <Button
                    onClick={startCamera}
                    variant="secondary"
                    size="sm"
                  >
                    RETRY CAMERA ACCESS
                  </Button>
                </div>
              )}
            </div>

            <p className="text-[11px] text-[#9CA3AF] text-center font-mono">
              Hold digital pass QR code steady in front of camera view to instantly verify entrance.
            </p>
          </div>
        )}

        {/* MODE 2: UPLOAD IMAGE */}
        {scanMode === 'upload' && (
          <div className="space-y-4 text-center py-6">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#D4AF5A]/40 bg-[#070A0F] p-8 rounded-2xl cursor-pointer hover:border-[#D4AF5A] transition-colors group"
            >
              <Upload className="w-12 h-12 text-[#D4AF5A] mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-white font-bold text-sm mb-1">Upload QR Screenshot / Ticket Pass</div>
              <p className="text-xs text-[#9CA3AF]">Click or drag-and-drop ticket image file to parse QR code</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        )}

        {/* MODE 3: MANUAL INPUT */}
        {scanMode === 'manual' && (
          <div className="space-y-3">
            <label className="text-xs text-[#9CA3AF] tracking-wider uppercase block font-mono">
              ENTER TICKET TOKEN / CODE
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleScanSubmit()}
                placeholder="e.g. QR-NOCTURNE-VIP-..."
                className="flex-1 bg-[#070A0F] border border-[#D4AF5A]/30 text-white px-4 py-3 text-sm font-mono focus:border-[#D4AF5A] focus:outline-none rounded-full"
              />
              <Button
                onClick={() => handleScanSubmit()}
                disabled={scanning || !tokenInput}
                variant="primary"
                size="md"
                icon={scanning ? <RefreshCw className="w-4 h-4 animate-spin text-[#070A0F]" /> : undefined}
              >
                {scanning ? 'VERIFYING...' : 'VERIFY PASS'}
              </Button>
            </div>
          </div>
        )}

        {/* Quick Demo Scanning Triggers */}
        <div className="mt-6 pt-4 border-t border-[#D4AF5A]/20">
          <div className="text-[10px] text-[#9CA3AF] font-mono mb-2">DEMO TICKET FAST-TESTS:</div>
          <div className="flex flex-wrap gap-2 text-[11px] font-mono">
            <button
              onClick={() => {
                const tok = 'QR-NOCTURNE-VIP-1A2B3C4D5E6F7G8H';
                setTokenInput(tok);
                handleScanSubmit(tok);
              }}
              className="px-3 py-1.5 bg-[#070A0F] border border-emerald-500/50 text-emerald-400 hover:bg-emerald-950/40 rounded-full transition-colors"
            >
              Test Valid VIP Pass
            </button>
            <button
              onClick={() => {
                const tok = 'QR-NOCTURNE-REGULAR-USED-DEMO-99';
                setTokenInput(tok);
                handleScanSubmit(tok);
              }}
              className="px-3 py-1.5 bg-[#070A0F] border border-amber-500/50 text-amber-400 hover:bg-amber-950/40 rounded-full transition-colors"
            >
              Test Already Used Duplicate
            </button>
          </div>
        </div>

        {/* Scan Result Display Modal Banner */}
        {scanResult && (
          <div className="mt-6 transition-all animate-fadeIn">
            
            {/* SUCCESS STATE */}
            {scanResult.result_status === 'VALID' && (
              <div className="p-6 bg-emerald-950/90 border-2 border-emerald-500 rounded-2xl text-center space-y-4">
                <div className="inline-flex p-3 bg-emerald-500 rounded-full text-black">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="font-serif font-black text-2xl text-emerald-400 tracking-wider">
                  ✓ VALID TICKET — ENTRY APPROVED
                </h3>
                
                {scanResult.ticket && (
                  <div className="bg-[#070A0F] p-4 border border-emerald-800/60 text-left font-mono text-xs space-y-2 rounded-xl">
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">CUSTOMER:</span>
                      <span className="font-bold text-white text-sm">{scanResult.ticket.customer_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">CATEGORY:</span>
                      <span className="font-bold text-emerald-400">{scanResult.ticket.ticket_type_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">TICKET ID:</span>
                      <span className="font-bold text-white">{scanResult.ticket.ticket_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">GATE:</span>
                      <span className="font-bold text-white">{currentGate?.name}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* DUPLICATE ALREADY USED STATE */}
            {scanResult.result_status === 'ALREADY_USED' && (
              <div className="p-6 bg-amber-950/90 border-2 border-amber-500 rounded-2xl text-center space-y-4">
                <div className="inline-flex p-3 bg-amber-500 rounded-full text-black">
                  <AlertTriangle className="w-12 h-12" />
                </div>
                <h3 className="font-serif font-black text-xl text-amber-400 tracking-wider">
                  ✕ TICKET ALREADY USED — ENTRY DENIED
                </h3>
                <p className="text-xs text-amber-200 font-mono">{scanResult.message}</p>
                {scanResult.ticket && (
                  <div className="bg-[#070A0F] p-4 border border-amber-800/60 text-left font-mono text-xs space-y-1 text-[#E8E8E5] rounded-xl">
                    <div>PREVIOUS SCAN AT: <span className="font-bold text-white">{scanResult.ticket.used_at}</span></div>
                    <div>GATE RECORDED: <span className="font-bold text-white">{scanResult.ticket.used_gate_name}</span></div>
                  </div>
                )}
              </div>
            )}

            {/* INVALID STATE */}
            {scanResult.result_status !== 'VALID' && scanResult.result_status !== 'ALREADY_USED' && (
              <div className="p-6 bg-red-950/90 border-2 border-red-500 rounded-2xl text-center space-y-4">
                <div className="inline-flex p-3 bg-red-600 rounded-full text-white">
                  <XCircle className="w-12 h-12" />
                </div>
                <h3 className="font-serif font-black text-xl text-red-400 tracking-wider">
                  ✕ INVALID TICKET — ENTRY DENIED
                </h3>
                <p className="text-xs text-red-200 font-mono">{scanResult.message}</p>
              </div>
            )}

            {/* Reset Button */}
            <div className="mt-4">
              <Button
                onClick={() => {
                  setScanResult(null);
                  setTokenInput('');
                }}
                variant="secondary"
                size="md"
                fullWidth
              >
                SCAN NEXT GUEST TICKET
              </Button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
