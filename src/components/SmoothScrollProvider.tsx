'use client';

import React, { useEffect, createContext, useContext, useState } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: Parameters<Lenis['scrollTo']>[1]) => void;
  scrollProgress: number;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
  scrollProgress: 0,
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Lenis smooth scroll instance
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential smooth easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    });

    setLenis(lenisInstance);

    // Scroll progress handler & animation loop
    const handleScroll = (e: { progress: number }) => {
      setScrollProgress(e.progress);
    };

    lenisInstance.on('scroll', handleScroll);

    let animationFrameId: number;
    function raf(time: number) {
      lenisInstance.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Intercept anchor link clicks for smooth Lenis scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          lenisInstance.scrollTo(element as HTMLElement, {
            offset: -80,
            duration: 1.2,
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('click', handleAnchorClick);
      lenisInstance.destroy();
    };
  }, []);

  // Reset scroll position smooth top on route change
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  const scrollTo = (target: string | HTMLElement | number, options?: Parameters<Lenis['scrollTo']>[1]) => {
    if (lenis) {
      if (typeof target === 'string' && target.startsWith('#')) {
        const el = document.querySelector(target);
        if (el) {
          lenis.scrollTo(el as HTMLElement, { offset: -80, ...options });
          return;
        }
      }
      lenis.scrollTo(target, options);
    } else {
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis, scrollTo, scrollProgress }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
