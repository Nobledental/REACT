'use client';

import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Activity, Zap, Smile, Users, Search, Filter, Sparkles, 
  Shield, Microscope, HeartPulse, ScanLine, ArrowRight, 
  MousePointer2, Ruler, Cpu
} from 'lucide-react';
import { treatmentsData } from '@/data/treatments';

// --- VISUAL STYLES & ANIMATIONS ---
// We inject this CSS to handle the complex clipping logic efficiently
const cssStyles = `
  .service-stream-container {
    perspective: 1000px;
    overflow-x: hidden;
  }

  .stream-track {
    display: flex;
    gap: 40px;
    width: max-content;
    padding: 0 50vw; /* Center the first card */
    cursor: grab;
    touch-action: pan-x;
  }
  
  .stream-track:active {
    cursor: grabbing;
  }

  /* --- THE MAGIC CARD --- */
  .holo-card-wrapper {
    position: relative;
    width: 380px;
    height: 520px;
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }

  /* Layer 1: The "Aesthetic" Shell (Visible by default) */
  .card-shell {
    position: absolute;
    inset: 0;
    border-radius: 40px;
    background: #0f172a; /* Slate 900 */
    border: 1px solid rgba(255,255,255,0.1);
    overflow: hidden;
    z-index: 2;
    /* The clipping magic happens here via JS variables */
    clip-path: polygon(
      0% 0%, 
      var(--clip-start) 0%, 
      var(--clip-start) 100%, 
      0% 100%, 
      
      100% 0%, 
      100% 100%, 
      var(--clip-end) 100%, 
      var(--clip-end) 0%
    );
  }

  /* Layer 2: The "Clinical" Core (Revealed by Scanner) */
  .card-core {
    position: absolute;
    inset: 0;
    border-radius: 40px;
    background: var(--theme-bg);
    border: 1px solid var(--theme-color);
    box-shadow: 0 0 30px var(--theme-glow);
    z-index: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* Technical Grid Background for Core */
  .tech-grid {
    background-image: 
      linear-gradient(var(--theme-glow) 1px, transparent 1px),
      linear-gradient(90deg, var(--theme-glow) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.1;
  }

  /* SCANNER BEAM */
  .laser-scanner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
    height: 600px;
    background: linear-gradient(to bottom, transparent, #60a5fa, #fff, #60a5fa, transparent);
    box-shadow: 0 0 20px #3b82f6, 0 0 40px #60a5fa;
    z-index: 50;
    pointer-events: none;
  }
  
  .laser-scanner::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 600px; /* Width of the scan zone */
    height: 520px;
    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.05), transparent);
    pointer-events: none;
  }
`;

