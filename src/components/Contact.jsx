import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-slate-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="h-px w-8 bg-primary-600" />
              <span className="text-primary-600 font-black text-xs uppercase tracking-[0.2em]">Contact Us</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight"
            >
              Let's Start a <span className="text-gradient">Conversation.</span>
            </motion.h2>
            <p className="text-lg text-slate-500 mb-12 font-medium leading-relaxed">
              Have a specific request or looking for a rare title? Our literary consultants are here to assist you with personalized recommendations.
            </p>

            <div className="space-y-8">
              {[
                { icon: <Mail />, label: 'Inquiries', value: 'curation@sapienbooks.com' },
                { icon: <Phone />, label: 'Concierge', value: '+91-98100-93952' },
                { icon: <Clock />, label: 'Consultation Hours', value: 'Mon - Sat: 10:00 - 19:00' },
                { icon: <MapPin />, label: 'Private Library', value: '166, Asif Ali Road, New Delhi' },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:shadow-md group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 text-primary-600 border border-slate-100">
                    {React.cloneElement(item.icon, { size: 24 })}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-lg font-black text-slate-900">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-white p-10 md:p-16 rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-primary-50 p-3 rounded-2xl text-primary-600">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Send a Secure Message</h3>
            </div>

            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Identity</label>
                  <input 
                    type="text" 
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-bold"
                    placeholder="Your Full Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Email Channel</label>
                  <input 
                    type="email" 
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-bold"
                    placeholder="name@company.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Inquiry Subject</label>
                <input 
                  type="text" 
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-bold"
                  placeholder="Order Status, Book Request, etc."
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Detailed Message</label>
                <textarea 
                  rows="4"
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-medium resize-none"
                  placeholder="Tell us how we can assist you..."
                ></textarea>
              </div>
              <button 
                className="btn-primary w-full py-5 rounded-2xl text-lg group"
              >
                <span>Dispatch Message</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
