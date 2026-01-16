'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, CheckCircle2, Shield, Sparkles, Zap, ChevronRight, 
  Play, ArrowRight, Clock, Activity, Scan, Smile, XCircle, Check, AlertCircle, 
  TrendingDown, BrainCircuit, Cpu, Info, Sliders, DollarSign, Microscope
} from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export default function BracesPage() {
  // --- STATE MANAGEMENT ---
  const [activeStage, setActiveStage] = useState(0);
  const [sliderValue, setSliderValue] = useState(50); // 0 = Crooked, 100 = Straight
  const [foodCategory, setFoodCategory] = useState<'safe' | 'avoid'>('avoid');
  const [isScanning, setIsScanning] = useState(true);

  // --- DATA ---
  const journeyStages = [
    { title: "Digital Bonding", month: "Day 1", desc: "Brackets placed digitally first, then transferred to teeth with 3D printed guides." },
    { title: "Leveling Phase", month: "Month 1-4", desc: "Super-elastic NiTi wires unwind, gently pulling teeth into the arch form." },
    { title: "Bite Correction", month: "Month 5-12", desc: "Heavy steel wires & elastics fix overbite/underbite for perfect jaw mesh." },
    { title: "Micro-Esthetics", month: "Month 13-16", desc: "Laser gum contouring and fine-tuning individual tooth angles." },
    { title: "Retention", month: "Lifetime", desc: "Dual retention (Fixed Wire + Clear Tray) ensures zero relapse." }
  ];

  const pricingData = [
    { 
      type: "Metal Braces", 
      market: "₹35k - ₹45k", 
      noble: "₹25k - ₹32k", 
      savings: "Save ₹10k", 
      feature: "Classic & Durable",
      desc: "High-grade stainless steel. Best for complex surgical cases."
    },
    { 
      type: "Ceramic (Invisible)", 
      market: "₹60k - ₹75k", 
      noble: "₹45k - ₹55k", 
      savings: "Save ₹15k", 
      feature: "Tooth-Colored",
      desc: "Polycrystalline brackets that blend with your enamel."
    },
    { 
      type: "Self-Ligating (Damon)", 
      market: "₹75k - ₹95k", 
      noble: "₹60k - ₹70k", 
      savings: "Save ₹15k", 
      feature: "Fast & Painless",
      desc: "No elastics. 30% faster treatment with slide-lock technology."
    },
    { 
      type: "Invisible Aligners", 
      market: "₹1.5L - ₹3.0L", 
      noble: "₹90k - ₹1.4L", 
      savings: "Save ₹50k+", 
      feature: "Removable & Clear",
      desc: "AI-planned clear trays. The ultimate aesthetic choice."
    },
  ];

  const foodGuide = {
    safe: [
        { name: "Soft Fruits", desc: "Bananas, Berries", icon: Check },
        { name: "Dairy", desc: "Yogurt, Cheese", icon: Check },
        { name: "Grains", desc: "Pasta, Rice, Soft Bread", icon: Check },
        { name: "Proteins", desc: "Fish, Eggs, Chicken", icon: Check },
    ],
    avoid: [
        { name: "Sticky Foods", desc: "Caramel, Gum", icon: XCircle },
        { name: "Hard Foods", desc: "Nuts, Ice, Popcorn", icon: XCircle },
        { name: "Crunchy Veg", desc: "Raw Carrots (Cut them!)", icon: AlertCircle },
        { name: "Chewy Bread", desc: "Bagels, Pizza Crust", icon: AlertCircle },
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans transition-colors duration-500 overflow-x-hidden pt-20">
      
      {/* ================= HERO SECTION ================= */}
      <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-white dark:bg-[#020617] transition-colors">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px]"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        </div>

        <div className="absolute top-6 left-6 z-30">
             <Link href="/treatments" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-white dark:hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
             </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text Content */}
            <div className="space-y-8 order-2 lg:order-1">
                <RevealOnScroll>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-6 animate-fade-in">
                        <Cpu size={12} /> Biometric Orthodontics v4.0
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter mb-6">
                        Precision <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Biomechanics.</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-lg border-l-4 border-blue-500/50 pl-6 my-8">
                        Experience <strong>Self-Ligating Technology</strong> that reduces treatment time by 6 months. 
                        No friction. No pain. Just results.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-4 bg-slate-900 dark:bg-blue-600 hover:scale-105 hover:shadow-blue-500/25 text-white rounded-full font-bold shadow-xl transition-all flex items-center gap-2">
                            Book Free Scan
                        </button>
                        <button className="px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-full font-bold transition-all flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-white/10">
                            <Play size={16} fill="currentColor" /> See Simulation
                        </button>
                    </div>
                </RevealOnScroll>
            </div>

            {/* Right: INTERACTIVE SIMULATOR (Scanner Effect) */}
            <div className="relative flex justify-center items-center order-1 lg:order-2">
                <div className="relative w-full max-w-[500px] aspect-square bg-slate-50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[3rem] border border-slate-200 dark:border-white/10 p-8 flex flex-col items-center justify-center overflow-hidden shadow-2xl group">
                    
                    {/* The Teeth SVG */}
                    <div className="relative w-64 h-40 mb-8">
                        <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-2xl overflow-visible">
                            <defs>
                                <linearGradient id="wireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#64748b" />
                                    <stop offset="50%" stopColor="#cbd5e1" />
                                    <stop offset="100%" stopColor="#64748b" />
                                </linearGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                                    <feMerge>
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                            
                            {/* Archwire - Adapts to Slider */}
                            <path 
                              d={`M10,60 Q100,${10 + (sliderValue/2)} 190,60`} 
                              fill="none" 
                              stroke="url(#wireGrad)" 
                              strokeWidth="3" 
                              strokeLinecap="round"
                              className="transition-all duration-300 ease-out"
                            />

                            {/* Teeth Group */}
                            {[30, 65, 100, 135, 170].map((x, i) => {
                                // Calculate displacement based on slider value (0 to 100)
                                // At 0 (crooked), lots of random offset. At 100 (straight), 0 offset.
                                const maxOffset = (i % 2 === 0 ? 15 : -15); 
                                const currentOffset = maxOffset * (1 - (sliderValue / 100));
                                const currentRotation = (maxOffset * 2) * (1 - (sliderValue / 100));

                                return (
                                    <g key={i} className="transition-all duration-300 ease-out" style={{ transform: `translate(${x}px, ${50 + currentOffset}px) rotate(${currentRotation}deg)`, transformOrigin: `${x}px 50px` }}>
                                        <rect x={-10} y={-14} width="20" height="28" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
                                        <rect x={-5} y={-5} width="10" height="10" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
                                    </g>
                                );
                            })}
                        </svg>

                        {/* Scanner Laser Effect */}
                        {isScanning && (
                            <div className="absolute inset-0 w-full h-1 bg-blue-500/80 shadow-[0_0_20px_rgba(59,130,246,0.8)] animate-[scan_3s_ease-in-out_infinite] pointer-events-none"></div>
                        )}
                    </div>

                    {/* Interactive Slider Control */}
                    <div className="w-full px-8 relative z-20">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                            <span>Before</span>
                            <span className="text-blue-500">Projected Result</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={sliderValue} 
                            onChange={(e) => {
                                setSliderValue(Number(e.target.value));
                                setIsScanning(false); // Stop auto-scan when user interacts
                            }}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <div className="text-center mt-4 text-xs text-slate-500">
                            Drag slider to simulate movement
                        </div>
                    </div>

                    {/* Floating Tech Badge */}
                    <div className="absolute top-4 right-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-500 border border-blue-500/20 shadow-lg">
                        AI Simulation Active
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* ================= PRICING MATRIX (ADVANCED) ================= */}
      <div className="bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-white/5 py-32">
          <div className="max-w-7xl mx-auto px-6">
              <RevealOnScroll>
                  <div className="text-center mb-16">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-widest mb-4 border border-green-200 dark:border-green-800">
                          <TrendingDown size={14} /> Hyderabad Market Analysis 2024
                      </div>
                      <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Transparent Pricing.</h2>
                      <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                          We cut out the corporate middlemen to offer premium orthodontic care at <strong>₹5,000 - ₹10,000 less</strong> than standard Hyderabad clinic rates.
                      </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {pricingData.map((plan, i) => (
                          <div key={i} className="relative group bg-white dark:bg-[#0B1019] rounded-[2.5rem] border border-slate-200 dark:border-white/5 p-8 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden shadow-xl hover:shadow-2xl dark:shadow-none">
                              {/* Glowing Edge on Hover */}
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none"></div>
                              
                              <div className="relative z-10">
                                  <div className="flex justify-between items-start mb-4">
                                      <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{plan.type}</div>
                                      {i === 2 && <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">Recommended</span>}
                                  </div>
                                  
                                  <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{plan.noble}</div>
                                  <div className="text-xs text-green-600 dark:text-green-400 font-bold flex items-center gap-1 mb-6">
                                      <TrendingDown size={12} /> {plan.savings} vs avg
                                  </div>

                                  <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl mb-6">
                                      <div className="text-[10px] uppercase text-slate-400 mb-1">Market Price</div>
                                      <div className="text-sm font-bold text-slate-500 line-through decoration-red-400">{plan.market}</div>
                                  </div>

                                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 border-l-2 border-blue-500/20 pl-3">
                                      {plan.desc}
                                  </p>

                                  <button className="w-full py-3 rounded-xl border border-slate-200 dark:border-white/10 font-bold text-sm hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors">
                                      Check Eligibility
                                  </button>
                              </div>
                          </div>
                      ))}
                  </div>
              </RevealOnScroll>
          </div>
      </div>

      {/* ================= TECH SPECS ================= */}
      <div className="max-w-7xl mx-auto px-6 py-32">
          <RevealOnScroll>
              <div className="grid md:grid-cols-3 gap-12 text-center">
                  <div className="space-y-4 group">
                      <div className="mx-auto w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                          <BrainCircuit size={40} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">AI Growth Prediction</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed px-4">
                          We use proprietary AI algorithms to forecast jaw growth in teenagers, preventing the need for extractions in 95% of cases.
                      </p>
                  </div>
                  <div className="space-y-4 group">
                      <div className="mx-auto w-20 h-20 bg-purple-50 dark:bg-purple-900/20 rounded-[2rem] flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                          <Microscope size={40} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Smart-Wire Tech</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed px-4">
                          Copper-NiTi wires activated by body heat. They apply a constant, ultra-light force (25g) that moves teeth faster with less soreness.
                      </p>
                  </div>
                  <div className="space-y-4 group">
                      <div className="mx-auto w-20 h-20 bg-teal-50 dark:bg-teal-900/20 rounded-[2rem] flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
                          <Scan size={40} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Digital Bonding</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed px-4">
                          We don't "eyeball" it. Brackets are positioned digitally on your 3D scan, then transferred to your teeth with 100% micron accuracy.
                      </p>
                  </div>
              </div>
          </RevealOnScroll>
      </div>

      {/* ================= JOURNEY TIMELINE ================= */}
      <div className="bg-slate-50 dark:bg-[#0f172a] border-y border-slate-200 dark:border-white/5 py-32">
          <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-20">
                  <div className="space-y-8">
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">The Clinical Roadmap</h3>
                      {journeyStages.map((stage, idx) => (
                          <div 
                            key={idx}
                            onClick={() => setActiveStage(idx)}
                            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-l-4 ${
                                activeStage === idx 
                                ? 'bg-white dark:bg-white/5 border-l-blue-500 shadow-xl dark:shadow-none' 
                                : 'bg-transparent border-l-slate-200 dark:border-l-white/10 hover:bg-white/50 dark:hover:bg-white/5'
                            }`}
                          >
                              <div className="flex items-center justify-between mb-2">
                                  <h3 className={`text-lg font-bold ${activeStage === idx ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                                      {stage.title}
                                  </h3>
                                  <span className="text-xs font-bold bg-slate-100 dark:bg-white/10 px-3 py-1 rounded-full text-slate-600 dark:text-slate-300">{stage.month}</span>
                              </div>
                              <p className={`text-sm transition-all duration-300 ${activeStage === idx ? 'text-slate-600 dark:text-slate-300 max-h-20 opacity-100' : 'text-slate-400 max-h-0 opacity-0 overflow-hidden'}`}>
                                  {stage.desc}
                              </p>
                          </div>
                      ))}
                  </div>

                  <div className="relative h-full min-h-[400px] bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-white/10 p-10 flex flex-col justify-center items-center text-center shadow-2xl sticky top-32">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-[2.5rem]"></div>
                      
                      <div className="w-24 h-24 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center mb-8 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">
                          <Clock size={40} />
                      </div>
                      
                      <h3 className="text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{journeyStages[activeStage].month}</h3>
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6">{journeyStages[activeStage].title}</div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm text-sm">
                          {journeyStages[activeStage].desc}
                      </p>

                      <div className="w-full bg-slate-100 dark:bg-white/10 rounded-full h-3 mt-12 overflow-hidden">
                          <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out" 
                              style={{ width: `${((activeStage + 1) / journeyStages.length) * 100}%` }}
                          ></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* ================= INTERACTIVE FOOD GUIDE ================= */}
      <div className="max-w-7xl mx-auto px-6 py-32">
          <RevealOnScroll>
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Life with Braces</h2>
                      <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                          Protecting your appliances is key to finishing on time. Broken brackets can add 1-2 months to your treatment time.
                      </p>
                      
                      <div className="flex gap-4 mb-8">
                          <button 
                            onClick={() => setFoodCategory('avoid')}
                            className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${foodCategory === 'avoid' ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-slate-100 dark:bg-white/10 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/20'}`}
                          >
                              🚫 Danger Zone
                          </button>
                          <button 
                            onClick={() => setFoodCategory('safe')}
                            className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${foodCategory === 'safe' ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-slate-100 dark:bg-white/10 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/20'}`}
                          >
                              ✅ Safe Zone
                          </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                          {foodGuide[foodCategory].map((item, i) => (
                              <div key={i} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center gap-4 animate-fade-in-up">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${foodCategory === 'safe' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-red-100 dark:bg-red-900/30 text-red-600'}`}>
                                      <item.icon size={20} />
                                  </div>
                                  <div>
                                      <div className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</div>
                                      <div className="text-xs text-slate-500">{item.desc}</div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Interactive Visual */}
                  <div className={`relative h-[400px] rounded-[3rem] border transition-all duration-500 overflow-hidden flex items-center justify-center p-10 ${foodCategory === 'safe' ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30'}`}>
                      <div className="text-center">
                          <Shield size={80} className={`mx-auto mb-6 transition-colors duration-500 ${foodCategory === 'safe' ? 'text-green-500' : 'text-red-500'}`} />
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                              {foodCategory === 'safe' ? "Bracket Safe" : "High Risk"}
                          </h3>
                          <p className="text-slate-500 max-w-xs mx-auto text-sm">
                              {foodCategory === 'safe' ? "These foods are soft and won't pop your brackets off." : "Shear force from these foods will snap the adhesive instantly."}
                          </p>
                      </div>
                  </div>
              </div>
          </RevealOnScroll>
      </div>

      {/* ================= CTA FOOTER ================= */}
      <div className="max-w-5xl mx-auto px-6 py-20 text-center border-t border-slate-200 dark:border-white/5">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">Your smile, engineered.</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg">
              Ready to start? We offer <strong>0% Interest EMI</strong> plans starting at just ₹2,500/month.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform flex items-center gap-2 justify-center shadow-xl">
                  Book Free Consultation <ArrowRight size={16} />
              </button>
              <button className="px-10 py-4 bg-transparent border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
                  View EMI Plans
              </button>
          </div>
      </div>

    </div>
  );
}
