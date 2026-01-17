'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Play, Pause, SkipBack, SkipForward, Heart, Share2, 
  Sparkles, Bookmark, Activity, ShieldAlert, ShieldCheck,
  Scan, Database, Wifi, Zap, AlertTriangle,
  Microscope, Layers, Droplets, Skull, Anchor, X, CheckCircle,
  MessageCircle, Clock, Info, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// ==========================================
// 1. GLOBAL STYLES & LAYOUT
// ==========================================

const consoleStyles = `
  .console-card {
    background: #ffffff;
    border-radius: 40px;
    box-shadow: 0 40px 80px -20px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(0,0,0,0.05);
    transition: all 0.5s ease;
    height: auto;
  }
  
  @media (min-width: 1024px) {
    .console-card {
      flex-direction: row;
      height: 700px; /* Tall canvas for detailed storytelling */
    }
  }

  .dark .console-card {
    background: #0f172a;
    border-color: rgba(255,255,255,0.05);
    box-shadow: 0 40px 80px -20px rgba(0,0,0,0.5);
  }

  /* The Visual Stage (Left/Top) */
  .visual-stage {
    flex: 1.6; /* 60% Width */
    position: relative;
    background: #020617; 
    min-height: 450px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid rgba(255,255,255,0.05);
  }

  /* The Controller (Right/Bottom) */
  .controller-panel {
    flex: 1; /* 40% Width */
    padding: 3.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: rgba(255,255,255,0.02);
    position: relative;
  }
  
  .track-title {
    font-family: 'Inter', sans-serif;
    letter-spacing: -0.03em;
  }

  /* Subtitle / Narrative Box */
  .narrative-overlay {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    right: 2rem;
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 1.5rem;
    border-radius: 1.5rem;
    z-index: 50;
    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.6);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .typewriter-text {
    font-family: 'Geist Mono', 'Monaco', monospace;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #e2e8f0;
    font-weight: 500;
  }
  
  .cursor-blink {
    display: inline-block;
    width: 8px;
    height: 18px;
    background: #3b82f6;
    margin-left: 4px;
    vertical-align: middle;
    animation: blink 1s infinite;
  }
  
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

  /* Technical Grid Background */
  .grid-bg {
    background-size: 50px 50px;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
`;

// --- HELPER: TYPEWRITER EFFECT ---
const Typewriter = ({ text, speed = 25 }: { text: string, speed?: number }) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(prev => prev + text.charAt(i));
        i++;
      } else { clearInterval(timer); }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return <div className="typewriter-text">{displayed}<span className="cursor-blink"/></div>;
};

// ==========================================
// 2. ADVANCED SCENES (The "Visual Engine")
// ==========================================

