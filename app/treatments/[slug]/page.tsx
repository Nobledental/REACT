import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { treatmentsData } from '@/data/treatments';
import { ArrowLeft, CheckCircle2, Calendar } from 'lucide-react';

// This function tells GitHub Pages which pages to build
export function generateStaticParams() {
  return Object.keys(treatmentsData).map((slug) => ({
    slug: slug,
  }));
}

export default function TreatmentDetail({ params }: { params: { slug: string } }) {
  const treatment = treatmentsData[params.slug];

  if (!treatment) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-500">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image 
          src={treatment.heroImage} 
          alt={treatment.title} 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
           <Link href="/treatments" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={20} className="mr-2" /> Back to Catalog
           </Link>
           <div className="px-4 py-1.5 rounded-full bg-blue-600/90 text-white w-fit text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              {treatment.category}
           </div>
           <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">{treatment.title}</h1>
           <p className="text-xl text-white/90 max-w-2xl font-medium">{treatment.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20 grid lg:grid-cols-3 gap-16">
         
         {/* Main Content */}
         <div className="lg:col-span-2 space-y-16">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
               {treatment.stats.map((stat, i) => (
                  <div key={i} className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 text-center">
                     <div className="w-10 h-10 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3">
                        <stat.icon size={20} />
                     </div>
                     <div className="text-2xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</div>
                     <div className="text-[10px] uppercase tracking-widest text-slate-500">{stat.label}</div>
                  </div>
               ))}
            </div>

            {/* Description */}
            <div className="prose dark:prose-invert max-w-none">
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Overview</h3>
               <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  {treatment.longDescription}
               </p>
            </div>

            {/* Process Steps */}
            <div>
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Clinical Protocol</h3>
               <div className="space-y-6">
                  {treatment.process.map((step, i) => (
                     <div key={i} className="flex gap-6 group">
                        <div className="flex flex-col items-center">
                           <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-sm z-10">
                              {i + 1}
                           </div>
                           {i !== treatment.process.length - 1 && <div className="w-px h-full bg-slate-200 dark:bg-white/10 my-2"></div>}
                        </div>
                        <div className="pb-8">
                           <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{step.title}</h4>
                           <p className="text-slate-500 dark:text-slate-400">{step.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

         </div>

         {/* Sidebar */}
         <div className="space-y-10">
            
            {/* Benefits Card */}
            <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
               <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10"><CheckCircle2 /> Key Benefits</h3>
               <ul className="space-y-4 relative z-10">
                  {treatment.benefits.map((benefit, i) => (
                     <li key={i} className="flex items-start gap-3 text-sm font-medium opacity-90">
                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0"></span>
                        {benefit}
                     </li>
                  ))}
               </ul>
            </div>

            {/* FAQs */}
            <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5">
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Common Questions</h3>
               <div className="space-y-6">
                  {treatment.faqs.map((faq, i) => (
                     <div key={i}>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">{faq.q}</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                     </div>
                  ))}
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}
