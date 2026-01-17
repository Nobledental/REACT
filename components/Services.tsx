'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination, Navigation, Keyboard } from 'swiper/modules';
import { 
  Activity, Zap, Smile, Users, Search, Filter, Sparkles, 
  Shield, Microscope, HeartPulse, ScanLine, ArrowRight, Star
} from 'lucide-react';
import { treatmentsData } from '@/data/treatments';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// --- ADVANCED STYLES ---
const cssStyles = `
  @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap");

  .services-section {
    font-family: 'Outfit', sans-serif;
    transition: background 1s ease;
  }

  /* Custom Swiper Pagination */
  .custom-pagination .swiper-pagination-bullet {
    width: 30px;
    height: 4px;
    background: rgba(255,255,255,0.3);
    border-radius: 2px;
    transition: all 0.3s ease;
  }
  .custom-pagination .swiper-pagination-bullet-active {
    background: #fff;
    width: 60px;
    box-shadow: 0 0 10px rgba(255,255,255,0.5);
  }

  /* Slide Animations */
  .swiper-slide-active .animate-title { animation: slideUp 0.8s cubic-bezier(0.2, 1, 0.3, 1) forwards 0.2s; opacity: 0; }
  .swiper-slide-active .animate-desc { animation: slideUp 0.8s cubic-bezier(0.2, 1, 0.3, 1) forwards 0.3s; opacity: 0; }
  .swiper-slide-active .animate-btn { animation: slideUp 0.8s cubic-bezier(0.2, 1, 0.3, 1) forwards 0.4s; opacity: 0; }
  .swiper-slide-active .animate-visual { animation: scaleIn 1s cubic-bezier(0.2, 1, 0.3, 1) forwards; }

  @keyframes slideUp {
    from { transform: translateY(40px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes scaleIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  /* Glassmorphism Card */
  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }

  /* Floating Elements */
  .float-slow { animation: float 6s ease-in-out infinite; }
  .float-fast { animation: float 4s ease-in-out infinite reverse; }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  /* Navigation Buttons */
  .nav-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: all 0.3s;
    cursor: pointer;
  }
  .nav-btn:hover {
    background: white;
    color: black;
    transform: scale(1.1);
  }
`;

// --- THEME ENGINE ---
const getTheme = (category: string) => {
    switch(category) {
        case 'Surgery': return { 
            bg: 'radial-gradient(circle at 50% 0%, #1e293b 0%, #0f172a 100%)', 
            accent: '#38bdf8', // Sky Blue
            glow: 'rgba(56, 189, 248, 0.3)'
        };
        case 'Endodontics': return { 
            bg: 'radial-gradient(circle at 50% 0%, #4c1d95 0%, #2e1065 100%)', 
            accent: '#c084fc', // Purple
            glow: 'rgba(192, 132, 252, 0.3)'
        };
        case 'Orthodontics': return { 
            bg: 'radial-gradient(circle at 50% 0%, #312e81 0%, #1e1b4b 100%)', 
            accent: '#818cf8', // Indigo
            glow: 'rgba(129, 140, 248, 0.3)'
        };
        case 'Cosmetic': return { 
            bg: 'radial-gradient(circle at 50% 0%, #831843 0%, #500724 100%)', 
            accent: '#f472b6', // Pink
            glow: 'rgba(244, 114, 182, 0.3)'
        };
        case 'Pediatrics': return { 
            bg: 'radial-gradient(circle at 50% 0%, #9a3412 0%, #431407 100%)', 
            accent: '#fb923c', // Orange
            glow: 'rgba(251, 146, 60, 0.3)'
        };
        case 'Restorative': return { 
            bg: 'radial-gradient(circle at 50% 0%, #134e4a 0%, #042f2e 100%)', 
            accent: '#2dd4bf', // Teal
            glow: 'rgba(45, 212, 191, 0.3)'
        };
        default: return { 
            bg: 'radial-gradient(circle at 50% 0%, #334155 0%, #0f172a 100%)', 
            accent: '#cbd5e1', 
            glow: 'rgba(203, 213, 225, 0.3)'
        };
    }
};

