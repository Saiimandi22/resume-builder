# Using Google Gemini LLM with Resume Fine-Tuner

This guide explains how to switch from Claude to Google Gemini, or use both.

## 🔄 Switching LLM Providers

The app now supports **both Claude and Google Gemini**! You can easily switch between them.

### Option 1: Use Claude (Default)
```env
LLM_PROVIDER=claude
ANTHROPIC_API_KEY=sk-ant-...your-key...
```

### Option 2: Use Google Gemini
```env
LLM_PROVIDER=google
GOOGLE_API_KEY=your-google-key...
```

### Option 3: Have Both Available
```env
# .env file with both keys
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=...
LLM_PROVIDER=claude  # or 'google' to switch
```

---

## 🔑 Getting a Google API Key for Gemini

### Step 1: Go to Google AI Studio
1. Visit **https://aistudio.google.com/app/apikey**
2. Sign in with your Google account (or create one)

### Step 2: Create an API Key
1. Click **"Create API key"** or **"Get API key"**
2. Choose **"Create API key in new project"** or use existing project
3. Your API key appears instantly
4. It looks like: `AIzaSyD...`

### Step 3: Enable Gemini API
1. The API is usually auto-enabled
2. If not, go to **Google Cloud Console** (console.cloud.google.com)
3. Search for **"Generative Language API"**
4. Click **Enable**

### Step 4: Add to Your Project
```bash
# Update your .env file
nano .env
```

Add:
```env
GOOGLE_API_KEY=AIzaSyD...your-key-here...
LLM_PROVIDER=google
```

### Step 5: Install Dependencies
```bash
npm install
# This includes @google/generative-ai package
```

### Step 6: Restart Server
```bash
npm run dev
```

---

## 📊 Comparing Claude vs Google Gemini

| Feature | Claude 3.5 Sonnet | Google Gemini 1.5 Flash |
|---------|------------------|------------------------|
| **Cost** | ~$0.003 per input, $0.015 per output | Free tier (up to 15 requests/min) |
| **Speed** | Medium | Very Fast ✅ |
| **Quality** | Excellent ✅ | Very Good |
| **Context Window** | 200K tokens | 1M tokens ✅ |
| **Free Tier** | Trial credits ($5) | Yes! ✅ |
| **Resume Analysis** | Excellent | Excellent |

**Recommendation:**
- 👉 **Start with Google Gemini** - It's free and fast!
- Use **Claude** if you need higher quality (Claude slightly better for nuanced rewrites)

---

## ⚙️ Configuration Examples

### Example 1: Use Only Google (Free!)
```env
LLM_PROVIDER=google
GOOGLE_API_KEY=AIzaSyD...
PORT=5000
NODE_ENV=development
```

### Example 2: Use Only Claude
```env
LLM_PROVIDER=claude
ANTHROPIC_API_KEY=sk-ant-...
PORT=5000
NODE_ENV=development
```

### Example 3: Have Both Available
```env
# Use both API keys
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=AIzaSyD...
LLM_PROVIDER=claude  # Set to 'google' to switch

PORT=5000
NODE_ENV=development
```

Then switch by changing `LLM_PROVIDER` and restarting the server.

---

## 🚀 Quick Start with Google Gemini

```bash
# 1. Get your API key from https://aistudio.google.com/app/apikey

# 2. Update .env
cp .env.example .env
# Edit .env:
#   - Set GOOGLE_API_KEY=AIzaSyD...
#   - Set LLM_PROVIDER=google

# 3. Install dependencies (if not already done)
npm install

# 4. Start the server
npm run dev

# 5. Open http://localhost:3000 and start using it!
```

---

## ✅ Verify Your Setup

### Check Which Provider is Active
```bash
# The server log will show:
# "LLM Provider: google" or "LLM Provider: claude"
```

### Test the API
```bash
# See which provider is being used
curl http://localhost:5000/api/health

# Should output:
# {"status":"ok","llmProvider":"google"}
```

---

## 🔧 Switching Providers Mid-Project

You can switch between providers without losing your data:

1. **Stop the server** (Ctrl+C)
2. **Update `.env`:**
   ```env
   LLM_PROVIDER=google  # Change from 'claude'
   ```
3. **Restart the server:**
   ```bash
   npm run dev
   ```

Your saved resumes and applications remain untouched!

---

## 🆘 Troubleshooting

### "GOOGLE_API_KEY not found"
- Ensure `.env` has `GOOGLE_API_KEY=...`
- Restart the server after updating `.env`

### "Error: genai is not defined"
- Run: `npm install @google/generative-ai`

### "API quota exceeded"
- Google Gemini has free tier limits (15 requests/min)
- Upgrade to paid plan or use Claude

### "Invalid API key"
- Get a new key from https://aistudio.google.com/app/apikey
- Paste the full key (starts with `AIzaSy`)

### "Gemini API not enabled"
- Go to https://console.cloud.google.com
- Search for "Generative Language API"
- Click Enable

---

## 📈 Performance Comparison

**Resume Fine-tuning Speed:**
- Google Gemini: ~2-3 seconds ⚡ (Fastest!)
- Claude: ~3-5 seconds
- Difference: Usually imperceptible to users

**Quality of Results:**
- Both are excellent for resume rewriting
- Claude slightly more nuanced (older model advantage)
- Gemini faster and more cost-effective

---

## 💰 Cost Breakdown

### Google Gemini (Recommended for Cost)
- **Free Tier**: 15 requests/minute, unlimited
- **Paid**: $1.50 per 1M input tokens, $6 per 1M output tokens
- **Cost per Resume**: ~$0.00001 (essentially free!)

### Claude 3.5 Sonnet
- **Trial**: $5 free credits
- **Input**: $0.003 per 1K tokens (~$0.015 per resume)
- **Output**: $0.015 per 1K tokens (~$0.075 per resume)
- **Cost per Resume**: ~$0.09

**Winner: Google Gemini** 🏆 (1000x cheaper!)

---

## 🎯 Recommended Setup

For most users:
```env
# Start with free Google Gemini
LLM_PROVIDER=google
GOOGLE_API_KEY=AIzaSyD...your-key...
ANTHROPIC_API_KEY=optional  # Keep for backup

# If you want to try Claude later, just change:
# LLM_PROVIDER=claude
```

---

## 📚 Useful Links

- **Google API Keys**: https://aistudio.google.com/app/apikey
- **Gemini Documentation**: https://ai.google.dev/tutorials
- **Anthropic API Keys**: https://console.anthropic.com
- **Claude Documentation**: https://docs.anthropic.com
- **Google Cloud Console**: https://console.cloud.google.com

---

## Questions?

- Check the main README.md for more details
- Review the .env.example file
- Check server logs for LLM provider info
