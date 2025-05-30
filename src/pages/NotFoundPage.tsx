import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchModal from '../components/SearchModal';
import { FileQuestion } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header onSearchOpen={() => setIsSearchOpen(true)} />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-red-600/20 flex items-center justify-center">
                <FileQuestion size={48} className="text-red-600" />
              </div>
            </div>
            
            <h1 className="font-mono text-4xl md:text-5xl font-bold text-white mb-4">
              CASE FILE NOT FOUND
            </h1>
            
            <p className="text-gray-400 mb-8 text-lg">
              The mystery you're looking for has vanished without a trace.
            </p>
            
            <div className="mb-12 py-4 border-y border-gray-800">
              <p className="font-mono text-red-500 italic">
                Perhaps this is a glitch in the matrix itself?
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/" 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md transition-colors font-mono font-semibold"
              >
                RETURN HOME
              </Link>
              <Link 
                to="/archive" 
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-md transition-colors font-mono font-semibold"
              >
                BROWSE ARCHIVE
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default NotFoundPage;