'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Play, Pause, SkipBack, SkipForward, Heart, Share2, 
  Sparkles, Bookmark, Activity, ShieldAlert, ShieldCheck,
  Scan, Database, Wifi, ArrowDown, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// --- STYLES ---
const wideCardStyles = `
  .unified-player-card {
    background: #fff;
    border-radius: 40px;
    box-shadow: 0 30px 60px -10px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(0,0,0,0.05);
    transition: all 0.5s ease;
  }
  @media (min-width: 1024px) {
    .unified-player-card {
      flex-direction: row;
      height: 550px; /* Slightly taller for complex visuals */
    }
  }
  .dark .unified-player-card {
    background: #1e293b;
    border-color: rgba(255,255,255,0.05);
    box-shadow: 0 30px 60px -10px rgba(0,0,0,0.3);
  }

  .player-media {
    flex: 1.3; /* Give visuals more space */
    position: relative;
    background: #0f172a; /* Deep slate background for contrast */
    min-height: 350px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .player-content {
    flex: 1;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .track-title {
    font-family: 'Inter', sans-serif;
    letter-spacing: -0.02em;
  }

  /* Animation Info Overlay Styles */
  .anim-info-box {
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 10px 16px;
    border-radius: 12px;
    position: absolute;
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 10px 20px -5px rgba(0,0,0,0.3);
  }
`;

// ==========================================
// --- ADVANCED NARRATIVE ANIMATIONS ---
// ==========================================

// 1. IMPLANTS: The Osseointegration Process
const AdvancedImplantsAnim = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Bone Structure Background Pattern */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* The Screw turning and descending */}
        <motion.div
          initial={{ y: -150, rotate: 0 }}
          animate={{ y: 0, rotate: 720 }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="relative"
        >
          {/* Simplified Screw SVG */}
           <svg width="80" height="160" viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 160L10 140V20L40 0L70 20V140L40 160Z" fill="url(#paint0_linear_screw)" />
              <path d="M10 30H70M10 50H70M10 70H70M10 90H70M10 110H70M10 130H70" stroke="black" strokeOpacity="0.2" strokeWidth="2"/>
              <defs>
              <linearGradient id="paint0_linear_screw" x1="40" y1="0" x2="40" y2="160" gradientUnits="userSpaceOnUse">
              <stop stopColor="#94A3B8"/>
              <stop offset="1" stopColor="#475569"/>
              </linearGradient>
              </defs>
           </svg>
           {/* Info Label tracking the screw */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="anim-info-box absolute -right-32 top-1/2 -translate-y-1/2"
           >
             <ArrowDown size={14} className="text-blue-400" /> Grade 5 Titanium
           </motion.div>
        </motion.div>

        {/* Bone fusion particles appearing after placement */}
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 3.5, duration: 1 }}
           className="absolute bottom-0 left-0 right-0 h-1/2 bg-blue-900/30 backdrop-blur-sm rounded-t-3xl border-t border-blue-500/30 flex items-end justify-center pb-8"
        >
           <div className="text-center">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="text-blue-400 mb-2"
              >
                 <Activity size={32} className="mx-auto"/>
              </motion.div>
              <h4 className="text-white font-black text-xl tracking-tighter">OSSEOINTEGRATION</h4>
              <p className="text-blue-300 text-xs uppercase tracking-widest">Biological Fusion Complete</p>
           </div>
           {/* Fusion particles */}
           {[...Array(12)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute w-2 h-2 bg-blue-400 rounded-full"
               initial={{ opacity: 0, x: 0, y: 0 }}
               animate={{ 
                 opacity: [0, 1, 0], 
                 x: (Math.random() - 0.5) * 200, 
                 y: (Math.random() - 0.5) * 100 - 50
               }}
               transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
               style={{ bottom: '40%', left: '50%' }}
             />
           ))}
        </motion.div>
      </div>
    </div>
  );
};

