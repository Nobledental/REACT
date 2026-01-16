'use client';

import React, { useState, useEffect } from 'react';
import { X, Phone, MessageCircle, ArrowRight, Smartphone, User, Stethoscope, FileText, Download } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'General Consultation',
    doctor: 'Dr. Dhivakaran',
    notes: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Booking via Noble Website:\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}\nDoctor: ${formData.doctor}\nNotes: ${formData.notes}`;
    window.open(`https://wa.me/918610425342?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose}></div>
      
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#0B1019] rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-500 grid lg:grid-cols-5 max-h-[90vh]">
        
        {/* Left Side: Healthflo Promotion */}
        <div className="hidden lg:flex lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-800 p-12 flex-col justify-between relative overflow-hidden text-white">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
           <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
           
           <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-8 border border-white/30 shadow-2xl">
                 <Smartphone size={32} strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-black leading-tight mb-6">Upgrade your <br/> Noble Experience.</h2>
              <p className="text-blue-100 font-medium leading-relaxed mb-10">
                Install <strong>Healthflo-OS</strong> for seamless appointment tracking, digital case records, and instant medical support.
              </p>
              
              <div className="space-y-4">
                 {[
                   "Zero Paperwork",
                   "Real-time Queue Status",
                   "Digital X-ray Archives",
                   "0% EMI Bill Payments"
                 ].map((feat, i) => (
                   <div key={i} className="flex items-center gap-3 text-sm font-bold">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center"><Download size={10} /></div>
                      {feat}
                   </div>
                 ))}
              </div>
           </div>

           <div className="relative z-10 space-y-4">
              <a href="#" className="flex items-center justify-center gap-3 bg-white text-blue-700 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:scale-105 transition-all">
                 <Download size={18} /> Get App Now
              </a>
              <p className="text-[10px] text-center text-blue-200 font-bold uppercase tracking-widest">Recommended for active patients</p>
           </div>
        </div>

        {/* Right Side: Booking Form */}
        <div className="col-span-5 lg:col-span-3 p-8 sm:p-12 overflow-y-auto scrollbar-hide">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Reserve a Slot.</h3>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 rounded-full transition-all">
                 <X size={24} />
              </button>
           </div>

           <div className="grid grid-cols-2 gap-4 mb-8">
              <a href="tel:+918610425342" className="flex flex-col items-center justify-center p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-3xl group hover:bg-blue-600 transition-all">
                 <Phone size={24} className="text-blue-600 dark:text-blue-400 group-hover:text-white mb-2 transition-colors" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-100 mb-1">Direct Call</span>
                 <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-white">Call Clinic</span>
              </a>
              <a href="https://wa.me/918610425342" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-6 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 rounded-3xl group hover:bg-green-600 transition-all">
                 <MessageCircle size={24} className="text-green-600 dark:text-green-400 group-hover:text-white mb-2 transition-colors" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-green-100 mb-1">WhatsApp</span>
                 <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-white">Chat Now</span>
              </a>
           </div>

           <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Your Name</label>
                    <div className="relative group">
                       <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" />
                       <input type="text" name="name" required onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold" placeholder="Patient Full Name" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                    <div className="relative group">
                       <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" />
                       <input type="tel" name="phone" required onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold" placeholder="+91 00000 00000" />
                    </div>
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Preferred Specialist</label>
                 <div className="relative">
                    <Stethoscope size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select name="doctor" onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold appearance-none cursor-pointer">
                       <option>Dr. Dhivakaran (Implantologist)</option>
                       <option>Dr. Roger Ronaldo (Surgeon)</option>
                       <option>Dr. Deepak (Orthodontist)</option>
                    </select>
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Symptoms / Notes</label>
                 <div className="relative">
                    <FileText size={18} className="absolute left-4 top-4 text-slate-400" />
                    <textarea name="notes" rows={3} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold resize-none" placeholder="Briefly describe your pain or query..."></textarea>
                 </div>
              </div>

              <button type="submit" className="w-full py-5 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                 Request Appointment <ArrowRight size={18} />
              </button>

              <div className="flex lg:hidden items-center justify-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600 dark:text-blue-400 text-xs font-bold">
                 <Smartphone size={16} /> <span>Try Healthflo App for 0% EMI options.</span>
              </div>
           </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
