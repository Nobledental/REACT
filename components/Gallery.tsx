'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Play, Pause, SkipBack, SkipForward, Heart, Share2, 
  Sparkles, Bookmark, Activity, ShieldAlert, ShieldCheck,
  Scan, Database, Wifi, ArrowDown, Zap, AlertTriangle,
  Microscope, Layers, Droplets, Flame, Skull, Anchor, Wind
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// ==========================================
// 1. GLOBAL STYLES & UTILS
// ==========================================

const wideCardStyles = `
  .unified-player-card {
    background: #ffffff;
    border-radius: 40px;
    box-shadow: 0 30px 60px -10px rgba(0,0,0,0.08);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(0,0,0,0.05);
    transition: all 0.5s ease;
    height: auto;
  }
  
  @media (min-width: 1024px) {
    .unified-player-card {
      flex-direction: row;
      height: 600px; /* Taller for complex visuals */
    }
  }

  .dark .unified-player-card {
    background: #0f172a;
    border-color: rgba(255,255,255,0.05);
    box-shadow: 0 30px 60px -10px rgba(0,0,0,0.4);
  }

  .player-media {
    flex: 1.4; /* Give visuals more space (60/40 split) */
    position: relative;
    background: #020617; /* Deepest slate for contrast */
    min-height: 400px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid rgba(255,255,255,0.05);
  }

  .player-content {
    flex: 1;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: rgba(255,255,255,0.02); /* Subtle texture */
  }
  
  .track-title {
    font-family: 'Inter', sans-serif;
    letter-spacing: -0.03em;
  }

  /* HUD / Info Overlay Styles */
  .hud-container {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 20;
  }

  .anim-info-box {
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.15);
    padding: 8px 16px;
    border-radius: 8px;
    position: absolute;
    color: white;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 10px 20px -5px rgba(0,0,0,0.5);
    transform-origin: center;
  }

  /* Grid Background for Technical Feel */
  .tech-grid {
    background-size: 40px 40px;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    position: absolute;
    inset: 0;
  }
`;

// ==========================================
// 2. ADVANCED CLINICAL VISUALIZATIONS (SVG + FRAMER)
// ==========================================

