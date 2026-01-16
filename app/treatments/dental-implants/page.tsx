'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Shield, Activity, Clock, Play, Zap, ArrowRight, Layers } from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export default function DentalImplantsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "3D Scan", desc: "Bone density mapping via CBCT." },
    { title: "Placement", desc: "Titanium implant insertion." },
    { title: "Integration", desc: "3-month biological healing." },
    { title: "Loading", desc: "Final ceramic crown fixation." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden pt-20">
      
      {/* --- HERO SECTION --- */}
      <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-[#020617]">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="absolute top-6 left-6 z-30">
             <Link href="/treatments" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
             </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8 order-2 lg:order-1">
                <RevealOnScroll>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
                        <Shield size={12} /> Lifetime Warranty
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                        Biological <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Stability.</span>
                    </h1>
                    <p className="text-xl text-slate-400 font-light leading-relaxed max-w-lg border-l-2 border-teal-500/30 pl-6 my-8">
                        Replace missing teeth with Swiss-grade titanium anchors that fuse biologically with your jawbone.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-full font-bold shadow-[0_0_40px_-10px_rgba(20,184,166,0.5)] transition-all flex items-center gap-2">
                            Book Scan
                        </button>
                        <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full font-bold transition-all flex items-center gap-2">
                            <Play size={16} fill="currentColor" /> Virtual Surgery
                        </button>
                    </div>
                </RevealOnScroll>
            </div>

            {/* Right: CUSTOM IMPLANT ANIMATION */}
            <div className="order-1 lg:order-2 relative h-[500px] bg-slate-900/50 backdrop-blur-md rounded-[3rem] border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl group">
                
                {/* Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                {/* The Animated Screw (SVG) */}
                <svg viewBox="0 0 200 400" className="w-64 h-full relative z-10 drop-shadow-2xl">
                   <defs>
                      <linearGradient id="metalGradient" x1="0" y1="0" x2="1" y2="0">
                         <stop offset="0%" stopColor="#334155" />
                         <stop offset="50%" stopColor="#94a3b8" />
                         <stop offset="100%" stopColor="#334155" />
                      </linearGradient>
                   </defs>

                   {/* Bone Tissue (Mask) */}
                   <path d="M0,220 Q100,240 200,220 V400 H0 Z" fill="#ec4899" fillOpacity="0.05" className="animate-pulse" />

                   {/* The Implant Screw - Rotating Animation */}
                   <g className="animate-[spin_4s_linear_infinite_reverse]" style={{ transformOrigin: '100px 250px' }}>
                      {/* Screw Threads */}
                      <path 
                        d="M70,150 L130,150 L140,170 L60,170 Z M60,180 L140,180 L130,200 L70,200 Z M70,210 L130,210 L140,230 L60,230 Z M60,240 L140,240 L130,260 L70,260 Z" 
                        fill="url(#metalGradient)" 
                      />
                      {/* Main Body */}
                      <rect x="80" y="260" width="40" height="100" fill="url(#metalGradient)" rx="5" />
                   </g>

                   {/* Abutment (Top Part) - Floating Down */}
                   <g className="animate-[bounce_3s_infinite]">
                      <rect x="75" y="100" width="50" height="40" fill="white" rx="5" stroke="#94a3b8" strokeWidth="2" />
                      <path d="M75,100 L125,100 L130,80 L70,80 Z" fill="white" opacity="0.8" />
                   </g>
                </svg>

                <div className="absolute bottom-10 bg-black/50 px-6 py-3 rounded-full text-xs font-bold text-white backdrop-blur-md border border-white/20 shadow-lg flex items-center gap-2">
                   <Activity size={14} className="text-teal-400 animate-pulse" /> Osseointegration Active
                </div>
            </div>

        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="bg-slate-900 border-y border-white/5 py-12">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                  { label: "Success Rate", val: "99%", sub: "ITI Standards" },
                  { label: "Material", val: "Ti-Grade 5", sub: "Biocompatible" },
                  { label: "Warranty", val: "Lifetime", sub: "Global Coverage" },
                  { label: "Healing", val: "12 Wks", sub: "Osseointegration" },
              ].map((stat, i) => (
                  <div key={i} className="text-center border-r border-white/5 last:border-0">
                      <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.val}</div>
                      <div className="text-xs font-bold uppercase text-teal-500 tracking-widest mb-1">{stat.label}</div>
                      <div className="text-[10px] text-slate-500">{stat.sub}</div>
                  </div>
              ))}
          </div>
      </div>

      {/* --- WORKFLOW --- */}
      <div className="max-w-7xl mx-auto px-6 py-32">
          <RevealOnScroll>
            <div className="text-center mb-24">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The Reconstruction Protocol</h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    A precise 4-step surgical protocol designed for minimal trauma and maximum stability.
                </p>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                  <div 
                    key={i}
                    onMouseEnter={() => setActiveStep(i)}
                    className={`p-8 rounded-[2rem] border transition-all duration-500 cursor-default group ${activeStep === i ? 'bg-teal-900/20 border-teal-500/50 scale-105 shadow-2xl' : 'bg-slate-900 border-white/5 hover:border-white/10'}`}
                  >
                      <div className="text-6xl font-black text-white/5 mb-6 group-hover:text-teal-500/10 transition-colors">0{i+1}</div>
                      <h3 className={`text-xl font-bold mb-3 ${activeStep === i ? 'text-teal-400' : 'text-white'}`}>{step.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
              ))}
          </div>
      </div>

      {/* --- TECH SPECS --- */}
      <div className="bg-white/5 py-32">
          <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-12">
                  <div className="space-y-6">
                      <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400">
                          <Layers size={32} />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Bone Level</h3>
                      <p className="text-slate-400 leading-relaxed">
                          We place implants at the optimal bone level to preserve your facial structure and prevent the "sunken face" look of aging.
                      </p>
                  </div>
                  <div className="space-y-6">
                      <div className="w-16 h-16 bg-teal-600/20 rounded-2xl flex items-center justify-center text-teal-400">
                          <Zap size={32} />
                      </div>
                      <h3 className="text-2xl font-bold text-white">SLA Active Surface</h3>
                      <p className="text-slate-400 leading-relaxed">
                          Our implants feature a chemically active surface that attracts blood proteins, cutting healing time by 50%.
                      </p>
                  </div>
                  <div className="space-y-6">
                      <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center text-purple-400">
                          <CheckCircle2 size={32} />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Guided Surgery</h3>
                      <p className="text-slate-400 leading-relaxed">
                          We use 3D-printed surgical guides that fit over your gums, ensuring the implant is placed with 0.1mm accuracy.
                      </p>
                  </div>
              </div>
          </div>
      </div>

      {/* --- CTA FOOTER --- */}
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Invest in a permanent solution.</h2>
          <p className="text-slate-400 mb-10">
              Stop struggling with dentures or bridges. <br/> 
              Get teeth that feel and function exactly like your own.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-10 py-4 bg-white text-slate-900 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform flex items-center gap-2 justify-center">
                  Book 3D Scan <ArrowRight size={16} />
              </button>
              <button className="px-10 py-4 bg-transparent border border-white/20 text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-white/5 transition-all">
                  View Cost Guide
              </button>
          </div>
      </div>

    </div>
  );
}
