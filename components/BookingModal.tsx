'use client';

import React, { useState, useEffect } from 'react';
import { X, Phone, MessageCircle, ArrowRight, Smartphone, User, Stethoscope, FileText, Download, CheckCircle, Loader2 } from 'lucide-react';

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
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStatus('idle'); // Reset on open
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Construct WhatsApp Message
    const msg = `Booking via Noble Website:\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}\nDoctor: ${formData.doctor}\nNotes: ${formData.notes}`;
    
    // Open WhatsApp
    window.open(`https://wa.me/918610425342?text=${encodeURIComponent(msg)}`, '_blank');
    
    setStatus('success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose}></div>
      
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#0B1019] rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 grid lg:grid-cols-5 max-h-[90vh]">
        
        {/* Left Side: Healthflo Promotion */}
        <div className="hidden lg:flex lg:col-span-2 bg-slate-900 p-12 flex-col justify-between relative overflow-hidden text-white">
           {/* Abstract Decoration */}
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[80px] pointer-events-none"></div>
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
           
           <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-white/10">
                 <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span> Noble Dental Care
              </div>
              
              <h2 className="text-3xl font-black leading-tight mb-6">Upgrade your <br/> Experience.</h2>
              <p className="text-slate-400 font-medium leading-relaxed mb-10 text-sm">
                Install <strong>Healthflo-OS</strong> for seamless appointment tracking, digital case records, and instant medical support.
              </p>
              
              <div className="space-y-4">
                 {[
                   "Zero Paperwork",
                   "Real-time Queue Status",
                   "Digital X-ray Archives",
                   "0% EMI Bill Payments"
                 ].map((feat, i) => (
                   <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-300">
                      <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-400"><CheckCircle size={12} /></div>
                      {feat}
                   </div>
                 ))}
              </div>
           </div>

           <div className="relative z-10">
              <a href="#" className="flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-900/50 hover:bg-blue-500 transition-all group">
                 <Download size={16} className="group-hover:-translate-y-0.5 transition-transform" /> Download App
              </a>
           </div>
        </div>

        {/* Right Side: Form or Success State */}
        <div className="col-span-5 lg:col-span-3 bg-white dark:bg-[#0B1019] relative">
           
           {/* Close Button */}
           <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 rounded-full transition-all z-20">
              <X size={20} />
           </button>

           {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                    <CheckCircle size={48} strokeWidth={3} />
                 </div>
                 <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Request Sent!</h3>
                 <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8 font-medium">
                    We have received your booking details. A team member will verify your slot via WhatsApp shortly.
                 </p>
                 <button onClick={onClose} className="px-8 py-3 bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                    Close Window
                 </button>
              </div>
           ) : (
              <div className="h-full p-8 sm:p-12 overflow-y-auto custom-scrollbar">
                  <div className="mb-8">
                     <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Reserve a Slot.</h3>
                     <p className="text-sm font-medium text-slate-500">Priority scheduling for online patients.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                     <a href="tel:+918610425342" className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl group hover:border-blue-500/50 transition-all">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                           <Phone size={18} />
                        </div>
                        <div>
                           <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">Emergency</div>
                           <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">Call Now</div>
                        </div>
                     </a>
                     <a href="https://wa.me/918610425342" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl group hover:border-green-500/50 transition-all">
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                           <MessageCircle size={18} />
                        </div>
                        <div>
                           <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">Quick Chat</div>
                           <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-green-600 transition-colors">WhatsApp</div>
                        </div>
                     </a>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                     <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Name</label>
                           <div className="relative group">
                              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                              <input type="text" name="name" required onChange={handleChange} className="w-full bg-white dark:bg-[#0f1420] border-2 border-slate-100 dark:border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors" placeholder="Full Name" />
                           </div>
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                           <div className="relative group">
                              <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                              <input type="tel" name="phone" required onChange={handleChange} className="w-full bg-white dark:bg-[#0f1420] border-2 border-slate-100 dark:border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors" placeholder="+91 00000 00000" />
                           </div>
                        </div>
                     </div>

                     <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Specialist</label>
                        <div className="relative group">
                           <Stethoscope size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                           <select name="doctor" onChange={handleChange} className="w-full bg-white dark:bg-[#0f1420] border-2 border-slate-100 dark:border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer">
                              <option>Dr. Dhivakaran (Implantologist)</option>
                              <option>Dr. Roger Ronaldo (Surgeon)</option>
                              <option>Dr. Deepak (Orthodontist)</option>
                           </select>
                           <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Notes</label>
                        <div className="relative group">
                           <FileText size={16} className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                           <textarea name="notes" rows={3} onChange={handleChange} className="w-full bg-white dark:bg-[#0f1420] border-2 border-slate-100 dark:border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors resize-none" placeholder="Describe symptoms..."></textarea>
                        </div>
                     </div>

                     <button 
                        type="submit" 
                        disabled={status === 'submitting'}
                        className="w-full py-4 bg-slate-900 dark:bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-slate-900/10 hover:translate-y-[-2px] active:translate-y-[1px] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                     >
                        {status === 'submitting' ? (
                           <> <Loader2 size={16} className="animate-spin" /> Processing... </>
                        ) : (
                           <> Request Appointment <ArrowRight size={16} /> </>
                        )}
                     </button>
                  </form>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