// 2. ETHICS: Biomimetic Layers vs. Monolithic Block
const AdvancedEthicsAnim = () => {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center gap-8">
      {/* The "FAKE" side */}
      <div className="text-center opacity-40">
         <div className="w-24 h-32 bg-white rounded-lg mb-4 mx-auto shadow-xl"></div>
         <h4 className="text-slate-400 font-bold text-xs uppercase tracking-widest line-through">Monolithic "Chiclet"</h4>
      </div>

      {/* The "TRUE" side - Building up layers */}
      <div className="text-center relative z-10">
         <div className="relative w-32 h-40 mx-auto mb-4">
            {/* Dentin Layer (Inner) */}
            <motion.div 
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: '100%', opacity: 1 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className="absolute bottom-0 left-0 right-0 bg-amber-200/80 rounded-lg border border-amber-300/50 shadow-[inset_0_0_20px_rgba(251,191,36,0.5)] z-10"
            />
            {/* Enamel Layer (Outer Transparent) */}
            <motion.div 
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: '100%', opacity: 0.6 }}
               transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
               className="absolute bottom-0 left-0 right-0 bg-gradient-to-tr from-white/40 to-blue-100/30 backdrop-blur-md rounded-lg border border-white/40 z-20"
            >
               {/* Light reflection */}
               <motion.div 
                  animate={{ left: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 3 }}
                  className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12"
               />
            </motion.div>
            
            {/* Info tags popping up */}
            <motion.div
               initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
               className="anim-info-box absolute -left-36 top-1/3"
            >
              Dentin Core (Color)
            </motion.div>
            <motion.div
               initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.5 }}
               className="anim-info-box absolute -right-36 top-2/3"
            >
              Enamel (Translucency)
            </motion.div>
         </div>
         <h4 className="text-white font-black text-xl uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Biomimetic Layering</h4>
      </div>
    </div>
  );
};

// 3. HEALTH: The Systemic Pathogen Highway
const AdvancedHealthAnim = () => {
  return (
    <div className="relative w-full h-full bg-slate-900 flex items-center justify-around overflow-hidden px-8">
      {/* Background Circuit Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
         <pattern id="pattern-circuits" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 0V40M0 20H40" stroke="#ef4444" strokeWidth="1"/>
         </pattern>
         <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circuits)"/>
      </svg>

      {/* MOUTH -> BLOOD -> HEART Flow */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-lg">
         {/* Mouth Node */}
         <div className="text-center">
            <div className="w-20 h-20 bg-red-900/50 rounded-full border-4 border-red-500 flex items-center justify-center relative">
               <Sparkles className="text-red-400" size={32} />
               <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-red-500/30 rounded-full blur-xl -z-10"></motion.div>
            </div>
            <p className="text-red-400 text-xs font-black uppercase mt-4 tracking-widest">Inflamed Gums</p>
         </div>

         {/* Connecting Vessel */}
         <div className="flex-1 h-4 bg-red-900/30 mx-4 rounded-full relative overflow-hidden border border-red-500/30">
            {/* Pathogens moving */}
            {[...Array(8)].map((_, i) => (
               <motion.div
                  key={i}
                  className="absolute top-1 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]"
                  initial={{ left: '-5%' }}
                  animate={{ left: '105%' }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "linear" }}
               />
            ))}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-black uppercase text-red-300 tracking-[0.2em]">Bloodstream Pathogens</div>
         </div>

         {/* Heart Node */}
         <div className="text-center">
            <motion.div 
               animate={{ scale: [1, 1.1, 1] }} 
               transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
               className="w-20 h-20 bg-red-600 rounded-full border-4 border-white/20 flex items-center justify-center relative shadow-[0_0_50px_#dc2626]"
            >
               <Heart className="text-white fill-white" size={32} />
            </motion.div>
             <p className="text-white text-xs font-black uppercase mt-4 tracking-widest">Systemic Risk</p>
         </div>
      </div>
       
       {/* Warning Alert */}
       <motion.div
          initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 2 }}
          className="anim-info-box absolute bottom-8 bg-red-600/80 border-red-400"
       >
         <ShieldAlert size={16} /> Warning: Bacterial Load High
       </motion.div>
    </div>
  );
};

