import { supabase } from '../lib/supabase';

const mysteries = [
  {
    id: '1',
    title: 'The Man from Taured',
    date: '2024-05-30', // Today (Friday May 30th)
    content: `In July 1954, a well-dressed European businessman arrived at Tokyo International Airport carrying a passport from a country called "Taured." When questioned by immigration officials, he insisted Taured had existed for over 1,000 years between France and Spain.

His passport appeared authentic with stamps from previous visits to Japan and other countries. His hotel was confirmed, his company existed, but "Taured" did not. When shown a map, he became confused and pointed to Andorra, insisting it was Taured.

Officials detained him in a hotel while they investigated. Guards were posted outside his room on the 15th floor with no balcony. By morning, the man and all his documentation had vanished from the locked room.

No explanation was ever found for his disappearance or the mystery country he claimed as home.`,
    imageUrl: 'https://images.pexels.com/photos/164175/pexels-photo-164175.jpeg',
    tags: ['disappearance', 'alternate reality', 'unexplained'],
    source: 'Tokyo Police Archives (unconfirmed)',
    finalThought: 'Did he return to a parallel universe where Taured does exist, or was he an elaborate hoaxer who managed an impossible escape?'
  },
  {
    id: '2',
    title: 'The Max Headroom Broadcast Intrusion',
    date: '2024-05-31', // Tomorrow (Saturday May 31st)
    content: `On November 22, 1987, Chicago television signals were hijacked by someone wearing a Max Headroom mask. At 9:14 PM, during WGN-TV's news broadcast, the signal was interrupted for 30 seconds by a person in a Max Headroom mask against a moving background.

Later that night at 11:15 PM, during a PBS broadcast of Doctor Who, the signal was hijacked again. This time, the masked figure appeared for 90 seconds with distorted audio. The person exposed their buttocks while being spanked with a flyswatter by an accomplice before the broadcast returned to normal.

Despite extensive investigations by the FCC and FBI, the culprits were never identified. The broadcast intrusion required significant technical knowledge and equipment to override television signals.

To this day, the identity of the Max Headroom signal hijacker remains unknown.`,
    imageUrl: 'https://images.pexels.com/photos/333984/pexels-photo-333984.jpeg',
    tags: ['technology', 'unsolved', 'broadcast'],
    source: 'FCC Investigation Files',
    finalThought: 'In today\'s heavily monitored digital landscape, could such an anonymous intrusion ever happen again?'
  },
  {
    id: '3',
    title: 'The Time-Traveling Hipster',
    date: '2024-06-01', // Day after tomorrow (June 1st)
    content: `A photograph from 1941 at the reopening of the South Fork Bridge in Gold Bridge, British Columbia, captured what appears to be a modern man among the crowd of people dressed in 1940s attire.

The man stands out dramatically - wearing sunglasses of a modern style, a printed T-shirt, and holding what some claim is a portable camera. His entire appearance seems out of place for the era.

While skeptics point out that the sunglasses style (albeit uncommon) did exist in the 1940s, as did portable cameras and printed logo sweaters, the combination of all these elements in one individual creates an uncanny impression of a time traveler accidentally captured on film.

The original photograph is preserved at the Bralorne Pioneer Museum.`,
    imageUrl: 'https://images.pexels.com/photos/1252983/pexels-photo-1252983.jpeg',
    tags: ['time travel', 'photograph', 'unexplained'],
    source: 'Bralorne Pioneer Museum Archives',
    finalThought: 'If time travelers walk among us, would we recognize them only by their anachronistic fashion choices?'
  }
];

async function initializeData() {
  // First, delete existing data
  const { error: deleteError } = await supabase
    .from('mysteries')
    .delete()
    .neq('id', '0'); // Delete all records

  if (deleteError) {
    console.error('Error deleting existing data:', deleteError);
    return;
  }

  // Insert new data
  const { error: insertError } = await supabase
    .from('mysteries')
    .insert(mysteries);

  if (insertError) {
    console.error('Error inserting data:', insertError);
    return;
  }

  console.log('Successfully initialized mystery data!');
}

initializeData();