// --- SCENE 1: THE BIONIC TOOTH (Implants) ---
const ImplantScene = ({ phase }: { phase: number }) => {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-slate-950 overflow-hidden">
      <div className="grid-bg"></div>
      
      {/* Container holding the jaw section */}
      <div className="relative w-64 h-96 flex flex-col justify-end">
        
        {/* 1. JAWBONE CROSS SECTION */}
        <div className="w-full h-64 bg-slate-800 rounded-b-[3rem] relative overflow-hidden border-x-4 border-b-4 border-slate-700 shadow-2xl">
           {/* Trabecular Mesh Pattern */}
           <div className="absolute inset-0 opacity-20" 
                style={{ backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)', backgroundSize: '6px 6px' }}>
           </div>

           {/* PHASE 1: BONE LOSS ANIMATION */}
           {/* The bone level drops physically to simulate resorption */}
           <motion.div 
             className="absolute top-0 left-0 right-0 bg-slate-950/90 z-20 w-full border-b border-red-500/30"
             initial={{ height: 0 }}
             animate={{ height: phase === 1 ? '40%' : phase >= 2 ? '0%' : '0%' }}
             transition={{ duration: 4, ease: "easeInOut" }}
           >
              {phase === 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-red-500 font-black uppercase tracking-widest animate-pulse">
                   Bone Resorption Active
                </div>
              )}
           </motion.div>

           {/* PHASE 2 & 3: THE IMPLANT SCREW */}
           <motion.div
             className="absolute top-4 left-1/2 -translate-x-1/2 w-12 z-30"
             initial={{ y: -300 }}
             animate={{ 
               y: phase >= 2 ? 20 : -300, 
               rotate: phase >= 2 && phase < 3 ? 720 : 0 
             }}
             transition={{ duration: 3, ease: "circOut" }}
           >
              <svg viewBox="0 0 40 120" className="w-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                 <path d="M5 0H35V10L30 15V110L20 120L10 110V15L5 10V0Z" fill="url(#titanium)" />
                 {[...Array(12)].map((_,i) => <path key={i} d={`M5 ${20 + i*8}H35`} stroke="rgba(0,0,0,0.4)" strokeWidth="1.5"/>)}
                 <defs><linearGradient id="titanium" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#94a3b8"/><stop offset="0.5" stopColor="#f1f5f9"/><stop offset="1" stopColor="#64748b"/></linearGradient></defs>
              </svg>
           </motion.div>

           {/* PHASE 3: OSTEOBLAST INTEGRATION (Green Particles) */}
           {phase >= 3 && (
             <div className="absolute inset-0 z-40">
               {[...Array(20)].map((_, i) => (
                 <motion.div
                   key={i}
                   className="absolute w-1 h-1 bg-green-400 rounded-full shadow-[0_0_8px_#4ade80]"
                   initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                   animate={{ 
                     opacity: [0, 1, 0], 
                     scale: [0, 1.5, 0],
                     x: (Math.random()-0.5)*80, 
                     y: 20 + (Math.random()*100) 
                   }}
                   transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                   style={{ left: '50%' }}
                 />
               ))}
               <div className="absolute bottom-4 w-full text-center">
                  <div className="inline-block px-3 py-1 bg-green-900/50 border border-green-500 rounded text-[9px] text-green-300 font-bold uppercase tracking-widest">
                     Osseointegration: 100%
                  </div>
               </div>
             </div>
           )}
        </div>

        {/* PHASE 4: THE ABUTMENT & CROWN */}
        <motion.div
           className="absolute bottom-[240px] left-1/2 -translate-x-1/2 w-20 h-24 z-10"
           initial={{ opacity: 0, y: -50 }}
           animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : -50 }}
           transition={{ duration: 1, type: "spring" }}
        >
           <div className="w-full h-full bg-gradient-to-b from-white to-slate-200 rounded-t-2xl shadow-xl border border-white/50 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-50"></div>
           </div>
        </motion.div>

      </div>
    </div>
  );
};

// --- SCENE 2: THE INSTAGRAM TRAP (Veneers) ---
const VeneerScene = ({ phase }: { phase: number }) => {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-black overflow-hidden">
      {/* Studio Lighting Effects */}
      <motion.div 
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]"
        animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="flex gap-12 items-center relative z-10">
         
         {/* OPTION A: THE "CHICLET" (Bad) */}
         <motion.div 
           className="flex flex-col items-center"
           animate={{ 
             opacity: phase === 1 ? 1 : 0.3, 
             scale: phase === 1 ? 1.1 : 0.9,
             filter: phase === 1 ? 'grayscale(0%)' : 'grayscale(100%)'
           }}
         >
            <div className="w-32 h-40 bg-white rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.9)] border-4 border-white flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-white"></div> {/* Opaque Block */}
               <span className="relative z-10 text-slate-300 font-black text-xs -rotate-12 opacity-50">OPAQUE</span>
            </div>
            {phase === 1 && (
               <motion.div initial={{y:10, opacity:0}} animate={{y:0, opacity:1}} className="mt-4 px-3 py-1 bg-red-900/50 border border-red-500 text-red-400 text-[10px] font-bold uppercase rounded">
                  <X size={10} className="inline mr-1"/> Monolithic Block
               </motion.div>
            )}
         </motion.div>

         {/* OPTION B: BIOMIMETIC (Good) */}
         <motion.div 
           className="flex flex-col items-center relative perspective-[800px]"
           animate={{ 
             opacity: phase >= 2 ? 1 : 0.3, 
             scale: phase >= 2 ? 1.1 : 0.9 
           }}
         >
            <div className="relative w-32 h-40">
               
               {/* LAYER 1: DENTIN (Core) */}
               <motion.div 
                  initial={{ height: 0 }} 
                  animate={{ height: phase >= 2 ? '100%' : '0%' }} 
                  transition={{ duration: 1.5 }}
                  className="absolute bottom-0 w-full bg-gradient-to-b from-amber-100 to-amber-300 rounded-xl border border-amber-200/50 shadow-inner"
               />
               
               {/* LAYER 2: ENAMEL (Translucent) */}
               <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: phase >= 3 ? 0.7 : 0 }} 
                  transition={{ duration: 1.5 }}
                  className="absolute inset-[-4px] bg-gradient-to-b from-blue-50/20 to-transparent rounded-xl border border-white/40 backdrop-blur-[2px] shadow-lg"
               />

               {/* LAYER 3: LIGHT PHYSICS */}
               {phase >= 4 && (
                 <motion.div 
                    className="absolute inset-0 overflow-hidden rounded-xl"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                 >
                    <motion.div 
                       className="w-16 h-[200%] bg-gradient-to-r from-transparent via-white/70 to-transparent absolute top-[-50%] skew-x-12 filter blur-md"
                       animate={{ left: ['-100%', '200%'] }}
                       transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                 </motion.div>
               )}
            </div>

            {phase >= 2 && (
               <motion.div initial={{y:10, opacity:0}} animate={{y:0, opacity:1}} className="mt-6 px-3 py-1 bg-green-900/50 border border-green-500 text-green-400 text-[10px] font-bold uppercase rounded flex items-center gap-2">
                  <CheckCircle size={10} /> 
                  {phase === 2 ? "Dentin Core" : phase === 3 ? "Enamel Shell" : "Light Refraction"}
               </motion.div>
            )}
         </motion.div>
      </div>
    </div>
  );
};

