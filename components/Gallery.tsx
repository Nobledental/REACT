'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Play, Pause, SkipBack, SkipForward, Heart, Share2, 
  Sparkles, Bookmark, Activity, ShieldAlert, ShieldCheck
} from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// --- STYLES (Restored "Wide Card" Design) ---
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
    background: #000;
    min-height: 300px;
    overflow: hidden;
  }
  .player-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8;
    transition: transform 0.7s ease;
  }
  .unified-player-card:hover .player-video {
    transform: scale(1.05);
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

export default function Gallery() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isTimerPlaying, setIsTimerPlaying] = useState(false);
  const [barWidth, setBarWidth] = useState("0%");
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- COMBINED PLAYLIST (Podcasts + Visual Journal Entries) ---
  // We treat everything as a "Track" now for the single player view.
  const playlist = [
    // --- PODCASTS ---
    {
      type: "audio",
      name: "The Bionic Tooth",
      artist: "Clinical Engineering",
      description: "Why titanium implants are the only permanent solution for bone loss. The biology of osseointegration.",
      video: "/video/implants-cover.mp4",
      audio: "/audio/implants.mp3",
      category: "Surgery",
      tags: ['Implants', 'Biology', 'Titanium']
    },
    {
      type: "audio",
      name: "The Instagram Trap",
      artist: "Dr. Deepak",
      description: "Are veneers worth it? How to avoid the 'Chiclet' look and why aggressive filing is irreversible.",
      video: "/video/ethics-cover.mp4",
      audio: "/audio/ethics.mp3", 
      category: "Ethics",
      tags: ['Veneers', 'Myths', 'Cosmetic']
    },
    // --- JOURNAL ENTRIES (Converted to "Visual Tracks") ---
    // Since these don't have audio files, we can either:
    // 1. Play a generic background track (e.g. ambient)
    // 2. Just show the visual info (No audio playback)
    // For this implementation, I will assign a generic background audio to them so the player UI remains consistent.
    {
        type: "journal",
        name: "The Cost of Cheap Implants",
        artist: "Investigative Report",
        description: "Why ₹20k implants fail. Understanding Grade 5 Titanium vs. impure alloys that cause bone rejection.",
        video: "/video/implants-cover.mp4", // Reusing video or use a generic one
        audio: "/audio/safety.mp3", // Generic ambient background
        category: "Surgery",
        tags: ['Safety', 'Cost', 'Titanium']
    },
    {
        type: "journal",
        name: "The 3-Year Warning",
        artist: "Tech Analysis",
        description: "How AI scanners detect decay 3 years before it becomes visible to the naked eye.",
        video: "/video/ai-cover.mp4",
        audio: "/audio/ai.mp3", // Generic ambient background
        category: "Technology",
        tags: ['AI', 'Laser', 'Future']
    },
    {
        type: "journal",
        name: "Biofilm: The Silent Killer",
        artist: "Hygiene Protocol",
        description: "How untreated plaque enters your bloodstream and increases risks of stroke and heart valve infection.",
        video: "/video/safety-cover.mp4",
        audio: "/audio/safety.mp3",
        category: "Hygiene",
        tags: ['Heart', 'Health', 'Stroke']
    },
    // ... Add more journal entries here following this structure ...
  ];

  const currentTrack = playlist[currentTrackIndex];

  // --- AUDIO LOGIC ---
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(playlist[0].audio);
      audioRef.current.volume = 0.2; // Low volume
    }

    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration) {
        setBarWidth(`${(audio.currentTime / audio.duration) * 100}%`);
      }
    };

    const handleEnded = () => {
        handleNext();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Track Switching
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = playlist[currentTrackIndex].audio;
      audioRef.current.load();
      if (isTimerPlaying) {
        audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
      } else {
          setBarWidth("0%");
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
               Deep-dives into clinical science and surgical technology.
             </p>
          </div>
        </RevealOnScroll>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- UNIFIED WIDE PLAYER CARD (Single View) --- */}
        <RevealOnScroll className="mb-24">
           <div className="unified-player-card group">
              
              {/* Left: Video */}
              <div className="player-media">
                  <video 
                    key={currentTrack.video} 
                    src={currentTrack.video} 
                    className="player-video" 
                    autoPlay loop muted playsInline 
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                  <div className="absolute bottom-10 left-10 z-20">
                     <span className={`px-4 py-1.5 text-white text-[9px] font-black uppercase tracking-widest rounded-full mb-4 inline-block shadow-lg ${currentTrack.type === 'audio' ? 'bg-blue-600' : 'bg-green-600'}`}>
                        {currentTrack.type === 'audio' ? 'Podcast Episode' : 'Journal Entry'}
                     </span>
                     <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-wider mb-2">
                        <Bookmark size={14} /> {currentTrack.category}
                     </div>
                     <h3 className="text-3xl md:text-4xl font-black text-white leading-none tracking-tight drop-shadow-lg">{currentTrack.artist}</h3>
                  </div>
              </div>

              {/* Right: Content & Controls */}
              <div className="player-content">
                  <div>
                    <h2 className="track-title text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">{currentTrack.name}</h2>
                    <div className="flex items-center gap-4 mb-6">
                       {currentTrack.type === 'audio' && (
                           <span className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                              <Activity size={14} className={isTimerPlaying ? "animate-pulse" : ""} /> Now Playing
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
                      {/* Progress Bar (Only for Audio tracks, or purely visual for journal) */}
                      <div className="relative h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden mb-8 cursor-pointer group/bar">
                          <div className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-100 ease-linear group-hover/bar:bg-blue-500" style={{ width: barWidth }}></div>
                      </div>
                      
                      {/* Controls */}
                      <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6 md:gap-10">
                             <button onClick={handlePrev} className="text-slate-400 hover:text-blue-600 transition-colors transform hover:-translate-x-1" aria-label="Previous">
                                <SkipBack size={28} />
                             </button>
                             
                             <button 
                                onClick={togglePlay} 
                                className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20 hover:scale-110 hover:bg-blue-500 transition-all active:scale-95"
                             >
                                {isTimerPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                             </button>
                             
                             <button onClick={handleNext} className="text-slate-400 hover:text-blue-600 transition-colors transform hover:translate-x-1" aria-label="Next">
                                <SkipForward size={28} />
                             </button>
                          </div>
                          
                          <div className="flex items-center gap-6">
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
