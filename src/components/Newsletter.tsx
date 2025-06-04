import React, { useState } from 'react';
import { Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }
    // Insert into Supabase
    const { error } = await supabase.from('subscribers').insert([{ email }]);
    if (error) {
      setStatus('error');
      setMessage('There was an error subscribing. Please try again.');
      return;
    }
    setStatus('success');
    setMessage('Thank you for subscribing to Daily Glitch!');
    setEmail('');
    // Reset after 5 seconds
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <section className="bg-gradient-to-b from-gray-900 to-black py-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-white mb-4">
            SUBSCRIBE TO DAILY<span className="text-red-600">GLITCH</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Receive unexplained mysteries directly to your inbox. One mind-bending 
            case file per day, no spam, unsubscribe anytime.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row mx-auto max-w-md gap-3">
            <div className="flex-grow relative">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-gray-800 text-white px-4 py-3 placeholder-gray-500 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors flex items-center justify-center"
            >
              <Mail size={18} className="mr-2" />
              <span className="font-mono font-semibold">SUBSCRIBE</span>
            </button>
          </form>
          {status === 'error' && (
            <div className="mt-4 flex items-center justify-center text-red-500">
              <AlertCircle size={16} className="mr-2" />
              <span className="text-sm">{message}</span>
            </div>
          )}
          {status === 'success' && (
            <div className="mt-4 flex items-center justify-center text-green-500">
              <CheckCircle size={16} className="mr-2" />
              <span className="text-sm">{message}</span>
            </div>
          )}
          <p className="text-gray-500 text-xs mt-4">
            By subscribing, you agree to our privacy policy and terms of service.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;