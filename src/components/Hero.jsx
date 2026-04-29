import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BookOpen, Users, Star } from 'lucide-react';

const Hero = ({ onBrowseClick }) => {
  return (
    <section id="home" className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden bg-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-100/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-full mb-8"
            >
              <Sparkles className="text-primary-600 w-4 h-4" />
              <span className="text-primary-700 text-xs font-black uppercase tracking-widest">Our Best Books 2026</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.95] mb-8 tracking-tighter">
              Find Your Next <br />
              <span className="text-gradient">Favorite Story.</span>
            </h1>
            
            <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-lg font-medium">
              Browse our collection of great books. From old favorites to new hits, we have something for everyone to enjoy.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onBrowseClick}
                className="btn-primary scale-110 sm:scale-100"
              >
                <span>Browse Books</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary"
              >
                About Us
              </button>
            </div>
            
            <div className="mt-16 grid grid-cols-3 gap-8 p-8 bg-white/50 backdrop-blur-sm rounded-[2rem] border border-slate-100 max-w-md">
              <div className="text-center">
                <div className="flex justify-center mb-1 text-primary-600"><BookOpen size={20} /></div>
                <p className="text-2xl font-black text-slate-900">12k+</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Books</p>
              </div>
              <div className="text-center border-x border-slate-100">
                <div className="flex justify-center mb-1 text-primary-600"><Users size={20} /></div>
                <p className="text-2xl font-black text-slate-900">8k+</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Readers</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-1 text-primary-600"><Star size={20} /></div>
                <p className="text-2xl font-black text-slate-900">4.9</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rating</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-primary-600 rounded-[3rem] blur-3xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-white p-4 rounded-[3.5rem] shadow-2xl border border-slate-100">
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop" 
                    alt="Luxury Bookstore" 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              
              {/* Floating Element 1 */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 glass p-6 rounded-3xl shadow-2xl"
              >
                <div className="bg-accent-100 p-3 rounded-2xl mb-2 text-accent-600">
                  <Sparkles size={24} />
                </div>
                <p className="font-black text-slate-900 leading-none">New Release</p>
                <p className="text-xs text-slate-400 mt-1">Available Now</p>
              </motion.div>

              {/* Floating Element 2 */}
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 glass p-6 rounded-3xl shadow-2xl"
              >
                <div className="flex -space-x-3 mb-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-4 border-white bg-primary-600 flex items-center justify-center text-white text-[10px] font-bold">
                    +5k
                  </div>
                </div>
                <p className="font-black text-slate-900 leading-none">Active Readers</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
