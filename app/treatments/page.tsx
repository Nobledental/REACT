// app/treatments/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { treatmentsData } from '@/data/treatments';
import { ArrowRight, Activity, Clock, Microscope, Search, Stethoscope } from 'lucide-react';
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
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Advanced Clinical Header */}
        <header className="mb-24">
          <RevealOnScroll>
            <div className="grid lg:grid-cols-2 gap-16 items-end">
               <div>
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 dark:text-cyan-400 font-black text-[10px] uppercase tracking-[0.4em] mb-8">
                    <Stethoscope size={14}/> Surgical Catalog v4.0
                  </div>
                  <h1 className="text-6xl md:text-[7rem] font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter mb-8">
                    Dental <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Protocols.</span>
                  </h1>
                  <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl font-medium leading-tight">
                    Evidence-based procedures designed for biological longevity and patient comfort.
                  </p>
               </div>
               
               <div className="space-y-8">
                  <div className="relative group">
                     <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                     <input 
                        type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Describe symptoms (e.g. 'Toothache')..."
                        className="w-full bg-white dark:bg-[#151b2b] border border-slate-200 dark:border-white/5 rounded-[3rem] py-5 pl-14 pr-8 text-base font-bold shadow-xl focus:ring-4 focus:ring-blue-600/10 outline-none transition-all dark:text-white"
                     />
                  </div>
                  <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                         <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${filter === cat ? 'bg-blue-600 text-white border-blue-600 shadow-xl' : 'bg-white dark:bg-white/5 text-slate-500 border-slate-200 dark:border-white/10 hover:border-blue-600'}`}>{cat}</button>
                      ))}
                  </div>
               </div>
            </div>
          </RevealOnScroll>
        </header>

        {/* Treatment Grid - UPDATED FOR COMPACTNESS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredList.map((item: any, idx: number) => (
            <RevealOnScroll key={item.id} delay={idx * 50}>
              <Link href={`/treatments/${item.id}`} className="block h-full">
                <div 
                  className="group relative bg-white dark:bg-[#0B1019] rounded-3xl overflow-hidden cursor-pointer border border-slate-100 dark:border-white/5 hover:border-blue-500/40 transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col h-full hover:-translate-y-2"
                >
                  {/* Compact Image Height */}
                  <div className="relative h-52 overflow-hidden">
                    <img src={item.heroImage} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1019] via-transparent to-transparent opacity-60"></div>
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[9px] font-black uppercase tracking-widest text-white">{item.category}</div>
                  </div>
                  
                  {/* Reduced Padding and Font Sizes */}
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                           <Activity size={10}/> {item.stats?.[2]?.value || '99%'} Success
                        </div>
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1.5"><Clock size={10}/> Fast Recovery</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors tracking-tight leading-tight">{item.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6 flex-1 line-clamp-3">{item.description}</p>
                    
                    <div className="pt-6 border-t border-slate-50 dark:border-white/5 mt-auto flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-cyan-400 flex items-center gap-2">View Protocol <ArrowRight size={12}/></span>
                        <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all"><Microscope size={14}/></div>
                    </div>
                  </div>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        {/* Clinical Disclaimer */}
        <footer className="mt-24 p-10 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] group-hover:scale-110 transition-transform"></div>
           <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                 <h2 className="text-3xl font-black mb-4 tracking-tight">Quality Assurance Pulse.</h2>
                 <p className="text-lg text-slate-400 leading-relaxed font-medium">Every procedure is logged via our Healthflo Dental OS and cross-verified against international ADA safety benchmarks.</p>
              </div>
              <div className="flex gap-10">
                 <div>
                    <div className="text-4xl font-black text-blue-400 mb-2">99.8%</div>
                    <div className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Safety Compliance</div>
                 </div>
                 <div className="h-16 w-px bg-white/10"></div>
                 <div>
                    <div className="text-4xl font-black text-blue-400 mb-2">24/7</div>
                    <div className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Clinical Triage</div>
                 </div>
              </div>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default TreatmentsPage;
