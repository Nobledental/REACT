'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Play, Pause, SkipBack, SkipForward, Heart, Share2, 
  Sparkles, Bookmark, Bot, Loader2, X, Search, ExternalLink
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { filterBlogsWithAi } from '@/services/geminiService';

// --- STYLES FOR MINI PLAYER ---
const miniPlayerStyles = `
  .player-card {
    background: #eef3f7;
    border-radius: 20px;
    box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
    padding: 30px;
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    transition: transform 0.3s ease;
  }
  .dark .player-card {
    background: #1e293b; 
    box-shadow: 0px 15px 35px -5px rgba(0, 0, 0, 0.5);
  }
  
  .cover-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 1/1; 
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 25px;
    box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
    background: #000;
  }

  .cover-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.05);
  }

  .control-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: #acb8cc;
    transition: all 0.3s ease;
    background: transparent;
  }
  .control-btn:hover {
    color: #532ab9;
    background: #fff;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transform: scale(1.1);
  }
  .dark .control-btn:hover {
    background: #334155;
    color: #fff;
  }
  
  .control-btn.main-play {
    width: 70px;
    height: 70px;
    font-size: 32px;
    color: #532ab9;
    background: #fff;
    box-shadow: 0 10px 20px rgba(83, 42, 185, 0.2);
  }
  .dark .control-btn.main-play {
    background: #3b82f6;
    color: #fff;
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
  }
  .control-btn.main-play:hover {
    transform: scale(1.1) translateY(-2px);
    box-shadow: 0 15px 30px rgba(83, 42, 185, 0.3);
  }

  .prog-track {
    width: 100%;
    height: 6px;
    background: #d0d8e6;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
  }
  .dark .prog-track { background: #334155; }
  
  .prog-fill {
    height: 100%;
    background: #532ab9;
    border-radius: 10px;
    transition: width 0.1s linear;
  }
  .dark .prog-fill { background: #3b82f6; }
`;

