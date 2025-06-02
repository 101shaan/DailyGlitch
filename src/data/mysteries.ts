import { supabase } from '../lib/supabase';
import type { Mystery } from '../types';
import { mysteries as mockMysteries } from './mockData';

// Export the mysteries for direct use
export const mysteries = mockMysteries;

export const getLatestMystery = async (): Promise<Mystery | null> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('mysteries')
      .select('*')
      .lte('date', today)
      .order('date', { ascending: false })
      .limit(1)
      .single();
      
    if (error) {
      console.error('Error fetching latest mystery:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching latest mystery:', error);
    return null;
  }
};

export const getMysteryById = async (id: string): Promise<Mystery | null> => {
  try {
    const { data, error } = await supabase
      .from('mysteries')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error fetching mystery by id:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching mystery by id:', error);
    return null;
  }
};

export const searchMysteries = async (query: string): Promise<Mystery[]> => {
  try {
    const { data, error } = await supabase
      .from('mysteries')
      .select('*')
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .order('date', { ascending: false });
      
    if (error) {
      console.error('Error searching mysteries:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error searching mysteries:', error);
    return [];
  }
};

export const getAllMysteries = async (): Promise<Mystery[]> => {
  try {
    const { data, error } = await supabase
      .from('mysteries')
      .select('*')
      .order('date', { ascending: false });
      
    if (error) {
      console.error('Error fetching all mysteries:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching all mysteries:', error);
    return [];
  }
};

// Get mysteries for the archive (all past mysteries)
export const getArchiveMysteries = async (): Promise<Mystery[]> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('mysteries')
      .select('*')
      .lt('date', today)
      .order('date', { ascending: false });
      
    if (error) {
      console.error('Error fetching archive mysteries:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching archive mysteries:', error);
    return [];
  }
};