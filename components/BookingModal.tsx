'use client';

import React, { useState } from 'react';
import { X, CalendarCheck, Loader2 } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-8 relative shadow-2xl animate-fade-in-up">
        
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <X size={20} className="text-slate-500" />
        </button>

        {isSuccess ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
               <CalendarCheck size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Request Sent!</h3>
            <p className="text-slate-500">Our team will call you shortly to confirm.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Book Appointment</h3>
               <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Priority slots available for today.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Full Name</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="John Doe" />
               </div>
               
               <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Phone Number</label>
                  <input required type="tel" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="+91 98765 43210" />
               </div>

               <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Reason for Visit</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                     <option>General Checkup</option>
                     <option>Tooth Pain</option>
                     <option>Implants / Surgery</option>
                     <option>Braces / Invisalign</option>
                     <option>Kids Dental</option>
                  </select>
               </div>

               <button disabled={isSubmitting} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : 'Confirm Booking'}
               </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
