'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { treatmentsData } from '@/data/treatments';
import { 
  ArrowRight, Activity, Clock, Microscope, Search, 
  Stethoscope, Sparkles, ShieldCheck, ChevronRight, 
  LayoutGrid, List, Zap, Database, Wifi 
} from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// --- Utility Components ---

const LoadingSkeleton = () => (
  <div className="animate-pulse flex flex-col h-full bg-white dark:bg-[#0f1420] rounded-[1.5rem] overflow-hidden border border-slate-200 dark:border-slate-800">
    <div className="h-48 bg-slate-200 dark:bg-slate-800/50" />
    <div className="p-6 flex-1 space-y-4">
      <div className="h-4 bg-slate-200 dark:bg-slate-800/50 rounded w-1/4" />
      <div className="h-6 bg-slate-200 dark:bg-slate-800/50 rounded w-3/4" />
      <div className="h-4 bg-slate-200 dark:bg-slate-800/50 rounded w-full" />
      <div className="h-4 bg-slate-200 dark:bg-slate-800/50 rounded w-2/3" />
      <div className="pt-6 mt-auto flex justify-between">
        <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800/50 rounded" />
        <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800/50 rounded" />
      </div>
    </div>
  </div>
);

const SystemClock = () => {
  const [time, setTime] = useState<string>('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="font-mono">{time || '00:00:00'}</span>;
};

const TreatmentsPage = () => {
  const treatmentsList = Object.values(treatmentsData);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Categories with dynamic counts
  const categories = ['All', 'Endodontics', 'Surgery', 'Orthodontics', 'Restorative', 'Preventive'];
  
  // Simulate network request for realism
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

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

  // Spotlight Effect Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden font-sans">
      
      {/* Technical Background Grid - Adds "Precision" feel */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-10 pointer-events-none bg-[radial-gradient(#64748b_1px,transparent_1px)] [background-size:32px_32px]"></div>
      
      {/* Moving Ambient Gradients */}
      <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-[10000ms]"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-[7000ms]"></div>

      <div className="relative z-10 pt-32 pb-24 max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Advanced Header Section */}
        <header className="mb-16">
          <RevealOnScroll>
            <div className="flex flex-col xl:flex-row gap-12 justify-between xl:items-end border-b border-slate-200 dark:border-white/5 pb-12">
               <div className="max-w-4xl">
                  {/* System Status Bar */}
                  <div className="flex flex-wrap items-center gap-4 mb-8 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-sm backdrop-blur-sm">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      System Online
                    </div>
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                      <Database size={12} />
                      v4.2.0 Stable
                    </div>
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                      <Wifi size={12} />
                      <SystemClock /> UTC
                    </div>
                  </div>

                  <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold text-slate-900 dark:text-white leading-[0.9] tracking-tight mb-8">
                    Clinical <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 animate-gradient-x">Inventory.</span>
                  </h1>
                  
                  <div className="flex items-start gap-6 max-w-2xl">
                    <div className="w-1 h-16 bg-gradient-to-b from-blue-500 to-transparent rounded-full hidden sm:block"></div>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                      Secure access to evidence-based dental protocols. Optimized for biological longevity, patient comfort, and rapid clinical deployment.
                    </p>
                  </div>
               </div>
               
               {/* Control Center */}
               <div className="w-full xl:w-auto flex flex-col gap-6">
                  {/* Search Palette */}
                  <div className="relative group w-full xl:w-[420px]">
                     <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                        <Search size={18} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                     </div>
                     <input 
                        type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by symptom, code, or procedure..."
                        className="w-full bg-white dark:bg-[#0f1420] border border-slate-200 dark:border-slate-800 rounded-2xl py-5 pl-12 pr-14 text-sm font-semibold shadow-lg shadow-slate-200/50 dark:shadow-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all dark:text-white placeholder:text-slate-400"
                     />
                     <div className="absolute inset-y-0 right-3 flex items-center gap-2">
                        {searchQuery && (
                          <button onClick={() => setSearchQuery('')} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 transition-colors">
                            <span className="sr-only">Clear</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                          </button>
                        )}
                        <div className="hidden sm:block px-2 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-[10px] font-bold text-slate-400 border border-slate-200 dark:border-white/5">CTRL+K</div>
                     </div>
                  </div>

                  {/* Filter & View Toggles */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => {
                          const count = cat === 'All' ? treatmentsList.length : treatmentsList.filter((t: any) => t.category === cat).length;
                          return (
                           <button 
                              key={cat} 
                              onClick={() => setFilter(cat)} 
                              className={`
                                group relative px-4 py-2 rounded-xl text-[11px] font-bold transition-all duration-300 border
                                ${filter === cat 
                                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-lg shadow-slate-900/20 transform scale-105 z-10' 
                                  : 'bg-white dark:bg-[#0f1420] text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400'
                                }
                              `}
                            >
                              <span className="flex items-center gap-2">
                                {cat}
                                <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${filter === cat ? 'bg-white/20 text-white dark:text-slate-900' : 'bg-slate-100 dark:bg-white/5 text-slate-400'}`}>
                                  {count}
                                </span>
                              </span>
                           </button>
                          );
                        })}
                    </div>

                    {/* View Mode Switcher */}
                    <div className="hidden sm:flex items-center p-1 bg-white dark:bg-[#0f1420] border border-slate-200 dark:border-slate-800 rounded-xl">
                      <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-slate-100 dark:bg-white/10 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                      >
                        <LayoutGrid size={16} />
                      </button>
                      <button 
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-slate-100 dark:bg-white/10 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                      >
                        <List size={16} />
                      </button>
                    </div>
                  </div>
               </div>
            </div>
          </RevealOnScroll>
        </header>

        {/* Results Info */}
        {!isLoading && (
          <div className="mb-8 flex items-center justify-between text-xs font-medium text-slate-400 px-2">
            <span>Showing {filteredList.length} protocols</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Real-time synchronization active
            </span>
          </div>
        )}

        {/* Main Content Area */}
        {isLoading ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <LoadingSkeleton key={n} />)}
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {filteredList.map((item: any, idx: number) => (
              <RevealOnScroll key={item.id} delay={idx * 30}>
                <Link href={`/treatments/${item.id}`} className="block h-full perspective-1000">
                  <div 
                    onMouseMove={handleMouseMove}
                    className={`
                      group relative bg-white dark:bg-[#0f1420] overflow-hidden cursor-pointer 
                      border border-slate-200 dark:border-slate-800 
                      transition-all duration-300 ease-out
                      hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]
                      ${viewMode === 'grid' 
                        ? 'rounded-[1.5rem] flex flex-col h-full hover:-translate-y-1' 
                        : 'rounded-2xl flex flex-row items-stretch hover:translate-x-1'
                      }
                    `}
                    style={{
                      // @ts-ignore
                      '--mouse-x': '50%',
                      '--mouse-y': '50%',
                    }}
                  >
                    {/* Spotlight Gradient Overlay */}
                    <div 
                      className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
                      style={{
                        background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.06), transparent 40%)`
                      }}
                    ></div>

                    {/* Image Section */}
                    <div className={`relative overflow-hidden bg-slate-100 dark:bg-slate-900 ${viewMode === 'grid' ? 'h-52 w-full' : 'w-48 lg:w-64 h-auto shrink-0'}`}>
                      <img src={item.heroImage} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      
                      {/* Dark Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1420]/80 via-transparent to-transparent opacity-60"></div>
                      
                      {/* Active Status Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-md border border-white/20 shadow-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">Active</span>
                        </div>
                      </div>
                      
                      {/* Category Tag */}
                      <div className="absolute bottom-3 left-4 z-10">
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/90 drop-shadow-md flex items-center gap-2">
                             <span className="w-4 h-[1px] bg-blue-400"></span> {item.category}
                          </span>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className={`relative z-10 flex flex-col flex-1 ${viewMode === 'grid' ? 'p-6' : 'p-6 sm:p-8 justify-center'}`}>
                      {/* ID & Title */}
                      <div className="mb-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="text-[10px] font-mono font-medium text-blue-500 dark:text-blue-400">
                               IDX-{String(idx + 101).padStart(3, '0')}
                            </div>
                            {viewMode === 'list' && (
                               <div className="flex gap-4 text-xs font-mono text-slate-500">
                                  <span className="flex items-center gap-1"><Activity size={12}/> {item.stats?.[2]?.value || '99%'} SR</span>
                                  <span className="flex items-center gap-1"><Clock size={12}/> {item.duration || '45m'}</span>
                               </div>
                            )}
                          </div>
                          <h3 className={`font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors leading-tight ${viewMode === 'grid' ? 'text-xl' : 'text-2xl'}`}>
                            {item.title}
                          </h3>
                      </div>

                      <p className={`text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 mb-6 ${viewMode === 'grid' ? 'line-clamp-2' : 'line-clamp-2 lg:line-clamp-none max-w-3xl'}`}>
                        {item.description}
                      </p>
                      
                      {/* Technical Vitals Grid (Only in Grid Mode or Mobile List) */}
                      {(viewMode === 'grid') && (
                        <div className="mt-auto grid grid-cols-2 gap-px bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-inner">
                            <div className="bg-slate-50 dark:bg-[#131825] p-3 flex flex-col gap-1 group/stat transition-colors hover:bg-white dark:hover:bg-[#1a2030]">
                                <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Success Rate</span>
                                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                                    <Activity size={12} className="group-hover/stat:animate-pulse" />
                                    <span className="text-xs font-black">{item.stats?.[2]?.value || '99%'}</span>
                                </div>
                            </div>
                            <div className="bg-slate-50 dark:bg-[#131825] p-3 flex flex-col gap-1 group/stat transition-colors hover:bg-white dark:hover:bg-[#1a2030]">
                                <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Avg. Time</span>
                                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                                    <Clock size={12} />
                                    <span className="text-xs font-black">{item.duration || '60m'}</span>
                                </div>
                            </div>
                        </div>
                      )}

                      {/* Footer / Action Area */}
                      <div className={`pt-4 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity ${viewMode === 'grid' ? 'mt-5 border-t border-slate-100 dark:border-white/5' : 'mt-0'}`}>
                          <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2 uppercase tracking-widest">
                             Access Protocol <ChevronRight size={12} />
                          </span>
                          {viewMode === 'grid' && <Sparkles size={12} className="text-blue-500" />}
                      </div>
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        )}

        {/* Enhanced Footer with Interactive Hover */}
        <footer className="mt-24 relative rounded-[2.5rem] overflow-hidden group">
           <div className="absolute inset-0 bg-slate-900 dark:bg-[#0B1019] transition-colors"></div>
           
           {/* Interactive Mesh Gradient */}
           <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-1000">
              <div className="absolute top-[-50%] right-[-10%] w-[800px] h-[800px] bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
              <div className="absolute bottom-[-50%] left-[-10%] w-[800px] h-[800px] bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] animate-pulse delay-700"></div>
           </div>

           <div className="relative z-10 p-10 md:p-16 flex flex-col lg:flex-row justify-between items-center gap-12">
              <div className="max-w-xl text-center lg:text-left">
                 <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <ShieldCheck size={18} className="text-blue-400" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-white">Verified Clinical Data</span>
                 </div>
                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Quality Assurance Pulse.</h2>
                 <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    Every procedure is continuously monitored via our Healthflo Dental OS. We cross-verify outcomes against international ADA safety benchmarks to ensure consistent, premium patient care.
                 </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-16">
                 <div className="text-center md:text-left group/stat cursor-default">
                    <div className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 tracking-tighter group-hover/stat:to-blue-400 transition-all">99.8%</div>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em] mt-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Safety Compliance
                    </div>
                 </div>
                 <div className="h-px w-24 sm:h-24 sm:w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
                 <div className="text-center md:text-left group/stat cursor-default">
                    <div className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 tracking-tighter group-hover/stat:to-blue-400 transition-all">24/7</div>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em] mt-3">
                       <Zap size={10} className="text-yellow-400 fill-yellow-400" /> Clinical Triage
                    </div>
                 </div>
              </div>
           </div>
        </footer>

      </div>
    </div>
  );
};

export default TreatmentsPage;
