'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Sparkles, Zap, Play, ArrowRight, Clock, Activity, Smile } from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export default function BracesPage() {
  const [activeStage, setActiveStage] = useState(0);
  const [simulationState, setSimulationState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSimulationState(prev => prev === 0 ? 1 : 0);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const journeyStages = [
    { title: "Bonding Day", month: "Month 0", desc: "Brackets adhered, wires placed." },
    { title: "Leveling", month: "Month 1-6", desc: "Light wires unravel crowding." },
    { title: "Bite Fix", month: "Month 7-14", desc: "Elastics fix overbite/underbite." },
    { title: "Finishing", month: "Month 15-20", desc: "Fine-tuning individual tooth positions." },
    { title: "Retention", month: "Month 21+", desc: "Braces off! Retainers placed." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans transition-colors duration-500 overflow-x-hidden pt-20">
      {/* --- DEBUG BANNER (REMOVE LATER) --- */}
    <div className="bg-red-600 text-white font-bold text-center p-4 fixed top-20 left-0 w-full z-[100]">
      ✅ CUSTOM BRACES PAGE IS ACTIVE
    </div>
      <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-white dark:bg-[#020617] transition-colors">
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
                        <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-xl overflow-visible">
                            <path 
                              d={simulationState === 0 ? "M10,50 Q50,80 100,50 Q150,20 190,50" : "M10,50 Q100,50 190,50"} 
                              fill="none" 
                              stroke="#94a3b8" 
                              strokeWidth="2" 
                              className="transition-all duration-[2000ms] ease-in-out"
                            />
                            {[20, 60, 100, 140, 180].map((x, i) => {
                                const yOffset = simulationState === 0 ? (i % 2 === 0 ? 10 : -10) : 0;
                                const rotation = simulationState === 0 ? (i % 2 === 0 ? 10 : -10) : 0;
                                return (
                                    <g key={i} className="transition-all duration-[2000ms] ease-in-out" style={{ transform: `translate(${x}px, ${50 + yOffset}px) rotate(${rotation}deg)` }}>
                                        <path d="M-12,-20 L12,-20 L10,20 L-10,20 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                                        <rect x="-4" y="-4" width="8" height="8" rx="2" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
                                    </g>
                                );
                            })}
                        </svg>
                        <div className="absolute -bottom-8 left-0 w-full text-center">
                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-1">Live Simulation</div>
                            <div className="text-slate-900 dark:text-white font-bold">{simulationState === 0 ? "Before: Crowding" : "After: Alignment"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-32">
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
    </div>
  );
}
