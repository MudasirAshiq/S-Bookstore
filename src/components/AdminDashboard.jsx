import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit2, Trash2, LogOut, LayoutGrid, X, Loader2, 
  Image as ImageIcon, BookOpen, Key, Book as BookIcon, 
  Eye, EyeOff, Search, Settings, PieChart, Layers, ArrowUpRight, TrendingUp, DollarSign
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart as RePieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import toast from 'react-hot-toast';
import { sql } from '../lib/db';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory', 'analytics', 'settings'
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' });
  const [showPasswords, setShowPasswords] = useState({ new: false, confirm: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '', author: '', price: '', discount_percent: '', image_url: '', description: '', category: 'General'
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
      description: book.description || '', category: book.category || 'General'
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
      const price = parseFloat(formData.price);
      const discount = parseInt(formData.discount_percent) || 0;

      if (currentBook) {
        await sql`
          UPDATE books SET title = ${formData.title}, author = ${formData.author}, 
          price = ${price}, discount_percent = ${discount}, image_url = ${formData.image_url}, 
          description = ${formData.description}, category = ${formData.category} WHERE id = ${currentBook.id}
        `;
        toast.success('Book updated successfully');
      } else {
        await sql`
          INSERT INTO books (title, author, price, discount_percent, image_url, description, category)
          VALUES (${formData.title}, ${formData.author}, ${price}, ${discount}, ${formData.image_url}, ${formData.description}, ${formData.category})
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
    setCurrentBook(null);
    setFormData({ title: '', author: '', price: '', discount_percent: '', image_url: '', description: '', category: 'General' });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords don't match"); return;
    }
    try {
      await sql`UPDATE users SET password = ${passwordData.newPassword} WHERE email = 'admin@sapien.com'`;
      toast.success('Password updated successfully');
      setPasswordData({ newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error('Failed to update password: ' + error.message);
    }
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Analytics Data
  const categoriesData = books.reduce((acc, book) => {
    const cat = book.category || 'General';
    const existing = acc.find(item => item.name === cat);
    if (existing) existing.value += 1;
    else acc.push({ name: cat, value: 1 });
    return acc;
  }, []);

  const priceDistribution = [
    { range: '0-500', count: books.filter(b => b.price < 500).length },
    { range: '500-1000', count: books.filter(b => b.price >= 500 && b.price < 1000).length },
    { range: '1000-2000', count: books.filter(b => b.price >= 1000 && b.price < 2000).length },
    { range: '2000+', count: books.filter(b => b.price >= 2000).length },
  ];

  const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-slate-900 text-white p-6 sticky top-0 h-screen shadow-2xl">
        <div className="flex items-center gap-3 mb-12 px-2 cursor-pointer" onClick={() => setActiveTab('inventory')}>
          <div className="bg-primary-600 p-2.5 rounded-xl shadow-lg shadow-primary-900/20">
            <BookIcon size={24} />
          </div>
          <span className="text-xl font-black tracking-tight">Sapien<span className="text-primary-400">Admin</span></span>
        </div>

        <nav className="flex-grow space-y-2">
          {[
            { id: 'inventory', icon: <LayoutGrid size={20} />, label: 'All Books' },
            { id: 'analytics', icon: <PieChart size={20} />, label: 'Analytics' },
            { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === item.id ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/40' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-4 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white font-bold text-sm transition-all shadow-sm"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-grow max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search database..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border border-transparent focus:bg-white focus:border-primary-500 outline-none transition-all font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-5">
             <div className="text-right hidden sm:block">
               <p className="text-sm font-black text-slate-900 leading-none">Admin Control</p>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Status: Online</p>
             </div>
             <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-black shadow-lg shadow-primary-200">
               AD
             </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          {activeTab === 'inventory' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Manage Books</h2>
                  <p className="text-slate-500 font-medium mt-1">Manage and monitor your book store collection</p>
                </div>
                <button 
                  onClick={() => { resetForm(); setIsFormOpen(true); }}
                  className="btn-primary group shadow-xl shadow-primary-200"
                >
                  <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                  Add New Book
                </button>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                  { label: 'Total Books', value: books.length, icon: <BookIcon />, color: 'bg-indigo-50 text-indigo-600' },
                  { label: 'Total Value', value: `₹${books.reduce((acc, b) => acc + parseFloat(b.price), 0).toLocaleString()}`, icon: <DollarSign />, color: 'bg-emerald-50 text-emerald-600' },
                  { label: 'Discounted', value: books.filter(b => b.discount_percent > 0).length, icon: <TrendingUp />, color: 'bg-amber-50 text-amber-600' },
                  { label: 'Active Sale', value: '4 Assets', icon: <ArrowUpRight />, color: 'bg-rose-50 text-rose-600' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
                    <div className={`${stat.color} p-4 rounded-2xl`}>{stat.icon}</div>
                    <div>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-slate-100">
                  <div className="w-16 h-16 border-4 border-slate-100 border-t-primary-600 rounded-full animate-spin mb-6" />
                  <p className="text-slate-400 font-black text-xs uppercase tracking-widest">Loading Repository...</p>
                </div>
              ) : (
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Book Details</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Category</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pricing</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {filteredBooks.map((book) => (
                          <tr key={book.id} className="hover:bg-slate-50/50 transition-all group">
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-5">
                                <div className="w-14 h-20 rounded-xl overflow-hidden shadow-md flex-shrink-0 border-2 border-white group-hover:scale-105 transition-transform duration-500">
                                  <img src={book.image_url} alt={book.title} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <p className="font-black text-slate-900 group-hover:text-primary-600 transition-colors">{book.title}</p>
                                  <p className="text-xs text-slate-400 font-bold tracking-tight mt-1">by {book.author}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                {book.category || 'General'}
                              </span>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex flex-col">
                                <span className="font-black text-slate-900 text-lg">₹{parseFloat(book.price).toLocaleString('en-IN')}</span>
                                {book.discount_percent > 0 && (
                                  <span className="text-[10px] text-emerald-600 font-black uppercase">-{book.discount_percent}% Off</span>
                                )}
                              </div>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                <button onClick={() => handleEdit(book)} className="p-3 text-primary-600 bg-primary-50 rounded-2xl hover:bg-primary-600 hover:text-white transition-all shadow-sm">
                                  <Edit2 size={18} />
                                </button>
                                <button onClick={() => handleDelete(book)} className="p-3 text-rose-500 bg-rose-50 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm">
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
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
              <div className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Performance Analytics</h2>
                <p className="text-slate-500 font-medium mt-1">Visual data insights for your bookstore inventory</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Category Distribution Chart */}
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm min-h-[400px] flex flex-col">
                  <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                    <Layers className="text-primary-600" />
                    Book Distribution
                  </h3>
                  <div className="flex-grow min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={categoriesData}
                          innerRadius={80}
                          outerRadius={120}
                          paddingAngle={8}
                          dataKey="value"
                        >
                          {categoriesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-6 justify-center">
                    {categoriesData.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                        <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Distribution Bar Chart */}
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm min-h-[400px] flex flex-col">
                  <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                    <TrendingUp className="text-emerald-600" />
                    Price Segments (₹)
                  </h3>
                  <div className="flex-grow min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={priceDistribution}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} />
                        <Tooltip cursor={{ fill: '#f8fafc' }} />
                        <Bar dataKey="count" fill="#6366f1" radius={[10, 10, 10, 10]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Simulated Revenue Area Chart */}
                <div className="lg:col-span-2 bg-slate-900 p-10 rounded-[3rem] shadow-2xl text-white">
                  <div className="flex justify-between items-center mb-10">
                    <div>
                      <h3 className="text-2xl font-black mb-1">Growth Index</h3>
                      <p className="text-slate-400 text-sm font-medium">Monthly engagement metrics (Simulated)</p>
                    </div>
                    <div className="bg-primary-600/20 text-primary-400 px-4 py-2 rounded-2xl border border-primary-500/20 text-xs font-black">
                      +12.4% THIS MONTH
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { m: 'Jan', v: 400 }, { m: 'Feb', v: 600 }, { m: 'Mar', v: 550 }, 
                        { m: 'Apr', v: 900 }, { m: 'May', v: 850 }, { m: 'Jun', v: 1200 }
                      ]}>
                        <defs>
                          <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Tooltip />
                        <Area type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorV)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto">
              <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-xl">
                <div className="text-center mb-12">
                  <div className="w-20 h-20 bg-primary-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-primary-600 shadow-inner">
                    <ShieldCheck size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900">Account Security</h3>
                  <p className="text-slate-400 font-medium mt-2">Update your administrative credentials</p>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Current Role</label>
                    <input type="text" disabled value="Master Administrator" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-slate-100 text-slate-400 font-bold" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">New Passkey</label>
                    <div className="relative">
                      <input 
                        type={showPasswords.new ? "text" : "password"} required
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-bold"
                        value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      />
                      <button type="button" onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300">
                        {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Confirm Changes</label>
                    <input 
                      type="password" required
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-bold"
                      value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full py-5 rounded-[1.5rem] text-lg mt-4 shadow-xl shadow-primary-100">
                    Execute Security Update
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Book Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} className="bg-white rounded-[3rem] w-full max-w-4xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              <div className="px-12 py-10 border-b border-slate-50 flex justify-between items-center">
                <div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">{currentBook ? 'Modify Entry' : 'New Book Entry'}</h3>
                  <p className="text-slate-400 font-medium text-sm mt-1">Populate the repository with required data</p>
                </div>
                <button onClick={() => setIsFormOpen(false)} className="bg-slate-50 p-4 rounded-2xl text-slate-400 hover:text-slate-900 transition-all border border-slate-100 shadow-sm">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-12 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Asset Title</label>
                    <input type="text" required className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-black text-slate-900" placeholder="Ex: The Great Gatsby" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Author Name</label>
                    <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-bold" placeholder="Author Name" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Classification</label>
                    <select 
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-bold appearance-none cursor-pointer"
                      value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      {['General', 'Fiction', 'Non-Fiction', 'Science', 'History', 'Technology', 'Art'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Standard Price (₹)</label>
                    <input type="number" required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-bold" placeholder="0.00" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Benefit (%)</label>
                    <input type="number" min="0" max="100" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-bold" placeholder="Discount %" value={formData.discount_percent} onChange={(e) => setFormData({...formData, discount_percent: e.target.value})} />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Asset Image URI</label>
                    <div className="relative">
                      <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                      <input type="url" required className="w-full pl-16 pr-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-bold" placeholder="https://image-source.com/..." value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Description Brief</label>
                    <textarea rows="4" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-medium resize-none" placeholder="Provide a short summary..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                  </div>
                </div>

                <div className="flex gap-6 mt-14">
                  <button type="button" onClick={() => setIsFormOpen(false)} className="flex-1 py-5 bg-slate-50 text-slate-400 font-black rounded-3xl hover:bg-slate-100 transition-all border border-slate-100">Abort Changes</button>
                  <button type="submit" disabled={submitting} className="flex-[2] btn-primary py-5 rounded-3xl text-xl shadow-2xl shadow-primary-200">
                    {submitting ? <Loader2 className="animate-spin" /> : currentBook ? 'Save Deployment' : 'Commit to Store'}
                  </button>
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
