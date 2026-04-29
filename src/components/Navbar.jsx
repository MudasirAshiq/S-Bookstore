import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';

const Navbar = ({ onAdminClick, onHomeClick, onCollectionClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
      // Wait for re-render then scroll
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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { onHomeClick(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <div className="bg-primary-600 p-2 rounded-lg">
            <BookOpen className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-primary-900">Sapien<span className="text-primary-600">Books</span></span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.name, link.href)} 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={onAdminClick}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Admin
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-900">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-6 px-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.name, link.href)}
              className="text-lg font-medium text-gray-700 hover:text-primary-600 text-left"
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              onAdminClick();
            }}
            className="bg-primary-600 text-white px-4 py-3 rounded-lg font-medium text-center"
          >
            Admin Panel
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
