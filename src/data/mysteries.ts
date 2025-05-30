import { supabase } from '../lib/supabase';
import type { Mystery } from '../types';
import { mysteries as mockMysteries } from './mockData';

// Export the mysteries for direct use
export const mysteries = mockMysteries;

export const getLatestMystery = async (): Promise<Mystery | null> => {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Find mysteries that are scheduled for today or earlier
    const availableMysteries = mockMysteries.filter(m => m.date <= today);
    
    // Get the most recent one
    const latestMystery = availableMysteries.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0] || null;
    
    return latestMystery;
  } catch (error) {
    console.error('Error fetching latest mystery:', error);
    return null;
  }
};

export const getMysteryById = async (id: string): Promise<Mystery | null> => {
  try {
    const mystery = mockMysteries.find(m => m.id === id) || null;
    return mystery;
  } catch (error) {
    console.error('Error fetching mystery by id:', error);
    return null;
  }
};

export const searchMysteries = async (query: string): Promise<Mystery[]> => {
  try {
    const lowerQuery = query.toLowerCase();
    return mockMysteries.filter(mystery => 
      mystery.title.toLowerCase().includes(lowerQuery) || 
      mystery.content.toLowerCase().includes(lowerQuery) ||
      mystery.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  } catch (error) {
    console.error('Error searching mysteries:', error);
    return [];
  }
};

export const getAllMysteries = async (): Promise<Mystery[]> => {
  try {
    return [...mockMysteries];
  } catch (error) {
    console.error('Error fetching all mysteries:', error);
    return [];
  }
};