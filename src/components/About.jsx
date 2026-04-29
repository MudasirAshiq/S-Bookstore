import React from 'react';
import { motion } from 'framer-motion';
import { Book, Award, Users, ShieldCheck, Sparkles } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Book />, label: 'Book Genres', value: '50+' },
    { icon: <Award />, label: 'Best Sellers', value: '200+' },
    { icon: <Users />, label: 'Happy Readers', value: '15k+' },
    { icon: <ShieldCheck />, label: 'Safe Delivery', value: '100%' },
  ];

  return (
    <section id="about" className="section-padding bg-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-50/50 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2" />
      
      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000&auto=format&fit=crop" 
                alt="Boutique Library" 
                className="w-full h-[350px] md:h-[600px] object-cover transform hover:scale-105 transition-transform duration-1000"
              />
            </div>
            {/* Overlay Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-10 -right-10 glass p-8 rounded-[2.5rem] max-w-[280px] shadow-2xl hidden md:block"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary-600 p-3 rounded-2xl text-white shadow-lg">
                  <Sparkles size={24} />
                </div>
                <p className="font-black text-slate-900 leading-tight">Handpicked <br /> Books</p>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                We carefully choose every book in our store to make sure you get the best reading experience.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-primary-600" />
              <span className="text-primary-600 font-black text-xs uppercase tracking-[0.2em]">Our Story</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
              A Peaceful Place for <span className="text-gradient">Book Lovers.</span>
            </h2>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed font-medium">
              At SapienBooks, we think every book is a path to a new story. We want to help you find books that make you happy and help you learn. We started as a small shop and now we help readers everywhere find their next favorite book.
            </p>
            
            <div className="grid grid-cols-2 gap-10">
              {stats.map((stat, i) => (
                <div key={i} className="group">
                  <div className="flex gap-5 items-center mb-2">
                    <div className="bg-slate-50 p-4 rounded-2xl text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                      {React.cloneElement(stat.icon, { size: 24 })}
                    </div>
                    <div>
                      <h4 className="text-3xl font-black text-slate-900">{stat.value}</h4>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
