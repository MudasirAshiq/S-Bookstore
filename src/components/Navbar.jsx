import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onAdminClick, onHomeClick, onCollectionClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (name, href) => {
    setIsMobileMenuOpen(false);
    if (name === 'Home') {
      onHomeClick();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (name === 'Books') {
      onCollectionClick();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onHomeClick();
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Books', href: '#books' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full z-50 px-4 sm:px-6 py-6 pointer-events-none">
      <div className={`
        container mx-auto max-w-7xl px-4 h-16 flex justify-between items-center transition-all duration-500 pointer-events-auto
        ${isScrolled 
          ? 'glass rounded-2xl sm:rounded-full h-20 px-8 shadow-2xl shadow-primary-500/10' 
          : 'bg-transparent h-16'}
      `}>
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => { onHomeClick(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary-400 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-gradient-to-br from-primary-600 to-primary-700 p-2.5 rounded-xl shadow-lg transform group-hover:rotate-12 transition-transform">
              <BookOpen className="text-white w-6 h-6" />
            </div>
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            Sapien<span className="text-primary-600">Books</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.name, link.href)} 
              className="px-5 py-2.5 text-slate-600 hover:text-primary-600 font-bold text-sm tracking-wide rounded-full hover:bg-primary-50/50 transition-all"
            >
              {link.name}
            </button>
          ))}
          <div className="w-px h-6 bg-slate-200 mx-4" />
          <button 
            onClick={onAdminClick}
            className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-full font-bold text-sm hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200 transition-all active:scale-95"
          >
            <ShieldCheck size={16} />
            Admin
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className={`p-2 rounded-xl transition-colors ${isMobileMenuOpen ? 'bg-slate-100 text-primary-600' : 'text-slate-900'}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-24 left-4 right-4 glass rounded-[2rem] p-8 shadow-2xl border border-slate-100 flex flex-col gap-4 pointer-events-auto"
          >
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link.name, link.href)}
                className="text-xl font-bold text-slate-700 hover:text-primary-600 text-left p-4 rounded-2xl hover:bg-primary-50 transition-colors"
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onAdminClick();
              }}
              className="mt-4 flex items-center justify-center gap-3 bg-primary-600 text-white p-5 rounded-2xl font-black text-lg shadow-xl shadow-primary-200"
            >
              <ShieldCheck size={20} />
              Admin Portal
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
