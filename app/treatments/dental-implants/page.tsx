'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Activity, Clock, Play, Zap, Layers } from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export default function DentalImplantsPage() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "3D Scan", desc: "Bone density mapping via CBCT." },
    { title: "Placement", desc: "Titanium implant insertion." },
    { title: "Integration", desc: "3-month biological healing." },
    { title: "Loading", desc: "Final ceramic crown fixation." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans transition-colors duration-500 overflow-x-hidden pt-20">
      
      <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-white dark:bg-[#020617] transition-colors">
        <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-100 dark:bg-teal-600/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100 dark:bg-blue-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="absolute top-6 left-6 z-30">
             <Link href="/treatments" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-white dark:hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
             </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8 order-2 lg:order-1">
                <RevealOnScroll>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20 text-teal-600 dark:text-teal-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
                        <Shield size={12} /> Lifetime Warranty
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
                        Biological <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 dark:from-teal-400 dark:to-blue-500">Stability.</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-lg border-l-2 border-teal-200 dark:border-teal-500/30 pl-6 my-8">
                        Replace missing teeth with Swiss-grade titanium anchors that fuse biologically with your jawbone.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-full font-bold shadow-xl transition-all flex items-center gap-2">
                            Book Scan
                        </button>
                        <button className="px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-full font-bold transition-all flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-white/10">
                            <Play size={16} fill="currentColor" /> Virtual Surgery
                        </button>
                    </div>
                </RevealOnScroll>
            </div>

            <div className="order-1 lg:order-2 relative h-[500px] bg-slate-50 dark:bg-slate-900/50 backdrop-blur-md rounded-[3rem] border border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                <svg viewBox="0 0 200 400" className="w-64 h-full relative z-10 drop-shadow-2xl">
                   <defs>
                      <linearGradient id="metalGradient" x1="0" y1="0" x2="1" y2="0">
                         <stop offset="0%" stopColor="#334155" />
                         <stop offset="50%" stopColor="#94a3b8" />
                         <stop offset="100%" stopColor="#334155" />
                      </linearGradient>
                   </defs>
                   <path d="M0,220 Q100,240 200,220 V400 H0 Z" fill="#ec4899" fillOpacity="0.05" className="animate-pulse" />
                   <g className="animate-[spin_4s_linear_infinite_reverse]" style={{ transformOrigin: '100px 250px' }}>
                      <path d="M70,150 L130,150 L140,170 L60,170 Z M60,180 L140,180 L130,200 L70,200 Z M70,210 L130,210 L140,230 L60,230 Z M60,240 L140,240 L130,260 L70,260 Z" fill="url(#metalGradient)" />
                      <rect x="80" y="260" width="40" height="100" fill="url(#metalGradient)" rx="5" />
                   </g>
                   <g className="animate-[bounce_3s_infinite]">
                      <rect x="75" y="100" width="50" height="40" fill="white" rx="5" stroke="#94a3b8" strokeWidth="2" />
                      <path d="M75,100 L125,100 L130,80 L70,80 Z" fill="white" opacity="0.8" />
                   </g>
                </svg>

                <div className="absolute bottom-10 bg-white/80 dark:bg-black/50 px-6 py-3 rounded-full text-xs font-bold text-slate-900 dark:text-white backdrop-blur-md border border-slate-200 dark:border-white/20 shadow-lg flex items-center gap-2">
                   <Activity size={14} className="text-teal-500 animate-pulse" /> Osseointegration Active
                </div>
            </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-white/5 py-12 transition-colors">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                  { label: "Success Rate", val: "99%", sub: "ITI Standards" },
                  { label: "Material", val: "Ti-Grade 5", sub: "Biocompatible" },
                  { label: "Warranty", val: "Lifetime", sub: "Global Coverage" },
                  { label: "Healing", val: "12 Wks", sub: "Osseointegration" },
              ].map((stat, i) => (
                  <div key={i} className="text-center border-r border-slate-200 dark:border-white/5 last:border-0">
                      <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">{stat.val}</div>
                      <div className="text-xs font-bold uppercase text-teal-600 dark:text-teal-500 tracking-widest mb-1">{stat.label}</div>
                      <div className="text-[10px] text-slate-500">{stat.sub}</div>
                  </div>
              ))}
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                  <div 
                    key={i}
                    onMouseEnter={() => setActiveStep(i)}
                    className={`p-8 rounded-[2rem] border transition-all duration-500 cursor-default group ${
                        activeStep === i 
                        ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-500/50 scale-105 shadow-2xl' 
                        : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-white/5'
                    }`}
                  >
                      <div className="text-6xl font-black text-slate-200 dark:text-white/5 mb-6 transition-colors">0{i+1}</div>
                      <h3 className={`text-xl font-bold mb-3 ${activeStep === i ? 'text-teal-600 dark:text-teal-400' : 'text-slate-900 dark:text-white'}`}>{step.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
}