// --- HELPER FUNCTIONS ---
const getTheme = (category: string) => {
    switch(category) {
        case 'Surgery': return { bg: '#0f172a', color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.3)' }; // Blue
        case 'Endodontics': return { bg: '#2e1065', color: '#a855f7', glow: 'rgba(168, 85, 247, 0.3)' }; // Purple
        case 'Orthodontics': return { bg: '#312e81', color: '#6366f1', glow: 'rgba(99, 102, 241, 0.3)' }; // Indigo
        case 'Cosmetic': return { bg: '#0891b2', color: '#22d3ee', glow: 'rgba(34, 211, 238, 0.3)' }; // Cyan
        default: return { bg: '#1e293b', color: '#94a3b8', glow: 'rgba(148, 163, 184, 0.3)' }; // Slate
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

export default function Services() {
    const router = useRouter();
    const trackRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>();
    
    // Movement State
    const [scrollX, setScrollX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const currentTranslate = useRef(0);
    const prevTranslate = useRef(0);
    const autoScrollSpeed = 0.5; // Speed of auto movement

    // Data Prep
    const services = useMemo(() => Object.values(treatmentsData).map(t => ({
        ...t,
        theme: getTheme(t.category),
        Icon: getCategoryIcon(t.category)
    })), []);

    // Double the array for infinite scroll illusion (if needed, or just loop)
    const displayServices = [...services, ...services]; 

    // --- ANIMATION LOOP (The Engine) ---
    const animate = useCallback(() => {
        if (!isDragging) {
            currentTranslate.current -= autoScrollSpeed;
            
            // Infinite Reset Logic
            const cardWidth = 420; // 380px width + 40px gap
            const totalWidth = (services.length * cardWidth);
            
            // Reset position seamlessly when we scroll past the first set
            if (Math.abs(currentTranslate.current) >= totalWidth) {
                currentTranslate.current += totalWidth;
                prevTranslate.current += totalWidth;
            }
        }

        setScrollX(currentTranslate.current);
        
        // --- THE SCANNER LOGIC (Card Eating Effect) ---
        if (trackRef.current && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const centerLine = containerRect.width / 2;
            const scanWidth = 10; // Width of the "beam" impact

            // Iterate over all cards to update their clip-path based on position
            const cards = trackRef.current.children;
            for (let i = 0; i < cards.length; i++) {
                const card = cards[i] as HTMLElement;
                const rect = card.getBoundingClientRect();
                const cardLeft = rect.left - containerRect.left;
                const cardRight = rect.right - containerRect.left;
                const cardWidth = rect.width;

                // Calculate overlap with center line
                const distFromCenter = (cardLeft + cardWidth/2) - centerLine;
                
                // Logic:
                // If card is to the LEFT of center -> Show fully
                // If card is to the RIGHT of center -> Show fully
                // If card is CROSSING center -> "Eat" the shell to reveal core
                
                let clipStart = 0;
                let clipEnd = 100;

                // Simple Scanner Logic:
                // We calculate a percentage (0 to 100) representing where the laser is ON THE CARD
                const laserPosOnCard = centerLine - cardLeft;
                const percent = (laserPosOnCard / cardWidth) * 100;

                // Apply logic to CSS variables on the Shell
                const shell = card.querySelector('.card-shell') as HTMLElement;
                if (shell) {
                    if (percent > 0 && percent < 100) {
                        // Card is under scanner!
                        // We want a gap in the shell where the laser is.
                        // Actually, the "Eating" effect usually implies the shell is removed *after* the scan line or *during*.
                        // Let's make the shell DISAPPEAR as it passes center to reveal the core.
                        
                        // Reveal Core: The shell is clipped from 0% to "Laser Pos"
                        // Or inverted: Shell exists only on the right side of laser?
                        
                        // EFFECT: Shell is peeled away by the laser.
                        // Left of laser = Core (Revealed). Right of laser = Shell (Hidden content).
                        shell.style.setProperty('--clip-start', `${percent + 5}%`); // Add small gap
                        shell.style.setProperty('--clip-end', '100%');
                    } else if (percent >= 100) {
                        // Card passed scanner (Left side of screen) -> Fully Revealed Core (Shell Hidden)
                        shell.style.setProperty('--clip-start', '100%');
                        shell.style.setProperty('--clip-end', '100%');
                    } else {
                        // Card approaching scanner (Right side) -> Fully Visible Shell
                        shell.style.setProperty('--clip-start', '0%');
                        shell.style.setProperty('--clip-end', '100%');
                    }
                }
            }
        }

        requestRef.current = requestAnimationFrame(animate);
    }, [isDragging, services.length]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [animate]);

    // --- DRAG HANDLERS ---
    const onTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
        setIsDragging(true);
        startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
        prevTranslate.current = currentTranslate.current;
    };

    const onTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging) return;
        const currentPosition = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const diff = currentPosition - startX.current;
        currentTranslate.current = prevTranslate.current + diff;
    };

    const onTouchEnd = () => {
        setIsDragging(false);
    };

    return (
        <section className="relative min-h-screen bg-[#020617] overflow-hidden flex flex-col justify-center py-20">
            <style jsx global>{cssStyles}</style>

            {/* --- BACKGROUND AMBIENCE --- */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

            {/* --- HEADER --- */}
            <div className="container mx-auto px-6 mb-16 relative z-20 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 font-bold text-xs uppercase tracking-widest mb-6">
                    <ScanLine size={14} /> Clinical Protocols v4.0
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                    Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">Medicine.</span>
                </h2>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    <MousePointer2 size={14} /> Drag Stream to Scan
                </p>
            </div>

            {/* --- THE LASER BEAM --- */}
            <div className="laser-scanner"></div>

            {/* --- INFINITE STREAM --- */}
            <div 
                className="service-stream-container w-full" 
                ref={containerRef}
                onMouseDown={onTouchStart}
                onMouseMove={onTouchMove}
                onMouseUp={onTouchEnd}
                onMouseLeave={onTouchEnd}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div 
                    className="stream-track" 
                    ref={trackRef}
                    style={{ transform: `translateX(${scrollX}px)` }}
                >
                    {displayServices.map((service, idx) => (
                        <div 
                            key={`${service.id}-${idx}`} 
                            className="holo-card-wrapper"
                            style={{ 
                                '--theme-color': service.theme.color,
                                '--theme-bg': service.theme.bg,
                                '--theme-glow': service.theme.glow,
                            } as React.CSSProperties}
                            onClick={() => router.push(`/treatments/${service.id}`)}
                        >
                            {/* LAYER 1: SHELL (Aesthetic / Image) */}
                            {/* Gets clipped away by the scanner */}
                            <div className="card-shell group">
                                <div className="absolute inset-0">
                                    <img 
                                        src={service.heroImage} 
                                        alt={service.title} 
                                        className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
                                </div>
                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white">
                                        {service.category}
                                    </div>
                                    <h3 className="text-3xl font-bold text-white leading-tight">{service.title}</h3>
                                    <p className="text-slate-400 text-sm mt-2 line-clamp-2">{service.description}</p>
                                </div>
                            </div>

                            {/* LAYER 2: CORE (Clinical / Data) */}
                            {/* Revealed when shell is clipped */}
                            <div className="card-core">
                                <div className="absolute inset-0 tech-grid"></div>
                                
                                <div className="p-8 flex flex-col h-full relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div 
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10"
                                            style={{ background: `${service.theme.color}20`, color: service.theme.color }}
                                        >
                                            <service.Icon size={28} />
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Success Rate</div>
                                            <div className="text-2xl font-black text-white">{service.stats[2]?.value || '99%'}</div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2" style={{ color: service.theme.color }}>
                                        {service.title}
                                    </h3>
                                    <div className="h-1 w-12 rounded-full mb-6" style={{ background: service.theme.color }}></div>

                                    {/* Tech Specs List */}
                                    <div className="space-y-4 mb-auto">
                                        {service.stats.slice(0, 3).map((stat, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5">
                                                <span className="text-xs text-slate-400 uppercase font-bold">{stat.label}</span>
                                                <span className="text-sm font-bold text-white">{stat.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <div 
                                        className="mt-6 w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                                        style={{ background: service.theme.color, color: '#fff', cursor: 'pointer' }}
                                    >
                                        View Protocol <ArrowRight size={14} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
