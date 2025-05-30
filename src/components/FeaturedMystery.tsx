import React, { useState, useEffect } from 'react';
import { Share2, Calendar, Tag } from 'lucide-react';
import { Mystery } from '../types';

interface FeaturedMysteryProps {
  mystery: Mystery | null;
}

const FeaturedMystery: React.FC<FeaturedMysteryProps> = ({ mystery }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mystery?.title || 'Daily Glitch Mystery',
        text: `Check out this mystery: ${mystery?.title || 'Daily Glitch'}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch((error) => console.log('Error copying link', error));
    }
  };

  if (!mystery) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="border-2 border-yellow-600 bg-yellow-600/10 text-yellow-600 font-mono font-bold text-sm py-3 px-4 mb-8">
            NO MYSTERY AVAILABLE TODAY
          </div>
          <p className="text-gray-400">Check back tomorrow for a new mystery!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${isImageLoaded ? 'opacity-30' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${mystery.imageUrl})` }}
        >
          <img 
            src={mystery.imageUrl} 
            alt="" 
            className="hidden" 
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-40 pb-20 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Classified Banner */}
          <div className="border-2 border-red-600 bg-red-600/10 text-red-600 font-mono font-bold text-sm text-center py-1 px-4 mb-8 rotate-[-1deg]">
            DECLASSIFIED
          </div>
          
          {/* Title with animation */}
          <h1 
            className={`font-mono text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-opacity duration-700 ${isContentVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            {mystery.title}
          </h1>
          
          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-4 mb-8 text-gray-400">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span className="font-mono text-sm">{formatDate(mystery.date)}</span>
            </div>
            
            <div className="flex items-center">
              <Tag size={16} className="mr-2" />
              <div className="flex flex-wrap gap-2">
                {mystery.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="font-mono text-xs bg-gray-800 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <button 
              onClick={handleShare}
              className="ml-auto flex items-center text-gray-400 hover:text-white transition-colors"
              aria-label="Share"
            >
              <Share2 size={16} className="mr-2" />
              <span className="font-mono text-sm">SHARE</span>
            </button>
          </div>
          
          {/* Content with animation */}
          <div 
            className={`bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 mb-8 transition-all duration-1000 delay-300 ${
              isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {mystery.content.split('\n\n').map((paragraph, index) => (
              <p 
                key={index} 
                className="text-gray-300 mb-4 leading-relaxed last:mb-0 font-[system-ui]"
              >
                {paragraph}
              </p>
            ))}
            
            {mystery.source && (
              <div className="mt-6 text-right">
                <span className="text-gray-500 text-sm italic">
                  Source: {mystery.source}
                </span>
              </div>
            )}
          </div>
          
          {/* Final thought */}
          <div 
            className={`font-mono text-xl text-red-500 italic text-center my-12 max-w-2xl mx-auto transition-all duration-1000 delay-700 ${
              isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {mystery.finalThought}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMystery;