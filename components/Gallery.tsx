'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Play, Pause, SkipBack, SkipForward, Heart, Share2, 
  Sparkles, Bookmark, Activity, ShieldAlert, ShieldCheck, Zap,
  Scan, Fingerprint, Dna, Microscope
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
      height: 500px;
    }
  }
  .dark .unified-player-card {
    background: #1e293b;
    border-color: rgba(255,255,255,0.05);
    box-shadow: 0 30px 60px -10px rgba(0,0,0,0.3);
  }

  .player-media {
    flex: 1.2;
    position: relative;
    background: #0f172a; /* Deep slate background for animations */
    min-height: 300px;
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
`;

// --- CUSTOM ANIMATION COMPONENTS ---

const ImplantsAnim = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute w-[400px] h-[400px] border border-blue-500/20 rounded-full border-dashed"
    />
    <motion.div 
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="relative z-10 text-center"
    >
      <Dna size={80} className="text-blue-500 mx-auto mb-4" />
      <h3 className="text-3xl font-black text-white tracking-tighter">OSSEOINTEGRATION</h3>
      <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.3em] mt-2">Titanium Fusion</p>
    </motion.div>
    {/* Floating Particles */}
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-blue-400 rounded-full"
        animate={{ y: [-100, 100], opacity: [0, 1, 0] }}
        transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
        style={{ left: `${20 + i * 15}%` }}
      />
    ))}
  </div>
);

const EthicsAnim = () => (
  <div className="relative w-full h-full flex items-center justify-center bg-black">
    <motion.div 
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent"
    />
    <div className="text-center z-10">
      <div className="flex justify-center gap-4 mb-6">
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-16 h-24 bg-white/10 rounded-lg border border-white/20" />
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, delay: 0.2, repeat: Infinity }} className="w-16 h-24 bg-white rounded-lg shadow-[0_0_30px_rgba(255,255,255,0.5)]" />
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, delay: 0.4, repeat: Infinity }} className="w-16 h-24 bg-white/10 rounded-lg border border-white/20" />
      </div>
      <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 tracking-tighter">TRUE AESTHETICS</h3>
      <p className="text-purple-300 text-xs font-bold uppercase tracking-[0.3em] mt-2">Biomimetic vs Fake</p>
    </div>
  </div>
);

const HealthAnim = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    <motion.div 
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 0.8, repeat: Infinity }}
      className="absolute w-[300px] h-[300px] bg-red-600/20 rounded-full blur-3xl"
    />
    <div className="z-10 text-center">
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
        <Heart size={80} className="text-red-500 mx-auto mb-4 fill-red-500/20" />
      </motion.div>
      <h3 className="text-3xl font-black text-white tracking-tighter">SYSTEMIC LOOP</h3>
      <div className="flex items-center justify-center gap-2 mt-4 text-red-400 text-xs font-bold uppercase tracking-widest">
        <span>Gums</span> <ArrowRight size={12} /> <span>Heart</span> <ArrowRight size={12} /> <span>Life</span>
      </div>
    </div>
  </div>
);

const TechAnim = () => (
  <div className="relative w-full h-full flex items-center justify-center bg-slate-900">
    {/* Scanning Line */}
    <motion.div 
      animate={{ top: ['0%', '100%', '0%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="absolute left-0 right-0 h-1 bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)] z-20 opacity-50"
    />
    <div className="text-center z-10">
      <Scan size={80} className="text-green-500 mx-auto mb-4" />
      <h3 className="text-3xl font-black text-green-400 tracking-tighter font-mono">AI DIAGNOSTICS</h3>
      <p className="text-green-600/80 text-xs font-bold uppercase tracking-[0.3em] mt-2 font-mono">Precision: 99.8%</p>
    </div>
    {/* Grid Background */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
  </div>
);

const OrthoAnim = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="flex gap-1">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ height: [40, 80, 40], backgroundColor: ["#3b82f6", "#60a5fa", "#3b82f6"] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
          className="w-8 rounded-full bg-blue-500 opacity-80"
        />
      ))}
    </div>
    <div className="absolute bottom-20 text-center">
      <h3 className="text-3xl font-black text-white tracking-tighter">INVISIBLE FORCE</h3>
      <p className="text-blue-300 text-xs font-bold uppercase tracking-[0.3em] mt-2">Sequential Movement</p>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

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
      component: <ImplantsAnim />, // Renders the animation directly
      audio: "/audio/implants.mp3",
      category: "Surgery",
      tags: ['Implants', 'Biology']
    },
    {
      type: "audio",
      name: "The Instagram Trap",
      artist: "Dr. Deepak",
      description: "Are veneers worth it? Avoiding the 'Chiclet' look.",
      component: <EthicsAnim />,
      audio: "/audio/ethics.mp3", 
      category: "Ethics",
      tags: ['Veneers', 'Truth']
    },
    {
      type: "audio",
      name: "The Heart-Mouth Loop",
      artist: "Systemic Health",
      description: "The proven link between bleeding gums and heart disease.",
      component: <HealthAnim />,
      audio: "/audio/safety.mp3",
      category: "Health",
      tags: ['Wellness', 'Risk']
    },
    {
      type: "journal",
      name: "The 3-Year Warning",
      artist: "Tech Analysis",
      description: "How AI scanners detect decay 3 years before it becomes visible.",
      component: <TechAnim />,
      audio: "/audio/ai.mp3", 
      category: "Technology",
      tags: ['AI', 'Laser']
    },
    {
      type: "journal",
      name: "Invisible Physics",
      artist: "Aligner Tech",
      description: "The engineering behind clear plastic pushing teeth.",
      component: <OrthoAnim />,
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
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 w-full h-full"
                    >
                       {currentTrack.component}
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Category Badge Overlay */}
                  <div className="absolute bottom-10 left-10 z-20">
                     <span className={`px-4 py-1.5 text-white text-[9px] font-black uppercase tracking-widest rounded-full mb-4 inline-block shadow-lg ${currentTrack.type === 'audio' ? 'bg-blue-600' : 'bg-green-600'}`}>
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
                      {/* Progress Bar (Visual Only) */}
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