// --- SCENE 3: THE HEART-MOUTH LOOP (Systemic Health) ---
const HeartScene = ({ phase }: { phase: number }) => {
  return (
    <div className="w-full h-full relative bg-slate-950 flex flex-col justify-center px-12 overflow-hidden">
       {/* Vein Background */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-950 via-slate-950 to-slate-950"></div>
       
       <div className="relative z-10 flex justify-between items-center h-48">
          
          {/* 1. THE MOUTH (Source) */}
          <div className="flex flex-col items-center gap-4">
             <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-red-500/30 flex items-center justify-center relative overflow-hidden">
                {/* Inflamed Tissue */}
                <div className="absolute inset-0 bg-red-500/10 animate-pulse"></div>
                {/* Spawning Bacteria */}
                {[...Array(8)].map((_, i) => (
                   <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-green-400 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ 
                         scale: phase >= 1 ? [0, 1, 0] : 0,
                         x: (Math.random()-0.5)*60,
                         y: (Math.random()-0.5)*60
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: i*0.2 }}
                      style={{ top: '50%', left: '50%' }}
                   />
                ))}
             </div>
             <span className="text-[10px] font-black uppercase text-red-400 tracking-widest bg-red-950/50 px-2 py-1 rounded">Gum Infection</span>
          </div>

          {/* 2. THE HIGHWAY (Bloodstream) */}
          <div className="flex-1 h-12 relative mx-4 bg-red-900/10 rounded-full border-y border-red-500/20 overflow-hidden">
             {/* Traveling Bacteria */}
             {phase >= 2 && [...Array(5)].map((_, i) => (
                <motion.div
                   key={i}
                   className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"
                   initial={{ left: '-10%' }}
                   animate={{ left: '110%' }}
                   transition={{ duration: 3, repeat: Infinity, delay: i*0.8, ease: "linear" }}
                />
             ))}
             {/* Blood Cells */}
             {[...Array(10)].map((_, i) => (
                <motion.div
                   key={i+10}
                   className="absolute top-1/3 w-2 h-2 bg-red-600 rounded-full opacity-50"
                   animate={{ left: ['-10%', '110%'] }}
                   transition={{ duration: 5, repeat: Infinity, delay: i*0.5, ease: "linear" }}
                />
             ))}
          </div>

          {/* 3. THE HEART (Target) */}
          <div className="flex flex-col items-center gap-4">
             <div className="relative">
                <motion.div 
                  className="w-24 h-24 bg-red-700 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.4)] relative z-10"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                >
                   <Heart fill="white" className="text-white w-10 h-10" />
                </motion.div>
                
                {/* Inflammation Warning */}
                {phase >= 3 && (
                   <motion.div 
                      className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-slate-900 z-20"
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                   >
                      <AlertTriangle size={14} className="text-black" />
                   </motion.div>
                )}
             </div>
             <span className="text-[10px] font-black uppercase text-white tracking-widest bg-slate-800 px-2 py-1 rounded">Valve Risk</span>
          </div>

       </div>
    </div>
  );
};