const getCategoryIcon = (category: string) => {
    switch(category) {
        case 'Surgery': return Activity;
        case 'Endodontics': return Microscope;
        case 'Orthodontics': return Smile;
        case 'Cosmetic': return Sparkles;
        case 'Pediatrics': return Users;
        case 'Restorative': return Shield;
        case 'Preventive': return HeartPulse;
        case 'Wellness': return ScanLine;
        default: return Zap;
    }
};

interface ExtendedServiceItem {
    id: string;
    title: string;
    subTitle: string;
    description: string;
    icon: React.ElementType;
    theme: { bg: string; accent: string; glow: string };
    features: string[];
    image: string;
    keywords: string[];
    category: string;
    treatmentId: string;
}

interface ServicesProps {
    onServiceClick?: (id: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onServiceClick }) => {
    const router = useRouter();
    const sectionRef = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [currentTheme, setCurrentTheme] = useState(getTheme('Default'));

    // --- DATA MAPPING ---
    const allServices: ExtendedServiceItem[] = useMemo(() => {
        return Object.values(treatmentsData).map((t) => ({
            id: t.id,
            treatmentId: t.id,
            title: t.title,
            subTitle: t.subtitle,
            description: t.description,
            icon: getCategoryIcon(t.category),
            theme: getTheme(t.category),
            features: t.benefits.slice(0, 3),
            image: t.heroImage,
            keywords: t.keywords,
            category: t.category
        }));
    }, []);

    const filterCategories = useMemo(() => {
        const uniqueCats = Array.from(new Set(allServices.map(s => s.category)));
        return ['All', ...uniqueCats];
    }, [allServices]);

    const filteredServices = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return allServices.filter(service => {
            const matchesSearch = service.title.toLowerCase().includes(query) || 
                                  service.keywords.some(k => k.toLowerCase().includes(query));
            const matchesCategory = activeFilter === 'All' || service.category === activeFilter;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeFilter, allServices]);

    const handleSlideChange = (swiper: any) => {
         const activeIndex = swiper.realIndex;
         const currentService = filteredServices[activeIndex] || filteredServices[0];
         if (currentService) {
            setCurrentTheme(currentService.theme);
         }
    };

    const handleClick = (id: string) => {
        if (onServiceClick) {
            onServiceClick(id);
        } else {
            router.push(`/treatments/${id}`);
        }
    };

    return (
        <section 
            id="services" 
            ref={sectionRef} 
            className="services-section relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-20"
            style={{ background: currentTheme.bg }}
        >
            <style jsx>{cssStyles}</style>

            {/* Ambient Background Noise */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            
            {/* Dynamic Glow Orb */}
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] transition-colors duration-1000 opacity-30 pointer-events-none"
                style={{ background: currentTheme.accent }}
            ></div>

            {/* --- HEADS UP DISPLAY (FILTER BAR) --- */}
            <div className="relative z-20 w-full max-w-5xl px-6 mb-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 rounded-2xl glass-card">
                    
                    {/* Search */}
                    <div className="relative w-full md:w-64 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Find treatment..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-white text-sm focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all"
                        />
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {filterCategories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => { setActiveFilter(cat); swiperRef.current?.swiper.slideTo(0); }}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                                    activeFilter === cat 
                                        ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                                        : 'bg-transparent text-white/70 border-white/10 hover:border-white/40 hover:bg-white/5'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- 3D SWIPER CAROUSEL --- */}
            <div className="w-full relative z-10 px-4">
                {filteredServices.length > 0 ? (
                    <Swiper
                        ref={swiperRef}
                        modules={[EffectCoverflow, Autoplay, Pagination, Navigation, Keyboard]}
                        effect="coverflow"
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 1.5 },
                            1024: { slidesPerView: 2.2 }
                        }}
                        coverflowEffect={{
                            rotate: 30,
                            stretch: 0,
                            depth: 200,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        speed={800}
                        keyboard={{ enabled: true }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        pagination={{ el: '.custom-pagination', clickable: true }}
                        navigation={{ nextEl: '.nav-next', prevEl: '.nav-prev' }}
                        onSlideChange={handleSlideChange}
                        className="w-full py-10"
                    >
                        {filteredServices.map((service) => (
                            <SwiperSlide key={service.id} className="relative group">
                                <div className="glass-card rounded-[3rem] p-8 h-[600px] flex flex-col relative overflow-hidden transition-transform duration-500">
                                    
                                    {/* Card Glow Effect */}
                                    <div 
                                        className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-40 transition-colors duration-500"
                                        style={{ background: service.accent }}
                                    ></div>

                                    {/* Icon Badge */}
                                    <div className="relative z-10 mb-8 animate-visual">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                                            <service.icon size={16} style={{ color: service.accent }} />
                                            <span className="text-xs font-bold uppercase tracking-widest text-white">{service.category}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 flex-grow flex flex-col justify-center">
                                        <h3 
                                            className="text-5xl md:text-6xl font-black text-white mb-4 leading-[0.9] tracking-tighter animate-title"
                                            style={{ textShadow: `0 0 30px ${service.theme.glow}` }}
                                        >
                                            {service.title.split(' ')[0]} <br/>
                                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, #fff, ${service.accent})` }}>
                                                {service.title.split(' ').slice(1).join(' ')}
                                            </span>
                                        </h3>
                                        <p className="text-lg text-slate-300 font-light leading-relaxed mb-8 max-w-sm animate-desc">
                                            {service.description}
                                        </p>

                                        {/* Features List */}
                                        <div className="space-y-3 mb-8 animate-desc" style={{ animationDelay: '0.4s' }}>
                                            {service.features.map((f, i) => (
                                                <div key={i} className="flex items-center gap-3 text-sm text-slate-400">
                                                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: service.accent }}></div>
                                                    {f}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="relative z-10 mt-auto animate-btn">
                                        <button 
                                            onClick={() => handleClick(service.treatmentId)}
                                            className="w-full py-4 rounded-2xl font-bold uppercase text-xs tracking-widest transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group-hover:shadow-lg"
                                            style={{ background: service.accent, color: '#000', boxShadow: `0 0 20px ${service.theme.glow}` }}
                                        >
                                            Explore Protocol <ArrowRight size={16} />
                                        </button>
                                    </div>

                                    {/* Hero Image (Absolute Positioned for Parallax feel) */}
                                    <div className="absolute bottom-20 -right-16 w-64 h-64 rounded-full overflow-hidden border-4 border-white/10 opacity-80 animate-visual float-slow">
                                        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute top-1/4 -right-8 w-20 h-20 rounded-full border border-white/20 float-fast" style={{ borderColor: service.accent }}></div>

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="flex flex-col items-center justify-center h-[500px] text-white/50">
                        <Filter size={64} className="mb-4 opacity-50" />
                        <p>No treatments found matching your criteria.</p>
                        <button 
                            onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
                            className="mt-4 text-white underline hover:text-blue-400"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>

            {/* --- CONTROLS FOOTER --- */}
            <div className="relative z-20 w-full max-w-5xl px-6 mt-8 flex items-center justify-between">
                {/* Navigation Buttons */}
                <div className="flex gap-4">
                    <button className="nav-btn nav-prev"><ArrowRight size={20} className="rotate-180" /></button>
                    <button className="nav-btn nav-next"><ArrowRight size={20} /></button>
                </div>

                {/* Pagination Dots */}
                <div className="custom-pagination flex gap-2"></div>

                {/* Scroll Indicator */}
                <div className="hidden md:flex items-center gap-3 text-white/50 text-xs font-bold uppercase tracking-widest animate-pulse">
                    <div className="w-12 h-[1px] bg-white/20"></div>
                    Swipe to Explore
                </div>
            </div>

        </section>
    );
};

export default Services;
