'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Play, Pause, SkipBack, SkipForward, Heart, Share2, 
  Sparkles, Activity, Volume2, VolumeX, ListMusic, Dna, Scan, Heart as HeartIcon // Renamed to avoid conflict
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
    background: #0f172a; 
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
    position: relative;
  }
  
  /* Playlist Overlay Styles */
  .playlist-overlay {
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.98);
    z-index: 50;
    padding: 2rem;
    overflow-y: auto;
  }
  .dark .playlist-overlay {
    background: rgba(30, 41, 59, 0.98);
  }
`;

// --- ANIMATION COMPONENTS (Kept the same) ---
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
      <HeartIcon size={80} className="text-red-500 mx-auto mb-4 fill-red-500/20" />
      <h3 className="text-3xl font-black text-white tracking-tighter">SYSTEMIC LOOP</h3>
    </div>
  </div>
);

const TechAnim = () => (
  <div className="relative w-full h-full flex items-center justify-center bg-slate-900">
    <motion.div 
      animate={{ top: ['0%', '100%', '0%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="absolute left-0 right-0 h-1 bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)] z-20 opacity-50"
    />
    <div className="text-center z-10">
      <Scan size={80} className="text-green-500 mx-auto mb-4" />
      <h3 className="text-3xl font-black text-green-400 tracking-tighter font-mono">AI DIAGNOSTICS</h3>
    </div>
  </div>
);

const OrthoAnim = () => (
  <div className="relative w-full h-full flex items-center justify-center">
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
  const [duration, setDuration] = useState("0:00");
  const [currentTime, setCurrentTime] = useState("0:00");
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  // --- PLAYLIST ---
  const playlist = [
    {
      type: "audio",
      name: "The Bionic Tooth",
      artist: "Clinical Engineering",
      description: "Why titanium implants are the only permanent solution for bone loss.",
      component: <ImplantsAnim />, 
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

  // --- HELPERS ---
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // --- AUDIO LOGIC ---
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(playlist[0].audio);
      audioRef.current.volume = 0.5; 
    }
    const audio = audioRef.current;
    
    const updateProgress = () => { 
      if (audio.duration) {
        setBarWidth(`${(audio.currentTime / audio.duration) * 100}%`);
        setCurrentTime(formatTime(audio.currentTime));
        setDuration(formatTime(audio.duration));
      }
    };

    const handleEnded = () => handleNext();
    
    // Add event listeners
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);
    audio.addEventListener('ended', handleEnded);
    
    return () => { 
      audio.removeEventListener('timeupdate', updateProgress); 
      audio.removeEventListener('loadedmetadata', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = playlist[currentTrackIndex].audio;
      audioRef.current.load();
      if (isTimerPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      } else {
        setBarWidth("0%");
        setCurrentTime("0:00");
      }
    }
  }, [currentTrackIndex]);

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

  const toggleMute = () => {
    if(!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }

  const handleNext = () => {
    setIsTimerPlaying(true); 
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    setIsTimerPlaying(true); 
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pos * audioRef.current.duration;
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsTimerPlaying(true);
    setShowPlaylist(false);
  }

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
                 
                 <div className="absolute bottom-10 left-10 z-20">
                    <span className={`px-4 py-1.5 text-white text-[9px] font-black uppercase tracking-widest rounded-full mb-4 inline-block shadow-lg ${currentTrack.type === 'audio' ? 'bg-blue-600' : 'bg-green-600'}`}>
                       {currentTrack.type === 'audio' ? 'Podcast' : 'Visual Guide'}
                    </span>
                 </div>
             </div>

             {/* Right: Content & Controls */}
             <div className="player-content">
                 
                 {/* Playlist Overlay */}
                 <AnimatePresence>
                   {showPlaylist && (
                     <motion.div 
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: 20 }}
                       className="playlist-overlay rounded-3xl"
                     >
                       <div className="flex justify-between items-center mb-6">
                         <h3 className="font-bold text-lg text-slate-900 dark:text-white">All Episodes</h3>
                         <button onClick={() => setShowPlaylist(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><VolumeX size={16}/></button>
                       </div>
                       <div className="space-y-3">
                         {playlist.map((track, idx) => (
                           <div 
                             key={idx} 
                             onClick={() => selectTrack(idx)}
                             className={`p-3 rounded-xl cursor-pointer transition-colors flex items-center gap-4 ${idx === currentTrackIndex ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                           >
                              <div className="text-xs font-bold text-slate-400">0{idx + 1}</div>
                              <div className="flex-1">
                                <div className={`font-bold text-sm ${idx === currentTrackIndex ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>{track.name}</div>
                                <div className="text-[10px] text-slate-500">{track.category}</div>
                              </div>
                              {idx === currentTrackIndex && <Activity size={14} className="text-blue-500 animate-pulse"/>}
                           </div>
                         ))}
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>

                 {/* Main Details */}
                 <div>
                   <div className="flex justify-between items-start">
                     <h2 className="track-title text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">{currentTrack.name}</h2>
                     <button onClick={() => setShowPlaylist(!showPlaylist)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-blue-600 transition-colors" title="View Playlist">
                        <ListMusic size={20} />
                     </button>
                   </div>

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
                   <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3">{currentTrack.description}</p>
                 </div>

                 {/* Player Controls */}
                 <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/5">
                     
                     {/* Seekable Progress Bar */}
                     <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2 font-mono">
                        <span>{currentTime}</span>
                        <span>{duration}</span>
                     </div>
                     <div 
                        ref={progressRef}
                        onClick={handleSeek}
                        className="relative h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden mb-8 cursor-pointer group/bar"
                     >
                         <div className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-100 ease-linear group-hover/bar:bg-blue-500" style={{ width: barWidth }}></div>
                     </div>
                     
                     {/* Buttons */}
                     <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <button onClick={toggleMute} className="text-slate-300 hover:text-slate-500 transition-colors p-2">
                              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                            </button>
                         </div>

                         <div className="flex items-center gap-6 md:gap-8">
                            <button onClick={handlePrev} className="text-slate-400 hover:text-blue-600 transition-colors transform hover:-translate-x-1"><SkipBack size={24} /></button>
                            <button onClick={togglePlay} className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all">
                               {isTimerPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                            </button>
                            <button onClick={handleNext} className="text-slate-400 hover:text-blue-600 transition-colors transform hover:translate-x-1"><SkipForward size={24} /></button>
                         </div>
                         
                         <div className="flex items-center gap-4">
                            <button className="text-slate-300 hover:text-red-500 transition-colors hover:scale-110"><Heart size={18} /></button>
                            <button className="text-slate-300 hover:text-blue-500 transition-colors hover:scale-110"><Share2 size={18} /></button>
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
