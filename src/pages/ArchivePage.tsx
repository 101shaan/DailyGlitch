import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MysteryCard from '../components/MysteryCard';
import SearchModal from '../components/SearchModal';
import { mysteries } from '../data/mysteries';
import { ArrowDownUp, Calendar, Tag } from 'lucide-react';

const ArchivePage: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = [...new Set(mysteries.flatMap(mystery => mystery.tags))];

  // Filter mysteries by selected tag
  const filteredMysteries = selectedTag 
    ? mysteries.filter(mystery => mystery.tags.includes(selectedTag))
    : mysteries;

  // Sort mysteries
  const sortedMysteries = [...filteredMysteries].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'desc' 
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      return sortOrder === 'desc'
        ? b.title.localeCompare(a.title)
        : a.title.localeCompare(b.title);
    }
  });

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header onSearchOpen={() => setIsSearchOpen(true)} />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-mono text-4xl font-bold text-white mb-2">Mystery Archive</h1>
            <p className="text-gray-400 mb-8">Browse all documented mysteries and unexplained phenomena.</p>
            
            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-400 text-sm font-mono">FILTER BY:</span>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setSelectedTag(null)}
                    className={`text-xs font-mono px-3 py-1.5 rounded-full transition-colors ${
                      selectedTag === null 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    All
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`text-xs font-mono px-3 py-1.5 rounded-full transition-colors ${
                        selectedTag === tag 
                          ? 'bg-red-600 text-white' 
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm font-mono">SORT BY:</span>
                <button
                  onClick={() => setSortBy('date')}
                  className={`flex items-center text-xs font-mono px-3 py-1.5 rounded-full transition-colors ${
                    sortBy === 'date' 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <Calendar size={14} className="mr-1" />
                  DATE
                </button>
                <button
                  onClick={() => setSortBy('title')}
                  className={`flex items-center text-xs font-mono px-3 py-1.5 rounded-full transition-colors ${
                    sortBy === 'title' 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <Tag size={14} className="mr-1" />
                  TITLE
                </button>
                <button
                  onClick={toggleSortOrder}
                  className="flex items-center text-xs font-mono px-3 py-1.5 rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors"
                  aria-label={sortOrder === 'desc' ? 'Sort ascending' : 'Sort descending'}
                >
                  <ArrowDownUp size={14} className={`transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
            
            {/* Results count */}
            <div className="mb-6 text-gray-400 text-sm">
              Showing {sortedMysteries.length} {sortedMysteries.length === 1 ? 'mystery' : 'mysteries'}
              {selectedTag && <span> tagged with <span className="text-red-500">"{selectedTag}"</span></span>}
            </div>
            
            {/* Mystery grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedMysteries.map((mystery, index) => (
                <MysteryCard key={mystery.id} mystery={mystery} index={index} />
              ))}
            </div>
            
            {/* Empty state */}
            {sortedMysteries.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 font-mono">No mysteries found matching your criteria.</p>
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