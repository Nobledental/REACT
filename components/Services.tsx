'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination, Navigation, Keyboard } from 'swiper/modules';
import { Activity, Zap, Smile, Users, Search, Filter, Sparkles } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const cssStyles = `
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

.services-wrapper {
    font-family: "Poppins", sans-serif;
    transition: background-color 0.8s ease;
}

.services-wrapper .swiper {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
}

.services-wrapper .autoplay-progress {
    position: absolute;
    left: 30px;
    top: 30px;
    z-index: 20;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: var(--progress-color);
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(5px);
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.1);
}

.services-wrapper .autoplay-progress svg {
    --progress: 0;
    position: absolute;
    left: 0;
    top: 0px;
    z-index: 10;
    width: 100%;
    height: 100%;
    stroke-width: 3px;
    stroke: var(--progress-color);
    fill: none;
    stroke-dashoffset: calc(125.6px * (1 - var(--progress)));
    stroke-dasharray: 125.6;
    transform: rotate(-90deg);
}

.services-wrapper .autoplay-progress span {
    font-size: 14px;
}

.services-wrapper .slider-button {
    transition: 0.5s;
    outline: none;
    position: absolute;
    width: 80px;
    height: 80px;
    z-index: 20;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}

.services-wrapper .slider-button svg {
    display: block;
    transition: 0.5s;
    overflow: visible;
}

.services-wrapper .slider-button .slider-svg-circle-wrap {
    transition: 0.5s;
    transform-origin: center;
}

.services-wrapper .slider-button circle {
    transition: 0.5s;
    stroke-width: 2px;
    stroke: var(--progress-color);
    fill: none;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    opacity: 1;
    r: 35px;
    cx: 40px;
    cy: 40px;
    transform-origin: center;
}

.services-wrapper .slider-button .slider-svg-arrow {
    transition: 0.5s;
    fill: var(--progress-color);
    transform-origin: center;
}

.services-wrapper .slider-button-prev {
    left: 40px;
}

.services-wrapper .slider-button-next {
    right: 40px;
}

.services-wrapper .slider-button-prev .slider-svg-arrow {
    transform: rotate(180deg);
}

.services-wrapper .slider-button:hover .slider-svg-circle-wrap {
    transform: scale(1.1);
}

.services-wrapper .slider-button:hover circle {
    stroke-dasharray: 4px;
    stroke-dashoffset: 4px;
    opacity: 1;
}

.services-wrapper .swiper-pagination {
    text-align: center;
    bottom: 20px !important;
}

.services-wrapper .swiper-pagination .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    margin: 0 5px;
    background: rgba(255,255,255,0.4);
    opacity: 1;
    transition: 0.3s;
}

.services-wrapper .swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active {
    background: var(--progress-color);
    width: 30px;
    border-radius: 5px;
}

.services-wrapper .autoplay-progress-bar {
    --progress: 0;
    height: 4px;
    width: var(--progress);
    background-color: var(--progress-color);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 30;
    transition: width 0.1s linear;
}

.floating {
    animation: floatAnim 6s ease-in-out infinite;
}

.slide {
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 1000px;
}

.services-wrapper .card {
    position: relative;
    margin: auto;
    height: 600px;
    width: 80vw;
    max-width: 1100px;
    border-radius: 50px;
    overflow: hidden;
    box-shadow: 0 30px 60px -15px rgba(0,0,0,0.5);
    background: #0F172A;
    transition: background 0.5s ease;
}

.svg-wrapper {
    width: 100%;
    height: 100%;
    text-align: center;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -10%;
    pointer-events: none;
}

.slide:nth-child(odd) .svg-wrapper {
    left: -20%;
}
.slide:nth-child(even) .svg-wrapper {
    right: -20%;
    left: auto;
}

.img-container {
    width: 450px;
    height: 450px;
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.img-container img {
    width: 380px;
    height: 380px;
    object-fit: cover;
    border-radius: 50%;
    border: 8px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 50px rgba(0,0,0,0.3);
}

.card-content {
    max-width: 450px;
    width: 100%;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    padding: 0 40px;
    z-index: 10;
}

.slide:nth-child(odd) .card-content {
    margin-left: auto;
    text-align: right;
    align-items: flex-end;
    display: flex;
    flex-direction: column;
}
.slide:nth-child(even) .card-content {
    margin-right: auto;
    margin-left: 5%;
    text-align: left;
}

.card-ghost-info {
    position: absolute;
    bottom: 8%;
    line-height: 1.4;
    color: #ffffff;
    font-size: 14px;
    font-weight: 400;
}

.ghost-name {
    font-size: 18px;
    text-transform: uppercase;
    margin-bottom: 5px;
    font-weight: 800;
    letter-spacing: 1px;
}

.card-ghost-info span {
    height: 50px;
    display: inline-block;
    width: 2px;
    background-color: var(--color);
    position: absolute;
    bottom: 0px;
}
.card-ghost-info span:before {
    content: "";
    height: 6px;
    width: 6px;
    background-color: var(--color);
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
}

.slide:nth-child(odd) .card-ghost-info {
    left: 8%;
    text-align: right;
}
.slide:nth-child(odd) .card-ghost-info span {
    right: -20px;
}
.slide:nth-child(even) .card-ghost-info {
    right: 8%;
    text-align: left;
}
.slide:nth-child(even) .card-ghost-info span {
    left: -20px;
}

.card-title {
    color: var(--color);
    font-weight: 900;
    font-size: clamp(32px, 5vw, 64px);
    line-height: 1.1;
    margin: 10px 0 20px;
    text-transform: uppercase;
    position: relative;
    letter-spacing: -1px;
    text-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.card-sub-title {
    color: #fff;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 2px;
    background: rgba(255,255,255,0.1);
    padding: 5px 12px;
    border-radius: 4px;
    display: inline-block;
    backdrop-filter: blur(5px);
}

.card-description {
    color: rgba(255,255,255,0.9);
    font-weight: 400;
    font-size: 16px;
    line-height: 1.6;
    max-width: 400px;
    margin-bottom: 20px;
}

.cta-button {
    display: inline-flex;
    padding: 16px 40px;
    background-color: var(--color);
    color: #fff;
    font-size: 14px;
    text-decoration: none;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 1px;
    border-radius: 50px;
    box-shadow: 0 10px 20px -5px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
}

.cta-button:hover {
    background-color: #fff;
    color: var(--color);
    transform: translateY(-5px);
    box-shadow: 0 15px 30px -5px rgba(0,0,0,0.4);
}

@keyframes floatAnim {
    0%, 100% { transform: translateY(-20px); }
    50% { transform: translateY(20px); }
}

@keyframes swing {
    0%, 100% { transform: rotate(5deg); }
    50% { transform: rotate(-5deg); }
}

@keyframes mouseScroll {
    0% { transform: translateY(0); }
    100% { transform: translateY(14px); }
}

.mouse-scroll {
    position: absolute;
    bottom: 20px;
    right: 0;
    left: 0;
    margin: 0 auto;
    text-align: center;
    color: var(--progress-color);
    font-size: 10px;
    text-transform: uppercase;
    font-weight: 600;
    z-index: 20;
    pointer-events: none;
}
.mouse {
    width: 26px;
    height: 40px;
    border-radius: 15px;
    border: 2px solid var(--progress-color);
    position: relative;
    margin: 0 auto 10px;
}
.mouse .roll {
    position: absolute;
    top: 8px;
    left: 50%;
    width: 4px;
    margin-left: -2px;
    height: 4px;
    border-radius: 50%;
    background: var(--progress-color);
    animation: mouseScroll 1s cubic-bezier(0.7, 0, 0.3, 1) infinite alternate;
}

@media (max-width: 900px) {
    .services-wrapper .card {
        height: auto;
        min-height: 520px;
        width: 94vw;
        border-radius: 30px;
        padding-bottom: 20px;
    }
    .svg-wrapper {
        position: relative;
        top: 0;
        left: 0 !important;
        right: 0 !important;
        height: 35vh;
        min-height: 250px;
        margin-top: 10px;
    }
    .img-container {
        width: 240px;
        height: 240px;
    }
    .img-container img {
        width: 200px;
        height: 200px;
        border-width: 4px;
    }
    .card-content {
        top: 0;
        transform: none;
        max-width: 100%;
        text-align: center !important;
        align-items: center !important;
        margin: 0 !important;
        padding: 20px;
        height: auto;
    }
    .card-title {
        font-size: 28px;
        margin: 10px 0;
    }
    .card-description {
        font-size: 14px;
    }
    .card-ghost-info, .mouse-scroll, .slider-button {
        display: none;
    }
}
`;

