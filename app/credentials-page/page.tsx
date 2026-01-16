'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Award, CheckCircle2, FileText, ArrowLeft } from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

const CredentialsPage = () => {
  const certs = [
    {
      title: "ISO 9001:2015 Certified",
      org: "International Standards Organization",
      desc: "Certified for maintaining the highest standards in healthcare management, hygiene, and patient sterilization protocols.",
      icon: Shield
    },
    {
      title: "ADA Member",
      org: "American Dental Association",
      desc: "Adherence to international guidelines for clinical practice and ethics.",
      icon: Award
    },
    {
      title: "NABH Accredited Protocol",
      org: "National Accreditation Board for Hospitals",
      desc: "Our clinic follows strict NABH guidelines for patient safety and infection control.",
      icon: CheckCircle2
    },
    {
      title: "DCI Registered",
      org: "Dental Council of India",
      desc: "All our specialists are registered practitioners with valid licenses from the state dental council.",
      icon: FileText
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1019] pb-20 pt-24 font-sans transition-colors duration-500">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
            href="/"
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-all text-sm font-bold uppercase tracking-wider group"
        >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
        </Link>

        <RevealOnScroll>
            <div className="text-center mb-16">
                <span className="text-blue-600 dark:text-cyan-400 font-bold tracking-widest text-xs uppercase mb-3 block">Trust & Safety</span>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Our Credentials</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Noble Dental Care is committed to global standards of hygiene and clinical excellence. We don't just claim quality; we are certified for it.
                </p>
            </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
            {certs.map((cert, idx) => (
                <RevealOnScroll key={idx} delay={idx * 100}>
                    <div className="bg-white dark:bg-[#151b2b] p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-white/5 hover:border-blue-500/30 transition-all duration-300 group">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                            <cert.icon size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{cert.title}</h3>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">{cert.org}</div>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {cert.desc}
                        </p>
                    </div>
                </RevealOnScroll>
            ))}
        </div>

        {/* Sterilization Section */}
        <RevealOnScroll>
            <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">6-Step Sterilization Protocol</h2>
                        <p className="text-blue-100 mb-8 leading-relaxed">
                            We follow a rigorous Class B autoclaving process. Every instrument is manually cleaned, ultrasonically scrubbed, dried, pouched, and autoclaved.
                        </p>
                        <ul className="space-y-3">
                            {['Ultrasonic Cleaning', 'UV Disinfection', 'Class B Autoclave', 'Sealed Pouches'].map((step, i) => (
                                <li key={i} className="flex items-center gap-3 font-medium">
                                    <CheckCircle2 className="text-green-400" size={20} /> {step}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="h-64 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md flex items-center justify-center">
                         <Shield size={64} className="text-white/50" />
                    </div>
                </div>
            </div>
        </RevealOnScroll>

      </div>
    </div>
  );
};

export default CredentialsPage;
