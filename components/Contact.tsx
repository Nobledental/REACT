'use client';

import React, { useState, useEffect } from 'react';
import { Phone, MapPin, ArrowRight, MessageCircle, User, Stethoscope, FileText, Sparkles, Plus, Heart } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

const Contact = () => {
  const [dates, setDates] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'General Consultation',
    doctor: 'Dr. Dhivakaran',
    day: '',
    time: '',
    notes: ''
  });

  useEffect(() => {
    const nextDays = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      nextDays.push(d.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" }));
    }
    setDates(nextDays);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello Noble Dental! I'd like to book an appointment.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}\nDoctor: ${formData.doctor}\nPreferred: ${formData.day || 'Any day'} at ${formData.time || 'Any time'}\nNotes: ${formData.notes}`;
    window.open(`https://wa.me/918610425342?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden transition-colors duration-500 bg-slate-50 dark:bg-[#0B1019]">
      <style jsx>{`
        @keyframes energy-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .neon-card-wrapper {
          position: relative;
          border-radius: 3rem;
          overflow: hidden;
          padding: 3px;
          isolation: isolate;
          box-shadow: 0 40px 100px -20px rgba(0,0,0,0.5);
        }
        .neon-gradient-bg {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, transparent, #2563eb, #0d9488, transparent, #2563eb, transparent);
          animation: energy-spin 8s linear infinite;
          z-index: -2;
        }
        .neon-blur-bg {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, #2563eb, #0d9488, #ffffff, #2563eb);
          animation: energy-spin 8s linear infinite;
          filter: blur(40px);
          opacity: 0.3;
          z-index: -2;
        }
      `}</style>

      {/* Floating Background Icons for Visual Appeal */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] animate-float opacity-20"><Plus size={40} className="text-blue-500" /></div>
        <div className="absolute top-[60%] left-[15%] animate-float opacity-10 [animation-delay:2s]"><Heart size={60} className="text-rose-500" /></div>
        <div className="absolute top-[20%] right-[10%] animate-float opacity-20 [animation-delay:1s]"><Sparkles size={50} className="text-amber-500" /></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-5 space-y-12">
                <RevealOnScroll>
                   <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-cyan-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
                      <Sparkles size={14} /> Connect With Us
                   </div>
                   <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter mb-8">
                      Your Smile <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-400">Our Priority.</span>
                   </h2>
                   <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-lg">
                      Ready to experience pain-free dentistry? Choose your preferred contact method below or use our clinical reservation form.
                   </p>
                </RevealOnScroll>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <RevealOnScroll delay={100} className="sm:col-span-2">
                        <a href="https://wa.me/918610425342" target="_blank" rel="noopener noreferrer" className="group flex items-center p-8 rounded-[2.5rem] bg-white dark:bg-[#151b2b] border border-slate-100 dark:border-white/5 hover:border-green-500/50 shadow-sm hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500">
                            <div className="w-16 h-16 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 shadow-inner group-hover:scale-110 transition-transform">
                                <MessageCircle size={32} />
                            </div>
                            <div className="ml-6 flex-1">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Instant Messaging</h4>
                                <p className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-green-600 transition-colors">Chat on WhatsApp</p>
                            </div>
                            <ArrowRight size={24} className="text-slate-300 group-hover:translate-x-2 transition-transform" />
                        </a>
                    </RevealOnScroll>

                    <RevealOnScroll delay={200}>
                        <a href="tel:+918610425342" className="group block p-8 rounded-[2rem] bg-white dark:bg-[#151b2b] border border-slate-100 dark:border-white/5 hover:border-blue-500/50 shadow-sm hover:shadow-2xl transition-all duration-500">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mb-6 group-hover:rotate-12 transition-transform">
                                <Phone size={24} />
                            </div>
                            <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Call Clinic</h4>
                            <p className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">+91 86104 25342</p>
                        </a>
                    </RevealOnScroll>

                    <RevealOnScroll delay={300}>
                        <div className="group block p-8 rounded-[2rem] bg-white dark:bg-[#151b2b] border border-slate-100 dark:border-white/5 hover:border-indigo-500/50 shadow-sm hover:shadow-2xl transition-all duration-500">
                            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 mb-6">
                                <MapPin size={24} />
                            </div>
                            <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Nallagandla</h4>
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-tight">ICA Clinic Building, Nallagandla Main Road.</p>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>

            <div className="lg:col-span-7">
               <RevealOnScroll delay={200}>
                  <div className="neon-card-wrapper">
                       <div className="neon-gradient-bg"></div>
                       <div className="neon-blur-bg"></div>
                       <div className="relative bg-white dark:bg-[#0B1019] p-8 md:p-14 overflow-hidden border border-white/50 dark:border-white/5 shadow-inner rounded-[2.9rem]">
                           <div className="relative z-10">
                               <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
                                   <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Reserve clinical time.</h3>
                                   <div className="px-4 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-500/20 animate-pulse">Accepting Patients</div>
                               </div>
                               <form onSubmit={handleSubmit} className="space-y-8">
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                       <div className="space-y-2">
                                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Patient Name</label>
                                           <div className="relative group">
                                               <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                               <input type="text" name="name" required onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 pl-12 pr-4 font-bold" placeholder="Full Name" />
                                           </div>
                                       </div>
                                       <div className="space-y-2">
                                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Contact Link</label>
                                           <div className="relative group">
                                               <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                               <input type="tel" name="phone" required onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 pl-12 pr-4 font-bold" placeholder="+91 99999 99999" />
                                           </div>
                                       </div>
                                       <div className="space-y-2">
                                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Specialist</label>
                                           <div className="relative">
                                               <Stethoscope size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                               <select name="doctor" onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 pl-12 appearance-none font-bold cursor-pointer">
                                                   <option>Dr. Dhivakaran (Implantology)</option>
                                                   <option>Dr. Roger Ronaldo (Surgery)</option>
                                                   <option>Dr. Deepak (Aligners)</option>
                                               </select>
                                           </div>
                                       </div>
                                       <div className="space-y-2">
                                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Service Type</label>
                                           <div className="relative">
                                               <Sparkles size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                               <select name="service" onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 pl-12 appearance-none font-bold cursor-pointer">
                                                   <option>General Checkup</option>
                                                   <option>Single Visit RCT</option>
                                                   <option>Invisalign Aligners</option>
                                               </select>
                                           </div>
                                       </div>
                                   </div>
                                   <div className="space-y-2">
                                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Triage Notes (Optional)</label>
                                       <div className="relative">
                                           <FileText size={18} className="absolute left-4 top-6 text-slate-400" />
                                           <textarea name="notes" rows={3} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] py-5 pl-12 pr-4 font-bold resize-none" placeholder="Briefly describe your concerns..."></textarea>
                                       </div>
                                   </div>
                                   <button type="submit" className="w-full bg-slate-900 dark:bg-blue-600 text-white font-black uppercase tracking-[0.3em] py-6 rounded-[2rem] shadow-xl hover:-translate-y-1 transition-all flex justify-center items-center gap-3 group">
                                       <span>Confirm Reservation</span>
                                       <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                   </button>
                               </form>
                           </div>
                       </div>
                  </div>
               </RevealOnScroll>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
