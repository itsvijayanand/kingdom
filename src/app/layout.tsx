import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "NOCTURNE VELOCITY 2026 | Official Live Concert & Ticketing",
  description: "Official ticketing platform for Nocturne Velocity Live World Tour 2026. Cryptographically secured digital tickets, Razorpay checkout, and real-time gate validation.",
  keywords: ["concert tickets", "live music", "Nocturne Velocity", "Cyberdome Arena", "Mumbai concert"],
  openGraph: {
    title: "NOCTURNE VELOCITY 2026 | Official Live Concert & Ticketing",
    description: "Secure your tickets for the largest darkwave industrial audio-visual odyssey of 2026.",
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
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
