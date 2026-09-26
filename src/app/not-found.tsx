import React from 'react';
import { Button } from '@/components/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070A0F] flex items-center justify-center p-6 text-center font-sans text-[#E8E8E5]">
      <div className="max-w-md bg-[#071B36]/80 border border-[#D4AF5A]/30 p-8 space-y-4 rounded-3xl backdrop-blur-md">
        <span className="text-xs text-[#D4AF5A] font-bold font-mono tracking-widest uppercase">// 404 NOT FOUND</span>
        <h2 className="font-serif font-black text-3xl text-white uppercase">PAGE NOT FOUND</h2>
        <p className="text-xs text-[#9CA3AF]">The requested URL or ticket resource does not exist in our active routing table.</p>
        <div className="pt-2">
          <Button
            href="/"
            variant="primary"
            size="md"
          >
            RETURN TO HOMEPAGE
          </Button>
        </div>
      </div>
    </div>
  );
}
