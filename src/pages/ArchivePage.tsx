import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MysteryCard from '../components/MysteryCard';
import SearchModal from '../components/SearchModal';
import { getArchiveMysteries } from '../data/mysteries';
import type { Mystery } from '../types';
import { ArrowDownUp, Calendar, Tag } from 'lucide-react';

const ArchivePage: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [mysteries, setMysteries] = useState<Mystery[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMysteries = async () => {
      try {
        const data = await getArchiveMysteries();
        setMysteries(data);
      } catch (error) {
        console.error('Error fetching archive mysteries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMysteries();
  }, []);

  // Get all unique tags
  const allTags = [...new Set(mysteries.flatMap(mystery => mystery.tags))];

  // Filter mysteries by selected tag and search query
  const filteredMysteries = mysteries.filter(mystery => {
    const matchesSearch = 
      mystery.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mystery.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mystery.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = selectedTag ? mystery.tags.includes(selectedTag) : true;
    
    return matchesSearch && matchesTag;
  });

  // Sort mysteries by date
  const sortedMysteries = [...filteredMysteries].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header onSearchOpen={() => setIsSearchOpen(true)} />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-mono text-4xl font-bold text-white mb-2">Mystery Archive</h1>
            <p className="text-gray-400 mb-8">Browse all documented mysteries and unexplained phenomena.</p>
            
            {/* Search and filters */}
            <div className="mb-8 space-y-4">
              {/* Search input */}
              <div>
                <input
                  type="text"
                  placeholder="Search mysteries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-96 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center">
                {/* Sort order */}
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <ArrowDownUp size={16} />
                  <span>Sort {sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}</span>
                </button>

                {/* Tag filter */}
                <div className="flex items-center gap-2">
                  <Tag size={16} />
                  <select
                    value={selectedTag || ''}
                    onChange={(e) => setSelectedTag(e.target.value || null)}
                    className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
                  >
                    <option value="">All Tags</option>
                    {allTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Results count */}
            <div className="mb-6 text-gray-400 text-sm">
              Showing {sortedMysteries.length} {sortedMysteries.length === 1 ? 'mystery' : 'mysteries'}
              {selectedTag && <span> tagged with <span className="text-red-500">"{selectedTag}"</span></span>}
            </div>
            
            {loading ? (
              <div className="text-center py-20">Loading archive...</div>
            ) : sortedMysteries.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                {searchQuery || selectedTag ? 'No mysteries found matching your criteria.' : 'No mysteries in the archive yet.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedMysteries.map((mystery, index) => (
                  <MysteryCard key={mystery.id} mystery={mystery} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default ArchivePage;