'use client';

import React, { useState, useEffect } from 'react';
import KingdomLogo from '@/components/KingdomLogo';
import { 
  ShieldAlert, 
  Ticket, 
  Users, 
  DollarSign, 
  AlertTriangle, 
  RefreshCw, 
  CheckCircle2, 
  PauseCircle,
  PlayCircle,
  Lock,
  LogOut,
  Key,
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/Button';

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMfa, setLoginMfa] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'gates' | 'emergency' | 'audit'>('overview');
  const [data, setData] = useState<any>(null);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  const [editPrice, setEditPrice] = useState('2499');
  const [editCapacity, setEditCapacity] = useState('2500');

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('kingdom_admin_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (loginEmail.toLowerCase() === 'admin@kingdom.com' || loginEmail.toLowerCase() === 'superadmin@ahuja.com') &&
      (loginPassword === 'admin123' || loginPassword === 'kingdom2026' || loginPassword === 'admin')
    ) {
      sessionStorage.setItem('kingdom_admin_auth', 'true');
      setIsAuthenticated(true);
      setLoginError(null);
    } else {
      setLoginError('Invalid credentials. Use demo credentials below.');
    }
  };

  const handleDemoLogin = () => {
    setLoginEmail('superadmin@ahuja.com');
    setLoginPassword('kingdom2026');
    setLoginMfa('123456');
    sessionStorage.setItem('kingdom_admin_auth', 'true');
    setIsAuthenticated(true);
    setLoginError(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('kingdom_admin_auth');
    setIsAuthenticated(false);
  };

  const fetchAdminData = async () => {
    try {
      const res = await fetch('/api/v1/admin/dashboard');
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }

      const auditRes = await fetch('/api/v1/admin/audit-logs');
      const auditJson = await auditRes.json();
      if (auditJson.success) {
        setAuditLogs(auditJson.data);
      }
    } catch (err) {
      console.error('Admin fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData();
    }
  }, [isAuthenticated]);

  const handleToggleSalesPause = async () => {
    if (!confirm('EMERGENCY ACTION: Are you sure you want to toggle ticket sales pause?')) return;

    try {
      const res = await fetch('/api/v1/admin/emergency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'TOGGLE_SALES_PAUSE', actorEmail: loginEmail || 'superadmin@ahuja.com', mfaToken: '123456' }),
      });
      const json = await res.json();
      if (json.success) {
        setActionMsg(json.message);
        fetchAdminData();
      }
    } catch (err) {
      alert('Emergency action failed');
    }
  };

  const handleUpdateCategoryConfig = async (ticketTypeId: string) => {
    try {
      const res = await fetch('/api/v1/admin/tickets', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'UPDATE_CONFIG',
          ticketTypeId,
          price: Number(editPrice),
          capacity: Number(editCapacity),
          isEnabled: true,
          actorEmail: loginEmail || 'superadmin@ahuja.com'
        }),
      });
      const json = await res.json();
      if (json.success) {
        setActionMsg(json.message);
        fetchAdminData();
      }
    } catch (err) {
      alert('Config update failed');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-28 pb-20 bg-[#070A0F] min-h-screen font-sans text-zinc-300 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#071B36] border-2 border-[#D4AF5A]/40 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 gold-border-glow">
          <div className="text-center space-y-3">
            <KingdomLogo size="sm" showLink={false} />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#070A0F] border border-[#D4AF5A]/30 text-[#E6C878] text-[10px] font-mono uppercase rounded-full">
              <Lock className="w-3.5 h-3.5 text-[#D4AF5A]" />
              AUTHENTICATION GATE
            </div>
            <h1 className="font-serif font-black text-2xl text-white tracking-wider uppercase">
              ADMIN CONTROL CENTER
            </h1>
            <p className="text-xs text-[#9CA3AF] font-mono">
              Restricted management console for Kingdom Executives.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-950/80 border border-red-500 text-red-400 text-xs font-mono text-center rounded-xl">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 font-mono text-xs">
            <div>
              <label className="text-[#9CA3AF] block mb-1 uppercase">ADMIN EMAIL:</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="superadmin@ahuja.com"
                className="w-full bg-[#070A0F] border border-[#D4AF5A]/30 text-white px-4 py-3 rounded-xl focus:border-[#D4AF5A] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[#9CA3AF] block mb-1 uppercase">PASSWORD:</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#070A0F] border border-[#D4AF5A]/30 text-white px-4 py-3 rounded-xl focus:border-[#D4AF5A] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[#9CA3AF] block mb-1 uppercase">MFA SECURITY TOKEN (OPTIONAL):</label>
              <input
                type="text"
                value={loginMfa}
                onChange={(e) => setLoginMfa(e.target.value)}
                placeholder="123456"
                className="w-full bg-[#070A0F] border border-[#D4AF5A]/30 text-white px-4 py-3 rounded-xl focus:border-[#D4AF5A] focus:outline-none"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              icon={<UserCheck className="w-4 h-4 text-[#070A0F]" />}
            >
              AUTHENTICATE ADMIN
            </Button>
          </form>

          {/* Quick Demo Login Preset Helper */}
          <div className="pt-4 border-t border-[#D4AF5A]/20 text-center font-mono text-xs space-y-2">
            <div className="text-[10px] text-[#9CA3AF]">DEMO LOGIN CREDENTIALS:</div>
            <div className="p-3 bg-[#070A0F] border border-[#D4AF5A]/25 rounded-xl text-left text-[11px] space-y-1">
              <div><span className="text-[#9CA3AF]">Email:</span> <span className="text-[#E6C878] font-bold">superadmin@ahuja.com</span></div>
              <div><span className="text-[#9CA3AF]">Password:</span> <span className="text-[#E6C878] font-bold">kingdom2026</span></div>
              <div><span className="text-[#9CA3AF]">MFA Pin:</span> <span className="text-emerald-400 font-bold">123456</span></div>
            </div>

            <button
              onClick={handleDemoLogin}
              className="w-full py-2 bg-[#070A0F] border border-emerald-500/50 text-emerald-400 font-bold hover:bg-emerald-950/40 rounded-xl transition-colors"
            >
              ⚡ AUTO-FILL & LOGIN IMMEDIATELY
            </button>
          </div>

        </div>
      </div>
    );
  }

  const metrics = data?.metrics;

  return (
    <div className="pt-24 pb-20 bg-[#070A0F] min-h-screen font-sans text-zinc-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header with Kingdom Emblem */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#D4AF5A]/25 pb-6 mb-8">
          <div className="space-y-2">
            <KingdomLogo size="sm" showLink={false} />
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#071B36] border border-[#D4AF5A]/30 text-[#D4AF5A] text-xs font-mono uppercase">
              <ShieldAlert className="w-3.5 h-3.5 text-[#D4AF5A]" />
              KINGDOM SUPER ADMIN OPERATIONS HUB ({loginEmail || 'superadmin@ahuja.com'})
            </div>
            <p className="text-xs text-[#9CA3AF] font-mono">
              URL: admin.ahuja-concert.com • Live Gate Throughput & Audit Trail
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs flex-wrap">
            <button
              onClick={fetchAdminData}
              className="px-4 py-2 bg-[#071B36] border border-[#D4AF5A]/30 text-white font-bold uppercase hover:border-[#D4AF5A] flex items-center gap-1.5 rounded-full transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> REFRESH
            </button>

            <button
              onClick={handleToggleSalesPause}
              className={`px-5 py-2 font-serif font-black text-xs uppercase tracking-wider flex items-center gap-2 rounded-full transition-all ${
                metrics?.salesPaused ? 'bg-emerald-600 text-black' : 'gold-gradient-bg text-[#070A0F] gold-border-glow'
              }`}
            >
              {metrics?.salesPaused ? <PlayCircle className="w-4 h-4" /> : <PauseCircle className="w-4 h-4" />}
              {metrics?.salesPaused ? 'RESUME SALES' : 'EMERGENCY PAUSE SALES'}
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-950/80 border border-red-500/50 text-red-300 font-bold uppercase hover:bg-red-900 flex items-center gap-1.5 rounded-full transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> LOGOUT
            </button>
          </div>
        </div>

        {actionMsg && (
          <div className="mb-6 p-4 bg-[#071B36] border border-[#D4AF5A]/40 text-white text-xs flex items-center gap-2 font-mono rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{actionMsg}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-[#D4AF5A]/20 pb-4 mb-8 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 border rounded-full transition-all ${activeTab === 'overview' ? 'border-[#D4AF5A] text-[#D4AF5A] bg-[#071B36]' : 'border-zinc-800 text-zinc-400 hover:border-[#D4AF5A]/40'}`}
          >
            OVERVIEW METRICS
          </button>
          <button
            onClick={() => setActiveTab('gates')}
            className={`px-4 py-2 border rounded-full transition-all ${activeTab === 'gates' ? 'border-[#D4AF5A] text-[#D4AF5A] bg-[#071B36]' : 'border-zinc-800 text-zinc-400 hover:border-[#D4AF5A]/40'}`}
          >
            LIVE GATE MONITORING
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`px-4 py-2 border rounded-full transition-all ${activeTab === 'tickets' ? 'border-[#D4AF5A] text-[#D4AF5A] bg-[#071B36]' : 'border-zinc-800 text-zinc-400 hover:border-[#D4AF5A]/40'}`}
          >
            TICKET CONFIG & PRICING
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`px-4 py-2 border rounded-full transition-all ${activeTab === 'emergency' ? 'border-[#D4AF5A] text-[#D4AF5A] bg-[#071B36]' : 'border-zinc-800 text-zinc-400 hover:border-[#D4AF5A]/40'}`}
          >
            EMERGENCY CONTROLS
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 border rounded-full transition-all ${activeTab === 'audit' ? 'border-[#D4AF5A] text-[#D4AF5A] bg-[#071B36]' : 'border-zinc-800 text-zinc-400 hover:border-[#D4AF5A]/40'}`}
          >
            SYSTEM AUDIT LOGS
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-zinc-500 text-xs font-mono">
            Loading real-time admin analytics...
          </div>
        ) : (
          <div>
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && metrics && (
              <div className="space-y-8">
                
                {/* Metric Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 bg-[#071B36] border border-[#D4AF5A]/30">
                    <div className="text-[10px] text-[#9CA3AF] flex items-center gap-1 font-mono uppercase">
                      <DollarSign className="w-3.5 h-3.5 text-[#D4AF5A]" /> TOTAL REVENUE
                    </div>
                    <div className="font-serif font-black text-3xl text-white mt-1">
                      ₹{metrics.totalRevenue.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-[#9CA3AF] mt-1 font-mono">PAID ORDERS: {metrics.paidOrdersCount}</div>
                  </div>

                  <div className="p-5 bg-[#071B36] border border-[#D4AF5A]/30">
                    <div className="text-[10px] text-[#9CA3AF] flex items-center gap-1 font-mono uppercase">
                      <Ticket className="w-3.5 h-3.5 text-[#D4AF5A]" /> TICKETS SOLD
                    </div>
                    <div className="font-serif font-black text-3xl text-[#E6C878] mt-1">
                      {metrics.totalSold} / {metrics.totalCapacity}
                    </div>
                    <div className="text-[10px] text-[#9CA3AF] mt-1 font-mono">REMAINING: {metrics.totalRemaining}</div>
                  </div>

                  <div className="p-5 bg-[#071B36] border border-[#D4AF5A]/30">
                    <div className="text-[10px] text-[#9CA3AF] flex items-center gap-1 font-mono uppercase">
                      <Users className="w-3.5 h-3.5 text-emerald-400" /> TOTAL GATE ENTRIES
                    </div>
                    <div className="font-serif font-black text-3xl text-emerald-400 mt-1">
                      {metrics.usedTicketsCount} ({metrics.entryPercentage}%)
                    </div>
                    <div className="text-[10px] text-[#9CA3AF] mt-1 font-mono">VALID READY: {metrics.validTicketsCount}</div>
                  </div>

                  <div className="p-5 bg-[#071B36] border border-[#D4AF5A]/30">
                    <div className="text-[10px] text-[#9CA3AF] flex items-center gap-1 font-mono uppercase">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#FF4A00]" /> REJECTED / DUPLICATES
                    </div>
                    <div className="font-serif font-black text-3xl text-[#FF4A00] mt-1">
                      {metrics.duplicateScansCount + metrics.invalidScansCount}
                    </div>
                    <div className="text-[10px] text-[#9CA3AF] mt-1 font-mono">
                      DUPLICATE: {metrics.duplicateScansCount} | INVALID: {metrics.invalidScansCount}
                    </div>
                  </div>
                </div>

                {/* Recent Scan Trail Table */}
                <div className="bg-[#071B36] border border-[#D4AF5A]/30 p-6">
                  <h3 className="font-serif font-bold text-white text-base tracking-wider uppercase mb-4">
                    LIVE GATE SCANNING LOGS (REAL-TIME STREAM)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="border-b border-[#D4AF5A]/20 text-[#9CA3AF] text-[10px]">
                        <tr>
                          <th className="py-2">TIMESTAMP</th>
                          <th className="py-2">TICKET NO</th>
                          <th className="py-2">GATE</th>
                          <th className="py-2">STAFF SCANNER</th>
                          <th className="py-2">RESULT</th>
                          <th className="py-2">MESSAGE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#D4AF5A]/15 text-[#E8E8E5]">
                        {data.recentScanLogs?.map((log: any) => (
                          <tr key={log.id}>
                            <td className="py-2.5 text-[#9CA3AF]">{new Date(log.scanned_at).toLocaleTimeString()}</td>
                            <td className="py-2.5 font-bold text-white">{log.ticket_number || 'INVALID'}</td>
                            <td className="py-2.5">{log.gate_name || 'Gate 1'}</td>
                            <td className="py-2.5">{log.staff_name || 'Staff'}</td>
                            <td className="py-2.5">
                              {log.result_status === 'VALID' && <span className="text-emerald-400 font-bold">✓ VALID</span>}
                              {log.result_status === 'ALREADY_USED' && <span className="text-[#FF4A00] font-bold">X DUPLICATE</span>}
                              {log.result_status === 'INVALID' && <span className="text-red-500 font-bold">X INVALID</span>}
                            </td>
                            <td className="py-2.5 text-[#9CA3AF] text-[11px]">{log.message}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* GATE MONITORING TAB */}
            {activeTab === 'gates' && metrics && (
              <div className="bg-[#071B36] border border-[#D4AF5A]/30 p-6 space-y-6">
                <h3 className="font-serif font-bold text-white text-xl tracking-wider uppercase">
                  LIVE ENTRANCE GATE METRICS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {metrics.gateMetrics?.map((gm: any) => (
                    <div key={gm.gate_id} className="bg-[#070A0F] p-5 border border-[#D4AF5A]/20 space-y-3">
                      <div className="flex items-center justify-between border-b border-[#D4AF5A]/15 pb-2">
                        <span className="font-bold text-white text-base font-serif">{gm.gate_name}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-500 font-mono">
                          ACTIVE SCANNER
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                        <div className="p-2 bg-[#071B36]">
                          <div className="text-[#9CA3AF] text-[9px]">ENTRIES</div>
                          <div className="font-bold text-emerald-400 text-lg">{gm.scanned_count}</div>
                        </div>
                        <div className="p-2 bg-[#071B36]">
                          <div className="text-[#9CA3AF] text-[9px]">DUPLICATES</div>
                          <div className="font-bold text-[#FF4A00] text-lg">{gm.duplicate_count}</div>
                        </div>
                        <div className="p-2 bg-[#071B36]">
                          <div className="text-[#9CA3AF] text-[9px]">INVALID</div>
                          <div className="font-bold text-red-500 text-lg">{gm.invalid_count}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TICKET CONFIG TAB */}
            {activeTab === 'tickets' && (
              <div className="bg-[#071B36] border border-[#D4AF5A]/30 p-6 space-y-6">
                <h3 className="font-serif font-bold text-white text-xl tracking-wider uppercase">
                  TICKET CATEGORIES & PRICING CONTROL
                </h3>
                <div className="space-y-4">
                  {data.ticketTypes?.map((tt: any) => (
                    <div key={tt.id} className="p-4 bg-[#070A0F] border border-[#D4AF5A]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
                      <div>
                        <div className="font-bold text-white text-base font-serif">{tt.name}</div>
                        <div className="text-xs text-[#9CA3AF]">SOLD: {tt.sold_count} / CAPACITY: {tt.capacity}</div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div>
                          <span className="text-[10px] text-[#9CA3AF] block">PRICE (₹)</span>
                          <input
                            type="number"
                            defaultValue={tt.price}
                            onChange={(e) => setEditPrice(e.target.value)}
                            className="w-24 bg-[#071B36] border border-[#D4AF5A]/30 text-white px-2 py-1 text-xs"
                          />
                        </div>

                        <div>
                          <span className="text-[10px] text-[#9CA3AF] block">CAPACITY</span>
                          <input
                            type="number"
                            defaultValue={tt.capacity}
                            onChange={(e) => setEditCapacity(e.target.value)}
                            className="w-24 bg-[#071B36] border border-[#D4AF5A]/30 text-white px-2 py-1 text-xs"
                          />
                        </div>

                        <button
                          onClick={() => handleUpdateCategoryConfig(tt.id)}
                          className="mt-4 px-4 py-1.5 gold-gradient-bg text-[#070A0F] font-bold text-xs uppercase"
                        >
                          SAVE
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EMERGENCY CONTROLS TAB */}
            {activeTab === 'emergency' && (
              <div className="bg-[#071B36] border border-[#D4AF5A]/30 p-6 space-y-6">
                <div className="p-4 bg-[#070A0F] border border-[#D4AF5A]/30 text-white text-xs font-mono">
                  <h4 className="font-bold text-base text-[#D4AF5A] mb-1">EMERGENCY SUPER ADMIN CONTROLS</h4>
                  <p>All actions in this portal are cryptographically logged to the audit log.</p>
                </div>

                <div className="space-y-4">
                  <div className="p-5 bg-[#070A0F] border border-[#D4AF5A]/20 flex items-center justify-between font-mono">
                    <div>
                      <div className="font-bold text-white">PAUSE ENTIRE TICKET SALES ENGINE</div>
                      <div className="text-xs text-[#9CA3AF]">Instantly blocks all new checkout reservations across the website.</div>
                    </div>
                    <button
                      onClick={handleToggleSalesPause}
                      className="px-6 py-2.5 bg-[#FF4A00] text-black font-bold text-xs uppercase"
                    >
                      TOGGLE PAUSE
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SYSTEM AUDIT LOGS TAB */}
            {activeTab === 'audit' && (
              <div className="bg-[#071B36] border border-[#D4AF5A]/30 p-6 space-y-4">
                <h3 className="font-serif font-bold text-white text-xl tracking-wider uppercase">
                  APPEND-ONLY SYSTEM AUDIT LOGS
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="border-b border-[#D4AF5A]/20 text-[#9CA3AF] text-[10px]">
                      <tr>
                        <th className="py-2">TIMESTAMP</th>
                        <th className="py-2">ACTOR</th>
                        <th className="py-2">ACTION</th>
                        <th className="py-2">ENTITY TYPE</th>
                        <th className="py-2">ENTITY ID</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D4AF5A]/15 text-[#E8E8E5]">
                      {auditLogs.map((log: any) => (
                        <tr key={log.id}>
                          <td className="py-2.5 text-[#9CA3AF]">{new Date(log.created_at).toLocaleString()}</td>
                          <td className="py-2.5 font-bold text-white">{log.actor_email}</td>
                          <td className="py-2.5 text-[#D4AF5A] font-bold">{log.action}</td>
                          <td className="py-2.5">{log.entity_type}</td>
                          <td className="py-2.5 text-[#9CA3AF]">{log.entity_id}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
