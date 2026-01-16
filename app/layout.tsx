import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Roboto, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { Providers } from './providers';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' });
const roboto = Roboto({ weight: ['100', '300', '400', '700', '900'], subsets: ['latin'], variable: '--font-roboto' });
const poppins = Poppins({ weight: ['300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'], variable: '--font-poppins' });

export const metadata: Metadata = {
  title: 'Noble Dental Care | Biological Precision',
  description: 'Evidence-based procedures designed for biological longevity and patient comfort.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.variable} ${roboto.variable} ${poppins.variable} font-sans antialiased bg-slate-50 dark:bg-[#020617] transition-colors duration-500`}>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
