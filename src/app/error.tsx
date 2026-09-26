'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#070A0F] flex items-center justify-center p-6 text-center font-sans text-[#E8E8E5]">
      <div className="max-w-md bg-[#071B36]/80 border border-[#D4AF5A]/30 p-8 space-y-4 rounded-3xl backdrop-blur-md">
        <h2 className="font-serif font-black text-2xl text-white uppercase">SOMETHING WENT WRONG</h2>
        <p className="text-xs text-[#9CA3AF]">An unhandled exception occurred in the application view layer.</p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => reset()}
            variant="primary"
            size="sm"
          >
            TRY AGAIN
          </Button>
          <Button
            href="/"
            variant="secondary"
            size="sm"
          >
            RETURN HOME
          </Button>
        </div>
      </div>
    </div>
  );
}
