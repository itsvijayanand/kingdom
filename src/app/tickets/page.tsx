import React from 'react';
import TicketSelector from '@/components/TicketSelector';
import ScrollReveal from '@/components/ScrollReveal';

export default function TicketsPage() {
  return (
    <div className="pt-28 pb-20 bg-[#050505] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <TicketSelector />
        </ScrollReveal>
      </div>
    </div>
  );
}
