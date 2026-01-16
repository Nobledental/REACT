'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export default function DentalImplantsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-20 pb-20">
      
      {/* ... (Keep your Header/Back Button code here) ... */}

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
         
         {/* Left: Text Content */}
         <div>
            <h1 className="text-6xl font-black text-white mb-6">Biological <br/> <span className="text-blue-500">Stability.</span></h1>
            <p className="text-slate-400 text-lg">Our Swiss-grade titanium implants fuse with your bone to create a permanent foundation.</p>
         </div>

         {/* Right: CUSTOM IMPLANT ANIMATION */}
         <div className="relative h-[500px] bg-slate-900 rounded-[3rem] border border-white/10 flex items-center justify-center overflow-hidden">
            
            {/* The Animated Screw (SVG) */}
            <svg viewBox="0 0 200 400" className="w-64 h-full">
               <defs>
                  <linearGradient id="metalGradient" x1="0" y1="0" x2="1" y2="0">
                     <stop offset="0%" stopColor="#334155" />
                     <stop offset="50%" stopColor="#94a3b8" />
                     <stop offset="100%" stopColor="#334155" />
                  </linearGradient>
               </defs>

               {/* Bone Tissue (Mask) */}
               <path d="M0,200 Q100,220 200,200 V400 H0 Z" fill="#ec4899" fillOpacity="0.1" />

               {/* The Implant Screw - Rotating Animation */}
               <g className="animate-[spin_3s_linear_infinite_reverse]" style={{ transformOrigin: '100px 200px' }}>
                  {/* Screw Threads */}
                  <path 
                    d="M70,100 L130,100 L140,120 L60,120 Z M60,130 L140,130 L130,150 L70,150 Z M70,160 L130,160 L140,180 L60,180 Z" 
                    fill="url(#metalGradient)" 
                  />
                  {/* Main Body */}
                  <rect x="80" y="180" width="40" height="150" fill="url(#metalGradient)" rx="5" />
               </g>

               {/* Abutment (Top Part) - Floating Down */}
               <g className="animate-bounce">
                  <rect x="75" y="50" width="50" height="40" fill="white" rx="5" />
               </g>
            </svg>

            <div className="absolute bottom-10 bg-black/50 px-4 py-2 rounded-full text-xs font-bold text-white backdrop-blur-md border border-white/20">
               Osseointegration Process
            </div>
         </div>

      </div>
    </div>
  );
}
