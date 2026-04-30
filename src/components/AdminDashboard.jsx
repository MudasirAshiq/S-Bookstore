import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit2, Trash2, LogOut, LayoutGrid, X, Loader2, 
  Image as ImageIcon, BookOpen, Key, Book as BookIcon, 
  Eye, EyeOff, Search, Settings, PieChart, Layers, ArrowUpRight, TrendingUp, DollarSign,
  ShieldCheck, Menu, Upload, Link as LinkIcon
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart as RePieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import toast from 'react-hot-toast';
import { fetchBooks, createBook, updateBook, deleteBook as deleteBookApi, fetchSettings, updateSettings } from '../lib/api';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [dashboardName, setDashboardName] = useState('Sapien Dashboard');
  const [imageSource, setImageSource] = useState('link'); // 'link' or 'upload'
  const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' });
  const [settingsData, setSettingsData] = useState({ newDashboardName: '' });
  const [showPasswords, setShowPasswords] = useState({ new: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '', author: '', price: '', discount_percent: '', image_url: '', description: '', category: 'General'
  });

  useEffect(() => { 
    loadBooks(); 
    loadSettings();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const result = await fetchBooks();
      setBooks(result.data || []);
    } catch (err) {
      toast.error('Failed to load books: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadSettings = async () => {
    try {
      const result = await fetchSettings();
      if (result.data && result.data.dashboard_name) {
        setDashboardName(result.data.dashboard_name);
        setSettingsData({ newDashboardName: result.data.dashboard_name });
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
  };

  const handleEdit = (book) => {
    setCurrentBook(book);
    setFormData({
      title: book.title, author: book.author, price: book.price,
      discount_percent: book.discount_percent || '', image_url: book.image_url,
      description: book.description || '', category: book.category || 'General'
    });
    setImageSource(book.image_url?.startsWith('data:') ? 'upload' : 'link');
    setIsFormOpen(true);
  };

  const handleDelete = async (book) => {
    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      try {
        await deleteBookApi(book.id);
        toast.success('Book deleted successfully');
        loadBooks();
      } catch (err) {
        toast.error('Failed to delete: ' + err.message);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) { // 2MB limit for Base64 storage
      toast.error('Image is too large. Please use a file smaller than 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image_url: reader.result });
      toast.success('Image prepared for upload');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        author: formData.author,
        price: parseFloat(formData.price),
        discount_percent: parseInt(formData.discount_percent) || 0,
        image_url: formData.image_url,
        description: formData.description,
        category: formData.category,
      };

      if (currentBook) {
        await updateBook(currentBook.id, payload);
        toast.success('Book updated successfully');
      } else {
        await createBook(payload);
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
    setImageSource('link');
  };

  const handleSettingsUpdate = async (e) => {
    e.preventDefault();
    try {
      if (passwordData.newPassword) {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
          toast.error("Passwords don't match"); return;
        }
      }

      const payload = {};
      if (settingsData.newDashboardName) payload.dashboard_name = settingsData.newDashboardName;
      if (passwordData.newPassword) payload.new_password = passwordData.newPassword;

      await updateSettings(payload);

      if (settingsData.newDashboardName) {
        setDashboardName(settingsData.newDashboardName);
      }
      if (passwordData.newPassword) {
        setPasswordData({ newPassword: '', confirmPassword: '' });
      }
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Update failed: ' + error.message);
    }
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="bg-primary-600 p-2.5 rounded-xl shadow-lg shadow-primary-900/20">
          <BookIcon size={24} />
        </div>
        <span className="text-xl font-black tracking-tight">{dashboardName.split(' ')[0]}<span className="text-primary-400">{dashboardName.split(' ')[1] || 'Dashboard'}</span></span>
      </div>

      <nav className="flex-grow space-y-2">
        {[
          { id: 'inventory', icon: <LayoutGrid size={20} />, label: 'All Books' },
          { id: 'analytics', icon: <PieChart size={20} />, label: 'Analytics' },
          { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => { setActiveTab(item.id); setIsMobileSidebarOpen(false); }}
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
    </>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <aside className="hidden lg:flex flex-col w-72 bg-slate-900 text-white p-6 sticky top-0 h-screen shadow-2xl">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileSidebarOpen(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden" />
            <motion.aside initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} className="fixed top-0 left-0 bottom-0 w-72 bg-slate-900 text-white p-6 z-[70] lg:hidden flex flex-col">
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="flex-grow flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-grow max-w-xl">
            <button onClick={() => setIsMobileSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-xl">
              <Menu size={24} />
            </button>
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input type="text" placeholder="Search..." className="w-full pl-12 pr-4 py-2.5 bg-slate-50 rounded-2xl border border-transparent focus:bg-white focus:border-primary-500 outline-none transition-all font-medium text-sm md:text-base" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-5 ml-4">
             <div className="text-right hidden sm:block">
               <p className="text-sm font-black text-slate-900 leading-none">Admin</p>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Online</p>
             </div>
             <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-black shadow-lg shadow-primary-200 text-xs md:text-sm">AD</div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          {activeTab === 'inventory' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{dashboardName}</h2>
                  <p className="text-slate-500 font-medium mt-1 text-sm md:text-base">Manage your book store collection</p>
                </div>
                <button onClick={() => { resetForm(); setIsFormOpen(true); }} className="btn-primary group shadow-xl shadow-primary-200 w-full md:w-auto">
                  <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                  Add New Book
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
                {[
                  { label: 'Total Books', value: books.length, icon: <BookIcon />, color: 'bg-indigo-50 text-indigo-600' },
                  { label: 'Total Value', value: `₹${books.reduce((acc, b) => acc + parseFloat(b.price), 0).toLocaleString()}`, icon: <DollarSign />, color: 'bg-emerald-50 text-emerald-600' },
                  { label: 'Discounted', value: books.filter(b => b.discount_percent > 0).length, icon: <TrendingUp />, color: 'bg-amber-50 text-amber-600' },
                  { label: 'Sale Mode', value: 'Active', icon: <ArrowUpRight />, color: 'bg-rose-50 text-rose-600' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4 md:gap-5">
                    <div className={`${stat.color} p-3 md:p-4 rounded-2xl`}>{stat.icon}</div>
                    <div>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-xl md:text-2xl font-black text-slate-900">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[2rem] border border-slate-100">
                  <div className="w-12 h-12 border-4 border-slate-100 border-t-primary-600 rounded-full animate-spin mb-6" />
                  <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Loading Repository...</p>
                </div>
              ) : (
                <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                          <th className="px-6 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Book Details</th>
                          <th className="px-6 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Category</th>
                          <th className="px-6 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pricing</th>
                          <th className="px-6 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {filteredBooks.map((book) => (
                          <tr key={book.id} className="hover:bg-slate-50/50 transition-all group">
                            <td className="px-6 md:px-8 py-6">
                              <div className="flex items-center gap-4 md:gap-5">
                                <div className="w-12 h-16 md:w-14 md:h-20 rounded-xl overflow-hidden shadow-md flex-shrink-0 border-2 border-white group-hover:scale-105 transition-transform duration-500">
                                  <img src={book.image_url} alt={book.title} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <p className="font-black text-slate-900 text-sm md:text-base group-hover:text-primary-600 transition-colors">{book.title}</p>
                                  <p className="text-[10px] md:text-xs text-slate-400 font-bold tracking-tight mt-1">by {book.author}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 md:px-8 py-6 text-center">
                              <span className="px-3 md:px-4 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest">{book.category || 'General'}</span>
                            </td>
                            <td className="px-6 md:px-8 py-6">
                              <div className="flex flex-col">
                                <span className="font-black text-slate-900 text-sm md:text-lg">₹{parseFloat(book.price).toLocaleString('en-IN')}</span>
                                {book.discount_percent > 0 && <span className="text-[10px] text-emerald-600 font-black uppercase">-{book.discount_percent}% Off</span>}
                              </div>
                            </td>
                            <td className="px-6 md:px-8 py-6 text-right">
                              <div className="flex justify-end gap-2 md:gap-3 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all lg:translate-x-4 group-hover:translate-x-0">
                                <button onClick={() => handleEdit(book)} className="p-2 md:p-3 text-primary-600 bg-primary-50 rounded-xl md:rounded-2xl hover:bg-primary-600 hover:text-white transition-all shadow-sm"><Edit2 size={16} /></button>
                                <button onClick={() => handleDelete(book)} className="p-2 md:p-3 text-rose-500 bg-rose-50 rounded-xl md:rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"><Trash2 size={16} /></button>
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
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 md:space-y-10">
              <div className="mb-6 md:mb-10">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Performance Analytics</h2>
                <p className="text-slate-500 font-medium mt-1 text-sm md:text-base">Visual data insights for your inventory</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
                <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-sm flex flex-col">
                  <h3 className="text-lg md:text-xl font-black text-slate-900 mb-8 flex items-center gap-3"><Layers className="text-primary-600" />Book Distribution</h3>
                  <div className="flex-grow w-full h-[250px] md:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie data={categoriesData} innerRadius={60} outerRadius={90} paddingAngle={8} dataKey="value">
                          {categoriesData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-6 justify-center">
                    {categoriesData.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-sm flex flex-col">
                  <h3 className="text-lg md:text-xl font-black text-slate-900 mb-8 flex items-center gap-3"><TrendingUp className="text-emerald-600" />Price Segments (₹)</h3>
                  <div className="flex-grow w-full h-[250px] md:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={priceDistribution}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 800, fill: '#94a3b8' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 800, fill: '#94a3b8' }} />
                        <Tooltip cursor={{ fill: '#f8fafc' }} />
                        <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 8, 8]} barSize={30} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto">
              <div className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] border border-slate-100 shadow-xl">
                <div className="text-center mb-10 md:mb-12">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-50 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-primary-600 shadow-inner"><ShieldCheck size={32} /></div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900">Dashboard Settings</h3>
                  <p className="text-slate-400 font-medium mt-2 text-sm md:text-base">Personalize your admin experience</p>
                </div>
                <form onSubmit={handleSettingsUpdate} className="space-y-6 md:space-y-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Dashboard Name</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-black text-slate-900" value={settingsData.newDashboardName} onChange={(e) => setSettingsData({...settingsData, newDashboardName: e.target.value})} />
                  </div>
                  <div className="pt-4 border-t border-slate-50">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Security Update</p>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">New Password</label>
                        <div className="relative">
                          <input type={showPasswords.new ? "text" : "password"} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-bold" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} placeholder="Leave blank to keep current" />
                          <button type="button" onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300">{showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Confirm Changes</label>
                        <input type="password" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-bold" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn-primary w-full py-5 rounded-[1.5rem] text-lg mt-4 shadow-xl shadow-primary-100">Save Dashboard Settings</button>
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
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} className="bg-white rounded-[2rem] md:rounded-[3rem] w-full max-w-4xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
              {/* Header */}
              <div className="px-6 md:px-12 py-6 md:py-8 border-b border-slate-50 flex justify-between items-center bg-white sticky top-0 z-10">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{currentBook ? 'Edit Book' : 'Add New Book'}</h3>
                  <p className="text-slate-400 font-medium text-xs md:text-sm mt-1">Fill in the details to update your collection</p>
                </div>
                <button onClick={() => setIsFormOpen(false)} className="bg-slate-50 p-3 md:p-4 rounded-2xl text-slate-400 hover:text-slate-900 transition-all border border-slate-100 shadow-sm"><X size={20} md:size={24} /></button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 md:p-12 overflow-y-auto custom-scrollbar flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {/* Title & Author */}
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Book Title</label>
                    <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-bold text-slate-900" placeholder="e.g. The Midnight Library" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Author</label>
                    <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-bold" placeholder="Author Name" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Category</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-bold appearance-none cursor-pointer" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                      {['General', 'Fiction', 'Non-Fiction', 'Science', 'History', 'Technology', 'Art'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>

                  {/* Pricing */}
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Price (₹)</label>
                    <input type="number" required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-bold" placeholder="0.00" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Discount (%)</label>
                    <input type="number" min="0" max="100" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-bold" placeholder="0" value={formData.discount_percent} onChange={(e) => setFormData({...formData, discount_percent: e.target.value})} />
                  </div>

                  {/* Image Upload Toggle */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Book Cover Image</label>
                      <div className="flex bg-slate-100 p-1 rounded-xl">
                        <button type="button" onClick={() => setImageSource('link')} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all flex items-center gap-2 ${imageSource === 'link' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-400'}`}>
                          <LinkIcon size={12} /> Link
                        </button>
                        <button type="button" onClick={() => setImageSource('upload')} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all flex items-center gap-2 ${imageSource === 'upload' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-400'}`}>
                          <Upload size={12} /> Upload
                        </button>
                      </div>
                    </div>

                    <div className="relative group">
                      {imageSource === 'link' ? (
                        <div className="relative">
                          <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                          <input type="url" required className="w-full pl-16 pr-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-bold text-sm" placeholder="Paste image URL here..." value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} />
                        </div>
                      ) : (
                        <div className="relative">
                          <input type="file" accept="image/*" className="hidden" id="file-upload" onChange={handleFileChange} />
                          <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 md:h-40 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer group">
                            {formData.image_url && formData.image_url.startsWith('data:') ? (
                              <div className="flex items-center gap-4">
                                <img src={formData.image_url} className="w-12 h-16 object-cover rounded-lg shadow-md" alt="Preview" />
                                <div className="text-left">
                                  <p className="text-sm font-black text-slate-900">Image Selected</p>
                                  <p className="text-xs text-primary-600 font-bold">Click to change</p>
                                </div>
                              </div>
                            ) : (
                              <>
                                <Upload className="text-slate-300 mb-2 group-hover:text-primary-500 transition-colors" size={32} />
                                <p className="text-sm font-black text-slate-900">Choose Image File</p>
                                <p className="text-xs text-slate-400 mt-1 font-medium">JPG, PNG up to 2MB</p>
                              </>
                            )}
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">About the Book</label>
                    <textarea rows="4" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-100 outline-none transition-all font-medium resize-none text-sm" placeholder="Provide a short summary of the book's contents..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-10 md:mt-12 sticky bottom-0 bg-white pt-4 pb-2">
                  <button type="button" onClick={() => setIsFormOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 font-black rounded-2xl hover:bg-slate-100 transition-all border border-slate-100">Cancel</button>
                  <button type="submit" disabled={submitting} className="flex-[2] btn-primary py-4 rounded-2xl text-lg shadow-2xl shadow-primary-200">
                    {submitting ? <Loader2 className="animate-spin" /> : currentBook ? 'Save Changes' : 'Add to Collection'}
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
