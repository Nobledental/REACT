'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Shield, Award, Activity, 
  Check, ScanLine, Cpu, Droplets, Ruler, User,
  Beaker, ShieldCheck, Microscope, Info, Zap,
  TrendingUp, Dna, Layers, Target, ChevronRight, ChevronLeft,
  Sparkles, DollarSign, TrendingDown, AlertCircle, XCircle, Play, 
  Bone, Scale, Clock, FileText, Calculator, RefreshCw, ThumbsUp,
  HeartPulse, Brain, Baby, Cigarette, Pill, Thermometer, CheckCircle2,
  AlertTriangle, HelpCircle, Phone, Globe
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
`;

export default function DentalImplantsPage() {
  const [boneSlider, setBoneSlider] = useState(50);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [calculatorYears, setCalculatorYears] = useState(20);
  
  // Self Check State
  const [activeTab, setActiveTab] = useState('heart');
  const [riskScore, setRiskScore] = useState(0);
  const [riskFactors, setRiskFactors] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
      style: "border-amber-400/50 bg-amber-50/50 dark:bg-amber-900/10 shadow-amber-500/10"
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
      style: "border-slate-400 dark:border-slate-500 bg-slate-100 dark:bg-slate-800/50 shadow-blue-500/10"
    }
  ];

  // --- DATA: ANATOMY ---
  const anatomyLayers = [
    { id: 1, name: "Zirconia Crown", role: "The Visible Tooth", desc: "Diamond-hard ceramic that mimics natural enamel translucency. Stain-proof.", color: "bg-white text-slate-900 shadow-xl" },
    { id: 2, name: "Titanium Abutment", role: "The Shock Absorber", desc: "Connects the crown to the screw. Absorbs biting forces to protect the jaw.", color: "bg-slate-200 text-slate-800" },
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
      <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#020617] text-white">
        {/* Dynamic Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[120px] animate-pulse duration-[4000ms]"></div>
            <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
        </div>

        <div className="absolute top-6 left-6 z-30">
             <Link href="/treatments" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all text-[10px] font-bold uppercase tracking-widest group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Catalog
             </Link>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 order-2 lg:order-1">
                <RevealOnScroll>
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-teal-900/30 border border-teal-500/30 text-teal-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-8 shadow-[0_0_20px_rgba(20,184,166,0.3)]">
                        <Award size={14} /> ITI & ADA Certified Center
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black text-white leading-[0.85] tracking-tighter">
                        Biological <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-teal-200 animate-gradient-x">Architecture.</span>
                    </h1>
                    <p className="text-xl text-slate-300 font-light leading-relaxed max-w-lg border-l-2 border-teal-500/50 pl-6 my-10">
                        Restore function with Swiss-Grade Titanium. <br/>
                        <span className="font-bold text-teal-400">99.2% Success Rate</span> via Guided Surgery Protocols.
                    </p>

                    <div className="flex flex-wrap gap-5">
                        <button 
                            onClick={() => document.getElementById('self-check')?.scrollIntoView({behavior: 'smooth'})}
                            className="px-10 py-5 bg-teal-500 text-[#020617] rounded-full font-black uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(20,184,166,0.4)] hover:bg-teal-400 hover:scale-105 transition-all flex items-center gap-3"
                        >
                            <ShieldCheck size={18} /> Check Eligibility
                        </button>
                        <button className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-full font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-3 hover:bg-white/10">
                            <Play size={16} fill="currentColor" /> Watch 3D Demo
                        </button>
                    </div>
                </RevealOnScroll>
            </div>

            {/* INTERACTIVE ANATOMY DEMO */}
            <div className="order-1 lg:order-2 flex flex-col items-center justify-center">
                <div className="relative w-full max-w-md perspective-1000">
                    <div className="text-center mb-12">
                         <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500 mb-3 animate-pulse">Interactive Schematic</h3>
                         <p className="text-2xl font-bold text-white tracking-tight">Deconstruct the Bionic Tooth</p>
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
                                    ? 'bg-white/10 border-teal-500/50 scale-105 shadow-[0_0_40px_rgba(20,184,166,0.1)] z-10' 
                                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                                }
                              `}
                           >
                              <div className="flex items-center gap-5">
                                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transition-transform duration-500 ${activeLayer === layer.id ? 'rotate-12 scale-110' : ''} ${layer.color}`}>
                                    {layer.id}
                                 </div>
                                 <div>
                                    <h4 className="font-black text-white uppercase tracking-wider text-sm mb-1">{layer.name}</h4>
                                    <p className="text-[10px] font-bold text-teal-400 uppercase tracking-widest mb-1">{layer.role}</p>
                                    <div className={`overflow-hidden transition-all duration-500 ease-out ${activeLayer === layer.id ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                       <p className="text-xs text-slate-400 leading-relaxed">{layer.desc}</p>
                                    </div>
                                 </div>
                                 <ChevronRight className={`ml-auto text-slate-500 transition-all duration-300 ${activeLayer === layer.id ? 'rotate-90 text-teal-400 translate-x-1' : ''}`} />
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
      </div>

      {/* ================= ELIGIBILITY SELF-CHECK ================= */}
      <section id="self-check" className="py-32 relative overflow-hidden">
         <div className="absolute inset-0 bg-slate-50 dark:bg-[#0b101b]"></div>
         {/* Background Grid */}
         <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>

         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <RevealOnScroll>
               <div className="text-center mb-20">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200 dark:bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">
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
      <section className="py-32 bg-white dark:bg-[#0f1420] relative">
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
      <div className="max-w-7xl mx-auto px-6 py-32 bg-slate-100 dark:bg-[#0b1221] rounded-[4rem] my-20 overflow-hidden relative">
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
      <section className="py-32 max-w-7xl mx-auto px-6">
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

      {/* ================= BRAND TIERS ================= */}
      <div className="bg-slate-50 dark:bg-[#0b101b] py-32 border-t border-slate-200 dark:border-white/5">
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
      <section className="py-32 max-w-4xl mx-auto px-6">
         <div className="text-center mb-20">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Common Questions</h2>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Reviewed by Dr. Dhivakaran & Implantology Team</p>
         </div>
         
         <div className="space-y-4">
            {[
               { q: "Is the procedure painful?", a: "No. Implants are placed under local anesthesia, so you feel numb just like a filling. Most patients report less discomfort than a tooth extraction. Post-op soreness is managed easily with standard painkillers for 1-2 days." },
               { q: "How long do they last?", a: "With proper hygiene (brushing/flossing), dental implants can last a lifetime. The titanium screw is permanent. The crown may need replacement after 15-20 years due to normal wear, similar to natural enamel." },
               { q: "Can I get implants if I have diabetes?", a: "Yes, provided your diabetes is controlled (HbA1c ≤ 7.5%). We use specialized implant surfaces (like Straumann SLActive) that accelerate healing specifically for diabetic patients. Uncontrolled diabetes poses a higher failure risk." }
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
