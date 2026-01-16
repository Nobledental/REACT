'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How long does recovery take after a root canal?",
      answer: "Most patients experience mild discomfort for 1–3 days. Sensitivity may last up to a week, while full tissue healing can take longer. (Source: ADA)"
    },
    {
      question: "How safe are dental X-rays?",
      answer: "Dental X-rays involve very low radiation, similar to a few days of natural exposure. We use digital sensors and protective shielding to ensure maximum safety. (Source: NHS)"
    },
    {
      question: "How long does a root canal-treated tooth last?",
      answer: "With good oral hygiene and a crown restoration, root canal-treated teeth can last many years, often a lifetime. (Source: AAE)"
    },
    {
      question: "Can I go back to work right after dental procedures?",
      answer: "In most cases, yes. Patients can return to normal activities the same day, but avoid chewing on treated teeth until numbness fades."
    },
    {
      question: "What should I do if I feel pain or swelling after treatment?",
      answer: "Mild swelling and pain are common, but if symptoms worsen after a few days, contact us immediately. Use prescribed medication or OTC pain relief as directed."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden transition-colors duration-500 bg-slate-50 dark:bg-[#0B1019]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-blue-600 dark:text-cyan-400 font-bold tracking-widest text-xs uppercase mb-3">Common Questions</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Clear Answers for Your Peace of Mind</h3>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
             Answers reviewed by our dentists & aligned with ADA / NHS guidance.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index 
                  ? 'bg-white dark:bg-slate-800 border-blue-200 dark:border-cyan-500/30 shadow-lg' 
                  : 'bg-white/50 dark:bg-slate-900/30 border-slate-200 dark:border-white/5 hover:border-blue-300 dark:hover:border-white/20'
              }`}
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 outline-none"
              >
                <span className={`font-bold text-lg ${openIndex === index ? 'text-blue-700 dark:text-cyan-400' : 'text-slate-700 dark:text-slate-200'}`}>
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === index ? 'bg-blue-100 dark:bg-cyan-500/20 text-blue-600 dark:text-cyan-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
