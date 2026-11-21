# Resume Fine-Tuner

An AI-powered resume fine-tuning application that helps job seekers tailor their resumes to specific job descriptions using Claude AI.

## Features

- 🎯 **Resume Upload**: Enter your resume information through a user-friendly form
- 📝 **Job Description Parsing**: Paste any job description
- 🤖 **AI-Powered Fine-tuning**: Uses Claude 3.5 Sonnet to intelligently rewrite your resume to match job requirements
- 👀 **Side-by-Side Comparison**: View original and fine-tuned versions side-by-side
- 📊 **Multiple View Modes**: Compare, view original, or view fine-tuned resume
- 🖨️ **Print Support**: Print your results for easy sharing

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **AI**: Claude API (Anthropic)
- **Data Storage**: JSON files

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: CSS3

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- Anthropic API key (get one at https://console.anthropic.com)

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
# Edit .env and add your ANTHROPIC_API_KEY
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

## Usage

1. Enter your resume details (name, email, experience, skills, education)
2. Paste the job description you're applying for
3. Get AI-powered resume fine-tuning results
4. View side-by-side comparison of original vs. fine-tuned resume
5. Print or start a new application

## Project Structure

```
resume-builder/
├── server/                      # Backend (Node.js/Express)
│   ├── index.js
│   ├── services/
│   │   ├── claudeService.js    # Claude AI integration
│   │   └── storageService.js   # File storage
│   └── routes/
│       ├── jobs.js             # Fine-tuning endpoints
│       └── resume.js           # Resume management
├── client/                      # Frontend (React/Vite)
│   ├── src/
│   │   ├── components/         # React components
│   │   └── styles/             # CSS files
│   └── vite.config.js
├── data/                        # Stored data (auto-created)
├── test-api.js                  # API test script
└── README.md
```

## API Endpoints

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
ANTHROPIC_API_KEY=your_key_here
PORT=5000
NODE_ENV=development
```

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
