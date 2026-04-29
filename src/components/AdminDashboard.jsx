import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, LogOut, LayoutGrid, X, Loader2, Image as ImageIcon, BookOpen, Key, Book as BookIcon, Eye, EyeOff, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { sql } from '../lib/db';

const AdminDashboard = ({ onLogout }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' });
  const [showPasswords, setShowPasswords] = useState({ new: false, confirm: false });
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    discount_percent: '',
    image_url: '',
    description: ''
  });

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await sql`
        SELECT * FROM books 
        ORDER BY created_at DESC
      `;
      setBooks(data || []);
    } catch (err) {
      toast.error('Failed to load books: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (book) => {
    setCurrentBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      price: book.price,
      discount_percent: book.discount_percent || '',
      image_url: book.image_url,
      description: book.description || ''
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (book) => {
    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      try {
        await sql`DELETE FROM books WHERE id = ${book.id}`;
        toast.success('Book deleted successfully');
        loadBooks();
      } catch (err) {
        toast.error('Failed to delete: ' + err.message);
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let finalImageUrl = formData.image_url;

      // Note: File upload is currently disabled as Neon doesn't have built-in storage.
      if (imageFile) {
        toast.error('Local file upload is currently disabled. Please use an image URL.');
        setSubmitting(false);
        return;
      }

      const price = parseFloat(formData.price);
      const discount = parseInt(formData.discount_percent) || 0;

      if (currentBook) {
        await sql`
          UPDATE books 
          SET title = ${formData.title}, 
              author = ${formData.author}, 
              price = ${price}, 
              discount_percent = ${discount}, 
              image_url = ${finalImageUrl}, 
              description = ${formData.description}
          WHERE id = ${currentBook.id}
        `;
        toast.success('Book updated successfully');
      } else {
        await sql`
          INSERT INTO books (title, author, price, discount_percent, image_url, description)
          VALUES (${formData.title}, ${formData.author}, ${price}, ${discount}, ${finalImageUrl}, ${formData.description})
        `;
        toast.success('Book added successfully');
      }
      setIsFormOpen(false);
      resetForm();
      loadBooks();
    } catch (err) {
      toast.error('Operation failed: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentBook(null);
    setImageFile(null);
    setFormData({
      title: '',
      author: '',
      price: '',
      discount_percent: '',
      image_url: '',
      description: ''
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    try {
      // In this simple setup, we're updating all users (which is just one admin)
      // or we could target by email if we had the current user's email.
      await sql`
        UPDATE users 
        SET password = ${passwordData.newPassword}
        WHERE email = 'admin@sapien.com'
      `;
      
      toast.success('Password updated successfully!');
      setIsPasswordModalOpen(false);
      setPasswordData({ newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error('Failed to update password: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary-500 rounded-lg blur-sm group-hover:blur-md transition-all opacity-50"></div>
              <div className="relative bg-gradient-to-br from-primary-600 to-primary-700 p-2.5 rounded-lg shadow-xl transform group-hover:rotate-6 transition-transform">
                <BookIcon className="text-white w-6 h-6" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900 tracking-tight leading-none">Sapien<span className="text-primary-600">Dashboard</span></h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Control Center</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-6">
            <button 
              onClick={() => setIsPasswordModalOpen(true)}
              className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all"
              title="Change Password"
            >
              <Key size={20} />
            </button>
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 bg-gray-50 text-gray-600 hover:text-red-600 hover:bg-red-50 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold text-sm transition-all border border-gray-100"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col sm:row sm:justify-between sm:items-center gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-black text-gray-900">Manage Collection</h2>
            <p className="text-gray-500 mt-1 font-medium">Total Books: <span className="text-primary-600 font-bold">{books.length}</span></p>
          </div>
          <button 
            onClick={() => { resetForm(); setIsFormOpen(true); }}
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 shadow-lg shadow-primary-200"
          >
            <Plus size={20} />
            Add New Book
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-sm font-bold text-gray-600">Book</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-600">Author</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-600">Price</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-600 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {books.map((book) => (
                    <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img 
                            src={book.image_url} 
                            alt={book.title} 
                            className="w-12 h-16 object-cover rounded shadow-sm"
                          />
                          <span className="font-bold text-gray-900">{book.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{book.author}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          {book.discount_percent > 0 ? (
                            <>
                              <span className="font-bold text-primary-600">
                                ₹{(book.price - (book.price * book.discount_percent / 100)).toLocaleString('en-IN')}
                              </span>
                              <span className="text-xs text-gray-400 line-through">
                                ₹{parseFloat(book.price).toLocaleString('en-IN')}
                              </span>
                              <span className="text-[10px] text-green-600 font-bold">({book.discount_percent}% OFF)</span>
                            </>
                          ) : (
                            <span className="font-bold text-gray-900">₹{parseFloat(book.price).toLocaleString('en-IN')}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(book)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(book)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden grid gap-4">
              {books.map((book) => (
                <div key={book.id} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex gap-4">
                  <img 
                    src={book.image_url} 
                    alt={book.title} 
                    className="w-20 h-28 object-cover rounded-xl shadow-sm"
                  />
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-black text-gray-900 line-clamp-1">{book.title}</h4>
                      <p className="text-xs text-gray-500 font-medium">{book.author}</p>
                      <div className="mt-2">
                        {book.discount_percent > 0 ? (
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-primary-600">
                              ₹{(book.price - (book.price * book.discount_percent / 100)).toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-gray-400 line-through">
                              ₹{parseFloat(book.price).toLocaleString('en-IN')}
                            </span>
                          </div>
                        ) : (
                          <span className="font-bold text-gray-900">₹{parseFloat(book.price).toLocaleString('en-IN')}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button 
                        onClick={() => handleEdit(book)}
                        className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold transition-all active:scale-95"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(book)}
                        className="flex-1 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold transition-all active:scale-95"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden"
          >
            <div className="px-10 py-8 text-center border-b border-gray-100">
              <div className="bg-primary-50 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 text-primary-600">
                <Key size={32} />
              </div>
              <h3 className="text-2xl font-black text-gray-900">Change Password</h3>
              <p className="text-gray-500 text-sm mt-1">Update your Supabase account security</p>
            </div>

            <form onSubmit={handlePasswordChange} className="p-10 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <input 
                    type={showPasswords.new ? "text" : "password"} 
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all pr-14"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors p-1"
                  >
                    {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
                <div className="relative">
                  <input 
                    type={showPasswords.confirm ? "text" : "password"} 
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all pr-14"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors p-1"
                  >
                    {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <button type="submit" className="btn-primary py-4 rounded-2xl text-lg shadow-xl shadow-primary-200">
                  Update Password
                </button>
                <button 
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="py-3 text-gray-400 font-bold hover:text-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-2xl font-black text-gray-900">{currentBook ? 'Edit Book' : 'Add New Book'}</h3>
              <button onClick={() => setIsFormOpen(false)} className="bg-white p-2 rounded-full text-gray-400 hover:text-gray-600 shadow-sm transition-all border border-gray-100">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Book Title</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Author</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Discount (%)</label>
                  <input 
                    type="number" 
                    min="0"
                    max="100"
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                    value={formData.discount_percent}
                    onChange={(e) => setFormData({...formData, discount_percent: e.target.value})}
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Book Image</label>
                  <div className="flex flex-col gap-3">
                    <div className="relative">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type="url" 
                        placeholder="Image URL"
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                        value={formData.image_url}
                        onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                      />
                    </div>
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden"
                        id="local-upload"
                        onChange={(e) => setImageFile(e.target.files[0])}
                      />
                      <label 
                        htmlFor="local-upload"
                        className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed font-bold cursor-pointer transition-all ${imageFile ? 'border-primary-500 bg-primary-50 text-primary-600' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                      >
                        <Plus size={18} />
                        {imageFile ? imageFile.name : 'Choose File to Upload'}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea 
                    rows="3"
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Short summary of the book..."
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                <button 
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 py-4 bg-gray-50 text-gray-400 font-bold rounded-2xl hover:bg-gray-100 hover:text-gray-600 transition-all"
                >
                  Discard
                </button>
                <button type="submit" className="flex-[2] btn-primary py-4 rounded-2xl text-lg shadow-xl shadow-primary-200">
                  {currentBook ? 'Apply Changes' : 'Publish Book'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
