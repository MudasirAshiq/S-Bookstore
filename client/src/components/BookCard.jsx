import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';

const BookCard = ({ book, onContactClick }) => {
  const { title, author, price, discount_percent, image_url, description } = book;
  
  const discountVal = parseFloat(discount_percent) || 0;
  const hasDiscount = discountVal > 0;
  const finalPrice = hasDiscount ? price - (price * discountVal / 100) : price;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      onClick={onContactClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full cursor-pointer"
    >
      <div className="relative aspect-[3/4] overflow-hidden group">
        <img 
          src={image_url || 'https://via.placeholder.com/300x400?text=No+Cover'} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {hasDiscount && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {discount_percent}% OFF
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-3 italic">by {author}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
          {description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {hasDiscount ? (
              <>
                <span className="text-xl font-extrabold text-primary-600">₹{parseFloat(finalPrice).toLocaleString('en-IN')}</span>
                <span className="text-sm text-gray-400 line-through">₹{parseFloat(price).toLocaleString('en-IN')}</span>
              </>
            ) : (
              <span className="text-xl font-extrabold text-gray-900">₹{parseFloat(price).toLocaleString('en-IN')}</span>
            )}
          </div>
          <div className="flex items-center text-yellow-400">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold text-gray-700 ml-1">4.8</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
