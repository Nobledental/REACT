'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Play, Pause, SkipBack, SkipForward, Heart, ExternalLink, 
  Sparkles, Search, X, Loader2, Bot, Bookmark, Activity, 
  ListMusic, BookOpen, ChevronRight, Headphones
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { filterBlogsWithAi } from '@/services/geminiService';

export default function Gallery() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currTime, setCurrTime] = useState(0);
  
  // UI State: 'playlist' or 'journal'
  const [activeTab, setActiveTab] = useState<'playlist' | 'journal'>('playlist');
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiFilteredIndices, setAiFilteredIndices] = useState<number[] | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- PODCAST DATA ---
  const tracks = [
    {
      title: "The Bionic Tooth",
      artist: "Clinical Engineering",
      description: "Why titanium implants are the only permanent solution for bone loss.",
      video: "/video/implants-cover.mp4",
      audio: "/audio/implants.mp3",
      category: "Surgery"
    },
    {
      title: "The Instagram Trap",
      artist: "Dr. Deepak",
      description: "Are veneers worth it? Avoiding the 'Chiclet' look.",
      video: "/video/ethics-cover.mp4",
      audio: "/audio/ethics.mp3", 
      category: "Ethics"
    },
    {
      title: "The Heart-Mouth Loop",
      artist: "Systemic Health",
      description: "Link between gums, heart disease, and diabetes.",
      video: "/video/safety-cover.mp4",
      audio: "/audio/safety.mp3",
      category: "Health"
    },
    {
      title: "Fluoride Facts",
      artist: "Prevention Team",
      description: "Safety dosage vs. protection for kids.",
      video: "/video/kids-cover.mp4",
      audio: "/audio/kids.mp3",
      category: "Chemistry"
    },
    {
      title: "Invisible Physics",
      artist: "Aligner Tech",
      description: "Biomechanics of pushing vs pulling teeth.",
      video: "/video/ortho-cover.mp4",
      audio: "/audio/ortho.mp3",
      category: "Ortho"
    },
    {
      title: "AI Diagnostics",
      artist: "Future Lab",
      description: "Finding cavities 3 years early with lasers.",
      video: "/video/ai-cover.mp4",
      audio: "/audio/ai.mp3",
      category: "Tech"
    }
  ];

  // --- JOURNAL DATA ---
  const blogPosts = [
    { title: "The Cost of Cheap Implants", cat: "Surgery", readTime: "6 min" },
    { title: "Root Canals vs. Extraction", cat: "Endo", readTime: "5 min" },
    { title: "The 3-Year Warning", cat: "Tech", readTime: "3 min" },
    { title: "Biofilm: Silent Killer", cat: "Hygiene", readTime: "7 min" },
    { title: "Wisdom Teeth: Age 25 Rule", cat: "Surgery", readTime: "4 min" },
    { title: "Laser Gum Depigmentation", cat: "Cosmetic", readTime: "3 min" },
    { title: "Invisalign Speed Test", cat: "Ortho", readTime: "5 min" },
    { title: "Full Mouth Rehab", cat: "Restore", readTime: "8 min" },
    { title: "The Zirconia Advantage", cat: "Restore", readTime: "4 min" },
    { title: "Pediatric Airway Ortho", cat: "Kids", readTime: "6 min" },
    { title: "The 'Turkey Teeth' Warning", cat: "Warning", readTime: "5 min" },
    { title: "Charcoal Toothpaste Risks", cat: "Myth", readTime: "3 min" },
    { title: "Beauty is Unique", cat: "Philosophy", readTime: "4 min" },
    { title: "Stop Brushing So Hard", cat: "Technique", readTime: "3 min" },
    { title: "DIY Aligners Disaster", cat: "Warning", readTime: "5 min" }
  ];

  const currentTrack = tracks[currentTrackIndex];

  // --- AUDIO LOGIC ---
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(tracks[0].audio);
      audioRef.current.volume = 0.2;
    }
    const audio = audioRef.current;
    const updateTime = () => {
      setCurrTime(audio.currentTime);
      setDuration(audio.duration || 0);
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    const handleEnded = () => nextTrack();
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateTime);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = tracks[currentTrackIndex].audio;
      audioRef.current.load();
      if (isPlaying) audioRef.current.play().catch(console.error);
      else { setProgress(0); setCurrTime(0); }
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play(); setIsPlaying(true); }
  };

  const nextTrack = () => {
    setIsPlaying(true);
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setIsPlaying(true);
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * audioRef.current.duration;
  };

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  // --- BLOG LOGIC ---
  const handleAiSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsAiSearching(true);
    setAiFilteredIndices(null);
    try {
      const matchedIndices = await filterBlogsWithAi(searchQuery, blogPosts);
      setAiFilteredIndices(matchedIndices);
    } catch (error) { console.error(error); } 
    finally { setIsAiSearching(false); }
  };

  const filteredBlogs = aiFilteredIndices 
    ? aiFilteredIndices.map(i => blogPosts[i]).filter(Boolean)
    : blogPosts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.cat.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0B1019] relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- HEADER --- */}
        <RevealOnScroll>
          <div className="text-center mb-12">
             <div className="inline-flex items-center gap-2 text-blue-600 dark:text-cyan-400 font-bold tracking-[0.3em] text-[10px] uppercase mb-4">
                <Sparkles size={16} /> Dental Intelligence
             </div>
             <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                Clinical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Console.</span>
             </h2>
          </div>
        </RevealOnScroll>

        {/* --- THE CONSOLE (Unified Player) --- */}
        <RevealOnScroll>
           <div className="relative w-full h-[800px] lg:h-[600px] rounded-[3rem] overflow-hidden bg-black shadow-2xl group flex flex-col lg:flex-row border border-slate-200 dark:border-white/10">
              
              {/* 1. BACKGROUND VIDEO (Global) */}
              <AnimatePresence mode="wait">
                 <motion.div 
                   key={currentTrackIndex}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 1 }}
                   className="absolute inset-0 z-0"
                 >
                    <video 
                      src={tracks[currentTrackIndex].video}
                      className="w-full h-full object-cover opacity-60"
                      autoPlay loop muted playsInline
                    />
                 </motion.div>
              </AnimatePresence>
              
              {/* 2. GRADIENT OVERLAYS */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-0"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-0"></div>

              {/* --- LEFT PANE: PLAYER CONTROLS (60%) --- */}
              <div className="relative z-10 flex-1 p-8 lg:p-16 flex flex-col justify-end">
                  
                  {/* Top Badge */}
                  <div className="absolute top-10 left-10">
                     <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest">
                        <Activity size={12} className={isPlaying ? "animate-pulse text-green-400" : ""} />
                        Now Playing
                     </span>
                  </div>

                  {/* Main Titles */}
                  <div className="mb-8">
                     <span className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-2 block">{currentTrack.category}</span>
                     <h2 className="text-4xl lg:text-6xl font-black text-white leading-[0.9] tracking-tighter mb-4">{currentTrack.title}</h2>
                     <p className="text-slate-300 text-lg font-medium max-w-md leading-relaxed">{currentTrack.description}</p>
                  </div>

                  {/* Progress & Controls */}
                  <div className="w-full max-w-lg">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-3 tracking-widest">
                         <span>{formatTime(currTime)}</span>
                         <span>{formatTime(duration)}</span>
                      </div>
                      
                      <div className="w-full h-1 bg-white/20 rounded-full cursor-pointer overflow-hidden mb-8 group/seek" onClick={handleSeek}>
                         <div className="h-full bg-blue-500 w-0 transition-all duration-100 ease-linear group-hover/seek:bg-blue-400" style={{ width: `${progress}%` }}></div>
                      </div>

                      <div className="flex items-center gap-8">
                         <button onClick={prevTrack} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                            <SkipBack size={20} />
                         </button>
                         <button onClick={togglePlay} className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                            {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                         </button>
                         <button onClick={nextTrack} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                            <SkipForward size={20} />
                         </button>
                      </div>
                  </div>
              </div>

              {/* --- RIGHT PANE: THE SIDEBAR (40%) --- */}
              <div className="relative z-20 w-full lg:w-[450px] bg-black/40 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col">
                  
                  {/* Tabs */}
                  <div className="flex border-b border-white/10">
                     <button 
                        onClick={() => setActiveTab('playlist')}
                        className={`flex-1 py-6 text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'playlist' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}
                     >
                        <ListMusic size={14} /> Playlist
                     </button>
                     <button 
                        onClick={() => setActiveTab('journal')}
                        className={`flex-1 py-6 text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'journal' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}
                     >
                        <BookOpen size={14} /> Journal
                     </button>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                     
                     {/* TAB 1: PLAYLIST */}
                     {activeTab === 'playlist' && (
                        <div className="space-y-2">
                           {tracks.map((track, idx) => (
                              <div 
                                 key={idx} 
                                 onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); }}
                                 className={`p-4 rounded-xl cursor-pointer transition-all flex items-center gap-4 group ${currentTrackIndex === idx ? 'bg-white text-black' : 'hover:bg-white/5 text-slate-400'}`}
                              >
                                 <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${currentTrackIndex === idx ? 'bg-black text-white' : 'bg-white/10'}`}>
                                    {currentTrackIndex === idx && isPlaying ? <Activity size={14} className="animate-pulse" /> : idx + 1}
                                 </div>
                                 <div className="flex-1">
                                    <h4 className={`text-sm font-bold ${currentTrackIndex === idx ? 'text-black' : 'text-slate-200 group-hover:text-white'}`}>{track.title}</h4>
                                    <p className="text-[10px] uppercase tracking-wider opacity-60">{track.category}</p>
                                 </div>
                                 {currentTrackIndex === idx && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
                              </div>
                           ))}
                        </div>
                     )}

                     {/* TAB 2: JOURNAL (With Search) */}
                     {activeTab === 'journal' && (
                        <div className="space-y-4">
                           {/* Mini Search */}
                           <div className="relative mb-6">
                              <input 
                                type="text" 
                                placeholder="AI Search..." 
                                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-10 pr-10 text-xs font-bold text-white placeholder-slate-500 outline-none focus:bg-white/10 transition-all"
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); if(aiFilteredIndices) setAiFilteredIndices(null); }}
                                onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
                              />
                              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                              <button onClick={handleAiSearch} disabled={isAiSearching} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                                {isAiSearching ? <Loader2 size={14} className="animate-spin"/> : <Bot size={14} />}
                              </button>
                           </div>

                           {filteredBlogs.map((post, i) => (
                              <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group cursor-pointer">
                                 <div className="flex justify-between items-start mb-2">
                                    <span className="text-[9px] font-black uppercase text-blue-400 tracking-wider">{post.cat}</span>
                                    <span className="text-[9px] text-slate-500 font-bold">{post.readTime}</span>
                                 </div>
                                 <h4 className="text-sm font-bold text-white leading-tight mb-2 group-hover:text-blue-300 transition-colors">{post.title}</h4>
                                 <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Read Article <ArrowRight size={10} />
                                 </div>
                              </div>
                           ))}
                           
                           {filteredBlogs.length === 0 && (
                              <div className="text-center py-10 text-slate-600 italic text-xs">No articles found.</div>
                           )}
                        </div>
                     )}
                  </div>
              </div>

           </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
