# 📚 Journal Review AI

An AI-powered personal research assistant that helps you manage, summarize, and analyze academic journals and papers.

## ✨ Features

- 📄 **Upload & Import**: Upload PDF journals or import from Endnote library
- 🔍 **Smart Search**: Search latest papers from arXiv, CrossRef by topic
- 🤖 **AI Analysis**: 
  - Automatic summarization
  - Key findings extraction
  - Research proposal polishing
  - Literature review generation
- 💾 **Personal Library**: Save and organize your research papers
- 🎨 **Beautiful UI**: Modern, responsive interface

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key (free credits for students)
- Supabase account (optional, for data persistence)

### Installation

```bash
# Clone the repository
git clone https://github.com/mdnajad96/journal-review-ai.git
cd journal-review-ai

# Install dependencies
npm install

# Create .env.local with your API keys
cp .env.local.example .env.local
# Edit .env.local and add your keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## 🔑 API Keys Setup

### OpenAI API (Required)
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or login
3. Create API key
4. Add to `.env.local`: `OPENAI_API_KEY=sk-...`

**Student Tip**: Check GitHub Student Pack for free OpenAI credits!

### Supabase (Optional, for database)
1. Go to [supabase.com](https://supabase.com)
2. Create free account
3. Create new project
4. Add URL and Anon Key to `.env.local`

## 📁 Project Structure

```
journal-review-ai/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Tailwind styles
│   ├── dashboard/           # User dashboard
│   ├── upload/              # Upload page
│   ├── search/              # Search page
│   └── api/                 # API routes
│       ├── upload/
│       ├── analyze/
│       └── search/
├── components/              # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── JournalCard.tsx
├── lib/                     # Utility functions
│   ├── ai-service.ts        # OpenAI integration
│   ├── journal-api.ts       # arXiv, CrossRef APIs
│   ├── pdf-parser.ts        # PDF parsing
│   └── db.ts                # Database setup
├── public/                  # Static assets
├── package.json
├── next.config.js
└── tsconfig.json
```

## 📚 How to Use

### 1. Upload a Journal
- Go to `/upload` page
- Drag & drop a PDF or click to upload
- AI will automatically summarize it

### 2. Import from Endnote
- Export your Endnote library as BibTeX
- Upload the file on the import page
- Papers will be added to your library

### 3. Search Latest Papers
- Go to `/search` page
- Enter a research topic
- Browse and import latest papers from arXiv

### 4. View Analysis
- Go to your dashboard
- Click any paper to see:
  - AI summary
  - Key findings
  - Related papers
  - Analysis notes

## 🛠️ Development

### Add a New Page
```bash
mkdir -p app/your-page
touch app/your-page/page.tsx
```

### Add an API Route
```bash
touch app/api/your-endpoint/route.ts
```

### Test Locally
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

```bash
npm install -g vercel
vercel
```

### Deploy to GitHub Pages
- Enable GitHub Pages in repository settings
- Set source to `gh-pages` branch

## 📖 API Documentation

### POST /api/upload
Upload and analyze a PDF journal.

**Request:**
```javascript
const formData = new FormData();
formData.append('file', file);

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData,
});
```

**Response:**
```json
{
  "id": "paper-123",
  "title": "Paper Title",
  "summary": "AI-generated summary...",
  "keyFindings": ["Finding 1", "Finding 2"],
  "uploadedAt": "2024-01-15"
}
```

### POST /api/analyze
Analyze text with AI.

**Request:**
```javascript
const response = await fetch('/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'Journal abstract...',
    analysisType: 'summarize' // or 'keyFindings', 'polishProposal'
  }),
});
```

### GET /api/search
Search papers by topic.

**Request:**
```javascript
const response = await fetch('/api/search?topic=machine+learning&source=arxiv');
```

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - feel free to use this project for personal or commercial use.

## 💡 Tips for Students

- **GitHub Student Pack**: Get free credits for many services
- **OpenAI Student Credits**: Ask for educational access
- **Supabase Free Tier**: Sufficient for development
- **Vercel Free Tier**: Great for hosting side projects

## 🆘 Troubleshooting

### API Key Issues
- Make sure `.env.local` is in your root directory
- Restart dev server after adding keys
- Check API key validity on provider's dashboard

### Port Already in Use
```bash
npm run dev -- -p 3001  # Use different port
```

### Build Errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📧 Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with details
3. Include error messages and steps to reproduce

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- AI powered by [OpenAI](https://openai.com/)
- Paper data from [arXiv](https://arxiv.org/) and [CrossRef](https://www.crossref.org/)

---

**Happy researching! 🎓**
