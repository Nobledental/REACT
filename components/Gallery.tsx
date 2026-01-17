'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Play, Pause, SkipBack, SkipForward, Heart, ExternalLink, 
  Sparkles, Search, X, Loader2, Bot, Bookmark, Activity, ShieldAlert, ShieldCheck,
  Link as LinkIcon
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// --- STYLES: The "Mini-Player" Design ---
const playerStyles = `
  .wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-size: cover;
  }

  .player {
    background: #eef3f7;
    width: 410px;
    min-height: 480px;
    box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
    border-radius: 15px;
    padding: 30px;
    position: relative;
  }

  .dark .player {
    background: #1e293b;
    box-shadow: 0px 15px 35px -5px rgba(0, 0, 0, 0.5);
  }

  .player__top {
    display: flex;
    align-items: flex-start;
    position: relative;
    z-index: 4;
  }

  .player-cover {
    width: 300px;
    height: 300px;
    margin-left: -70px;
    flex-shrink: 0;
    position: relative;
    z-index: 2;
    border-radius: 15px;
    z-index: 1;
  }

  .player-cover__item {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
  }
  
  .player-cover__item:before {
    content: "";
    background: inherit;
    width: 100%;
    height: 100%;
    box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
    display: block;
    z-index: 1;
    position: absolute;
    top: 30px;
    transform: scale(0.9);
    filter: blur(10px);
    opacity: 0.9;
    border-radius: 15px;
  }

  .cover-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    z-index: 2;
    border-radius: 15px;
  }

  .player-controls {
    flex: 1;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .player-controls__item {
    display: inline-flex;
    font-size: 30px;
    padding: 5px;
    margin-bottom: 10px;
    color: #acb8cc;
    cursor: pointer;
    width: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.3s ease-in-out;
  }

  .player-controls__item:hover {
    color: #532ab9;
    transform: scale(1.1);
  }
  
  .dark .player-controls__item:hover {
    color: #3b82f6;
  }

  .player-controls__item.-xl {
    margin-bottom: 0;
    font-size: 95px;
    filter: drop-shadow(0 11px 6px rgba(172, 184, 204, 0.45));
    color: #fff;
    width: auto;
    height: auto;
    display: inline-flex;
  }
  
  .dark .player-controls__item.-xl {
    filter: drop-shadow(0 11px 6px rgba(0, 0, 0, 0.45));
    color: #3b82f6;
  }

  .progress {
    width: 100%;
    margin-top: -15px;
    user-select: none;
  }
  
  .progress__top {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .album-info {
    color: #71829e;
    flex: 1;
    padding-right: 60px;
    user-select: none;
  }
  
  .dark .album-info { color: #94a3b8; }

  .album-info__name {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 12px;
    line-height: 1.3em;
    color: #1e293b;
  }
  
  .dark .album-info__name { color: #fff; }
  
  .album-info__track {
    font-weight: 400;
    font-size: 14px;
    opacity: 0.7;
    line-height: 1.3em;
    min-height: 52px;
  }

  .progress__duration {
    color: #71829e;
    font-weight: 700;
    font-size: 20px;
    opacity: 0.5;
  }
  
  .progress__time {
    margin-top: 2px;
    color: #71829e;
    font-weight: 700;
    font-size: 16px;
    opacity: 0.7;
  }

  .progress__bar {
    height: 6px;
    width: 100%;
    cursor: pointer;
    background-color: #d0d8e6;
    display: inline-block;
    border-radius: 10px;
    position: relative;
    margin-top: 10px;
  }
  .dark .progress__bar { background-color: #334155; }
  
  .progress__current {
    height: inherit;
    width: 0%;
    background-color: #a3b3ce;
    border-radius: 10px;
    transition: width 0.1s linear;
  }
  .dark .progress__current { background-color: #3b82f6; }
`;