// 4. TECH: AI Laser Scanning & Data Analysis
const AdvancedTechAnim = () => {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
      {/* Wireframe Tooth Model */}
      <svg width="200" height="260" viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50">
         <path d="M100 250C100 250 160 200 160 100C160 50 130 0 100 0C70 0 40 50 40 100C40 200 100 250 100 250Z" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4"/>
         <path d="M70 80C70 80 100 100 130 80" stroke="#22c55e" strokeWidth="1"/>
         <circle cx="100" cy="140" r="20" stroke="#22c55e" strokeWidth="1" strokeDasharray="2 2" />
      </svg>

      {/* Scanning Laser Beam */}
      <motion.div
         initial={{ top: '0%' }}
         animate={{ top: ['0%', '100%', '0%'] }}
         transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
         className="absolute left-1/2 -translate-x-1/2 w-[240px] h-2 bg-green-500 shadow-[0_0_30px_#22c55e] z-20 opacity-80"
      >
         <Scan size={24} className="text-green-900 absolute left-1/2 -translate-x-1/2 -top-10" />
      </motion.div>

      {/* Hidden Decay Revealing */}
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: [0, 1, 0] }}
         transition={{ duration: 4, repeat: Infinity, delay: 2 }}
         className="absolute top-[130px] left-[90px] w-5 h-5 bg-red-500 rounded-full blur-md z-10 shadow-[0_0_30px_#ef4444]"
      />

      {/* Data HUD Elements floating out */}
      <div className="absolute inset-0 pointer-events-none">
         <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="anim-info-box absolute top-20 left-10 border-green-500 text-green-400">
            <Wifi size={14}/> Signal: Strong
         </motion.div>
         <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.5 }} className="anim-info-box absolute top-40 right-10 border-green-500 text-green-400">
            <Database size={14}/> Analyzing Structure...
         </motion.div>
         <motion.div initial={{ y: 50, opacity: 0, scale: 0.5 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ delay: 2.5, type: "spring" }} className="anim-info-box absolute bottom-20 left-1/2 -translate-x-1/2 bg-red-900/80 border-red-500 text-white">
            <ShieldAlert size={14}/> ALERT: Sub-surface Decay Detected (2mm)
         </motion.div>
      </div>
    </div>
  );
};


// ==========================================
// --- MAIN COMPONENT ---
// ==========================================

