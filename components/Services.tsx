'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, useSpring, useMotionValue, animate, PanInfo } from 'framer-motion';
import { 
  Activity, Zap, Smile, Users, Search, Filter, Sparkles, 
  Shield, Microscope, HeartPulse, ScanLine, ArrowRight, MousePointer2 
} from 'lucide-react';
import { treatmentsData } from '@/data/treatments';

// --- HELPER: MAP CATEGORY TO COLOR ---
const getTheme = (category: string) => {
    switch(category) {
        case 'Surgery': return { from: '#0f172a', to: '#1e3a8a', accent: '#60A5FA', glow: 'rgba(96, 165, 250, 0.5)' };
        case 'Endodontics': return { from: '#2e1065', to: '#7e22ce', accent: '#C084FC', glow: 'rgba(192, 132, 252, 0.5)' };
        case 'Orthodontics': return { from: '#312e81', to: '#4f46e5', accent: '#818CF8', glow: 'rgba(129, 140, 248, 0.5)' };
        case 'Cosmetic': return { from: '#0891b2', to: '#06b6d4', accent: '#67E8F9', glow: 'rgba(103, 232, 249, 0.5)' };
        case 'Pediatrics': return { from: '#7c2d12', to: '#ea580c', accent: '#FB923C', glow: 'rgba(251, 146, 60, 0.5)' };
        default: return { from: '#1e293b', to: '#475569', accent: '#94A3B8', glow: 'rgba(148, 163, 184, 0.5)' };
    }
};

const getCategoryIcon = (category: string) => {
    switch(category) {
        case 'Surgery': return Activity;
        case 'Endodontics': return Microscope;
        case 'Orthodontics': return Smile;
        case 'Cosmetic': return Sparkles;
        case 'Pediatrics': return Users;
        default: return Zap;
    }
};

const Services = () => {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const [filter, setFilter] = useState('All');
    const [isDragging, setIsDragging] = useState(false);
    
    // --- DATA PREP ---
    const services = useMemo(() => Object.values(treatmentsData).map(t => ({
        ...t,
        theme: getTheme(t.category),
        Icon: getCategoryIcon(t.category)
    })), []);

    const filteredServices = useMemo(() => {
        if (filter === 'All') return [...services, ...services]; // Duplicate for infinite loop illusion
        return services.filter(s => s.category === filter);
    }, [filter, services]);

    const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];

    // --- ANIMATION CONTROLS ---
    const x = useMotionValue(0);
    const velocity = useRef(0.5); // Base scroll speed
    const frameRef = useRef(0);

    // Auto-scroll logic
    useEffect(() => {
        const loop = () => {
            if (!isDragging) {
                let newX = x.get() - velocity.current;
                
                // Infinite loop reset logic
                const contentWidth = filteredServices.length * 420; // Card width + gap
                if (newX <= -contentWidth / 2 && filter === 'All') {
                    newX = 0;
                }
                
                x.set(newX);
            }
            frameRef.current = requestAnimationFrame(loop);
        };
        loop();
        return () => cancelAnimationFrame(frameRef.current);
    }, [isDragging, filter, filteredServices.length]);

    const handleDragStart = () => setIsDragging(true);
    const handleDragEnd = () => {
        setIsDragging(false);
        // Add momentum snap logic here if desired
    };

    return (
        <section className="relative min-h-screen bg-[#020617] overflow-hidden flex flex-col justify-center py-20">
            
            {/* BACKGROUND EFFECTS */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

            {/* HEADER & FILTERS */}
            <div className="container mx-auto px-6 mb-16 relative z-20 text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 font-bold text-xs uppercase tracking-widest mb-6"
                >
                    <ScanLine size={14} /> Clinical Protocols v4.0
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                    Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Medicine.</span>
                </h2>

                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => { setFilter(cat); x.set(0); }}
                            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                                filter === cat 
                                ? 'bg-white text-black scale-105 shadow-xl' 
                                : 'bg-white/5 text-slate-400 hover:bg-white/10'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* THE SCANNER BEAM (Visual Anchor) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent z-10 pointer-events-none hidden md:block">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[800px] border-x border-blue-500/10 rounded-[4rem]"></div>
            </div>

            {/* INFINITE STREAM */}
            <div className="relative w-full h-[600px] flex items-center overflow-visible cursor-grab active:cursor-grabbing" ref={containerRef}>
                <motion.div 
                    className="flex gap-10 px-[50vw]"
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ left: -10000, right: 10000 }} // Infinite drag feel
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    {filteredServices.map((service, idx) => (
                        <ServiceCard key={`${service.id}-${idx}`} service={service} router={router} />
                    ))}
                </motion.div>
            </div>

            {/* FOOTER HINT */}
            <div className="absolute bottom-10 left-0 w-full text-center text-slate-500 text-xs font-bold uppercase tracking-widest flex justify-center items-center gap-2 animate-pulse">
                <MousePointer2 size={14} /> Drag to Explore
            </div>
        </section>
    );
};

// --- SUB-COMPONENT: HOLOGRAPHIC CARD ---
const ServiceCard = ({ service, router }: { service: any, router: any }) => {
    return (
        <div 
            className="group relative w-[400px] h-[550px] shrink-0 rounded-[3rem] p-1 bg-[#0B1019] border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl"
            onClick={() => router.push(`/treatments/${service.id}`)}
        >
            {/* Glow Effect on Hover */}
            <div 
                className="absolute inset-0 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                style={{ background: `radial-gradient(circle at center, ${service.theme.glow}, transparent 70%)` }}
            ></div>

            <div className="relative h-full w-full bg-[#0B1019] rounded-[2.8rem] overflow-hidden flex flex-col">
                {/* Image Area */}
                <div className="h-[280px] relative overflow-hidden">
                    <img 
                        src={service.heroImage} 
                        alt={service.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1019] via-transparent to-transparent"></div>
                    
                    {/* Floating Category Badge */}
                    <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">
                        {service.category}
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex flex-col flex-grow">
                    <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                        style={{ background: `${service.theme.accent}20`, color: service.theme.accent }}
                    >
                        <service.Icon size={24} />
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                        {service.title}
                    </h3>
                    
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                        {service.description}
                    </p>

                    {/* Reveal on Hover Features */}
                    <div className="mt-auto space-y-2 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                        {service.benefits.slice(0, 2).map((b: string, i: number) => (
                            <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wide">
                                <div className="w-1 h-1 rounded-full bg-white"></div> {b}
                            </div>
                        ))}
                    </div>

                    {/* Explore Button */}
                    <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em]" style={{ color: service.theme.accent }}>
                        Explore Protocol <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
