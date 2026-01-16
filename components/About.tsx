'use client';

import React from 'react';
import { Shield, AlertCircle, Search } from 'lucide-react';
import Image from 'next/image';

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-[#0B1019] transition-colors duration-500">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[500px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
          
          {/* Image Section */}
          <div className="relative mb-16 lg:mb-0 order-2 lg:order-1">
             <div className="relative h-[500px] w-full rounded-[2rem] overflow-hidden border border-white/40 dark:border-white/10 shadow-2xl bg-white dark:bg-slate-900/50 transition-colors duration-500 group">
                <div className="absolute inset-0 bg-blue-500/10 dark:bg-cyan-500/20 mix-blend-overlay z-10"></div>
                <Image 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800" 
                  alt="Dental Diagnostics" 
                  fill
                  className="object-cover opacity-90 dark:opacity-80 transition-transform duration-700 group-hover:scale-105"
                />
             </div>
             
             {/* Tech Badge */}
             <div className="absolute bottom-6 right-6 bg-white/90 dark:bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/20 dark:border-white/10 z-20 shadow-xl dark:shadow-none transition-colors duration-500">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-slate-900 dark:text-white transition-colors duration-500">AI<span className="text-blue-600 dark:text-cyan-400 transition-colors duration-500">.</span></div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wide transition-colors duration-500">Smart<br/>Analysis</div>
                </div>
             </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-blue-600 dark:text-cyan-400 font-bold tracking-widest text-xs uppercase mb-4 transition-colors duration-500">Self Check</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight transition-colors duration-500">
              Identify Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 dark:from-cyan-400 dark:to-purple-400 transition-all duration-500">Dental Needs.</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8 transition-colors duration-500">
              Not sure what treatment you need? Match your symptoms below to understand potential solutions before your visit.
            </p>

            <div className="grid grid-cols-1 gap-4">
              {[
                { title: "Sensitive to Cold/Hot?", desc: "Could be decay or enamel erosion. Recommended: Checkup / Fluoride.", icon: AlertCircle, color: "text-amber-500" },
                { title: "Bleeding Gums?", desc: "Sign of Gingivitis. Recommended: Deep Cleaning.", icon: Shield, color: "text-red-500" },
                { title: "Missing Tooth?", desc: "Bone loss risk. Recommended: Dental Implants.", icon: Search, color: "text-blue-500" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-blue-200 dark:hover:border-white/20 transition-all duration-300 hover:translate-x-2 shadow-sm dark:shadow-none cursor-pointer">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center ${item.color} transition-colors duration-500`}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white transition-colors duration-500 mb-1">{item.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm transition-colors duration-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
