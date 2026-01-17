'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, ScanLine, Microscope, ArrowUpRight, Layers } from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import PodcastJournal from '@/components/Gallery'; // Importing the Mini-Player Component

const GalleryPage = () => {
  const cases = [
    { 
        title: "Full Mouth Reconstruction", 
        cat: "Surgery", 
        id: "01",
        img: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=800", 
        tags: ["Zirconia", "Implants", "Grafting"] 
    },
    { 
        title: "Digital Smile Design", 
        cat: "Cosmetic", 
        id: "02",
        img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f72?auto=format&fit=crop&q=80&w=800", 
        tags: ["Veneers", "DSD", "Laser Prep"] 
    },
    { 
        title: "Invisible Alignment", 
        cat: "Ortho", 
        id: "03",
        img: "https://images.unsplash.com/photo-1595867372361-597621c258d4?auto=format&fit=crop&q=80&w=800", 
        tags: ["Aligners", "iTero", "Biomechanics"] 
    },
    { 
        title: "Microscopic Root Canal", 
        cat: "Endo", 
        id: "04",
        img: "https://images.unsplash.com/photo-1609840114035-1c29046a83ea?auto=format&fit=crop&q=80&w=800", 
        tags: ["Zeiss", "Single Visit", "Ceramic Seal"] 
    },
    { 
        title: "Pediatric Rehabilitation", 
        cat: "Pediatrics", 
        id: "05",
        img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800", 
        tags: ["Zirconia Crowns", "Space Maintainers"] 
    },
    { 
        title: "Laser Gum Depigmentation", 
        cat: "Laser", 
        id: "06",
        img: "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?auto=format&fit=crop&q=80&w=800", 
        tags: ["Biolase", "Pink Aesthetics", "Painless"] 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] font-sans transition-colors duration-500 overflow-x-hidden pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- NAV --- */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors uppercase text-[10px] font-black tracking-[0.3em] mb-16 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Back Home
        </Link>
        
        {/* --- HERO HEADER --- */}
        <header className="mb-32">
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                <div>
                    <span className="text-blue-600 dark:text-cyan-400 font-bold tracking-widest text-xs uppercase mb-4 block">
                        Noble Dental Care • Hyderabad
                    </span>
                    <h1 className="text-6xl md:text-[8rem] font-black text-slate-900 dark:text-white leading-[0.8] tracking-tighter mb-8">
                    Clinical <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Archives.</span>
                    </h1>
                </div>
                <p className="text-xl text-slate-500 dark:text-slate-400 max-w-md font-medium leading-relaxed mb-4">
                    A curated visual documentation of surgical precision, aesthetic transformations, and digital workflows.
                </p>
            </div>
            
            {/* Filter Chips */}
            <div className="flex gap-3 mt-12 overflow-x-auto pb-4 scrollbar-hide">
                {["All Cases", "Implants", "Smile Design", "Ortho", "Kids", "Laser"].map((f, i) => (
                  <button key={f} className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${i === 0 ? 'bg-slate-900 text-white dark:bg-white dark:text-black' : 'border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5'}`}>
                      {f}
                  </button>
                ))}
            </div>
          </RevealOnScroll>
        </header>

        {/* --- SECTION 1: VISUAL CASE GRID --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40">
           {cases.map((c, i) => (
             <RevealOnScroll key={i} delay={i * 100}>
                <div className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-white dark:bg-[#0B1019] shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-white/5 cursor-pointer">
                   
                   {/* Image */}
                   <div className="absolute inset-0 m-2 rounded-[2rem] overflow-hidden">
                       <img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                   </div>

                   {/* Floating ID */}
                   <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center text-white font-mono text-xs z-10">
                       {c.id}
                   </div>

                   {/* Content */}
                   <div className="absolute bottom-8 left-8 right-8 text-white z-10">
                      <div className="flex items-center gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                          <ScanLine size={14} className="text-blue-400"/>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">{c.cat}</span>
                      </div>
                      
                      <h3 className="text-2xl font-black tracking-tight leading-none mb-4 group-hover:text-blue-200 transition-colors">{c.title}</h3>
                      
                      <div className="flex flex-wrap gap-2">
                         {c.tags.map(t => (
                             <span key={t} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-[9px] font-bold uppercase tracking-wide">
                                 {t}
                             </span>
                         ))}
                      </div>
                   </div>

                   {/* Hover Icon */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 border border-white/20">
                       <ArrowUpRight size={32} className="text-white" />
                   </div>
                </div>
             </RevealOnScroll>
           ))}
        </div>

        {/* --- SECTION 2: CINEMATIC FILM (Workflow) --- */}
        <section className="mb-40">
            <RevealOnScroll>
                <div className="relative rounded-[3rem] overflow-hidden h-[600px] md:h-[800px] group">
                    <video 
                        src="https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4" 
                        autoPlay loop muted playsInline 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/50 to-transparent"></div>
                    
                    <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-24">
                        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30 mb-8 animate-pulse">
                            <Play size={24} fill="currentColor" className="text-white ml-1" />
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 max-w-4xl">
                            Precision <br/> In Motion.
                        </h2>
                        <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-slate-300">
                            <div className="max-w-xs">
                                <div className="flex items-center gap-3 mb-2 text-white"><ScanLine size={20}/><span className="text-xs font-black uppercase tracking-widest">3D Navigation</span></div>
                                <p className="text-sm leading-relaxed opacity-70">Guided implant placement using surgical templates for 0.1mm accuracy.</p>
                            </div>
                            <div className="max-w-xs">
                                <div className="flex items-center gap-3 mb-2 text-white"><Microscope size={20}/><span className="text-xs font-black uppercase tracking-widest">Zeiss Optics</span></div>
                                <p className="text-sm leading-relaxed opacity-70">25x magnification for root canals, ensuring no canal is missed.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>
        </section>

        {/* --- SECTION 3: THE PODCAST & JOURNAL (Integrated) --- */}
        <div className="border-t border-slate-200 dark:border-white/10 pt-24">
            <PodcastJournal /> 
        </div>

      </div>
    </div>
  );
};

export default GalleryPage;
