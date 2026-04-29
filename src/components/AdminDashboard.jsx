import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit2, Trash2, LogOut, LayoutGrid, X, Loader2, 
  Image as ImageIcon, BookOpen, Key, Book as BookIcon, 
  Eye, EyeOff, Search, Settings, PieChart, Layers
} from 'lucide-react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '', author: '', price: '', discount_percent: '', image_url: '', description: ''
  });

  useEffect(() => { loadBooks(); }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await sql`SELECT * FROM books ORDER BY created_at DESC`;
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
      title: book.title, author: book.author, price: book.price,
      discount_percent: book.discount_percent || '', image_url: book.image_url,
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
      if (imageFile) {
        toast.error('Please use an image URL. Local upload is currently disabled.');
        setSubmitting(false); return;
      }
      const price = parseFloat(formData.price);
      const discount = parseInt(formData.discount_percent) || 0;

      if (currentBook) {
        await sql`
          UPDATE books SET title = ${formData.title}, author = ${formData.author}, 
          price = ${price}, discount_percent = ${discount}, image_url = ${formData.image_url}, 
          description = ${formData.description} WHERE id = ${currentBook.id}
        `;
        toast.success('Book updated successfully');
      } else {
        await sql`
          INSERT INTO books (title, author, price, discount_percent, image_url, description)
          VALUES (${formData.title}, ${formData.author}, ${price}, ${discount}, ${formData.image_url}, ${formData.description})
        `;
        toast.success('Book added successfully');
      }
      setIsFormOpen(false); resetForm(); loadBooks();
    } catch (err) {
      toast.error('Operation failed: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentBook(null); setImageFile(null);
    setFormData({ title: '', author: '', price: '', discount_percent: '', image_url: '', description: '' });
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-slate-900 text-white p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="bg-primary-600 p-2 rounded-xl">
            <BookIcon size={24} />
          </div>
          <span className="text-xl font-black tracking-tight">Sapien<span className="text-primary-400">Admin</span></span>
        </div>

        <nav className="flex-grow space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-600 font-bold text-sm">
            <LayoutGrid size={20} />
            All Books
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white font-bold text-sm transition-all">
            <PieChart size={20} />
            Analytics
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white font-bold text-sm transition-all">
            <Layers size={20} />
            Categories
          </button>
          <button 
            onClick={() => setIsPasswordModalOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white font-bold text-sm transition-all"
          >
            <Settings size={20} />
            Settings
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-4 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white font-bold text-sm transition-all"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-grow max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search inventory..."
                className="w-full pl-12 pr-4 py-2.5 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-primary-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
               <p className="text-sm font-black text-slate-900">Administrator</p>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Master Control</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-black">
               AD
             </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Manage Books</h2>
              <p className="text-slate-500 font-medium mt-1">Add, edit, or remove books from your store</p>
            </div>
            <button 
              onClick={() => { resetForm(); setIsFormOpen(true); }}
              className="btn-primary"
            >
              <Plus size={20} />
              Add New Book
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Books</p>
              <p className="text-3xl font-black text-slate-900">{books.length}</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Discounted</p>
              <p className="text-3xl font-black text-slate-900">{books.filter(b => b.discount_percent > 0).length}</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Avg. Price</p>
              <p className="text-3xl font-black text-slate-900">
                ₹{books.length ? Math.round(books.reduce((acc, b) => acc + parseFloat(b.price), 0) / books.length) : 0}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
              <p className="text-slate-400 font-bold mt-4">Updating List...</p>
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Book Details</th>
                      <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Category</th>
                      <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Pricing</th>
                      <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredBooks.map((book) => (
                      <tr key={book.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                              <img src={book.image_url} alt={book.title} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-black text-slate-900">{book.title}</p>
                              <p className="text-xs text-slate-400 font-bold tracking-tight">{book.author}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                            Book
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="font-black text-slate-900">₹{parseFloat(book.price).toLocaleString('en-IN')}</span>
                            {book.discount_percent > 0 && (
                              <span className="text-[10px] text-green-600 font-bold">-{book.discount_percent}% Applied</span>
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleEdit(book)}
                              className="p-2 text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button 
                              onClick={() => handleDelete(book)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
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
            </div>
          )}
        </div>
      </main>

      {/* Modals & Overlays (Password & Form) */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden p-10">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary-600"><Key size={32} /></div>
                  <h3 className="text-2xl font-black text-slate-900">Security Settings</h3>
                  <p className="text-slate-400 font-medium">Change your admin password</p>
                </div>
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  {['newPassword', 'confirmPassword'].map((field) => (
                    <div key={field}>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{field.replace('P', ' P')}</label>
                      <input 
                        type="password" required className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                        value={passwordData[field]} onChange={(e) => setPasswordData({...passwordData, [field]: e.target.value})}
                      />
                    </div>
                  ))}
                  <div className="flex flex-col gap-3 pt-4">
                    <button type="submit" className="btn-primary w-full py-4 rounded-2xl">Update Password</button>
                    <button type="button" onClick={() => setIsPasswordModalOpen(false)} className="py-3 text-slate-400 font-bold text-sm">Discard</button>
                  </div>
                </form>
            </motion.div>
          </div>
        )}

        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} className="bg-white rounded-[3rem] w-full max-w-4xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">{currentBook ? 'Edit Book' : 'Add New Book'}</h3>
                  <p className="text-slate-400 font-medium text-sm mt-1">Enter the book details below</p>
                </div>
                <button onClick={() => setIsFormOpen(false)} className="bg-slate-50 p-3 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-10 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Title</label>
                    <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-bold" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                  </div>
                  {['author', 'price', 'discount_percent', 'image_url'].map((field) => (
                    <div key={field}>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{field.replace('_', ' ')}</label>
                      <input type={field.includes('price') || field.includes('percent') ? 'number' : 'text'} required={field !== 'discount_percent'} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-bold" value={formData[field]} onChange={(e) => setFormData({...formData, [field]: e.target.value})} />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Description</label>
                    <textarea rows="3" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-medium resize-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                  </div>
                </div>
                <div className="flex gap-4 mt-10">
                  <button type="button" onClick={() => setIsFormOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 font-black rounded-2xl hover:bg-slate-100 transition-all">Cancel</button>
                  <button type="submit" disabled={submitting} className="flex-[2] btn-primary py-4 rounded-2xl text-lg">{submitting ? <Loader2 className="animate-spin" /> : currentBook ? 'Save Changes' : 'Add Book'}</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
