'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Play, Pause, SkipBack, SkipForward, Heart, Share2, 
  Sparkles, Bookmark, Activity, ShieldAlert, ShieldCheck,
  Scan, Database, Wifi, ArrowDown, Zap, AlertTriangle,
  Microscope, Layers, Droplets, Skull, Anchor, X, CheckCircle,
  MessageCircle, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// ==========================================
// 1. UTILS & TYPES
// ==========================================

const wideCardStyles = `
  .unified-player-card {
    background: #ffffff;
    border-radius: 40px;
    box-shadow: 0 30px 60px -10px rgba(0,0,0,0.08);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(0,0,0,0.05);
    transition: all 0.5s ease;
    height: auto;
  }
  
  @media (min-width: 1024px) {
    .unified-player-card {
      flex-direction: row;
      height: 650px; /* Increased height for narrative space */
    }
  }

  .dark .unified-player-card {
    background: #0f172a;
    border-color: rgba(255,255,255,0.05);
    box-shadow: 0 30px 60px -10px rgba(0,0,0,0.4);
  }

  .player-media {
    flex: 1.5; /* Visuals get 60% width */
    position: relative;
    background: #020617; 
    min-height: 400px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid rgba(255,255,255,0.05);
  }

  .player-content {
    flex: 1;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: rgba(255,255,255,0.02);
  }
  
  .track-title {
    font-family: 'Inter', sans-serif;
    letter-spacing: -0.03em;
  }

  /* Typewriter Container */
  .narrative-box {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    right: 2rem;
    background: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.15);
    padding: 1.5rem;
    border-radius: 1.5rem;
    z-index: 50;
    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);
  }
  
  .typewriter-text {
    font-family: 'Monaco', 'Consolas', monospace;
    font-size: 0.9rem;
    line-height: 1.6;
    color: #e2e8f0;
  }
  
  .cursor {
    display: inline-block;
    width: 8px;
    height: 16px;
    background: #3b82f6;
    margin-left: 4px;
    animation: blink 1s infinite;
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

// --- Typewriter Component ---
const Typewriter = ({ text, speed = 30 }: { text: string, speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <div className="typewriter-text">
      {displayedText}<span className="cursor"></span>
    </div>
  );
};

// ==========================================
// 2. NARRATIVE VISUALIZATIONS
// ==========================================

// --- A. IMPLANTS STORY (5 Phases) ---
const ImplantStory = ({ phase }: { phase: number }) => {
  return (
    <div className="relative w-full h-full bg-slate-950 flex flex-col items-center justify-center p-12">
      <div className="relative w-64 h-80 flex items-end justify-center">
        
        {/* 1. BONE STRUCTURE */}
        <div className="w-full h-48 bg-slate-800 rounded-b-[3rem] relative overflow-hidden border-t-4 border-slate-600">
           {/* Bone Tissue Pattern */}
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
           
           {/* PHASE 0 & 1: Bone Loss Animation */}
           <motion.div 
             className="absolute top-0 left-0 right-0 bg-slate-950/80 w-full z-10"
             animate={{ height: phase <= 1 ? '60%' : '0%' }}
             transition={{ duration: 3, ease: "easeInOut" }}
           />
           
           {/* PHASE 2: Implant Insertion */}
           <motion.div
             className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-32 z-20"
             initial={{ y: -200 }}
             animate={{ y: phase >= 2 ? 10 : -200 }}
             transition={{ duration: 2, type: "spring", stiffness: 50 }}
           >
              {/* Screw SVG */}
              <svg viewBox="0 0 40 120" className="w-full h-full drop-shadow-2xl">
                 <path d="M5 0H35V10L30 15V110L20 120L10 110V15L5 10V0Z" fill="url(#titanium_grad)" />
                 {[...Array(8)].map((_,i) => (
                    <path key={i} d={`M5 ${20 + i*10}H35`} stroke="rgba(0,0,0,0.5)" strokeWidth="2"/>
                 ))}
                 <defs>
                    <linearGradient id="titanium_grad" x1="0" y1="0" x2="1" y2="0">
                       <stop stopColor="#cbd5e1" />
                       <stop offset="0.5" stopColor="#f8fafc" />
                       <stop offset="1" stopColor="#94a3b8" />
                    </linearGradient>
                 </defs>
              </svg>
           </motion.div>

           {/* PHASE 3: Osseointegration (Cells) */}
           {phase >= 3 && [...Array(15)].map((_, i) => (
              <motion.div
                 key={i}
                 className="absolute w-1.5 h-1.5 bg-green-400 rounded-full"
                 initial={{ opacity: 0, scale: 0 }}
                 animate={{ opacity: 1, scale: 1, x: (Math.random()-0.5)*60, y: (Math.random())*100 }}
                 transition={{ delay: i * 0.1 }}
                 style={{ left: '50%', top: '10px' }}
              />
           ))}
        </div>

        {/* PHASE 4: The Crown */}
        <motion.div
           className="absolute bottom-48 w-16 h-20 bg-white rounded-t-xl shadow-[0_0_40px_rgba(255,255,255,0.2)] z-30"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 20 }}
           transition={{ duration: 1 }}
        >
           <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-200 rounded-t-xl"></div>
        </motion.div>

        {/* Labels based on Phase */}
        <AnimatePresence mode="wait">
           {phase === 0 && <motion.div key="p0" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute -top-10 text-red-400 font-bold text-xs uppercase tracking-widest">Missing Tooth</motion.div>}
           {phase === 1 && <motion.div key="p1" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute top-10 text-red-400 font-bold text-xs uppercase tracking-widest">Bone Resorbing...</motion.div>}
           {phase === 2 && <motion.div key="p2" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute -top-10 text-blue-400 font-bold text-xs uppercase tracking-widest">Implant Placed</motion.div>}
           {phase === 3 && <motion.div key="p3" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute bottom-4 text-green-400 font-bold text-xs uppercase tracking-widest">Fusing to Bone</motion.div>}
           {phase === 4 && <motion.div key="p4" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute -top-24 text-white font-bold text-xs uppercase tracking-widest bg-blue-600 px-3 py-1 rounded-full">Function Restored</motion.div>}
        </AnimatePresence>

      </div>
    </div>
  );
};

// --- B. VENEER STORY (4 Phases) ---
const VeneerStory = ({ phase }: { phase: number }) => {
  return (
    <div className="relative w-full h-full bg-slate-950 flex flex-col items-center justify-center">
       <div className="flex gap-8 items-center">
          
          {/* BAD EXAMPLE (Phase 1) */}
          <motion.div 
            className="flex flex-col items-center"
            animate={{ opacity: phase === 1 ? 1 : 0.3, scale: phase === 1 ? 1.1 : 0.9 }}
          >
             <div className="w-24 h-32 bg-white rounded-md mb-4 shadow-xl border-4 border-white flex items-center justify-center">
                <span className="text-slate-300 text-xs font-bold rotate-[-15deg]">FLAT COLOR</span>
             </div>
             {phase === 1 && <div className="text-red-500 font-bold text-xs uppercase">The "Chiclet" Look</div>}
          </motion.div>

          {/* GOOD EXAMPLE (Phase 2-4) */}
          <motion.div 
            className="flex flex-col items-center relative"
            animate={{ opacity: phase >= 2 ? 1 : 0.3, scale: phase >= 2 ? 1.1 : 0.9 }}
          >
             <div className="relative w-24 h-32 mb-4 perspective-[1000px]">
                
                {/* Dentin Core */}
                <motion.div 
                   className="absolute inset-0 bg-amber-200 rounded-md"
                   animate={{ opacity: phase >= 2 ? 1 : 0 }}
                />
                
                {/* Enamel Shell */}
                <motion.div 
                   className="absolute inset-[-2px] bg-blue-100/30 border border-white/60 rounded-md backdrop-blur-[1px]"
                   animate={{ opacity: phase >= 3 ? 1 : 0 }}
                />

                {/* Light Reflection */}
                <motion.div 
                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12"
                   animate={{ left: ['-100%', '200%'], opacity: phase >= 4 ? 1 : 0 }}
                   transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
             </div>
             {phase >= 2 && <div className="text-green-500 font-bold text-xs uppercase">{phase === 2 ? "Dentin Core" : phase === 3 ? "Enamel Layer" : "Light Refraction"}</div>}
          </motion.div>
       </div>
    </div>
  );
};

// --- C. HEART HEALTH STORY (4 Phases) ---
const HeartMouthStory = ({ phase }: { phase: number }) => {
  return (
    <div className="relative w-full h-full bg-slate-950 flex flex-col justify-center px-16">
       
       {/* 1. MOUTH */}
       <div className="absolute top-10 left-10 text-center">
          <div className="w-20 h-20 bg-slate-800 border-2 border-slate-600 rounded-full flex items-center justify-center relative overflow-hidden">
             {/* Bacteria */}
             {[...Array(8)].map((_, i) => (
                <motion.div
                   key={i}
                   className="absolute w-2 h-2 bg-green-500 rounded-full"
                   animate={{ 
                      scale: phase >= 1 ? [1, 1.5, 1] : 1,
                      x: phase >= 2 ? [0, 200, 400] : 0, 
                      y: phase >= 2 ? [0, 50, 100] : 0,
                      opacity: phase >= 2 ? [1, 1, 0] : 1 
                   }}
                   transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                />
             ))}
          </div>
          <p className="text-white text-xs font-bold mt-2">Gum Pocket</p>
       </div>

       {/* 2. BLOOD VESSEL */}
       <div className="absolute top-1/2 left-0 right-0 h-4 bg-red-900/30 -translate-y-1/2 overflow-hidden">
          <motion.div 
             className="absolute inset-0 bg-red-600/20"
             animate={{ x: ['-100%', '100%'] }}
             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          {phase >= 2 && (
             <div className="absolute top-0 left-1/2 text-[10px] text-red-300 font-mono bg-black/50 px-2">BACTERIA ENTERING BLOODSTREAM</div>
          )}
       </div>

       {/* 3. HEART */}
       <div className="absolute bottom-10 right-10 text-center">
          <motion.div 
             className="w-24 h-24 bg-red-700 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.5)]"
             animate={{ scale: phase >= 3 ? [1, 1.3, 1] : 1, backgroundColor: phase >= 3 ? "#991b1b" : "#b91c1c" }}
             transition={{ duration: 0.6, repeat: Infinity }}
          >
             <Heart size={40} className="text-white" fill="white" />
          </motion.div>
          {phase >= 3 && (
             <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="text-red-500 font-black text-xs uppercase mt-2 bg-red-950 px-2 py-1 rounded"
             >
                Inflammation Detected
             </motion.div>
          )}
       </div>
    </div>
  );
};

// ==========================================
// 3. MAIN COMPONENT LOGIC
// ==========================================

export default function Gallery() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isTimerPlaying, setIsTimerPlaying] = useState(false);
  const [barWidth, setBarWidth] = useState("0%");
  
  // NARRATIVE ENGINE STATE
  const [phase, setPhase] = useState(0);
  const [storyText, setStoryText] = useState("");
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // --- PLAYLIST DATA (Enhanced with Narrative Scripts) ---
  const playlist = [
    {
      type: "audio",
      name: "The Bionic Tooth",
      artist: "Implants 101",
      description: "Understanding how titanium replaces lost roots.",
      component: <ImplantStory phase={phase} />,
      script: [
        { t: 0, text: "Question: What happens when you lose a tooth? It's not just a gap.", p: 0 },
        { t: 5, text: "Without the tooth root stimulating it, your jawbone actually begins to melt away (Resorption).", p: 1 },
        { t: 12, text: "This causes facial collapse and aging. So, we place a Titanium Implant.", p: 2 },
        { t: 18, text: "Titanium is bio-compatible. Your bone cells attach to it, locking it in place forever.", p: 3 },
        { t: 25, text: "Finally, we place the crown. You can now chew apples, steak, and smile with 100% confidence.", p: 4 }
      ],
      audio: "/audio/implants.mp3",
      category: "Surgery",
      tags: ['Implants', 'Biology']
    },
    {
      type: "audio",
      name: "The Instagram Trap",
      artist: "Veneer Ethics",
      description: "How to spot fake smiles vs. natural artistry.",
      component: <VeneerStory phase={phase} />,
      script: [
        { t: 0, text: "Have you seen teeth that look like white chewing gum? That is a bad veneer.", p: 0 },
        { t: 5, text: "Cheap veneers are monolithic blocks. They block light and look dead.", p: 1 },
        { t: 10, text: "We use Biomimetic Layering. First, a warm Dentin core for natural color.", p: 2 },
        { t: 16, text: "Then, a translucent Enamel shell. This allows light to pass through.", p: 3 },
        { t: 22, text: "The result? A smile that glows, reflects light, and looks like you were born with it.", p: 4 }
      ],
      audio: "/audio/ethics.mp3", 
      category: "Ethics",
      tags: ['Veneers', 'Truth']
    },
    {
      type: "audio",
      name: "The Heart-Mouth Loop",
      artist: "Systemic Risk",
      description: "Your mouth is the gateway to your bloodstream.",
      component: <HeartMouthStory phase={phase} />,
      script: [
        { t: 0, text: "Did you know gum disease can cause heart attacks? Here is the science.", p: 0 },
        { t: 5, text: "It starts in the gum pocket. Plaque bacteria multiply here daily.", p: 1 },
        { t: 12, text: "When gums bleed, a door opens. Bacteria enter your bloodstream directly.", p: 2 },
        { t: 18, text: "They travel to your heart, causing inflammation in the arteries and valves.", p: 3 },
        { t: 25, text: "Treating your gums isn't vanity. It is literally protecting your heart.", p: 3 }
      ],
      audio: "/audio/safety.mp3",
      category: "Health",
      tags: ['Wellness', 'Risk']
    },
    // ... Add other 4 tracks with similar structure ...
    // Placeholder for remaining tracks to keep code shorter for display, 
    // but in production, you would fill these out with scripts.
    {
      type: "journal",
      name: "Invisible Physics",
      artist: "Aligner Tech",
      description: "How plastic moves bone.",
      component: <ImplantStory phase={phase} />, // Placeholder visual
      script: [
        { t: 0, text: "How can clear plastic move bone? It's all about constant, gentle pressure.", p: 0 },
        { t: 5, text: "Braces pull teeth. Aligners push them. Pushing is often biologically faster.", p: 1 }
      ],
      audio: "/audio/ortho.mp3",
      category: "Ortho",
      tags: ['Physics', 'Aligners']
    },
    {
      type: "journal",
      name: "The 3-Year Warning",
      artist: "AI Diagnostics",
      description: "Seeing the invisible.",
      component: <ImplantStory phase={phase} />, // Placeholder visual
      script: [
        { t: 0, text: "Cavities don't appear overnight. They grow silently for years.", p: 0 },
        { t: 5, text: "Our AI Laser scans density. We find decay 3 years before an X-ray can.", p: 1 }
      ],
      audio: "/audio/ai.mp3", 
      category: "Technology",
      tags: ['AI', 'Laser']
    },
    {
      type: "journal",
      name: "Fluoride Chemistry",
      artist: "Prevention",
      description: "Rebuilding the lattice.",
      component: <ImplantStory phase={phase} />, // Placeholder visual
      script: [
        { t: 0, text: "Acid dissolves your enamel. Fluoride rebuilds it stronger than before.", p: 0 },
        { t: 5, text: "It turns Hydroxyapatite into Fluorapatite. Much harder to dissolve.", p: 1 }
      ],
      audio: "/audio/kids.mp3", 
      category: "Chemistry",
      tags: ['Safety', 'Science']
    },
    {
      type: "journal",
      name: "Biofilm Defense",
      artist: "Hygiene",
      description: "Why rinsing fails.",
      component: <ImplantStory phase={phase} />, // Placeholder visual
      script: [
        { t: 0, text: "Biofilm is not just food. It's a living city of bacteria with a shield.", p: 0 },
        { t: 5, text: "Water just bounces off. You need mechanical action to break the matrix.", p: 1 }
      ],
      audio: "/audio/safety.mp3", 
      category: "Hygiene",
      tags: ['Bacteria', 'Risk']
    }
  ];

  const currentTrack = playlist[currentTrackIndex];

  // --- NARRATIVE ENGINE ---
  useEffect(() => {
    // Reset state on track change
    setPhase(0);
    setStoryText("");
    
    const script = currentTrack.script;
    if (!script) return;

    // Start text sequence
    let timeouts: NodeJS.Timeout[] = [];
    
    script.forEach((step) => {
      const timeout = setTimeout(() => {
        setStoryText(step.text);
        setPhase(step.p);
      }, step.t * 1000);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [currentTrackIndex]);

  // --- AUDIO PLAYER ENGINE ---
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(playlist[0].audio);
      audioRef.current.volume = 0.25; 
    }
    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration) {
        setBarWidth(`${(audio.currentTime / audio.duration) * 100}%`);
      }
    };

    const handleEnded = () => handleNext();

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

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

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * audioRef.current.duration;
  };

  return (
    <section id="gallery" className="py-24 relative transition-colors duration-500 overflow-hidden bg-slate-50 dark:bg-[#0B1019]">
      <style jsx global>{wideCardStyles}</style>

      <div className="max-w-7xl mx-auto px-6 mb-16">
        <RevealOnScroll>
          <div className="flex flex-col items-center text-center">
             <div className="inline-flex items-center gap-2 text-blue-600 dark:text-cyan-400 font-bold tracking-[0.3em] text-[10px] uppercase mb-4 border border-blue-200 dark:border-blue-900 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/10">
                <Sparkles size={14} /> Clinical Intelligence
             </div>
             <h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-[0.85]">
                Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Console.</span>
             </h2>
             <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl font-medium leading-relaxed">
               Interactive simulations of surgical precision, biological ethics, and advanced diagnostics.
             </p>
          </div>
        </RevealOnScroll>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        <RevealOnScroll className="mb-24">
           <div className="unified-player-card group hover:shadow-2xl transition-shadow duration-500">
              
              {/* LEFT: VISUAL ENGINE */}
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
                  
                  {/* NARRATIVE OVERLAY BOX */}
                  <div className="narrative-box">
                     <div className="flex items-center gap-2 mb-2 text-blue-400 text-xs font-bold uppercase tracking-widest">
                        <MessageCircle size={14} /> Teacher Mode
                     </div>
                     <Typewriter text={storyText} key={storyText} speed={25} />
                  </div>
              </div>

              {/* RIGHT: CONTENT & CONTROLS */}
              <div className="player-content bg-white dark:bg-slate-900/50">
                  <div className="flex flex-col h-full justify-between">
                    
                    {/* Top Meta */}
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                <Bookmark size={14} className={['Warning', 'MythBuster'].includes(currentTrack.category) ? 'text-red-500' : 'text-blue-500'} /> 
                                {currentTrack.category}
                            </div>
                            <div className="text-[10px] font-mono text-slate-300 opacity-50 flex items-center gap-2">
                                <Clock size={10} /> 2 MIN LESSON
                            </div>
                        </div>

                        <h2 className="track-title text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 leading-[0.95]">
                            {currentTrack.name}
                        </h2>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                            {currentTrack.tags.map(t => (
                                <span key={t} className="text-[9px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 px-2 py-1 rounded-md uppercase tracking-wider">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
                            {currentTrack.description}
                        </p>
                    </div>

                    {/* Bottom Controls */}
                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5">
                        
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Activity size={12} className={isTimerPlaying ? "animate-pulse text-green-500" : "text-slate-600"} /> 
                                {isTimerPlaying ? "System Active" : "Paused"}
                            </span>
                        </div>

                        <div className="relative h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden mb-8 cursor-pointer group/bar w-full" onClick={handleSeek}>
                            <div className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-100 ease-linear group-hover/bar:bg-blue-500" style={{ width: barWidth }}></div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <button onClick={handlePrev} className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 dark:hover:text-white transition-all">
                                    <SkipBack size={18} />
                                </button>
                                
                                <button 
                                    onClick={togglePlay} 
                                    className="w-16 h-16 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all"
                                >
                                    {isTimerPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                                </button>
                                
                                <button onClick={handleNext} className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 dark:hover:text-white transition-all">
                                    <SkipForward size={18} />
                                </button>
                            </div>
                            
                            <div className="flex items-center gap-4">
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
           </div>
        </RevealOnScroll>

        <div className="text-center mt-16">
           <Link href="/gallery" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors group">
              View Complete Archives <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>

      </div>
    </section>
  );
};
