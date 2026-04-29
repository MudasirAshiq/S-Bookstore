import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Loader2, X as ClearIcon } from 'lucide-react';
import { fetchBooks } from '../api';
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
        const data = await fetchBooks();
        setBooks(data);
      } catch (err) {
        setError('Failed to load books. Please try again later.');
        console.error(err);
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
    <section id="books" className={`py-24 ${featured ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            {featured ? 'Latest Additions' : 'Browse Our Books'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600"
          >
            {featured ? 'Check out some of our newest and most popular books.' : 'From fun stories to interesting facts, find the perfect book to read next.'}
          </motion.p>
        </div>

        {!featured && (
          /* Filters */
          <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search title, author or keywords..."
                className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  <ClearIcon size={18} />
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <p className="text-sm text-gray-500 font-medium">
                Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
              </p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Curating your collection...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center border border-red-100 max-w-md mx-auto">
            {error}
          </div>
        ) : displayBooks.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200"
          >
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
              <Search size={32} />
            </div>
            <p className="text-gray-500 text-lg font-bold mb-2">No results found for "{searchTerm}"</p>
            <p className="text-gray-400">Try checking your spelling or use different keywords.</p>
            <button 
              onClick={() => { setSearchTerm(''); }}
              className="mt-6 text-primary-600 font-bold hover:underline"
            >
              Clear search
            </button>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {displayBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BookCard book={book} onContactClick={onContactClick} />
                </motion.div>
              ))}
            </div>
            
            {featured && (
              <div className="mt-16 text-center">
                <button 
                  onClick={onViewAll}
                  className="btn-secondary px-10 py-4 text-lg font-bold"
                >
                  See Full Collection
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BooksSection;
