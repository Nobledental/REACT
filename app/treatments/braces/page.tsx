'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, Shield, Microscope, Activity, Clock, CheckCircle2, AlertTriangle, Scan, Play } from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export default function RootCanalPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeStep, setActiveStep] = useState(0);

  const procedureSteps = [
    { 
      title: "Digital Diagnosis", 
      desc: "CBCT 3D Scan & Pulp Vitality Test to map the infection.",
      detail: "We identify hidden canals (MB2) often missed by standard x-rays."
    },
    { 
      title: "Painless Access", 
      desc: "The Wand™ anesthesia & rubber dam isolation.",
      detail: "Computer-controlled flow means you feel absolutely nothing."
    },
    { 
      title: "Micro-Cleaning", 
      desc: "Nickel-Titanium rotary files remove infection.",
      detail: "Performed under 25x Zeiss Magnification for micron-level precision."
    },
    { 
      title: "Laser Disinfection", 
      desc: "Er:YAG Laser activation kills 99.9% of bacteria.",
      detail: "Fluid agitation reaches deep lateral canals chemical rinses can't."
    },
    { 
      title: "Bioceramic Seal", 
      desc: "3D Obturation with bioactive materials.",
      detail: "Reinforces the root walls and prevents reinfection forever."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden pt-20">
      
      {/* --- HERO SECTION --- */}
      <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-[#020617]">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="absolute top-6 left-6 z-30">
             <Link href="/treatments" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
             </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
                <RevealOnScroll>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
                        <Microscope size={12} /> Endodontic Center of Excellence
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                        Save The <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Natural Tooth.</span>
                    </h1>
                    <p className="text-xl text-slate-400 font-light leading-relaxed max-w-lg border-l-2 border-blue-500/30 pl-6 my-8">
                        Experience <strong>Microscopic Root Canal Therapy</strong>. 
                        Where advanced optics meet biological preservation. 
                        Zero pain. Single visit. Lifetime retention.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-10px_rgba(37,99,235,0.7)] transition-all">
                            Book Priority Slot
                        </button>
                        <div className="flex items-center gap-4 px-6 text-sm font-bold text-slate-400">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            99.8% Success Rate
                        </div>
                    </div>
                </RevealOnScroll>
            </div>

            {/* Hero Visual - The "Lens" Effect */}
            <div className="relative flex justify-center items-center">
                <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
                    {/* Rotating Rings */}
                    <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_10s_linear_infinite]"></div>
                    <div className="absolute inset-4 rounded-full border border-white/5 animate-[spin_15s_linear_infinite_reverse]"></div>
                    <div className="absolute inset-12 rounded-full border border-blue-500/20 animate-pulse"></div>
                    
                    {/* Central Image (Microscope View) */}
                    <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl bg-black">
                        <img 
                            src="https://images.unsplash.com/photo-1609840114035-1c29046a83ea?auto=format&fit=crop&q=80&w=800" 
                            alt="Microscope View" 
                            className="w-full h-full object-cover opacity-60 scale-125"
                        />
                        {/* Overlay Graphics */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Scan size={64} className="text-blue-400/50" strokeWidth={1} />
                        </div>
                        <div className="absolute bottom-10 left-0 w-full text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Zeiss Extaro 300</p>
                            <p className="text-2xl font-bold text-white">25x Zoom</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- PAIN METRICS --- */}
      <div className="bg-slate-900 border-y border-white/5 py-12">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                  { label: "Pain Level", val: "0/10", sub: "Digital Anesthesia" },
                  { label: "Sessions", val: "1", sub: "Single Visit" },
                  { label: "Precision", val: "5μm", sub: "Microscopic Accuracy" },
                  { label: "Radiation", val: "-90%", sub: "Green Low-Dose DC" },
              ].map((stat, i) => (
                  <div key={i} className="text-center border-r border-white/5 last:border-0">
                      <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.val}</div>
                      <div className="text-xs font-bold uppercase text-blue-500 tracking-widest mb-1">{stat.label}</div>
                      <div className="text-[10px] text-slate-500">{stat.sub}</div>
                  </div>
              ))}
          </div>
      </div>

      {/* --- INTERACTIVE PROCEDURE --- */}
      <div className="max-w-7xl mx-auto px-6 py-32">
          <RevealOnScroll>
            <div className="text-center mb-24">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Inside the Root Canal.</h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    Forget the horror stories. Modern Endodontics is a precise, silent, and gentle biological procedure.
                </p>
            </div>
          </RevealOnScroll>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Interactive List */}
              <div className="space-y-4">
                  {procedureSteps.map((step, idx) => (
                      <div 
                        key={idx}
                        onMouseEnter={() => setActiveStep(idx)}
                        className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border group ${
                            activeStep === idx 
                            ? 'bg-blue-600/10 border-blue-500/50 translate-x-4' 
                            : 'bg-white/5 border-white/5 hover:bg-white/10'
                        }`}
                      >
                          <div className="flex items-center justify-between mb-2">
                              <h3 className={`text-xl font-bold ${activeStep === idx ? 'text-blue-400' : 'text-white'}`}>
                                  <span className="text-sm opacity-50 mr-4">0{idx + 1}.</span>
                                  {step.title}
                              </h3>
                              {activeStep === idx && <Activity size={20} className="text-blue-500 animate-pulse" />}
                          </div>
                          <p className="text-slate-400 text-sm pl-10 group-hover:text-slate-200 transition-colors">{step.desc}</p>
                          
                          {/* Expanded Detail */}
                          <div className={`pl-10 mt-4 overflow-hidden transition-all duration-500 ${activeStep === idx ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                              <p className="text-xs font-medium text-blue-300 border-l border-blue-500/30 pl-3 leading-relaxed">
                                  {step.detail}
                              </p>
                          </div>
                      </div>
                  ))}
              </div>

              {/* Right: The Advanced SVG Animation */}
              <div className="relative h-[600px] bg-black rounded-[3rem] border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden p-10">
                  {/* Background Grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  
                  {/* THE TOOTH ANIMATION */}
                  <div className="relative w-64 h-96 z-10">
                      <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                          {/* Tooth Outline (Molar) */}
                          <path 
                            d="M40,60 Q20,10 100,10 Q180,10 160,60 Q170,120 160,200 L140,280 Q130,295 120,280 L100,220 L80,280 Q70,295 60,280 L40,200 Q30,120 40,60 Z" 
                            fill="#0f172a" 
                            stroke="white" 
                            strokeWidth="2"
                            className="opacity-80"
                          />
                          
                          {/* Root Canal System (The Hollow Part) */}
                          <path 
                            id="canal-system"
                            d="M70,70 L60,200 L70,270 L90,210 L100,150 L110,210 L130,270 L140,200 L130,70 Q100,90 70,70" 
                            fill="none" 
                            stroke={activeStep >= 4 ? "#14b8a6" : (activeStep >= 2 ? "#3b82f6" : "#ef4444")} // Red -> Blue -> Teal
                            strokeWidth={activeStep === 4 ? "12" : "8"}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-all duration-1000"
                          />

                          {/* Animation: Infection Pulse (Steps 0 & 1) */}
                          {(activeStep === 0 || activeStep === 1) && (
                              <circle cx="100" cy="120" r="20" fill="#ef4444" className="animate-ping opacity-75" />
                          )}

                          {/* Animation: The File Cleaning (Step 2 & 3) */}
                          {(activeStep === 2 || activeStep === 3) && (
                              <g className="animate-[bounce_1s_infinite]">
                                  <line x1="70" y1="50" x2="70" y2="250" stroke="#94a3b8" strokeWidth="2" />
                                  <line x1="130" y1="50" x2="130" y2="250" stroke="#94a3b8" strokeWidth="2" />
                              </g>
                          )}

                          {/* Animation: Bioceramic Fill (Step 4) */}
                          {activeStep === 4 && (
                              <path 
                                d="M70,70 L60,200 L70,270 L90,210 L100,150 L110,210 L130,270 L140,200 L130,70 Q100,90 70,70" 
                                fill="#2dd4bf"
                                className="animate-[pulse_3s_ease-in-out_infinite]" 
                                opacity="0.8"
                              />
                          )}
                      </svg>

                      {/* Tooltip Overlay */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xl whitespace-nowrap">
                          {activeStep === 0 && <span className="text-red-400 flex items-center gap-2"><AlertTriangle size={12}/> Bacterial Infection</span>}
                          {activeStep === 1 && <span className="text-blue-300 flex items-center gap-2"><Shield size={12}/> Rubber Dam Isolation</span>}
                          {activeStep === 2 && <span className="text-slate-300 flex items-center gap-2"><Scan size={12}/> Rotary Shaping</span>}
                          {activeStep === 3 && <span className="text-blue-400 flex items-center gap-2"><Zap size={12}/> Laser Disinfection</span>}
                          {activeStep === 4 && <span className="text-teal-400 flex items-center gap-2"><CheckCircle2 size={12}/> Bioceramic Seal</span>}
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* --- TECH SHOWCASE --- */}
      <div className="bg-white/5 py-32">
          <div className="max-w-7xl mx-auto px-6">
              <h3 className="text-center text-sm font-bold uppercase tracking-widest text-blue-500 mb-16">The Hardware</h3>
              <div className="grid md:grid-cols-3 gap-8">
                  <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-blue-500/50 transition-all group">
                      <div className="w-14 h-14 bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                          <Microscope size={32} />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">Zeiss Extaro 300</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                          The world's leading dental microscope. Allows us to see canals smaller than a human hair.
                      </p>
                  </div>
                  <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-purple-500/50 transition-all group">
                      <div className="w-14 h-14 bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                          <Scan size={32} />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">Carestream CBCT</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                          3D Volumetric scanning maps the root curvature before we even touch the tooth.
                      </p>
                  </div>
                  <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-teal-500/50 transition-all group">
                      <div className="w-14 h-14 bg-teal-900/30 rounded-2xl flex items-center justify-center text-teal-400 mb-6 group-hover:scale-110 transition-transform">
                          <Zap size={32} />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">Er:YAG Laser</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                          Uses photon-induced photoacoustic streaming (PIPS) to sterilize deep anatomy.
                      </p>
                  </div>
              </div>
          </div>
      </div>

      {/* --- CTA FOOTER --- */}
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Don't lose your tooth to fear.</h2>
          <p className="text-slate-400 mb-10">
              Infection spreads fast. Bone loss is permanent. <br/> 
              Our microscopic protocol saves teeth that others extract.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-10 py-4 bg-white text-slate-900 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform flex items-center gap-2 justify-center">
                  Book Consultation <ArrowRight size={16} />
              </button>
              <button className="px-10 py-4 bg-transparent border border-white/20 text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-white/5 transition-all">
                  Read Recovery Guide
              </button>
          </div>
      </div>

    </div>
  );
}
