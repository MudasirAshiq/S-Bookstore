import React from 'react';
import { BookOpen, Send, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

const Footer = ({ onHomeClick, onCollectionClick }) => {
  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12 overflow-hidden relative">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-600/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-primary-600 p-2.5 rounded-xl">
                <BookOpen className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight">Sapien<span className="text-primary-400">Books</span></span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed mb-10 text-lg font-medium">
              Curating the world's most profound literature for the modern intellectual. Join our global community of readers and discover your next transformation.
            </p>
            <div className="flex gap-4">
              {[
                { label: 'FB', color: 'hover:bg-blue-600' },
                { label: 'IG', color: 'hover:bg-pink-600' },
                { label: 'TW', color: 'hover:bg-slate-800' },
                { label: 'LI', color: 'hover:bg-blue-700' },
              ].map(social => (
                <a 
                  key={social.label} 
                  href="#" 
                  className={`w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center font-black text-xs transition-all duration-300 ${social.color} hover:-translate-y-1`}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-primary-400">Navigation</h4>
            <ul className="space-y-4 text-slate-400 font-bold">
              <li><button onClick={onHomeClick} className="hover:text-white transition-colors">Digital Library</button></li>
              <li><button onClick={onCollectionClick} className="hover:text-white transition-colors">All Collections</button></li>
              <li><button onClick={() => { onHomeClick(); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-white transition-colors">Our Legacy</button></li>
              <li><button onClick={() => { onHomeClick(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-white transition-colors">Concierge</button></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-primary-400">Newsletter</h4>
            <p className="text-slate-400 mb-8 font-medium">Receive curated recommendations and exclusive access to limited editions.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Ex: reader@sapien.com" 
                className="w-full bg-slate-800 border-none rounded-2xl px-6 py-5 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-primary-600 px-6 rounded-xl font-black text-sm hover:bg-primary-700 transition-colors shadow-lg">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800/50 pt-12 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col md:flex-row items-center gap-8 text-xs font-black text-slate-500 uppercase tracking-widest">
            <p>© 2026 SapienBooks. Limited Edition.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Architected By</span>
            <a 
              href="https://codefons.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-slate-800/50 border border-slate-700 rounded-2xl py-2.5 px-5 hover:border-orange-500/50 hover:bg-slate-800 transition-all duration-300"
            >
              <div className="bg-orange-500 rounded-lg p-2 shadow-lg group-hover:rotate-12 transition-transform">
                <Sparkles size={14} className="text-white" />
              </div>
              <span className="font-black tracking-tight text-sm">
                <span className="text-slate-400 group-hover:text-white transition-colors">Code</span>
                <span className="text-orange-500">FONS</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
