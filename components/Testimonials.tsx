'use client';

import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    { id: '1', name: 'Sahana Rao', location: 'Tellapur', rating: 5, text: "Visited from Tellapur for a same-day root canal. The procedure was painless." },
    { id: '2', name: 'Anjali R.', location: 'Tellapur', rating: 5, text: "Absolutely painless root canal — done in a single visit!" },
    { id: '3', name: 'Rahul M.', location: 'Gachibowli', rating: 4, text: "Clear Invisalign plan with 3D simulation. Amazing clarity." },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#020617]">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-blue-600 dark:text-cyan-400 font-bold tracking-widest text-xs uppercase mb-3">Patient Stories</h2>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Verified Reviews</h3>
      </div>
      
      <div className="flex flex-wrap justify-center gap-6 px-6">
        {reviews.map((review) => (
            <div key={review.id} className="w-full md:w-[350px] bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex gap-1 text-blue-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                    ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">"{review.text}"</p>
                <div className="font-bold text-slate-900 dark:text-white">{review.name}</div>
                <div className="text-xs text-slate-400 uppercase">{review.location}</div>
            </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
