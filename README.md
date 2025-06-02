# Daily Glitch

A mysterious daily dose of unexplained phenomena, strange occurrences, and mind-bending mysteries. Each day brings a new story that challenges our understanding of reality.

![Daily Glitch](https://images.pexels.com/photos/164175/pexels-photo-164175.jpeg)

## 🌟 Features

- **Daily Mysteries**: A new mysterious story every day
- **Archive**: Access to all past mysteries
- **Search**: Find mysteries by title, content, or tags
- **Responsive Design**: Beautiful experience on all devices
- **Modern UI**: Sleek, dark theme with glitch aesthetics
- **Newsletter**: Stay updated with new mysteries

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/daily-glitch.git
cd daily-glitch
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## 📝 Adding New Mysteries

### Using the CLI Tool

The easiest way to add new mysteries is using the built-in CLI tool:

```bash
npm run add-mystery
```

This will start an interactive prompt where you can enter:
- ID
- Title
- Date (YYYY-MM-DD format)
- Content
- Image URL
- Tags (comma-separated)
- Source (optional)
- Final Thought

### Manual Database Entry

You can also add mysteries directly to your Supabase database. Each mystery should have the following structure:

```typescript
interface Mystery {
  id: string;
  title: string;
  date: string;        // YYYY-MM-DD format
  content: string;
  imageUrl: string;
  tags: string[];
  source?: string;     // optional
  finalThought: string;
}
```

## 🏗️ Project Structure

```
daily-glitch/
├── src/
│   ├── components/     # React components
│   ├── data/          # Data handling and API calls
│   ├── lib/           # Utility functions and configurations
│   ├── pages/         # Page components
│   ├── scripts/       # Utility scripts
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
└── package.json       # Project dependencies and scripts
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run add-mystery` - Add a new mystery via CLI

## 🎨 Customization

### Styling

The project uses Tailwind CSS for styling. You can customize the theme in `tailwind.config.js`.

### Images

For best results, use images with:
- Resolution: 1200x800px or higher
- Aspect ratio: 3:2
- Dark or moody aesthetic
- Good contrast for text overlay

## 📚 Database Schema

### Mysteries Table

```sql
create table mysteries (
  id text primary key,
  title text not null,
  date date not null,
  content text not null,
  imageUrl text not null,
  tags text[] not null,
  source text,
  finalThought text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.io/) for the backend
- [React](https://reactjs.org/) for the frontend
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide Icons](https://lucide.dev/) for icons

## 📞 Support

For support, email shaansisodia3@gmail.com or open an issue in the repository. 