'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
/* Added Play to the imports to fix the error */
import { 
  ArrowLeft, Shield, Award, Activity, 
  Check, ScanLine, Cpu, Droplets, Ruler, User,
  Beaker, ShieldCheck, Microscope, Info, Zap,
  TrendingUp, Dna, Layers, Target, ChevronRight, ChevronLeft,
  Sparkles, DollarSign, TrendingDown, AlertCircle, XCircle, Play
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination, Navigation, Keyboard } from 'swiper/modules';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Custom styles for Swiper & Glow effects
const customStyles = `
  .implant-swiper .swiper-pagination-bullet { background: #3b82f6; opacity: 0.5; }
  .implant-swiper .swiper-pagination-bullet-active { background: #2563eb; opacity: 1; width: 24px; border-radius: 4px; }
  .clip-path-slant { clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%); }
`;

export default function DentalImplantsPage() {
  // --- STATE ---
  const [vitals, setVitals] = useState({ age: '35', smoking: 'none', diabetes: 'none' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [comparisonValue, setComparisonValue] = useState(50); // 0 = Bridge, 100 = Implant

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- CALCULATOR LOGIC ---
  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => { setIsAnalyzing(false); setShowResult(true); }, 1500);
  };

  const calculateScore = () => {
    let score = 100;
    if (vitals.smoking === 'heavy') score -= 30;
    if (vitals.smoking === 'light') score -= 15;
    if (vitals.diabetes === 'uncontrolled') score -= 40;
    if (vitals.diabetes === 'controlled') score -= 10;
    const ageNum = parseInt(vitals.age);
    if (ageNum < 18) return 0; 
    return Math.max(0, score);
  };

  const getStatus = (score: number) => {
    if (score === 0) return { label: 'Wait for Growth', color: 'text-amber-500', advice: 'Jaw growth incomplete (Under 18).' };
    if (score >= 85) return { label: 'Optimal Candidate', color: 'text-green-500', advice: 'Excellent prognosis for immediate loading.' };
    if (score >= 60) return { label: 'Good Candidate', color: 'text-blue-500', advice: 'May require minor PRF protocol.' };
    return { label: 'Complex Case', color: 'text-red-500', advice: 'Requires specialized bone grafting.' };
  };

  const finalScore = calculateScore();
  const status = getStatus(finalScore);

  // --- DATA ---
  const pricingData = [
    { type: "Single Titanium Implant", market: "₹35k - ₹50k", noble: "₹25k - ₹30k", savings: "Save ₹10k+", feature: "FDA Approved" },
    { type: "Zirconia Crown (Metal Free)", market: "₹15k - ₹25k", noble: "₹10k - ₹15k", savings: "Save ₹5k+", feature: "Natural Look" },
    { type: "Basal Implant (No Bone)", market: "₹45k - ₹60k", noble: "₹35k - ₹40k", savings: "Save ₹10k+", feature: "Avoid Grafting" },
    { type: "Full Mouth (All-on-4)", market: "₹3.5L - ₹5.0L", noble: "₹2.5L - ₹3.5L", savings: "Save ₹1 Lakh+", feature: "Fixed Teeth" },
  ];

  const lifecycleSteps = [
    { title: "Bio-Mapping", sub: "Phase 01", desc: "3D CBCT imaging captures bone density and nerve proximity with 0.1mm accuracy.", icon: Target },
    { title: "Guided Placement", sub: "Phase 02", desc: "Surgical guides ensure the implant is placed in the precise vector mapped during planning.", icon: Zap },
    { title: "Osseointegration", sub: "Phase 03", desc: "The titanium bonds with bone. We use L-PRF to accelerate this biological fuse.", icon: Dna },
    { title: "Aesthetic Loading", sub: "Phase 04", desc: "A custom-milled zirconia crown is attached, mimicking natural enamel.", icon: Sparkles }
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
                        <Award size={12} /> ITI Certified Center
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
                        Biological <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 dark:from-teal-400 dark:to-blue-500">Stability.</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-lg border-l-2 border-teal-200 dark:border-teal-500/30 pl-6 my-8">
                        The Gold Standard in tooth replacement. Swiss-engineered titanium anchors that fuse biologically with your jawbone.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-full font-bold shadow-xl transition-all flex items-center gap-2">
                            Book 3D Scan
                        </button>
                        <button className="px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-full font-bold transition-all flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-white/10">
                            <Play size={16} fill="currentColor" /> Virtual Surgery
                        </button>
                    </div>
                </RevealOnScroll>
            </div>

            <div className="order-1 lg:order-2 relative h-[500px] bg-slate-50 dark:bg-slate-900/50 backdrop-blur-md rounded-[3rem] border border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-2xl group">
                {/* Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                {/* Animated Implant Screw SVG */}
                <svg viewBox="0 0 200 400" className="w-64 h-full relative z-10 drop-shadow-2xl">
                   <defs>
                      <linearGradient id="metalGradient" x1="0" y1="0" x2="1" y2="0">
                         <stop offset="0%" stopColor="#334155" />
                         <stop offset="50%" stopColor="#94a3b8" />
                         <stop offset="100%" stopColor="#334155" />
                      </linearGradient>
                   </defs>
                   {/* Bone Mask */}
                   <path d="M0,220 Q100,240 200,220 V400 H0 Z" fill="#ec4899" fillOpacity="0.05" className="animate-pulse" />
                   {/* Screw Rotating */}
                   <g className="animate-[spin_4s_linear_infinite_reverse]" style={{ transformOrigin: '100px 250px' }}>
                      <path d="M70,150 L130,150 L140,170 L60,170 Z M60,180 L140,180 L130,200 L70,200 Z M70,210 L130,210 L140,230 L60,230 Z M60,240 L140,240 L130,260 L70,260 Z" fill="url(#metalGradient)" />
                      <rect x="80" y="260" width="40" height="100" fill="url(#metalGradient)" rx="5" />
                   </g>
                   {/* Crown Loading */}
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

      {/* ================= COMPARISON SLIDER: IMPLANT VS BRIDGE (NEW) ================= */}
      <div className="bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-white/5 py-32">
          <div className="max-w-7xl mx-auto px-6">
              <RevealOnScroll>
                  <div className="text-center mb-16">
                      <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Why Implants?</h2>
                      <p className="text-slate-600 dark:text-slate-400">See why bridges damage healthy teeth while implants preserve them.</p>
                  </div>

                  <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] md:aspect-[21/9] bg-white dark:bg-[#151b2b] rounded-3xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl">
                      {/* Left Side: Bridge (Bad) */}
                      <div className="absolute inset-0 flex items-center justify-center bg-red-50/50 dark:bg-red-900/10">
                          <div className="text-center opacity-50 grayscale blur-[1px]">
                              <Layers size={64} className="mx-auto mb-4 text-red-400" />
                              <h3 className="text-2xl font-bold text-red-400">Dental Bridge</h3>
                              <p className="text-sm">Healthy teeth filed down</p>
                          </div>
                      </div>

                      {/* Right Side: Implant (Good) - Width Controlled by Slider */}
                      <div 
                        className="absolute top-0 left-0 h-full bg-teal-50 dark:bg-teal-900/20 border-r-4 border-teal-500 flex items-center justify-center overflow-hidden transition-all duration-100 ease-out"
                        style={{ width: `${comparisonValue}%` }}
                      >
                          <div className="text-center w-full min-w-[800px]">
                              <ShieldCheck size={64} className="mx-auto mb-4 text-teal-500" />
                              <h3 className="text-2xl font-bold text-teal-600 dark:text-teal-400">Dental Implant</h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Bone preserved. Neighbors untouched.</p>
                          </div>
                      </div>

                      {/* Slider Control */}
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={comparisonValue} 
                        onChange={(e) => setComparisonValue(Number(e.target.value))}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-slate-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-teal-500 z-20"
                      />
                      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white/80 dark:bg-black/80 px-3 py-1 rounded-full backdrop-blur-md">
                          Drag to Compare
                      </div>
                  </div>
              </RevealOnScroll>
          </div>
      </div>

      {/* ================= HYDERABAD PRICING MATRIX ================= */}
      <div className="max-w-7xl mx-auto px-6 py-32">
          <RevealOnScroll>
              <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-widest mb-4 border border-green-200 dark:border-green-800">
                      <TrendingDown size={14} /> Price Transparency Promise
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Hyderabad Pricing Analysis</h2>
                  <p className="text-slate-600 dark:text-slate-400">We manufacture our own guides to save you 20-30% vs corporate chains.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {pricingData.map((plan, i) => (
                      <div key={i} className="relative group bg-white dark:bg-[#151b2b] rounded-[2rem] border border-slate-200 dark:border-white/5 p-8 hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden shadow-xl">
                          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-blue-500/0 group-hover:from-teal-500/5 group-hover:to-blue-500/5 transition-all duration-500"></div>
                          
                          <div className="relative z-10">
                              <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">{plan.type}</div>
                              <div className="text-2xl font-black text-slate-900 dark:text-white mb-1">{plan.noble}</div>
                              
                              <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 pb-6 border-b border-slate-100 dark:border-white/5">
                                  <span className="line-through decoration-red-500/50">Market: {plan.market}</span>
                              </div>

                              <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 px-2 py-1 rounded">{plan.feature}</span>
                                  <span className="text-xs font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                                      <TrendingDown size={12} /> {plan.savings}
                                  </span>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </RevealOnScroll>
      </div>

      {/* ================= VIABILITY CALCULATOR ================= */}
      <div className="bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-white/5 py-32">
          <div className="max-w-4xl mx-auto px-6">
              <div className="bg-white dark:bg-[#0B1019] rounded-[3rem] p-10 md:p-16 shadow-2xl border border-slate-100 dark:border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-blue-600"></div>
                  
                  <div className="text-center mb-12">
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Candidate Viability Check</h3>
                      <p className="text-slate-600 dark:text-slate-400">Implants require healthy bone and gums. Check your eligibility score.</p>
                  </div>

                  <div className="space-y-8">
                      {/* Age Slider */}
                      <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                              <span>Patient Age</span>
                              <span>{vitals.age} Years</span>
                          </div>
                          <input 
                             type="range" min="15" max="90" value={vitals.age} 
                             onChange={(e) => { setVitals({...vitals, age: e.target.value}); setShowResult(false); }}
                             className="w-full h-2 bg-slate-100 dark:bg-white/10 rounded-full appearance-none accent-teal-500"
                          />
                      </div>

                      {/* Selectors */}
                      <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                              <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Smoking Habit</label>
                              <select 
                                value={vitals.smoking} 
                                onChange={(e) => {setVitals({...vitals, smoking: e.target.value}); setShowResult(false);}}
                                className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-teal-500 outline-none dark:text-white"
                              >
                                  <option value="none">Non-smoker</option>
                                  <option value="light">Occasional</option>
                                  <option value="heavy">Heavy Smoker</option>
                              </select>
                          </div>
                          <div className="space-y-2">
                              <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Diabetes</label>
                              <select 
                                value={vitals.diabetes} 
                                onChange={(e) => {setVitals({...vitals, diabetes: e.target.value}); setShowResult(false);}}
                                className="w-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-teal-500 outline-none dark:text-white"
                              >
                                  <option value="none">None</option>
                                  <option value="controlled">Controlled</option>
                                  <option value="uncontrolled">Uncontrolled</option>
                              </select>
                          </div>
                      </div>

                      <button 
                         onClick={runAnalysis}
                         disabled={isAnalyzing}
                         className="w-full py-5 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                         {isAnalyzing ? <Activity size={18} className="animate-spin" /> : <Cpu size={18} />}
                         {isAnalyzing ? 'Scanning Parameters...' : 'Calculate Score'}
                      </button>

                      {showResult && !isAnalyzing && (
                         <div className="mt-8 p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-center animate-in zoom-in">
                            <div className="text-5xl font-black text-teal-600 dark:text-teal-400 mb-2">{finalScore}%</div>
                            <div className={`text-lg font-bold mb-1 ${status.color}`}>{status.label}</div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{status.advice}</p>
                         </div>
                      )}
                  </div>
              </div>
          </div>
      </div>

      {/* ================= LIFECYCLE CAROUSEL ================= */}
      <div className="max-w-7xl mx-auto px-6 py-32">
          <RevealOnScroll>
              <div className="flex items-center justify-between mb-12">
                  <div>
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Treatment Lifecycle</h2>
                      <p className="text-slate-500 mt-2">The biological roadmap to a permanent new tooth.</p>
                  </div>
                  <div className="hidden md:flex gap-2">
                      <button className="swiper-prev w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-teal-600 hover:border-teal-600 transition-all">
                          <ChevronLeft size={24} />
                      </button>
                      <button className="swiper-next w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-teal-600 hover:border-teal-600 transition-all">
                          <ChevronRight size={24} />
                      </button>
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
                  navigation={{ nextEl: '.swiper-next', prevEl: '.swiper-prev' }}
                  className="implant-swiper overflow-visible pb-12"
              >
                  {lifecycleSteps.map((step, idx) => (
                      <SwiperSlide key={idx}>
                          <div className="bg-white dark:bg-[#151b2b] rounded-[2.5rem] p-10 border border-slate-100 dark:border-white/5 shadow-xl h-[400px] flex flex-col justify-between group hover:border-teal-500/30 transition-all">
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
                  <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[1] tracking-tighter">Restore Your <br/> Smile Forever.</h2>
                  <p className="text-teal-100 text-xl mb-12 leading-relaxed font-medium">Book a 3D CBCT bone assessment at our Nallagandla facility for a definitive clinical plan.</p>
                  <button className="bg-white text-teal-700 px-12 py-5 rounded-full font-black text-lg hover:shadow-2xl hover:scale-105 transition-all">
                      Request Surgical Consult
                  </button>
              </div>
          </div>
      </div>

    </div>
  );
}
