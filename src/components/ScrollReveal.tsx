'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: 'fade-up' | 'fade-down' | 'fade-in' | 'scale-up' | 'slide-left' | 'slide-right';
  duration?: number; // in ms
  delay?: number; // in ms
  threshold?: number; // 0 to 1
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  duration = 800,
  delay = 0,
  threshold = 0.15,
  className = '',
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  // Compute transform & opacity styles based on visibility
  const getInitialStyles = () => {
    switch (variant) {
      case 'fade-up':
        return 'translate-y-12 opacity-0';
      case 'fade-down':
        return '-translate-y-12 opacity-0';
      case 'fade-in':
        return 'opacity-0';
      case 'scale-up':
        return 'scale-95 opacity-0';
      case 'slide-left':
        return '-translate-x-12 opacity-0';
      case 'slide-right':
        return 'translate-x-12 opacity-0';
      default:
        return 'translate-y-12 opacity-0';
    }
  };

  const getVisibleStyles = () => {
    return 'translate-y-0 translate-x-0 scale-100 opacity-100';
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', // Smooth luxury ease-out curve
      }}
      className={`transition-all transform will-change-[transform,opacity] ${
        isVisible ? getVisibleStyles() : getInitialStyles()
      } ${className}`}
    >
      {children}
    </div>
  );
}
