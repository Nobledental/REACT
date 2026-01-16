'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Zap, ShieldCheck, Clock, Activity, 
  Search, CheckCircle2, XCircle, AlertTriangle, ChevronRight, 
  DollarSign, TrendingDown, Eye, Scan, Thermometer, Moon, Info,
  Drill, Layers
} from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export default function RootCanalPage() {
  const [cleaningProgress, setCleaningProgress] = useState(0);
  const [activeSymptom, setActiveSymptom] = useState<number | null>(null);
  const isClean = cleaningProgress >= 100;

  // --- INTERACTIVE CLEANING LOGIC ---
  const handleScrub = (e: React.MouseEvent) => {
    // Increment progress as user moves mouse over the infection
    if (cleaningProgress < 100) {
      setCleaningProgress(prev => Math.min(prev + 2, 100));
    }
  };

  const symptoms = [
    { title: "Lingering Hot/Cold Sensitivity", desc: "If pain lasts >10 seconds after eating, the nerve is irreversibly damaged.", icon: Thermometer, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
    { title: "Spontaneous Night Pain", desc: "Throbbing that wakes you up is a classic sign of pulpitis requiring RCT.", icon: Moon, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
    { title: "Pain on Chewing", desc: "Sharp pain when biting down often indicates infection at the root tip.", icon: Zap, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
  ];

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
                        <Activity size={12} /> Automated Rotary Protocol
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
                        Don't Remove.<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Revitalize.</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-lg border-l-4 border-purple-500/50 pl-6 my-8">
                        The <strong>Digital Rotary RCT</strong>. <br/>
                        We use flexible titanium files and digital sensors to clean curved roots faster and more comfortably than traditional hand filing.
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

            {/* Right: INTERACTIVE "INFECTION WIPER" */}
            <div className="order-1 lg:order-2 flex justify-center">
                <div 
                  className="relative w-[350px] h-[500px] bg-slate-100 dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl group select-none"
                  onMouseMove={handleScrub}
                >
                    <div className="absolute inset-0 bg-white dark:bg-[#0f172a] flex items-center justify-center">
                        {/* THE TOOTH */}
                        <div className="relative w-64 h-full py-10">
                            <svg viewBox="0 0 200 400" className="w-full h-full drop-shadow-xl">
                                {/* Tooth Outline */}
                                <path d="M50,50 Q100,20 150,50 Q180,100 170,180 L140,380 Q100,400 60,380 L30,180 Q20,100 50,50" 
                                      fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" />
                                
                                {/* Root Canal Space (Mask for Infection) */}
                                <mask id="canalMask">
                                    <path d="M85,80 L75,350 Q100,370 125,350 L115,80 Q100,90 85,80" fill="white" />
                                </mask>

                                {/* 1. The Infection (Red) - Opacity controlled by progress */}
                                <g mask="url(#canalMask)" style={{ opacity: 1 - (cleaningProgress / 100) }}>
                                    <rect x="0" y="0" width="200" height="400" fill="#ef4444" />
                                    {/* Bacteria Dots */}
                                    {[...Array(20)].map((_, i) => (
                                        <circle key={i} cx={70 + Math.random()*60} cy={100 + Math.random()*250} r={2 + Math.random()*4} fill="#7f1d1d" className="animate-pulse" />
                                    ))}
                                </g>

                                {/* 2. The Clean Canal (Blue/White) - Revealed as infection fades */}
                                <g mask="url(#canalMask)" style={{ opacity: cleaningProgress / 100 }}>
                                    <rect x="0" y="0" width="200" height="400" fill="#dbeafe" />
                                    <path d="M100,80 L100,350" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
                                </g>
                            </svg>

                            {/* Rotary File Animation (Only visible when cleaning) */}
                            {cleaningProgress > 0 && cleaningProgress < 100 && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-32 bg-slate-400 animate-spin origin-top rounded-full blur-[1px]"></div>
                            )}
                        </div>
                    </div>

                    {/* UI Overlay */}
                    <div className="absolute bottom-0 w-full p-6 bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-slate-200 dark:border-white/10">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                            <span className={isClean ? "text-green-500" : "text-red-500"}>
                                {isClean ? "Canal Disinfected" : "Infection Detected"}
                            </span>
                            <span>{Math.round(cleaningProgress)}% Clean</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 dark:bg-white/20 rounded-full overflow-hidden">
                            <div 
                                className={`h-full transition-all duration-100 ${isClean ? 'bg-green-500' : 'bg-purple-600'}`}
                                style={{ width: `${cleaningProgress}%` }}
                            ></div>
                        </div>
                        {!isClean && (
                            <p className="text-[10px] text-center mt-3 text-slate-500 animate-pulse">
                                Hover over the tooth to clean infection
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* ================= SYMPTOM DECODER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-32">
          <RevealOnScroll>
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Do I Need a Root Canal?</h2>
                  <p className="text-slate-600 dark:text-slate-400">Common signs that the nerve inside your tooth is calling for help.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                  {symptoms.map((sym, i) => (
                      <div 
                        key={i}
                        onMouseEnter={() => setActiveSymptom(i)}
                        onMouseLeave={() => setActiveSymptom(null)}
                        className={`p-8 rounded-3xl border transition-all duration-300 cursor-default ${
                            activeSymptom === i 
                            ? 'bg-white dark:bg-[#151b2b] border-purple-500 shadow-xl scale-105 z-10' 
                            : 'bg-slate-50 dark:bg-white/5 border-transparent hover:border-slate-200 dark:hover:border-white/10'
                        }`}
                      >
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${sym.bg} ${sym.color}`}>
                              <sym.icon size={28} />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{sym.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{sym.desc}</p>
                      </div>
                  ))}
              </div>
          </RevealOnScroll>
      </div>

      {/* ================= TECHNOLOGY (NO MICRO/WAND) ================= */}
      <div className="bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-white/5 py-32">
          <div className="max-w-7xl mx-auto px-6">
              <RevealOnScroll>
                  <div className="grid md:grid-cols-2 gap-16 items-center">
                      <div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
                              <Zap size={12} /> Modern Endodontics
                          </div>
                          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Faster. Quieter. Safer.</h2>
                          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                              We threw out the manual hand files. Our clinic uses **Rotary Endodontics**—flexible titanium instruments that curve with your roots, cleaning them efficiently without the "scraping" sensation of older methods.
                          </p>
                          
                          <div className="grid grid-cols-2 gap-6">
                              <div className="p-4 bg-white dark:bg-black/20 rounded-2xl border border-slate-200 dark:border-white/5">
                                  <Scan size={24} className="text-purple-500 mb-2" />
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Digital Apex Locator</h4>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Beeps exactly when we reach the root tip. No guessing.</p>
                              </div>
                              <div className="p-4 bg-white dark:bg-black/20 rounded-2xl border border-slate-200 dark:border-white/5">
                                  <Layers size={24} className="text-blue-500 mb-2" />
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">3-Step Numbing</h4>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Gel first, then spray, then a gentle injection. Minimal pinch.</p>
                              </div>
                          </div>
                      </div>
                      
                      {/* Visual Meter: Pain Perception */}
                      <div className="bg-white dark:bg-[#151b2b] p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
                          
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-8">Patient Pain Perception</h3>
                          
                          <div className="space-y-8">
                              <div>
                                  <div className="flex justify-between text-xs font-bold uppercase text-slate-400 mb-2">
                                      <span>What people expect</span>
                                      <span className="text-red-500">8/10 Pain</span>
                                  </div>
                                  <div className="h-3 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                      <div className="h-full w-[80%] bg-red-400 rounded-full"></div>
                                  </div>
                              </div>
                              
                              <div>
                                  <div className="flex justify-between text-xs font-bold uppercase text-slate-400 mb-2">
                                      <span>Actual Experience</span>
                                      <span className="text-green-500">1/10 (Pressure only)</span>
                                  </div>
                                  <div className="h-3 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                      <div className="h-full w-[10%] bg-green-500 rounded-full relative">
                                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-ping"></div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-500/20 flex gap-3">
                              <Info className="text-purple-600 shrink-0" size={20} />
                              <p className="text-xs text-purple-800 dark:text-purple-300 font-medium">
                                  RCT actually <strong>relieves</strong> the pain caused by infection. It doesn't cause it.
                              </p>
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
                              <span className="text-slate-500">Rotary RCT</span>
                              <span className="font-bold dark:text-white">₹5,000</span>
                          </div>
                          <div className="flex justify-between text-sm">
                              <span className="text-slate-500">Core Build-up</span>
                              <span className="font-bold dark:text-white">₹1,500</span>
                          </div>
                          <div className="flex justify-between text-sm">
                              <span className="text-slate-500">Ceramic Crown</span>
                              <span className="font-bold dark:text-white">₹6,000</span>
                          </div>
                      </div>
                      
                      <div className="flex justify-between items-end">
                          <div className="text-xs text-slate-400 uppercase font-bold">Total Investment</div>
                          <div className="text-3xl font-black text-green-600 dark:text-green-400">₹12,500</div>
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
                              <span className="text-slate-500">Implant + Crown</span>
                              <span className="font-bold dark:text-white">₹30,000</span>
                          </div>
                      </div>
                      
                      <div className="flex justify-between items-end">
                          <div className="text-xs text-slate-400 uppercase font-bold">Total Cost</div>
                          <div className="text-3xl font-black text-red-500">₹41,000</div>
                      </div>
                      <div className="mt-4 text-xs text-center text-red-400 font-bold bg-red-100 dark:bg-red-900/20 py-2 rounded-lg">
                          You lose ₹28,500 by extracting!
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
                      <h2 className="text-3xl font-bold mb-4">Transparent Pricing.</h2>
                      <p className="text-slate-400">Premium digital care at honest neighborhood prices.</p>
                  </div>

                  <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                          <thead>
                              <tr className="border-b border-white/10 text-xs font-black uppercase tracking-widest text-slate-500">
                                  <th className="pb-6 pl-4">Treatment Type</th>
                                  <th className="pb-6">Average Clinic</th>
                                  <th className="pb-6 text-purple-400">Noble Dental</th>
                                  <th className="pb-6">Warranty</th>
                              </tr>
                          </thead>
                          <tbody className="text-sm font-medium">
                              {[
                                  { name: "Anterior RCT (Front Tooth)", mkt: "₹4,500 - ₹5,500", noble: "₹4,000", w: "5 Years" },
                                  { name: "Molar RCT (Back Tooth)", mkt: "₹6,000 - ₹8,000", noble: "₹5,000", w: "10 Years" },
                                  { name: "Re-Treatment (Failed RCT)", mkt: "₹8,000+", noble: "₹7,000", w: "Case Specific" },
                                  { name: "Painless Anesthesia Add-on", mkt: "₹500 Extra", noble: "Included", w: "-" },
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
