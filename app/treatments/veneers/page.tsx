'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Diamond, Sparkles, Palette, Layers, 
  CheckCircle2, DollarSign, Clock, ShieldCheck, 
  Smile, User, Zap, Info, Play, Camera, Star,
  TrendingDown, ArrowRight, ChevronRight, Phone, MessageCircle, Mail, MapPin
} from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

const customStyles = `
  .bg-noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E"); }
   
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.6;
    animation: float 10s infinite ease-in-out;
    z-index: 0;
  }
  .orb--one { width: 400px; height: 400px; background: #fbbf24; top: -100px; right: -100px; animation-delay: 0s; }
  .orb--two { width: 300px; height: 300px; background: #f43f5e; bottom: -50px; left: -50px; animation-delay: 2s; }
  .orb--three { width: 200px; height: 200px; background: #8b5cf6; top: 40%; left: 40%; filter: blur(60px); opacity: 0.3; animation-delay: 4s; }

  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(20px, -20px); }
  }

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

export default function VeneersPage() {
  // --- STATE ---
  const [shadeValue, setShadeValue] = useState(50); // 0 = Yellow, 100 = Bleach White
  const [activeShape, setActiveShape] = useState('natural');
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Observer for sticky nav highlighting
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // --- DATA ---
  const smileStyles = [
    { id: 'natural', title: "The Natural", desc: "Softly rounded corners. Mimics real teeth perfectly.", suit: "Oval Faces" },
    { id: 'hollywood', title: "The Hollywood", desc: "Square, flat alignment. A bold, high-impact look.", suit: "Round Faces" },
    { id: 'youthful', title: "The Youthful", desc: "Longer front two teeth (Rabbit style). Adds character.", suit: "Heart Faces" },
    { id: 'soft', title: "The Softened", desc: "Rounded edges for a gentle, feminine appearance.", suit: "Square Faces" },
  ];

  const pricingData = [
    { 
      type: "Direct Composite", 
      market: "₹8,000 - ₹12,000", 
      noble: "₹6,000", 
      savings: "Save ₹4k", 
      feature: "Done in 1 Visit",
      desc: "Hand-sculpted resin material. Good for fixing small chips or for younger patients. Lasts 5-7 years with care."
    },
    { 
      type: "E.max Porcelain", 
      market: "₹22,000 - ₹28,000", 
      noble: "₹16,500", 
      savings: "Save ₹8k+", 
      feature: "Glass Aesthetic",
      desc: "High-strength glass ceramic. The global standard for 'Hollywood Smiles'. Cannot stain. Lasts 15+ years."
    },
    { 
      type: "Ultra-Thin (No Prep)", 
      market: "₹35,000+", 
      noble: "₹28,000", 
      savings: "Save ₹7k", 
      feature: "Zero Drilling",
      desc: "Contact-lens thin veneers (0.3mm) that stick to your enamel without shaving your natural teeth down."
    },
    { 
      type: "Zirconia Overlay", 
      market: "₹18,000 - ₹22,000", 
      noble: "₹14,000", 
      savings: "Save ₹4k", 
      feature: "High Strength",
      desc: "Best for people who grind their teeth. Very strong opaque white look, great for masking dark stains."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-200 font-sans transition-colors duration-500 overflow-x-hidden pt-20 bg-noise">
      <style>{customStyles}</style>
      
      {/* ================= HERO SECTION ================= */}
      <section id="overview" className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-white dark:bg-[#020617] transition-colors">
        {/* Animated Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="orb orb--one"></div>
           <div className="orb orb--two"></div>
           <div className="orb orb--three"></div>
           <div className="absolute inset-0 bg-white/50 dark:bg-[#020617]/80 backdrop-blur-[100px]"></div>
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        </div>

        <div className="absolute top-6 left-6 z-30">
             <Link href="/treatments" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-white dark:hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
             </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Content */}
            <div className="space-y-8 order-2 lg:order-1">
                <RevealOnScroll>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-6 animate-fade-in">
                        <Diamond size={12} /> Digital Smile Design
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter mb-6">
                        Architecting <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500">Perfection.</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-lg border-l-4 border-amber-500/50 pl-6 my-8">
                        Hide gaps, chips, and stains instantly. <br/>
                        We use <strong>E.max Press Ceramics</strong> to create ultra-thin shells that reflect light exactly like natural enamel.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-4 bg-slate-900 dark:bg-amber-600 hover:scale-105 hover:shadow-amber-500/25 text-white rounded-full font-bold shadow-xl transition-all flex items-center gap-2">
                            Book Smile Test
                        </button>
                        <button className="px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-full font-bold transition-all flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-white/10">
                            <Play size={16} fill="currentColor" /> See Gallery
                        </button>
                    </div>
                </RevealOnScroll>
            </div>

            {/* Right: INTERACTIVE SHADE SELECTOR */}
            <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative w-full max-w-[500px] aspect-square bg-slate-50/80 dark:bg-slate-900/50 backdrop-blur-xl rounded-[3rem] border border-slate-200 dark:border-white/10 p-8 flex flex-col items-center justify-center overflow-hidden shadow-2xl group">
                    
                    {/* Teeth Visual - Changes Color */}
                    <div className="relative w-64 h-40 mb-8 transition-all duration-300 transform group-hover:scale-105">
                        <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-2xl overflow-visible">
                            <path 
                                d="M10,40 Q50,60 100,60 Q150,60 190,40 L180,10 Q150,30 100,30 Q50,30 20,10 Z" 
                                fill={`hsl(45, ${100 - shadeValue}%, ${90 + (shadeValue/10)}%)`} 
                                stroke="none"
                                className="transition-fill duration-100"
                            />
                            {/* Division Lines */}
                            <g stroke="#000" strokeOpacity="0.1" strokeWidth="1">
                                <line x1="100" y1="30" x2="100" y2="60" /> 
                                <line x1="70" y1="25" x2="75" y2="55" />
                                <line x1="130" y1="25" x2="125" y2="55" />
                                <line x1="45" y1="20" x2="50" y2="50" />
                                <line x1="155" y1="20" x2="150" y2="50" />
                            </g>
                            {/* Shine */}
                            <circle cx="80" cy="40" r="5" fill="white" opacity={shadeValue / 100} className="animate-pulse" />
                            <circle cx="120" cy="40" r="3" fill="white" opacity={shadeValue / 100} />
                        </svg>

                        <div className="absolute -bottom-4 w-full text-center">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                Simulated Shade: <span className="text-amber-500 dark:text-amber-400 transition-all">
                                    {shadeValue < 30 ? "A3 (Natural)" : shadeValue < 70 ? "A1 (Bright)" : "BL1 (Hollywood)"}
                                </span>
                            </span>
                        </div>
                    </div>

                    {/* Slider Control */}
                    <div className="w-full px-8 relative z-20">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                            <span>Natural</span>
                            <span className="text-amber-500">Hollywood White</span>
                        </div>
                        <input 
                            type="range" min="0" max="100" value={shadeValue} 
                            onChange={(e) => setShadeValue(Number(e.target.value))}
                            className="w-full h-3 bg-gradient-to-r from-amber-100 to-white rounded-full appearance-none cursor-pointer border border-slate-200 dark:border-white/10"
                        />
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-white border border-slate-200 dark:border-white/20 shadow-lg flex items-center gap-2">
                        <Palette size={12} /> Shade Selector
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* ================= STICKY NAV ================= */}
      <div className="sticky-nav bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 z-40 overflow-x-auto no-scrollbar">
         <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 h-16">
            {[
               { id: 'overview', label: 'Overview' },
               { id: 'styles', label: 'Styles' },
               { id: 'process', label: 'Process' },
               { id: 'pricing', label: 'Pricing' },
               { id: 'faq', label: 'FAQ' },
            ].map(link => (
               <a 
                  key={link.id}
                  href={`#${link.id}`}
                  className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${activeSection === link.id ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
               >
                  {link.label}
               </a>
            ))}
            <a href="#contact" className="ml-auto px-4 py-2 bg-amber-600 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-amber-700 transition-colors whitespace-nowrap">
               Book Smile Test
            </a>
         </div>
      </div>

      {/* ================= STYLE GUIDE ================= */}
      <section id="styles" className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-white/5 py-32">
          <div className="max-w-7xl mx-auto px-6">
              <RevealOnScroll>
                  <div className="text-center mb-16">
                      <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Design Your Character</h2>
                      <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                          Teeth aren't just white squares. The shape of the edges determines the "personality" of your smile.
                      </p>
                  </div>

                  <div className="grid lg:grid-cols-4 gap-6">
                      {smileStyles.map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setActiveShape(style.id)}
                            className={`p-6 rounded-3xl border text-left transition-all duration-300 relative overflow-hidden group ${
                                activeShape === style.id 
                                ? 'bg-white dark:bg-[#151b2b] border-amber-500 shadow-xl scale-105 z-10' 
                                : 'bg-transparent border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/5'
                            }`}
                          >
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                                  activeShape === style.id ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-400'
                              }`}>
                                  <Smile size={24} />
                              </div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{style.title}</h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{style.desc}</p>
                              <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                                  Best for: {style.suit}
                              </div>
                          </button>
                      ))}
                  </div>
              </RevealOnScroll>
          </div>
      </section>

      {/* ================= PROCESS (MOCK-UP GUARANTEE) ================= */}
      <section id="process" className="bg-slate-900 text-white py-32 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/20 border border-amber-500/30 text-amber-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
                          <Layers size={12} /> The Protocol
                      </div>
                      <h2 className="text-4xl font-bold mb-6">The "Mock-Up" Guarantee.</h2>
                      <p className="text-slate-400 text-lg leading-relaxed mb-8">
                          Most dentists grind your teeth first. We don't. <br/>
                          We create a <strong>temporary plastic trial smile</strong> that sits over your teeth. You wear it, test it, and approve it <i>before</i> we touch your natural enamel.
                      </p>
                      
                      <div className="space-y-6">
                          <div className="flex gap-4 items-start">
                              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 shrink-0 border border-amber-500/20">
                                  <Clock size={24} />
                              </div>
                              <div>
                                  <h4 className="text-lg font-bold text-white">2 Visits Only</h4>
                                  <p className="text-slate-400 text-sm">Visit 1: Design & Trial. Visit 2: Bonding (5 days later).</p>
                              </div>
                          </div>
                          <div className="flex gap-4 items-start">
                              <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-400 shrink-0 border border-rose-500/20">
                                  <ShieldCheck size={24} />
                              </div>
                              <div>
                                  <h4 className="text-lg font-bold text-white">15 Year Warranty</h4>
                                  <p className="text-slate-400 text-sm">E.max is 4x stronger than natural enamel. It doesn't stain.</p>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="relative h-[400px] bg-white/5 rounded-[3rem] p-8 border border-white/10 flex items-center justify-center">
                      <div className="text-center">
                          <div className="w-24 h-24 mx-auto bg-amber-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                              <Camera size={40} className="text-amber-400" />
                          </div>
                          <h3 className="text-2xl font-bold mb-2">Selfie Approval</h3>
                          <p className="text-slate-400 max-w-xs mx-auto">
                              We take photos of you with the trial smile. If you don't love the selfie, we redesign it for free.
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-32">
          <RevealOnScroll>
              <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-widest mb-4 border border-green-200 dark:border-green-800">
                      <DollarSign size={14} /> Price Transparency Promise
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Hyderabad Pricing Analysis</h2>
                  <p className="text-slate-600 dark:text-slate-400">Premium aesthetics at honest neighborhood prices.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                  {pricingData.map((plan, i) => (
                      <div key={i} className="relative group bg-white dark:bg-[#151b2b] rounded-[2rem] border border-slate-200 dark:border-white/5 p-8 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden shadow-lg">
                          <div className="flex justify-between items-start mb-6">
                              <div>
                                  <div className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider mb-1">{plan.type}</div>
                                  <div className="text-3xl font-black text-slate-900 dark:text-white">{plan.noble} <span className="text-sm font-medium text-slate-400">/unit</span></div>
                              </div>
                              <div className="text-right">
                                  <div className="text-xs text-slate-400 line-through decoration-red-400 mb-1">{plan.market}</div>
                                  <div className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded flex items-center gap-1">
                                      <TrendingDown size={10} /> {plan.savings}
                                  </div>
                              </div>
                          </div>
                          
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 border-l-2 border-slate-200 dark:border-white/10 pl-4">
                              {plan.desc}
                          </p>

                          <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5">
                              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                  <Sparkles size={12} /> {plan.feature}
                              </span>
                              <button className="text-sm font-bold text-amber-600 dark:text-amber-500 hover:underline">
                                  Check Suitability
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
          </RevealOnScroll>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="py-24 bg-slate-50 dark:bg-[#0b101b]">
         <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Common Questions</h2>
            </div>
            <div className="space-y-4">
               <details className="group bg-white dark:bg-[#151b2b] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden transition-all duration-300 open:shadow-lg">
                  <summary className="flex items-center justify-between p-6 font-bold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                     Do you have to grind my teeth?
                     <ChevronRight className="transition-transform group-open:rotate-90" size={16}/>
                  </summary>
                  <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                     Minimal shaping (0.3mm to 0.5mm) is usually required to ensure the veneer doesn't look bulky. However, for "No-Prep" veneers, we bond directly to the enamel with zero drilling.
                  </div>
               </details>
               <details className="group bg-white dark:bg-[#151b2b] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden transition-all duration-300 open:shadow-lg">
                  <summary className="flex items-center justify-between p-6 font-bold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                     Do veneers stain with coffee/tea?
                     <ChevronRight className="transition-transform group-open:rotate-90" size={16}/>
                  </summary>
                  <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                     No. Porcelain veneers are non-porous glass. They repel stains from coffee, wine, and turmeric better than your natural teeth. They stay bright white forever.
                  </div>
               </details>
               <details className="group bg-white dark:bg-[#151b2b] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden transition-all duration-300 open:shadow-lg">
                  <summary className="flex items-center justify-between p-6 font-bold text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                     Can they break?
                     <ChevronRight className="transition-transform group-open:rotate-90" size={16}/>
                  </summary>
                  <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                     Veneers are extremely strong once bonded, but they are glass. You should avoid biting into ice, opening bottles, or chewing hard nuts directly with front teeth.
                  </div>
               </details>
            </div>
         </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-24 bg-slate-900 text-white">
         <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-black mb-6">Invest in confidence.</h2>
            <p className="text-slate-400 mb-10 text-lg">
               Stop hiding your teeth in photos. <br/>
               Get a "Test Drive" of your new smile for just ₹1,000.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
               <a href="tel:+918610425342" className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <Phone className="mx-auto mb-4 text-blue-400" size={32} />
                  <div className="font-bold">Call Reception</div>
                  <div className="text-sm text-slate-400">+91 86104 25342</div>
               </a>
               <a href="https://wa.me/918610425342" className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <MessageCircle className="mx-auto mb-4 text-green-400" size={32} />
                  <div className="font-bold">WhatsApp Photos</div>
                  <div className="text-sm text-slate-400">Get a virtual quote</div>
               </a>
               <a href="https://maps.app.goo.gl/fFbpcXZ9RBBCpWrg9" target="_blank" className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <MapPin className="mx-auto mb-4 text-purple-400" size={32} />
                  <div className="font-bold">Visit Clinic</div>
                  <div className="text-sm text-slate-400">Nallagandla, Hyderabad</div>
               </a>
            </div>
         </div>
      </section>

    </div>
  );
}
