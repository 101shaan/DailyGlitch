import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeaturedMystery from '../components/FeaturedMystery';
import Newsletter from '../components/Newsletter';
import SearchModal from '../components/SearchModal';
import { getMysteryById } from '../data/mysteries';

const MysteryPage: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const mystery = id ? getMysteryById(id) : undefined;
  
  useEffect(() => {
    if (!mystery) {
      navigate('/not-found', { replace: true });
    }
    
    // Update document title
    if (mystery) {
      document.title = `${mystery.title} | Daily Glitch`;
    }
    
    return () => {
      // Reset title when unmounting
      const defaultTitle = document.querySelector('[data-default]');
      if (defaultTitle) {
        document.title = defaultTitle.getAttribute('title') || '';
      }
    };
  }, [mystery, navigate]);
  
  if (!mystery) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header onSearchOpen={() => setIsSearchOpen(true)} />
      <main className="flex-grow">
        <FeaturedMystery mystery={mystery} />
        <Newsletter />
      </main>
      <Footer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default MysteryPage;