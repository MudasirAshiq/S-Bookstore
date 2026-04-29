import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [activeSide, setActiveSide] = useState('info'); // 'info' or 'form'
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="relative bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 min-h-[600px]">
          
          {/* Sliding Background (Responsive) */}
          <motion.div 
            initial={false}
            animate={{ 
              x: !isMobile ? (activeSide === 'info' ? '0%' : '100%') : 0,
              y: isMobile ? (activeSide === 'info' ? '0%' : '100%') : 0,
              borderRadius: activeSide === 'info' 
                ? (!isMobile ? '0 2.5rem 2.5rem 0' : '0 0 2.5rem 2.5rem') 
                : (!isMobile ? '2.5rem 0 0 2.5rem' : '2.5rem 2.5rem 0 0')
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="absolute top-0 left-0 w-full lg:w-1/2 h-1/2 lg:h-full bg-primary-600 z-0"
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 z-10 h-full min-h-[600px]">
            
            {/* Left Side: Info */}
            <div 
              onClick={() => setActiveSide('info')}
              className={`p-12 lg:p-16 transition-colors duration-500 cursor-pointer flex flex-col justify-center ${activeSide === 'info' ? 'text-white' : 'text-gray-900'}`}
            >
              <h2 className="text-4xl font-black mb-6">Get in Touch</h2>
              <p className={`mb-12 text-lg font-medium ${activeSide === 'info' ? 'text-primary-100' : 'text-gray-500'}`}>
                Have questions about a book or your order? Our team is here to help you find your next great read.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6 group">
                  <div className={`p-4 rounded-2xl transition-colors duration-500 ${activeSide === 'info' ? 'bg-white/10 group-hover:bg-white/20' : 'bg-primary-50 text-primary-600'}`}>
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className={`text-sm uppercase tracking-widest font-black mb-1 ${activeSide === 'info' ? 'text-primary-200' : 'text-primary-600'}`}>Email Us</p>
                    <p className="text-xl font-bold">info@sapienbooks.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group">
                  <div className={`p-4 rounded-2xl transition-colors duration-500 ${activeSide === 'info' ? 'bg-white/10 group-hover:bg-white/20' : 'bg-primary-50 text-primary-600'}`}>
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className={`text-sm uppercase tracking-widest font-black mb-1 ${activeSide === 'info' ? 'text-primary-200' : 'text-primary-600'}`}>Phone</p>
                    <p className="text-xl font-bold">+91-98100-93952</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className={`p-4 rounded-2xl transition-colors duration-500 ${activeSide === 'info' ? 'bg-white/10 group-hover:bg-white/20' : 'bg-primary-50 text-primary-600'}`}>
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className={`text-sm uppercase tracking-widest font-black mb-1 ${activeSide === 'info' ? 'text-primary-200' : 'text-primary-600'}`}>Landline</p>
                    <p className="text-xl font-bold">011-23271100</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className={`p-4 rounded-2xl transition-colors duration-500 ${activeSide === 'info' ? 'bg-white/10 group-hover:bg-white/20' : 'bg-primary-50 text-primary-600'}`}>
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className={`text-sm uppercase tracking-widest font-black mb-1 ${activeSide === 'info' ? 'text-primary-200' : 'text-primary-600'}`}>Visit Us</p>
                    <p className="text-xl font-bold leading-tight">166, Service Lane, Asif Ali Road,<br/>New Delhi - 110002</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div 
              onClick={() => setActiveSide('form')}
              className={`p-12 lg:p-16 transition-colors duration-500 cursor-pointer flex flex-col justify-center ${activeSide === 'form' ? 'text-white' : 'text-gray-900'}`}
            >
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-bold mb-2 transition-colors duration-500 ${activeSide === 'form' ? 'text-white' : 'text-gray-700'}`}>Full Name</label>
                    <input 
                      type="text" 
                      onFocus={() => setActiveSide('form')}
                      className={`w-full px-5 py-4 rounded-2xl border transition-all duration-300 outline-none ${activeSide === 'form' ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20' : 'bg-gray-50 border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 text-gray-900'}`}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 transition-colors duration-500 ${activeSide === 'form' ? 'text-white' : 'text-gray-700'}`}>Email Address</label>
                    <input 
                      type="email" 
                      onFocus={() => setActiveSide('form')}
                      className={`w-full px-5 py-4 rounded-2xl border transition-all duration-300 outline-none ${activeSide === 'form' ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20' : 'bg-gray-50 border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 text-gray-900'}`}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-bold mb-2 transition-colors duration-500 ${activeSide === 'form' ? 'text-white' : 'text-gray-700'}`}>Subject</label>
                  <input 
                    type="text" 
                    onFocus={() => setActiveSide('form')}
                    className={`w-full px-5 py-4 rounded-2xl border transition-all duration-300 outline-none ${activeSide === 'form' ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20' : 'bg-gray-50 border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 text-gray-900'}`}
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-bold mb-2 transition-colors duration-500 ${activeSide === 'form' ? 'text-white' : 'text-gray-700'}`}>Message</label>
                  <textarea 
                    rows="4"
                    onFocus={() => setActiveSide('form')}
                    className={`w-full px-5 py-4 rounded-2xl border transition-all duration-300 outline-none resize-none ${activeSide === 'form' ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20' : 'bg-gray-50 border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 text-gray-900'}`}
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button 
                  className={`w-full py-4 rounded-2xl text-lg font-bold flex justify-center items-center gap-2 shadow-xl transition-all duration-500 active:scale-95 ${activeSide === 'form' ? 'bg-white text-primary-600 hover:bg-gray-100 shadow-white/10' : 'bg-primary-600 text-white hover:bg-primary-700 shadow-primary-200'}`}
                >
                  Send Message
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
