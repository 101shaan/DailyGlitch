import React, { useState, useEffect } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSearchOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
              <span className="text-white font-mono font-bold text-xs">DG</span>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 animate-pulse rounded-full"></div>
          </div>
          <div className="font-mono font-bold text-xl text-white tracking-tight">
            DAILY<span className="text-red-600">GLITCH</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-gray-300 hover:text-white font-mono text-sm tracking-wide transition-colors"
          >
            TODAY
          </Link>
          <Link 
            to="/archive" 
            className="text-gray-300 hover:text-white font-mono text-sm tracking-wide transition-colors"
          >
            ARCHIVE
          </Link>
          <Link 
            to="/about" 
            className="text-gray-300 hover:text-white font-mono text-sm tracking-wide transition-colors"
          >
            ABOUT
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-white font-mono text-lg tracking-wide transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              TODAY
            </Link>
            <Link 
              to="/archive" 
              className="text-gray-300 hover:text-white font-mono text-lg tracking-wide transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ARCHIVE
            </Link>
            <Link 
              to="/about" 
              className="text-gray-300 hover:text-white font-mono text-lg tracking-wide transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ABOUT
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;