'use client';

import React from 'react';
import { useSmoothScroll } from './SmoothScrollProvider';

export default function ScrollProgressBar() {
  const { scrollProgress } = useSmoothScroll();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#D4AF5A] via-[#E6C878] to-[#F2DFA0] shadow-[0_0_10px_rgba(212,175,90,0.8)] transition-transform ease-out duration-150 origin-left"
        style={{
          transform: `scaleX(${scrollProgress})`,
        }}
      />
    </div>
  );
}
