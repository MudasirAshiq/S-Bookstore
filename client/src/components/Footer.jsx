import React from 'react';
import { BookOpen, Send, Code2, Camera, User } from 'lucide-react';

const Footer = ({ onHomeClick, onCollectionClick }) => {
  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-primary-600 p-2 rounded-lg">
                <BookOpen className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">Sapien<span className="text-primary-600">Books</span></span>
            </div>
            <p className="text-gray-400 max-w-sm leading-relaxed mb-8">
              Helping readers everywhere find the best books. Join us and discover your next favorite story today.
            </p>
            <div className="flex gap-4">
              {/* Facebook */}
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-[#1877F2] transition-colors" title="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-[#E4405F] transition-colors" title="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              {/* X (Twitter) */}
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-black transition-colors" title="X">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z"/></svg>
              </a>
              {/* Telegram */}
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-[#26A5E4] transition-colors" title="Telegram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <button onClick={onHomeClick} className="hover:text-primary-400 transition-colors">Home</button>
              </li>
              <li>
                <button onClick={onCollectionClick} className="hover:text-primary-400 transition-colors">All Books</button>
              </li>
              <li>
                <button onClick={() => { onHomeClick(); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-primary-400 transition-colors">About Us</button>
              </li>
              <li>
                <button onClick={() => { onHomeClick(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-primary-400 transition-colors">Contact</button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-6 text-sm">Subscribe to get updates on new arrivals and special offers.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 border-none rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-primary-500 outline-none"
              />
              <button className="bg-primary-600 px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">Join</button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-12 flex flex-col items-center text-center gap-8">
          {/* Designed By Badge - Centered */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-white font-bold uppercase tracking-widest text-[10px]">Designed By</span>
              <a 
                href="https://codefons.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 bg-[#1c1c1c] border border-gray-800/50 rounded-full py-2 pl-2 pr-5 hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all duration-300"
              >
                <div className="bg-orange-500 rounded-lg p-2 shadow-lg shadow-orange-500/20 group-hover:rotate-12 transition-transform duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
                <span className="font-bold tracking-tight text-[15px]">
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-300">Code</span>
                  <span className="text-orange-500">FONS</span>
                </span>
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-gray-500">
            <p>© 2026 SapienBooks. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
