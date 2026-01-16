'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, CalendarCheck } from 'lucide-react';

// Define the interface for props
interface FooterProps {
  onBookClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onBookClick }) => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 rounded-t-[3rem] mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex flex-col border-l-2 border-white/20 pl-4">
               <span className="text-2xl font-black tracking-tight leading-none">NOBLE <span className="text-blue-500">DENTAL</span></span>
               <span className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Care</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Pioneering biological dentistry with advanced surgical protocols and microscopic precision in Nallagandla.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Treatments</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/treatments/dental-implants" className="hover:text-blue-400 transition-colors">Dental Implants</Link></li>
              <li><Link href="/treatments/root-canal" className="hover:text-blue-400 transition-colors">Microscopic RCT</Link></li>
              <li><Link href="/treatments/invisalign" className="hover:text-blue-400 transition-colors">Invisalign</Link></li>
              <li><Link href="/treatments/kids-dentistry" className="hover:text-blue-400 transition-colors">Kids Dentistry</Link></li>
              {/* Added Book Button usage */}
              <li>
                <button onClick={onBookClick} className="hover:text-blue-400 transition-colors text-left flex items-center gap-2">
                   <CalendarCheck size={14} /> Book Visit
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 mt-0.5" />
                <span>Nallagandla, Serilingampally<br/>Hyderabad, Telangana 500019</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500" />
                <a href="tel:+918610425342" className="hover:text-white">+91 861 042 5342</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500" />
                <a href="mailto:contact@nobledental.com" className="hover:text-white">contact@nobledental.com</a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-bold mb-6">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all"><Twitter size={18} /></a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">© 2024 Noble Dental Care. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-slate-500">
             <Link href="#" className="hover:text-white">Privacy Policy</Link>
             <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
