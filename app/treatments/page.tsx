'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { treatmentsData } from '@/data/treatments';
import { ArrowRight, Activity, Clock, Microscope, Search, Stethoscope, Sparkles, ShieldCheck, ChevronRight } from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

const TreatmentsPage = () => {
  const treatmentsList = Object.values(treatmentsData);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Endodontics', 'Surgery', 'Orthodontics', 'Restorative', 'Preventive'];
  
  const filteredList = useMemo(() => {
    return treatmentsList.filter((item: any) => {
      const matchesFilter = filter === 'All' || item.category === filter;
      const lowerQuery = searchQuery.toLowerCase().trim();
      const matchesSearch = !lowerQuery || 
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        (item.keywords && item.keywords.some((k: string) => k.toLowerCase().includes(lowerQuery)));
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery, treatmentsList]);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden">
      
      {/* Technical Background Grid - Adds "Precision" feel */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-10 pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      {/* Gradient Blobs for Depth */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 pt-32 pb-24 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Header Section */}
        <header className="mb-20">
          <RevealOnScroll>
            <div className="flex flex-col lg:flex-row gap-12 lg:items-end justify-between">
               <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-6 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                    System Operational
                  </div>
                  <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold text-slate-900 dark:text-white leading-[0.9] tracking-tight mb-6">
                    Clinical <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Inventory.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-xl font-medium leading-relaxed">
                    A curated index of evidence-based dental protocols, optimized for biological longevity and patient comfort.
                  </p>
               </div>
               
               {/* Floating Control Panel */}
               <div className="w-full lg:w-auto flex flex-col gap-6">
                  <div className="relative group min-w-[320px]">
                     <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <Search size={18} className="text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                     </div>
                     <input 
                        type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search protocols or symptoms..."
                        className="w-full bg-white/80 dark:bg-[#151b2b]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-semibold shadow-lg shadow-slate-200/50 dark:shadow-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all dark:text-white"
                     />
                     <div className="absolute inset-y-0 right-3 flex items-center">
                        <div className="px-2 py-1 rounded bg-slate-100 dark:bg-white/10 text-[10px] font-bold text-slate-400 border border-slate-200 dark:border-white/5">CMD+K</div>
                     </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                         <button 
                            key={cat} 
                            onClick={() => setFilter(cat)} 
                            className={`
                              relative px-5 py-2.5 rounded-xl text-[11px] font-bold transition-all duration-300
                              ${filter === cat 
                                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-slate-900/20 scale-105' 
                                : 'bg-white dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white'
                              }
                            `}
                          >
                            {cat}
                         </button>
                      ))}
                  </div>
               </div>
            </div>
          </RevealOnScroll>
        </header>

        {/* Treatment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredList.map((item: any, idx: number) => (
            <RevealOnScroll key={item.id} delay={idx * 50}>
              <Link href={`/treatments/${item.id}`} className="block h-full">
                <div 
                  className="group relative bg-white dark:bg-[#0f1420] rounded-[1.5rem] overflow-hidden cursor-pointer border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] flex flex-col h-full hover:-translate-y-1"
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img src={item.heroImage} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    
                    {/* Dark Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1420] via-transparent to-transparent opacity-40"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-md border border-white/20 shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">Active</span>
                      </div>
                    </div>
                    
                    {/* Category Tag */}
                    <div className="absolute bottom-3 left-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/90 drop-shadow-md">{item.category}</span>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    {/* ID & Title */}
                    <div className="mb-4">
                        <div className="text-[10px] font-mono font-medium text-blue-500 mb-1">PRTCL-{idx + 101}</div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors leading-tight">{item.title}</h3>
                    </div>

                    <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 mb-6 line-clamp-2">{item.description}</p>
                    
                    {/* Technical Vitals Grid */}
                    <div className="mt-auto grid grid-cols-2 gap-px bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
                        <div className="bg-slate-50 dark:bg-[#131825] p-3 flex flex-col gap-1 group/stat">
                            <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Success Rate</span>
                            <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                                <Activity size={12} className="group-hover/stat:animate-pulse" />
                                <span className="text-xs font-black">{item.stats?.[2]?.value || '99%'}</span>
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-[#131825] p-3 flex flex-col gap-1">
                            <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Downtime</span>
                            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                                <Clock size={12} />
                                <span className="text-xs font-black">Minimal</span>
                            </div>
                        </div>
                    </div>

                    {/* View Action */}
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                           View Details <ChevronRight size={12} />
                        </span>
                        <Sparkles size={12} className="text-blue-500" />
                    </div>
                  </div>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        {/* Enhanced Footer with Glassmorphism */}
        <footer className="mt-20 relative rounded-3xl overflow-hidden">
           <div className="absolute inset-0 bg-slate-900 dark:bg-[#0B1019]"></div>
           {/* Animated Mesh Gradient Background */}
           <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[100px]"></div>
           </div>

           <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="max-w-xl">
                 <div className="flex items-center gap-3 mb-4 text-blue-400">
                    <ShieldCheck size={24} />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Verified Protocols</span>
                 </div>
                 <h2 className="text-3xl font-bold text-white mb-4">Quality Assurance Pulse.</h2>
                 <p className="text-slate-400 text-sm leading-relaxed">
                    Every procedure is logged via our Healthflo Dental OS and cross-verified against international ADA safety benchmarks to ensure consistent, premium outcomes.
                 </p>
              </div>
              
              <div className="flex items-center gap-8 md:gap-16">
                 <div className="text-center md:text-left">
                    <div className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tight">99.8%</div>
                    <div className="text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em] mt-2">Safety Compliance</div>
                 </div>
                 <div className="h-12 w-px bg-white/10 hidden md:block"></div>
                 <div className="text-center md:text-left">
                    <div className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tight">24/7</div>
                    <div className="text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em] mt-2">Clinical Triage</div>
                 </div>
              </div>
           </div>
        </footer>

      </div>
    </div>
  );
};

export default TreatmentsPage;
