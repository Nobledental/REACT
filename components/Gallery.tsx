'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Play, Pause, SkipBack, SkipForward, Heart, Share2, 
  Sparkles, Bookmark, Bot, Loader2, X, Search, Activity, ShieldCheck, Cpu 
} from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { filterBlogsWithAi } from '@/services/geminiService';

const Gallery = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isTimerPlaying, setIsTimerPlaying] = useState(false);
  const [barWidth, setBarWidth] = useState("0%");
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiFilteredIndices, setAiFilteredIndices] = useState<number[] | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- EXPANDED PLAYLIST (6 Tracks based on Credentials/Clinical Topics) ---
  const tracks = [
    {
      name: "Biological Foundations of Dental Implants",
      category: "EPISODE 01",
      description: "How bone fusion (osseointegration) works on a cellular level and why Swiss titanium ensures lifetime stability.",
      artist: "Dr. Dhivakaran",
      video: "https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4",
      source: "/audio/implants.mp3", // Ensure file exists in public/audio/
      tags: ['Implants', 'Biology', 'Surgery']
    },
    {
      name: "Micro-Precision: The Zeiss Difference",
      category: "EPISODE 02",
      description: "A deep dive into why microscopic root canals have a 99% success rate compared to traditional methods.",
      artist: "Dr. Roger",
      video: "https://videos.pexels.com/video-files/5091624/5091624-hd_1920_1080_24fps.mp4",
      source: "/audio/endo.mp3",
      tags: ['Endo', 'Precision', 'Tech']
    },
    {
      name: "The Psychology of Pediatric Dentistry",
      category: "EPISODE 03",
      description: "Techniques to manage dental anxiety in children using the Tell-Show-Do method and positive reinforcement.",
      artist: "Dr. Sarah",
      video: "https://videos.pexels.com/video-files/5665440/5665440-hd_1920_1080_24fps.mp4", 
      source: "/audio/kids.mp3",
      tags: ['Pediatrics', 'Psychology', 'Kids']
    },
    {
      name: "Aligner Biomechanics vs Braces",
      category: "EPISODE 04",
      description: "Comparing the physics of pushing (Aligners) vs pulling (Braces) teeth. Which is faster?",
      artist: "Dr. Deepak",
      video: "https://videos.pexels.com/video-files/7579933/7579933-hd_1920_1080_25fps.mp4",
      source: "/audio/ortho.mp3",
      tags: ['Ortho', 'Invisalign', 'Physics']
    },
    // --- NEW TRACKS DERIVED FROM CREDENTIALS HTML ---
    {
      name: "The Invisible Shield: Sterilization Protocols",
      category: "EPISODE 05",
      description: "Understanding our 7-step sterilization cycle. Why we treat every patient with surgical-grade sterility.",
      artist: "Clinical Safety Team",
      video: "https://videos.pexels.com/video-files/3951368/3951368-hd_1920_1080_25fps.mp4", // Clean/Medical video
      // Calm, reassuring ambient track
      source: "https://assets.mixkit.co/music/preview/mixkit-deep-meditation-109.mp3", 
      tags: ['Safety', 'Hygiene', 'Protocols']
    },
    {
      name: "AI Diagnostics: Beyond the X-Ray",
      category: "EPISODE 06",
      description: "How Artificial Intelligence helps us detect decay 3 years before it becomes visible to the naked eye.",
      artist: "Tech Dept",
      video: "https://videos.pexels.com/video-files/8378772/8378772-hd_1920_1080_25fps.mp4", // Digital/AI video
      // Futuristic electronic track
      source: "https://assets.mixkit.co/music/preview/mixkit-future-technology-146.mp3",
      tags: ['AI', 'Digital', 'Future']
    }
  ];

  // --- EXPANDED BLOGS ---
  const blogPosts = [
    {
      title: "Science of Zirconia: Why it's the Gold Standard",
      cat: "Innovation",
      desc: "Explore how 5-axis milling and gradient layering technology have revolutionized dental restorations for strength and beauty.",
      img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600",
      readTime: "6 min"
    },
    {
      title: "The 'No-Tears' Protocol for Kids",
      cat: "Pediatrics",
      desc: "Creating positive neurological pathways during a child's first clinical dental visit to prevent odontophobia.",
      img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
      readTime: "7 min"
    },
    {
      title: "Biofilm Secrets: Professional Deep Cleaning",
      cat: "Hygiene",
      desc: "Why traditional scaling is being replaced by heated ultrasonic airflow protocols (GBT) for total biofilm reset.",
      img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600",
      readTime: "4 min"
    },
    {
      title: "Aligner Biomechanics: How Teeth Move Invisibly",
      cat: "Orthodontics",
      desc: "The physics behind PETG sequential trays and why Dr. Deepak's 3D planning ensures predictable outcomes.",
      img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f72?auto=format&fit=crop&q=80&w=600",
      readTime: "6 min"
    },
    // --- NEW BLOGS ---
    {
      title: "Patient Safety First: Our Sterilization Audit",
      cat: "Safety Protocols",
      desc: "We follow WHO-aligned infection control standards. Learn about our autoclave validation and water line purity checks.",
      img: "https://images.unsplash.com/photo-1584036561566-b45238f2e1ef?auto=format&fit=crop&q=80&w=600",
      readTime: "5 min"
    },
    {
      title: "The Digital Workflow: From Scan to Smile",
      cat: "Technology",
      desc: "How we use intraoral scanners to create 3D models of your teeth, eliminating gooey impression materials forever.",
      img: "https://images.unsplash.com/photo-1583912267550-d0d9f6522338?auto=format&fit=crop&q=80&w=600",
      readTime: "4 min"
    }
  ];

  // --- AI SEARCH LOGIC ---
  const handleAiSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsAiSearching(true);
    setAiFilteredIndices(null);
    try {
      const matchedIndices = await filterBlogsWithAi(searchQuery, blogPosts);
      setAiFilteredIndices(matchedIndices);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAiSearching(false);
    }
  };

  const clearAiSearch = () => {
    setAiFilteredIndices(null);
    setSearchQuery('');
  };

  const getFilteredBlogs = () => {
    if (aiFilteredIndices !== null) {
      return aiFilteredIndices.map(index => blogPosts[index]).filter(Boolean);
    }
    return blogPosts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.cat.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredBlogs = getFilteredBlogs();
  const currentTrack = tracks[currentTrackIndex];

  // --- AUDIO LOGIC ---

  // 1. Initialize Audio on Mount
  useEffect(() => {
    if (!audioRef.current) {
      // Use the first track's source (local file or URL)
      audioRef.current = new Audio(tracks[0].source);
      audioRef.current.volume = 0.2; // Set Volume Low (20%)
    }
    
    const audio = audioRef.current;
    
    const updateProgress = () => {
      if (audio.duration) {
        setBarWidth(`${(audio.currentTime / audio.duration) * 100}%`);
      }
    };

    const handleEnded = () => {
        handleNext(); // Auto-play next track
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // 2. Handle Track Switching
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      // Pause current
      audio.pause();
      
      // Switch Source
      audio.src = tracks[currentTrackIndex].source;
      audio.load();
      audio.volume = 0.2; // Ensure volume stays low
      
      // If player was active, auto-play new track.
      if (isTimerPlaying) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay prevented:", error);
                setIsTimerPlaying(false);
            });
        }
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
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const handlePrev = () => {
    setIsTimerPlaying(true); 
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  return (
    <section id="gallery" className="py-24 relative transition-colors duration-500 overflow-hidden bg-slate-50 dark:bg-[#0B1019]">
      {/* Section Header */}
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
               Deep-dives into clinical science, safety protocols, and surgical technology.
             </p>
          </div>
        </RevealOnScroll>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Unified Audio Player */}
        <RevealOnScroll className="mb-24">
           <div className="unified-player-card group">
              <div className="player-media">
                  {/* Video Background */}
                  <video 
                    key={currentTrack.video} 
                    src={currentTrack.video} 
                    className="player-video" 
                    autoPlay loop muted playsInline 
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute bottom-10 left-10 z-20">
                     <span className="px-4 py-1.5 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full mb-4 inline-block shadow-lg flex items-center gap-2 w-fit">
                        <Activity size={10} /> {currentTrack.category}
                     </span>
                     <h3 className="text-3xl md:text-4xl font-black text-white leading-none tracking-tight drop-shadow-lg">{currentTrack.artist}</h3>
                  </div>
              </div>

              <div className="player-content flex flex-col justify-between">
                  <div>
                    <h2 className="track-title text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">{currentTrack.name}</h2>
                    <div className="flex items-center gap-4 mb-6">
                       <span className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                          <Activity size={14} className={isTimerPlaying ? "animate-pulse" : ""} /> {isTimerPlaying ? "Now Playing" : "Paused"}
                       </span>
                       <div className="flex gap-2 flex-wrap">
                          {currentTrack.tags.map(t => (
                             <span key={t} className="text-[10px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 px-2 py-1 rounded-md uppercase tracking-wider">{t}</span>
                          ))}
                       </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3 md:line-clamp-none">{currentTrack.description}</p>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5">
                      {/* Progress Bar */}
                      <div className="relative h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden mb-8 cursor-pointer group/bar">
                          <div className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-100 ease-linear group-hover/bar:bg-blue-500" style={{ width: barWidth }}></div>
                      </div>
                      
                      {/* Controls */}
                      <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6 md:gap-10">
                             <button onClick={handlePrev} className="text-slate-400 hover:text-blue-600 transition-colors transform hover:-translate-x-1" aria-label="Previous Track">
                                <SkipBack size={28} />
                             </button>
                             
                             <button 
                                onClick={togglePlay} 
                                className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20 hover:scale-110 hover:bg-blue-500 transition-all active:scale-95"
                                aria-label={isTimerPlaying ? "Pause" : "Play"}
                             >
                                {isTimerPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                             </button>
                             
                             <button onClick={handleNext} className="text-slate-400 hover:text-blue-600 transition-colors transform hover:translate-x-1" aria-label="Next Track">
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

        {/* Latest Journal Entries (Blog Cards) */}
        <div className="mt-32">
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
              <RevealOnScroll>
                 <h3 className="text-3xl md:text-5xl font-black tracking-tight dark:text-white">Latest From The Journal</h3>
                 <p className="text-slate-500 font-medium mt-2">Clinical Insights & Updates.</p>
              </RevealOnScroll>
              
              <div className="flex flex-col gap-4 w-full max-w-md">
                 <div className="relative group flex items-center gap-2">
                    <div className="relative flex-1">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16}/>
                       <input 
                          type="text" 
                          placeholder="Search topics (e.g. 'safety', 'digital')..." 
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            if (aiFilteredIndices) setAiFilteredIndices(null);
                          }}
                          onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
                          className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full py-3 pl-12 pr-12 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                       />
                       {aiFilteredIndices !== null && (
                         <button onClick={clearAiSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                           <X size={16} />
                         </button>
                       )}
                    </div>
                    <button 
                       onClick={handleAiSearch}
                       disabled={isAiSearching || !searchQuery.trim()}
                       className={`h-11 px-5 rounded-full flex items-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all ${
                         isAiSearching 
                         ? 'bg-slate-100 dark:bg-white/5 text-slate-400 cursor-not-allowed'
                         : 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 active:scale-95'
                       }`}
                    >
                       {isAiSearching ? <Loader2 size={14} className="animate-spin" /> : <Bot size={14} />}
                       AI Search
                    </button>
                 </div>
              </div>
           </div>

           <div className="blog-scroll-container">
              {filteredBlogs.length > 0 ? (
                 filteredBlogs.map((post, i) => (
                    <RevealOnScroll key={i} delay={i * 100}>
                       <div className="modern-blog-card h-full">
                          <div className="modern-blog-img">
                             <img src={post.img} alt={post.title} />
                             <div className="absolute top-4 left-4 p-2 bg-white/90 dark:bg-black/80 rounded-xl shadow-lg">
                                <Bookmark size={16} className="text-slate-400" />
                             </div>
                             <div className="absolute bottom-4 right-4 px-3 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg">
                                {post.readTime} Read
                             </div>
                          </div>
                          <div className="modern-blog-content">
                             <span className="text-[9px] font-[900] text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] mb-3 block">{post.cat}</span>
                             <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight leading-tight">{post.title}</h4>
                             <p className="text-sm text-slate-500 dark:text-slate-300 mb-8 line-clamp-3 leading-relaxed font-medium">{post.desc}</p>
                             <div className="mt-auto pt-6 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
                                <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-cyan-400 hover:gap-2.5 transition-all">
                                   Read Entry <ArrowRight size={14} />
                                </button>
                                <div className="flex gap-4 text-slate-300">
                                   <Heart size={16} className="hover:text-red-500 transition-colors" />
                                   <Share2 size={16} className="hover:text-blue-500 transition-colors" />
                                </div>
                             </div>
                          </div>
                       </div>
                    </RevealOnScroll>
                 ))
              ) : (
                <div className="w-full text-center py-20 text-slate-500 font-medium italic border border-dashed border-slate-200 dark:border-white/5 rounded-[3rem]">
                   {isAiSearching ? 'AI is analyzing clinical context...' : 'No articles found matching your criteria. Try different keywords or semantic search.'}
                </div>
              )}
           </div>

           <div className="text-center mt-12">
              <Link href="/gallery" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors group">
                 Open Clinical Archives <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
           </div>
        </div>

      </div>
    </section>
  );
};

export default Gallery;
