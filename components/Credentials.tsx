'use client';

import React from 'react';

const Credentials = () => {
  const creds = [
    { code: 'ADA', label: 'American Dental Association' },
    { code: 'ITI', label: 'Intl Team for Implantology' },
    { code: 'ISO', label: 'ISO 9001:2015 Certified' },
    { code: 'DCI', label: 'Dental Council of India' },
    { code: 'WHO', label: 'WHO Compliance Partner' },
    { code: 'IDA', label: 'Indian Dental Association' },
  ];

  // Duplicate for infinite scroll
  const displayCreds = [...creds, ...creds, ...creds];

  return (
    <section className="py-20 overflow-hidden bg-slate-50 dark:bg-[#0B1019] transition-colors duration-500">
      <div className="text-center mb-10">
        <p className="text-blue-600 dark:text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase mb-2">Credentials</p>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Certifications & Registrations</h2>
      </div>

      <div className="relative w-full mask-gradient-x">
        <div className="flex animate-scroll hover:animate-paused gap-8 w-max pl-8">
          {displayCreds.map((item, idx) => (
            <div 
              key={`${item.code}-${idx}`}
              className="flex flex-col items-center justify-center min-w-[220px] p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-widest mb-2">{item.code}</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Credentials;