interface ExtendedServiceItem {
    id: string;
    title: string;
    subTitle: string;
    description: string;
    icon: React.ElementType;
    bg: string;
    accent: string;
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
  const progressCircle = useRef<SVGSVGElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);
  const swiperRef = useRef<any>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredServices, setFilteredServices] = useState<ExtendedServiceItem[]>([]);

  const allServices: ExtendedServiceItem[] = [
    {
      id: 'implants',
      treatmentId: 'dental-implants',
      title: 'Dental Implants',
      subTitle: '#1 Permanent Solution',
      description: 'Permanent replacement for missing teeth using titanium/zirconia implants. Supported by ITI & Mayo Clinic standards.',
      icon: Activity,
      bg: 'linear-gradient(331deg, #0f172a 0%, #1e3a8a 100%)',
      accent: '#60A5FA',
      features: ['Lifetime Warranty', 'Preserves Jawbone', 'Natural Look'],
      image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=800',
      keywords: ['missing', 'tooth', 'titanium', 'surgery'],
      category: 'Surgery'
    },
    {
      id: 'root-canal',
      treatmentId: 'root-canal',
      title: 'Painless RCT',
      subTitle: '#2 Advanced Endodontics',
      description: 'Save infected teeth with single-visit painless Root Canal Treatment. Microscopic precision for zero pain.',
      icon: Zap,
      bg: 'linear-gradient(331deg, #115e59 0%, #0d9488 100%)',
      accent: '#2DD4BF',
      features: ['Single Visit', 'Microscope', 'Laser Disinfection'],
      image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f72?auto=format&fit=crop&q=80&w=800',
      keywords: ['pain', 'ache', 'root', 'canal', 'infection', 'hurt'],
      category: 'Pain Relief'
    },
    {
      id: 'aligners',
      treatmentId: 'invisalign',
      title: 'Clear Aligners',
      subTitle: '#3 Invisible Ortho',
      description: 'Invisalign & clear aligners to straighten teeth without braces. Eat & brush normally.',
      icon: Smile,
      bg: 'linear-gradient(331deg, #312e81 0%, #4f46e5 100%)',
      accent: '#818CF8',
      features: ['Invisible', 'Removable', 'Fast Results'],
      image: 'https://images.unsplash.com/photo-1595867372361-597621c258d4?auto=format&fit=crop&q=80&w=800',
      keywords: ['straight', 'braces', 'aligner', 'gap'],
      category: 'Orthodontics'
    },
    {
      id: 'whitening',
      treatmentId: 'teeth-whitening',
      title: 'Teeth Whitening',
      subTitle: '#5 Cosmetic',
      description: 'Brighten your smile with safe peroxide-based whitening gels. Instant results under dentist supervision.',
      icon: Sparkles,
      bg: 'linear-gradient(331deg, #0891b2 0%, #06b6d4 100%)',
      accent: '#67E8F9',
      features: ['Instant Results', 'Safe', 'ADA Approved'],
      image: 'https://images.unsplash.com/photo-1609840114035-1c29046a83ea?auto=format&fit=crop&q=80&w=800',
      keywords: ['white', 'bleach', 'stain', 'yellow'],
      category: 'Cosmetic'
    },
    {
      id: 'kids',
      treatmentId: 'kids-dentistry',
      title: 'Kids Dentistry',
      subTitle: '#6 Pediatric Care',
      description: 'Gentle dental care for infants and children. Fluoride, sealants, and no-tears approach.',
      icon: Users,
      bg: 'linear-gradient(331deg, #7c2d12 0%, #ea580c 100%)',
      accent: '#FB923C',
      features: ['Fluoride', 'Sealants', 'No Tears'],
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
      keywords: ['kid', 'child', 'pediatric', 'baby'],
      category: 'Kids'
    }
  ];

  const filterCategories = ['All', 'Pain Relief', 'Cosmetic', 'Orthodontics', 'Surgery', 'Kids'];

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = allServices.filter(service => {
        const matchesSearch = service.title.toLowerCase().includes(query) || 
                              service.keywords.some(k => k.toLowerCase().includes(query));
        const matchesCategory = activeFilter === 'All' || service.category === activeFilter;
        
        return matchesSearch && matchesCategory;
    });
    setFilteredServices(filtered);
    
    if(swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideTo(0);
    }
  }, [searchQuery, activeFilter]);

  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current) {
        progressCircle.current.style.setProperty("--progress", String(1 - progress));
    }
    if (progressContent.current) {
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
    if (progressBar.current) {
        progressBar.current.style.setProperty("--progress", `${(1 - progress) * 100}%`);
    }
  };

  const handleSlideChange = (swiper: any) => {
     const activeIndex = swiper.realIndex;
     const currentService = filteredServices.length > 0 
        ? (filteredServices[activeIndex] || filteredServices[0])
        : allServices[0];
     
     if (sectionRef.current) {
        sectionRef.current.style.setProperty("--progress-color", currentService.accent);
        sectionRef.current.style.background = currentService.bg;
     }
  };

  const handleClick = (id: string) => {
    // If a callback is provided (e.g. from Homepage), use it
    if (onServiceClick) {
        onServiceClick(id);
    } else {
        // Otherwise navigate directly
        router.push(`/treatments/${id}`);
    }
  };

  return (
    <section 
        id="services" 
        ref={sectionRef} 
        className="services-wrapper relative py-16 lg:py-20 w-full overflow-hidden flex flex-col items-center justify-center transition-all duration-700"
        style={{ 
            background: allServices[0].bg,
            "--progress-color": allServices[0].accent 
        } as React.CSSProperties}
    >
        <style jsx>{cssStyles}</style>

        {/* Search & Filter Header (Overlay) */}
        <div className="absolute top-0 pt-6 lg:pt-8 w-full z-20 flex flex-col items-center pointer-events-none px-4">
            <h3 className="text-white/60 font-bold tracking-widest text-[10px] lg:text-xs uppercase mb-3">Our Expertise</h3>
            
            <div className="pointer-events-auto relative w-full max-w-sm lg:max-w-md mb-3 lg:mb-4">
                <input 
                    type="text" 
                    placeholder="Search by symptom..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-2.5 lg:py-3 pl-10 lg:pl-12 pr-6 text-white placeholder-white/50 text-sm focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all shadow-lg"
                />
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" />
            </div>

            <div className="pointer-events-auto flex flex-wrap gap-1.5 lg:gap-2 justify-center max-w-2xl px-2">
                {filterCategories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-[10px] lg:text-xs font-bold uppercase tracking-wider transition-all border ${
                            activeFilter === cat 
                                ? 'bg-white text-slate-900 border-white scale-105 shadow-md' 
                                : 'bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:border-white/40'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        <div className="autoplay-progress-bar" ref={progressBar}></div>

        {filteredServices.length > 0 ? (
            <Swiper
                ref={swiperRef}
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation, Keyboard]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1} 
                speed={1000}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                keyboard={{ enabled: true }}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                pagination={{ clickable: true }}
                navigation={{
                    nextEl: '.slider-button-next',
                    prevEl: '.slider-button-prev',
                }}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                onSlideChange={handleSlideChange}
                className="w-full h-full swiper"
            >
                {filteredServices.map((service) => (
                    <SwiperSlide key={service.id} className="slide">
                        <div 
                            className="card" 
                            style={{ background: service.bg, "--color": service.accent } as React.CSSProperties}
                        >
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full blur-[100px] animate-pulse"></div>
                            </div>

                            <div className="svg-wrapper floating">
                                <div className="img-container swing">
                                    <div className="absolute inset-0 rounded-full border border-white/20 animate-[spin_10s_linear_infinite]"></div>
                                    <img src={service.image} alt={service.title} />
                                    <div className="absolute -bottom-4 right-10 bg-white p-3 lg:p-4 rounded-full shadow-lg">
                                        <service.icon size={24} className="lg:w-8 lg:h-8" style={{ color: service.accent }} />
                                    </div>
                                </div>
                            </div>

                            <div className="card-content">
                                <div className="card-sub-title">{service.subTitle}</div>
                                <h2 className="card-title" data-text={service.title}>{service.title}</h2>
                                <p className="card-description">
                                    {service.description}
                                </p>
                                <div className="card-cta">
                                    <button 
                                        className="cta-button"
                                        onClick={() => handleClick(service.treatmentId)}
                                    >
                                        Learn More
                                    </button>
                                </div>
                            </div>

                            <div className="card-ghost-info">
                                <span></span>
                                <div className="ghost-name">Highlights</div>
                                <div className="flex flex-col gap-1">
                                    {service.features.map((f, i) => (
                                        <div key={i} className="opacity-80 text-xs">• {f}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                <div className="slider-button slider-button-prev">
                    <svg viewBox="0 0 100 100">
                        <g className="slider-svg-circle-wrap">
                            <circle cx="50" cy="50" r="45"></circle>
                        </g>
                        <path className="slider-svg-arrow" d="M35 50 L65 30 L65 70 Z"/>
                    </svg>
                </div>
                <div className="slider-button slider-button-next">
                    <svg viewBox="0 0 100 100">
                        <g className="slider-svg-circle-wrap">
                            <circle cx="50" cy="50" r="45"></circle>
                        </g>
                        <path className="slider-svg-arrow" d="M35 50 L65 30 L65 70 Z"/>
                    </svg>
                </div>
            </Swiper>
        ) : (
            <div className="relative z-10 flex flex-col items-center justify-center h-[500px] text-white">
                <Filter size={64} className="mb-4 opacity-50" />
                <h3 className="text-2xl font-bold mb-2">No treatments found</h3>
                <p className="text-white/60 mb-6">Try adjusting your search or filter.</p>
                <button 
                    onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all text-sm font-bold uppercase tracking-wider"
                >
                    Clear Filters
                </button>
            </div>
        )}

        <div className="autoplay-progress">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
        </div>

        <div className="mouse-scroll">
            <div className="mouse">
                <div className="roll"></div>
            </div>
            <span>Discover Treatments</span>
        </div>
    </section>
  );
};

export default Services;
