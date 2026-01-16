import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { Providers } from './providers';

// Load fonts exactly as requested in your HTML
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta' 
});

const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter' 
});

export const metadata: Metadata = {
  title: 'Noble Dental Care - Dentist in Nallagandla',
  description: 'Evidence-based procedures designed for biological longevity and patient comfort.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${jakarta.variable} ${inter.variable} font-sans antialiased bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-white transition-colors duration-300`}>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
