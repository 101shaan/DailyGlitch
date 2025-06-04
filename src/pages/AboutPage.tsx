import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchModal from '../components/SearchModal';
import { FileText, Mail, AlertTriangle } from 'lucide-react';

const AboutPage: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header onSearchOpen={() => setIsSearchOpen(true)} />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-mono text-4xl font-bold text-white mb-6">About Daily Glitch</h1>
            
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-10">
              <p className="text-gray-300 mb-4">
                Daily Glitch documents the unexplained phenomena, strange occurrences, and apparent "glitches in the matrix" 
                that challenge our understanding of reality. Each day, we feature a single verified incident that defies 
                conventional explanation.
              </p>
              
              <p className="text-gray-300 mb-4">
                Our approach is methodical and evidence-based. We present facts without embellishment, sensationalism, 
                or speculation. The mysteries we feature are researched extensively, with sources cited wherever possible. 
                We believe that the truth is compelling enough without exaggeration.
              </p>
              
              <p className="text-gray-300">
                We invite readers to draw their own conclusions. Our purpose is not to convince, but to document and 
                preserve accounts of phenomena that expand the boundaries of what we consider possible.
              </p>
            </div>
            
            <h2 className="font-mono text-2xl font-bold text-white mb-4">Our Editorial Standards</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <FileText size={20} className="text-red-500 mr-2" />
                  <h3 className="font-mono text-lg font-bold text-white">Verification</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  All cases must have documented evidence and multiple sources where possible. 
                  We clearly indicate when information is unconfirmed or disputed.
                </p>
              </div>
              
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <AlertTriangle size={20} className="text-red-500 mr-2" />
                  <h3 className="font-mono text-lg font-bold text-white">Objectivity</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  We present facts without imposing interpretations. When multiple explanations 
                  exist, we acknowledge all credible possibilities.
                </p>
              </div>
              
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <Mail size={20} className="text-red-500 mr-2" />
                  <h3 className="font-mono text-lg font-bold text-white">Submissions</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  We welcome reader submissions of unexplained phenomena, provided they include 
                  verifiable details and supporting evidence.
                </p>
              </div>
              
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <FileText size={20} className="text-red-500 mr-2" />
                  <h3 className="font-mono text-lg font-bold text-white">Corrections</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  We promptly correct factual errors and update cases when new information emerges. 
                  Transparency is essential to our mission.
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-10 mb-10">
              <h2 className="font-mono text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-mono text-lg font-bold text-white mb-2">Are these stories real?</h3>
                  <p className="text-gray-400">
                    Yes. We only feature documented incidents with verifiable sources. While the explanation 
                    for these events may be debated, the events themselves are authentic.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-mono text-lg font-bold text-white mb-2">How do you select which mysteries to feature?</h3>
                  <p className="text-gray-400">
                    We prioritize cases with multiple reliable sources, official documentation, and physical evidence. 
                    We look for incidents that challenge conventional understanding while maintaining credibility.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-mono text-lg font-bold text-white mb-2">Can I submit a mystery?</h3>
                  <p className="text-gray-400">
                    Absolutely. Use our submission form on the Contact page. Please include as much documentation 
                    as possible, including dates, locations, witnesses, and any available evidence. We will review and respond to as many submissions as we can.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-mono text-lg font-bold text-white mb-2">Do you have a team of investigators?</h3>
                  <p className="text-gray-400">
                    We are primarily documentarians rather than investigators. However, we do consult with subject 
                    matter experts to verify details and assess the credibility of sources.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center">
              <h2 className="font-mono text-xl font-bold text-white mb-4">Contact the Daily Glitch Team</h2>
              <p className="text-gray-400 mb-6">
                Have questions, corrections, or want to submit a mystery? We'd like to hear from you.
              </p>
              <a 
                href="mailto:contact@dailyglitch.com" 
                className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors font-mono font-semibold"
              >
                <Mail size={18} className="mr-2" />
                CONTACT US
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default AboutPage;