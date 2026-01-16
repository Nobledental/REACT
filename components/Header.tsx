'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon, CalendarCheck, ShoppingBag, Activity } from 'lucide-react';

interface HeaderProps {
  onBookClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // Prevent hydration mismatch for theme icons
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Helper to check if link is active
  const isActive = (path: string) => pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-out ${
        isScrolled 
          ? 'bg-white/70 dark:bg-[#0B1019]/80 backdrop-blur-xl shadow-lg border-b border-slate-200/50 dark:border-white/10 py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group z-50">
             <div className="relative w-12 h-10 transition-all duration-500 group-hover:scale-110">
               {/* Note: Ensure this image exists in your /public/images folder */}
               <img src="/images/dentalcare.nallagandla.png" alt="Noble Dental" className="w-full h-full object-contain filter drop-shadow-md" />
             </div>
             <div className="flex flex-col border-l-2 border-slate-200 dark:border-white/10 pl-3">
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none">NOBLE <span className="text-blue-600 dark:text-cyan-400">DENTAL</span></span>
                <span className="text-[9px] font-black tracking-[0.3em] text-slate-500 dark:text-slate-400 uppercase">Care</span>
             </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/50 dark:bg-white/5 p-1.5 rounded-full border border-slate-200/50 dark:border-white/10 backdrop-blur-md">
            <Link
              href="/"
              className={`relative px-6 py-2.5 text-[13px] font-bold uppercase tracking-wider transition-all duration-300 rounded-full ${
                isActive('/') ? 'text-white bg-blue-600 shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              href="/treatments"
              className={`relative px-6 py-2.5 text-[13px] font-bold uppercase tracking-wider transition-all duration-300 rounded-full ${
                isActive('/treatments') ? 'text-white bg-blue-600 shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Treatments
            </Link>
            <Link
              href="/team"
              className={`relative px-6 py-2.5 text-[13px] font-bold uppercase tracking-wider transition-all duration-300 rounded-full ${
                isActive('/team') ? 'text-white bg-blue-600 shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Our Team
            </Link>
            
            <Link 
              href="/products"
              className={`px-6 py-2.5 text-[13px] font-black uppercase tracking-wider rounded-full flex items-center gap-2 transition-all ${
                isActive('/products') ? 'bg-indigo-600 text-white shadow-lg' : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
              }`}
            >
              <ShoppingBag size={14} /> Pharmacy
            </Link>
            <Link 
              href="/healthflo-ai"
              className={`px-6 py-2.5 text-[13px] font-black uppercase tracking-wider rounded-full flex items-center gap-2 transition-all ${
                isActive('/healthflo-ai') ? 'bg-blue-600 text-white' : 'text-blue-600 dark:text-cyan-400'
              }`}
            >
              <Activity size={14} /> AI OS
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
              className="w-11 h-11 rounded-2xl flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white transition-all hover:bg-slate-200 dark:hover:bg-white/10"
            >
              {mounted && (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />)}
            </button>
            
            <button 
              onClick={onBookClick} 
              className="hidden sm:flex h-12 items-center gap-2 rounded-2xl bg-blue-600 px-7 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl hover:-translate-y-1 transition-all"
            >
              <CalendarCheck size={18} /> Book Now
            </button>
            
            <button className="lg:hidden w-11 h-11 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white/95 dark:bg-[#0B1019]/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-200">
           <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-900 dark:text-white">Home</Link>
           <Link href="/treatments" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-900 dark:text-white">Treatments</Link>
           <Link href="/team" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-slate-900 dark:text-white">Our Team</Link>
           <Link href="/healthflo-ai" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-blue-600">AI HealthOS</Link>
           <button onClick={() => { setIsMobileMenuOpen(false); onBookClick?.(); }} className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold uppercase tracking-widest text-sm">
              Book Appointment
           </button>
        </div>
      )}
    </header>
  );
};

export default Header;
