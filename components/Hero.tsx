'use client';

import React, { useEffect, useRef } from 'react';
import { Phone, Star, CheckCircle2 } from 'lucide-react';

const heroStyles = `
  .adidas-card {
    position: relative;
    border-radius: 20px;
    box-shadow: -7px 7px 20px 0 rgba(0,0,0,0.40);
    width: 100%;
    max-width: 400px;
    background: #fff;
    transition: transform 0.3s ease;
    z-index: 20;
    overflow: hidden;
  }
  :global(.dark) .adidas-card { background: #1e293b; }
  .card-head {
    height: 300px;
    background: linear-gradient(139deg, #04162E 10%, #95A2AD 100%);
    position: relative;
    padding: 20px;
  }
  .card-body { padding: 20px; }
  .card-head h2 { color: white; font-weight: 700; font-size: 1.5rem; position: relative; z-index: 10; }
  .card-head .subtitle { color: rgba(255,255,255,0.8); text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; position: relative; z-index: 10; }
  .product-pop {
    position: absolute;
    top: 60px;
    right: -40px;
    width: 300px;
    transform: rotate(-15deg);
    z-index: 5;
    filter: drop-shadow(0 20px 30px rgba(0,0,0,0.5));
  }
`;

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Simple canvas setup
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // You can add your particle logic back here if you wish
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden bg-white dark:bg-[#020617] transition-colors duration-500">
      <style jsx>{heroStyles}</style>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col items-start space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-800">
               <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
               <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Nallagandla Surgical Wing</span>
            </div>
            
            <h1 className="text-5xl md:text-[5.5rem] font-black text-slate-900 dark:text-white leading-[0.85] tracking-tighter">
              Biological <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Precision.</span>
            </h1>
            
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
              Experience a clinic that defines the future of painless oral science.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase text-xs shadow-2xl transition-all">
                Book Surgery Session
              </button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
             <div className="adidas-card">
                 <div className="card-head">
                     <h2>ITI_SLActive</h2>
                     <p className="subtitle">Swiss Grade Implant</p>
                     <img 
                       className="product-pop" 
                       src="https://dentcare-website-s3-bucket-01.s3.eu-north-1.amazonaws.com/storage/assets/uploads/JCK1DentcareZirconiaClassic-1.png" 
                       alt="Swiss Implant System" 
                     />
                 </div>
                 
                 <div className="card-body">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Straumann ITI</h3>
                    <p className="text-slate-500 text-sm">Swiss-engineered SLActive® surface technology ensures 50% faster biological bone healing.</p>
                    <div className="mt-4 flex gap-1 text-yellow-400">
                       <Star size={16} fill="currentColor" />
                       <Star size={16} fill="currentColor" />
                       <Star size={16} fill="currentColor" />
                       <Star size={16} fill="currentColor" />
                       <Star size={16} fill="currentColor" />
                    </div>
                 </div>
              </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