// --- SCENE 4: INVISIBLE PHYSICS (Aligners) ---
const AlignerScene = ({ phase }: { phase: number }) => {
  return (
    <div className="w-full h-full relative bg-slate-900 flex items-center justify-center">
       <div className="grid-bg opacity-30"></div>
       
       <div className="flex items-center gap-16 relative z-10">
          
          {/* THE TOOTH */}
          <div className="relative">
             {/* Root Shadow */}
             <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/50 blur-lg rounded-full"></div>
             
             {/* The Tooth Block */}
             <motion.div 
               className="w-32 h-40 bg-slate-200 rounded-[2rem] border-4 border-slate-300 flex items-center justify-center shadow-2xl relative"
               animate={{ 
                  rotate: phase >= 2 ? 15 : 0,
                  x: phase >= 3 ? 40 : 0
               }}
               transition={{ duration: 2, ease: "easeInOut" }}
             >
                <span className="text-slate-400 font-black text-6xl opacity-20">T</span>
                
                {/* The Aligner Mesh (Invisible) */}
                <motion.div
                   className="absolute -inset-3 border-2 border-blue-400 rounded-[2.5rem] bg-blue-400/5 shadow-[0_0_20px_rgba(96,165,250,0.2)]"
                   animate={{ opacity: [0.3, 0.6, 0.3] }}
                   transition={{ duration: 3, repeat: Infinity }}
                />
             </motion.div>

             {/* Center of Rotation Dot */}
             {phase >= 2 && (
                <motion.div initial={{scale:0}} animate={{scale:1}} className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 z-20 border-2 border-white shadow-lg" />
             )}
          </div>

          {/* PHYSICS VECTORS */}
          <div className="flex flex-col gap-6">
             <motion.div 
               className="flex items-center gap-3"
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: phase >= 1 ? 1 : 0, x: phase >= 1 ? 0 : -20 }}
             >
                <div className="w-12 h-12 bg-blue-600/20 border border-blue-500 rounded-full flex items-center justify-center text-blue-400">
                   <Zap size={20} />
                </div>
                <div>
                   <div className="text-xs font-bold text-white uppercase">Constant Force</div>
                   <div className="text-[10px] text-blue-400">0.25N Continuous</div>
                </div>
             </motion.div>

             <motion.div 
               className="flex items-center gap-3"
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: phase >= 2 ? 1 : 0, x: phase >= 2 ? 0 : -20 }}
             >
                <div className="w-12 h-12 bg-purple-600/20 border border-purple-500 rounded-full flex items-center justify-center text-purple-400">
                   <Activity size={20} />
                </div>
                <div>
                   <div className="text-xs font-bold text-white uppercase">Torque Control</div>
                   <div className="text-[10px] text-purple-400">Root Rotation</div>
                </div>
             </motion.div>
          </div>
       </div>
    </div>
  );
};

