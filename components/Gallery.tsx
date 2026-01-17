'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Play, Pause, SkipBack, SkipForward, Heart, Share2, 
  Sparkles, Bookmark, Bot, Loader2, X, Search, Activity, ShieldAlert, ShieldCheck
} from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { filterBlogsWithAi } from '@/services/geminiService';

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
  }
  .player-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiFilteredIndices, setAiFilteredIndices] = useState<number[] | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- PODCAST PLAYLIST (6 Tracks) ---
  const tracks = [
    {
      name: "The Bionic Tooth",
      artist: "Clinical Engineering",
      description: "Why titanium implants are the only permanent solution for bone loss. The biology of osseointegration.",
      video: "/video/implants-cover.mp4",
      audio: "/audio/implants.mp3",
      category: "Surgery",
      tags: ['Implants', 'Biology', 'Titanium']
    },
    {
      name: "The Instagram Trap",
      artist: "Dr. Deepak",
      description: "Are veneers worth it? How to avoid the 'Chiclet' look and why aggressive filing is irreversible.",
      video: "/video/ethics-cover.mp4",
      audio: "/audio/ethics.mp3", 
      category: "Ethics",
      tags: ['Veneers', 'Myths', 'Cosmetic']
    },
    {
      name: "The Heart-Mouth Loop",
      artist: "Systemic Health",
      description: "The proven link between bleeding gums, heart disease, and diabetes. Why hygiene is survival.",
      video: "/video/safety-cover.mp4",
      audio: "/audio/safety.mp3",
      category: "Health",
      tags: ['Heart', 'Diabetes', 'Gums']
    },
    {
      name: "Fluoride Facts",
      artist: "Prevention Team",
      description: "Does fluoride cause fluorosis? Yes, if misused. We explain the exact dosage for safety vs. protection.",
      video: "/video/kids-cover.mp4",
      audio: "/audio/kids.mp3",
      category: "Chemistry",
      tags: ['Kids', 'Safety', 'Science']
    },
    {
      name: "Invisible Physics",
      artist: "Aligner Tech",
      description: "How clear plastic pushes teeth faster than metal pulls them. The biomechanics of Invisalign.",
      video: "/video/ortho-cover.mp4",
      audio: "/audio/ortho.mp3",
      category: "Ortho",
      tags: ['Invisalign', 'Physics', 'Speed']
    },
    {
      name: "AI Diagnostics",
      artist: "Future Lab",
      description: "Finding cavities 3 years before the human eye can see them using infrared laser scanning.",
      video: "/video/ai-cover.mp4",
      audio: "/audio/ai.mp3",
      category: "Tech",
      tags: ['AI', 'Laser', 'Future']
    }
  ];

  // --- JOURNAL ENTRIES (20 Items) ---
  const blogPosts = [
    { title: "The Cost of Cheap Implants", cat: "Surgery", desc: "Why ₹20k implants fail. Understanding Grade 5 Titanium vs. impure alloys.", img: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600", readTime: "6 min" },
    { title: "Root Canals vs. Extraction", cat: "Endodontics", desc: "Why saving your natural tooth is always better (and cheaper) than an implant in the long run.", img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f72?auto=format&fit=crop&q=80&w=600", readTime: "5 min" },
    { title: "The 3-Year Warning", cat: "Technology", desc: "How AI scanners detect decay 3 years before it becomes visible to the naked eye.", img: "https://images.unsplash.com/photo-1535378437580-da09b36393bc?auto=format&fit=crop&q=80&w=600", readTime: "3 min" },
    { title: "Biofilm: The Silent Killer", cat: "Hygiene", desc: "How untreated plaque enters your bloodstream and increases risks of stroke and heart valve infection.", img: "https://images.unsplash.com/photo-1609840114035-1c29046a83ea?auto=format&fit=crop&q=80&w=600", readTime: "7 min" },
    { title: "Wisdom Teeth: The Age 25 Rule", cat: "Surgery", desc: "Why removing impacted teeth before 25 results in a 2-day recovery, compared to 2 weeks after 30.", img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600", readTime: "4 min" },
    { title: "Laser Gum Depigmentation", cat: "Cosmetic", desc: "A painless, single-visit laser procedure to treat dark or melatonin-pigmented gums safely.", img: "https://images.unsplash.com/photo-1606811841689-230391b42a21?auto=format&fit=crop&q=80&w=600", readTime: "3 min" },
    { title: "Invisalign Speed Test", cat: "Orthodontics", desc: "Case studies: Why aligners fixed crowding 4 months faster than traditional braces in adult cases.", img: "https://images.unsplash.com/photo-1595867372361-597621c258d4?auto=format&fit=crop&q=80&w=600", readTime: "5 min" },
    { title: "Full Mouth Rehabilitation", cat: "Restorative", desc: "Restoring vertical dimension (VDO) to fix collapsed bites that cause facial aging and wrinkles.", img: "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?auto=format&fit=crop&q=80&w=600", readTime: "8 min" },
    { title: "The 'Turkey Teeth' Warning", cat: "Warning", desc: "Aggressive crown preparations destroy enamel. Once it's gone, it never grows back. Know the risks.", img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600", readTime: "5 min" },
    { title: "Charcoal Toothpaste Risks", cat: "Myth Buster", desc: "Why abrasive charcoal scrubs micro-scratches into your teeth, making them stain faster and look yellower.", img: "https://images.unsplash.com/photo-1550943963-c7520e7df802?auto=format&fit=crop&q=80&w=600", readTime: "3 min" },
    { title: "Beauty is Unique", cat: "Philosophy", desc: "Perfect symmetry looks fake. We design 'Perfectly Imperfect' smiles that match your unique facial features.", img: "https://images.unsplash.com/photo-1535378437580-da09b36393bc?auto=format&fit=crop&q=80&w=600", readTime: "4 min" },
    { title: "Stop Brushing So Hard", cat: "Technique", desc: "Aggressive brushing causes gum recession. Why the 'Modified Bass Technique' is the only safe method.", img: "https://images.unsplash.com/photo-1559599189-fe84fea4eb8b?auto=format&fit=crop&q=80&w=600", readTime: "3 min" },
    { title: "Oil Pulling vs. Science", cat: "Myth Buster", desc: "Coconut oil is great for cooking, but it does not cure cavities. The limits of holistic dentistry explained.", img: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&q=80&w=600", readTime: "4 min" },
    { title: "DIY Aligners Disaster", cat: "Warning", desc: "Mail-order aligners lack X-ray diagnostics. We fix bite collapses caused by unsupervised DIY kits weekly.", img: "https://images.unsplash.com/photo-1588774221773-ddf250325fa1?auto=format&fit=crop&q=80&w=600", readTime: "5 min" },
    { title: "The Sparkling Water Trap", cat: "Diet", desc: "Carbonated water is acidic. How to enjoy fizzy drinks without eroding your enamel over time.", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600", readTime: "3 min" },
    { title: "Bleeding Gums Warning", cat: "Health", desc: "If your hands bled when you washed them, you'd panic. Why do we ignore 'pink in the sink'?", img: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=600", readTime: "4 min" }
  ];

  const currentTrack = tracks[currentTrackIndex];

  // --- AUDIO LOGIC ---
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(tracks[0].audio);
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
      audioRef.current.src = tracks[currentTrackIndex].audio;
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
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const handlePrev = () => {
    setIsTimerPlaying(true); 
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  // --- BLOG AI LOGIC ---
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
        
        {/* --- UNIFIED WIDE PLAYER CARD --- */}
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
                     <span className="px-4 py-1.5 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full mb-4 inline-block shadow-lg">{currentTrack.category}</span>
                     <h3 className="text-3xl md:text-4xl font-black text-white leading-none tracking-tight drop-shadow-lg">{currentTrack.artist}</h3>
                  </div>
              </div>

              {/* Right: Content & Controls */}
              <div className="player-content">
                  <div>
                    <h2 className="track-title text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">{currentTrack.name}</h2>
                    <div className="flex items-center gap-4 mb-6">
                       <span className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                          <Activity size={14} className={isTimerPlaying ? "animate-pulse" : ""} /> Now Playing
                       </span>
                       <div className="flex gap-2">
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

        {/* --- JOURNAL SECTION --- */}
        <div className="mt-32">
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
              <RevealOnScroll>
                 <h3 className="text-3xl md:text-5xl font-black tracking-tight dark:text-white">Latest From The Journal</h3>
                 <p className="text-slate-500 font-medium mt-2">Expert perspectives on modern clinical care.</p>
              </RevealOnScroll>
              
              <div className="flex flex-col gap-4 w-full max-w-md">
                 <div className="relative group flex items-center gap-2">
                    <div className="relative flex-1">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16}/>
                       <input 
                          type="text" 
                          placeholder="Semantic search (e.g. 'gum health')..." 
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            if (aiFilteredIndices) setAiFilteredIndices(null);
                          }}
                          onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
                          className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full py-3 pl-12 pr-12 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white shadow-sm"
                       />
                       {aiFilteredIndices !== null && (
                         <button onClick={() => { setAiFilteredIndices(null); setSearchQuery(''); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
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
                 {aiFilteredIndices !== null && (
                   <div className="px-4 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-cyan-400 animate-in fade-in slide-in-from-left-2">
                      Semantic Match Results: {filteredBlogs.length} Articles Found
                   </div>
                 )}
              </div>
           </div>

           {/* SCROLLABLE GRID */}
           <div className="grid md:grid-cols-2 gap-6 h-[800px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10">
              {filteredBlogs.length > 0 ? (
                 filteredBlogs.map((post, i) => (
                    <RevealOnScroll key={i} delay={i * 50}>
                       <div className="modern-blog-card h-full flex flex-col p-6 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] hover:border-blue-500/50 hover:shadow-xl transition-all group">
                          <div className="modern-blog-img h-48 rounded-2xl overflow-hidden mb-6 relative">
                             <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                             <div className="absolute top-4 left-4 p-2 bg-white/90 dark:bg-black/80 rounded-xl shadow-lg backdrop-blur-md">
                                <Bookmark size={16} className="text-slate-400" />
                             </div>
                             <div className="absolute bottom-4 right-4 px-3 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg">
                                {post.readTime} Read
                             </div>
                          </div>
                          
                          <div className="modern-blog-content flex flex-col flex-1">
                             <div className="flex items-center justify-between mb-3">
                                <span className={`text-[9px] font-[900] uppercase tracking-[0.2em] ${['Warning', 'Myth Buster'].includes(post.cat) ? 'text-red-500' : 'text-blue-600 dark:text-blue-400'}`}>
                                   {post.cat}
                                </span>
                                {['Warning', 'Myth Buster'].includes(post.cat) && <ShieldAlert size={14} className="text-red-500" />}
                                {['Surgery', 'Technology'].includes(post.cat) && <ShieldCheck size={14} className="text-green-500" />}
                             </div>
                             
                             <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">{post.title}</h4>
                             <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-3 leading-relaxed font-medium">{post.desc}</p>
                             
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
                <div className="col-span-full w-full text-center py-20 text-slate-500 font-medium italic border border-dashed border-slate-200 dark:border-white/5 rounded-[3rem]">
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
