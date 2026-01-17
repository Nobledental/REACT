'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, CheckCircle2, Shield, Sparkles, Zap, ChevronRight, 
  Play, ArrowRight, Clock, Activity, Scan, Smile, XCircle, Check, AlertCircle, 
  TrendingDown, BrainCircuit, Cpu, Info, Sliders, DollarSign, Microscope,
  Calendar, UserCheck, FileText, Phone, MessageCircle, MapPin, Mail, Layers, ShieldCheck,
  Baby, School, User
} from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

const customStyles = `
  .bg-noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E"); }
  .sticky-nav {
    position: sticky;
    top: 0;
    z-index: 40;
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }
  .dark .sticky-nav {
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
`;

export default function BracesPage() {
  // --- STATE MANAGEMENT ---
  const [activeStage, setActiveStage] = useState(0);
  const [sliderValue, setSliderValue] = useState(50); // 0 = Crooked, 100 = Straight
  const [foodCategory, setFoodCategory] = useState<'safe' | 'avoid'>('avoid');
  const [isScanning, setIsScanning] = useState(true);
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
    }, { threshold: 0.2 });

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // --- DATA ---
  const journeyStages = [
    { title: "Bonding Day", month: "Month 0", desc: "Protective sealant applied. Brackets placed digitally first, then transferred to teeth." },
    { title: "Leveling Phase", month: "Month 1-6", desc: "Super-elastic NiTi wires unwind, gently pulling teeth into the arch form. Space creation." },
    { title: "Bite Correction", month: "Month 7-14", desc: "Heavy steel wires & elastics fix overbite/underbite for perfect jaw mesh. Functional appliances if needed." },
    { title: "Detailing", month: "Month 15-20", desc: "Finishing bends, smile arc design, root paralleling and settling elastics for the perfect lock." },
    { title: "Retention", month: "Lifetime", desc: "Debonding followed by Fixed Wire + Clear Tray (Essix) retainers to ensure zero relapse." }
  ];

  const pricingData = [
    { 
      type: "Metal Braces", 
      market: "₹35k - ₹45k", 
      noble: "₹32,000", 
      savings: "Entry Level", 
      feature: "Classic & Durable",
      desc: "High-grade stainless steel. Includes records, bonding & 12 review visits. Best for complex surgical cases."
    },
    { 
      type: "Self-Ligating (Damon)", 
      market: "₹75k - ₹95k", 
      noble: "₹68,000", 
      savings: "Fastest", 
      feature: "Low Friction",
      desc: "Advanced slide-lock technology. No elastics, easier hygiene, and up to 6 months faster treatment."
    },
    { 
      type: "Ceramic (Invisible)", 
      market: "₹60k - ₹85k", 
      noble: "₹78,000", 
      savings: "Aesthetic", 
      feature: "Tooth-Colored",
      desc: "Polycrystalline brackets that blend with your enamel. Includes whitening touch-up post debond."
    },
    { 
      type: "Invisible Aligners", 
      market: "₹1.5L - ₹3.0L", 
      noble: "₹90k - ₹1.4L", 
      savings: "Premium", 
      feature: "Removable",
      desc: "AI-planned clear trays (Noble Aligners or Invisalign). The ultimate aesthetic choice for adults."
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 font-sans transition-colors duration-500 overflow-x-hidden pt-20 bg-noise">
      <style>{customStyles}</style>
      
      {/* ================= HERO SECTION ================= */}
      <section id="overview" className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-white dark:bg-[#020617] transition-colors">
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
                        <Cpu size={12} /> ISO 9001:2015 • Damon Certified
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[0.95] tracking-tighter mb-6">
                        Braces that blend <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Science & Artistry.</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-lg border-l-4 border-blue-500/50 pl-6 my-8">
                        We pair <strong>CBCT jaw analysis</strong>, growth forecasting and 3D smile simulations to plan braces for kids, teens and adults. Every wire change is guided by your digital twin.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-4 bg-slate-900 dark:bg-blue-600 hover:scale-105 hover:shadow-blue-500/25 text-white rounded-full font-bold shadow-xl transition-all flex items-center gap-2">
                            Check Candidacy
                        </button>
                        <button className="px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-full font-bold transition-all flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-white/10">
                            <Play size={16} fill="currentColor" /> See Simulation
                        </button>
                    </div>

                    <div className="flex gap-8 pt-8 border-t border-slate-200 dark:border-white/10 mt-8">
                       <div>
                          <div className="text-2xl font-black text-slate-900 dark:text-white">650+</div>
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Smiles Aligned</div>
                       </div>
                       <div>
                          <div className="text-2xl font-black text-slate-900 dark:text-white">12-24 mo</div>
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg. Time</div>
                       </div>
                       <div>
                          <div className="text-2xl font-black text-slate-900 dark:text-white">Zero</div>
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Extractions*</div>
                       </div>
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
                                // Calculate displacement based on slider value
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
      </section>

      {/* ================= STICKY NAVIGATION ================= */}
      <div className="sticky-nav bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 z-40 overflow-x-auto no-scrollbar">
         <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 h-16">
            {[
               { id: 'overview', label: 'Overview' },
               { id: 'eligibility', label: 'Eligibility' },
               { id: 'malocclusion', label: 'Malocclusions' },
               { id: 'diagnostics', label: 'Planning' },
               { id: 'timeline', label: 'Timeline' },
               { id: 'care', label: 'Care' },
               { id: 'pricing', label: 'Pricing' },
               { id: 'alternatives', label: 'Alternatives' },
            ].map(link => (
               <a 
                  key={link.id}
                  href={`#${link.id}`}
                  className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${activeSection === link.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
               >
                  {link.label}
               </a>
            ))}
            <a href="#contact" className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-colors whitespace-nowrap">
               Book Scan
            </a>
         </div>
      </div>

      {/* ================= ELIGIBILITY ================= */}
      <section id="eligibility" className="py-24 bg-slate-50 dark:bg-[#0b101b]">
         <div className="max-w-7xl mx-auto px-6">
            <RevealOnScroll>
               <div className="text-center mb-16">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Who can start braces?</h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">Orthodontics isn't just for teenagers. We customise protocols for all ages.</p>
               </div>

               <div className="grid md:grid-cols-3 gap-8">
                  <div className="p-8 bg-white dark:bg-[#151b2b] rounded-[2rem] border border-slate-200 dark:border-white/5">
                     <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                        <Baby size={24} />
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Age 7–11</h3>
                     <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">Interceptive Phase</p>
                     <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        Early screening lets us guide jaw growth, expand arches and make room for permanent teeth. Best time to correct habits like thumb sucking.
                     </p>
                  </div>

                  <div className="p-8 bg-white dark:bg-[#151b2b] rounded-[2rem] border border-blue-500 shadow-xl scale-105 relative z-10">
                     <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-6">
                        <School size={24} />
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Age 12–17</h3>
                     <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">Growth Spurt Advantage</p>
                     <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        The pubertal growth spurt is the <strong>golden window</strong> to correct skeletal imbalances with functional appliances, often avoiding future surgery.
                     </p>
                  </div>

                  <div className="p-8 bg-white dark:bg-[#151b2b] rounded-[2rem] border border-slate-200 dark:border-white/5">
                     <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                        <User size={24} />
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Adults 18+</h3>
                     <p className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-4">Adult Orthodontics</p>
                     <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        We coordinate periodontal care, restorative dentistry and braces to align teeth safely at any age using invisible ceramic options.
                     </p>
                  </div>
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* ================= MALOCCLUSIONS ================= */}
      <section id="malocclusion" className="py-24 bg-white dark:bg-[#0f1420]">
         <div className="max-w-7xl mx-auto px-6">
            <RevealOnScroll>
               <div className="text-center mb-16">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Understanding your Bite</h2>
                  <p className="text-slate-600 dark:text-slate-400">Common issues we correct daily.</p>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                     { title: "Crowding", desc: "Teeth jostle for space. We expand arches to align them without extraction.", icon: Layers },
                     { title: "Spacing", desc: "Gaps between teeth. We close them to improve smile esthetics and gum health.", icon: ArrowRight },
                     { title: "Deep Bite", desc: "Upper teeth cover lower teeth too much. We open the bite to protect enamel.", icon: ChevronRight },
                     { title: "Open Bite", desc: "Front teeth don't touch. We correct tongue posture and alignment.", icon: ChevronRight },
                     { title: "Crossbite", desc: "Upper teeth bite inside lower teeth. Early correction prevents uneven jaw growth.", icon: Sliders },
                     { title: "Protrusion", desc: "Upper teeth stick out. We retract them to reduce injury risk and improve profile.", icon: ArrowLeft },
                  ].map((item, i) => (
                     <div key={i} className="p-6 rounded-2xl bg-slate-50 dark:bg-[#151b2b] border border-slate-200 dark:border-white/5 hover:border-blue-500/50 transition-colors group">
                        <div className="flex items-center gap-4 mb-4">
                           <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                              <item.icon size={20} />
                           </div>
                           <h3 className="font-bold text-slate-900 dark:text-white">{item.title}</h3>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                     </div>
                  ))}
               </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* ================= DIAGNOSTICS ================= */}
      <section id="diagnostics" className="py-24 bg-slate-50 dark:bg-[#0b101b]">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Digital Diagnostics</h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                     Digital diagnostics remove guesswork. We map teeth, jaw joints, airway and smile dynamics before the first bracket is bonded.
                  </p>
                  
                  <div className="space-y-6">
                     <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white dark:bg-white/5 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                           <Scan size={24} className="text-blue-500" />
                        </div>
                        <div>
                           <h4 className="font-bold text-slate-900 dark:text-white">Records & Scans</h4>
                           <p className="text-sm text-slate-500 dark:text-slate-400">Full mouth X-rays, cephalograms, and iTero 3D scans build your baseline dataset.</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white dark:bg-white/5 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                           <BrainCircuit size={24} className="text-purple-500" />
                        </div>
                        <div>
                           <h4 className="font-bold text-slate-900 dark:text-white">Mock Analysis</h4>
                           <p className="text-sm text-slate-500 dark:text-slate-400">We simulate tooth movement digitally and evaluate airway harmony.</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white dark:bg-white/5 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                           <Play size={24} className="text-teal-500" />
                        </div>
                        <div>
                           <h4 className="font-bold text-slate-900 dark:text-white">3D Simulation</h4>
                           <p className="text-sm text-slate-500 dark:text-slate-400">See your finished smile on video before we even start.</p>
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="relative h-[500px] bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-800">
                  {/* Abstract Scan UI */}
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-64 h-64 border-2 border-blue-500/30 rounded-full animate-ping absolute"></div>
                     <div className="w-48 h-48 border-2 border-blue-500/50 rounded-full animate-ping delay-100 absolute"></div>
                     <Scan size={64} className="text-blue-500 relative z-10" />
                  </div>
                  <div className="absolute bottom-0 w-full p-8 bg-black/60 backdrop-blur-md">
                     <div className="flex justify-between items-center text-xs font-mono text-blue-400">
                        <span>SCANNING: 100%</span>
                        <span>AI ANALYSIS: READY</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* ================= JOURNEY TIMELINE ================= */}
      <section id="timeline" className="bg-white dark:bg-[#0f1420] py-32 border-y border-slate-200 dark:border-white/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20">
               <div className="space-y-8">
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">The Clinical Roadmap</h3>
                  <div className="space-y-4">
                     {journeyStages.map((stage, idx) => (
                        <div 
                           key={idx}
                           onClick={() => setActiveStage(idx)}
                           className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-l-4 ${
                              activeStage === idx 
                              ? 'bg-slate-50 dark:bg-white/5 border-l-blue-500 shadow-lg' 
                              : 'bg-transparent border-l-slate-200 dark:border-l-white/10 hover:bg-slate-50/50 dark:hover:bg-white/5'
                           }`}
                        >
                           <div className="flex items-center justify-between mb-2">
                              <h3 className={`text-lg font-bold ${activeStage === idx ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                                 {stage.title}
                              </h3>
                              <span className="text-xs font-bold bg-slate-200 dark:bg-white/10 px-3 py-1 rounded-full text-slate-600 dark:text-slate-300">{stage.month}</span>
                           </div>
                           <p className={`text-sm transition-all duration-300 ${activeStage === idx ? 'text-slate-600 dark:text-slate-300 max-h-20 opacity-100' : 'text-slate-400 max-h-0 opacity-0 overflow-hidden'}`}>
                              {stage.desc}
                           </p>
                        </div>
                     ))}
                  </div>
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
      </section>

      {/* ================= INTERACTIVE FOOD & CARE GUIDE ================= */}
      <section id="care" className="py-32 max-w-7xl mx-auto px-6">
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
      </section>

      {/* ================= RETENTION ================= */}
      <section id="retention" className="py-24 bg-slate-900 text-white">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-black mb-12">Retention: Insurance for your Smile</h2>
            <div className="grid md:grid-cols-3 gap-8">
               <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                  <h3 className="text-xl font-bold mb-4">Fixed Lingual</h3>
                  <p className="text-sm text-slate-400">A slim wire bonded behind front teeth. Invisible, permanent and perfect for long-term stability.</p>
               </div>
               <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                  <h3 className="text-xl font-bold mb-4">Essix Clear Tray</h3>
                  <p className="text-sm text-slate-400">Clear trays worn nightly. We provide 2 sets and refresh them yearly.</p>
               </div>
               <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                  <h3 className="text-xl font-bold mb-4">Vivera Retainers</h3>
                  <p className="text-sm text-slate-400">For grinders or aligner transitions. 3D printed and shipped in sets of three.</p>
               </div>
            </div>
         </div>
      </section>

      {/* ================= PRICING MATRIX ================= */}
      <section id="pricing" className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-white/5 py-32">
         <div className="max-w-7xl mx-auto px-6">
            <RevealOnScroll>
               <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-widest mb-4 border border-green-200 dark:border-green-800">
                     <TrendingDown size={14} /> Hyderabad Market Analysis 2024
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Transparent Pricing.</h2>
                  <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                     Premium orthodontic care at honest neighborhood prices. Includes all wires, adjustments, and retention.
                  </p>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {pricingData.map((plan, i) => (
                     <div key={i} className="relative group bg-white dark:bg-[#0B1019] rounded-[2.5rem] border border-slate-200 dark:border-white/5 p-8 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden shadow-xl hover:shadow-2xl dark:shadow-none">
                        <div className="relative z-10">
                           <div className="flex justify-between items-start mb-4">
                              <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{plan.type}</div>
                              {i === 2 && <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">Recommended</span>}
                           </div>
                           
                           <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{plan.noble}</div>
                           <div className="text-xs text-green-600 dark:text-green-400 font-bold flex items-center gap-1 mb-6">
                              <TrendingDown size={12} /> {plan.savings}
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
      </section>

      {/* ================= ALTERNATIVES ================= */}
      <section id="alternatives" className="py-24 bg-white dark:bg-[#0f1420]">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Alternatives to Braces</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="p-8 bg-slate-50 dark:bg-[#151b2b] rounded-[2rem] border border-slate-200 dark:border-white/5">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">In-House Clear Aligners</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                     Designed and manufactured at Noble Dental Care by Dr. Deepak. Ideal for mild-to-moderate crowding with the same orthodontist supervising.
                  </p>
                  <a href="#" className="text-blue-600 font-bold flex items-center gap-2">Explore Noble Aligners <ArrowRight size={16}/></a>
               </div>
               <div className="p-8 bg-slate-50 dark:bg-[#151b2b] rounded-[2rem] border border-slate-200 dark:border-white/5">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Invisalign®</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                     Premium SmartTrack aligners with remote monitoring. Perfect for globe-trotters who need flexible check-ins.
                  </p>
                  <a href="/treatments/invisalign" className="text-blue-600 font-bold flex items-center gap-2">See Invisalign Workflow <ArrowRight size={16}/></a>
               </div>
            </div>
         </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-24 bg-slate-900 text-white">
         <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-black mb-6">Ready to plan your smile?</h2>
            <p className="text-slate-400 mb-10 text-lg">
               Reach our orthodontic concierge through any channel. We respond within minutes during clinic hours.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
               <a href="tel:+918610425342" className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <Phone className="mx-auto mb-4 text-blue-400" size={32} />
                  <div className="font-bold">Call Reception</div>
                  <div className="text-sm text-slate-400">+91 86104 25342</div>
               </a>
               <a href="https://wa.me/918610425342" className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <MessageCircle className="mx-auto mb-4 text-green-400" size={32} />
                  <div className="font-bold">WhatsApp Triage</div>
                  <div className="text-sm text-slate-400">Send photos for screening</div>
               </a>
               <a href="mailto:care@nobledentalnallagandla.in" className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <Mail className="mx-auto mb-4 text-purple-400" size={32} />
                  <div className="font-bold">Email Records</div>
                  <div className="text-sm text-slate-400">care@nobledentalnallagandla.in</div>
               </a>
            </div>
         </div>
      </section>

    </div>
  );
}