export default function Gallery() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currTime, setCurrTime] = useState(0);
  
  // Blog State
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiFilteredIndices, setAiFilteredIndices] = useState<number[] | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- ENGAGING TOPICS (Using your existing files) ---
  const tracks = [
    {
      title: "The Bionic Tooth",
      artist: "Engineering Forever",
      description: "Why titanium fuses with bone. The biology behind 'Getting your bite back' for life.",
      video: "/video/implants-cover.mp4",
      audio: "/audio/implants.mp3",
      category: "Futurism"
    },
    {
      title: "Myth: 'Root Canals Hurt'",
      artist: "Dr. Roger",
      description: "Busting the biggest myth in dentistry. How modern microscopes made RCTs boringly painless.",
      video: "/video/endo-cover.mp4",
      audio: "/audio/endo.mp3",
      category: "MythBusters"
    },
    {
      title: "The 'Jedi Mind Trick'",
      artist: "Parenting Hacks",
      description: "How we use 'Tell-Show-Do' psychology to make kids actually love visiting the dentist.",
      video: "/video/kids-cover.mp4",
      audio: "/audio/kids.mp3",
      category: "Psychology"
    },
    {
      title: "Invisible Physics",
      artist: "Aligner Tech",
      description: "The surprising engineering behind clear plastic. How aligners push teeth without metal.",
      video: "/video/ortho-cover.mp4",
      audio: "/audio/ortho.mp3",
      category: "Engineering"
    },
    {
      title: "The Heart-Mouth Loop",
      artist: "Systemic Health",
      description: "The shocking connection between bleeding gums, heart health, and diabetes.",
      video: "/video/safety-cover.mp4",
      audio: "/audio/safety.mp3",
      category: "Wellness"
    },
    {
      title: "Robots in the Chair",
      artist: "Future Tech",
      description: "AI Diagnostics, Laser Drills, and 3D Printing. Welcome to Dentistry 3.0.",
      video: "/video/ai-cover.mp4",
      audio: "/audio/ai.mp3",
      category: "AI & Tech"
    }
  ];

  // --- ENGAGING BLOG TITLES ---
  const blogPosts = [
    { 
      title: "The 'Facetune' Effect: Veneers vs. Filters", 
      cat: "Cosmetic", 
      desc: "Social media has warped our view of smiles. Here is what real, high-end porcelain actually looks like vs the fake 'Chiclet' look.", 
      img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600", 
      readTime: "5 min" 
    },
    { 
      title: "Charcoal & Oil Pulling: Dangerous Trends?", 
      cat: "Trend Watch", 
      desc: "We analyzed the viral TikTok dental trends. Find out which ones are safe and which ones destroy your enamel.", 
      img: "https://images.unsplash.com/photo-1550943963-c7520e7df802?auto=format&fit=crop&q=80&w=600", 
      readTime: "4 min" 
    },
    { 
      title: "Bio-Hacking Your Oral Microbiome", 
      cat: "Health", 
      desc: "Your mouth is an ecosystem. Learn why 'killing 99% of bacteria' is actually a bad idea, and how to feed the good bugs.", 
      img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600", 
      readTime: "8 min" 
    },
    { 
      title: "The 3-Year Warning: AI Diagnostics", 
      cat: "Technology", 
      desc: "How our new AI scanners detect cavities 3 years before they become visible to the naked eye.", 
      img: "https://images.unsplash.com/photo-1535378437580-da09b36393bc?auto=format&fit=crop&q=80&w=600", 
      readTime: "3 min" 
    }
  ];

  // --- AUDIO LOGIC ---
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(tracks[0].audio);
      audioRef.current.volume = 0.3;
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
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
      } else {
        setProgress(0);
        setCurrTime(0);
      }
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
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
      <style jsx global>{miniPlayerStyles}</style>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <RevealOnScroll>
          <div className="inline-flex items-center gap-2 text-blue-600 dark:text-cyan-400 font-bold tracking-[0.3em] text-[10px] uppercase mb-4">
             <Sparkles size={16} /> Dental Intelligence
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
             Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">Radio.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Myths, Biology, and the Future of your Smile.
          </p>
        </RevealOnScroll>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        
        {/* LEFT COLUMN: THE MINI PLAYER */}
        <RevealOnScroll>
          <div className="player-card">
            
            {/* Header Controls */}
            <div className="flex justify-between items-start mb-6">
               <button className="control-btn"><Heart size={20} /></button>
               <div className="text-center">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Now Playing</div>
                  <div className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">{tracks[currentTrackIndex].category}</div>
               </div>
               <button className="control-btn"><ExternalLink size={20} /></button>
            </div>

            {/* Video Cover (Album Art) */}
            <div className="cover-wrapper group">
               <AnimatePresence mode="wait">
                 <motion.div 
                   key={currentTrackIndex}
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 1.1 }}
                   transition={{ duration: 0.4 }}
                   className="w-full h-full absolute inset-0"
                 >
                    <video 
                      src={tracks[currentTrackIndex].video}
                      className="cover-video"
                      autoPlay loop muted playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 </motion.div>
               </AnimatePresence>
            </div>

            {/* Track Info */}
            <div className="text-center mb-8">
               <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{tracks[currentTrackIndex].title}</h3>
               <p className="text-slate-500 dark:text-slate-400 text-sm font-medium line-clamp-2 px-4">{tracks[currentTrackIndex].description}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
               <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                  <span>{formatTime(currTime)}</span>
                  <span>{formatTime(duration)}</span>
               </div>
               <div className="prog-track" onClick={handleSeek}>
                  <div className="prog-fill" style={{ width: `${progress}%` }}></div>
               </div>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center gap-8">
               <button className="control-btn" onClick={prevTrack}><SkipBack size={24} /></button>
               
               <button className="control-btn main-play" onClick={togglePlay}>
                  {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
               </button>
               
               <button className="control-btn" onClick={nextTrack}><SkipForward size={24} /></button>
            </div>

          </div>
        </RevealOnScroll>

        {/* RIGHT COLUMN: JOURNAL / BLOGS */}
        <div>
           <div className="mb-8 flex gap-4">
              <div className="relative flex-1">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                 <input 
                    type="text" 
                    placeholder="Search journal..." 
                    className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full py-3 pl-12 pr-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                    value={searchQuery}
                    onChange={(e) => {
                       setSearchQuery(e.target.value);
                       if (aiFilteredIndices) setAiFilteredIndices(null);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
                 />
                 {aiFilteredIndices && <button onClick={() => { setAiFilteredIndices(null); setSearchQuery(''); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"><X size={16}/></button>}
              </div>
              <button 
                 onClick={handleAiSearch}
                 disabled={isAiSearching || !searchQuery}
                 className="bg-blue-600 text-white px-6 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                 {isAiSearching ? <Loader2 className="animate-spin" size={14} /> : <Bot size={14} />} AI Search
              </button>
           </div>

           <div className="space-y-6">
              {filteredBlogs.map((post, i) => (
                 <RevealOnScroll key={i} delay={i * 100}>
                    <div className="flex gap-4 p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:border-blue-500/50 transition-colors group cursor-pointer h-32 overflow-hidden">
                       <div className="w-24 h-full rounded-xl overflow-hidden shrink-0 relative">
                          <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                       </div>
                       <div className="flex flex-col justify-center flex-1">
                          <span className="text-[9px] font-black uppercase text-blue-600 dark:text-blue-400 mb-1">{post.cat}</span>
                          <h4 className="font-bold text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-blue-500 transition-colors line-clamp-1">{post.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">{post.desc}</p>
                          <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                             <span>{post.readTime} Read</span>
                             <span className="flex items-center gap-1 hover:text-red-500 transition-colors"><Heart size={10} /> Save</span>
                          </div>
                       </div>
                    </div>
                 </RevealOnScroll>
              ))}
              
              {filteredBlogs.length === 0 && (
                 <div className="text-center py-12 text-slate-400 italic border border-dashed border-slate-200 dark:border-white/10 rounded-2xl">
                    No articles found. Try 'Implants' or 'Health'.
                 </div>
              )}
           </div>
        </div>

      </div>
    </section>
  );
}
