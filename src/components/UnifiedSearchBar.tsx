'use client';

import React, { useState } from 'react';
import KingdomLogo from '@/components/KingdomLogo';
import { 
  Plane, 
  Train, 
  Bus, 
  Film, 
  Ticket, 
  Search, 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { BookingCategory } from '@/lib/types';

interface UnifiedSearchBarProps {
  onSearch?: (category: BookingCategory, query: any) => void;
  onCategorySelect?: (category: BookingCategory) => void;
}

export default function UnifiedSearchBar({ onSearch, onCategorySelect }: UnifiedSearchBarProps) {
  const [activeCategory, setActiveCategory] = useState<BookingCategory>('EVENTS');

  // Form states
  const [fromLocation, setFromLocation] = useState('Mumbai (BOM)');
  const [toLocation, setToLocation] = useState('Dubai (DXB)');
  const [travelDate, setTravelDate] = useState('2026-10-31');
  const [passengers, setPassengers] = useState('1 Passenger, Economy');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchSuccess, setSearchSuccess] = useState(false);

  const handleTabClick = (category: BookingCategory, targetId: string) => {
    setActiveCategory(category);
    if (onCategorySelect) onCategorySelect(category);

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchSuccess(true);
    setTimeout(() => setSearchSuccess(false), 3000);

    const queryData = {
      from: fromLocation,
      to: toLocation,
      date: travelDate,
      passengers,
      keyword: searchKeyword,
      category: activeCategory
    };

    if (onSearch) onSearch(activeCategory, queryData);

    // Scroll to relevant section
    let targetSection = 'featured';
    if (activeCategory === 'FLIGHT' || activeCategory === 'TRAIN' || activeCategory === 'BUS') {
      targetSection = 'travel';
    } else if (activeCategory === 'MOVIE') {
      targetSection = 'movies';
    } else if (activeCategory === 'EVENTS') {
      targetSection = 'featured';
    }

    const targetEl = document.getElementById(targetSection);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
      <div className="bg-[#071B36]/90 border border-[#D4AF5A]/40 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_15px_50px_rgba(7,27,54,0.8)] gold-border-glow">
        
        {/* Header Branding */}
        <div className="text-center mb-8 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <KingdomLogo size="sm" showLink={false} />
            <span className="text-[#D4AF5A] font-serif font-extrabold text-sm sm:text-base tracking-[0.2em] uppercase">
              CELESTIA BOOKING & ENTERTAINMENT
            </span>
          </div>
          
          <h2 className="font-serif font-black text-2xl sm:text-4xl text-white tracking-wider uppercase">
            WHAT ARE YOU <span className="gold-gradient-text">LOOKING FOR?</span>
          </h2>
          <p className="text-xs text-[#9CA3AF] font-mono uppercase tracking-widest">
            EXPLORE FLIGHTS, TRAINS, BUSES, MOVIES & LIVE EXPERIENCES
          </p>
        </div>

        {/* 5 CATEGORY SELECTOR TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          
          {/* FLIGHTS */}
          <button
            type="button"
            onClick={() => handleTabClick('FLIGHT', 'travel')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeCategory === 'FLIGHT'
                ? 'gold-gradient-bg text-[#070A0F] shadow-[0_0_20px_rgba(212,175,90,0.5)] scale-105'
                : 'bg-[#070A0F]/80 text-[#E8E8E5] border border-[#D4AF5A]/25 hover:border-[#D4AF5A]/60 hover:bg-[#071B36]'
            }`}
          >
            <Plane className={`w-4 h-4 ${activeCategory === 'FLIGHT' ? 'text-[#070A0F]' : 'text-[#D4AF5A]'}`} />
            <span>[ Flights ]</span>
          </button>

          {/* TRAINS */}
          <button
            type="button"
            onClick={() => handleTabClick('TRAIN', 'travel')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeCategory === 'TRAIN'
                ? 'gold-gradient-bg text-[#070A0F] shadow-[0_0_20px_rgba(212,175,90,0.5)] scale-105'
                : 'bg-[#070A0F]/80 text-[#E8E8E5] border border-[#D4AF5A]/25 hover:border-[#D4AF5A]/60 hover:bg-[#071B36]'
            }`}
          >
            <Train className={`w-4 h-4 ${activeCategory === 'TRAIN' ? 'text-[#070A0F]' : 'text-[#D4AF5A]'}`} />
            <span>[ Trains ]</span>
          </button>

          {/* BUSES */}
          <button
            type="button"
            onClick={() => handleTabClick('BUS', 'travel')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeCategory === 'BUS'
                ? 'gold-gradient-bg text-[#070A0F] shadow-[0_0_20px_rgba(212,175,90,0.5)] scale-105'
                : 'bg-[#070A0F]/80 text-[#E8E8E5] border border-[#D4AF5A]/25 hover:border-[#D4AF5A]/60 hover:bg-[#071B36]'
            }`}
          >
            <Bus className={`w-4 h-4 ${activeCategory === 'BUS' ? 'text-[#070A0F]' : 'text-[#D4AF5A]'}`} />
            <span>[ Buses ]</span>
          </button>

          {/* MOVIES */}
          <button
            type="button"
            onClick={() => handleTabClick('MOVIE', 'movies')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeCategory === 'MOVIE'
                ? 'gold-gradient-bg text-[#070A0F] shadow-[0_0_20px_rgba(212,175,90,0.5)] scale-105'
                : 'bg-[#070A0F]/80 text-[#E8E8E5] border border-[#D4AF5A]/25 hover:border-[#D4AF5A]/60 hover:bg-[#071B36]'
            }`}
          >
            <Film className={`w-4 h-4 ${activeCategory === 'MOVIE' ? 'text-[#070A0F]' : 'text-[#D4AF5A]'}`} />
            <span>[ Movies ]</span>
          </button>

          {/* EVENTS */}
          <button
            type="button"
            onClick={() => handleTabClick('EVENTS', 'featured')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeCategory === 'EVENTS'
                ? 'gold-gradient-bg text-[#070A0F] shadow-[0_0_20px_rgba(212,175,90,0.5)] scale-105'
                : 'bg-[#070A0F]/80 text-[#E8E8E5] border border-[#D4AF5A]/25 hover:border-[#D4AF5A]/60 hover:bg-[#071B36]'
            }`}
          >
            <Ticket className={`w-4 h-4 ${activeCategory === 'EVENTS' ? 'text-[#070A0F]' : 'text-[#D4AF5A]'}`} />
            <span>[ Events ]</span>
          </button>

        </div>

        {/* DYNAMIC FORM FOR SELECTED CATEGORY */}
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          
          {(activeCategory === 'FLIGHT' || activeCategory === 'TRAIN' || activeCategory === 'BUS') && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-sans text-xs">
              
              {/* FROM */}
              <div className="bg-[#070A0F] border border-[#D4AF5A]/30 p-3 rounded-2xl flex flex-col justify-center">
                <span className="text-[10px] text-[#D4AF5A] font-mono uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#D4AF5A]" /> FROM CITY / HUB
                </span>
                <input
                  type="text"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="bg-transparent text-white font-bold text-sm mt-1 focus:outline-none"
                  placeholder="e.g. Mumbai (BOM)"
                />
              </div>

              {/* TO */}
              <div className="bg-[#070A0F] border border-[#D4AF5A]/30 p-3 rounded-2xl flex flex-col justify-center">
                <span className="text-[10px] text-[#D4AF5A] font-mono uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#D4AF5A]" /> DESTINATION
                </span>
                <input
                  type="text"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="bg-transparent text-white font-bold text-sm mt-1 focus:outline-none"
                  placeholder="e.g. Dubai (DXB)"
                />
              </div>

              {/* DATE */}
              <div className="bg-[#070A0F] border border-[#D4AF5A]/30 p-3 rounded-2xl flex flex-col justify-center">
                <span className="text-[10px] text-[#D4AF5A] font-mono uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#D4AF5A]" /> DEPARTURE DATE
                </span>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="bg-transparent text-white font-bold text-sm mt-1 focus:outline-none"
                />
              </div>

              {/* PASSENGERS / CLASS */}
              <div className="bg-[#070A0F] border border-[#D4AF5A]/30 p-3 rounded-2xl flex flex-col justify-center">
                <span className="text-[10px] text-[#D4AF5A] font-mono uppercase tracking-wider flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#D4AF5A]" /> PASSENGERS / CLASS
                </span>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="bg-[#070A0F] text-white font-bold text-sm mt-1 focus:outline-none cursor-pointer"
                >
                  <option value="1 Passenger, Economy">1 Guest • Economy</option>
                  <option value="1 Passenger, Business">1 Guest • Business Class</option>
                  <option value="1 Passenger, First Class">1 Guest • Royal First Class</option>
                  <option value="2 Passengers, Couple Suite">2 Guests • Couple Suite</option>
                </select>
              </div>

            </div>
          )}

          {activeCategory === 'MOVIE' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans text-xs">
              
              <div className="bg-[#070A0F] border border-[#D4AF5A]/30 p-3 rounded-2xl flex flex-col justify-center md:col-span-2">
                <span className="text-[10px] text-[#D4AF5A] font-mono uppercase tracking-wider flex items-center gap-1">
                  <Film className="w-3 h-3 text-[#D4AF5A]" /> SEARCH MOVIES, GENRES OR CINEMAS
                </span>
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="bg-transparent text-white font-bold text-sm mt-1 focus:outline-none"
                  placeholder="e.g. Cyberpunk 2099, Dune: Prophecy, Kingdom CyberPlex BKC..."
                />
              </div>

              <div className="bg-[#070A0F] border border-[#D4AF5A]/30 p-3 rounded-2xl flex flex-col justify-center">
                <span className="text-[10px] text-[#D4AF5A] font-mono uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#D4AF5A]" /> SHOW DATE
                </span>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="bg-transparent text-white font-bold text-sm mt-1 focus:outline-none"
                />
              </div>

            </div>
          )}

          {activeCategory === 'EVENTS' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans text-xs">
              
              <div className="bg-[#070A0F] border border-[#D4AF5A]/30 p-3 rounded-2xl flex flex-col justify-center md:col-span-2">
                <span className="text-[10px] text-[#D4AF5A] font-mono uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#D4AF5A]" /> SEARCH CONCERTS, ARTISTS OR ARENAS
                </span>
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="bg-transparent text-white font-bold text-sm mt-1 focus:outline-none"
                  placeholder="e.g. Nocturne Velocity, Vex & Synth Syndicate, Cyberdome Mumbai..."
                />
              </div>

              <div className="bg-[#070A0F] border border-[#D4AF5A]/30 p-3 rounded-2xl flex flex-col justify-center">
                <span className="text-[10px] text-[#D4AF5A] font-mono uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#D4AF5A]" /> CITY LOCATION
                </span>
                <select
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="bg-[#070A0F] text-white font-bold text-sm mt-1 focus:outline-none cursor-pointer"
                >
                  <option value="Mumbai (BOM)">Mumbai • Cyberdome Arena</option>
                  <option value="Berlin (BER)">Berlin • Kraftwerk Dome</option>
                  <option value="Tokyo (HND)">Tokyo • Shinagawa Hall</option>
                  <option value="London (LHR)">London • O2 Arena Wing</option>
                </select>
              </div>

            </div>
          )}

          {/* SEARCH SUBMIT BUTTON */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#9CA3AF] font-mono">
              <span className="text-[#D4AF5A] font-bold">POPULAR SEARCHES:</span>
              <button
                type="button"
                onClick={() => { setFromLocation('Mumbai (BOM)'); setToLocation('Dubai (DXB)'); handleTabClick('FLIGHT', 'travel'); }}
                className="hover:text-white underline decoration-[#D4AF5A]/40"
              >
                Mumbai → Dubai
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => { handleTabClick('EVENTS', 'featured'); }}
                className="hover:text-white underline decoration-[#D4AF5A]/40"
              >
                Nocturne Velocity World Tour
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => { handleTabClick('MOVIE', 'movies'); }}
                className="hover:text-white underline decoration-[#D4AF5A]/40"
              >
                Cyberpunk 2099 IMAX 3D
              </button>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 gold-gradient-bg text-[#070A0F] font-black text-xs uppercase tracking-widest rounded-full shadow-[0_0_25px_rgba(212,175,90,0.4)] hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-[#070A0F]" />
              <span>SEARCH {activeCategory} & REVEAL TICKETS</span>
              <ArrowRight className="w-4 h-4 text-[#070A0F]" />
            </button>

          </div>

        </form>

        {searchSuccess && (
          <div className="mt-4 p-3 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono rounded-xl flex items-center gap-2 justify-center animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Search Filter Applied! Navigating to available inventory...</span>
          </div>
        )}

      </div>
    </section>
  );
}