// --- A. SURGERY: OSSEOINTEGRATION (Implants) ---
const ImplantStory = () => {
  return (
    <div className="relative w-full h-full bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
      <div className="tech-grid"></div>
      
      {/* Container for Split View */}
      <div className="flex w-full h-full relative z-10">
        
        {/* LEFT: BONE LOSS (The Problem) */}
        <div className="flex-1 flex flex-col items-center justify-end pb-20 border-r border-white/5 relative group">
           <div className="absolute top-10 left-10 anim-info-box border-red-500/50 text-red-400">
             <AlertTriangle size={12} /> Bone Resorption
           </div>
           
           {/* Animated Bone Shrinking */}
           <div className="w-32 bg-slate-800/50 h-64 rounded-t-lg relative overflow-hidden border border-white/10">
              <motion.div 
                initial={{ height: '100%' }}
                animate={{ height: '40%' }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-900/40 to-slate-800 w-full"
              >
                 {/* Trabecular Bone Pattern */}
                 <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
              </motion.div>
              
              {/* Ghost Tooth (Missing) */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-20">
                 <Skull size={40} className="text-slate-500" />
              </div>
           </div>
           <p className="text-[10px] text-slate-500 mt-4 uppercase tracking-widest font-bold">Unstimulated Bone</p>
        </div>

        {/* RIGHT: OSSEOINTEGRATION (The Solution) */}
        <div className="flex-1 flex flex-col items-center justify-end pb-20 relative">
           <div className="absolute top-10 right-10 anim-info-box border-blue-500/50 text-blue-400">
             <Anchor size={12} /> Titanium Fusion
           </div>

           <div className="w-32 bg-slate-800/50 h-64 rounded-t-lg relative overflow-hidden border border-white/10 flex justify-center">
              {/* Healthy Bone Level */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-slate-800 h-full">
                 <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
              </div> 
              
              {/* THE IMPLANT SCREW (SVG) */}
              <motion.div
                 initial={{ y: -200 }}
                 animate={{ y: 20 }}
                 transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
                 className="relative z-10 w-8"
              >
                 <svg viewBox="0 0 40 120" fill="none" className="w-full h-full filter drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <path d="M5 0H35V10L30 15V110L20 120L10 110V15L5 10V0Z" fill="url(#titanium_grad)" />
                    {/* Threads */}
                    {[...Array(10)].map((_,i) => (
                       <path key={i} d={`M5 ${20 + i*9}H35`} stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
                    ))}
                    <defs>
                       <linearGradient id="titanium_grad" x1="0" y1="0" x2="40" y2="0">
                          <stop stopColor="#94a3b8" />
                          <stop offset="0.5" stopColor="#f1f5f9" />
                          <stop offset="1" stopColor="#64748b" />
                       </linearGradient>
                    </defs>
                 </svg>
              </motion.div>

              {/* OSTEOBLAST ACTIVITY (Cells Attaching) */}
              {[...Array(8)].map((_, i) => (
                 <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80]"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                       opacity: [0, 1, 1], 
                       scale: [0, 1.5, 1],
                       x: (Math.random() - 0.5) * 40,
                       y: 20 + (Math.random() * 80) 
                    }}
                    transition={{ delay: 2.5 + (i * 0.2), duration: 1 }}
                 />
              ))}
           </div>
           <p className="text-[10px] text-blue-400 mt-4 uppercase tracking-widest font-bold">Stable Foundation</p>
        </div>
      </div>
    </div>
  );
};

// --- B. ETHICS: BIOMIMETIC LAYERING (Veneers) ---
const VeneerStory = () => {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
      {/* Background Reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 to-blue-900/10"></div>

      <div className="flex gap-16 items-center z-10">
         
         {/* 1. THE FAKE (Monolithic) */}
         <div className="flex flex-col items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="relative w-28 h-36 bg-white rounded-md mb-6 shadow-xl border border-slate-300 flex items-center justify-center">
               <span className="text-[10px] text-slate-400 font-mono rotate-[-45deg] opacity-50">NO DEPTH</span>
            </div>
            <div className="anim-info-box !relative !inset-0 border-red-500 text-red-400">
               <X size={12}/> Opaque Block
            </div>
         </div>

         {/* Arrow */}
         <div className="text-slate-600"><ArrowRight size={24}/></div>

         {/* 2. THE TRUE (Layered) */}
         <div className="flex flex-col items-center">
            <div className="relative w-28 h-36 mb-6 perspective-[1000px] group">
               
               {/* Layer 1: Dentin (Warm Core) */}
               <motion.div 
                  initial={{ z: -20, opacity: 0 }} animate={{ z: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
                  className="absolute inset-0 bg-gradient-to-b from-amber-100 to-amber-300 rounded-md border border-amber-200/50"
                  style={{ transformStyle: 'preserve-3d' }}
               />
               
               {/* Layer 2: Enamel (Translucent Shell) */}
               <motion.div 
                  initial={{ z: 20, opacity: 0 }} animate={{ z: 0, opacity: 0.7 }} transition={{ delay: 1.5, duration: 1 }}
                  className="absolute inset-[-2px] bg-gradient-to-b from-blue-50/40 to-transparent rounded-md border border-white/60 backdrop-blur-[1px] shadow-[0_0_30px_rgba(255,255,255,0.3)]"
               >
                  {/* Light Physics */}
                  <motion.div 
                     animate={{ left: ['-100%', '200%'] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 3 }}
                     className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12 filter blur-sm"
                  />
               </motion.div>

               {/* Internal Structure Lines */}
               <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M20 100 Q 50 20 80 100" stroke="orange" strokeWidth="0.5" fill="none" />
                  <path d="M10 100 Q 50 10 90 100" stroke="orange" strokeWidth="0.5" fill="none" />
               </svg>
            </div>
            
            <div className="anim-info-box !relative !inset-0 border-green-500 text-green-400">
               <Layers size={12}/> Biomimetic Depth
            </div>
         </div>
      </div>
    </div>
  );
};

// --- C. HEALTH: THE SYSTEMIC HIGHWAY (Bacteria -> Heart) ---
const HeartMouthStory = () => {
  return (
    <div className="relative w-full h-full bg-slate-950 flex flex-col justify-center px-12 overflow-hidden">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-slate-950 to-slate-950"></div>

       {/* Flow Path */}
       <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <path id="bloodstream" d="M 100 150 C 300 150, 400 300, 600 300" stroke="#ef4444" strokeWidth="40" fill="none" strokeLinecap="round" />
          <path d="M 100 150 C 300 150, 400 300, 600 300" stroke="#7f1d1d" strokeWidth="2" fill="none" strokeDasharray="5 5" className="animate-[dash_20s_linear_infinite]" />
       </svg>

       <div className="relative z-10 flex justify-between items-center h-64">
          
          {/* MOUTH (Source) */}
          <div className="text-center w-32">
             <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-red-500/50 flex items-center justify-center relative overflow-hidden shadow-[0_0_40px_rgba(239,68,68,0.2)]">
                {/* Spawning Bacteria */}
                {[...Array(6)].map((_, i) => (
                   <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-green-400 rounded-full"
                      animate={{ 
                         x: [0, (Math.random()-0.5)*20], 
                         y: [0, (Math.random()-0.5)*20],
                         scale: [1, 1.5, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ top: '40%', left: '45%' }}
                   />
                ))}
             </div>
             <p className="mt-4 text-[10px] font-black uppercase text-red-400 tracking-widest">Periodontal Pocket</p>
          </div>

          {/* THE JOURNEY (Particles) */}
          <div className="flex-1 h-32 relative">
             <motion.div 
               className="absolute top-1/2 left-0 right-0 h-1 bg-red-500/20"
             />
             {/* Traveling Pathogen */}
             <motion.div
                className="absolute w-4 h-4 bg-green-500 rounded-full shadow-[0_0_15px_#22c55e] flex items-center justify-center top-1/2 -translate-y-1/2"
                animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             >
                <div className="w-6 h-6 border border-red-500 rounded-full animate-ping absolute opacity-50"></div>
             </motion.div>
             
             <div className="anim-info-box absolute top-0 left-1/2 -translate-x-1/2 border-red-500 text-white">
                <Activity size={12} className="text-red-500" /> Systemic Inflammation
             </div>
          </div>

          {/* HEART (Target) */}
          <div className="text-center w-32">
             <motion.div 
               animate={{ scale: [1, 1.15, 1] }}
               transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
               className="w-24 h-24 rounded-full bg-red-700 flex items-center justify-center shadow-[0_0_60px_rgba(220,38,38,0.6)] relative z-10"
            >
                <Heart fill="white" className="text-white w-10 h-10" />
             </motion.div>
             <p className="mt-4 text-[10px] font-black uppercase text-white tracking-widest">Valve Infection Risk</p>
          </div>
       </div>
    </div>
  );
};

// --- D. ORTHO: INVISIBLE PHYSICS (Aligners) ---
const AlignerStory = () => {
  return (
    <div className="relative w-full h-full bg-slate-900 flex items-center justify-center">
       <div className="tech-grid opacity-20"></div>
       
       <div className="relative z-10 flex items-center gap-12">
          
          {/* THE TOOTH */}
          <div className="relative w-32 h-40 bg-slate-200 rounded-[2rem] border-4 border-slate-300 flex items-center justify-center shadow-2xl">
             <span className="text-slate-400 font-black text-6xl opacity-20">T</span>
             
             {/* The Aligner Ghost (Plastic) */}
             <motion.div
                animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -inset-2 border-2 border-blue-400 rounded-[2.2rem] bg-blue-400/5 shadow-[0_0_20px_rgba(96,165,250,0.3)]"
             />
          </div>

          {/* FORCE VECTORS */}
          <div className="flex flex-col gap-4">
             <motion.div 
               initial={{ width: 0, opacity: 0 }} 
               animate={{ width: 120, opacity: 1 }} 
               transition={{ duration: 1, delay: 0.5 }}
               className="h-10 bg-blue-600/20 border border-blue-500 rounded-r-full flex items-center px-4 relative overflow-hidden"
             >
                <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest z-10">Constant Force</span>
                <motion.div animate={{ x: [-120, 120] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-blue-500/20 blur-md"></motion.div>
             </motion.div>

             <motion.div 
               initial={{ width: 0, opacity: 0 }} 
               animate={{ width: 90, opacity: 1 }} 
               transition={{ duration: 1, delay: 1.0 }}
               className="h-8 bg-purple-600/20 border border-purple-500 rounded-r-full flex items-center px-4 relative"
             >
                <span className="text-[9px] font-bold text-purple-400 uppercase tracking-widest">Rotation</span>
             </motion.div>
          </div>
       </div>

       <motion.div
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 2 }}
          className="anim-info-box absolute bottom-12 border-blue-400 text-blue-200"
       >
          <Zap size={12} className="text-yellow-400" /> 0.25mm / 2 Weeks
       </motion.div>
    </div>
  );
};

// --- E. TECH: AI DIAGNOSTICS (Laser Scan) ---
const AIStory = () => {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
       {/* 3D Wireframe Tooth */}
       <svg width="240" height="300" viewBox="0 0 200 260" className="opacity-40">
          <path d="M60 200 Q 30 100 60 50 Q 100 20 140 50 Q 170 100 140 200 L 120 250 L 80 250 Z" 
                stroke="#10b981" strokeWidth="1" fill="none" strokeDasharray="4 4" 
                className="animate-[dash_10s_linear_infinite]"
          />
          <path d="M80 80 Q 100 100 120 80" stroke="#10b981" strokeWidth="1" />
       </svg>

       {/* The "Hidden" Cavity (Red Spot) */}
       <motion.div 
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
          className="absolute top-[120px] left-[130px] w-4 h-4 bg-red-600 rounded-full blur-sm z-10 shadow-[0_0_20px_#ef4444]"
       />

       {/* SCANNING LASER BEAM */}
       <motion.div
          animate={{ top: ['10%', '90%', '10%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute w-[80%] h-1 bg-green-500 shadow-[0_0_30px_#22c55e] z-20 opacity-80"
       />

       {/* DATA CLOUD (Floating Code) */}
       <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
             <motion.div
                key={i}
                className="absolute text-[8px] font-mono text-green-500/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                style={{ 
                   top: `${20 + Math.random() * 60}%`, 
                   left: `${10 + Math.random() * 80}%` 
                }}
             >
                {['DENSITY: LOW', 'ENAMEL: 98%', 'DEPTH: 2mm', 'RISK: HIGH'][i % 4]}
             </motion.div>
          ))}
       </div>

       {/* ALERT BOX */}
       <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, type: "spring" }}
          className="anim-info-box absolute bottom-16 bg-red-900/90 border-red-500 text-white shadow-2xl"
       >
          <ShieldAlert size={14} className="animate-pulse text-red-400"/> 
          <div>
             <div>Early Decay Detected</div>
             <div className="text-[8px] font-normal opacity-70 font-mono">Invisible to X-Ray</div>
          </div>
       </motion.div>
    </div>
  );
};

