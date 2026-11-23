# Resume Fine-Tuner

An AI-powered resume fine-tuning application that helps job seekers tailor their resumes to specific job descriptions using Claude AI or Google Gemini.

## Features

- 🎯 **Resume Upload**: Enter your resume information through a user-friendly form
- 📝 **Job Description Parsing**: Paste any job description
- 🤖 **AI-Powered Fine-tuning**: Uses Claude 3.5 Sonnet or Google Gemini to intelligently rewrite your resume to match job requirements
- 👀 **Side-by-Side Comparison**: View original and fine-tuned versions side-by-side
- 📊 **Multiple View Modes**: Compare, view original, or view fine-tuned resume
- 🖨️ **Print Support**: Print your results for easy sharing
- 🔄 **Multiple LLM Providers**: Choose between Claude (high quality) or Google Gemini (free & fast)

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **AI**: Claude API (Anthropic) or Google Gemini API
- **File Parsing**: pdf-parse (PDF), mammoth (Word), native (Text)
- **File Upload**: Multer
- **Data Storage**: JSON files

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: CSS3

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- **Option A**: Google API key (free! Get at https://aistudio.google.com/app/apikey)
- **Option B**: Anthropic API key (get one at https://console.anthropic.com)

### Setup

1. Install dependencies:
```bash
npm install
cd server && npm install
cd ../client && npm install
cd ..
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env and add your API key
# For Google Gemini (recommended): GOOGLE_API_KEY=...
# For Claude: ANTHROPIC_API_KEY=...
```

3. Run the application:

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

4. Open http://localhost:3000 in your browser

## 📚 Setup Guides

Choose your preferred LLM provider and follow the guide that works best for you:

### Google Gemini (Recommended - Free & Fast ⚡)
- **[QUICK_SETUP.txt](./QUICK_SETUP.txt)** - 60-second setup reference
- **[GET_GOOGLE_API_KEY.md](./GET_GOOGLE_API_KEY.md)** - Detailed 5-minute walkthrough with screenshots
- **[GOOGLE_API_KEY_VISUAL.txt](./GOOGLE_API_KEY_VISUAL.txt)** - ASCII visual guide

### Claude (High Quality ✨)
- See [LLM_PROVIDERS.md](./LLM_PROVIDERS.md) for Claude setup
- Full comparison between Claude and Google Gemini

### Documentation
- **[LLM_PROVIDERS.md](./LLM_PROVIDERS.md)** - Complete provider comparison, features, and troubleshooting
- **[QUICKSTART.md](./QUICKSTART.md)** - Original 5-minute quick start guide

## Usage

1. **Choose Input Method**:
   - **📁 Upload File**: Upload your resume as PDF, Word (.docx), or Text file
   - **✏️ Type Manually**: Enter resume details manually in the form

2. If uploading a file:
   - Supported formats: PDF, Word (.docx, .doc), Plain Text
   - Maximum file size: 10MB
   - The app automatically extracts: name, email, phone, skills, experience, education

3. Enter job description and get AI-powered resume fine-tuning
4. View side-by-side comparison of original vs. fine-tuned resume
5. Print or start a new application

## File Upload Feature

### Supported Formats
- **PDF** - Professional resume PDFs
- **Word** - Microsoft Word documents (.docx, .doc)
- **Plain Text** - Simple text files (.txt)

### How It Works
1. Click "📁 Upload File" on the resume form
2. Select your resume file (PDF, Word, or Text)
3. The application automatically:
   - Parses the file content
   - Extracts resume sections (name, email, phone, skills, experience, education)
   - Populates the form with extracted data
4. Review and edit the extracted information if needed
5. Click "Next: Add Job Description" to continue

### Technical Details
- File uploads are processed server-side using Node.js
- PDF parsing: `pdf-parse` library
- Word document parsing: `mammoth` library
- Text files parsed directly
- Uploaded files are automatically deleted after processing for privacy
- Maximum file size: 10MB
- All extraction happens locally on your server

## Project Structure

```
resume-builder/
├── server/                      # Backend (Node.js/Express)
│   ├── index.js
│   ├── services/
│   │   ├── fileParserService.js# File upload and parsing
│   │   ├── llmService.js       # LLM provider routing
│   │   ├── claudeService.js    # Claude AI integration
│   │   └── storageService.js   # File storage
│   └── routes/
│       ├── jobs.js             # Fine-tuning endpoints
│       └── resume.js           # Resume management + file parsing
├── client/                      # Frontend (React/Vite)
│   ├── src/
│   │   ├── components/         # React components
│   │   └── styles/             # CSS files
│   └── vite.config.js
├── data/                        # Stored data (auto-created)
│   └── uploads/               # Temporary uploaded files (auto-cleaned)
├── test-api.js                  # API test script
└── README.md
```

## API Endpoints

### File Upload
- `POST /api/resume/parse` - Parse and extract resume from uploaded file
  - Accepts: PDF, Word (.doc, .docx), Plain Text
  - Returns: Extracted resume fields (name, email, phone, skills, experience, education)
  - Max file size: 10MB

### Fine-tune Resume
- `POST /api/jobs/fine-tune` - Analyze job description and fine-tune resume
- `POST /api/jobs/analyze` - Analyze job description
- `GET /api/jobs/application/:id` - Retrieve saved application

### Resume Management
- `POST /api/resume/create` - Save resume
- `GET /api/resume/:id` - Get resume
- `GET /api/resume` - List all resumes

## Testing

```bash
npm install axios  # if not already installed
node test-api.js
```

This runs a comprehensive test suite validating all major features.

## Environment Variables

```env
# Choose ONE LLM provider:
ANTHROPIC_API_KEY=your_claude_key_here    # For Claude
GOOGLE_API_KEY=your_gemini_key_here       # For Google Gemini (free!)

# Select which provider to use:
LLM_PROVIDER=google    # or "claude"

# Server config:
PORT=5000
NODE_ENV=development
```

For detailed setup instructions, see [LLM_PROVIDERS.md](./LLM_PROVIDERS.md).

## How It Works

1. **Resume Collection**: User enters resume in structured form
2. **Job Analysis**: Claude AI analyzes the job description to identify:
   - Required technical skills
   - Key responsibilities
   - Experience requirements
   - Industry focus
   - Critical keywords

3. **Resume Fine-tuning**: Claude intelligently rewrites sections to:
   - Highlight relevant experience
   - Incorporate job-specific keywords
   - Emphasize matching accomplishments
   - Maintain authenticity (never fabricates experience)

4. **Results Display**: Shows original and fine-tuned versions side-by-side

## Features

✅ Multi-step form workflow
✅ Real-time AI processing
✅ Split-view comparison
✅ Persistent storage
✅ Print-friendly output
✅ Responsive design
✅ Error handling

## Production Build

```bash
npm run build
npm start
```

This builds the React client and serves it from the Express server.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "API key not found" | Ensure `.env` has ANTHROPIC_API_KEY |
| CORS errors | Verify backend runs on :5000, frontend on :3000 |
| Port already in use | Change PORT in .env or vite.config.js |
| "Server not running" | Start backend first: `npm run dev` |

## Future Enhancements

- 📄 PDF import/export
- 🔗 Job board integration (LinkedIn, Indeed)
- 💾 Database backend
- 👤 User authentication
- 📊 Application tracking
- 🌍 Multi-language support
- ⚡ Batch processing

## License

MIT
