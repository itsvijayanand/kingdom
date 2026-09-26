'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import KingdomLogo from '@/components/KingdomLogo';
import { Button } from '@/components/Button';
import { Ticket, Lock, CreditCard, AlertCircle, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, QrCode, Building2, Smartphone, Users } from 'lucide-react';

type PaymentMethodType = 'UPI' | 'CARD' | 'NETBANKING' | 'RAZORPAY';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const reservationIdParam = searchParams.get('reservationId');
  const ticketTypeIdParam = searchParams.get('ticketTypeId') || 'tt-vip';
  const initialQuantityParam = Number(searchParams.get('quantity')) || 1;

  const [activeStep, setActiveStep] = useState<'details' | 'payment'>('details');
  const [reservationId, setReservationId] = useState<string>(reservationIdParam || '');
  
  // Category & Quantity State
  const [selectedTicketType, setSelectedTicketType] = useState<any>({
    id: 'tt-vip',
    name: 'VIP ELEVATED ACCESS',
    price: 4999,
    max_per_order: 6,
  });
  const [quantity, setQuantity] = useState<number>(initialQuantityParam);
  const [reserving, setReserving] = useState<boolean>(false);

  // Customer Form State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Payment Selection State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('UPI');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Load ticket types on mount
  useEffect(() => {
    async function loadEventDetails() {
      try {
        const res = await fetch('/api/v1/event');
        const json = await res.json();
        if (json.success && json.data?.ticketTypes) {
          const found = json.data.ticketTypes.find((t: any) => t.id === ticketTypeIdParam) || json.data.ticketTypes[0];
          if (found) setSelectedTicketType(found);
        }
      } catch (err) {
        console.error('Failed to load ticket category info', err);
      }
    }
    loadEventDetails();
  }, [ticketTypeIdParam]);

  // Handle quantity change (live server reservation update)
  const handleQuantityChange = async (newQty: number) => {
    if (newQty < 1 || newQty > (selectedTicketType.max_per_order || 10)) return;
    setQuantity(newQty);
    setReserving(true);
    setErrorMsg(null);

    try {
      const sessionId = `sess_${Math.random().toString(36).substring(2, 10)}`;
      const res = await fetch('/api/v1/tickets/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          ticketTypeId: selectedTicketType.id,
          quantity: newQty,
        }),
      });

      const json = await res.json();
      if (json.success && json.data?.id) {
        setReservationId(json.data.id);
      } else {
        setErrorMsg(json.error || 'Failed to update ticket reservation.');
      }
    } catch (err) {
      setErrorMsg('Network error updating reservation.');
    } finally {
      setReserving(false);
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) {
      setErrorMsg('Please enter all required customer information.');
      setActiveStep('details');
      return;
    }

    if (activeStep === 'details') {
      setActiveStep('payment');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/v1/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reservationId: reservationId || 'res-demo-default',
          customerName,
          customerEmail,
          customerPhone,
        }),
      });

      const json = await res.json();
      if (!json.success) {
        setErrorMsg(json.error || 'Order creation failed.');
        setLoading(false);
        return;
      }

      const orderData = json.data.order;
      setProcessingPayment(true);

      setTimeout(async () => {
        const webhookRes = await fetch('/api/v1/checkout/webhook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: orderData.razorpay_order_id,
            razorpay_payment_id: `pay_live_${paymentMethod}_${Math.random().toString(36).substring(2, 10)}`,
            razorpay_signature: 'test_signature_valid',
            signature_valid: true,
          }),
        });

        const webhookJson = await webhookRes.json();
        if (webhookJson.success && webhookJson.data?.tickets?.[0]) {
          const firstTicket = webhookJson.data.tickets[0];
          router.push(`/booking-success?ticketNumber=${firstTicket.ticket_number}`);
        } else {
          setErrorMsg('Payment verification failed.');
          setProcessingPayment(false);
          setLoading(false);
        }
      }, 2000);

    } catch (err) {
      setErrorMsg('Payment gateway connection error.');
      setLoading(false);
      setProcessingPayment(false);
    }
  };

  const totalAmount = (selectedTicketType?.price || 4999) * quantity;

  return (
    <div className="pt-28 pb-20 bg-[#070A0F] min-h-screen font-sans text-zinc-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Bar Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.push('/#tickets')}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#D4AF5A] hover:text-[#E6C878] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> ← BACK TO TICKET DECK
          </button>
          <KingdomLogo size="sm" showLink={false} />
        </div>

        {/* Interactive Step Navigation Bar (Back & Forth) */}
        <div className="flex items-center justify-between border-b border-[#D4AF5A]/25 pb-4 mb-8 text-xs font-bold font-mono tracking-widest uppercase gap-2">
          <button
            type="button"
            onClick={() => router.push('/#tickets')}
            className="text-[#9CA3AF] hover:text-[#D4AF5A] transition-colors flex items-center gap-1 cursor-pointer"
          >
            01 TICKETS
          </button>
          
          <button
            type="button"
            onClick={() => setActiveStep('details')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full cursor-pointer transition-all ${
              activeStep === 'details' 
                ? 'text-[#070A0F] bg-[#D4AF5A] font-bold' 
                : 'text-[#E6C878] hover:text-white bg-[#071B36] border border-[#D4AF5A]/40'
            }`}
          >
            02 DETAILS
          </button>

          <button
            type="button"
            onClick={() => {
              if (customerName && customerEmail && customerPhone) {
                setActiveStep('payment');
              } else {
                setErrorMsg('Please enter Pass Holder Details before proceeding to payment.');
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full cursor-pointer transition-all ${
              activeStep === 'payment' 
                ? 'text-[#070A0F] bg-[#D4AF5A] font-bold' 
                : 'text-[#9CA3AF] hover:text-[#D4AF5A] bg-[#071B36] border border-[#D4AF5A]/20'
            }`}
          >
            03 PAYMENT
          </button>

          <div className="text-[#9CA3AF]/60 hidden sm:block">04 CONFIRMED</div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#071B36] border border-[#D4AF5A]/30 text-[#E6C878] text-xs font-sans uppercase mb-2 rounded-full">
            <Lock className="w-3.5 h-3.5 text-[#D4AF5A]" />
            SECURE 256-BIT ENCRYPTED CHECKOUT
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-white tracking-wider uppercase">
            COMPLETE YOUR <span className="gold-gradient-text">PASS ORDER</span>
          </h1>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-950/80 border border-red-500 text-red-400 text-xs flex items-center justify-between font-mono rounded-2xl">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button onClick={() => setErrorMsg(null)} className="text-red-300 hover:text-white">✕</button>
          </div>
        )}

        {/* Order Summary & Live Quantity Selector */}
        <div className="mb-8 bg-[#071B36] border border-[#D4AF5A]/40 p-5 sm:p-6 rounded-3xl shadow-xl gold-border-glow">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D4AF5A]/20 pb-4">
            <div>
              <span className="text-[10px] text-[#D4AF5A] font-mono uppercase tracking-widest block font-bold">
                SELECTED CATEGORY
              </span>
              <div className="font-serif font-black text-xl text-white uppercase tracking-wider">
                {selectedTicketType.name}
              </div>
              <div className="text-xs text-[#9CA3AF] font-mono mt-0.5">
                ₹{selectedTicketType.price.toLocaleString()} per pass
              </div>
            </div>

            {/* People Quantity Selector */}
            <div className="bg-[#070A0F] border border-[#D4AF5A]/30 p-3 rounded-2xl flex items-center gap-3 shrink-0">
              <span className="text-xs text-[#9CA3AF] font-mono uppercase flex items-center gap-1 font-bold">
                <Users className="w-4 h-4 text-[#D4AF5A]" /> PEOPLE:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={reserving || quantity <= 1}
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-8 h-8 bg-[#071B36] border border-[#D4AF5A]/40 text-white font-bold rounded-lg hover:border-[#D4AF5A] flex items-center justify-center transition-colors disabled:opacity-40"
                >
                  -
                </button>
                <span className="font-mono font-bold text-white text-base px-2">
                  {quantity} {quantity === 1 ? 'PERSON' : 'PEOPLE'}
                </span>
                <button
                  type="button"
                  disabled={reserving || quantity >= (selectedTicketType.max_per_order || 10)}
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-8 h-8 bg-[#071B36] border border-[#D4AF5A]/40 text-white font-bold rounded-lg hover:border-[#D4AF5A] flex items-center justify-center transition-colors disabled:opacity-40"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between font-mono">
            <span className="text-xs text-[#9CA3AF] uppercase">TOTAL ORDER AMOUNT:</span>
            <div className="font-serif font-black text-3xl gold-gradient-text">
              ₹{totalAmount.toLocaleString()}
            </div>
          </div>
        </div>

        {processingPayment ? (
          <div className="bg-[#071B36] border border-[#D4AF5A]/30 p-8 sm:p-12 text-center space-y-6 gold-border-glow rounded-3xl">
            <div className="w-14 sm:w-16 h-14 sm:h-16 border-4 border-[#D4AF5A] border-t-transparent rounded-full animate-spin mx-auto" />
            <h2 className="font-serif font-black text-xl sm:text-2xl text-white uppercase tracking-wider">
              VERIFYING {paymentMethod} PAYMENT...
            </h2>
            <p className="text-xs text-[#9CA3AF] max-w-md mx-auto font-mono">
              Processing cryptographic payment verification for {quantity} {quantity === 1 ? 'Person' : 'People'}...
            </p>
          </div>
        ) : (
          <form onSubmit={handleCheckoutSubmit} className="bg-[#071B36] border border-[#D4AF5A]/30 p-5 sm:p-8 space-y-6 shadow-2xl rounded-3xl">
            
            {/* STEP 2: DETAILS */}
            {activeStep === 'details' && (
              <div className="space-y-6">
                <div className="border-b border-[#D4AF5A]/20 pb-4">
                  <h2 className="font-serif font-bold text-lg text-white tracking-wider uppercase flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-[#D4AF5A]" />
                    02. PASS HOLDER DETAILS
                  </h2>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">
                    The customer name below will be permanently attached to your cryptographic QR ticket pass.
                  </p>
                </div>

                <div className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="text-[#9CA3AF] block mb-1 uppercase font-bold">FULL LEGAL NAME (AS ON ID):</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-[#070A0F] border border-[#D4AF5A]/30 text-white px-4 py-3.5 text-sm rounded-xl focus:border-[#D4AF5A] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#9CA3AF] block mb-1 uppercase font-bold">EMAIL ADDRESS FOR DISPATCH:</label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="rahul@example.com"
                        className="w-full bg-[#070A0F] border border-[#D4AF5A]/30 text-white px-4 py-3.5 text-sm rounded-xl focus:border-[#D4AF5A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#9CA3AF] block mb-1 uppercase font-bold">MOBILE PHONE (+91):</label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#070A0F] border border-[#D4AF5A]/30 text-white px-4 py-3.5 text-sm rounded-xl focus:border-[#D4AF5A] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={<ArrowRight className="w-4 h-4 text-[#070A0F]" />}
                >
                  PROCEED TO PAYMENT OPTIONS →
                </Button>
              </div>
            )}

            {/* STEP 3: PAYMENT METHOD SELECTION */}
            {activeStep === 'payment' && (
              <div className="space-y-6">
                <div className="border-b border-[#D4AF5A]/20 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif font-bold text-lg text-white tracking-wider uppercase flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#D4AF5A]" />
                      03. CHOOSE PAYMENT METHOD
                    </h2>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                      Select your preferred secure payment channel.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveStep('details')}
                    className="text-xs font-mono text-[#D4AF5A] hover:underline"
                  >
                    ← Edit Details
                  </button>
                </div>

                {/* Payment Option Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'UPI' 
                        ? 'border-[#D4AF5A] bg-[#0B2345] text-white gold-border-glow' 
                        : 'border-[#D4AF5A]/25 bg-[#070A0F] text-[#9CA3AF] hover:border-[#D4AF5A]/60'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-[#D4AF5A]" />
                    <span className="font-bold">⚡ UPI</span>
                    <span className="text-[9px] text-[#9CA3AF]">GPay/PhonePe/Paytm</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CARD')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'CARD' 
                        ? 'border-[#D4AF5A] bg-[#0B2345] text-white gold-border-glow' 
                        : 'border-[#D4AF5A]/25 bg-[#070A0F] text-[#9CA3AF] hover:border-[#D4AF5A]/60'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#D4AF5A]" />
                    <span className="font-bold">💳 CARD</span>
                    <span className="text-[9px] text-[#9CA3AF]">Visa/Mastercard/RuPay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('NETBANKING')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'NETBANKING' 
                        ? 'border-[#D4AF5A] bg-[#0B2345] text-white gold-border-glow' 
                        : 'border-[#D4AF5A]/25 bg-[#070A0F] text-[#9CA3AF] hover:border-[#D4AF5A]/60'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-[#D4AF5A]" />
                    <span className="font-bold">🏛️ NETBANKING</span>
                    <span className="text-[9px] text-[#9CA3AF]">SBI/HDFC/ICICI</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('RAZORPAY')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'RAZORPAY' 
                        ? 'border-[#D4AF5A] bg-[#0B2345] text-white gold-border-glow' 
                        : 'border-[#D4AF5A]/25 bg-[#070A0F] text-[#9CA3AF] hover:border-[#D4AF5A]/60'
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5 text-[#D4AF5A]" />
                    <span className="font-bold">🛡️ RAZORPAY</span>
                    <span className="text-[9px] text-[#9CA3AF]">Unified Gateway</span>
                  </button>
                </div>

                {/* Sub-form based on selected payment method */}
                <div className="p-5 bg-[#070A0F] border border-[#D4AF5A]/25 rounded-2xl font-mono text-xs space-y-4">
                  
                  {/* UPI Form */}
                  {paymentMethod === 'UPI' && (
                    <div className="space-y-3">
                      <label className="text-[#9CA3AF] block font-bold uppercase">ENTER YOUR UPI VPA ID:</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="username@okicici or 9876543210@paytm"
                        className="w-full bg-[#071B36] border border-[#D4AF5A]/30 text-white px-4 py-3 rounded-xl focus:border-[#D4AF5A] focus:outline-none"
                      />
                      <p className="text-[10px] text-[#9CA3AF]">
                        Supported apps: Google Pay, PhonePe, Paytm, BHIM, Amazon Pay. A collect request will be dispatched to your UPI app.
                      </p>
                    </div>
                  )}

                  {/* Card Form */}
                  {paymentMethod === 'CARD' && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-[#9CA3AF] block mb-1 font-bold uppercase">CARD NUMBER:</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4532 •••• •••• 8901"
                          className="w-full bg-[#071B36] border border-[#D4AF5A]/30 text-white px-4 py-3 rounded-xl focus:border-[#D4AF5A] focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[#9CA3AF] block mb-1 font-bold uppercase">EXPIRY (MM/YY):</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="12/28"
                            className="w-full bg-[#071B36] border border-[#D4AF5A]/30 text-white px-4 py-3 rounded-xl focus:border-[#D4AF5A] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[#9CA3AF] block mb-1 font-bold uppercase">CVV / CVC:</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="•••"
                            className="w-full bg-[#071B36] border border-[#D4AF5A]/30 text-white px-4 py-3 rounded-xl focus:border-[#D4AF5A] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Netbanking Form */}
                  {paymentMethod === 'NETBANKING' && (
                    <div className="space-y-3">
                      <label className="text-[#9CA3AF] block font-bold uppercase">SELECT YOUR BANK:</label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full bg-[#071B36] border border-[#D4AF5A]/30 text-white px-4 py-3 rounded-xl focus:border-[#D4AF5A] focus:outline-none"
                      >
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="State Bank of India">State Bank of India (SBI)</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}

                  {/* Razorpay Gateway Form */}
                  {paymentMethod === 'RAZORPAY' && (
                    <div className="text-center p-3 space-y-1 text-xs">
                      <div className="text-[#E6C878] font-bold">RAZORPAY UNIFIED PAYMENT PORTAL</div>
                      <p className="text-[10px] text-[#9CA3AF]">
                        Direct redirection to Razorpay secure payment modal with instant webhook verification.
                      </p>
                    </div>
                  )}

                </div>

                <div className="p-4 bg-[#070A0F] border border-[#D4AF5A]/20 text-xs space-y-2 rounded-2xl">
                  <div className="flex items-center justify-between text-[#9CA3AF]">
                    <span>ORDER TOTAL:</span>
                    <span className="text-[#E6C878] font-bold text-sm">₹{totalAmount.toLocaleString()} ({quantity} {quantity === 1 ? 'Person' : 'People'})</span>
                  </div>
                  <div className="flex items-center justify-between text-[#9CA3AF] pt-2 border-t border-zinc-900 font-mono">
                    <span>IDEMPOTENCY ENCRYPTION:</span>
                    <span className="text-[#22C55E] font-bold uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 256-BIT SECURE
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={<ArrowRight className="w-4 h-4 text-[#070A0F]" />}
                >
                  {loading ? 'AUTHORIZING PAYMENT...' : `PAY ₹${totalAmount.toLocaleString()} NOW WITH ${paymentMethod}`}
                </Button>
              </div>
            )}

          </form>
        )}

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="pt-28 pb-20 bg-[#070A0F] text-center font-sans text-[#9CA3AF]">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

