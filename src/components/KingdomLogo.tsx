'use client';

import React from 'react';
import Link from 'next/link';

interface KingdomLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showLink?: boolean;
}

export default function KingdomLogo({ size = 'md', showLink = true }: KingdomLogoProps) {
  const sizeClasses = {
    sm: {
      title: 'text-xl tracking-[0.2em]',
      subtitle: 'text-[7px] tracking-[0.35em]',
      star: 'w-2 h-2',
      divider: 'w-8 h-[1px]',
      gap: 'gap-1',
    },
    md: {
      title: 'text-2xl sm:text-3xl tracking-[0.25em]',
      subtitle: 'text-[9px] tracking-[0.4em]',
      star: 'w-2.5 h-2.5',
      divider: 'w-12 h-[1px]',
      gap: 'gap-1.5',
    },
    lg: {
      title: 'text-4xl sm:text-6xl tracking-[0.3em]',
      subtitle: 'text-xs tracking-[0.45em]',
      star: 'w-3.5 h-3.5',
      divider: 'w-20 h-[1.5px]',
      gap: 'gap-2.5',
    },
  };

  const currentSize = sizeClasses[size];

  const logoContent = (
    <div className={`flex flex-col items-center justify-center text-center ${currentSize.gap} group select-none`}>
      {/* Main KINGDOM Title with Diamond Star Over 'I' */}
      <div className="relative inline-flex items-center">
        <span className={`font-serif font-extrabold gold-gradient-text uppercase drop-shadow-md ${currentSize.title}`}>
          K<span className="relative">I<span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[#E6C878] text-[80%] font-normal">✦</span></span>NGDOM
        </span>
      </div>

      {/* Gold Divider Line with Center Diamond Star */}
      <div className="flex items-center justify-center gap-2 text-[#D4AF5A]/70">
        <div className={`bg-gradient-to-r from-transparent via-[#D4AF5A] to-transparent ${currentSize.divider}`} />
        <span className="text-[#E6C878] text-[10px]">✦</span>
        <div className={`bg-gradient-to-r from-transparent via-[#D4AF5A] to-transparent ${currentSize.divider}`} />
      </div>

      {/* Subtitle */}
      <span className={`font-sans font-bold text-[#E6C878] uppercase ${currentSize.subtitle}`}>
        EVENTS AND ENTERTAINMENT
      </span>
    </div>
  );

  if (showLink) {
    return (
      <Link href="/" className="inline-block hover:opacity-95 transition-opacity">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
