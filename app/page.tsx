'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, Sparkles, Heart, Calendar, Megaphone, Activity, Bot, Shield } from 'lucide-react';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// Placeholder imports - we need the files for these next!
import About from '@/components/About';
import MissionValues from '@/components/MissionValues';
import Gallery from '@/components/Gallery';
import Doctors from '@/components/Doctors';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Credentials from '@/components/Credentials';

export default function Home() {
  const offers = [
    { text: "Braces Treatment starting at ₹35,000 only!", icon: Zap },
    { text: "Medical Grade Scaling & Tooth Cleaning at ₹1,500", icon: Sparkles },
    { text: "Premium In-house Clear Aligners at ₹950 per tray", icon: Heart },
    { text: "Limited Slots Available for Implants! Book Now.", icon: Calendar }
  ];

  return (
    <>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. News Ticker */}
      <div className="w-full bg-slate-900 py-6 relative z-20 overflow-hidden border-y border-white/5">
        <div className="relative flex items-center">
           <div className="absolute left-6 z-30 bg-blue-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-2xl shadow-blue-500/40">
              <Megaphone size={14} fill="currentColor" /> Live Offers
           </div>
           
           {/* Marquee Animation */}
           <div className="flex whitespace-nowrap overflow-hidden mask-gradient-x">
              <div className="flex gap-20 items-center animate-scroll pl-[200px]">
                 {[...Array(2)].map((_, groupIdx) => (
                    <React.Fragment key={groupIdx}>
                       {offers.map((offer, idx) => (
                          <div key={idx} className="flex items-center gap-5">
                             <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-500 border border-white/10">
                                <offer.icon size={20} />
                             </div>
                             <span className="text-lg font-black tracking-tight text-white uppercase opacity-90">
                                {offer.text}
                             </span>
                             <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                          </div>
                       ))}
                    </React.Fragment>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* 3. Healthflo AI Promo */}
      <RevealOnScroll>
        <div className="max-w-7xl mx-auto px-6 py-20">
            <Link href="/healthflo-ai" className="block group cursor-pointer">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[3rem] p-10 md:p-20 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-1000"></div>
                    
                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md mb-6 border border-white/30 text-xs font-bold uppercase tracking-widest">
                                <Activity size={14}/> Healthflo: Dental OS
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
                                AI Clinical <br/> Self-Check.
                            </h2>
                            <p className="text-xl text-blue-100 mb-10 font-medium leading-relaxed">
                                Experience the world's most advanced dental copilot. Analyze signs, calculate treatment costs, and get expert clinical guidance in seconds.
                            </p>
                            <button className="px-12 py-5 bg-white text-blue-600 rounded-full font-black uppercase text-xs tracking-widest shadow-2xl group-hover:translate-x-2 transition-all flex items-center gap-2">
                                Launch Dental OS <Sparkles size={16}/>
                            </button>
                        </div>
                        
                        <div className="hidden lg:flex justify-center">
                            <div className="w-72 h-72 rounded-[3rem] bg-white/5 backdrop-blur-3xl border border-white/20 flex items-center justify-center relative">
                                <Bot size={120} className="text-white/80 animate-float" />
                                <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-900 animate-pulse">
                                    <Shield size={32} className="text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
      </RevealOnScroll>

      {/* 4. The Rest of the Sections */}
      <RevealOnScroll><About /></RevealOnScroll>
      <RevealOnScroll><MissionValues /></RevealOnScroll>
      <RevealOnScroll><Services /></RevealOnScroll>
      <RevealOnScroll><Gallery /></RevealOnScroll>
      <RevealOnScroll><Doctors /></RevealOnScroll>
      <RevealOnScroll><Testimonials /></RevealOnScroll>
      <RevealOnScroll><FAQ /></RevealOnScroll>
      <RevealOnScroll><Contact /></RevealOnScroll>
      
      <RevealOnScroll>
        <div className="cursor-pointer">
            <Credentials />
            <div className="text-center pb-10 -mt-10">
                <Link href="/credentials-page" className="text-sm font-bold text-blue-600 hover:underline">
                    View All Certificates
                </Link>
            </div>
        </div>
      </RevealOnScroll>
    </>
  );
}
