'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, ArrowRight, Shield, Award, Activity, 
  Check, ScanLine, Cpu, Droplets, Ruler, User,
  Beaker, ShieldCheck, Microscope, Info, Zap,'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, ArrowRight, Activity, Zap, ShieldCheck, Clock, 
  Search, CheckCircle2, XCircle, AlertTriangle, ChevronRight, 
  DollarSign, TrendingDown, Eye, Scan, Thermometer, Moon, Info,
  Drill, Layers, Microscope, Play, Phone, Calendar, Siren
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination, Navigation } from 'swiper/modules';
import { RevealOnScroll } from '@/components/RevealOnScroll';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const customStyles = `
  .rc-swiper .swiper-pagination-bullet { background: #8b5cf6; opacity: 0.5; }
  .rc-swiper .swiper-pagination-bullet-active { background: #7c3aed; opacity: 1; width: 24px; border-radius: 4px; }
  .bg-noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E"); }
  
  @keyframes pulse-ring {
    0% { transform: scale(0.33); opacity: 1; }
    80%, 100% { transform: scale(1); opacity: 0; }
  }
  .animate-pulse-ring {
    animation: pulse-ring 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  }
`;

export default function RootCanalPage() {
  const [cleaningProgress, setCleaningProgress] = useState(0);
  const [activeSymptom, setActiveSymptom] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('one-visit');
  const isClean = cleaningProgress >= 100;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- INTERACTIVE CLEANING LOGIC ---
  const handleScrub = (e: React.MouseEvent) => {
    if (cleaningProgress < 100) {
      setCleaningProgress(prev => Math.min(prev + 1.5, 100));
    }
  };

  const symptoms = [
    { title: "Spontaneous Night Pain", desc: "Throbbing that wakes you up is a classic sign of pulpitis requiring RCT.", icon: Moon, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
    { title: "Lingering Hot/Cold", desc: "If pain lasts >10 seconds after eating, the nerve is irreversibly damaged.", icon: Thermometer, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
    { title: "Pain on Chewing", desc: "Sharp pain when biting down often indicates infection at the root tip.", icon: Zap, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { title: "Pimple on Gums", desc: "A 'sinus tract' releasing pus means chronic infection is draining.", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" },
  ];

  const workflow = [
    { step: "01", title: "Digital Anaesthesia", desc: "Computer-controlled 'Wand' delivery for near-zero sensation.", icon: Activity },
    { step: "02", title: "Microscope Access", desc: "Zeiss Extaro 300 reveals hidden canals (MB2) invisible to naked eye.", icon: Microscope },
    { step: "03", title: "Rotary Shaping", desc: "Flexible titanium files clean curved roots without trauma.", icon: Drill },
    { step: "04", title: "Laser Disinfection", desc: "Activated irrigation kills 99.9% of bacteria deep in dentin.", icon: Zap },
    { step: "05", title: "Bioceramic Seal", desc: "3D obturation with bioactive materials that promote healing.", icon: ShieldCheck },
    { step: "06", title: "Same-Day Crown", desc: "Digital scan & mill for immediate protection.", icon: Layers },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 font-sans transition-colors duration-500 overflow-x-hidden pt-20 bg-noise">
      <style>{customStyles}</style>
      
      {/* ================= HERO SECTION ================= */}
      <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-purple-50 dark:from-[#020617] dark:to-[#0f0720] transition-colors">
        {/* Dynamic Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse duration-[4000ms]"></div>
            <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="absolute top-6 left-6 z-30">
             <Link href="/treatments" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-white hover:shadow-md dark:hover:bg-white/10 transition-all text-[10px] font-bold uppercase tracking-widest group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Catalog
             </Link>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Content */}
            <div className="space-y-10 order-2 lg:order-1">
                <RevealOnScroll>
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-8 shadow-lg shadow-purple-500/10">
                        <Activity size={14} /> ISO 9001:2015 • Global Endodontic Forum
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-[6rem] font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
                        Root Canals <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 animate-gradient-x">Quiet Pain.</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-lg border-l-4 border-purple-500 pl-6 my-10">
                        Don't remove. <strong className="text-purple-600 dark:text-purple-400">Revitalize.</strong> <br/>
                        We save infected teeth using Microscopes, Lasers, and 3D precision in Nallagandla.
                    </p>

                    <div className="flex flex-wrap gap-5">
                        <button className="px-10 py-5 bg-purple-600 dark:bg-purple-600 text-white rounded-full font-black uppercase tracking-widest text-xs shadow-xl shadow-purple-500/30 hover:bg-purple-700 hover:scale-105 transition-all flex items-center gap-3">
                            <Siren size={18} /> Stop the Pain
                        </button>
                        <button className="px-10 py-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-full font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-white/10 hover:shadow-lg">
                            <Play size={16} fill="currentColor" /> See Workflow
                        </button>
                    </div>

                    <div className="flex gap-8 pt-8 border-t border-slate-200 dark:border-white/10 mt-8">
                       <div>
                          <div className="text-2xl font-black text-slate-900 dark:text-white">3200+</div>
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Microscope RCTs</div>
                       </div>
                       <div>
                          <div className="text-2xl font-black text-slate-900 dark:text-white">98%</div>
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pain Relief (24h)</div>
                       </div>
                       <div>
                          <div className="text-2xl font-black text-slate-900 dark:text-white">45 min</div>
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Chair Time</div>
                       </div>
                    </div>
                </RevealOnScroll>
            </div>

            {/* Right: INTERACTIVE "INFECTION WIPER" */}
            <div className="order-1 lg:order-2 flex justify-center relative">
                <div className="absolute -inset-10 bg-purple-500/20 blur-3xl rounded-full pointer-events-none"></div>
                
                <div 
                  className="relative w-[380px] h-[550px] bg-slate-50 dark:bg-[#0f1420] rounded-[3rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl group select-none cursor-crosshair"
                  onMouseMove={handleScrub}
                  onTouchMove={handleScrub}
                >
                    <div className="absolute inset-0 bg-white dark:bg-[#0f1420] flex items-center justify-center">
                        {/* THE TOOTH */}
                        <div className="relative w-72 h-full py-10">
                            <svg viewBox="0 0 200 400" className="w-full h-full drop-shadow-2xl">
                                {/* Tooth Outline */}
                                <path d="M50,50 Q100,20 150,50 Q180,100 170,180 L140,380 Q100,400 60,380 L30,180 Q20,100 50,50" 
                                      fill="none" stroke="#94a3b8" strokeWidth="4" className="dark:stroke-slate-600" />
                                
                                {/* Inner Chamber */}
                                <path d="M50,50 Q100,20 150,50 Q180,100 170,180 L140,380 Q100,400 60,380 L30,180 Q20,100 50,50" 
                                      fill="#f1f5f9" className="dark:fill-[#1e293b]" opacity="0.5"/>

                                {/* Root Canal Space (Mask for Infection) */}
                                <mask id="canalMask">
                                    <path d="M85,80 L75,350 Q100,370 125,350 L115,80 Q100,90 85,80" fill="white" />
                                </mask>

                                {/* 1. The Infection (Red) - Opacity controlled by progress */}
                                <g mask="url(#canalMask)" style={{ opacity: 1 - (cleaningProgress / 100) }}>
                                    <rect x="0" y="0" width="200" height="400" fill="#ef4444" />
                                    {/* Bacteria Dots */}
                                    {[...Array(25)].map((_, i) => (
                                        <circle key={i} cx={70 + Math.random()*60} cy={100 + Math.random()*250} r={2 + Math.random()*5} fill="#7f1d1d" className="animate-pulse" style={{animationDelay: `${Math.random()}s`}} />
                                    ))}
                                </g>

                                {/* 2. The Clean Canal (Blue/White) - Revealed as infection fades */}
                                <g mask="url(#canalMask)" style={{ opacity: cleaningProgress / 100 }}>
                                    <rect x="0" y="0" width="200" height="400" fill="#dbeafe" className="dark:fill-blue-900" />
                                    <path d="M100,80 L100,350" stroke="#3b82f6" strokeWidth="3" strokeDasharray="6 6" />
                                    
                                    {/* Sparkles when clean */}
                                    {isClean && [...Array(5)].map((_, i) => (
                                       <circle key={i} cx={80 + Math.random()*40} cy={100 + Math.random()*200} r={2} fill="white" className="animate-ping" style={{animationDelay: `${Math.random()}s`}} />
                                    ))}
                                </g>
                            </svg>

                            {/* Rotary File Animation (Only visible when cleaning) */}
                            {cleaningProgress > 0 && cleaningProgress < 100 && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-40 bg-gradient-to-b from-slate-300 to-slate-500 animate-spin origin-top rounded-full blur-[1px] opacity-80 mix-blend-overlay pointer-events-none"></div>
                            )}
                        </div>
                    </div>

                    {/* UI Overlay */}
                    <div className="absolute bottom-0 w-full p-8 bg-white/90 dark:bg-[#0f1420]/90 backdrop-blur-xl border-t border-slate-200 dark:border-white/10">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3">
                            <span className={isClean ? "text-emerald-500 flex items-center gap-2" : "text-rose-500 flex items-center gap-2"}>
                                {isClean ? <><CheckCircle2 size={12}/> Canal Sterile</> : <><AlertTriangle size={12} className="animate-bounce"/> Infection Detected</>}
                            </span>
                            <span className="dark:text-white">{Math.round(cleaningProgress)}% Cleaned</span>
                        </div>
                        <div className="w-full h-3 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden shadow-inner">
                            <div 
                                className={`h-full transition-all duration-100 ${isClean ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-gradient-to-r from-rose-500 to-purple-600'}`}
                                style={{ width: `${cleaningProgress}%` }}
                            ></div>
                        </div>
                        {!isClean && (
                            <p className="text-[10px] text-center mt-4 text-slate-400 font-bold uppercase tracking-widest animate-pulse">
                                Scrub to remove infection
                            </p>
                        )}
                        {isClean && (
                            <div className="mt-4 text-center">
                                <button className="px-6 py-2 bg-emerald-500 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-emerald-500/20">Proceed to Sealing</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* ================= SYMPTOM DECODER ================= */}
      <section id="indications" className="py-32 bg-slate-50 dark:bg-[#0b101b] relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-50 pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <RevealOnScroll>
               <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">Do I Need a Root Canal?</h2>
                  <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">Common signs that the nerve inside your tooth is calling for help.</p>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {symptoms.map((sym, i) => (
                      <div 
                        key={i}
                        onMouseEnter={() => setActiveSymptom(i)}
                        onMouseLeave={() => setActiveSymptom(null)}
                        className={`p-8 rounded-[2rem] border transition-all duration-300 cursor-default flex flex-col items-center text-center ${
                            activeSymptom === i 
                            ? 'bg-white dark:bg-[#151b2b] border-purple-500 shadow-xl scale-105 z-10' 
                            : 'bg-white/50 dark:bg-white/5 border-transparent hover:border-slate-200 dark:hover:border-white/10'
                        }`}
                      >
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${sym.bg} ${sym.color}`}>
                              <sym.icon size={32} />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{sym.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{sym.desc}</p>
                      </div>
                  ))}
               </div>

               <div className="mt-12 p-6 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/40 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
                        <Siren size={24} className="animate-pulse" />
                     </div>
                     <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">Rapid Relief Clinic (Before 10 AM)</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Reserved emergency chair for Nallagandla & Lingampally residents in pain.</p>
                     </div>
                  </div>
                  <a href="tel:+918610425342" className="px-6 py-3 bg-rose-600 text-white font-bold rounded-xl shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition-colors whitespace-nowrap">
                     Call Emergency
                  </a>
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* ================= ONE-VISIT WORKFLOW ================= */}
      <section id="timeline" className="py-32 bg-white dark:bg-[#0f1420]">
         <div className="max-w-7xl mx-auto px-6">
            <RevealOnScroll>
               <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-6">
                        <Clock size={12} /> 45 Minute Protocol
                     </div>
                     <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">One-Visit Flow.</h2>
                     <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                        We respect your time. By combining rotary endodontics with chairside crown milling, we complete 90% of molars in a single appointment.
                     </p>
                     
                     <div className="space-y-6 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-white/10"></div>
                        
                        {workflow.map((step, i) => (
                           <div key={i} className="relative flex gap-6 items-start group">
                              <div className="w-10 h-10 rounded-full bg-white dark:bg-[#151b2b] border-2 border-slate-200 dark:border-white/10 flex items-center justify-center text-xs font-black text-slate-400 group-hover:border-purple-500 group-hover:text-purple-500 transition-colors z-10 shrink-0">
                                 {step.step}
                              </div>
                              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#151b2b] border border-slate-100 dark:border-white/5 w-full group-hover:shadow-lg transition-all">
                                 <h3 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                                    <step.icon size={16} className="text-purple-500"/> {step.title}
                                 </h3>
                                 <p className="text-sm text-slate-600 dark:text-slate-400">{step.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="relative h-[800px] sticky top-24 hidden lg:block">
                     <div className="absolute inset-0 bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl">
                        <img 
                           src="https://images.unsplash.com/photo-1606813902911-8d11c3330d55?auto=format&fit=crop&w=800&q=80" 
                           alt="Microscope RCT" 
                           className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                        
                        <div className="absolute bottom-10 left-10 right-10">
                           <div className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl">
                              <div className="flex items-center gap-4 mb-4">
                                 <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white animate-pulse">
                                    <Microscope size={24} />
                                 </div>
                                 <div>
                                    <h4 className="text-white font-bold">Zeiss Extaro 300</h4>
                                    <p className="text-purple-200 text-xs">Live Feed Active</p>
                                 </div>
                              </div>
                              <div className="h-24 bg-black/50 rounded-xl border border-white/10 flex items-center justify-center">
                                 <span className="text-xs font-mono text-green-400">
                                    &gt; MB2 Canal Located<br/>
                                    &gt; Apex Locator: 0.0mm<br/>
                                    &gt; Cleaning Complete
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="bg-slate-900 text-white py-32">
         <div className="max-w-7xl mx-auto px-6">
            <RevealOnScroll>
               <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4">Transparent Pricing.</h2>
                  <p className="text-slate-400">Premium digital care at honest neighborhood prices in Nallagandla.</p>
               </div>

               <div className="grid md:grid-cols-3 gap-8">
                  <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                     <div className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-4">Anterior Teeth</div>
                     <div className="text-4xl font-black mb-2">₹6,500</div>
                     <p className="text-slate-400 text-sm mb-8">Front teeth & premolars. Single canal systems.</p>
                     <ul className="space-y-3 text-sm text-slate-300 mb-8">
                        <li className="flex gap-3"><CheckCircle2 size={16} className="text-purple-500"/> Digital Anaesthesia</li>
                        <li className="flex gap-3"><CheckCircle2 size={16} className="text-purple-500"/> Rotary Shaping</li>
                        <li className="flex gap-3"><CheckCircle2 size={16} className="text-purple-500"/> Laser Disinfection</li>
                     </ul>
                     <button className="w-full py-3 rounded-xl border border-white/20 hover:bg-white hover:text-slate-900 transition-all font-bold text-sm">Book Consult</button>
                  </div>

                  <div className="p-8 bg-gradient-to-b from-purple-900/50 to-white/5 border border-purple-500/50 rounded-3xl relative transform scale-105 shadow-2xl">
                     <div className="absolute top-0 right-0 bg-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl uppercase">Most Common</div>
                     <div className="text-white font-bold uppercase tracking-widest text-xs mb-4">Molar Teeth</div>
                     <div className="text-4xl font-black mb-2">₹8,500</div>
                     <p className="text-purple-200 text-sm mb-8">Back teeth (Molars). Multiple curved canals.</p>
                     <ul className="space-y-3 text-sm text-slate-200 mb-8">
                        <li className="flex gap-3"><CheckCircle2 size={16} className="text-green-400"/> Microscope Access</li>
                        <li className="flex gap-3"><CheckCircle2 size={16} className="text-green-400"/> MB2 Canal Search</li>
                        <li className="flex gap-3"><CheckCircle2 size={16} className="text-green-400"/> Bioceramic Seal</li>
                     </ul>
                     <button className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition-all font-bold text-sm shadow-lg">Select Plan</button>
                  </div>

                  <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                     <div className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-4">Re-Treatment</div>
                     <div className="text-4xl font-black mb-2">₹12,000</div>
                     <p className="text-slate-400 text-sm mb-8">Redoing failed root canals from other clinics.</p>
                     <ul className="space-y-3 text-sm text-slate-300 mb-8">
                        <li className="flex gap-3"><CheckCircle2 size={16} className="text-blue-500"/> GP Removal</li>
                        <li className="flex gap-3"><CheckCircle2 size={16} className="text-blue-500"/> Missed Canal Locating</li>
                        <li className="flex gap-3"><CheckCircle2 size={16} className="text-blue-500"/> MTA Repair</li>
                     </ul>
                     <button className="w-full py-3 rounded-xl border border-white/20 hover:bg-white hover:text-slate-900 transition-all font-bold text-sm">Book Consult</button>
                  </div>
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="py-32 bg-slate-50 dark:bg-[#0b101b]">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Endodontic Specialists</h2>
               <p className="text-slate-600 dark:text-slate-400">Your tooth is treated by experts, not generalists.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
               <div className="flex gap-6 items-center p-6 bg-white dark:bg-[#151b2b] rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl transition-all">
                  <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-purple-500">
                     <img src="/images/dhivakaran.webp" alt="Dr. Dhivakaran" className="w-full h-full object-cover" />
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white">Dr. Dhivakaran</h3>
                     <p className="text-xs font-black text-purple-600 uppercase tracking-widest mb-2">Microscope Endodontist</p>
                     <p className="text-sm text-slate-500 dark:text-slate-400">3200+ RCTs completed. Specialist in calcified canals and re-treatment cases.</p>
                  </div>
               </div>

               <div className="flex gap-6 items-center p-6 bg-white dark:bg-[#151b2b] rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl transition-all">
                  <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-blue-500">
                     <img src="/images/roger.webp" alt="Dr. Roger" className="w-full h-full object-cover" />
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white">Dr. Roger</h3>
                     <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">Restorative Specialist</p>
                     <p className="text-sm text-slate-500 dark:text-slate-400">Expert in Post & Core build-ups and same-day ceramic crown bonding.</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-24 max-w-4xl mx-auto px-6">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Patient FAQ</h2>
         </div>
         <div className="space-y-4">
            <details className="group bg-white dark:bg-[#151b2b] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden transition-all duration-300 open:shadow-lg">
               <summary className="flex items-center justify-between p-6 font-bold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5">
                  Will the root canal hurt?
                  <ChevronRight className="transition-transform group-open:rotate-90"/>
               </summary>
               <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  No. With digital anaesthesia and laser activation, the procedure feels like a long filling. You may feel mild tenderness for 1-2 days post-op, which is normal healing.
               </div>
            </details>
            <details className="group bg-white dark:bg-[#151b2b] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden transition-all duration-300 open:shadow-lg">
               <summary className="flex items-center justify-between p-6 font-bold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5">
                  Can I drive home after?
                  <ChevronRight className="transition-transform group-open:rotate-90"/>
               </summary>
               <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Yes. We use local anaesthesia which numbs only the tooth. You will be fully alert and able to drive or work immediately after.
               </div>
            </details>
            <details className="group bg-white dark:bg-[#151b2b] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden transition-all duration-300 open:shadow-lg">
               <summary className="flex items-center justify-between p-6 font-bold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5">
                  Do I really need a crown?
                  <ChevronRight className="transition-transform group-open:rotate-90"/>
               </summary>
               <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Yes. A root canal treated tooth becomes brittle as it loses its hydration supply. A crown acts like a helmet, preventing the tooth from cracking under bite pressure.
               </div>
            </details>
         </div>
      </section>

      {/* ================= CTA FOOTER ================= */}
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
         <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Don't wait for the swelling.</h2>
         <p className="text-slate-600 dark:text-slate-400 mb-10">Infections spread fast. We keep emergency slots open daily.</p>
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
  Bone, Scale, Clock, FileText, Calculator, RefreshCw, ThumbsUp,
  HeartPulse, Brain, Baby, Cigarette, Pill, Thermometer, CheckCircle2,
  AlertTriangle, HelpCircle, Phone, Globe, Calendar, MapPin, Mail
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination, Navigation } from 'swiper/modules';
import { RevealOnScroll } from '@/components/RevealOnScroll';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const customStyles = `
  .implant-swiper .swiper-pagination-bullet { background: #14b8a6; opacity: 0.5; }
  .implant-swiper .swiper-pagination-bullet-active { background: #0d9488; opacity: 1; width: 24px; border-radius: 4px; }
  .clip-path-slant { clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%); }
  .anatomy-layer:hover { transform: translateX(10px) scale(1.02); }
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  
  /* Premium Noise Texture */
  .bg-noise {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  }

  /* Glassmorphism */
  .glass-panel {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  .dark .glass-panel {
    background: rgba(17, 24, 39, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  /* Gradient Text Animation */
  @keyframes gradient-x {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 6s ease infinite;
  }

  /* Floating Animation */
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  /* Pulse Glow */
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(20, 184, 166, 0.2); }
    50% { box-shadow: 0 0 40px rgba(20, 184, 166, 0.4); }
  }
  .animate-glow {
    animation: glow 3s infinite;
  }

  /* Sticky Nav */
  .sticky-nav {
    position: sticky;
    top: 0;
    z-index: 40;
    backdrop-filter: blur(12px);
    background: rgba(255, 255, 255, 0.8);
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }
  .dark .sticky-nav {
    background: rgba(2, 6, 23, 0.8);
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
`;

export default function DentalImplantsPage() {
  const [boneSlider, setBoneSlider] = useState(50);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('heart');
  const [riskScore, setRiskScore] = useState(0);
  const [riskFactors, setRiskFactors] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Intersection Observer for Sticky Nav
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // --- DATA: ELIGIBILITY CHECK ---
  const eligibilityCategories = [
    { id: 'heart', label: 'Heart & Blood', icon: HeartPulse, questions: [
        { q: "BP stable (≤140/90)", risk: 0 },
        { q: "Taking Blood Thinners (Aspirin/Clopidogrel)", risk: 10 },
        { q: "Heart Attack / Stroke (<6 months ago)", risk: 50 },
        { q: "Pacemaker Installed", risk: 5 }
    ]},
    { id: 'diabetes', label: 'Metabolic', icon: Droplets, questions: [
        { q: "HbA1c ≤ 7.5% (Controlled)", risk: 0 },
        { q: "HbA1c 7.6% – 8.5%", risk: 20 },
        { q: "HbA1c > 8.5% (Uncontrolled)", risk: 50 },
        { q: "Heavy Smoking (>10/day)", risk: 30 }
    ]},
    { id: 'bone', label: 'Bone Density', icon: Bone, questions: [
        { q: "Taking Bisphosphonates (Bone density drugs)", risk: 40 },
        { q: "History of Jaw Radiation", risk: 60 },
        { q: "Severe Osteoporosis", risk: 20 }
    ]}
  ];

  const handleRiskChange = (risk: number, isChecked: boolean, label: string) => {
    if (isChecked) {
        setRiskScore(prev => prev + risk);
        setRiskFactors(prev => [...prev, label]);
    } else {
        setRiskScore(prev => Math.max(0, prev - risk));
        setRiskFactors(prev => prev.filter(f => f !== label));
    }
  };

  const getRiskLevel = () => {
      if (riskScore === 0) return { label: "Ideal Candidate", color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" };
      if (riskScore < 30) return { label: "Moderate Risk (Needs Prep)", color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/20" };
      return { label: "High Risk (Consult Specialist)", color: "text-rose-500", bg: "bg-rose-500/10 border-rose-500/20" };
  };

  // --- DATA: IMPLANT TIERS ---
  const implantTiers = [
    {
      tier: "Standard",
      brand: "Osstem / Dentium",
      origin: "South Korea 🇰🇷",
      surface: "SLA Surface",
      healing: "10-12 Weeks",
      market: "₹25,000 - ₹35,000",
      noble: "₹18,000 - ₹22,000",
      warranty: "15 Years",
      desc: "Reliable entry-level implants with high success rates. Best for abundant bone.",
      style: "border-slate-200 dark:border-white/10"
    },
    {
      tier: "Premium Gold",
      brand: "Nobel Biocare Active",
      origin: "USA / Sweden 🇺🇸",
      surface: "TiUnite (Anodized)",
      healing: "8-10 Weeks",
      market: "₹45,000 - ₹60,000",
      noble: "₹35,000 - ₹42,000",
      warranty: "Lifetime (Global)",
      desc: "The inventors of modern implants. High stability in soft bone situations.",
      style: "border-amber-400/50 bg-amber-50/50 dark:bg-amber-900/10 shadow-amber-500/10 ring-1 ring-amber-500/20"
    },
    {
      tier: "Elite Platinum",
      brand: "Straumann SLActive®",
      origin: "Switzerland 🇨🇭",
      surface: "Hydrophilic SLA",
      healing: "3-4 Weeks (Rapid)",
      market: "₹65,000 - ₹85,000",
      noble: "₹52,000 - ₹58,000",
      warranty: "Lifetime + Card",
      desc: "The world's #1 implant. Chemical surface attracts blood for ultra-fast healing.",
      style: "border-indigo-400 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/10 shadow-indigo-500/10"
    }
  ];

  // --- DATA: ANATOMY ---
  const anatomyLayers = [
    { id: 1, name: "Zirconia Crown", role: "The Visible Tooth", desc: "Diamond-hard ceramic that mimics natural enamel translucency. Stain-proof.", color: "bg-white text-slate-900 shadow-xl border border-slate-200" },
    { id: 2, name: "Titanium Abutment", role: "The Shock Absorber", desc: "Connects the crown to the screw. Absorbs biting forces to protect the jaw.", color: "bg-slate-300 text-slate-800" },
    { id: 3, name: "The Implant Screw", role: "The Artificial Root", desc: "Biocompatible Titanium Grade-5. Fuses with bone (Osseointegration).", color: "bg-slate-800 text-white" }
  ];

  // --- DATA: LIFECYCLE STEPS ---
  const lifecycleSteps = [
    { title: "Digital Scan & CBCT", sub: "Phase 01", desc: "3D CBCT imaging reveals bone anatomy, nerves, and implant position for guided planning.", icon: Target },
    { title: "Virtual Planning", sub: "Phase 02", desc: "AI-guided simulation ensures precision implant placement with minimal trauma.", icon: ScanLine },
    { title: "PRF Biologic Healing", sub: "Phase 03", desc: "We use your blood to prepare PRF membranes that enhance bone & soft-tissue healing naturally.", icon: Droplets },
    { title: "Guided Surgery", sub: "Phase 04", desc: "Digitally printed guides direct exact implant angle, depth, and position — fast & painless.", icon: CrosshairIcon },
    { title: "Crown Placement", sub: "Phase 05", desc: "Your final crown is 3D designed, shade-matched, and digitally aligned for your bite.", icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 font-sans transition-colors duration-500 overflow-x-hidden pt-20 bg-noise">
      <style>{customStyles}</style>
      
      {/* ================= HERO SECTION ================= */}
      <section id="overview" className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-[#020617] dark:to-[#0B1019] transition-colors duration-500">
        {/* Dynamic Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Light Mode Blobs */}
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-teal-200/40 dark:bg-teal-500/10 rounded-full blur-[120px] animate-pulse duration-[4000ms]"></div>
            <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] bg-blue-200/40 dark:bg-blue-600/10 rounded-full blur-[150px]"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
        </div>

        <div className="absolute top-6 left-6 z-30">
             <Link href="/treatments" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-white hover:shadow-md dark:hover:bg-white/10 transition-all text-[10px] font-bold uppercase tracking-widest group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Catalog
             </Link>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 order-2 lg:order-1">
                <RevealOnScroll>
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-500/30 text-teal-700 dark:text-teal-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-8 shadow-lg shadow-teal-500/10">
                        <Award size={14} /> ISO 9001:2015 • ITI & ADA Certified
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-[6.5rem] font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
                        Precision <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-blue-600 to-indigo-600 dark:from-teal-400 dark:via-blue-400 dark:to-indigo-300 animate-gradient-x">Dental Implants.</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-lg border-l-4 border-teal-500 pl-6 my-10">
                        Replace missing teeth with Swiss-Grade Titanium. <br/>
                        <span className="font-black text-teal-600 dark:text-teal-400">99.2% Success Rate</span> via Guided Surgery Protocols in Nallagandla.
                    </p>

                    <div className="flex flex-wrap gap-5">
                        <button 
                            onClick={() => document.getElementById('self-check')?.scrollIntoView({behavior: 'smooth'})}
                            className="px-10 py-5 bg-teal-600 dark:bg-teal-500 text-white dark:text-[#020617] rounded-full font-black uppercase tracking-widest text-xs shadow-xl shadow-teal-500/30 hover:bg-teal-700 dark:hover:bg-teal-400 hover:scale-105 transition-all flex items-center gap-3 animate-pulse hover:animate-none"
                        >
                            <ShieldCheck size={18} /> Check Eligibility
                        </button>
                        <button className="px-10 py-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-full font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-white/10 hover:shadow-lg">
                            <Play size={16} fill="currentColor" /> Watch 3D Demo
                        </button>
                    </div>
                    
                    <div className="flex gap-8 pt-8 border-t border-slate-200 dark:border-white/10 mt-8">
                       <div>
                          <div className="text-2xl font-black text-slate-900 dark:text-white">1500+</div>
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Implants Placed</div>
                       </div>
                       <div>
                          <div className="text-2xl font-black text-slate-900 dark:text-white">Lifetime</div>
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Warranty</div>
                       </div>
                       <div>
                          <div className="text-2xl font-black text-slate-900 dark:text-white">45 min</div>
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Surgery Time</div>
                       </div>
                    </div>
                </RevealOnScroll>
            </div>

            {/* INTERACTIVE ANATOMY DEMO */}
            <div className="order-1 lg:order-2 flex flex-col items-center justify-center">
                <div className="relative w-full max-w-md perspective-1000">
                    <div className="text-center mb-12">
                         <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-600 dark:text-teal-500 mb-3">Interactive Schematic</h3>
                         <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Deconstruct the Bionic Tooth</p>
                    </div>
                    
                    <div className="space-y-4">
                        {anatomyLayers.map((layer) => (
                           <div 
                              key={layer.id}
                              onMouseEnter={() => setActiveLayer(layer.id)}
                              onMouseLeave={() => setActiveLayer(null)}
                              className={`
                                anatomy-layer cursor-pointer p-6 rounded-3xl border transition-all duration-500
                                ${activeLayer === layer.id 
                                    ? 'bg-white dark:bg-white/10 border-teal-500 shadow-2xl scale-105 z-10 ring-1 ring-teal-500/20' 
                                    : 'bg-white/60 dark:bg-white/5 border-slate-200 dark:border-white/5 hover:border-teal-500/30'
                                }
                              `}
                           >
                              <div className="flex items-center gap-5">
                                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transition-transform duration-500 ${activeLayer === layer.id ? 'rotate-12 scale-110' : ''} ${layer.color}`}>
                                    {layer.id}
                                 </div>
                                 <div>
                                    <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-sm mb-1">{layer.name}</h4>
                                    <p className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-1">{layer.role}</p>
                                    <div className={`overflow-hidden transition-all duration-500 ease-out ${activeLayer === layer.id ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                       <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{layer.desc}</p>
                                    </div>
                                 </div>
                                 <ChevronRight className={`ml-auto text-slate-400 transition-all duration-300 ${activeLayer === layer.id ? 'rotate-90 text-teal-500 translate-x-1' : ''}`} />
                              </div>
                           </div>
                        ))}
                    </div>
                    
                    {/* Visual Connector Line */}
                    <div className="mt-8 flex justify-center opacity-30">
                       <div className="h-24 w-px bg-gradient-to-b from-teal-500 via-teal-500/50 to-transparent"></div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* ================= STICKY NAVIGATION ================= */}
      <div className="sticky-nav overflow-x-auto no-scrollbar">
         <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 h-16">
            {[
               { id: 'overview', label: 'Overview' },
               { id: 'self-check', label: 'Eligibility' },
               { id: 'solutions', label: 'Solutions' },
               { id: 'comparison', label: 'Vs Bridge' },
               { id: 'recovery', label: 'Recovery' },
               { id: 'outcomes', label: 'Outcomes' },
               { id: 'cases', label: 'Cases' },
               { id: 'team', label: 'Team' },
               { id: 'pricing', label: 'Pricing' },
               { id: 'faq', label: 'FAQ' },
            ].map(link => (
               <a 
                  key={link.id}
                  href={`#${link.id}`}
                  className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${activeSection === link.id ? 'text-teal-600 dark:text-teal-400' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
               >
                  {link.label}
               </a>
            ))}
            <a href="#contact" className="ml-auto px-4 py-2 bg-teal-600 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-teal-700 transition-colors whitespace-nowrap">
               Book Now
            </a>
         </div>
      </div>

      {/* ================= ELIGIBILITY SELF-CHECK ================= */}
      <section id="self-check" className="py-32 relative overflow-hidden">
         <div className="absolute inset-0 bg-slate-50 dark:bg-[#0b101b]"></div>
         {/* Background Grid */}
         <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>

         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <RevealOnScroll>
               <div className="text-center mb-20">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 border border-slate-200 dark:border-white/10 shadow-sm">
                     <Activity size={12} /> AI-Powered Pre-Screening
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Are You Eligible?</h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                     A quick clinical screening to estimate your implant readiness. <br/>
                     <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mt-2 block">*Informational only. Final decision via CBCT.</span>
                  </p>
               </div>

               <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Tabs - Vertical on Desktop */}
                  <div className="lg:col-span-3 space-y-3">
                     {eligibilityCategories.map(cat => (
                        <button
                           key={cat.id}
                           onClick={() => setActiveTab(cat.id)}
                           className={`
                              w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 group
                              ${activeTab === cat.id 
                                ? 'bg-white dark:bg-[#151b2b] border-teal-500 shadow-xl scale-105 z-10' 
                                : 'bg-white/50 dark:bg-white/5 border-transparent hover:bg-white hover:shadow-md'
                              }
                           `}
                        >
                           <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${activeTab === cat.id ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-slate-200'}`}>
                              <cat.icon size={22} />
                           </div>
                           <div className="text-left">
                              <span className={`text-xs font-black uppercase tracking-wider block ${activeTab === cat.id ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'}`}>Check</span>
                              <span className={`font-bold text-lg ${activeTab === cat.id ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>{cat.label}</span>
                           </div>
                           <ChevronRight size={18} className={`ml-auto transition-transform ${activeTab === cat.id ? 'text-teal-500 translate-x-1' : 'opacity-0'}`} />
                        </button>
                     ))}
                  </div>

                  {/* Question Panel */}
                  <div className="lg:col-span-6 glass-panel rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative min-h-[400px]">
                     {eligibilityCategories.map(cat => (
                        activeTab === cat.id && (
                           <div key={cat.id} className="animate-in fade-in slide-in-from-right-8 duration-500">
                              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-200 dark:border-white/10">
                                 <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-2xl text-teal-600 dark:text-teal-400">
                                    <cat.icon size={32} />
                                 </div>
                                 <div>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">{cat.label} Assessment</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select all that apply to you</p>
                                 </div>
                              </div>
                              
                              <div className="space-y-4">
                                 {cat.questions.map((q, i) => {
                                    const isSelected = riskFactors.includes(q.q);
                                    return (
                                       <label key={i} className={`flex items-center gap-5 p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${isSelected ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-500/50 shadow-md' : 'bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/5 hover:border-slate-300'}`}>
                                          <div className={`relative flex items-center justify-center w-6 h-6 rounded-md border-2 transition-all ${isSelected ? 'bg-amber-500 border-amber-500' : 'border-slate-300 dark:border-slate-600'}`}>
                                             <input 
                                                type="checkbox" 
                                                checked={isSelected}
                                                onChange={(e) => handleRiskChange(q.risk, e.target.checked, q.q)}
                                                className="absolute opacity-0 w-full h-full cursor-pointer"
                                             />
                                             {isSelected && <Check size={14} className="text-white" strokeWidth={4} />}
                                          </div>
                                          <div className="flex-1">
                                             <span className={`font-bold block transition-colors ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>{q.q}</span>
                                          </div>
                                          {q.risk > 0 && <span className="text-[9px] uppercase font-black text-amber-500 tracking-widest px-2 py-1 bg-amber-100 dark:bg-amber-900/30 rounded-lg">Risk Factor</span>}
                                       </label>
                                    );
                                 })}
                              </div>
                           </div>
                        )
                     ))}
                  </div>

                  {/* Result Panel */}
                  <div className="lg:col-span-3 space-y-6">
                     <div className={`p-8 rounded-[2.5rem] border backdrop-blur-md shadow-2xl transition-colors duration-500 ${getRiskLevel().bg}`}>
                        <div className="flex items-center justify-between mb-6">
                           <span className="text-xs font-black uppercase tracking-widest opacity-60">Status</span>
                           <Activity size={20} className={getRiskLevel().color} />
                        </div>
                        
                        <div className="mb-8 text-center">
                           <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-current mb-4 shadow-xl ${getRiskLevel().color} bg-white dark:bg-[#0b101b]`}>
                              {riskScore === 0 ? <CheckCircle2 size={48} strokeWidth={2.5} /> : <AlertTriangle size={48} strokeWidth={2.5} />}
                           </div>
                           <h4 className={`text-2xl font-black leading-tight ${getRiskLevel().color}`}>{getRiskLevel().label}</h4>
                        </div>

                        <div className="space-y-4">
                           <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 pb-2 border-b border-black/5 dark:border-white/5">
                              <span>Risk Score</span>
                              <span>{riskScore}/100</span>
                           </div>
                           <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 pb-2 border-b border-black/5 dark:border-white/5">
                              <span>Factors</span>
                              <span>{riskFactors.length} Found</span>
                           </div>
                        </div>
                     </div>

                     <button className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-3">
                        Book Consultation <ArrowRight size={16} />
                     </button>
                  </div>
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* ================= IMPLANT TYPES (SOLUTIONS) ================= */}
      <section id="solutions" className="py-32 bg-white dark:bg-[#0f1420] relative">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
               <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">Architectural Solutions</h2>
               <p className="text-lg text-slate-500 max-w-2xl mx-auto">Engineered solutions based on bone volume and missing units.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
               {[
                  { title: "Single Unit", count: "1", icon: Zap, desc: "Replaces the root of a single missing tooth. The zirconia crown restores 100% function.", color: "teal" },
                  { title: "Implant Bridge", count: "3+", icon: Layers, desc: "Two implants can support a bridge of 3-4 teeth, reducing cost without compromising stability.", color: "blue" },
                  { title: "Full Arch", count: "All", icon: RefreshCw, desc: "Complete jaw rehabilitation using 4-6 implants to support a full fixed set.", color: "purple" }
               ].map((item, idx) => (
                  <div key={idx} className="group relative bg-slate-50 dark:bg-[#151b2b] rounded-[2.5rem] p-10 border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                     <div className={`absolute top-0 right-0 w-32 h-32 bg-${item.color}-500/5 rounded-bl-[100px] rounded-tr-[2.5rem] transition-all group-hover:bg-${item.color}-500/10`}></div>
                     
                     <div className={`w-16 h-16 bg-${item.color}-100 dark:bg-${item.color}-900/20 rounded-2xl flex items-center justify-center text-${item.color}-600 dark:text-${item.color}-400 mb-8 group-hover:scale-110 transition-transform shadow-lg`}>
                        <item.icon size={32} />
                     </div>
                     
                     <div className="mb-4 flex items-baseline gap-2">
                        <span className={`text-4xl font-black text-${item.color}-600 dark:text-${item.color}-400`}>{item.count}</span>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Missing Teeth</span>
                     </div>
                     
                     <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{item.title}</h3>
                     <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-sm">{item.desc}</p>
                     
                     <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex items-center text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white">
                        Learn More <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ================= BONE LOSS SIMULATOR ================= */}
      <div id="comparison" className="max-w-7xl mx-auto px-6 py-32 bg-slate-100 dark:bg-[#0b1221] rounded-[4rem] my-20 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          
          <RevealOnScroll>
              <div className="text-center mb-16 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6 border border-slate-200 dark:border-white/10">
                     <Brain size={12} /> The Wolf&apos;s Law Effect
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Implants vs. Bridges</h2>
                  <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                      Bone requires stimulation to stay dense. Bridges sit <i>on top</i> of gums, causing atrophy. Implants stimulate bone like natural roots.
                  </p>
              </div>

              <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] bg-white dark:bg-black/40 rounded-[3rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl group z-10">
                  {/* LEFT SIDE: BRIDGE (BAD) - Static Background */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50/50 dark:bg-red-900/10">
                      <div className="text-center opacity-60">
                          <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                             <Layers size={48} />
                          </div>
                          <h3 className="text-3xl font-black text-red-500 mb-2">Dental Bridge</h3>
                          <p className="text-lg font-bold text-red-600/70 dark:text-red-400/70">5 Years Later: Bone Atrophy</p>
                          <div className="mt-8 px-6 py-2 bg-red-100 dark:bg-red-900/30 rounded-full text-xs font-black uppercase text-red-600 dark:text-red-400 tracking-widest">
                             Bone Level Drops 30%
                          </div>
                      </div>
                  </div>

                  {/* RIGHT SIDE: IMPLANT (GOOD) - Overlay controlled by Slider */}
                  <div 
                    className="absolute top-0 left-0 h-full bg-white dark:bg-[#151b2b] border-r-4 border-teal-500 flex items-center justify-center overflow-hidden transition-all duration-75 ease-out clip-path-slant shadow-[10px_0_50px_rgba(0,0,0,0.2)]"
                    style={{ width: `${boneSlider}%` }}
                  >
                      <div className="text-center w-full min-w-[1000px] flex flex-col items-center relative">
                          <div className="absolute inset-0 bg-teal-500/5 pointer-events-none"></div>
                          <div className="relative">
                              <div className="w-24 h-24 bg-teal-100 dark:bg-teal-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-teal-600 dark:text-teal-400 shadow-lg shadow-teal-500/20 animate-pulse">
                                 <ShieldCheck size={48} />
                              </div>
                          </div>
                          <h3 className="text-3xl font-black text-teal-600 dark:text-teal-400 mb-2">Titanium Implant</h3>
                          <p className="text-lg font-bold text-teal-700/70 dark:text-teal-300/70">5 Years Later: Bone Preserved</p>
                          
                          <div className="mt-8 px-6 py-2 bg-teal-100 dark:bg-teal-900/30 rounded-full text-xs font-black uppercase text-teal-700 dark:text-teal-300 tracking-widest flex items-center gap-2">
                             <Check size={12} strokeWidth={4} /> Structural Integrity 100%
                          </div>
                      </div>
                  </div>

                  {/* Slider UI */}
                  <div className="absolute bottom-10 left-10 right-10 z-30">
                      <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-4">
                          <span className="text-teal-600 dark:text-teal-400 flex items-center gap-2"><ArrowLeft size={12}/> Implant Protection</span>
                          <span className="text-red-500 flex items-center gap-2">Bridge Recession <ArrowRight size={12}/></span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={boneSlider} 
                        onChange={(e) => setBoneSlider(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-teal-500 shadow-inner"
                      />
                      <div className="text-center mt-6">
                          <span className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-transform cursor-grab active:cursor-grabbing">
                              Drag to Compare
                          </span>
                      </div>
                  </div>
              </div>
          </RevealOnScroll>
      </div>

      {/* ================= RECOVERY DASHBOARD ================= */}
      <section id="recovery" className="py-32 max-w-7xl mx-auto px-6">
         <div className="section-header mb-20">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Recovery Dashboard</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Monitor your healing with our clinical indicator guide.</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
            {[
               { title: "First 48 Hours", status: "Normal", icon: CheckCircle2, color: "emerald", desc: "Mild swelling and slight oozing are expected. Manage with cold packs and rest." },
               { title: "Bleeding > 24 Hrs", status: "Caution", icon: AlertTriangle, color: "amber", desc: "If active bleeding persists beyond day 1, bite on sterile gauze for 30 mins." },
               { title: "Numbness > 6 Hrs", status: "Critical", icon: Phone, color: "rose", desc: "Persistent numbness in lip or chin after anesthesia wears off requires evaluation." }
            ].map((card, i) => (
               <div key={i} className={`p-8 bg-${card.color}-50 dark:bg-${card.color}-900/10 border border-${card.color}-100 dark:border-${card.color}-500/20 rounded-[2.5rem] relative overflow-hidden group`}>
                  <div className={`absolute top-0 right-0 p-8 opacity-10 text-${card.color}-500 group-hover:scale-150 transition-transform duration-700`}>
                     <card.icon size={120} />
                  </div>
                  
                  <div className={`inline-flex items-center gap-2 px-3 py-1 bg-${card.color}-200 dark:bg-${card.color}-900/40 text-${card.color}-800 dark:text-${card.color}-200 text-[10px] font-black uppercase rounded-full tracking-widest mb-6`}>
                     <div className={`w-1.5 h-1.5 rounded-full bg-${card.color}-500 animate-pulse`}></div> {card.status}
                  </div>
                  
                  <h3 className="font-black text-2xl text-slate-900 dark:text-white mb-4 relative z-10">{card.title}</h3>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">{card.desc}</p>
               </div>
            ))}
         </div>
      </section>

      {/* ================= CLINICAL OUTCOMES ================= */}
      <section id="outcomes" className="py-32 bg-slate-900 text-white">
         <div className="max-w-7xl mx-auto px-6">
            <RevealOnScroll>
               <div className="section-header mb-16">
                  <h2 className="text-4xl font-black mb-4">Clinical Outcomes</h2>
                  <p className="text-slate-400 text-lg">We measure healing with data, not guesswork.</p>
               </div>
               
               <div className="grid md:grid-cols-3 gap-8">
                  <article className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                     <h3 className="text-xl font-bold mb-2">Osseointegration</h3>
                     <p className="text-teal-400 text-sm font-black uppercase tracking-widest mb-4">98.5% Success Rate</p>
                     <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
                        <div className="bg-teal-500 h-2 rounded-full" style={{width: '98.5%'}}></div>
                     </div>
                     <p className="text-sm text-slate-400">Verified by ISQ stability meter readings at 12 weeks.</p>
                  </article>
                  
                  <article className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                     <h3 className="text-xl font-bold mb-2">Pain Management</h3>
                     <p className="text-blue-400 text-sm font-black uppercase tracking-widest mb-4">96% Zero Pain</p>
                     <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '96%'}}></div>
                     </div>
                     <p className="text-sm text-slate-400">Reported pain score of 0-1/10 post-surgery by patients.</p>
                  </article>
                  
                  <article className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                     <h3 className="text-xl font-bold mb-2">Longevity</h3>
                     <p className="text-amber-400 text-sm font-black uppercase tracking-widest mb-4">20+ Years</p>
                     <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
                        <div className="bg-amber-500 h-2 rounded-full" style={{width: '99%'}}></div>
                     </div>
                     <p className="text-sm text-slate-400">Projected survival based on clinical maintenance protocols.</p>
                  </article>
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* ================= CASE LIBRARY ================= */}
      <section id="cases" className="py-32 bg-white dark:bg-[#0f1420]">
         <div className="max-w-7xl mx-auto px-6">
            <div className="section-header mb-16">
               <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Case Library</h2>
               <p className="text-slate-600 dark:text-slate-400 text-lg">Real outcomes for Hyderabad residents.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               <article className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-[#151b2b] border border-slate-200 dark:border-white/5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-4">Case 01 · Single Molar</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Immediate placement after extraction</h3>
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
                     <div className="flex justify-between border-b border-slate-200 dark:border-white/5 pb-2">
                        <span>Challenge</span>
                        <span className="font-bold text-slate-900 dark:text-white">Fractured Root</span>
                     </div>
                     <div className="flex justify-between border-b border-slate-200 dark:border-white/5 pb-2">
                        <span>Solution</span>
                        <span className="font-bold text-slate-900 dark:text-white">Straumann BLX</span>
                     </div>
                     <div className="flex justify-between">
                        <span>Time</span>
                        <span className="font-bold text-slate-900 dark:text-white">Same Day</span>
                     </div>
                  </div>
                  <button className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2 group">
                     View Protocol <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                  </button>
               </article>

               <article className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-[#151b2b] border border-slate-200 dark:border-white/5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">Case 02 · Full Mouth</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">All-on-4 Rehabilitation</h3>
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
                     <div className="flex justify-between border-b border-slate-200 dark:border-white/5 pb-2">
                        <span>Challenge</span>
                        <span className="font-bold text-slate-900 dark:text-white">Loose Dentures</span>
                     </div>
                     <div className="flex justify-between border-b border-slate-200 dark:border-white/5 pb-2">
                        <span>Solution</span>
                        <span className="font-bold text-slate-900 dark:text-white">Nobel Biocare</span>
                     </div>
                     <div className="flex justify-between">
                        <span>Time</span>
                        <span className="font-bold text-slate-900 dark:text-white">3 Days</span>
                     </div>
                  </div>
                  <button className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2 group">
                     View Protocol <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                  </button>
               </article>

               <article className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-[#151b2b] border border-slate-200 dark:border-white/5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-4">Case 03 · Front Tooth</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Esthetic Zone Implant</h3>
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
                     <div className="flex justify-between border-b border-slate-200 dark:border-white/5 pb-2">
                        <span>Challenge</span>
                        <span className="font-bold text-slate-900 dark:text-white">Missing Incisor</span>
                     </div>
                     <div className="flex justify-between border-b border-slate-200 dark:border-white/5 pb-2">
                        <span>Solution</span>
                        <span className="font-bold text-slate-900 dark:text-white">Zirconia Abutment</span>
                     </div>
                     <div className="flex justify-between">
                        <span>Time</span>
                        <span className="font-bold text-slate-900 dark:text-white">12 Weeks</span>
                     </div>
                  </div>
                  <button className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2 group">
                     View Protocol <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                  </button>
               </article>
            </div>
         </div>
      </section>

      {/* ================= TEAM ================= */}
      <section id="team" className="py-32 bg-slate-50 dark:bg-[#0b101b]">
         <div className="max-w-7xl mx-auto px-6">
            <div className="section-header mb-16 text-center">
               <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Your Implant Team</h2>
               <p className="text-slate-600 dark:text-slate-400 text-lg">ISO-certified experts with verifiable credentials.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
               <div className="group text-center">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 border-white dark:border-[#151b2b] shadow-xl">
                     <img src="/images/dhivakaran.webp" alt="Dr. Dhivakaran" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Dr. Dhivakaran</h3>
                  <p className="text-sm font-medium text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-4">Chief Implantologist</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 px-4">Over 3200+ implants placed. Fellow of International Congress of Oral Implantologists.</p>
               </div>
               
               <div className="group text-center">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 border-white dark:border-[#151b2b] shadow-xl">
                     <img src="/images/roger.webp" alt="Dr. Roger" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Dr. Roger</h3>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Prosthodontist</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 px-4">Specialist in digital smile design and full-mouth ceramic rehabilitation.</p>
               </div>
               
               <div className="group text-center">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 border-white dark:border-[#151b2b] shadow-xl">
                     <img src="/images/thikvijay.webp" alt="Dr. Thik Vijay" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Dr. Thik Vijay</h3>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-4">Smile Architect</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 px-4">Focuses on esthetic zone implants and gum contouring for natural results.</p>
               </div>
            </div>
         </div>
      </section>

      {/* ================= BRAND TIERS ================= */}
      <div id="pricing" className="bg-slate-50 dark:bg-[#0b101b] py-32 border-t border-slate-200 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6">
              <RevealOnScroll>
                  <div className="text-center mb-20">
                      <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">Choose Your Foundation</h2>
                      <p className="text-slate-600 dark:text-slate-400 text-lg">FDA-approved options categorized by bio-activity and origin.</p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {implantTiers.map((item, i) => (
                          <div key={i} className={`relative bg-white dark:bg-[#151b2b] rounded-[2.5rem] border p-10 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl flex flex-col overflow-hidden ${item.style} group`}>
                              {/* Background Gradient for Premium/Elite */}
                              {i > 0 && <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-current opacity-[0.03] pointer-events-none"></div>}
                              
                              <div className="flex justify-between items-start mb-6">
                                 <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{item.tier}</div>
                                 <div className="text-2xl">{item.origin.split(' ')[2]}</div>
                              </div>
                              
                              <div className="text-3xl font-black text-slate-900 dark:text-white mb-2 h-20 flex items-center leading-tight">{item.brand}</div>
                              <p className="text-sm text-slate-500 mb-8 font-medium leading-relaxed">{item.desc}</p>
                              
                              <div className="mt-auto space-y-4 mb-8">
                                  <div className="flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/5 p-3 rounded-xl">
                                     <ShieldCheck size={16} className="text-teal-500" /> 
                                     <span>{item.surface}</span>
                                  </div>
                                  <div className="flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/5 p-3 rounded-xl">
                                     <Clock size={16} className="text-blue-500" /> 
                                     <span>Healing: {item.healing}</span>
                                  </div>
                                  <div className="flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/5 p-3 rounded-xl">
                                     <Award size={16} className="text-amber-500" /> 
                                     <span>{item.warranty}</span>
                                  </div>
                              </div>

                              <div className="mb-8 pt-6 border-t border-slate-100 dark:border-white/5">
                                 <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Noble Price</span>
                                    <div className="text-right">
                                       <span className="block text-xs line-through text-slate-400 decoration-red-400">{item.market}</span>
                                       <span className="text-2xl font-black text-teal-600 dark:text-teal-400">{item.noble}</span>
                                    </div>
                                 </div>
                              </div>

                              <button className="w-full py-4 rounded-xl border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors">
                                 Select Tier
                              </button>
                          </div>
                      ))}
                  </div>
              </RevealOnScroll>
          </div>
      </div>

      {/* ================= FAQ ACCORDION ================= */}
      <section id="faq" className="py-32 max-w-4xl mx-auto px-6">
         <div className="text-center mb-20">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Common Questions</h2>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Reviewed by Dr. Dhivakaran & Implantology Team</p>
         </div>
         
         <div className="space-y-4">
            {[
               { q: "Is the procedure painful?", a: "No. Implants are placed under local anesthesia, so you feel numb just like a filling. Most patients report less discomfort than a tooth extraction. Post-op soreness is managed easily with standard painkillers for 1-2 days." },
               { q: "How long do they last?", a: "With proper hygiene (brushing/flossing), dental implants can last a lifetime. The titanium screw is permanent. The crown may need replacement after 15-20 years due to normal wear, similar to natural enamel." },
               { q: "Can I get implants if I have diabetes?", a: "Yes, provided your diabetes is controlled (HbA1c ≤ 7.5%). We use specialized implant surfaces (like Straumann SLActive) that accelerate healing specifically for diabetic patients. Uncontrolled diabetes poses a higher failure risk." },
               { q: "How long is the healing period?", a: "Typically 3-4 months for the bone to fuse with the implant. In some cases with excellent bone quality, we can load the crown immediately." },
               { q: "What if I don't have enough bone?", a: "We can perform bone grafting or a sinus lift to build up the bone volume before or during implant placement to ensure a stable foundation." }
            ].map((faq, i) => (
               <details key={i} className="group bg-white dark:bg-[#151b2b] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden transition-all duration-300 open:shadow-lg open:border-teal-500/50">
                  <summary className="flex items-center justify-between p-6 font-bold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors select-none">
                     {faq.q}
                     <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center group-open:bg-teal-500 group-open:text-white transition-colors">
                        <ChevronRight className="transition-transform duration-300 group-open:rotate-90" size={16} />
                     </div>
                  </summary>
                  <div className="px-6 pb-8 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                     {faq.a}
                  </div>
               </details>
            ))}
         </div>
      </section>

      {/* ================= CONTACT / BOOKING ================= */}
      <section id="contact" className="py-24 bg-slate-900 text-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="section-header text-center mb-16">
               <h2 className="text-4xl font-black mb-4">Talk to our Implant Concierge</h2>
               <p className="text-slate-400 text-lg">Send X-rays, insurance documents or schedule virtual second opinions.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
               <a href="tel:+918610425342" className="flex flex-col items-center p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors group">
                  <div className="w-16 h-16 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-400 mb-6 group-hover:scale-110 transition-transform">
                     <Phone size={32} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Call Reception</h3>
                  <p className="text-sm text-slate-400">+91 86104 25342</p>
               </a>
               
               <a href="https://wa.me/918610425342" className="flex flex-col items-center p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors group">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform">
                     <div className="ri-whatsapp-line text-3xl"></div> 
                     {/* Lucide doesn't have whatsapp icon, using text or similar */}
                     <span className="font-black text-xl">WA</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">WhatsApp Triage</h3>
                  <p className="text-sm text-slate-400">Share photos/X-rays</p>
               </a>
               
               <a href="mailto:care@nobledentalnallagandla.in" className="flex flex-col items-center p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors group">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                     <Mail size={32} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Email Records</h3>
                  <p className="text-sm text-slate-400">Send previous scans</p>
               </a>
               
               <a href="https://maps.app.goo.gl/fFbpcXZ9RBBCpWrg9" target="_blank" className="flex flex-col items-center p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors group">
                  <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                     <MapPin size={32} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Visit Clinic</h3>
                  <p className="text-sm text-slate-400">Nallagandla, Hyderabad</p>
               </a>
            </div>
         </div>
      </section>

      {/* ================= FOOTER CITATIONS ================= */}
      <div className="bg-slate-100 dark:bg-[#050910] py-16 text-center border-t border-slate-200 dark:border-white/5">
         <div className="max-w-4xl mx-auto px-6">
            <Globe size={24} className="mx-auto mb-6 text-slate-300" />
            <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">Scientific References</p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] font-medium text-slate-500 dark:text-slate-500">
               <span>Misch CE. Contemporary Implant Dentistry. 4th Ed.</span>
               <span>ITI Consensus Report 2022 – Evidence-based protocols.</span>
               <span>Mayo Clinic – Dental implant risks & success (2024).</span>
            </div>
         </div>
      </div>

    </div>
  );
}

const CrosshairIcon = ({size, className}: {size?: number, className?: string}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="22" y1="12" x2="18" y2="12"></line>
        <line x1="6" y1="12" x2="2" y2="12"></line>
        <line x1="12" y1="6" x2="12" y2="2"></line>
        <line x1="12" y1="22" x2="12" y2="18"></line>
    </svg>
);
