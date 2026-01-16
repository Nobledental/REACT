'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon, CalendarCheck, ShoppingBag, Activity } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Treatments', href: '/treatments' },
    { name: 'Our Team', href: '/team' },
  ];

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
          
          <Link href="/" className="flex items-center gap-3 group z-50">
             <div className="flex flex-col border-l-2 border-slate-200 dark:border-white/10 pl-3">
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none">NOBLE <span className="text-blue-600 dark:text-cyan-400">DENTAL</span></span>
                <span className="text-[9px] font-black tracking-[0.3em] text-slate-500 dark:text-slate-400 uppercase">Care</span>
             </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/50 dark:bg-white/5 p-1.5 rounded-full border border-slate-200/50 dark:border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-6 py-2.5 text-[13px] font-bold uppercase tracking-wider transition-all duration-300 rounded-full ${
                    isActive(link.href) ? 'text-white bg-blue-600 shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
              className="w-11 h-11 rounded-2xl flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white transition-all"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="hidden sm:flex h-12 items-center gap-2 rounded-2xl bg-blue-600 px-7 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl hover:-translate-y-1 transition-all">
              <CalendarCheck size={18} /> Book Now
            </button>
            <button className="lg:hidden w-11 h-11 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
