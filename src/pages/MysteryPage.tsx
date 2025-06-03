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
  const [mystery, setMystery] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMystery = async () => {
      if (!id) {
        navigate('/not-found', { replace: true });
        return;
      }
      setLoading(true);
      const data = await getMysteryById(id);
      if (!data) {
        navigate('/not-found', { replace: true });
        return;
      }
      setMystery(data);
      setLoading(false);
      // Update document title
      document.title = `${data.title} | Daily Glitch`;
    };
    fetchMystery();
    // Cleanup: reset title on unmount
    return () => {
      document.title = 'Daily Glitch';
    };
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Header onSearchOpen={() => setIsSearchOpen(true)} />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center py-20">Loading mystery...</div>
        </main>
        <Footer />
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
    );
  }

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