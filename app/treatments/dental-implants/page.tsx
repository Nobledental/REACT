'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Shield, Award, Activity, 
  Check, ScanLine, Cpu, Droplets, Ruler, User,
  Beaker, ShieldCheck, Microscope, Info, Zap,
  TrendingUp, Dna, Layers, Target, ChevronRight, ChevronLeft,
  Sparkles, DollarSign, TrendingDown, AlertCircle, XCircle, Play, 
  Bone, Scale, Clock, FileText
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination, Navigation } from 'swiper/modules';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Custom styles
const customStyles = `
  .implant-swiper .swiper-pagination-bullet { background: #3b82f6; opacity: 0.5; }
  .implant-swiper .swiper-pagination-bullet-active { background: #14b8a6; opacity: 1; width: 24px; border-radius: 4px; }
  .bone-pattern { background-image: radial-gradient(#cbd5e1 1px, transparent 1px); background-size: 10px 10px; }
  .dark .bone-pattern { background-image: radial-gradient(#334155 1px, transparent 1px); }
`;

export default function DentalImplantsPage() {
  const [boneSlider, setBoneSlider] = useState(50); // 0 = Bridge (Bone Loss), 100 = Implant (Healthy)
  const [activeBrand, setActiveBrand] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    },
    {
      tier: "Metal-Free (Zirconia)",
      brand: "Z-Systems / CeraRoot",
      origin: "Germany 🇩🇪",
      surface: "Zirconia Ceramic",
      healing: "12 Weeks",
      market: "₹90,000 - ₹1.2L",
      noble: "₹75,000 - ₹85,000",
      warranty: "20 Years",
      desc: "100% white, metal-free. Perfect for patients with metal allergies or thin gums."
    }
  ];

  const lifecycleSteps = [
    { title: "CBCT Bio-Mapping", sub: "Phase 01", desc: "3D imaging captures bone volume with 0.1mm accuracy to avoid nerves.", icon: Target },
    { title: "3D Guided Surgery", sub: "Phase 02", desc: "A printed template guides the drill, ensuring perfect angulation and depth.", icon: ScanLine },
    { title: "Osseointegration", sub: "Phase 03", desc: "Titanium fuses with bone. We use SLActive surface to cut healing time by 50%.", icon: Dna },
    { title: "Zirconia Loading", sub: "Phase 04", desc: "Computer-milled ceramic teeth are fixed. They reflect light exactly like enamel.", icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans transition-colors duration-500 overflow-x-hidden pt-20">
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
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
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
                        <button className="px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-full font-bold shadow-xl shadow-teal-500/20 transition-all flex items-center gap-2">
                            Book 3D Scan
                        </button>
                        <button className="px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-full font-bold transition-all flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-white/10">
                            <Play size={16} fill="currentColor" /> Virtual Surgery
                        </button>
                    </div>
                </RevealOnScroll>
            </div>

            {/* ANIMATED IMPLANT VISUAL */}
            <div className="order-1 lg:order-2 relative h-[500px] bg-slate-50 dark:bg-slate-900/50 backdrop-blur-md rounded-[3rem] border border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-2xl group">
                {/* Tech Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                {/* Animated Implant Screw SVG */}
                <svg viewBox="0 0 200 400" className="w-64 h-full relative z-10 drop-shadow-2xl">
                   <defs>
                      <linearGradient id="metalGradient" x1="0" y1="0" x2="1" y2="0">
                         <stop offset="0%" stopColor="#334155" />
                         <stop offset="50%" stopColor="#94a3b8" />
                         <stop offset="100%" stopColor="#334155" />
                      </linearGradient>
                      <filter id="glow">
                          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                   </defs>
                   
                   {/* Bone Mask (Pulsing) */}
                   <path d="M0,220 Q100,240 200,220 V400 H0 Z" fill="#f43f5e" fillOpacity="0.05" className="animate-pulse" />
                   
                   {/* Screw Rotating Animation */}
                   <g className="animate-[spin_4s_linear_infinite_reverse]" style={{ transformOrigin: '100px 250px' }}>
                      {/* Threads */}
                      <path d="M70,150 L130,150 L140,170 L60,170 Z M60,180 L140,180 L130,200 L70,200 Z M70,210 L130,210 L140,230 L60,230 Z M60,240 L140,240 L130,260 L70,260 Z" fill="url(#metalGradient)" />
                      {/* Core */}
                      <rect x="80" y="260" width="40" height="100" fill="url(#metalGradient)" rx="5" />
                   </g>
                   
                   {/* Crown Loading Animation */}
                   <g className="animate-[bounce_3s_infinite]">
                      <rect x="75" y="100" width="50" height="40" fill="white" rx="5" stroke="#94a3b8" strokeWidth="2" />
                      <path d="M75,100 L125,100 L130,80 L70,80 Z" fill="white" opacity="0.8" />
                   </g>
                </svg>

                {/* Floating Specs */}
                <div className="absolute top-10 right-10 bg-white/80 dark:bg-black/50 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg flex flex-col gap-1">
                   <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400"><Ruler size={12}/> Length: 11.5mm</div>
                   <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400"><Scale size={12}/> Torque: 35 Ncm</div>
                </div>

                <div className="absolute bottom-10 bg-white/80 dark:bg-black/50 px-6 py-3 rounded-full text-xs font-bold text-slate-900 dark:text-white backdrop-blur-md border border-slate-200 dark:border-white/20 shadow-lg flex items-center gap-2">
                   <Activity size={14} className="text-teal-500 animate-pulse" /> Osseointegration Active
                </div>
            </div>
        </div>
      </div>

      {/* ================= GLOBAL BRAND TIER LIST (PRICING) ================= */}
      <div className="bg-slate-50 dark:bg-[#0f172a] border-y border-slate-200 dark:border-white/5 py-32">
          <div className="max-w-7xl mx-auto px-6">
              <RevealOnScroll>
                  <div className="text-center mb-16">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-widest mb-4 border border-green-200 dark:border-green-800">
                          <TrendingDown size={14} /> Price Transparency Promise
                      </div>
                      <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Choose Your Foundation</h2>
                      <p className="text-slate-600 dark:text-slate-400">
                          We categorize implants by bio-activity and origin. All options are FDA approved.
                      </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {implantTiers.map((item, i) => (
                          <div 
                            key={i} 
                            onMouseEnter={() => setActiveBrand(item.brand)}
                            className="relative group bg-white dark:bg-[#151b2b] rounded-[2.5rem] border border-slate-200 dark:border-white/5 p-8 hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden shadow-xl"
                          >
                              {/* Tier Badge */}
                              <div className={`absolute top-0 left-0 w-full h-2 ${i===2 ? 'bg-gradient-to-r from-yellow-400 to-amber-600' : 'bg-gradient-to-r from-slate-300 to-slate-400'} opacity-80`}></div>
                              
                              <div className="relative z-10">
                                  <div className="flex justify-between items-start mb-4">
                                      <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{item.tier}</div>
                                      <div className="text-[10px] bg-slate-100 dark:bg-white/10 px-2 py-1 rounded text-slate-600 dark:text-slate-300">{item.origin}</div>
                                  </div>
                                  
                                  <div className="text-xl font-black text-slate-900 dark:text-white mb-1 leading-tight h-14 flex items-center">{item.brand}</div>
                                  
                                  {/* Pricing Block */}
                                  <div className="my-6 p-4 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-white/5">
                                      <div className="flex justify-between items-end mb-1">
                                          <span className="text-xs text-slate-400 uppercase">Noble Price</span>
                                          <span className="text-lg font-black text-teal-600 dark:text-teal-400">{item.noble}</span>
                                      </div>
                                      <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-200 dark:border-white/10 pt-2 mt-2">
                                          <span>Market Avg</span>
                                          <span className="line-through decoration-red-400">{item.market}</span>
                                      </div>
                                  </div>

                                  <ul className="space-y-3 mb-6">
                                      <li className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
                                          <ShieldCheck size={14} className="text-teal-500" /> {item.surface}
                                      </li>
                                      <li className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
                                          <Clock size={14} className="text-blue-500" /> Healing: {item.healing}
                                      </li>
                                      <li className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
                                          <Award size={14} className="text-amber-500" /> {item.warranty}
                                      </li>
                                  </ul>

                                  <button className="w-full py-3 rounded-xl border border-slate-200 dark:border-white/10 font-bold text-sm hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors">
                                      Select {item.brand.split(' ')[0]}
                                  </button>
                              </div>
                          </div>
                      ))}
                  </div>
              </RevealOnScroll>
          </div>
      </div>

      {/* ================= BONE LOSS SIMULATOR (COMPARISON) ================= */}
      <div className="max-w-7xl mx-auto px-6 py-32">
          <RevealOnScroll>
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">The "Wolf's Law" Effect</h2>
                  <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                      Bone requires stimulation to stay dense. Bridges sit <i>on top</i> of gums, causing the bone underneath to melt away (Resorption). Implants stimulate the bone like natural roots.
                  </p>
              </div>

              <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] bg-slate-100 dark:bg-black/40 rounded-[3rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl group">
                  
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

      {/* ================= TECH SPECS (PRECISION) ================= */}
      <div className="bg-slate-900 text-white py-32 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
                          <Microscope size={12} /> Clinical Engineering
                      </div>
                      <h2 className="text-4xl font-bold mb-6">Micron-Level Precision.</h2>
                      <p className="text-slate-400 text-lg leading-relaxed mb-8">
                          Our surgical protocols follow the strict guidelines of the International Team for Implantology (ITI). We measure success not just by survival, but by bone stability down to the micron.
                      </p>
                      
                      <div className="space-y-6">
                          <div className="flex gap-4 items-start">
                              <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400 shrink-0 border border-teal-500/20">
                                  <Scale size={24} />
                              </div>
                              <div>
                                  <h4 className="text-lg font-bold text-white">Insertion Torque: 35 Ncm</h4>
                                  <p className="text-slate-400 text-sm">Optimal compression for immediate stability without crushing bone cells.</p>
                              </div>
                          </div>
                          <div className="flex gap-4 items-start">
                              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 shrink-0 border border-blue-500/20">
                                  <Droplets size={24} />
                              </div>
                              <div>
                                  <h4 className="text-lg font-bold text-white">Surface: Hydrophilic SLA</h4>
                                  <p className="text-slate-400 text-sm">Chemically active surface attracts blood proteins in 45 seconds.</p>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="relative bg-white/5 rounded-3xl p-8 border border-white/10 bone-pattern">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/80"></div>
                      <div className="relative z-10 space-y-4">
                          {[
                              { k: "Drill Speed", v: "800 RPM (Low Heat)" },
                              { k: "Irrigation", v: "Saline 4°C" },
                              { k: "Gap Distance", v: "< 10 Microns" },
                              { k: "Abutment Seal", v: "Conical Connection" },
                          ].map((spec, i) => (
                              <div key={i} className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-white/5 backdrop-blur-sm">
                                  <span className="text-slate-400 font-mono text-sm uppercase">{spec.k}</span>
                                  <span className="text-teal-400 font-bold font-mono">{spec.v}</span>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* ================= LIFECYCLE SWIPER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-32">
          <RevealOnScroll>
              <div className="flex items-center justify-between mb-12">
                  <div>
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">The Surgical Roadmap</h2>
                      <p className="text-slate-500 mt-2">From scan to smile in 4 precise phases.</p>
                  </div>
              </div>

              <Swiper
                  modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
                  effect="coverflow"
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={1}
                  breakpoints={{
                      768: { slidesPerView: 2 },
                      1024: { slidesPerView: 2.5 }
                  }}
                  coverflowEffect={{
                      rotate: 0, stretch: 0, depth: 100, modifier: 2.5, slideShadows: false,
                  }}
                  autoplay={{ delay: 5000 }}
                  pagination={{ clickable: true }}
                  className="implant-swiper overflow-visible pb-12"
              >
                  {lifecycleSteps.map((step, idx) => (
                      <SwiperSlide key={idx}>
                          <div className="bg-white dark:bg-[#151b2b] rounded-[2.5rem] p-10 border border-slate-100 dark:border-white/5 shadow-xl h-[350px] flex flex-col justify-between group hover:border-teal-500/30 transition-all">
                              <div>
                                  <div className="flex items-center justify-between mb-8">
                                      <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
                                          <step.icon size={28} />
                                      </div>
                                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{step.sub}</span>
                                  </div>
                                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{step.title}</h3>
                                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{step.desc}</p>
                              </div>
                              <div className="w-full h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                  <div className="h-full bg-teal-500 w-0 group-hover:w-full transition-all duration-[2s] ease-out"></div>
                              </div>
                          </div>
                      </SwiperSlide>
                  ))}
              </Swiper>
          </RevealOnScroll>
      </div>

      {/* ================= CTA ================= */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
          <div className="bg-teal-600 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                  <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[1] tracking-tighter">Invest in <br/> Permanence.</h2>
                  <p className="text-teal-100 text-xl mb-12 leading-relaxed font-medium">
                      Don't settle for removable dentures. <br/>
                      Get a fixed solution backed by a Lifetime Warranty.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <button className="bg-white text-teal-700 px-12 py-5 rounded-full font-black text-lg hover:shadow-2xl hover:scale-105 transition-all">
                          Request Surgical Consult
                      </button>
                      <button className="bg-transparent border border-white/30 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-white/10 transition-all flex items-center gap-2 justify-center">
                          <FileText size={20} /> View Pricing PDF
                      </button>
                  </div>
              </div>
          </div>
      </div>

    </div>
  );
}
