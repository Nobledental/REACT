'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Briefcase, Mail, ArrowRight } from 'lucide-react';
import Doctors from '@/components/Doctors';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] font-sans transition-colors duration-500 overflow-x-hidden pt-32 pb-20">
      
      {/* 1. Cinematic Page Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors uppercase text-[10px] font-black tracking-[0.3em] mb-12">
            <ArrowLeft size={16}/> Back Home
        </Link>
        
        <RevealOnScroll>
          <header className="relative z-10">
            <h1 className="text-6xl md:text-[9rem] font-black text-slate-900 dark:text-white leading-[0.85] tracking-tighter mb-10">
              The <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 animate-gradient-x">Visionaries.</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between max-w-5xl">
               <p className="text-2xl text-slate-500 dark:text-slate-400 max-w-xl font-medium leading-tight">
                 Meet the architects of your smile. A multidisciplinary council of surgeons, scientists, and artists.
               </p>
               <div className="hidden md:block h-px flex-1 bg-slate-200 dark:bg-white/10 mb-2"></div>
               <div className="text-right hidden md:block">
                  <div className="text-4xl font-black text-slate-900 dark:text-white">100%</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">MDS Certified</div>
               </div>
            </div>
          </header>
        </RevealOnScroll>
      </div>

      {/* 2. The Doctors Grid (Reusing your powerful component) */}
      <Doctors />

      {/* 3. "Join the Team" Footer CTA */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <RevealOnScroll>
           <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden group">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] group-hover:scale-125 transition-transform duration-1000"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
                 <div>
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white font-bold text-[10px] uppercase tracking-widest mb-6">
                       <Briefcase size={14} /> Careers at Noble
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">Are you a clinical <br/> perfectionist?</h2>
                    <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                       We are always looking for exceptional talent to join our surgical and administrative teams.
                    </p>
                 </div>

                 <div className="flex flex-col gap-4 w-full md:w-auto">
                    <a href="mailto:careers@nobledental.com" className="flex items-center justify-between gap-8 px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-all shadow-xl group/btn">
                       <span className="flex flex-col text-left">
                          <span className="text-[10px] uppercase tracking-widest opacity-80">Send CV</span>
                          <span className="font-black text-lg">careers@nobledental.com</span>
                       </span>
                       <Mail size={24} className="group-hover/btn:rotate-12 transition-transform" />
                    </a>
                    <div className="flex items-center justify-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
                       <span>Current Openings:</span>
                       <span className="text-white">Front Desk Manager</span>
                    </div>
                 </div>
              </div>
           </div>
        </RevealOnScroll>
      </div>

    </div>
  );
}