export default function Gallery() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [barWidth, setBarWidth] = useState("0%");
  const [duration, setDuration] = useState("00:00");
  const [currTime, setCurrTime] = useState("00:00");
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- TOPICS (MERGED PLAYLIST) ---
  const playlist = [
    // PUSH TOPICS
    { title: "The Cost of Cheap Implants", cat: "Surgery", artist: "Investigative Report", video: "/video/implants-cover.mp4", audio: "/audio/implants.mp3" },
    { title: "Root Canals vs. Extraction", cat: "Endo", artist: "Clinical Truth", video: "/video/endo-cover.mp4", audio: "/audio/endo.mp3" },
    { title: "The 3-Year Warning", cat: "Tech", artist: "AI Diagnostics", video: "/video/ai-cover.mp4", audio: "/audio/ai.mp3" },
    { title: "Biofilm: The Silent Killer", cat: "Hygiene", artist: "Health Protocol", video: "/video/safety-cover.mp4", audio: "/audio/safety.mp3" },
    { title: "Wisdom Teeth: Age 25 Rule", cat: "Surgery", artist: "Dr. Roger", video: "/video/implants-cover.mp4", audio: "/audio/implants.mp3" },
    { title: "Invisalign Speed Test", cat: "Ortho", artist: "Physics Lab", video: "/video/ortho-cover.mp4", audio: "/audio/ortho.mp3" },
    
    // SHIELD TOPICS
    { title: "The 'Turkey Teeth' Warning", cat: "Warning", artist: "Safety Alert", video: "/video/ethics-cover.mp4", audio: "/audio/ethics.mp3" },
    { title: "Charcoal Toothpaste Risks", cat: "Myth", artist: "Trend Watch", video: "/video/safety-cover.mp4", audio: "/audio/safety.mp3" },
    { title: "Fluorosis vs. Protection", cat: "Fact Check", artist: "Chemistry Dept", video: "/video/kids-cover.mp4", audio: "/audio/kids.mp3" },
    { title: "DIY Aligners Disaster", cat: "Warning", artist: "Ortho Alert", video: "/video/ortho-cover.mp4", audio: "/audio/ortho.mp3" }
  ];

  const currentTrack = playlist[currentTrackIndex];

  // --- AUDIO LOGIC ---
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(playlist[0].audio);
      audioRef.current.volume = 0.2;
    }
    const audio = audioRef.current;

    const formatTime = (s: number) => {
      const min = Math.floor(s / 60);
      const sec = Math.floor(s % 60);
      return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
    };

    const updateProgress = () => {
      if (audio.duration) {
        setBarWidth(`${(audio.currentTime / audio.duration) * 100}%`);
        setCurrTime(formatTime(audio.currentTime));
        setDuration(formatTime(audio.duration));
      }
    };

    const handleEnded = () => handleNext();

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
      if (isPlaying) audioRef.current.play().catch(() => {});
      else setBarWidth("0%");
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play(); setIsPlaying(true); }
  };

  const handleNext = () => {
    setIsPlaying(true);
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    setIsPlaying(true);
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * audioRef.current.duration;
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0B1019] relative transition-colors duration-500 overflow-hidden flex items-center justify-center">
      <style jsx global>{playerStyles}</style>

      {/* --- THE PLAYER --- */}
      <div className="player">
        
        {/* TOP SECTION */}
        <div className="player__top">
           
           {/* COVER VIDEO */}
           <div className="player-cover">
              <AnimatePresence mode="wait">
                 <motion.div 
                   key={currentTrackIndex}
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 1.1 }}
                   transition={{ duration: 0.4 }}
                   className="player-cover__item"
                 >
                    <video 
                       src={currentTrack.video}
                       className="cover-video"
                       autoPlay loop muted playsInline
                    />
                 </motion.div>
              </AnimatePresence>
           </div>

           {/* SIDE CONTROLS */}
           <div className="player-controls">
              <div className="player-controls__item" onClick={() => console.log('Fav')}>
                 <Heart size={20} />
              </div>
              <div className="player-controls__item">
                 <LinkIcon size={20} />
              </div>
              <div className="player-controls__item" onClick={handlePrev}>
                 <SkipBack size={20} />
              </div>
              <div className="player-controls__item" onClick={handleNext}>
                 <SkipForward size={20} />
              </div>
              <div className="player-controls__item -xl" onClick={togglePlay}>
                 {isPlaying ? <Pause size={50} fill="currentColor" /> : <Play size={50} fill="currentColor" className="ml-2" />}
              </div>
           </div>
        </div>

        {/* BOTTOM PROGRESS */}
        <div className="progress">
           <div className="progress__top">
              <div className="album-info">
                 <div className="album-info__name">{currentTrack.title}</div>
                 <div className="album-info__track">{currentTrack.artist}</div>
              </div>
              <div className="progress__duration">{duration}</div>
           </div>
           
           <div className="progress__bar" onClick={handleSeek}>
              <div className="progress__current" style={{ width: barWidth }}></div>
           </div>
           
           <div className="progress__time">{currTime}</div>
        </div>

      </div>

      {/* FOOTER HINT */}
      <div className="absolute bottom-10 w-full text-center">
        <Link href="/gallery" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-600 transition-colors">
            View All {playlist.length} Episodes
        </Link>
      </div>

    </section>
  );
}
