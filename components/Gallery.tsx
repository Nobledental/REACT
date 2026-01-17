'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Play, Pause, SkipBack, SkipForward, Heart, ExternalLink, 
  Sparkles, Search, X, Loader2, Bot, Bookmark, Activity, ShieldAlert, ShieldCheck
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
  
  // Blog State
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiFilteredIndices, setAiFilteredIndices] = useState<number[] | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- PODCAST PLAYLIST ---
  const tracks = [
    {
      title: "The Bionic Tooth",
      artist: "Clinical Engineering",
      description: "Why titanium implants are the only permanent solution for bone loss. The biology of osseointegration.",
      video: "/video/implants-cover.mp4",
      audio: "/audio/implants.mp3",
      category: "Surgery"
    },
    {
      title: "The Instagram Trap",
      artist: "Dr. Deepak",
      description: "Are veneers worth it? How to avoid the 'Chiclet' look and why aggressive filing is irreversible.",
      video: "/video/ethics-cover.mp4",
      audio: "/audio/ethics.mp3", 
      category: "Ethics"
    },
    {
      title: "The Heart-Mouth Loop",
      artist: "Systemic Health",
      description: "The proven link between bleeding gums, heart disease, and diabetes. Why hygiene is survival.",
      video: "/video/safety-cover.mp4",
      audio: "/audio/safety.mp3",
      category: "Health"
    },
    {
      title: "Fluoride Facts",
      artist: "Prevention Team",
      description: "Does fluoride cause fluorosis? Yes, if misused. We explain the exact dosage for safety vs. protection.",
      video: "/video/kids-cover.mp4",
      audio: "/audio/kids.mp3",
      category: "Chemistry"
    },
    {
      title: "Invisible Physics",
      artist: "Aligner Tech",
      description: "How clear plastic pushes teeth faster than metal pulls them. The biomechanics of Invisalign.",
      video: "/video/ortho-cover.mp4",
      audio: "/audio/ortho.mp3",
      category: "Ortho"
    },
    {
      title: "AI Diagnostics",
      artist: "Future Lab",
      description: "Finding cavities 3 years before the human eye can see them using infrared laser scanning.",
      video: "/video/ai-cover.mp4",
      audio: "/audio/ai.mp3",
      category: "Tech"
    }
  ];

  // --- JOURNAL ENTRIES ---
  const blogPosts = [
    { title: "The Cost of Cheap Implants", cat: "Surgery", desc: "Why ₹20k implants fail. Understanding Grade 5 Titanium vs. impure alloys.", img: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600", readTime: "6 min" },
    { title: "Root Canals vs. Extraction", cat: "Endodontics", desc: "Why saving your natural tooth is always better (and cheaper) than an implant in the long run.", img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f72?auto=format&fit=crop&q=80&w=600", readTime: "5 min" },
    { title: "The 3-Year Warning", cat: "Technology", desc: "How AI scanners detect decay 3 years before it becomes visible to the naked eye.", img: "https://images.unsplash.com/photo-1535378437580-da09b36393bc?auto=format&fit=crop&q=80&w=600", readTime: "3 min" },
    { title: "Biofilm: The Silent Killer", cat: "Hygiene", desc: "How untreated plaque enters your bloodstream and increases risks of stroke and heart valve infection.", img: "https://images.unsplash.com/photo-1609840114035-1c29046a83ea?auto=format&fit=crop&q=80&w=600", readTime: "7 min" },
    { title: "Wisdom Teeth: The Age 25 Rule", cat: "Surgery", desc: "Why removing impacted teeth before 25 results in a 2-day recovery, compared to 2 weeks after 30.", img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600", readTime: "4 min" },
    { title: "Laser Gum Depigmentation", cat: "Cosmetic", desc: "A painless, single-visit laser procedure to treat dark or melatonin-pigmented gums safely.", img: "https://images.unsplash.com/photo-1606811841689-230391b42a21?auto=format&fit=crop&q=80&w=600", readTime: "3 min" },
    { title: "Invisalign Speed Test", cat: "Orthodontics", desc: "Case studies: Why aligners fixed crowding 4 months faster than traditional braces in adult cases.", img: "https://images.unsplash.com/photo-1595867372361-597621c258d4?auto=format&fit=crop&q=80&w=600", readTime: "5 min" },
    { title: "Full Mouth Rehabilitation", cat: "Restorative", desc: "Restoring vertical dimension (VDO) to fix collapsed bites that cause facial aging and wrinkles.", img: "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?auto=format&fit=crop&q=80&w=600", readTime: "8 min" },
    { title: "The Zirconia Advantage", cat: "Restorative", desc: "Why we stopped using metal-fused porcelain. The superior strength and aesthetics of monoliths.", img: "https://images.unsplash.com/photo-1593059812632-d74676be9a2c?auto=format&fit=crop&q=80&w=600", readTime: "4 min" },
    { title: "Pediatric Airway Ortho", cat: "Kids", desc: "Expanding the jaw early to prevent sleep apnea, snoring, and ADHD-like symptoms in children.", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600", readTime: "6 min" },
    { title: "The 'Turkey Teeth' Warning", cat: "Warning", desc: "Aggressive crown preparations destroy enamel. Once it's gone, it never grows back. Know the risks.", img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600", readTime: "5 min" },
    { title: "Charcoal Toothpaste Risks", cat: "Myth Buster", desc: "Why abrasive charcoal scrubs micro-scratches into your teeth, making them stain faster and look yellower.", img: "https://images.unsplash.com/photo-1550943963-c7520e7df802?auto=format&fit=crop&q=80&w=600", readTime: "3 min" },
    { title: "Fluorosis vs. Protection", cat: "Fact Check", desc: "Is fluoride in water dangerous? Only if misused. Learn the exact safe dosage for preventing white spots.", img: "https://images.unsplash.com/photo-1584036561566-b45238f2e1ef?auto=format&fit=crop&q=80&w=600", readTime: "6 min" },
    { title: "Beauty is Unique", cat: "Philosophy", desc: "Perfect symmetry looks fake. We design 'Perfectly Imperfect' smiles that match your unique facial features.", img: "https://images.unsplash.com/photo-1535378437580-da09b36393bc?auto=format&fit=crop&q=80&w=600", readTime: "4 min" },
    { title: "Stop Brushing So Hard", cat: "Technique", desc: "Aggressive brushing causes gum recession. Why the 'Modified Bass Technique' is the only safe method.", img: "https://images.unsplash.com/photo-1559599189-fe84fea4eb8b?auto=format&fit=crop&q=80&w=600", readTime: "3 min" },
    { title: "Oil Pulling vs. Science", cat: "Myth Buster", desc: "Coconut oil is great for cooking, but it does not cure cavities. The limits of holistic dentistry explained.", img: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&q=80&w=600", readTime: "4 min" },
    { title: "DIY Aligners Disaster", cat: "Warning", desc: "Mail-order aligners lack X-ray diagnostics. We fix bite collapses caused by unsupervised DIY kits weekly.", img: "https://images.unsplash.com/photo-1588774221773-ddf250325fa1?auto=format&fit=crop&q=80&w=600", readTime: "5 min" },
    { title: "The Sparkling Water Trap", cat: "Diet", desc: "Carbonated water is acidic. How to enjoy fizzy drinks without eroding your enamel over time.", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600", readTime: "3 min" },
    { title: "Bleeding Gums Warning", cat: "Health", desc: "If your hands bled when you washed them, you'd panic. Why do we ignore 'pink in the sink'?", img: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=600", readTime: "4 min" },
    { title: "Biomimetics Philosophy", cat: "Ethics", desc: "Our core rule: Mimic natural tooth structure. Remove as little as possible, conserve as much as possible.", img: "https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?auto=format&fit=crop&q=80&w=600", readTime: "6 min" }
  ];

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
            From biological implants to ethical cosmetics. We separate science from sales.
          </p>
        </RevealOnScroll>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        
        {/* --- LEFT: MINI PLAYER CARD (TAILWIND STYLED) --- */}
        <RevealOnScroll>
          <div className="bg-[#eef3f7] dark:bg-[#1e293b] rounded-[20px] shadow-[0px_15px_35px_-5px_rgba(50,88,130,0.32)] dark:shadow-[0px_15px_35px_-5px_rgba(0,0,0,0.5)] p-8 max-w-[420px] mx-auto transition-transform duration-300">
            
            {/* Header Controls */}
            <div className="flex justify-between items-start mb-6">
               <button className="flex items-center justify-center w-10 h-10 rounded-full text-slate-400 hover:text-red-500 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm hover:shadow-md hover:scale-110">
                 <Heart size={20} />
               </button>
               <div className="text-center">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Now Playing</div>
                  <div className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full shadow-sm">{tracks[currentTrackIndex].category}</div>
               </div>
               <button className="flex items-center justify-center w-10 h-10 rounded-full text-slate-400 hover:text-blue-500 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm hover:shadow-md hover:scale-110">
                 <ExternalLink size={20} />
               </button>
            </div>

            {/* Video Cover (Album Art) */}
            <div className="relative w-full aspect-square rounded-[20px] overflow-hidden mb-6 shadow-[0px_10px_40px_0px_rgba(76,70,124,0.5)] bg-black group">
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
                      className="w-full h-full object-cover scale-105"
                      autoPlay loop muted playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 </motion.div>
               </AnimatePresence>
            </div>

            {/* Track Info */}
            <div className="text-center mb-8">
               <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 leading-tight">{tracks[currentTrackIndex].title}</h3>
               <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed px-2 line-clamp-2">{tracks[currentTrackIndex].description}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
               <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                  <span>{formatTime(currTime)}</span>
                  <span>{formatTime(duration)}</span>
               </div>
               <div className="w-full h-1.5 bg-[#d0d8e6] dark:bg-slate-700 rounded-full cursor-pointer overflow-hidden" onClick={handleSeek}>
                  <div className="h-full bg-[#532ab9] dark:bg-blue-500 rounded-full transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
               </div>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center gap-8">
               <button onClick={prevTrack} className="flex items-center justify-center w-12 h-12 rounded-full text-[#acb8cc] transition-all duration-300 hover:text-[#532ab9] hover:bg-white hover:shadow-lg hover:scale-110 dark:hover:bg-slate-700 dark:hover:text-white">
                 <SkipBack size={24} />
               </button>
               
               <button onClick={togglePlay} className="flex items-center justify-center w-20 h-20 rounded-full text-white bg-[#532ab9] dark:bg-blue-600 shadow-[0_10px_20px_rgba(83,42,185,0.3)] hover:scale-110 hover:shadow-[0_15px_30px_rgba(83,42,185,0.4)] transition-all duration-300">
                  {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
               </button>
               
               <button onClick={nextTrack} className="flex items-center justify-center w-12 h-12 rounded-full text-[#acb8cc] transition-all duration-300 hover:text-[#532ab9] hover:bg-white hover:shadow-lg hover:scale-110 dark:hover:bg-slate-700 dark:hover:text-white">
                 <SkipForward size={24} />
               </button>
            </div>

          </div>
        </RevealOnScroll>

        {/* --- RIGHT: JOURNAL (Scrollable) --- */}
        <div>
           {/* Search Bar */}
           <div className="mb-8 flex gap-4">
              <div className="relative flex-1">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                 <input 
                    type="text" 
                    placeholder="Search 'implants' or 'safety'..." 
                    className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full py-3 pl-12 pr-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white shadow-sm"
                    value={searchQuery}
                    onChange={(e) => {
                       setSearchQuery(e.target.value);
                       if (aiFilteredIndices) setAiFilteredIndices(null);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
                 />
                 {aiFilteredIndices && <button onClick={() => { setAiFilteredIndices(null); setSearchQuery(''); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X size={16}/></button>}
              </div>
              <button 
                 onClick={handleAiSearch}
                 disabled={isAiSearching || !searchQuery}
                 className="bg-blue-600 text-white px-6 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-blue-500/20"
              >
                 {isAiSearching ? <Loader2 className="animate-spin" size={14} /> : <Bot size={14} />} AI Search
              </button>
           </div>

           {/* Blog List */}
           <div className="space-y-4 h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10">
              {filteredBlogs.map((post, i) => (
                 <RevealOnScroll key={i} delay={i * 50}>
                    <div className="flex gap-4 p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:border-blue-500/50 hover:shadow-lg transition-all group cursor-pointer">
                       <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 relative">
                          <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                       </div>
                       <div className="flex flex-col justify-center flex-1">
                          <div className="flex items-center justify-between mb-1">
                             <span className={`text-[9px] font-black uppercase mb-1 tracking-wider ${['Warning', 'Myth Buster'].includes(post.cat) ? 'text-red-500' : 'text-blue-600 dark:text-blue-400'}`}>
                                {post.cat}
                             </span>
                             {['Warning', 'Myth Buster'].includes(post.cat) && <ShieldAlert size={12} className="text-red-500" />}
                             {['Surgery', 'Technology'].includes(post.cat) && <ShieldCheck size={12} className="text-green-500" />}
                          </div>
                          
                          <h4 className="font-bold text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{post.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 line-clamp-2 leading-relaxed">{post.desc}</p>
                          
                          <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                             <span>{post.readTime} Read</span>
                             <span className="flex items-center gap-1 hover:text-red-500 transition-colors ml-auto"><Heart size={12} /> Save</span>
                          </div>
                       </div>
                    </div>
                 </RevealOnScroll>
              ))}
              
              {filteredBlogs.length === 0 && (
                 <div className="text-center py-12 text-slate-400 italic border border-dashed border-slate-200 dark:border-white/10 rounded-2xl">
                    No articles found. Try searching for 'Implants' or 'Safety'.
                 </div>
              )}
           </div>
        </div>

      </div>
    </section>
  );
}
