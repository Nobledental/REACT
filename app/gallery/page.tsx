'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, ScanLine, Microscope } from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import Gallery from '@/components/Gallery'; // <--- The Wide Podcast/Journal Player

const GalleryPage = () => {
  const cases = [
    { title: "Full Mouth Reconstruction", cat: "Surgery", img: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=800", tags: ["Zirconia", "Implants"] },
    { title: "Digital Smile Design", cat: "Cosmetic", img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f72?auto=format&fit=crop&q=80&w=800", tags: ["Veneers", "DSD"] },
    { title: "Invisible Alignment", cat: "Ortho", img: "https://images.unsplash.com/photo-1595867372361-597621c258d4?auto=format&fit=crop&q=80&w=800", tags: ["Aligners", "iTero"] }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pb-24 font-sans transition-colors duration-500 overflow-x-hidden pt-32">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- NAVIGATION --- */}
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors uppercase text-[10px] font-black tracking-[0.3em] mb-12">
            <ArrowLeft size={16}/> Back Home
        </Link>
        
        {/* --- HEADER --- */}
        <header className="mb-24">
          <RevealOnScroll>
            <h1 className="text-6xl md:text-[10rem] font-black text-slate-900 dark:text-white leading-[0.8] tracking-tighter mb-12">
              Clinical <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Archives.</span>
            </h1>
            <p className="text-3xl text-slate-500 dark:text-slate-400 max-w-4xl font-medium leading-tight mb-16">
              A curated visual documentation of surgical precision and aesthetic transformations.
            </p>
            <div className="flex gap-4">
               {["All Cases", "Implants", "Smile Design", "Ortho"].map(f => (
                 <button key={f} className="px-6 py-2 rounded-full border border-slate-200 dark:border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">{f}</button>
               ))}
            </div>
          </RevealOnScroll>
        </header>

        {/* --- YOUR ORIGINAL GRID --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-40">
           {cases.map((c, i) => (
             <RevealOnScroll key={i} delay={i * 100}>
                <div className="group relative aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/10 cursor-zoom-in">
                   <img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                   <div className="absolute bottom-10 left-10 text-white">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-4 block">{c.cat}</span>
                      <h3 className="text-3xl font-black tracking-tight leading-none mb-6">{c.title}</h3>
                      <div className="flex gap-2">
                         {c.tags.map(t => <span key={t} className="px-3 py-1 bg-white/10 backdrop-blur rounded text-[8px] font-black uppercase">{t}</span>)}
                      </div>
                   </div>
                </div>
             </RevealOnScroll>
           ))}
        </div>

        {/* --- THE NEW PODCAST PLAYER (Added Here) --- */}
        <div className="mb-40">
            <Gallery /> 
        </div>

        {/* --- CINEMATIC SECTION --- */}
        <section className="bg-slate-900 rounded-[5rem] overflow-hidden p-12 md:p-32 text-white relative mb-40 shadow-2xl">
           <div className="absolute inset-0 opacity-20"><img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Surgical Film" /></div>
           <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center shadow-2xl mb-12 animate-pulse"><Play size={32} fill="currentColor" /></div>
              <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">The Clinical <br/> Workflow Film.</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium mb-12">Witness the seamless integration of AI diagnostics, 3D scanning, and microsurgery in our Hyderabad facility.</p>
              <div className="flex gap-10">
                 <div className="flex items-center gap-3"><ScanLine size={24} className="text-blue-500" /><span className="text-xs font-black uppercase tracking-widest">3D Navigation</span></div>
                 <div className="flex items-center gap-3"><Microscope size={24} className="text-blue-500" /><span className="text-xs font-black uppercase tracking-widest">Zeiss Precision</span></div>
              </div>
           </div>
        </section>

        <div className="text-center">
           <Link href="/" className="px-12 py-5 bg-blue-600 text-white rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-all">Exit Archives</Link>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
