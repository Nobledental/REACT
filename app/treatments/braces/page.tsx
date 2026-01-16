'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, CheckCircle2, Shield, Sparkles, Zap, ChevronRight, 
  Play, ArrowRight, Clock, Activity, Scan, Smile, XCircle, Check, AlertCircle 
} from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export default function BracesPage() {
  // --- STATE MANAGEMENT ---
  const [activeStage, setActiveStage] = useState(0);
  const [simulationState, setSimulationState] = useState(0);
  const [foodCategory, setFoodCategory] = useState<'safe' | 'avoid'>('avoid');

  // --- ANIMATION LOOPS ---
  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      setSimulationState(prev => prev === 0 ? 1 : 0);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // --- DATA ---
  const journeyStages = [
    { title: "Bonding Day", month: "Month 0", desc: "Brackets adhered, wires placed. Expect 3 days of soreness." },
    { title: "Leveling", month: "Month 1-6", desc: "Light wires unravel crowding. Teeth get noticeably straighter." },
    { title: "Bite Fix", month: "Month 7-14", desc: "Elastics fix overbite/underbite. Jaw harmony achieved." },
    { title: "Finishing", month: "Month 15-20", desc: "Fine-tuning individual tooth positions for the perfect arc." },
    { title: "Retention", month: "Month 21+", desc: "Braces off! Retainers placed to lock in your smile." }
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
        {/* Background Ambience */}
        <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100 dark:bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100 dark:bg-purple-600/10 rounded-full blur-[120px]"></div>
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
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
                        <Sparkles size={12} /> Digital Orthodontics
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
                        Precision <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">Biomechanics.</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-lg border-l-2 border-blue-200 dark:border-blue-500/30 pl-6 my-8">
                        We combine <strong>CBCT Jaw Analysis</strong> and <strong>Smart-Wire Technology</strong> to create smiles that fit your face perfectly.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-4 bg-slate-900 dark:bg-blue-600 hover:opacity-90 text-white rounded-full font-bold shadow-xl transition-all flex items-center gap-2">
                            Book Consultation
                        </button>
                        <button className="px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-full font-bold transition-all flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-white/10">
                            <Play size={16} fill="currentColor" /> Watch Sim
                        </button>
                    </div>
                </RevealOnScroll>
            </div>

            <div className="relative flex justify-center items-center order-1 lg:order-2">
                <div className="relative w-full max-w-[500px] aspect-square bg-white dark:bg-white/5 backdrop-blur-xl rounded-[3rem] border border-slate-200 dark:border-white/10 p-8 flex items-center justify-center overflow-hidden shadow-2xl">
                    <div className="relative w-64 h-40">
                        {/* THE TOOTH ANIMATION */}
                        <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-xl overflow-visible">
                            <defs>
                                <linearGradient id="wireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#94a3b8" />
                                    <stop offset="50%" stopColor="#e2e8f0" />
                                    <stop offset="100%" stopColor="#94a3b8" />
                                </linearGradient>
                            </defs>
                            <path 
                              d={simulationState === 0 ? "M10,50 Q50,80 100,50 Q150,20 190,50" : "M10,50 Q100,50 190,50"} 
                              fill="none" 
                              stroke="url(#wireGrad)" 
                              strokeWidth="3" 
                              strokeLinecap="round"
                              className="transition-all duration-[2000ms] ease-in-out"
                            />
                            {[20, 60, 100, 140, 180].map((x, i) => {
                                const yOffset = simulationState === 0 ? (i % 2 === 0 ? 10 : -10) : 0;
                                const rotation = simulationState === 0 ? (i % 2 === 0 ? 10 : -10) : 0;
                                return (
                                    <g key={i} className="transition-all duration-[2000ms] ease-in-out" style={{ transform: `translate(${x}px, ${50 + yOffset}px) rotate(${rotation}deg)` }}>
                                        <path d="M-12,-20 L12,-20 L10,20 L-10,20 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                                        <rect x="-4" y="-4" width="8" height="8" rx="2" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
                                        <line x1="-4" y1="0" x2="4" y2="0" stroke="#64748b" strokeWidth="1" />
                                    </g>
                                );
                            })}
                        </svg>
                        
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-20">
                            <div className="bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm animate-pulse border border-blue-200 dark:border-blue-800">
                                {simulationState === 0 ? "Before: Crowding" : "After: Alignment"}
                            </div>
                        </div>
                    </div>

                    {/* Floating Stats */}
                    <div className="absolute top-6 right-6 bg-white dark:bg-slate-700 p-3 rounded-xl border border-slate-100 dark:border-white/10 shadow-lg animate-bounce duration-[3000ms]">
                        <Zap size={20} className="text-yellow-500" />
                    </div>
                    <div className="absolute bottom-6 left-6 bg-white dark:bg-slate-700 p-3 rounded-xl border border-slate-100 dark:border-white/10 shadow-lg animate-bounce duration-[4000ms]">
                        <Shield size={20} className="text-green-500" />
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* ================= STATS GRID ================= */}
      <div className="bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-white/5 py-12 transition-colors">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                  { label: "Smiles Aligned", val: "650+", sub: "Successful Cases" },
                  { label: "Avg Duration", val: "18mo", sub: "Fast-Track Protocol" },
                  { label: "Technology", val: "Damon", sub: "Self-Ligating System" },
                  { label: "Age Range", val: "7-55", sub: "Kids & Adults" },
              ].map((stat, i) => (
                  <div key={i} className="text-center border-r border-slate-200 dark:border-white/5 last:border-0">
                      <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">{stat.val}</div>
                      <div className="text-xs font-bold uppercase text-teal-600 dark:text-teal-500 tracking-widest mb-1">{stat.label}</div>
                      <div className="text-[10px] text-slate-500">{stat.sub}</div>
                  </div>
              ))}
          </div>
      </div>

      {/* ================= JOURNEY TIMELINE ================= */}
      <div className="max-w-7xl mx-auto px-6 py-32">
          <RevealOnScroll>
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">The Alignment Roadmap</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                    Biology takes time. We move teeth gently to ensure the roots and bone remain healthy.
                </p>
            </div>
          </RevealOnScroll>

          <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-4">
                  {journeyStages.map((stage, idx) => (
                      <div 
                        key={idx}
                        onClick={() => setActiveStage(idx)}
                        className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border group ${
                            activeStage === idx 
                            ? 'bg-blue-50 dark:bg-blue-600/10 border-blue-200 dark:border-blue-500/50 translate-x-4' 
                            : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/10'
                        }`}
                      >
                          <div className="flex items-center justify-between mb-2">
                              <h3 className={`text-lg font-bold ${activeStage === idx ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                                  {stage.title}
                              </h3>
                              <span className="text-xs font-bold bg-slate-100 dark:bg-white/10 px-2 py-1 rounded text-slate-500 dark:text-slate-300">{stage.month}</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 text-sm">{stage.desc}</p>
                      </div>
                  ))}
              </div>

              <div className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-white/10 p-10 flex flex-col justify-center items-center text-center shadow-2xl">
                  <div className="absolute inset-0 bg-blue-50 dark:bg-blue-600/5 rounded-[2.5rem]"></div>
                  <div className="w-20 h-20 bg-blue-100 dark:bg-blue-500/10 rounded-full flex items-center justify-center mb-8 animate-pulse text-blue-600 dark:text-blue-400">
                      <Clock size={32} />
                  </div>
                  <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-4">{journeyStages[activeStage].month}</h3>
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6">{journeyStages[activeStage].title}</div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                      {journeyStages[activeStage].desc}
                  </p>
                  <div className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-full mt-12 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500" style={{ width: `${((activeStage + 1) / journeyStages.length) * 100}%` }}></div>
                  </div>
              </div>
          </div>
      </div>

      {/* ================= NEW SECTION: COMPARISON MATRIX ================= */}
      <div className="bg-slate-50 dark:bg-slate-900 py-32 border-y border-slate-200 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6">
              <RevealOnScroll>
                  <div className="text-center mb-16">
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Compare Systems</h2>
                      <p className="text-slate-600 dark:text-slate-400">Which option fits your lifestyle?</p>
                  </div>
                  
                  <div className="overflow-x-auto">
                      <div className="min-w-[800px] grid grid-cols-4 gap-4 text-sm">
                          {/* Headers */}
                          <div className="col-span-1"></div>
                          <div className="col-span-1 font-bold text-slate-900 dark:text-white text-center bg-white dark:bg-white/5 p-4 rounded-t-2xl shadow-sm">Metal Braces</div>
                          <div className="col-span-1 font-bold text-slate-900 dark:text-white text-center bg-white dark:bg-white/5 p-4 rounded-t-2xl shadow-sm">Ceramic</div>
                          <div className="col-span-1 font-bold text-blue-600 dark:text-blue-400 text-center bg-blue-50 dark:bg-blue-900/20 p-4 rounded-t-2xl border-b-2 border-blue-500 shadow-sm">Invisalign</div>

                          {/* Rows */}
                          {[
                              { label: "Visibility", metal: "High", ceramic: "Low", align: "Invisible" },
                              { label: "Hygiene", metal: "Difficult", ceramic: "Difficult", align: "Easy (Removable)" },
                              { label: "Comfort", metal: "Fair", ceramic: "Good", align: "Excellent" },
                              { label: "Speed", metal: "Fastest", ceramic: "Fast", align: "Moderate" },
                              { label: "Cost", metal: "₹", ceramic: "₹₹", align: "₹₹₹" },
                          ].map((row, i) => (
                              <React.Fragment key={i}>
                                  <div className="font-bold text-slate-500 dark:text-slate-400 p-4 flex items-center">{row.label}</div>
                                  <div className="bg-white dark:bg-white/5 p-4 text-center text-slate-700 dark:text-slate-300 flex items-center justify-center rounded-lg">{row.metal}</div>
                                  <div className="bg-white dark:bg-white/5 p-4 text-center text-slate-700 dark:text-slate-300 flex items-center justify-center rounded-lg">{row.ceramic}</div>
                                  <div className="bg-blue-50/50 dark:bg-blue-900/10 p-4 text-center text-slate-900 dark:text-white font-bold flex items-center justify-center border border-blue-200 dark:border-blue-800 rounded-lg">{row.align}</div>
                              </React.Fragment>
                          ))}
                      </div>
                  </div>
              </RevealOnScroll>
          </div>
      </div>

      {/* ================= NEW SECTION: LIFE WITH BRACES (Interactive) ================= */}
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
                              🚫 Foods to Avoid
                          </button>
                          <button 
                            onClick={() => setFoodCategory('safe')}
                            className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${foodCategory === 'safe' ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-slate-100 dark:bg-white/10 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/20'}`}
                          >
                              ✅ Safe to Eat
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

                  {/* Visual Metaphor for "Care" */}
                  <div className="relative h-[400px] bg-slate-100 dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-white/10 overflow-hidden flex items-center justify-center p-10 shadow-inner">
                      <div className="text-center">
                          <Shield size={64} className={`mx-auto mb-6 transition-colors duration-500 ${foodCategory === 'safe' ? 'text-green-500' : 'text-red-500'}`} />
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                              {foodCategory === 'safe' ? "Bracket Safe Zone" : "Danger Zone"}
                          </h3>
                          <p className="text-slate-500 max-w-xs mx-auto text-sm">
                              {foodCategory === 'safe' ? "These foods are soft and won't pop your brackets off." : "These foods apply too much shear force, snapping the adhesive."}
                          </p>
                      </div>
                  </div>
              </div>
          </RevealOnScroll>
      </div>

      {/* ================= HARDWARE SELECTION ================= */}
      <div className="bg-white/50 dark:bg-white/5 py-32">
          <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Choose Your Hardware</h2>
                  <p className="text-slate-600 dark:text-slate-400">From classic metal to invisible ceramic, pick what fits your lifestyle.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {[
                      { name: "Metal Braces", desc: "Durable & classic. Best for complex surgical cases.", icon: Shield, color: "text-slate-400" },
                      { name: "Ceramic", desc: "Tooth-colored brackets. Discreet aesthetic for adults.", icon: Smile, color: "text-orange-400" },
                      { name: "Damon System", desc: "Self-ligating. Faster movement, less friction, no elastics.", icon: Zap, color: "text-blue-400" },
                  ].map((type, i) => (
                      <RevealOnScroll key={i} delay={i * 100}>
                          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all group hover:-translate-y-2 shadow-lg dark:shadow-none">
                              <div className={`w-14 h-14 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${type.color}`}>
                                  <type.icon size={32} />
                              </div>
                              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{type.name}</h4>
                              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                  {type.desc}
                              </p>
                              <div className="w-full h-px bg-slate-100 dark:bg-white/10 group-hover:bg-blue-500/50 transition-colors"></div>
                          </div>
                      </RevealOnScroll>
                  ))}
              </div>
          </div>
      </div>

      {/* ================= CTA FOOTER ================= */}
      <div className="max-w-5xl mx-auto px-6 py-20 text-center border-t border-slate-200 dark:border-white/5">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Keep it Straight, Forever.</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10">
              Orthodontics doesn't end when the braces come off. <br/>
              We provide dual retention (Fixed + Removable) to ensure your investment lasts a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform flex items-center gap-2 justify-center shadow-xl">
                  Book Consultation <ArrowRight size={16} />
              </button>
              <button className="px-10 py-4 bg-transparent border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
                  View Retention Plan
              </button>
          </div>
      </div>

    </div>
  );
}
