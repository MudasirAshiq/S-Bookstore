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
              A friendly home for book lovers. Join our community and find your next great story to read and enjoy.
            </p>
            <div className="flex gap-4">
              {[
                { 
                  label: 'Facebook', 
                  color: 'hover:bg-[#1877F2]', 
                  svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> 
                },
                { 
                  label: 'Instagram', 
                  color: 'hover:bg-[#E4405F]', 
                  svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.308 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.353 2.617 6.77 6.977 6.97 1.28.057 1.688.072 4.948.072s3.668-.014 4.948-.072c4.351-.2 6.77-2.617 6.97-6.977.058-1.28.072-1.688.072-4.948s-.014-3.668-.072-4.948c-.2-4.351-2.617-6.77-6.977-6.97C15.668.014 15.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4.162 4.162 0 110-8.324A4.162 4.162 0 0112 16zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                },
                { 
                  label: 'X', 
                  color: 'hover:bg-black', 
                  svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                },
                { 
                  label: 'Telegram', 
                  color: 'hover:bg-[#0088cc]', 
                  svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.257.257-.527.257l.215-3.048 5.548-5.013c.242-.214-.054-.332-.375-.117L8.71 13.5l-2.955-.924c-.642-.201-.654-.642.133-.949l11.55-4.45c.535-.194 1.002.126.856.944z"/></svg>
                },
              ].map(social => (
                <a 
                  key={social.label} 
                  href="#" 
                  title={social.label}
                  className={`w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center transition-all duration-300 ${social.color} hover:-translate-y-1 text-slate-400 hover:text-white`}
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-primary-400">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 font-bold">
              <li><button onClick={onHomeClick} className="hover:text-white transition-colors">Home</button></li>
              <li><button onClick={onCollectionClick} className="hover:text-white transition-colors">All Books</button></li>
              <li><button onClick={() => { onHomeClick(); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => { onHomeClick(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-white transition-colors">Contact Us</button></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-primary-400">Join Us</h4>
            <p className="text-slate-400 mb-8 font-medium">Sign up for our newsletter to get new book updates and special offers.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Ex: reader@email.com" 
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
            <p>© 2026 SapienBooks. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white font-bold uppercase tracking-widest text-[10px]">Designed By</span>
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
