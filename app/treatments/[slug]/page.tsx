'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { treatmentsData } from '@/data/treatments';
import { ArrowLeft, CheckCircle2, Calendar, Shield, Activity, Clock, Play, Zap, ArrowRight, Layers, Star, Smile, Sparkles } from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// This function tells GitHub Pages which pages to build
export function generateStaticParams() {
  return Object.keys(treatmentsData).map((slug) => ({
    slug: slug,
  }));
}

export default function TreatmentDetail({ params }: { params: { slug: string } }) {
  const treatment = treatmentsData[params.slug];
  const [activeStep, setActiveStep] = useState(0);

  if (!treatment) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden pt-20">
      
      {/* --- HERO SECTION --- */}
      <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-[#020617]">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="absolute top-6 left-6 z-30">
             <Link href="/treatments" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Catalog
             </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8 order-2 lg:order-1">
                <RevealOnScroll>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
                        <Sparkles size={12} /> {treatment.category} Protocol
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                        {treatment.title}
                    </h1>
                    <p className="text-xl text-slate-400 font-light leading-relaxed max-w-lg border-l-2 border-blue-500/30 pl-6 my-8">
                        {treatment.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] transition-all flex items-center gap-2">
                            Book Consultation
                        </button>
                        <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full font-bold transition-all flex items-center gap-2">
                            <Play size={16} fill="currentColor" /> Watch Video
                        </button>
                    </div>
                </RevealOnScroll>
            </div>

            {/* Right Visual - Treatment Image */}
            <div className="relative flex justify-center items-center order-1 lg:order-2">
                <div className="relative w-full max-w-[500px] aspect-square bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 p-2 flex items-center justify-center overflow-hidden shadow-2xl group hover:border-blue-500/30 transition-colors duration-500">
                    <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
                        <Image 
                          src={treatment.heroImage} 
                          alt={treatment.title} 
                          fill
                          className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-1000"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
                        
                        {/* Floating Stats on Image */}
                        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                            <div>
                                <div className="text-xs font-bold uppercase text-blue-400 tracking-widest mb-1">Success Rate</div>
                                <div className="text-3xl font-black text-white">{treatment.stats[2]?.value || '99%'}</div>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                <Activity className="text-blue-400" size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="bg-slate-900 border-y border-white/5 py-12">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              {treatment.stats.map((stat, i) => (
                  <div key={i} className="text-center border-r border-white/5 last:border-0">
                      <div className="flex justify-center mb-3 text-blue-500">
                          <stat.icon size={24} />
                      </div>
                      <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.value}</div>
                      <div className="text-xs font-bold uppercase text-slate-500 tracking-widest">{stat.label}</div>
                  </div>
              ))}
          </div>
      </div>

      {/* --- DETAILED CONTENT --- */}
      <div className="max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-3 gap-16">
         
         {/* LEFT: Main Info */}
         <div className="lg:col-span-2 space-y-20">
            
            {/* Overview */}
            <RevealOnScroll>
                <h2 className="text-3xl font-bold text-white mb-6">Overview</h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                    {treatment.longDescription}
                </p>
            </RevealOnScroll>

            {/* Process Steps */}
            <section>
               <RevealOnScroll>
                   <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
                       <Layers className="text-blue-500" /> Clinical Protocol
                   </h3>
                   <div className="space-y-4">
                      {treatment.process.map((step, idx) => (
                         <div 
                            key={idx}
                            onMouseEnter={() => setActiveStep(idx)}
                            className={`p-6 rounded-2xl border transition-all duration-300 cursor-default group ${
                                activeStep === idx 
                                ? 'bg-blue-600/10 border-blue-500/50 translate-x-2' 
                                : 'bg-white/5 border-white/5 hover:bg-white/10'
                            }`}
                         >
                            <div className="flex items-center gap-4">
                               <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                                   activeStep === idx ? 'bg-blue-500 text-white' : 'bg-white/10 text-slate-400'
                               }`}>
                                  {idx + 1}
                               </div>
                               <div>
                                  <h4 className={`text-lg font-bold mb-1 transition-colors ${
                                      activeStep === idx ? 'text-blue-400' : 'text-white'
                                  }`}>
                                      {step.title}
                                  </h4>
                                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>
               </RevealOnScroll>
            </section>

            {/* FAQ Accordion */}
            <section>
               <RevealOnScroll>
                   <h3 className="text-2xl font-bold text-white mb-8">Common Questions</h3>
                   <div className="grid gap-4">
                      {treatment.faqs.map((faq, i) => (
                         <div key={i} className="bg-slate-900 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                            <h4 className="font-bold text-white mb-2 flex items-center gap-3">
                               <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> {faq.q}
                            </h4>
                            <p className="text-slate-400 text-sm ml-4.5 leading-relaxed">{faq.a}</p>
                         </div>
                      ))}
                   </div>
               </RevealOnScroll>
            </section>

         </div>

         {/* RIGHT: Sidebar */}
         <div className="space-y-10">
            
            {/* Benefits Card */}
            <div className="sticky top-32">
                <RevealOnScroll delay={100}>
                    <div className="p-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:scale-125 transition-transform duration-1000"></div>
                       
                       <h3 className="text-xl font-bold mb-8 flex items-center gap-2 relative z-10">
                           <Star className="text-yellow-400 fill-yellow-400" size={20} /> Key Benefits
                       </h3>
                       
                       <ul className="space-y-5 relative z-10">
                          {treatment.benefits.map((benefit, i) => (
                             <li key={i} className="flex items-start gap-3 text-sm font-medium opacity-90">
                                <CheckCircle2 className="w-5 h-5 text-blue-200 shrink-0" />
                                {benefit}
                             </li>
                          ))}
                       </ul>

                       <div className="mt-10 pt-8 border-t border-white/20 relative z-10">
                           <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-4">Ready to proceed?</p>
                           <button className="w-full py-4 bg-white text-blue-900 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 shadow-lg">
                              <Calendar size={16} /> Book Visit
                           </button>
                       </div>
                    </div>
                </RevealOnScroll>
            </div>

         </div>
      </div>

      {/* --- CTA FOOTER --- */}
      <div className="max-w-5xl mx-auto px-6 py-20 text-center border-t border-white/5">
          <h2 className="text-3xl font-bold text-white mb-6">Expert care, guaranteed.</h2>
          <p className="text-slate-400 mb-10">
              Not sure if {treatment.title} is right for you? <br/>
              Schedule a consultation with our specialists today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-10 py-4 bg-white text-slate-900 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform flex items-center gap-2 justify-center">
                  Book Consultation <ArrowRight size={16} />
              </button>
              <button className="px-10 py-4 bg-transparent border border-white/20 text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-white/5 transition-all">
                  View Cost Guide
              </button>
          </div>
      </div>

    </div>
  );
}
