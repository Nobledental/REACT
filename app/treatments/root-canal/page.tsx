'use client';

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
  const handleScrub = () => {
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
    { step: "01", title: "Digital Anaesthesia", desc: "Computer-controlled delivery for near-zero sensation.", icon: Activity },
    { step: "02", title: "Magnification Access", desc: "High-power loupes reveal hidden canals (MB2) invisible to naked eye.", icon: Eye },
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
                    <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
                        Root Canals <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 animate-gradient-x">Quiet Pain.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-lg border-l-4 border-purple-500 pl-6 my-10">
                        Don't remove. <strong className="text-purple-600 dark:text-purple-400">Revitalize.</strong> <br/>
                        We save infected teeth using Rotary Files, Lasers, and 3D precision in Nallagandla.
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
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Successful RCTs</div>
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
                  className="relative w-full max-w-[350px] h-[500px] bg-slate-50 dark:bg-[#0f1420] rounded-[3rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl group select-none cursor-crosshair"
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
                           alt="Root Canal Procedure" 
                           className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                        
                        <div className="absolute bottom-10 left-10 right-10">
                           <div className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl">
                              <div className="flex items-center gap-4 mb-4">
                                 <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white animate-pulse">
                                    <Scan size={24} />
                                 </div>
                                 <div>
                                    <h4 className="text-white font-bold">Digital Apex Locator</h4>
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
                     <div className="text-4xl font-black mb-2">₹4,500</div>
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
                     <div className="text-4xl font-black mb-2">₹6,000</div>
                     <p className="text-purple-200 text-sm mb-8">Back teeth (Molars). Multiple curved canals.</p>
                     <ul className="space-y-3 text-sm text-slate-200 mb-8">
                        <li className="flex gap-3"><CheckCircle2 size={16} className="text-green-400"/> Magnification Access</li>
                        <li className="flex gap-3"><CheckCircle2 size={16} className="text-green-400"/> MB2 Canal Search</li>
                        <li className="flex gap-3"><CheckCircle2 size={16} className="text-green-400"/> Bioceramic Seal</li>
                     </ul>
                     <button className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition-all font-bold text-sm shadow-lg">Select Plan</button>
                  </div>

                  <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                     <div className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-4">Re-Treatment</div>
                     <div className="text-4xl font-black mb-2">₹8,500</div>
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
                     <img src="/images/dhivakaran.webp" alt="Endodontist" className="w-full h-full object-cover" />
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white">Senior Endodontist</h3>
                     <p className="text-xs font-black text-purple-600 uppercase tracking-widest mb-2">Root Canal Specialist</p>
                     <p className="text-sm text-slate-500 dark:text-slate-400">3200+ RCTs completed. Specialist in calcified canals and re-treatment cases.</p>
                  </div>
               </div>

               <div className="flex gap-6 items-center p-6 bg-white dark:bg-[#151b2b] rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl transition-all">
                  <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-blue-500">
                     <img src="/images/roger.webp" alt="Restorative Dentist" className="w-full h-full object-cover" />
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white">Prosthodontist</h3>
                     <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">Crown Specialist</p>
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
