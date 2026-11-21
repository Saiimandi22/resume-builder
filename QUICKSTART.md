# 🚀 Quick Start Guide - Resume Fine-Tuner

## 5-Minute Setup

### Step 1: Get Your API Key
1. Go to https://console.anthropic.com
2. Sign up or log in
3. Create an API key
4. Copy the key

### Step 2: Configure Environment
```bash
# In the project root directory
cp .env.example .env
```

Open `.env` and paste your API key:
```env
ANTHROPIC_API_KEY=sk-ant-...your-key-here...
PORT=5000
NODE_ENV=development
```

### Step 3: Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..

# Install frontend dependencies
cd client
npm install
cd ..
```

### Step 4: Start Development Servers

**Terminal 1 - Backend (stays running):**
```bash
npm run dev
# Output: Server running on http://localhost:5000
```

**Terminal 2 - Frontend (stays running):**
```bash
npm run client
# Output: Local: http://localhost:3000/
```

### Step 5: Open in Browser
- Go to http://localhost:3000
- Enter your resume details
- Paste a job description
- Get AI-powered resume fine-tuning!

## 🎯 Workflow

1. **Step 1: Your Resume**
   - Full name (required)
   - Email (required)
   - Phone (optional)
   - Professional summary
   - Skills (comma-separated or one per line)
   - Work experience
   - Education

2. **Step 2: Job Description**
   - Paste the full job description
   - Include responsibilities, requirements, qualifications

3. **Step 3: Results**
   - See original resume on the left
   - See fine-tuned resume on the right
   - View job description used for analysis
   - Print or start a new application

## 🧪 Test the API

Make sure both servers are running, then:
```bash
node test-api.js
```

This will:
- ✅ Check server health
- ✅ Fine-tune a sample resume
- ✅ Retrieve saved application
- ✅ Save and retrieve resumes
- ✅ List saved resumes

## 🛠️ Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start backend server |
| `npm run client` | Start frontend dev server |
| `npm run build` | Build frontend for production |
| `npm start` | Start production server |
| `npm test` | Run API tests |

## 🔗 Important URLs

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:3000 | 3000 |
| Backend API | http://localhost:5000/api | 5000 |
| Health Check | http://localhost:5000/api/health | 5000 |

## 📁 Key Files

| File | Purpose |
|------|---------|
| `.env` | Your API key configuration |
| `server/index.js` | Backend main file |
| `client/src/App.jsx` | Frontend main component |
| `server/services/claudeService.js` | AI integration |
| `README.md` | Full documentation |

## ⚠️ Troubleshooting

### "Cannot find module '@anthropic-ai/sdk'"
```bash
cd server && npm install && cd ..
```

### "Port 3000 already in use"
Edit `client/vite.config.js`:
```javascript
server: {
  port: 3001,  // Change to 3001 or another port
  ...
}
```

### "API key not found"
- Ensure `.env` file exists
- Verify ANTHROPIC_API_KEY is set
- Restart the backend server

### CORS errors
- Ensure backend is running on :5000
- Ensure frontend is making requests to `/api`

## 🎉 You're All Set!

The application is now ready to use. Start fine-tuning your resume for every job application!

## 📚 Learn More

- Full API documentation: See `README.md`
- Claude API docs: https://docs.anthropic.com
- React docs: https://react.dev
- Express docs: https://expressjs.com

---

**Questions?** Check the README.md for detailed documentation and troubleshooting.