// --- F. CHEMISTRY: FLUORIDE LATTICE ---
const FluorideStory = () => {
  return (
    <div className="relative w-full h-full bg-slate-900 flex items-center justify-center">
       {/* Enamel Crystal Lattice Grid */}
       <div className="grid grid-cols-5 gap-3 p-8 bg-slate-800/50 rounded-xl border border-slate-700">
          {[...Array(25)].map((_, i) => {
             const isDamaged = [7, 12, 17].includes(i);
             return (
               <div key={i} className="relative">
                  {/* The Calcium/Phosphate Hexagon */}
                  <div className={`w-8 h-8 ${isDamaged ? 'border-red-500/30' : 'border-white/20'} border-2 rounded-lg flex items-center justify-center`}>
                     {!isDamaged && <div className="w-2 h-2 bg-white/40 rounded-full"></div>}
                  </div>
                  
                  {/* Fluoride Ion Repairing */}
                  {isDamaged && (
                     <motion.div
                        initial={{ scale: 3, opacity: 0, x: 50, y: -50 }}
                        animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                        transition={{ delay: 1 + (i*0.2), duration: 0.8, type: "spring" }}
                        className="absolute inset-0 bg-blue-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_#3b82f6] z-10"
                     >
                        <span className="text-[8px] font-bold text-white">F-</span>
                     </motion.div>
                  )}
               </div>
             );
          })}
       </div>

       <div className="absolute top-8 anim-info-box border-slate-500 text-slate-300">
          <Microscope size={12}/> Hydroxyapatite Structure
       </div>
       
       <motion.div 
         initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3 }}
         className="absolute bottom-8 anim-info-box border-blue-500 text-blue-300"
       >
          <ShieldCheck size={12}/> Fluorapatite Armor Formed
       </motion.div>
    </div>
  );
};

