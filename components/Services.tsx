'use client';

import React from 'react';
import { Activity, Zap, Smile } from 'lucide-react';

const Services = () => {
  const services = [
    { title: "Dental Implants", desc: "Permanent replacement for missing teeth.", icon: Activity, color: "bg-blue-600" },
    { title: "Root Canal", desc: "Save infected teeth with single-visit treatment.", icon: Zap, color: "bg-teal-500" },
    { title: "Aligners", desc: "Straighten teeth without braces.", icon: Smile, color: "bg-indigo-600" },
  ];

  return (
    <section className="py-24 bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold">Our Expertise</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {services.map((s, i) => (
                    <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                        <div className={`w-12 h-12 ${s.color} rounded-full flex items-center justify-center mb-6`}>
                            <s.icon size={24} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                        <p className="text-slate-400">{s.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Services;
