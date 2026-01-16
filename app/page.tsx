import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Testimonials />
      
      <section className="py-20 bg-blue-600 dark:bg-blue-900/30 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">Ready for a new smile?</h2>
          <p className="text-xl text-blue-100 mb-10 font-medium">Book your consultation today and experience biological precision.</p>
          <Link href="/treatments" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform">
            View All Treatments <ArrowRight size={18}/>
          </Link>
        </div>
      </section>
    </>
  );
}