// --- G. HYGIENE: BIOFILM DEFENSE ---
const BiofilmStory = () => {
  return (
    <div className="relative w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden">
       {/* Tooth Surface Floor */}
       <div className="absolute bottom-0 w-full h-1/3 bg-slate-100 rounded-t-[50%] opacity-10"></div>

       {/* Bacteria Colony */}
       <div className="relative z-10 mb-12">
          {[...Array(12)].map((_, i) => (
             <motion.div
                key={i}
                className="absolute w-4 h-4 bg-green-600/80 rounded-full border border-green-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1, x: Math.sin(i)*40, y: Math.cos(i)*20 }}
                transition={{ duration: 2, delay: i*0.1 }}
             />
          ))}
          
          {/* THE SLIME LAYER (Matrix) */}
          <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1.2 }}
             transition={{ delay: 2, duration: 2 }}
             className="w-32 h-20 bg-green-500/20 backdrop-blur-sm border-2 border-green-500/50 rounded-full absolute -top-4 -left-12 z-20 flex items-center justify-center"
          >
             <span className="text-[8px] font-black uppercase text-green-300 tracking-widest opacity-80">Protective Matrix</span>
          </motion.div>
       </div>

       {/* Water Splashing (Rinsing) FAILING */}
       <motion.div
          animate={{ y: [0, 50], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute top-20 text-blue-400 flex flex-col items-center gap-1"
       >
          <Droplets size={24} />
          <span className="text-[9px] font-bold">Rinsing...</span>
       </motion.div>

       <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
          className="anim-info-box absolute bottom-12 border-red-500 text-red-300"
       >
          <ShieldAlert size={12}/> Resistant to Flow
       </motion.div>
    </div>
  );
};


