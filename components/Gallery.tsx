'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Play, Pause, SkipBack, SkipForward, Heart, Share2, 
  Sparkles, Bookmark, Activity, ShieldAlert, ShieldCheck,
  Scan, Database, Wifi, ArrowDown, Zap, AlertTriangle
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
      height: 550px; 
    }
  }
  .dark .unified-player-card {
    background: #1e293b;
    border-color: rgba(255,255,255,0.05);
    box-shadow: 0 30px 60px -10px rgba(0,0,0,0.3);
  }

  .player-media {
    flex: 1.3;
    position: relative;
    background: #0f172a; 
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

  .anim-info-box {
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 8px 14px;
    border-radius: 8px;
    position: absolute;
    color: white;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    gap: 6px;
    box-shadow: 0 10px 20px -5px rgba(0,0,0,0.3);
    z-index: 20;
  }
`;

// ==========================================
// --- 1. IMPLANTS: Bone Loss vs. Preservation ---
// ==========================================
const ImplantStory = () => {
  return (
    <div className="relative w-full h-full bg-slate-900 flex flex-col items-center justify-center p-8">
      <div className="flex w-full justify-around items-end h-64">
        
        {/* SCENARIO A: NO IMPLANT (Bone Loss) */}
        <div className="flex flex-col items-center relative w-1/3">
           <motion.div 
             className="anim-info-box mb-4 !relative !top-0 !left-0 border-red-500 text-red-400"
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
           >
             Without Implant
           </motion.div>
           
           {/* Bone shrinking animation */}
           <div className="w-full bg-slate-800 h-40 rounded-b-3xl relative overflow-hidden border-t-4 border-slate-700">
              <motion.div 
                initial={{ height: '100%' }}
                animate={{ height: '40%' }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 left-0 right-0 bg-pink-900/40 w-full"
              />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-slate-500 font-mono">Bone Resorption</div>
           </div>
        </div>

        {/* SCENARIO B: WITH IMPLANT (Preservation) */}
        <div className="flex flex-col items-center relative w-1/3">
           <motion.div 
             className="anim-info-box mb-4 !relative !top-0 !left-0 border-green-500 text-green-400"
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
           >
             With Titanium
           </motion.div>

           {/* Bone staying strong */}
           <div className="w-full bg-slate-800 h-40 rounded-b-3xl relative overflow-hidden border-t-4 border-slate-700 flex justify-center">
              <div className="absolute inset-0 bg-pink-900/40 h-full"></div> {/* Full Bone Height */}
              
              {/* The Implant Screw */}
              <motion.div
                 initial={{ y: -100 }}
                 animate={{ y: 20 }}
                 transition={{ duration: 2, ease: "easeOut" }}
                 className="w-4 h-24 bg-gradient-to-b from-slate-300 to-slate-500 rounded-b-lg relative z-10"
              >
                 {/* Screw threads */}
                 {[...Array(6)].map((_,i) => (
                    <div key={i} className="w-6 h-1 bg-slate-600 absolute left-[-4px]" style={{ top: i*12 + 10 }}></div>
                 ))}
              </motion.div>

              {/* Integration lines */}
              <motion.div 
                 animate={{ opacity: [0, 1, 0] }} 
                 transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                 className="absolute top-10 w-16 h-16 border-2 border-green-400 rounded-full"
              />
           </div>
        </div>
      </div>
      <p className="text-slate-400 text-xs mt-8 text-center max-w-md">
        Bone requires stimulation to exist. Titanium mimics the tooth root, preventing facial collapse.
      </p>
    </div>
  );
};

// ==========================================
// --- 2. ETHICS: Chiclet vs Biomimetic ---
// ==========================================
const VeneerStory = () => {
  return (
    <div className="relative w-full h-full bg-black flex flex-col items-center justify-center">
      <div className="flex gap-12 items-center">
         
         {/* THE FAKE LOOK */}
         <div className="text-center opacity-50">
            <div className="w-24 h-32 bg-white rounded-md mb-4 shadow-[0_0_20px_rgba(255,255,255,0.8)] border-4 border-white"></div>
            <div className="anim-info-box !static border-red-500 text-red-400 mx-auto">
               <X size={12}/> Opaque "Chiclet"
            </div>
         </div>

         {/* THE BIOMIMETIC LOOK */}
         <div className="text-center relative">
            <div className="relative w-24 h-32 mb-4">
               {/* Dentin Layer (Yellow/Warm) */}
               <motion.div 
                  initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 1 }}
                  className="absolute bottom-0 w-full bg-amber-200/80 rounded-md z-10"
               />
               {/* Enamel Layer (Blue/Translucent) */}
               <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1, duration: 1 }}
                  className="absolute inset-0 bg-gradient-to-b from-blue-100/30 to-transparent rounded-md z-20 border border-white/30 backdrop-blur-[2px]"
               />
               {/* Light Reflection */}
               <motion.div 
                  animate={{ left: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                  className="absolute top-0 bottom-0 w-10 bg-white/40 skew-x-12 z-30 filter blur-md"
               />
            </div>
            <div className="anim-info-box !static border-green-500 text-green-400 mx-auto">
               <CheckCircle size={12}/> Biomimetic Layering
            </div>
         </div>
      </div>
      <div className="absolute bottom-10 flex gap-4 text-[10px] text-slate-500 uppercase font-bold tracking-widest">
         <span>Light Transmission</span> • <span>Natural Gradient</span> • <span>Texture</span>
      </div>
    </div>
  );
};

// ==========================================
// --- 3. HEALTH: The Systemic Highway ---
// ==========================================
const HeartMouthStory = () => {
  return (
    <div className="relative w-full h-full bg-slate-950 flex flex-col items-center justify-center">
       {/* 1. GUM POCKET */}
       <div className="flex items-center w-full max-w-lg justify-between px-8 relative">
          <div className="flex flex-col items-center z-10">
             <div className="w-16 h-16 bg-red-900/40 border-2 border-red-500 rounded-full flex items-center justify-center">
                <div className="text-xs font-black text-red-500">GUMS</div>
             </div>
             {/* Bacteria Spawning */}
             {[...Array(5)].map((_, i) => (
                <motion.div
                   key={i}
                   className="absolute w-2 h-2 bg-green-500 rounded-full"
                   initial={{ x: 0, y: 0, opacity: 0 }}
                   animate={{ x: [0, 50, 100, 150, 200], y: [0, 10, -10, 5, 0], opacity: [1, 1, 1, 1, 0] }}
                   transition={{ duration: 3, repeat: Infinity, delay: i * 0.6, ease: "linear" }}
                   style={{ left: '60px', top: '35px' }}
                />
             ))}
          </div>

          {/* 2. BLOOD VESSEL PIPELINE */}
          <div className="h-2 flex-1 bg-red-900/20 mx-4 rounded-full relative overflow-hidden">
             <div className="absolute inset-0 bg-red-600/10 animate-pulse"></div>
          </div>

          {/* 3. HEART VALVE */}
          <div className="flex flex-col items-center z-10">
             <motion.div 
               animate={{ scale: [1, 1.1, 1] }} 
               transition={{ duration: 0.8, repeat: Infinity }}
               className="w-16 h-16 bg-red-600 border-2 border-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)]"
             >
                <Heart fill="white" size={24} className="text-white"/>
             </motion.div>
             <div className="anim-info-box !static mt-4 border-red-500 text-white">
               <Activity size={12}/> Heart Valve Risk
             </div>
          </div>
       </div>
       <p className="text-slate-400 text-xs mt-8 text-center max-w-xs px-4">
          Bacteria from periodontal pockets enter the bloodstream directly, lodging in heart valves.
       </p>
    </div>
  );
};

// ==========================================
// --- 4. ALIGNERS: Physics Force Vectors ---
// ==========================================
const AlignerStory = () => {
  return (
    <div className="relative w-full h-full bg-slate-900 flex items-center justify-center">
       {/* The Tooth */}
       <div className="relative w-24 h-32 bg-slate-200 rounded-lg border-2 border-slate-400 flex items-center justify-center">
          <span className="text-slate-400 font-black text-4xl opacity-20">T</span>
          
          {/* Aligner Overlay (Invisible) */}
          <motion.div 
             animate={{ opacity: [0.3, 0.6, 0.3] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute inset-[-4px] border-2 border-blue-400 rounded-xl bg-blue-400/10"
          />
       </div>

       {/* Force Vector Arrow */}
       <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: -60, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute left-20 flex items-center"
       >
          <div className="text-blue-500 font-bold text-xs mr-2 uppercase">Constant Force</div>
          <ArrowRight size={40} className="text-blue-500" strokeWidth={3} />
       </motion.div>

       {/* Movement Ghost */}
       <motion.div
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 40, opacity: 0.5 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-24 h-32 bg-slate-200/20 rounded-lg border-2 border-white/20 border-dashed"
       />
       
       <div className="absolute bottom-10 anim-info-box border-blue-500 text-blue-300">
          <Zap size={12}/> 0.25mm Movement / Tray
       </div>
    </div>
  );
};

// ==========================================
// --- 5. AI DIAGNOSTICS: The Hidden Decay ---
// ==========================================
const AIStory = () => {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
       {/* Tooth Wireframe */}
       <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-50">
          <path d="M50 150 L50 50 Q100 0 150 50 L150 150" stroke="white" strokeWidth="2" fill="none" />
       </svg>

       {/* The "Hidden" Cavity */}
       <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute top-[80px] left-[90px] w-6 h-6 bg-red-600 rounded-full blur-sm z-10"
       />

       {/* Laser Scanning Beam */}
       <motion.div
          animate={{ top: ['10%', '90%', '10%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-1 bg-green-500 shadow-[0_0_20px_#22c55e] z-20 w-1/2 mx-auto"
       />

       {/* Detection Alert */}
       <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.2 }}
          className="absolute top-[40px] right-[40px] bg-red-900/90 border border-red-500 text-white p-2 rounded-lg text-xs font-bold shadow-xl flex items-center gap-2"
       >
          <ShieldAlert size={14} className="animate-pulse"/> 
          <div>
             <div>DECAY DETECTED</div>
             <div className="text-[9px] font-normal opacity-80">Sub-surface: 2mm deep</div>
          </div>
       </motion.div>
    </div>
  );
};

// ==========================================
// --- 6. FLUORIDE: The Lattice Repair ---
// ==========================================
const FluorideStory = () => {
  return (
    <div className="relative w-full h-full bg-slate-900 flex items-center justify-center">
       {/* Enamel Grid (Damaged) */}
       <div className="grid grid-cols-4 gap-2 opacity-50">
          {[...Array(16)].map((_, i) => (
             <div key={i} className={`w-8 h-8 border border-white/30 rounded-sm ${[5,6,9,10].includes(i) ? 'bg-transparent' : 'bg-white/10'}`}></div>
          ))}
       </div>

       {/* Acid Attack */}
       <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute text-red-500 font-bold text-xs top-10"
       >
          ACID ATTACK
       </motion.div>

       {/* Fluoride Ions Repairing */}
       {[5,6,9,10].map((pos, i) => (
          <motion.div
             key={i}
             className="absolute w-8 h-8 bg-blue-500/80 rounded-sm flex items-center justify-center text-[8px] font-bold text-white shadow-[0_0_10px_#3b82f6]"
             initial={{ scale: 2, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ delay: 1 + (i*0.2), duration: 0.5 }}
             style={{ 
                left: `calc(50% - 36px + ${(pos % 4) * 40}px - 40px)`, 
                top: `calc(50% - 36px + ${Math.floor(pos / 4) * 40}px - 40px)` 
             }}
          >
             F-
          </motion.div>
       ))}
       
       <div className="absolute bottom-10 anim-info-box border-blue-500 text-blue-300">
          <ShieldCheck size={12}/> Remineralization Active
       </div>
    </div>
  );
};

// ==========================================
// --- 7. BIOFILM: The Sticky Web ---
// ==========================================
const BiofilmStory = () => {
  return (
    <div className="relative w-full h-full bg-slate-950 flex items-center justify-center">
       {/* Tooth Surface */}
       <div className="w-64 h-2 bg-white/20 absolute bottom-20 rounded-full"></div>
       <div className="text-xs text-slate-500 absolute bottom-14">Tooth Surface</div>

       {/* Bacteria Multiplying */}
       {[...Array(15)].map((_, i) => (
          <motion.div
             key={i}
             className="absolute w-3 h-3 bg-green-500/60 rounded-full"
             initial={{ y: -200, x: (Math.random() - 0.5) * 200, opacity: 0 }}
             animate={{ y: 20, opacity: 1 }}
             transition={{ duration: 2, delay: i * 0.1 }}
             style={{ bottom: `${25 + Math.random() * 20}%`, left: `${40 + (Math.random() - 0.5) * 40}%` }}
          />
       ))}

       {/* The Protective Slime Layer Forming */}
       <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 200, opacity: 1 }}
          transition={{ delay: 2, duration: 2 }}
          className="absolute bottom-20 h-16 bg-green-900/30 border-t-2 border-green-500/50 rounded-t-xl backdrop-blur-sm z-10"
       />
       
       <motion.div 
         initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }}
         className="anim-info-box absolute top-1/3 border-red-500 text-red-300"
       >
          <ShieldAlert size={12}/> Matrix Protected (Resistant to Rinsing)
       </motion.div>
    </div>
  );
};

import { CheckCircle } from 'lucide-react'; // Helper import

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
    // 1. PUSH: IMPLANTS
    {
      type: "audio",
      name: "The Bionic Tooth",
      artist: "Clinical Engineering",
      description: "Why titanium implants are the only permanent solution for bone loss. Watch how bone integrates.",
      component: <ImplantStory />,
      audio: "/audio/implants.mp3",
      category: "Surgery",
      tags: ['Implants', 'Biology']
    },
    // 2. SHIELD: ETHICS
    {
      type: "audio",
      name: "The Instagram Trap",
      artist: "Dr. Deepak",
      description: "Are veneers worth it? See the difference between a fake 'Chiclet' block and true biomimetic layering.",
      component: <VeneerStory />,
      audio: "/audio/ethics.mp3", 
      category: "Ethics",
      tags: ['Veneers', 'Truth']
    },
    // 3. PUSH: HEALTH
    {
      type: "audio",
      name: "The Heart-Mouth Loop",
      artist: "Systemic Health",
      description: "The proven link between bleeding gums and heart disease. Bacteria travels from mouth to valves.",
      component: <HeartMouthStory />,
      audio: "/audio/safety.mp3",
      category: "Health",
      tags: ['Wellness', 'Risk']
    },
    // 4. PUSH: ALIGNERS
    {
      type: "journal",
      name: "Invisible Physics",
      artist: "Aligner Tech",
      description: "The surprising engineering behind clear plastic. Constant low force allows faster movement than metal.",
      component: <AlignerStory />,
      audio: "/audio/ortho.mp3",
      category: "Ortho",
      tags: ['Physics', 'Aligners']
    },
    // 5. PUSH: AI TECH
    {
      type: "journal",
      name: "The 3-Year Warning",
      artist: "Tech Analysis",
      description: "How AI scanners detect sub-surface decay 3 years before it becomes visible to the naked eye.",
      component: <AIStory />,
      audio: "/audio/ai.mp3", 
      category: "Technology",
      tags: ['AI', 'Laser']
    },
    // 6. SHIELD: FLUORIDE
    {
      type: "journal",
      name: "Fluoride Chemistry",
      artist: "Prevention Science",
      description: "How Fluoride ions physically replace lost minerals in the enamel lattice after acid attacks.",
      component: <FluorideStory />,
      audio: "/audio/kids.mp3", 
      category: "Chemistry",
      tags: ['Safety', 'Science']
    },
    // 7. PUSH: BIOFILM
    {
      type: "journal",
      name: "Biofilm: The Silent Killer",
      artist: "Hygiene Protocol",
      description: "Why brushing isn't enough. Biofilm forms a protective matrix that resists standard rinsing.",
      component: <BiofilmStory />,
      audio: "/audio/safety.mp3", // Reusing safety audio
      category: "Hygiene",
      tags: ['Bacteria', 'Risk']
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
                <Sparkles size={16} /> Visual Intelligence
             </div>
             <h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-[0.85]">
                Clinical <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Motion Graphics.</span>
             </h2>
             <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl font-medium leading-relaxed">
               Don't just read. Watch exactly how the science works inside your body.
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
                              <Activity size={14} className={isTimerPlaying ? "animate-pulse" : ""} /> Audio Explanation
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
