import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Loader2, X as ClearIcon, Sparkles } from 'lucide-react';
import { sql } from '../lib/db';
import BookCard from './BookCard';

const BooksSection = ({ onContactClick, featured = false, onViewAll }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await sql`
          SELECT * FROM books 
          ORDER BY created_at DESC
        `;
        setBooks(data || []);
      } catch (err) {
        setError('Failed to load books. Please try again later.');
        console.error('Neon Error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  const filteredBooks = books.filter(book => {
    const search = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(search) || 
      book.author.toLowerCase().includes(search) ||
      (book.description && book.description.toLowerCase().includes(search))
    );
  });

  const displayBooks = featured ? filteredBooks.slice(0, 4) : filteredBooks;

  return (
    <section id="books" className={`section-padding ${featured ? 'bg-white' : 'bg-slate-50/50'}`}>
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="h-px w-8 bg-primary-600" />
              <span className="text-primary-600 font-black text-xs uppercase tracking-[0.2em]">{featured ? 'New Books' : 'Our Collection'}</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight"
            >
              {featured ? <>Our Top <span className="text-gradient">Picks.</span></> : 'Browse All Books'}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-500 font-medium leading-relaxed"
            >
              {featured 
                ? 'Check out some of our newest and most popular books.' 
                : 'From fun stories to interesting facts, find the perfect book to read next.'}
            </motion.p>
          </div>

          {!featured && (
            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-0 bg-primary-400/10 rounded-2xl blur-xl group-focus-within:bg-primary-400/20 transition-all opacity-0 group-focus-within:opacity-100" />
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-primary-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search by title, author..."
                  className="w-full pl-14 pr-12 py-4 bg-white rounded-2xl border border-slate-100 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all shadow-sm font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <AnimatePresence>
                  {searchTerm && (
                    <motion.button 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 bg-slate-50 rounded-lg"
                    >
                      <ClearIcon size={16} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin" />
              <Sparkles className="absolute inset-0 m-auto text-primary-600 w-6 h-6 animate-pulse" />
            </div>
            <p className="text-slate-400 font-black text-xs uppercase tracking-widest mt-8">Loading Books...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-8 rounded-[2rem] text-center border border-red-100 max-w-md mx-auto shadow-xl shadow-red-100/50">
            <p className="font-black mb-2">Connection Error</p>
            <p className="text-sm opacity-80">{error}</p>
          </div>
        ) : displayBooks.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200"
          >
            <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">No matches found</h3>
            <p className="text-slate-400 font-medium">Try adjusting your search terms for "{searchTerm}"</p>
            <button 
              onClick={() => { setSearchTerm(''); }}
              className="mt-8 text-primary-600 font-black hover:text-primary-700 underline underline-offset-8 decoration-2"
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {displayBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <BookCard book={book} onContactClick={onContactClick} />
                </motion.div>
              ))}
            </div>
            
            {featured && (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mt-20 text-center"
              >
                <button 
                  onClick={onViewAll}
                  className="btn-secondary group"
                >
                  <span>See Full Collection</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BooksSection;
