import React, { useState, useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import { searchMysteries } from '../data/mysteries';
import { Mystery } from '../types';
import { Link } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Mystery[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      setSearchResults(searchMysteries(searchQuery));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-32 px-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl bg-gray-900 border border-gray-800 rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-gray-800 p-4">
          <Search size={20} className="text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search mysteries..."
            className="flex-grow bg-transparent text-white border-none focus:outline-none focus:ring-0 placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors ml-3"
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="p-4">
              {searchResults.map((mystery) => (
                <Link
                  key={mystery.id}
                  to={`/mystery/${mystery.id}`}
                  className="block border-b border-gray-800 last:border-0 py-4 hover:bg-gray-800/50 transition-colors"
                  onClick={onClose}
                >
                  <h3 className="font-mono text-lg font-bold text-white mb-1">
                    {mystery.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {mystery.content.slice(0, 150)}...
                  </p>
                  <div className="flex mt-2">
                    {mystery.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs font-mono bg-gray-800 text-gray-400 px-2 py-0.5 rounded mr-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          ) : searchQuery.trim().length > 2 ? (
            <div className="p-8 text-center text-gray-400">
              <p className="font-mono">No mysteries found.</p>
            </div>
          ) : searchQuery.trim().length > 0 ? (
            <div className="p-8 text-center text-gray-400">
              <p className="font-mono">Type at least 3 characters to search...</p>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400">
              <p className="font-mono">Start typing to search for mysteries...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;