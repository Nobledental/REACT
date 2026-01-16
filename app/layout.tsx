'use client';

// app/layout.tsx
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget'; // You'll need to create this file
import BookingModal from '@/components/BookingModal';
import { Providers } from './providers';
import { useState } from 'react';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${jakarta.variable} ${inter.variable} font-sans antialiased bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-white transition-colors duration-300`}>
        <Providers>
          {/* Header gets the openBooking function */}
          <Header onBookClick={openBooking} />
          
          <main>{children}</main>
          
          <Footer onBookClick={openBooking} />
          
          {/* Global Widgets */}
          <ChatWidget />
          <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        </Providers>
      </body>
    </html>
  );
}
