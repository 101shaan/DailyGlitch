import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeaturedMystery from '../components/FeaturedMystery';
import Newsletter from '../components/Newsletter';
import SearchModal from '../components/SearchModal';
import { getLatestMystery } from '../data/mysteries';
import type { Mystery } from '../types';

const HomePage: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [latestMystery, setLatestMystery] = useState<Mystery | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMystery = async () => {
      try {
        const mystery = await getLatestMystery();
        setLatestMystery(mystery);
      } catch (error) {
        console.error("Error fetching latest mystery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMystery();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header onSearchOpen={() => setIsSearchOpen(true)} />
      <main className="flex-grow">
        {loading ? (
          <div className="text-center py-20">Loading today's mystery...</div>
        ) : (
          <FeaturedMystery mystery={latestMystery} />
        )}
        <Newsletter />
      </main>
      <Footer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default HomePage;