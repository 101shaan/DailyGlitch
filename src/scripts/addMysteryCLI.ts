import { addMystery, type MysteryInput } from './addMystery';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

async function promptForMystery() {
  console.log('\n=== Add New Mystery ===\n');

  const id = await question('Enter ID: ');
  const title = await question('Enter Title: ');
  const date = await question('Enter Date (YYYY-MM-DD): ');
  const content = await question('Enter Content (press Enter twice to finish):\n');
  const imageUrl = await question('Enter Image URL: ');
  const tags = (await question('Enter Tags (comma-separated): ')).split(',').map(tag => tag.trim());
  const source = await question('Enter Source (optional, press Enter to skip): ');
  const finalThought = await question('Enter Final Thought: ');

  const mystery: MysteryInput = {
    id,
    title,
    date,
    content,
    imageUrl,
    tags,
    finalThought,
    ...(source && { source })
  };

  const success = await addMystery(mystery);
  
  if (success) {
    console.log('\nMystery added successfully!');
  } else {
    console.log('\nFailed to add mystery. Please check the error message above.');
  }

  rl.close();
}

promptForMystery().catch(console.error); 