import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BooksSection from './components/BooksSection';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ContactModal from './components/ContactModal';

function App() {
  const [view, setView] = useState('home'); // 'home', 'collection', 'login', 'admin'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const navigateTo = (newView) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminClick = () => {
    if (isAuthenticated) {
      navigateTo('admin');
    } else {
      navigateTo('login');
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigateTo('admin');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigateTo('home');
  };

  if (view === 'login') {
    return (
      <>
        <Toaster position="top-right" />
        <AdminLogin onLogin={handleLogin} onBack={() => navigateTo('home')} />
      </>
    );
  }

  if (view === 'admin' && isAuthenticated) {
    return (
      <>
        <Toaster position="top-right" />
        <AdminDashboard onLogout={handleLogout} />
      </>
    );
  }

  return (
    <div className="scroll-smooth">
      <Toaster position="top-right" />
      <Navbar 
        onAdminClick={handleAdminClick} 
        onHomeClick={() => navigateTo('home')}
        onCollectionClick={() => navigateTo('collection')}
      />
      
      {view === 'home' ? (
        <>
          <Hero onBrowseClick={() => navigateTo('collection')} />
          <BooksSection 
            featured={true} 
            onContactClick={() => setIsContactModalOpen(true)} 
            onViewAll={() => navigateTo('collection')}
          />
          <About />
          <Contact />
        </>
      ) : (
        <div className="pt-20">
          <BooksSection onContactClick={() => setIsContactModalOpen(true)} />
        </div>
      )}
      
      <Footer onHomeClick={() => navigateTo('home')} onCollectionClick={() => navigateTo('collection')} />
      
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
}

export default App;
