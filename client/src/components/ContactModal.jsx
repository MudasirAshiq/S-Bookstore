import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col m-4"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white hover:text-primary-100 transition-colors z-20 bg-primary-700/50 p-2 rounded-full backdrop-blur-sm"
            >
              <X size={20} />
            </button>

            <div className="overflow-y-auto custom-scrollbar flex-grow">
              <div className="bg-primary-600 p-8 sm:p-10 text-white text-center">
                <div className="bg-white/20 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={28} className="sm:size-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black mb-2">Order This Book</h3>
                <p className="text-primary-100 text-sm sm:text-base px-4">Contact us to place your order or for any inquiries.</p>
              </div>

              <div className="p-6 sm:p-8 space-y-3 sm:space-y-4">
                <a href="mailto:info@sapienbooks.com" className="flex items-center gap-4 sm:gap-6 p-4 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors border border-transparent hover:border-primary-100 group">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <Mail size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</p>
                    <p className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors break-all">info@sapienbooks.com</p>
                  </div>
                </a>

                <a href="tel:+919810093952" className="flex items-center gap-4 sm:gap-6 p-4 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors border border-transparent hover:border-primary-100 group">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <Phone size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</p>
                    <p className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">+91-98100-93952</p>
                  </div>
                </a>

                <a href="tel:01123271100" className="flex items-center gap-4 sm:gap-6 p-4 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors border border-transparent hover:border-primary-100 group">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <Phone size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Landline</p>
                    <p className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">011-23271100</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 sm:gap-6 p-4 rounded-2xl bg-gray-50 transition-colors border border-transparent group">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-primary-600">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Store Address</p>
                    <p className="text-sm sm:text-base font-bold text-gray-900 leading-tight">166, Service Lane, Asif Ali Road, New Delhi - 110002</p>
                  </div>
                </div>

                <button 
                  onClick={onClose}
                  className="w-full btn-primary py-4 text-lg mt-4 shadow-xl shadow-primary-100"
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
