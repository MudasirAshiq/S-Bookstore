import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ArrowUpRight } from 'lucide-react';

const BookCard = ({ book, onContactClick }) => {
  const { title, author, price, discount_percent, image_url, description } = book;
  
  const discountVal = parseFloat(discount_percent) || 0;
  const hasDiscount = discountVal > 0;
  const finalPrice = hasDiscount ? price - (price * discountVal / 100) : price;

  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={onContactClick}
      className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary-200/40 transition-all duration-500 border border-slate-100 flex flex-col h-full cursor-pointer relative"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden m-3 rounded-[2rem]">
        <img 
          src={image_url || 'https://via.placeholder.com/300x400?text=No+Cover'} 
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
        />
        
        {/* Overlay Badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
           <button className="w-full bg-white text-slate-900 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
             <ShoppingBag size={16} />
             Order Now
           </button>
        </div>

        {hasDiscount && (
          <div className="absolute top-4 left-4 glass px-4 py-2 rounded-2xl shadow-xl">
            <span className="text-primary-600 font-black text-xs">-{discount_percent}%</span>
          </div>
        )}
        
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl transform translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
          <ArrowUpRight size={18} className="text-primary-600" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-2 flex flex-col flex-grow">
        <div className="mb-2">
          <h3 className="text-xl font-black text-slate-900 line-clamp-1 group-hover:text-primary-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
            {author}
          </p>
        </div>

        <p className="text-sm text-slate-500 line-clamp-2 mb-6 font-medium leading-relaxed">
          {description || "Explore this amazing literary masterpiece from our curated collection."}
        </p>
        
        <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-4">
          <div className="flex flex-col">
            {hasDiscount ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-900">₹{parseFloat(finalPrice).toLocaleString('en-IN')}</span>
                <span className="text-xs text-slate-300 line-through font-bold">₹{parseFloat(price).toLocaleString('en-IN')}</span>
              </div>
            ) : (
              <span className="text-2xl font-black text-slate-900">₹{parseFloat(price).toLocaleString('en-IN')}</span>
            )}
          </div>
          <div className="bg-primary-50 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <Star size={14} className="text-primary-600" fill="currentColor" />
            <span className="text-xs font-black text-primary-700">4.9</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