// ==========================================
// 3. MAIN COMPONENT LOGIC
// ==========================================

export default function Gallery() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isTimerPlaying, setIsTimerPlaying] = useState(false);
  const [barWidth, setBarWidth] = useState("0%");
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- PLAYLIST DATA: 20 TOPICS (10 PUSH / 10 SHIELD) ---
  // Note: We use the 7 Animations cyclically for the visual component to keep file size managed
  // Audio files mapped to existing 6 files or generic ones.
  
  const playlist = [
    // --- TOPIC 1: IMPLANTS (Push) ---
    {
      type: "audio",
      name: "The Bionic Tooth",
      artist: "Clinical Engineering",
      description: "Why titanium implants are the only permanent solution for bone loss. Watch how bone integrates.",
      component: <ImplantStory />,
      audio: "/audio/implants.mp3",
      category: "Surgery",
      tags: ['Implants', 'Biology', 'Titanium']
    },
    // --- TOPIC 2: VENEERS (Shield) ---
    {
      type: "audio",
      name: "The Instagram Trap",
      artist: "Dr. Deepak",
      description: "Are veneers worth it? See the difference between a fake 'Chiclet' block and true biomimetic layering.",
      component: <VeneerStory />,
      audio: "/audio/ethics.mp3", 
      category: "Ethics",
      tags: ['Veneers', 'Truth', 'Cosmetic']
    },
    // --- TOPIC 3: SYSTEMIC HEALTH (Push) ---
    {
      type: "audio",
      name: "The Heart-Mouth Loop",
      artist: "Systemic Health",
      description: "The proven link between bleeding gums and heart disease. Bacteria travels from mouth to valves.",
      component: <HeartMouthStory />,
      audio: "/audio/safety.mp3",
      category: "Health",
      tags: ['Wellness', 'Risk', 'Heart']
    },
    // --- TOPIC 4: ALIGNERS (Push) ---
    {
      type: "audio",
      name: "Invisible Physics",
      artist: "Aligner Tech",
      description: "The surprising engineering behind clear plastic. Constant low force allows faster movement than metal.",
      component: <AlignerStory />,
      audio: "/audio/ortho.mp3",
      category: "Ortho",
      tags: ['Physics', 'Aligners', 'Speed']
    },
    // --- TOPIC 5: AI DIAGNOSTICS (Push) ---
    {
      type: "audio",
      name: "The 3-Year Warning",
      artist: "Tech Analysis",
      description: "How AI scanners detect sub-surface decay 3 years before it becomes visible to the naked eye.",
      component: <AIStory />,
      audio: "/audio/ai.mp3", 
      category: "Technology",
      tags: ['AI', 'Laser', 'Prevention']
    },
    // --- TOPIC 6: FLUORIDE (Shield) ---
    {
      type: "audio",
      name: "Fluoride Chemistry",
      artist: "Prevention Science",
      description: "How Fluoride ions physically replace lost minerals in the enamel lattice after acid attacks.",
      component: <FluorideStory />,
      audio: "/audio/kids.mp3", 
      category: "Chemistry",
      tags: ['Safety', 'Science', 'Kids']
    },
    // --- TOPIC 7: BIOFILM (Push) ---
    {
      type: "journal",
      name: "Biofilm: The Silent Killer",
      artist: "Hygiene Protocol",
      description: "Why brushing isn't enough. Biofilm forms a protective matrix that resists standard rinsing.",
      component: <BiofilmStory />,
      audio: "/audio/safety.mp3", 
      category: "Hygiene",
      tags: ['Bacteria', 'Risk', 'Clean']
    },
    // --- TOPIC 8: CHEAP IMPLANTS (Shield) ---
    {
      type: "journal",
      name: "The Cost of Cheap Implants",
      artist: "Investigative Report",
      description: "Why ₹20k implants fail. Understanding Grade 5 Titanium vs. impure alloys that cause bone rejection.",
      component: <ImplantStory />, // Reusing Visual
      audio: "/audio/implants.mp3", 
      category: "Warning",
      tags: ['Cost', 'Safety', 'Scam']
    },
    // --- TOPIC 9: ROOT CANAL MYTHS (Shield) ---
    {
      type: "journal",
      name: "Myth: 'Root Canals Hurt'",
      artist: "Dr. Roger",
      description: "Busting the biggest myth in dentistry. How modern microscopes made RCTs boringly painless.",
      component: <AIStory />, // Reusing Tech Visual
      audio: "/audio/ethics.mp3", 
      category: "MythBuster",
      tags: ['Pain', 'Truth', 'Endo']
    },
    // --- TOPIC 10: CHARCOAL RISKS (Shield) ---
    {
      type: "journal",
      name: "Charcoal Toothpaste Risks",
      artist: "Trend Watch",
      description: "Why abrasive charcoal scrubs micro-scratches into your teeth, making them stain faster.",
      component: <FluorideStory />, // Reusing Chemistry Visual
      audio: "/audio/safety.mp3", 
      category: "Warning",
      tags: ['Trends', 'Enamel', 'Damage']
    },
    // --- TOPIC 11: DIY ALIGNERS (Shield) ---
    {
      type: "journal",
      name: "DIY Aligners Disaster",
      artist: "Ortho Alert",
      description: "Mail-order aligners lack X-ray diagnostics. We fix bite collapses caused by unsupervised DIY kits.",
      component: <AlignerStory />, // Reusing Ortho Visual
      audio: "/audio/ortho.mp3", 
      category: "Warning",
      tags: ['Danger', 'Bite', 'DIY']
    },
    // --- TOPIC 12: WISDOM TEETH (Push) ---
    {
      type: "journal",
      name: "Wisdom Teeth: Age 25 Rule",
      artist: "Oral Surgery",
      description: "Why removing impacted teeth before 25 results in a 2-day recovery, compared to 2 weeks after 30.",
      component: <ImplantStory />, // Reusing Bone Visual
      audio: "/audio/implants.mp3", 
      category: "Surgery",
      tags: ['Recovery', 'Age', 'Timing']
    },
    // --- TOPIC 13: OIL PULLING (Shield) ---
    {
      type: "journal",
      name: "Oil Pulling vs. Science",
      artist: "Fact Check",
      description: "Coconut oil is great for cooking, but it does not cure cavities. The limits of holistic dentistry.",
      component: <BiofilmStory />, // Reusing Bacteria Visual
      audio: "/audio/ethics.mp3", 
      category: "MythBuster",
      tags: ['Holistic', 'Facts', 'Oil']
    },
    // --- TOPIC 14: BLEEDING GUMS (Push) ---
    {
      type: "journal",
      name: "Bleeding Gums Warning",
      artist: "Perio Health",
      description: "If your hands bled when you washed them, you'd panic. Why do we ignore 'pink in the sink'?",
      component: <HeartMouthStory />, // Reusing Systemic Visual
      audio: "/audio/safety.mp3", 
      category: "Urgent",
      tags: ['Gums', 'Blood', 'Action']
    },
    // --- TOPIC 15: TURKEY TEETH (Shield) ---
    {
      type: "journal",
      name: "The 'Turkey Teeth' Warning",
      artist: "Travel Alert",
      description: "Aggressive crown preparations destroy enamel. Once it's gone, it never grows back.",
      component: <VeneerStory />, // Reusing Veneer Visual
      audio: "/audio/ethics.mp3", 
      category: "Warning",
      tags: ['Crowns', 'Damage', 'Travel']
    },
    // --- TOPIC 16: SEDATION (Push) ---
    {
      type: "journal",
      name: "Sedation: Sleep Through It",
      artist: "Anxiety Relief",
      description: "How Conscious Sedation works for patients with extreme dental anxiety. Wake up with a new smile.",
      component: <AIStory />, // Reusing Abstract
      audio: "/audio/implants.mp3", 
      category: "Comfort",
      tags: ['Sleep', 'Fear', 'Relax']
    },
    // --- TOPIC 17: BEAUTY UNIQUENESS (Shield) ---
    {
      type: "journal",
      name: "Beauty is Unique",
      artist: "Aesthetic Philosophy",
      description: "Perfect symmetry looks fake. We design 'Perfectly Imperfect' smiles that match your face.",
      component: <VeneerStory />, 
      audio: "/audio/ethics.mp3", 
      category: "Philosophy",
      tags: ['Art', 'Nature', 'Smile']
    },
    // --- TOPIC 18: ZIRCONIA (Push) ---
    {
      type: "journal",
      name: "The Zirconia Advantage",
      artist: "Material Science",
      description: "Why we stopped using metal-fused porcelain. The superior strength and aesthetics of monoliths.",
      component: <FluorideStory />, // Reusing Structure Visual
      audio: "/audio/implants.mp3", 
      category: "Restorative",
      tags: ['Strong', 'Metal-Free']
    },
    // --- TOPIC 19: SPARKLING WATER (Shield) ---
    {
      type: "journal",
      name: "The Sparkling Water Trap",
      artist: "Diet Advice",
      description: "Carbonated water is acidic. How to enjoy fizzy drinks without eroding your enamel.",
      component: <FluorideStory />, // Reusing Acid Visual
      audio: "/audio/kids.mp3", 
      category: "Diet",
      tags: ['Acid', 'Drink', 'Erosion']
    },
    // --- TOPIC 20: PEDIATRIC AIRWAY (Push) ---
    {
      type: "journal",
      name: "Pediatric Airway Ortho",
      artist: "Kids Health",
      description: "Expanding the jaw early to prevent sleep apnea, snoring, and ADHD-like symptoms in children.",
      component: <AlignerStory />, // Reusing Movement Visual
      audio: "/audio/kids.mp3", 
      category: "Kids",
      tags: ['Breathing', 'Growth', 'Sleep']
    }
  ];

  const currentTrack = playlist[currentTrackIndex];

  // --- AUDIO PLAYER ENGINE ---
  useEffect(() => {
    // Init Audio
    if (!audioRef.current) {
      audioRef.current = new Audio(playlist[0].audio);
      audioRef.current.volume = 0.25; 
    }
    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration) {
        setBarWidth(`${(audio.currentTime / audio.duration) * 100}%`);
      }
    };

    const handleEnded = () => {
        handleNext(); // Auto-advance to next visual/audio
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Handle Track Swapping
  useEffect(() => {
    if (audioRef.current) {
      // 1. Pause & Switch Source
      audioRef.current.pause();
      audioRef.current.src = playlist[currentTrackIndex].audio;
      audioRef.current.load();
      
      // 2. Play if active
      if (isTimerPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay blocked (user interaction needed):", error);
                setIsTimerPlaying(false); 
            });
        }
      } else {
          setBarWidth("0%"); // Reset visual bar if paused
      }
    }
  }, [currentTrackIndex]);

  // Controls
  const togglePlay = () => {
    if(!audioRef.current) return;
    if(isTimerPlaying) { 
        audioRef.current.pause(); 
        setIsTimerPlaying(false); 
    } else { 
        audioRef.current.play(); 
        setIsTimerPlaying(true); 
    }
  };

  const handleNext = () => {
    setIsTimerPlaying(true); // Force play state
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    setIsTimerPlaying(true); 
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  // Seeker Click
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * audioRef.current.duration;
  };

  return (
    <section id="gallery" className="py-24 relative transition-colors duration-500 overflow-hidden bg-slate-50 dark:bg-[#0B1019]">
      <style jsx global>{wideCardStyles}</style>

      {/* SECTION HEADER */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <RevealOnScroll>
          <div className="flex flex-col items-center text-center">
             <div className="inline-flex items-center gap-2 text-blue-600 dark:text-cyan-400 font-bold tracking-[0.3em] text-[10px] uppercase mb-4 border border-blue-200 dark:border-blue-900 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/10">
                <Sparkles size={14} /> Clinical Intelligence
             </div>
             <h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-[0.85]">
                Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Console.</span>
             </h2>
             <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl font-medium leading-relaxed">
               Interactive simulations of surgical precision, biological ethics, and advanced diagnostics.
             </p>
          </div>
        </RevealOnScroll>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- UNIFIED WIDE PLAYER CARD --- */}
        <RevealOnScroll className="mb-24">
           <div className="unified-player-card group hover:shadow-2xl transition-shadow duration-500">
              
              {/* LEFT: VISUAL ENGINE (Custom Animations) */}
              <div className="player-media">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={currentTrackIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                       {currentTrack.component}
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Category Badge */}
                  <div className="absolute bottom-6 left-6 z-30">
                     <span className={`px-4 py-1.5 text-white text-[9px] font-black uppercase tracking-widest rounded-full inline-block shadow-lg backdrop-blur-md border border-white/10 ${
                        ['Warning', 'MythBuster'].includes(currentTrack.category) ? 'bg-red-600/80 border-red-400/30' :
                        ['Ethics', 'Philosophy'].includes(currentTrack.category) ? 'bg-purple-600/80 border-purple-400/30' :
                        'bg-blue-600/80 border-blue-400/30'
                     }`}>
                        {currentTrack.type === 'audio' ? 'Podcast Episode' : 'Visual Guide'}
                     </span>
                  </div>
              </div>

              {/* RIGHT: CONTENT & CONTROLS */}
              <div className="player-content bg-white dark:bg-slate-900/50">
                  <div className="flex flex-col h-full justify-between">
                    
                    {/* Top Meta */}
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                <Bookmark size={14} className={['Warning', 'MythBuster'].includes(currentTrack.category) ? 'text-red-500' : 'text-blue-500'} /> 
                                {currentTrack.category}
                            </div>
                            <div className="text-[10px] font-mono text-slate-300 opacity-50">
                                {String(currentTrackIndex + 1).padStart(2, '0')} / {playlist.length}
                            </div>
                        </div>

                        <h2 className="track-title text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 leading-[0.95]">
                            {currentTrack.name}
                        </h2>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {currentTrack.tags.map(t => (
                                <span key={t} className="text-[9px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 px-2 py-1 rounded-md uppercase tracking-wider">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
                            {currentTrack.description}
                        </p>
                    </div>

                    {/* Bottom Controls */}
                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5">
                        
                        {/* Status Indicator */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Activity size={12} className={isTimerPlaying ? "animate-pulse text-green-500" : "text-slate-600"} /> 
                                {isTimerPlaying ? "System Active" : "Paused"}
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="relative h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden mb-8 cursor-pointer group/bar w-full" onClick={handleSeek}>
                            <div className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-100 ease-linear group-hover/bar:bg-blue-500" style={{ width: barWidth }}></div>
                        </div>
                        
                        {/* Buttons */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <button onClick={handlePrev} className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 dark:hover:text-white transition-all">
                                    <SkipBack size={18} />
                                </button>
                                
                                <button 
                                    onClick={togglePlay} 
                                    className="w-16 h-16 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all"
                                >
                                    {isTimerPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                                </button>
                                
                                <button onClick={handleNext} className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 dark:hover:text-white transition-all">
                                    <SkipForward size={18} />
                                </button>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <button className="text-slate-300 hover:text-red-500 transition-colors hover:scale-110">
                                    <Heart size={20} />
                                </button>
                                <button className="text-slate-300 hover:text-blue-500 transition-colors hover:scale-110">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>
           </div>
        </RevealOnScroll>

        {/* --- FOOTER LINK --- */}
        <div className="text-center mt-16">
           <Link href="/gallery" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors group">
              View Complete Archives <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>

      </div>
    </section>
  );
};