export default function Gallery() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isTimerPlaying, setIsTimerPlaying] = useState(false);
  const [barWidth, setBarWidth] = useState("0%");
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- PLAYLIST ---
  const playlist = [
    {
      type: "audio",
      name: "The Bionic Tooth",
      artist: "Clinical Engineering",
      description: "Why titanium implants are the only permanent solution for bone loss.",
      component: <AdvancedImplantsAnim />, // Using the new advanced components
      audio: "/audio/implants.mp3",
      category: "Surgery",
      tags: ['Implants', 'Biology']
    },
    {
      type: "audio",
      name: "The Instagram Trap",
      artist: "Dr. Deepak",
      description: "Are veneers worth it? Avoiding the 'Chiclet' look through biomimetic layering.",
      component: <AdvancedEthicsAnim />,
      audio: "/audio/ethics.mp3", 
      category: "Ethics",
      tags: ['Veneers', 'Truth']
    },
    {
      type: "audio",
      name: "The Heart-Mouth Loop",
      artist: "Systemic Health",
      description: "The proven link between bleeding gums and heart disease.",
      component: <AdvancedHealthAnim />,
      audio: "/audio/safety.mp3",
      category: "Health",
      tags: ['Wellness', 'Risk']
    },
    {
      type: "journal",
      name: "The 3-Year Warning",
      artist: "Tech Analysis",
      description: "How AI scanners detect decay 3 years before it becomes visible.",
      component: <AdvancedTechAnim />,
      audio: "/audio/ai.mp3", 
      category: "Technology",
      tags: ['AI', 'Laser']
    },
    // Keep simpler ones for Ortho/Kids if desired, or build advanced ones for them too.
    // For brevity, I'm reusing the Tech one for the last slot just to show the structure.
     {
      type: "journal",
      name: "Invisible Physics",
      artist: "Aligner Tech",
      description: "The engineering behind clear plastic pushing teeth.",
      component: <AdvancedTechAnim />, // Placeholder - you can build an <AdvancedOrthoAnim />
      audio: "/audio/ortho.mp3",
      category: "Ortho",
      tags: ['Physics', 'Aligners']
    }
  ];

  const currentTrack = playlist[currentTrackIndex];

  // --- AUDIO LOGIC ---
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(playlist[0].audio);
      audioRef.current.volume = 0.2; 
    }
    const audio = audioRef.current;
    const updateProgress = () => { if (audio.duration) setBarWidth(`${(audio.currentTime / audio.duration) * 100}%`); };
    const handleEnded = () => handleNext();
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    return () => { audio.removeEventListener('timeupdate', updateProgress); audio.removeEventListener('ended', handleEnded); };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = playlist[currentTrackIndex].audio;
      audioRef.current.load();
      if (isTimerPlaying) audioRef.current.play().catch(() => {});
      else setBarWidth("0%");
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if(!audioRef.current) return;
    if(isTimerPlaying) { audioRef.current.pause(); setIsTimerPlaying(false); }
    else { audioRef.current.play(); setIsTimerPlaying(true); }
  };

  const handleNext = () => {
    setIsTimerPlaying(true); 
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    setIsTimerPlaying(true); 
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  return (
    <section id="gallery" className="py-24 relative transition-colors duration-500 overflow-hidden bg-slate-50 dark:bg-[#0B1019]">
      <style jsx global>{wideCardStyles}</style>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <RevealOnScroll>
          <div className="flex flex-col items-center text-center">
             <div className="inline-flex items-center gap-2 text-blue-600 dark:text-cyan-400 font-bold tracking-[0.3em] text-[10px] uppercase mb-4">
                <Sparkles size={16} /> Dental Intelligence
             </div>
             <h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-[0.85]">
                Podcast & <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Expert Journal.</span>
             </h2>
             <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl font-medium leading-relaxed">
               Interactive visual explanations of clinical science.
             </p>
          </div>
        </RevealOnScroll>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        <RevealOnScroll className="mb-24">
           <div className="unified-player-card group">
              
              {/* Left: LIVE ANIMATION CANVAS */}
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
                  
                  {/* Category Badge Overlay */}
                  <div className="absolute bottom-6 left-6 z-30">
                     <span className={`px-4 py-1.5 text-white text-[9px] font-black uppercase tracking-widest rounded-full inline-block shadow-lg backdrop-blur-md border border-white/10 ${currentTrack.type === 'audio' ? 'bg-blue-600/80' : 'bg-green-600/80'}`}>
                        {currentTrack.type === 'audio' ? 'Podcast' : 'Visual Guide'}
                     </span>
                  </div>
              </div>

              {/* Right: Content & Controls */}
              <div className="player-content">
                  <div>
                    <h2 className="track-title text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">{currentTrack.name}</h2>
                    <div className="flex items-center gap-4 mb-6">
                       {currentTrack.type === 'audio' && (
                           <span className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                              <Activity size={14} className={isTimerPlaying ? "animate-pulse" : ""} /> Audio Active
                           </span>
                       )}
                       <div className="flex gap-2">
                          {currentTrack.tags.map(t => (
                             <span key={t} className="text-[10px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 px-2 py-1 rounded-md uppercase tracking-wider">{t}</span>
                          ))}
                       </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-4 md:line-clamp-none">{currentTrack.description}</p>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5">
                      {/* Progress Bar */}
                      <div className="relative h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden mb-8 cursor-pointer group/bar">
                          <div className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-100 ease-linear group-hover/bar:bg-blue-500" style={{ width: barWidth }}></div>
                      </div>
                      
                      {/* Controls */}
                      <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6 md:gap-10">
                             <button onClick={handlePrev} className="text-slate-400 hover:text-blue-600 transition-colors transform hover:-translate-x-1"><SkipBack size={28} /></button>
                             <button onClick={togglePlay} className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all">
                                {isTimerPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                             </button>
                             <button onClick={handleNext} className="text-slate-400 hover:text-blue-600 transition-colors transform hover:translate-x-1"><SkipForward size={28} /></button>
                          </div>
                          <div className="flex items-center gap-6">
                             <button className="text-slate-300 hover:text-red-500 transition-colors hover:scale-110"><Heart size={20} /></button>
                             <button className="text-slate-300 hover:text-blue-500 transition-colors hover:scale-110"><Share2 size={20} /></button>
                          </div>
                      </div>
                  </div>
              </div>
           </div>
        </RevealOnScroll>

        <div className="text-center mt-12">
           <Link href="/gallery" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors group">
              Open Clinical Archives <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>

      </div>
    </section>
  );
};
