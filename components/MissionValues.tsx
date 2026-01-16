'use client';

import React from 'react';
import { Target, Heart, Users, ShieldCheck, Ban, Sparkles } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

const MissionValues = () => {
  const values = [
    {
      title: "Patient-Centric Biology",
      desc: "We don't treat 'cases'; we treat people. Every clinical decision is tailored to your unique biological profile and long-term systemic health.",
      icon: Heart,
      color: "text-rose-500",
      bg: "bg-rose-50 dark:bg-rose-900/20"
    },
    {
      title: "Ethical Preservation",
      desc: "Our 'Save-The-Tooth' first policy means we prioritize conservative treatments over aggressive procedures. If it can be saved, it will be.",
      icon: ShieldCheck,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Community Outreach",
      desc: "Nallagandla is our home. We regularly conduct free oral hygiene camps and educational seminars for local schools and housing societies.",
      icon: Users,
      color: "text-teal-500",
      bg: "bg-teal-50 dark:bg-teal-900/20"
    },
    {
      title: "Zero-Hype Integrity",
      desc: "We stand firmly against false marketing and misleading discounts. We promise absolute transparency in pricing and clinical outcomes.",
      icon: Ban,
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-900/20"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-[#0B1019] transition-colors duration-500">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-cyan-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-6">
              <Sparkles size={14} /> Our Ethos
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-[0.9]">
              Driven by Ethics. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">Defined by Care.</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              <p>
                At Noble Dental Care, our mission is to bridge the gap between advanced clinical technology and compassionate, honest dentistry. 
              </p>
              <p>
                We believe that oral health is the gateway to overall wellness. This drives us to use evidence-based protocols that respect your body's natural healing potential, ensuring results that are as biological as they are beautiful.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="relative p-12 bg-slate-50 dark:bg-[#151b2b] rounded-[4rem] border border-slate-100 dark:border-white/5 shadow-inner">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                    <Target size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
               </div>
               <blockquote className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 leading-tight tracking-tight italic">
                 "To provide the Nallagandla community with world-class, transparent dental solutions that prioritize longevity, ethics, and patient comfort over commercial gains."
               </blockquote>
               <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Medical Board Certified Standards</span>
               </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, idx) => (
            <RevealOnScroll key={idx} delay={idx * 100}>
              <div className="h-full bg-white dark:bg-[#151b2b] p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 hover:shadow-2xl hover:border-blue-500/20 transition-all duration-500 group flex flex-col">
                <div className={`w-14 h-14 rounded-2xl ${value.bg} flex items-center justify-center ${value.color} mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <value.icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                  {value.title}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {value.desc}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Anti-False Marketing Banner */}
        <RevealOnScroll className="mt-24">
          <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-[3rem] p-10 md:p-14 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Ban size={180} />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
               <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-600 shrink-0">
                  <Ban size={40} />
               </div>
               <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Commitment to Integrity</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg font-medium max-w-4xl">
                    We strictly avoid aggressive sales tactics, exaggerated 'results' photos, and clickbait discounts. Our growth is built on patient trust and verified clinical success, not inflated marketing claims. 
                    <strong> Your health is too precious for hype.</strong>
                  </p>
               </div>
            </div>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
};

export default MissionValues;
