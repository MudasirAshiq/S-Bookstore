import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full sm:w-[95%] sm:max-w-lg rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden relative max-h-[92vh] sm:max-h-[90vh] flex flex-col"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-primary-100 transition-colors z-20 bg-primary-700/50 p-2 rounded-full backdrop-blur-sm"
            >
              <X size={18} />
            </button>

            {/* Mobile drag indicator */}
            <div className="sm:hidden flex justify-center pt-3 pb-0">
              <div className="w-10 h-1 bg-slate-300 rounded-full" />
            </div>

            <div className="overflow-y-auto custom-scrollbar flex-grow">
              {/* Header */}
              <div className="bg-primary-600 px-5 py-6 sm:p-10 text-white text-center">
                <div className="bg-white/20 w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Send size={22} className="sm:hidden" />
                  <Send size={28} className="hidden sm:block" />
                </div>
                <h3 className="text-xl sm:text-3xl font-black mb-1 sm:mb-2">Order This Book</h3>
                <p className="text-primary-100 text-xs sm:text-base px-2 sm:px-4">Contact us to place your order or for any inquiries.</p>
              </div>

              {/* Contact Items */}
              <div className="p-4 sm:p-8 space-y-2.5 sm:space-y-4">
                {/* Email */}
                <a href="mailto:info@sapienbooks.com" className="flex items-center gap-3 sm:gap-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-primary-50 active:bg-primary-50 transition-colors border border-transparent hover:border-primary-100 group">
                  <div className="bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl shadow-sm text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all flex-shrink-0">
                    <Mail size={18} className="sm:hidden" />
                    <Mail size={22} className="hidden sm:block" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</p>
                    <p className="text-sm sm:text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors truncate">info@sapienbooks.com</p>
                  </div>
                </a>

                {/* Phone */}
                <a href="tel:+919810093952" className="flex items-center gap-3 sm:gap-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-primary-50 active:bg-primary-50 transition-colors border border-transparent hover:border-primary-100 group">
                  <div className="bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl shadow-sm text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all flex-shrink-0">
                    <Phone size={18} className="sm:hidden" />
                    <Phone size={22} className="hidden sm:block" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</p>
                    <p className="text-sm sm:text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">+91-98100-93952</p>
                  </div>
                </a>

                {/* Landline */}
                <a href="tel:01142831034" className="flex items-center gap-3 sm:gap-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-primary-50 active:bg-primary-50 transition-colors border border-transparent hover:border-primary-100 group">
                  <div className="bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl shadow-sm text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all flex-shrink-0">
                    <Phone size={18} className="sm:hidden" />
                    <Phone size={22} className="hidden sm:block" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Landline</p>
                    <p className="text-sm sm:text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">011-42831034</p>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-center gap-3 sm:gap-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50 transition-colors border border-transparent group">
                  <div className="bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl shadow-sm text-primary-600 flex-shrink-0">
                    <MapPin size={18} className="sm:hidden" />
                    <MapPin size={22} className="hidden sm:block" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Store Address</p>
                    <p className="text-xs sm:text-base font-bold text-gray-900 leading-tight">166, Service Lane, Asif Ali Road, New Delhi - 10002</p>
                  </div>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={onClose}
                  className="w-full btn-primary py-3.5 sm:py-4 text-base sm:text-lg mt-3 sm:mt-4 shadow-xl shadow-primary-100 rounded-xl sm:rounded-2xl"
                >
                  Got it!
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
