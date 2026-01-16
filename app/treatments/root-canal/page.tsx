'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Microscope, Zap, ShieldCheck, Clock, Activity, 
  Search, CheckCircle2, XCircle, AlertTriangle, ChevronRight, 
  DollarSign, TrendingDown, Eye, Scan
} from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export default function RootCanalPage() {
  const [lensPosition, setLensPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'manual' | 'micro'>('micro');

  // --- MOUSE TRACKING FOR "X-RAY LENS" ---
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLensPosition({ x, y });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans transition-colors duration-500 overflow-x-hidden pt-20">
      
      {/* ================= HERO SECTION ================= */}
      <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-white dark:bg-[#020617] transition-colors">
        <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-100 dark:bg-purple-900/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100 dark:bg-blue-900/20 rounded-full blur-[120px]"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="absolute top-6 left-6 z-30">
             <Link href="/treatments" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-white dark:hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
             </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Content */}
            <div className="space-y-8 order-2 lg:order-1">
                <RevealOnScroll>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
                        <Microscope size={12} /> Zeiss Extaro® Protocol
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
                        Don't Remove.<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Revitalize.</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-lg border-l-4 border-purple-500/50 pl-6 my-8">
                        The <strong>Single-Visit Microscopic RCT</strong>. <br/>
                        We use 25x magnification to find hidden bacteria that traditional dentistry misses.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold shadow-xl shadow-purple-500/20 transition-all flex items-center gap-2">
                            Stop the Pain
                        </button>
                        <div className="flex items-center gap-3 text-sm font-bold text-slate-500 dark:text-slate-400 px-4">
                            <Clock size={16} className="text-purple-500" />
                            Completed in 45 Mins
                        </div>
                    </div>
                </RevealOnScroll>
            </div>

            {/* Right: INTERACTIVE MICROSCOPE LENS */}
            <div className="order-1 lg:order-2 flex justify-center">
                <div 
                  ref={containerRef}
                  onMouseMove={handleMouseMove}
                  className="relative w-[400px] h-[500px] bg-slate-100 dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-white/10 overflow-hidden cursor-crosshair shadow-2xl group"
                >
                    {/* Layer 1: Blurry / Infected View (Background) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-50 blur-sm grayscale">
                        <svg viewBox="0 0 200 300" className="w-64 h-full">
                            <path d="M60,20 Q100,0 140,20 Q160,50 150,100 L120,280 Q100,300 80,280 L50,100 Q40,50 60,20" fill="#cbd5e1" />
                        </svg>
                    </div>
                    <div className="absolute top-10 w-full text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                        Naked Eye View (Blurry)
                    </div>

                    {/* Layer 2: The "Lens" (Clear View) */}
                    <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            maskImage: `radial-gradient(circle 100px at ${lensPosition.x}% ${lensPosition.y}%, black 100%, transparent 100%)`,
                            WebkitMaskImage: `radial-gradient(circle 100px at ${lensPosition.x}% ${lensPosition.y}%, black 100%, transparent 100%)`
                        }}
                    >
                        {/* High-Def Tooth with Canals */}
                        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-[#0f172a]">
                             {/* Grid */}
                             <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                             
                             <svg viewBox="0 0 200 300" className="w-64 h-full relative z-10">
                                {/* Tooth Body */}
                                <path d="M60,20 Q100,0 140,20 Q160,50 150,100 L120,280 Q100,300 80,280 L50,100 Q40,50 60,20" fill="none" stroke="#7c3aed" strokeWidth="2" />
                                {/* Root Canals (The hidden detail) */}
                                <path d="M85,40 L70,250" fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
                                <path d="M115,40 L130,250" fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite_reverse]" />
                                {/* Hidden MB2 Canal (The secret) */}
                                <path d="M100,40 L100,180" fill="none" stroke="#f43f5e" strokeWidth="3" className="animate-pulse" />
                                <circle cx="100" cy="180" r="4" fill="#f43f5e" className="animate-ping" />
                            </svg>
                        </div>
                    </div>

                    {/* Lens Border UI */}
                    <div 
                        className="absolute w-[200px] h-[200px] rounded-full border-2 border-purple-500/50 shadow-[0_0_30px_rgba(124,58,237,0.3)] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                        style={{ left: `${lensPosition.x}%`, top: `${lensPosition.y}%` }}
                    >
                        <div className="text-[10px] font-mono text-purple-500 mt-24 bg-black/80 px-2 py-1 rounded">25x ZOOM</div>
                        <div className="absolute w-2 h-2 bg-purple-500 rounded-full"></div>
                    </div>

                    <div className="absolute bottom-8 w-full text-center">
                        <span className="bg-black/80 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl backdrop-blur-md">
                            <Search size={12} className="inline mr-2" /> Move to Inspect
                        </span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* ================= PAIN-FREE TECHNOLOGY ================= */}
      <div className="bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-white/5 py-32">
          <div className="max-w-7xl mx-auto px-6">
              <RevealOnScroll>
                  <div className="grid md:grid-cols-2 gap-16 items-center">
                      <div>
                          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Forget the "Scary Syringe".</h2>
                          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                              The #1 fear in dentistry is the injection. We replaced it with **The Wand™**. 
                              It's a computer-controlled system that delivers anesthesia drop-by-drop below your pain threshold.
                          </p>
                          <ul className="space-y-4">
                              {[
                                  "No 'Sting' sensation",
                                  "Numbs only the tooth, not your whole face",
                                  "Instant onset (No waiting)",
                                  "Safe for High BP patients"
                              ].map((item, i) => (
                                  <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                                      <CheckCircle2 className="text-green-500" size={20} /> {item}
                                  </li>
                              ))}
                          </ul>
                      </div>
                      
                      {/* Visual Meter */}
                      <div className="bg-white dark:bg-[#151b2b] p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-xl">
                          <div className="space-y-8">
                              <div>
                                  <div className="flex justify-between text-xs font-bold uppercase text-slate-400 mb-2">
                                      <span>Traditional Shot</span>
                                      <span className="text-red-500">Pain Level: High</span>
                                  </div>
                                  <div className="h-4 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                      <div className="h-full w-[80%] bg-gradient-to-r from-orange-400 to-red-500"></div>
                                  </div>
                              </div>
                              
                              <div>
                                  <div className="flex justify-between text-xs font-bold uppercase text-slate-400 mb-2">
                                      <span>The Wand™ (Our Tech)</span>
                                      <span className="text-green-500">Pain Level: Zero</span>
                                  </div>
                                  <div className="h-4 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                      <div className="h-full w-[5%] bg-green-500"></div>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 text-center">
                              <div className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-black text-xl">
                                  <Zap size={24} className="fill-current" /> "I didn't feel a thing."
                              </div>
                              <p className="text-xs text-slate-400 mt-2">- 98% of our patients</p>
                          </div>
                      </div>
                  </div>
              </RevealOnScroll>
          </div>
      </div>

      {/* ================= SAVE VS EXTRACT (FINANCIAL LOGIC) ================= */}
      <div className="max-w-7xl mx-auto px-6 py-32">
          <RevealOnScroll>
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">The "Cheaper" Option is Expensive.</h2>
                  <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                      Many patients think extracting the tooth is cheaper than saving it. 
                      Here is the real math over 5 years.
                  </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  
                  {/* Option A: Save */}
                  <div className="relative bg-white dark:bg-[#151b2b] p-8 rounded-[2rem] border-2 border-green-500/20 shadow-xl transform hover:-translate-y-2 transition-transform">
                      <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl rounded-tr-2xl uppercase tracking-widest">
                          Smart Choice
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                          <ShieldCheck className="text-green-500" /> Save the Tooth
                      </h3>
                      
                      <div className="space-y-4 mb-8 border-b border-slate-100 dark:border-white/5 pb-8">
                          <div className="flex justify-between text-sm">
                              <span className="text-slate-500">Microscopic RCT</span>
                              <span className="font-bold dark:text-white">₹8,000</span>
                          </div>
                          <div className="flex justify-between text-sm">
                              <span className="text-slate-500">Core Build-up</span>
                              <span className="font-bold dark:text-white">₹1,500</span>
                          </div>
                          <div className="flex justify-between text-sm">
                              <span className="text-slate-500">Zirconia Crown</span>
                              <span className="font-bold dark:text-white">₹10,000</span>
                          </div>
                      </div>
                      
                      <div className="flex justify-between items-end">
                          <div className="text-xs text-slate-400 uppercase font-bold">Total Investment</div>
                          <div className="text-3xl font-black text-green-600 dark:text-green-400">₹19,500</div>
                      </div>
                  </div>

                  {/* Option B: Extract */}
                  <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 opacity-80 hover:opacity-100 transition-opacity">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                          <XCircle className="text-red-500" /> Extract & Replace
                      </h3>
                      
                      <div className="space-y-4 mb-8 border-b border-slate-200 dark:border-white/5 pb-8">
                          <div className="flex justify-between text-sm">
                              <span className="text-slate-500">Extraction Surgery</span>
                              <span className="font-bold dark:text-white">₹3,000</span>
                          </div>
                          <div className="flex justify-between text-sm">
                              <span className="text-slate-500">Bone Graft (Often needed)</span>
                              <span className="font-bold dark:text-white">₹8,000</span>
                          </div>
                          <div className="flex justify-between text-sm">
                              <span className="text-slate-500">Titanium Implant + Crown</span>
                              <span className="font-bold dark:text-white">₹35,000</span>
                          </div>
                      </div>
                      
                      <div className="flex justify-between items-end">
                          <div className="text-xs text-slate-400 uppercase font-bold">Total Cost</div>
                          <div className="text-3xl font-black text-red-500">₹46,000</div>
                      </div>
                      <div className="mt-4 text-xs text-center text-red-400 font-bold bg-red-100 dark:bg-red-900/20 py-2 rounded-lg">
                          You lose ₹26,500 by extracting!
                      </div>
                  </div>

              </div>
          </RevealOnScroll>
      </div>

      {/* ================= HYDERABAD PRICING ================= */}
      <div className="bg-slate-900 text-white py-32">
          <div className="max-w-7xl mx-auto px-6">
              <RevealOnScroll>
                  <div className="text-center mb-16">
                      <h2 className="text-3xl font-bold mb-4">Transparency First.</h2>
                      <p className="text-slate-400">Our microscopic pricing is competitive with standard "blind" treatments elsewhere.</p>
                  </div>

                  <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                          <thead>
                              <tr className="border-b border-white/10 text-xs font-black uppercase tracking-widest text-slate-500">
                                  <th className="pb-6 pl-4">Treatment Type</th>
                                  <th className="pb-6">Corporate Clinics</th>
                                  <th className="pb-6 text-purple-400">Noble Dental (Microscopic)</th>
                                  <th className="pb-6">Warranty</th>
                              </tr>
                          </thead>
                          <tbody className="text-sm font-medium">
                              {[
                                  { name: "Standard RCT (Front Tooth)", mkt: "₹4,500 - ₹6,000", noble: "₹5,000", w: "5 Years" },
                                  { name: "Multi-Root Molar RCT", mkt: "₹6,500 - ₹9,000", noble: "₹7,500", w: "10 Years" },
                                  { name: "Re-Treatment (Failed RCT)", mkt: "₹10,000+", noble: "₹9,000", w: "Case Specific" },
                                  { name: "Laser Disinfection Add-on", mkt: "₹2,000 Extra", noble: "Included", w: "-" },
                              ].map((row, i) => (
                                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                      <td className="py-6 pl-4 text-white font-bold">{row.name}</td>
                                      <td className="py-6 text-slate-400">{row.mkt}</td>
                                      <td className="py-6 text-purple-400 text-lg font-bold">{row.noble}</td>
                                      <td className="py-6 text-slate-400">{row.w}</td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </RevealOnScroll>
          </div>
      </div>

      {/* ================= CTA FOOTER ================= */}
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Don't wait for the swelling.</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10">
              Infections spread fast. We keep emergency slots open daily for pain relief.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform flex items-center gap-2 justify-center shadow-xl">
                  Book Emergency Slot
              </button>
              <button className="px-10 py-4 bg-transparent border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
                  Whatsapp Us
              </button>
          </div>
      </div>

    </div>
  );
}
