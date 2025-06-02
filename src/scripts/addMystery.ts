import { supabase } from '../lib/supabase';
import type { Mystery } from '../types';

interface MysteryInput {
  id: string;
  title: string;
  date: string;
  content: string;
  imageUrl: string;
  tags: string[];
  source?: string;
  finalThought: string;
}

async function addMystery(mystery: MysteryInput) {
  try {
    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(mystery.date)) {
      throw new Error('Date must be in YYYY-MM-DD format');
    }

    // Validate required fields
    if (!mystery.id || !mystery.title || !mystery.content || !mystery.imageUrl || !mystery.tags || !mystery.finalThought) {
      throw new Error('Missing required fields');
    }

    // Insert the mystery into Supabase
    const { error } = await supabase
      .from('mysteries')
      .insert(mystery);

    if (error) {
      throw error;
    }

    console.log('Successfully added mystery:', mystery.title);
    return true;
  } catch (error) {
    console.error('Error adding mystery:', error);
    return false;
  }
}

// Example usage:
// const newMystery = {
//   id: '4',
//   title: 'The Disappearing Village',
//   date: '2024-06-02',
//   content: 'In 1930, a small village in northern Canada vanished overnight...',
//   imageUrl: 'https://example.com/image.jpg',
//   tags: ['disappearance', 'unexplained'],
//   source: 'Canadian Archives',
//   finalThought: 'What could cause an entire village to disappear without a trace?'
// };
// 
// addMystery(newMystery);

export { addMystery, type MysteryInput }; 