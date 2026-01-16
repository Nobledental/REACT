'use client';

import React, { useState, useMemo } from 'react';
// We will create this data file next
import { treatmentsData } from '@/data/treatments';
import { ArrowRight, Activity, Search, Stethoscope, Clock, Microscope } from 'lucide-react';
import Link from 'next/link';

// Simple Reveal Component since we don't have the original RevealOnScroll yet
const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <div className="animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
    {children}
  </div>
);

export default function TreatmentsPage() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Fallback if data is missing (prevents crash before you add data/treatments.ts)
  const data = treatmentsData || {};
  const treatmentsList = Object.values(data);
  
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
        
        {/* Header */}
        <header className="mb-24">
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-16 items-end">
               <div>
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 dark:text-cyan-400 font-black text-[10px] uppercase tracking-[0.4em] mb-8">
                    <Stethoscope size={14}/> Surgical Catalog v4.0
                  </div>
                  <h1 className="text-6xl md:text-[9rem] font-black text-slate-900 dark:text-white leading-[0.8] tracking-tighter mb-10">
                    Dental <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Protocols.</span>
                  </h1>
                  <p className="text-2xl text-slate-500 dark:text-slate-400 max-w-2xl font-medium leading-tight">
                    Evidence-based procedures designed for biological longevity and patient comfort.
                  </p>
               </div>
               
               <div className="space-y-8">
                  <div className="relative group">
                     <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                     <input 
                        type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Describe symptoms (e.g. 'Toothache at night')..."
                        className="w-full bg-white dark:bg-[#151b2b] border border-slate-200 dark:border-white/5 rounded-[3rem] py-7 pl-16 pr-8 text-lg font-bold shadow-xl focus:ring-4 focus:ring-blue-600/10 outline-none transition-all dark:text-white"
                     />
                  </div>
                  <div className="flex flex-wrap gap-2">
                     {categories.map(cat => (
                        <button key={cat} onClick={() => setFilter(cat)} className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${filter === cat ? 'bg-blue-600 text-white border-blue-600 shadow-xl' : 'bg-white dark:bg-white/5 text-slate-500 border-slate-200 dark:border-white/10 hover:border-blue-600'}`}>{cat}</button>
                     ))}
                  </div>
               </div>
            </div>
          </Reveal>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredList.map((item: any, idx: number) => (
            <Reveal key={item.id} delay={idx * 50}>
              <Link href={`/treatments/${item.id}`} className="block h-full">
                <div 
                  className="group relative bg-white dark:bg-[#0B1019] rounded-[4rem] overflow-hidden cursor-pointer border border-slate-100 dark:border-white/5 hover:border-blue-500/40 transition-all duration-700 shadow-sm hover:shadow-2xl flex flex-col h-full hover:-translate-y-4"
                >
                  <div className="relative h-96 overflow-hidden">
                    {/* Image Fallback included */}
                    <img 
                      src={item.heroImage || 'https://via.placeholder.com/800'} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1019] via-transparent to-transparent opacity-80"></div>
                    <div className="absolute top-10 left-10 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-white">{item.category}</div>
                  </div>
                  
                  <div className="p-12 flex flex-col flex-1">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                          <Activity size={12}/> Success
                       </div>
                       <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2"><Clock size={12}/> Fast Recovery</span>
                    </div>
                    <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 group-hover:text-blue-600 transition-colors tracking-tighter leading-none">{item.title}</h3>
                    <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10 flex-1 line-clamp-3">{item.description}</p>
                    
                    <div className="pt-10 border-t border-slate-50 dark:border-white/5 mt-auto flex justify-between items-center">
                       <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-cyan-400 flex items-center gap-2">Explore Logic <ArrowRight size={14}/></span>
                       <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all"><Microscope size={20}/></div>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