// --- SCENE 5: THE 3-YEAR WARNING (AI Scan) ---
const ScannerScene = ({ phase }: { phase: number }) => {
  return (
    <div className="w-full h-full relative bg-black flex items-center justify-center overflow-hidden">
       
       {/* 1. THE TOOTH WIREFRAME */}
       <div className="relative w-48 h-64 opacity-50">
          <svg viewBox="0 0 100 130" className="w-full h-full">
             <path d="M20 100 Q 50 10 80 100 L 70 120 L 30 120 Z" fill="none" stroke="#10b981" strokeWidth="0.5" strokeDasharray="2 2" />
             <path d="M30 40 Q 50 50 70 40" fill="none" stroke="#10b981" strokeWidth="0.5" />
          </svg>
          
          {/* THE HIDDEN DECAY (Invisible initially) */}
          <motion.div 
             className="absolute top-[35%] left-[45%] w-6 h-6 bg-red-600 rounded-full blur-md"
             initial={{ opacity: 0 }}
             animate={{ opacity: phase >= 2 ? [0.5, 1, 0.5] : 0 }}
             transition={{ duration: 1, repeat: Infinity }}
          />
       </div>

       {/* 2. THE LASER BEAM */}
       {phase >= 1 && (
          <motion.div
             className="absolute left-0 right-0 h-1 bg-green-500 shadow-[0_0_30px_#22c55e] z-20"
             initial={{ top: '0%' }}
             animate={{ top: ['0%', '100%', '0%'] }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
             <div className="absolute right-10 -top-3 text-[10px] font-mono text-green-400 bg-black/50 px-2">SCANNING...</div>
          </motion.div>
       )}

       {/* 3. DATA HUD LAYERS */}
       <div className="absolute inset-0 pointer-events-none">
          {/* Floating Metrics */}
          {phase >= 1 && [...Array(4)].map((_, i) => (
             <motion.div
                key={i}
                className="absolute text-[8px] font-mono text-green-500/60 border border-green-500/30 px-2 py-1 rounded bg-green-900/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.5 }}
                style={{ top: `${20 + i*15}%`, right: '10%' }}
             >
                {['DENSITY: 98%', 'STRUCTURE: OK', 'SPECTRA: 450nm', 'DEPTH: 1.2mm'][i]}
             </motion.div>
          ))}

          {/* ALERT BOX */}
          <AnimatePresence>
             {phase >= 3 && (
                <motion.div
                   initial={{ scale: 0, y: 50 }} 
                   animate={{ scale: 1, y: 0 }}
                   exit={{ opacity: 0 }}
                   className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-red-950/90 border border-red-500 text-white p-4 rounded-xl shadow-2xl flex items-center gap-4 min-w-[250px]"
                >
                   <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
                      <ShieldAlert size={20} className="text-white"/> 
                   </div>
                   <div>
                      <div className="font-black uppercase text-sm tracking-wide">Decay Detected</div>
                      <div className="text-[10px] font-mono text-red-200">Sub-surface: 2mm deep</div>
                      <div className="text-[9px] text-slate-400 mt-1">Invisible to Naked Eye</div>
                   </div>
                </motion.div>
             )}
          </AnimatePresence>
       </div>
    </div>
  );
};


// ==========================================
// 3. MAIN COMPONENT (State & Logic)
// ==========================================

export default function Gallery() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isTimerPlaying, setIsTimerPlaying] = useState(false);
  const [barWidth, setBarWidth] = useState("0%");
  
  // NARRATIVE STATE
  const [phase, setPhase] = useState(0);
  const [storyText, setStoryText] = useState("");
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- TOP 5 PLAYLIST (Rich Content) ---
  const playlist = [
    {
      name: "The Bionic Tooth",
      artist: "Surgical Science",
      description: "Why titanium is the only material that fuses with human bone.",
      component: <ImplantScene phase={phase} />,
      script: [
        { t: 0, text: "Welcome to the Biology of Implants. Let's look at what happens when you lose a tooth.", p: 0 },
        { t: 5, text: "PHASE 1: RESORPTION. Without a root to stimulate it, your jawbone literally melts away. This causes facial collapse.", p: 1 },
        { t: 12, text: "PHASE 2: INSERTION. We place a Grade-5 Titanium Implant. It mimics the natural tooth root perfectly.", p: 2 },
        { t: 18, text: "PHASE 3: OSSEOINTEGRATION. This is the magic. Your bone cells (osteoblasts) attach to the titanium surface.", p: 3 },
        { t: 25, text: "PHASE 4: RESTORATION. Once fused, we attach the crown. You now have 100% bite force restored.", p: 4 }
      ],
      audio: "/audio/implants.mp3",
      category: "Surgery",
      tags: ['Implants', 'Biology', 'Titanium']
    },
    {
      name: "The Instagram Trap",
      artist: "Cosmetic Ethics",
      description: "The difference between 'Chiclet' teeth and Biomimetic artistry.",
      component: <VeneerScene phase={phase} />,
      script: [
        { t: 0, text: "Let's analyze why some veneers look fake. We call them 'Chiclets'.", p: 0 },
        { t: 5, text: "PROBLEM: Monolithic blocks. They are one solid color, opaque, and block light. They look dead.", p: 1 },
        { t: 12, text: "SOLUTION: Biomimetic Layering. We mimic nature. First, a warm Dentin core.", p: 2 },
        { t: 18, text: "Next, a translucent Enamel shell. This creates depth and allows light to pass through.", p: 3 },
        { t: 24, text: "Finally, light refraction. Real teeth glow. We recreate that internal physics.", p: 4 }
      ],
      audio: "/audio/ethics.mp3", 
      category: "Ethics",
      tags: ['Veneers', 'Truth', 'Art']
    },
    {
      name: "The Heart-Mouth Loop",
      artist: "Systemic Health",
      description: "Tracing the path of bacteria from gum pockets to heart valves.",
      component: <HeartScene phase={phase} />,
      script: [
        { t: 0, text: "Warning: Your mouth is not isolated. It is a highway to your vital organs.", p: 0 },
        { t: 5, text: "STEP 1: INFECTION. Plaque bacteria multiply in deep gum pockets. The tissue becomes inflamed.", p: 1 },
        { t: 12, text: "STEP 2: THE BREACH. When you bleed, bacteria enter your bloodstream directly.", p: 2 },
        { t: 20, text: "STEP 3: THE TARGET. These pathogens travel to the heart, lodging in valves and arteries.", p: 3 },
        { t: 28, text: "Treating gum disease is not just about teeth. It is about stroke and heart attack prevention.", p: 3 }
      ],
      audio: "/audio/safety.mp3",
      category: "Health",
      tags: ['Heart', 'Bacteria', 'Risk']
    },
    {
      name: "Invisible Physics",
      artist: "Orthodontics",
      description: "How clear aligners move bone faster than metal braces.",
      component: <AlignerScene phase={phase} />,
      script: [
        { t: 0, text: "How does clear plastic move a solid bone? It's simply physics.", p: 0 },
        { t: 5, text: "Braces pull teeth. Aligners PUSH them. We apply 0.25 Newtons of constant force.", p: 1 },
        { t: 12, text: "This stimulates osteoclasts to dissolve bone on one side, and osteoblasts to build it on the other.", p: 2 },
        { t: 20, text: "By controlling the Center of Rotation, we can rotate roots without metal wires.", p: 3 },
        { t: 28, text: "The result? Faster, safer movement with less pain.", p: 3 }
      ],
      audio: "/audio/ortho.mp3",
      category: "Ortho",
      tags: ['Physics', 'Aligners', 'Speed']
    },
    {
      name: "The 3-Year Warning",
      artist: "AI Diagnostics",
      description: "Detecting decay years before the human eye can see it.",
      component: <ScannerScene phase={phase} />,
      script: [
        { t: 0, text: "Most cavities are invisible for the first 2 years. X-rays often miss them.", p: 0 },
        { t: 6, text: "We use Near-Infrared Laser Transillumination. It scans the density of your enamel.", p: 1 },
        { t: 14, text: "Healthy enamel allows light to pass. Decay absorbs it, creating a shadow.", p: 2 },
        { t: 22, text: "ALERT: We found a lesion 2mm deep. But because we caught it early...", p: 3 },
        { t: 30, text: "We can remineralize it without drilling. Prevention is the ultimate cure.", p: 3 }
      ],
      audio: "/audio/ai.mp3", 
      category: "Technology",
      tags: ['AI', 'Laser', 'Prevention']
    }
  ];

  const currentTrack = playlist[currentTrackIndex];

  // --- ENGINE LOGIC ---
  
  // 1. Narrative Timer
  useEffect(() => {
    setPhase(0);
    setStoryText("");
    
    const script = currentTrack.script;
    if (!script) return;

    let timeouts: NodeJS.Timeout[] = [];
    
    script.forEach((step) => {
      const timeout = setTimeout(() => {
        setStoryText(step.text);
        setPhase(step.p);
      }, step.t * 1000);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [currentTrackIndex]);

  // 2. Audio Setup
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(playlist[0].audio);
      audioRef.current.volume = 0.25; 
    }
    const audio = audioRef.current;
    const updateProgress = () => { if (audio.duration) setBarWidth(`${(audio.currentTime / audio.duration) * 100}%`); };
    const handleEnded = () => handleNext(); // Auto-advance
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    return () => { audio.removeEventListener('timeupdate', updateProgress); audio.removeEventListener('ended', handleEnded); };
  }, []);

  // 3. Track Switching
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = playlist[currentTrackIndex].audio;
      audioRef.current.load();
      if (isTimerPlaying) {
        audioRef.current.play().catch(e => { setIsTimerPlaying(false); console.log(e); });
      } else { setBarWidth("0%"); }
    }
  }, [currentTrackIndex]);

  // 4. Controls
  const togglePlay = () => {
    if(!audioRef.current) return;
    if(isTimerPlaying) { audioRef.current.pause(); setIsTimerPlaying(false); }
    else { audioRef.current.play(); setIsTimerPlaying(true); }
  };
  const handleNext = () => { setIsTimerPlaying(true); setCurrentTrackIndex(p => (p + 1) % playlist.length); };
  const handlePrev = () => { setIsTimerPlaying(true); setCurrentTrackIndex(p => (p - 1 + playlist.length) % playlist.length); };
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * audioRef.current.duration;
  };

  return (
    <section id="gallery" className="py-24 relative bg-slate-50 dark:bg-[#0B1019] transition-colors duration-500">
      <style jsx global>{consoleStyles}</style>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <RevealOnScroll>
          <div className="flex flex-col items-center text-center">
             <div className="inline-flex items-center gap-2 text-blue-600 dark:text-cyan-400 font-bold tracking-[0.3em] text-[10px] uppercase mb-4 border border-blue-200 dark:border-blue-900 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/10">
                <Sparkles size={14} /> Knowledge Engine
             </div>
             <h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-[0.85]">
                Clinical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Console.</span>
             </h2>
             <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl font-medium leading-relaxed">
               Interactive simulations of our most complex procedures. Watch, listen, and learn.
             </p>
          </div>
        </RevealOnScroll>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- MAIN CONSOLE CARD --- */}
        <RevealOnScroll className="mb-24">
           <div className="console-card group hover:shadow-2xl transition-shadow duration-500">
              
              {/* LEFT: VISUAL STAGE */}
              <div className="visual-stage">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={currentTrackIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                       {currentTrack.component}
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* TEACHER OVERLAY */}
                  <div className="narrative-overlay">
                     <div className="flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-widest border-b border-white/10 pb-2 mb-1">
                        <MessageCircle size={12} /> Live Explanation
                     </div>
                     <Typewriter text={storyText} key={storyText} speed={30} />
                  </div>
              </div>

              {/* RIGHT: CONTROLLER PANEL */}
              <div className="controller-panel">
                  <div className="flex flex-col h-full justify-between">
                    
                    {/* Track Info */}
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-500 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                                <Bookmark size={12} /> {currentTrack.category}
                            </div>
                            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-2">
                                <Clock size={12} /> LESSON {currentTrackIndex + 1}/{playlist.length}
                            </div>
                        </div>

                        <h2 className="track-title text-4xl font-black text-slate-900 dark:text-white mb-4 leading-[0.95]">
                            {currentTrack.name}
                        </h2>
                        
                        <div className="flex flex-wrap gap-2 mb-8">
                            {currentTrack.tags.map(t => (
                                <span key={t} className="text-[10px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg uppercase tracking-wider hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-default">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium pl-4 border-l-2 border-blue-500/30">
                            {currentTrack.description}
                        </p>
                    </div>

                    {/* Playback Controls */}
                    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-white/5">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Activity size={12} className={isTimerPlaying ? "animate-pulse text-green-500" : "text-slate-600"} /> 
                                {isTimerPlaying ? "Simulating..." : "Paused"}
                            </span>
                        </div>

                        {/* Seeker */}
                        <div className="relative h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden mb-8 cursor-pointer group/bar w-full" onClick={handleSeek}>
                            <div className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-100 ease-linear group-hover/bar:bg-blue-500 shadow-[0_0_10px_#2563eb]" style={{ width: barWidth }}></div>
                        </div>
                        
                        {/* Buttons */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <button onClick={handlePrev} className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 dark:hover:text-white transition-all">
                                    <SkipBack size={20} />
                                </button>
                                
                                <button 
                                    onClick={togglePlay} 
                                    className="w-20 h-20 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all"
                                >
                                    {isTimerPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                                </button>
                                
                                <button onClick={handleNext} className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 dark:hover:text-white transition-all">
                                    <SkipForward size={20} />
                                </button>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <button className="text-slate-300 hover:text-red-500 transition-colors hover:scale-110 p-2">
                                    <Heart size={24} />
                                </button>
                                <button className="text-slate-300 hover:text-blue-500 transition-colors hover:scale-110 p-2">
                                    <Share2 size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>
           </div>
        </RevealOnScroll>

    <div className="text-center mt-16">
           <Link href="/gallery" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors group">
              View Complete Archives <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>

      </div>
    </section>
  );
};
