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
  AlertTriangle, HelpCircle, Phone
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
    { id: 'heart', label: 'Heart', icon: HeartPulse, questions: [
        { q: "BP stable (≤140/90)", risk: 0 },
        { q: "Taking Blood Thinners (Aspirin/Clopidogrel)", risk: 10 },
        { q: "Heart Attack / Stroke (<6 months ago)", risk: 50 },
        { q: "Pacemaker Installed", risk: 5 }
    ]},
    { id: 'diabetes', label: 'Sugar', icon: Droplets, questions: [
        { q: "HbA1c ≤ 7.5% (Controlled)", risk: 0 },
        { q: "HbA1c 7.6% – 8.5%", risk: 20 },
        { q: "HbA1c > 8.5% (Uncontrolled)", risk: 50 },
        { q: "Heavy Smoking (>10/day)", risk: 30 }
    ]},
    { id: 'bone', label: 'Bone', icon: Bone, questions: [
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
      if (riskScore === 0) return { label: "Ideal Candidate", color: "text-emerald-500", bg: "bg-emerald-500" };
      if (riskScore < 30) return { label: "Moderate Risk (Needs Prep)", color: "text-amber-500", bg: "bg-amber-500" };
      return { label: "High Risk (Consult Specialist)", color: "text-red-500", bg: "bg-red-500" };
  };

  // --- DATA: IMPLANT TIERS ---
  const implantTiers = [
    {
      tier: "Standard (Value)",
      brand: "Osstem / Dentium",
      origin: "South Korea 🇰🇷",
      surface: "SLA Surface",
      healing: "10-12 Weeks",
      market: "₹25,000 - ₹35,000",
      noble: "₹18,000 - ₹22,000",
      warranty: "15 Years",
      desc: "Excellent entry-level implants with high success rates. Best for abundant bone cases."
    },
    {
      tier: "Premium (Gold)",
      brand: "Nobel Biocare Active",
      origin: "USA / Sweden 🇺🇸",
      surface: "TiUnite (Anodized)",
      healing: "8-10 Weeks",
      market: "₹45,000 - ₹60,000",
      noble: "₹35,000 - ₹42,000",
      warranty: "Lifetime (Global)",
      desc: "The inventors of modern dental implants. High stability in soft bone situations."
    },
    {
      tier: "Elite (Platinum)",
      brand: "Straumann SLActive®",
      origin: "Switzerland 🇨🇭",
      surface: "Hydrophilic SLA",
      healing: "3-4 Weeks (Rapid)",
      market: "₹65,000 - ₹85,000",
      noble: "₹52,000 - ₹58,000",
      warranty: "Lifetime + Card",
      desc: "The world's #1 implant. Chemical surface attracts blood for ultra-fast healing. Safe for diabetics."
    }
  ];

  // --- DATA: ANATOMY ---
  const anatomyLayers = [
    { id: 1, name: "Zirconia Crown", role: "The Visible Tooth", desc: "Diamond-hard ceramic that mimics natural enamel translucency. Stain-proof.", color: "bg-white text-slate-900" },
    { id: 2, name: "Titanium Abutment", role: "The Shock Absorber", desc: "Connects the crown to the screw. Absorbs biting forces to protect the jaw.", color: "bg-slate-300 text-slate-800" },
    { id: 3, name: "The Implant Screw", role: "The Artificial Root", desc: "Biocompatible Titanium Grade-5. Fuses with bone (Osseointegration).", color: "bg-slate-500 text-white" }
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 font-sans transition-colors duration-500 overflow-x-hidden pt-20">
      <style>{customStyles}</style>
      
      {/* ================= HERO SECTION ================= */}
      <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-white dark:bg-[#020617] transition-colors">
        <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-100 dark:bg-teal-600/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100 dark:bg-blue-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="absolute top-6 left-6 z-30">
             <Link href="/treatments" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-white dark:hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Catalog
             </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 order-2 lg:order-1">
                <RevealOnScroll>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20 text-teal-600 dark:text-teal-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
                        <Award size={12} /> ITI & ADA Certified Center
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
                        Biological <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 dark:from-teal-400 dark:to-blue-500">Architecture.</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-lg border-l-4 border-teal-500/50 pl-6 my-8">
                        Restore function with Swiss-Grade Titanium. <br/>
                        <span className="font-bold text-teal-600 dark:text-teal-400">99.2% Success Rate</span> via Guided Surgery Protocols.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button 
                            onClick={() => document.getElementById('self-check')?.scrollIntoView({behavior: 'smooth'})}
                            className="px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-full font-bold shadow-xl shadow-teal-500/20 transition-all flex items-center gap-2"
                        >
                            <ShieldCheck size={18} /> Check Eligibility
                        </button>
                        <button className="px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-full font-bold transition-all flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-white/10">
                            <Play size={16} fill="currentColor" /> Virtual Surgery Demo
                        </button>
                    </div>
                </RevealOnScroll>
            </div>

            {/* INTERACTIVE ANATOMY DEMO */}
            <div className="order-1 lg:order-2 flex flex-col items-center justify-center">
                <div className="relative w-full max-w-md perspective-1000">
                    <div className="text-center mb-8">
                         <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Interactive Schematic</h3>
                         <p className="text-lg font-bold text-slate-900 dark:text-white">Deconstruct the Bionic Tooth</p>
                    </div>
                    
                    <div className="space-y-4">
                        {anatomyLayers.map((layer) => (
                           <div 
                              key={layer.id}
                              onMouseEnter={() => setActiveLayer(layer.id)}
                              onMouseLeave={() => setActiveLayer(null)}
                              className={`anatomy-layer cursor-pointer p-6 rounded-3xl border border-slate-200 dark:border-white/10 transition-all duration-300 shadow-lg ${activeLayer === layer.id ? 'scale-105 shadow-2xl ring-2 ring-teal-500 z-10' : 'bg-white/80 dark:bg-[#151b2b]/80 backdrop-blur-md'}`}
                           >
                              <div className="flex items-center gap-4">
                                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-inner ${layer.color}`}>
                                    {layer.id}
                                 </div>
                                 <div>
                                    <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-sm">{layer.name}</h4>
                                    <p className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-1">{layer.role}</p>
                                    <div className={`overflow-hidden transition-all duration-300 ${activeLayer === layer.id ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                       <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">{layer.desc}</p>
                                    </div>
                                 </div>
                                 <ChevronRight className={`ml-auto text-slate-300 transition-transform ${activeLayer === layer.id ? 'rotate-90 text-teal-500' : ''}`} />
                              </div>
                           </div>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-center">
                       <div className="h-16 w-px bg-gradient-to-b from-teal-500 to-transparent"></div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* ================= ELIGIBILITY SELF-CHECK ================= */}
      <section id="self-check" className="py-24 bg-slate-100 dark:bg-[#0b1221]">
         <div className="max-w-6xl mx-auto px-6">
            <RevealOnScroll>
               <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Are You Eligible?</h2>
                  <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                     A quick screening to estimate your implant readiness. <br/>
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">*Informational only. Final decision via CBCT.</span>
                  </p>
               </div>

               <div className="grid lg:grid-cols-3 gap-8">
                  {/* Tabs */}
                  <div className="space-y-2">
                     {eligibilityCategories.map(cat => (
                        <button
                           key={cat.id}
                           onClick={() => setActiveTab(cat.id)}
                           className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${activeTab === cat.id ? 'bg-white dark:bg-[#151b2b] border-teal-500 shadow-lg' : 'bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-white/5'}`}
                        >
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeTab === cat.id ? 'bg-teal-100 text-teal-600' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                              <cat.icon size={20} />
                           </div>
                           <span className={`font-bold ${activeTab === cat.id ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>{cat.label} Check</span>
                           <ChevronRight size={16} className={`ml-auto ${activeTab === cat.id ? 'text-teal-500' : 'opacity-0'}`} />
                        </button>
                     ))}
                  </div>

                  {/* Question Panel */}
                  <div className="lg:col-span-2 bg-white dark:bg-[#151b2b] rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-white/5 shadow-xl relative overflow-hidden">
                     {eligibilityCategories.map(cat => (
                        activeTab === cat.id && (
                           <div key={cat.id} className="animate-in fade-in slide-in-from-right-4 duration-300">
                              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                 <cat.icon className="text-teal-500"/> {cat.label} Assessment
                              </h3>
                              <div className="space-y-4">
                                 {cat.questions.map((q, i) => (
                                    <label key={i} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-colors">
                                       <input 
                                          type="checkbox" 
                                          onChange={(e) => handleRiskChange(q.risk, e.target.checked, q.q)}
                                          className="mt-1 w-5 h-5 accent-teal-500 rounded focus:ring-teal-500"
                                       />
                                       <div>
                                          <span className="font-bold text-slate-700 dark:text-slate-200 block">{q.q}</span>
                                          {q.risk > 0 && <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">Risk Factor</span>}
                                       </div>
                                    </label>
                                 ))}
                              </div>
                           </div>
                        )
                     ))}

                     {/* Result Gauge */}
                     <div className="mt-12 pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                           <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg ${getRiskLevel().bg}`}>
                              {riskScore === 0 ? <CheckCircle2 size={32} /> : <AlertTriangle size={32} />}
                           </div>
                           <div>
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Eligibility Status</p>
                              <p className={`text-xl font-black ${getRiskLevel().color}`}>{getRiskLevel().label}</p>
                           </div>
                        </div>
                        <button className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:scale-105 transition-transform">
                           Book Consultation
                        </button>
                     </div>
                  </div>
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* ================= IMPLANT TYPES (SOLUTIONS) ================= */}
      <section className="py-24 max-w-7xl mx-auto px-6">
         <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Types of Solutions</h2>
            <p className="text-slate-600 dark:text-slate-400">Based on bone quality and number of missing teeth.</p>
         </div>
         <div className="grid md:grid-cols-3 gap-8">
            {/* Single */}
            <div className="bg-white dark:bg-[#151b2b] rounded-[2rem] p-8 border border-slate-200 dark:border-white/5 hover:border-teal-500 transition-colors group">
               <div className="w-14 h-14 bg-teal-50 dark:bg-teal-900/20 rounded-2xl flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 transition-transform">
                  <div className="font-black text-2xl">1</div>
               </div>
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Single Tooth</h3>
               <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  Replaces the root of a single missing tooth. The zirconia crown restores 100% function and looks identical to your natural teeth.
               </p>
               <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300"><Check size={14} className="text-teal-500"/> Preserves adjacent teeth</li>
                  <li className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300"><Check size={14} className="text-teal-500"/> Prevents bone loss</li>
               </ul>
            </div>

            {/* Bridge */}
            <div className="bg-white dark:bg-[#151b2b] rounded-[2rem] p-8 border border-slate-200 dark:border-white/5 hover:border-teal-500 transition-colors group">
               <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  <div className="font-black text-2xl">3+</div>
               </div>
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Implant Bridge</h3>
               <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  Ideal for 3 or more missing teeth. Two implants can support a bridge of 3-4 teeth, reducing cost without compromising stability.
               </p>
               <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300"><Check size={14} className="text-blue-500"/> Economical for gaps</li>
                  <li className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300"><Check size={14} className="text-blue-500"/> No loose dentures</li>
               </ul>
            </div>

            {/* Full Arch */}
            <div className="bg-white dark:bg-[#151b2b] rounded-[2rem] p-8 border border-slate-200 dark:border-white/5 hover:border-teal-500 transition-colors group">
               <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                  <RefreshCw size={28}/>
               </div>
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">All-on-4 / Full Arch</h3>
               <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  Complete jaw rehabilitation using 4-6 implants to support a full set of fixed teeth. A permanent alternative to dentures.
               </p>
               <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300"><Check size={14} className="text-purple-500"/> Immediate loading option</li>
                  <li className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300"><Check size={14} className="text-purple-500"/> Restores full bite force</li>
               </ul>
            </div>
         </div>
      </section>

      {/* ================= BONE LOSS SIMULATOR ================= */}
      <div className="max-w-7xl mx-auto px-6 py-24 bg-slate-50 dark:bg-[#0b1221] rounded-[3rem]">
          <RevealOnScroll>
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">The "Wolf's Law" Effect</h2>
                  <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                      Bone requires stimulation to stay dense. Bridges sit <i>on top</i> of gums, causing the bone underneath to melt away. Implants stimulate the bone like natural roots.
                  </p>
              </div>

              <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] bg-white dark:bg-black/40 rounded-[3rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl group">
                  {/* LEFT SIDE: BRIDGE (BAD) - Static Background */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50/30 dark:bg-red-900/10">
                      <div className="text-center opacity-60">
                          <Layers size={80} className="mx-auto mb-6 text-red-400" />
                          <h3 className="text-3xl font-black text-red-400 mb-2">Dental Bridge</h3>
                          <p className="text-lg font-bold text-red-400/80">5 Years Later: Bone Atrophy</p>
                          <div className="mt-8 w-64 h-32 border-b-4 border-dashed border-red-400/30 rounded-b-full mx-auto relative">
                              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs uppercase font-bold text-red-400 bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded">Bone Level Drops 30%</div>
                          </div>
                      </div>
                  </div>

                  {/* RIGHT SIDE: IMPLANT (GOOD) - Overlay controlled by Slider */}
                  <div 
                    className="absolute top-0 left-0 h-full bg-white dark:bg-[#151b2b] border-r-4 border-teal-500 flex items-center justify-center overflow-hidden transition-all duration-75 ease-out clip-path-slant"
                    style={{ width: `${boneSlider}%` }}
                  >
                      <div className="text-center w-full min-w-[1000px] flex flex-col items-center">
                          <div className="relative">
                              <ShieldCheck size={80} className="mx-auto mb-6 text-teal-500" />
                              <div className="absolute inset-0 bg-teal-500/20 blur-2xl rounded-full"></div>
                          </div>
                          <h3 className="text-3xl font-black text-teal-600 dark:text-teal-400 mb-2">Titanium Implant</h3>
                          <p className="text-lg font-bold text-teal-600/80 dark:text-teal-400/80">5 Years Later: Bone Preserved</p>
                          
                          <div className="mt-8 flex gap-4 items-end justify-center">
                              <div className="w-12 h-24 bg-slate-300 dark:bg-slate-600 rounded-t-lg"></div>
                              <div className="w-16 h-32 bg-teal-500 rounded-t-lg relative">
                                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-24 bg-white/20 rounded-sm"></div>
                              </div>
                              <div className="w-12 h-24 bg-slate-300 dark:bg-slate-600 rounded-t-lg"></div>
                          </div>
                          <div className="mt-4 text-xs uppercase font-bold text-teal-500 bg-teal-50 dark:bg-teal-900/20 px-3 py-1 rounded">Structural Integrity 100%</div>
                      </div>
                  </div>

                  {/* Slider UI */}
                  <div className="absolute bottom-8 left-8 right-8 z-30">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                          <span className="text-teal-500">Implant Protection</span>
                          <span className="text-red-400">Bridge Recession</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={boneSlider} 
                        onChange={(e) => setBoneSlider(Number(e.target.value))}
                        className="w-full h-3 bg-slate-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-teal-500 shadow-lg"
                      />
                      <div className="text-center mt-4">
                          <span className="bg-black/80 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl backdrop-blur-md">
                              Drag to Compare 5-Year Outcome
                          </span>
                      </div>
                  </div>
              </div>
          </RevealOnScroll>
      </div>

      {/* ================= RECOVERY DASHBOARD ================= */}
      <section className="py-24 max-w-7xl mx-auto px-6">
         <div className="section-header mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Patient Recovery Dashboard</h2>
            <p className="text-slate-600 dark:text-slate-400">Monitor your healing with our clinical indicator guide.</p>
         </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 rounded-3xl">
               <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 text-[10px] font-black uppercase rounded-full tracking-widest">Normal</span>
                  <CheckCircle2 className="text-emerald-600 dark:text-emerald-400"/>
               </div>
               <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">First 48 Hours</h3>
               <p className="text-sm text-slate-600 dark:text-slate-400">Mild swelling and slight oozing are expected. Manage with cold packs and rest.</p>
            </div>

            <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 rounded-3xl">
               <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 text-[10px] font-black uppercase rounded-full tracking-widest">Caution</span>
                  <AlertTriangle className="text-amber-600 dark:text-amber-400"/>
               </div>
               <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Bleeding &gt; 24 Hrs</h3>
               <p className="text-sm text-slate-600 dark:text-slate-400">If active bleeding persists beyond day 1, bite on sterile gauze for 30 mins. Contact us if it continues.</p>
            </div>

            <div className="p-6 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/30 rounded-3xl">
               <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 bg-rose-200 dark:bg-rose-800 text-rose-800 dark:text-rose-200 text-[10px] font-black uppercase rounded-full tracking-widest">Critical</span>
                  <Phone className="text-rose-600 dark:text-rose-400"/>
               </div>
               <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Numbness &gt; 6 Hrs</h3>
               <p className="text-sm text-slate-600 dark:text-slate-400">Persistent numbness in lip or chin after anesthesia wears off requires immediate evaluation.</p>
            </div>
         </div>
      </section>

      {/* ================= BIOLOGICAL SCIENCE (PRF) ================= */}
      <section className="py-24 bg-white dark:bg-[#151b2b]">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                     <Beaker size={14} /> Bio-Hacking Healing
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">PRF & Bone Grafting</h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                     We don't just place metal; we engineer biology. Using <strong>Platelet Rich Fibrin (PRF)</strong> derived from your own blood, we create a "super-clot" that accelerates bone fusion by 40%.
                  </p>
                  
                  <div className="space-y-6">
                     <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-900 dark:text-white"><Zap size={24} /></div>
                        <div>
                           <h4 className="font-bold text-slate-900 dark:text-white">Autograft (Your Bone)</h4>
                           <p className="text-sm text-slate-500">The gold standard. Harvested from your jaw for perfect compatibility.</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-900 dark:text-white"><Dna size={24} /></div>
                        <div>
                           <h4 className="font-bold text-slate-900 dark:text-white">Synthetic Alloplast</h4>
                           <p className="text-sm text-slate-500">Lab-engineered calcium phosphate for predictable volume.</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="relative h-[400px] bg-slate-100 dark:bg-black/20 rounded-[3rem] overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                  <div className="text-center p-8">
                     <Activity size={64} className="mx-auto mb-6 text-teal-500 animate-pulse" />
                     <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">100% Autologous</h3>
                     <p className="text-slate-500 dark:text-slate-400">No chemicals. Just your body's own growth factors.</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* ================= BRAND TIERS ================= */}
      <div className="bg-slate-50 dark:bg-[#0f172a] py-32">
          <div className="max-w-7xl mx-auto px-6">
              <RevealOnScroll>
                  <div className="text-center mb-16">
                      <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Choose Your Foundation</h2>
                      <p className="text-slate-600 dark:text-slate-400">FDA-approved options categorized by bio-activity and origin.</p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {implantTiers.map((item, i) => (
                          <div key={i} className="bg-white dark:bg-[#151b2b] rounded-[2.5rem] border border-slate-200 dark:border-white/5 p-8 hover:border-teal-500/50 transition-all hover:-translate-y-2 shadow-xl flex flex-col">
                              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{item.tier}</div>
                              <div className="text-xl font-black text-slate-900 dark:text-white mb-6 h-12 flex items-center">{item.brand}</div>
                              
                              <div className="mb-6 p-4 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-white/5">
                                 <div className="flex justify-between items-end">
                                    <span className="text-xs text-slate-400 uppercase">Noble Price</span>
                                    <span className="text-lg font-black text-teal-600 dark:text-teal-400">{item.noble}</span>
                                 </div>
                              </div>

                              <ul className="space-y-3 mb-8 flex-1">
                                  <li className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"><ShieldCheck size={14} className="text-teal-500" /> {item.surface}</li>
                                  <li className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"><Clock size={14} className="text-blue-500" /> Healing: {item.healing}</li>
                                  <li className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"><Award size={14} className="text-amber-500" /> {item.warranty}</li>
                              </ul>

                              <button className="w-full py-3 rounded-xl border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold text-sm hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors">Select Tier</button>
                          </div>
                      ))}
                  </div>
              </RevealOnScroll>
          </div>
      </div>

      {/* ================= FAQ ACCORDION ================= */}
      <section className="py-24 max-w-4xl mx-auto px-6">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Common Questions</h2>
            <p className="text-slate-500 text-sm">Reviewed by Dr. Dhivakaran & Implantology Team</p>
         </div>
         
         <div className="space-y-4">
            <details className="group bg-white dark:bg-[#151b2b] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden">
               <summary className="flex items-center justify-between p-6 font-bold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  Is the procedure painful?
                  <ChevronRight className="transition-transform group-open:rotate-90" size={20} />
               </summary>
               <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  No. Implants are placed under local anesthesia, so you feel numb just like a filling. Most patients report less discomfort than a tooth extraction. Post-op soreness is managed easily with standard painkillers for 1-2 days.
               </div>
            </details>
            <details className="group bg-white dark:bg-[#151b2b] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden">
               <summary className="flex items-center justify-between p-6 font-bold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  How long do they last?
                  <ChevronRight className="transition-transform group-open:rotate-90" size={20} />
               </summary>
               <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  With proper hygiene (brushing/flossing), dental implants can last a lifetime. The titanium screw is permanent. The crown may need replacement after 15-20 years due to normal wear, similar to natural enamel.
               </div>
            </details>
            <details className="group bg-white dark:bg-[#151b2b] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden">
               <summary className="flex items-center justify-between p-6 font-bold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  Can I get implants if I have diabetes?
                  <ChevronRight className="transition-transform group-open:rotate-90" size={20} />
               </summary>
               <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Yes, provided your diabetes is controlled (HbA1c ≤ 7.5%). We use specialized implant surfaces (like Straumann SLActive) that accelerate healing specifically for diabetic patients. Uncontrolled diabetes poses a higher failure risk.
               </div>
            </details>
         </div>
      </section>

      {/* ================= FOOTER CITATIONS ================= */}
      <div className="bg-slate-100 dark:bg-black/40 py-12 text-center text-xs text-slate-400">
         <p className="mb-2 uppercase font-bold tracking-widest">Scientific References</p>
         <p>Misch CE. Contemporary Implant Dentistry. 4th Ed.</p>
         <p>ITI Consensus Report 2022 – Evidence-based implant protocols.</p>
         <p>Mayo Clinic – Dental implant risks & success (2024).</p>
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
