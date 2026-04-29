import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const Hero = ({ onBrowseClick }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-primary-200/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
            Find Your Next <span className="text-primary-600">Favorite Story</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
            Browse our collection of great books. From old favorites to new hits, we have something for everyone to enjoy.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onBrowseClick}
              className="btn-primary flex items-center gap-2 group"
            >
              Browse Collection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#about" className="btn-secondary">
              Our Story
            </a>
          </div>
          
          <div className="mt-12 flex items-center gap-8 border-t border-gray-200 pt-8">
            <div>
              <p className="text-3xl font-bold text-gray-900">10k+</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Books</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div>
              <p className="text-3xl font-bold text-gray-900">5k+</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Readers</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div>
              <p className="text-3xl font-bold text-gray-900">4.9/5</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Rating</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop" 
              alt="Bookshelf" 
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
