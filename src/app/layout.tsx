import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import ScrollProgressBar from "@/components/ScrollProgressBar";

export const metadata: Metadata = {
  title: "CELESTIA BOOKING | Universal Travel, Movies & Event Portal",
  description: "Official ticketing and booking platform by Celestia Booking. Flights, train tickets, bus passes, cinema showtimes, and live event passes.",
  keywords: ["Celestia Booking", "flight booking", "train tickets", "bus passes", "movie tickets", "concert passes"],
  openGraph: {
    title: "CELESTIA BOOKING | Universal Travel, Movies & Event Portal",
    description: "Book flights, trains, buses, cinema tickets, and live concerts on Celestia Booking.",
    images: ["https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#050505] text-[#F3F3F7] selection:bg-[#FF1010] selection:text-white">
        <SmoothScrollProvider>
          <ScrollProgressBar />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
