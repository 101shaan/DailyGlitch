import React from 'react';
import { Link } from 'react-router-dom';
import { Mystery } from '../types';

interface MysteryCardProps {
  mystery: Mystery;
  index: number;
}

const MysteryCard: React.FC<MysteryCardProps> = ({ mystery, index }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Alternate layout styles for visual interest
  const isAlternate = index % 2 === 1;

  return (
    <Link 
      to={`/mystery/${mystery.id}`}
      className={`block group relative overflow-hidden rounded-lg border border-gray-800 transition-all duration-300 hover:border-gray-600 ${
        isAlternate ? 'bg-gradient-to-tr from-black to-gray-900' : 'bg-gradient-to-br from-black to-gray-900'
      }`}
    >
      {/* Overlay background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500"
        style={{ backgroundImage: `url(${mystery.imageUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      
      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="mb-4">
          <span className="font-mono text-xs text-red-500">
            {formatDate(mystery.date)}
          </span>
        </div>
        
        <h3 className="font-mono text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
          {mystery.title}
        </h3>
        
        <p className="text-gray-400 mb-4 line-clamp-2">
          {mystery.content.slice(0, 120)}...
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {mystery.tags.map((tag, idx) => (
            <span 
              key={idx}
              className="text-xs font-mono bg-gray-800/70 text-gray-400 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="font-mono text-xs text-red-500 group-hover:text-red-400 transition-colors flex items-center">
          <span>READ FULL MYSTERY</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default MysteryCard;