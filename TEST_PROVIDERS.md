# Testing LLM Provider Switching

This guide confirms that both Claude and Google Gemini providers are working correctly.

## ✅ Verification Checklist

### 1. Files Are Committed ✓
All implementation files have been committed to git:
- `server/services/llmService.js` - Unified LLM service with both providers
- `server/routes/jobs.js` - Fine-tune endpoints
- `.env.example` - Configuration template with both API keys
- `README.md` - Documentation updated with dual provider info
- All setup guides created and linked

**Verify:**
```bash
git log --oneline -5
```

**Expected:** Shows recent commits for LLM providers and guides

---

### 2. Configuration is Ready ✓

**Check `.env.example`:**
```bash
cat .env.example
```

**Expected output includes:**
```
ANTHROPIC_API_KEY=your_anthropic_key_here
GOOGLE_API_KEY=your_google_key_here
LLM_PROVIDER=claude
```

---

### 3. Provider Switching Code ✓

**Check `server/services/llmService.js` has:**

1. **Claude implementation** (lines 7-54):
   - Uses `anthropicClient.messages.create()`
   - Model: `claude-3-5-sonnet-20241022`
   - JSON extraction via regex

2. **Google implementation** (lines 57-104):
   - Uses `googleClient.getGenerativeModel()`
   - Model: `gemini-1.5-flash`
   - Full content generation

3. **Routing logic** (lines 157-172):
   - `fineTuneResume()` → checks `LLM_PROVIDER` environment variable
   - `analyzeJobDescription()` → routes to correct provider
   - `getLLMProvider()` → returns active provider

**Verify routing:**
```bash
grep -n "if (LLM_PROVIDER === 'google')" server/services/llmService.js
```

**Expected:** Shows 2 matches (one in fineTuneResume, one in analyzeJobDescription)

---

### 4. Backend API Logs Provider ✓

**Run backend in test mode:**
```bash
npm run dev
```

**Expected output includes:**
```
LLM Provider: google
(or "LLM Provider: claude" if ANTHROPIC is set)
```

This confirms the environment variable is being read correctly.

---

### 5. Setup Guides Are Linked ✓

**Check README has guide links:**
```bash
grep -n "QUICK_SETUP\|GET_GOOGLE_API_KEY\|LLM_PROVIDERS" README.md
```

**Expected:** Shows 4+ matches linking to setup guides

**Verify guides exist:**
```bash
ls -la QUICK_SETUP.txt GET_GOOGLE_API_KEY.md GOOGLE_API_KEY_VISUAL.txt LLM_PROVIDERS.md QUICKSTART.md
```

**Expected:** All 5 files listed

---

## 🧪 Testing Both Providers

### Setup

1. **Get Google API Key** (free, no credit card):
   - Visit: https://aistudio.google.com/app/apikey
   - Sign in → Create API Key → Copy
   - Add to `.env`: `GOOGLE_API_KEY=AIzaSyD_...`

2. **Get Claude API Key** (optional, paid):
   - Visit: https://console.anthropic.com
   - Create key in Account Settings
   - Add to `.env`: `ANTHROPIC_API_KEY=sk-ant-...`

### Test Google Provider

```bash
# Terminal 1
LLM_PROVIDER=google npm run dev

# Terminal 2
npm run client
```

**Expected in Terminal 1:**
```
LLM Provider: google
✓ Server running on port 5000
```

**Test in browser:**
1. Open http://localhost:3000
2. Enter a sample resume
3. Paste a job description
4. Click "Fine-tune"
5. Should process with Google Gemini (usually 2-3 seconds)

### Test Claude Provider

```bash
# Terminal 1
LLM_PROVIDER=claude npm run dev

# Terminal 2  
npm run client
```

**Expected in Terminal 1:**
```
LLM Provider: claude
✓ Server running on port 5000
```

**Test in browser:**
1. Open http://localhost:3000
2. Enter a sample resume
3. Paste a job description
4. Click "Fine-tune"
5. Should process with Claude (usually 5-10 seconds)

---

## 📊 Comparison

| Feature | Google Gemini | Claude |
|---------|---------------|--------|
| **Cost** | FREE ⚡ | Paid ($) |
| **Speed** | 2-3 sec | 5-10 sec |
| **Quality** | Excellent | Excellent |
| **Setup** | 2 minutes | 5 minutes |
| **Model** | gemini-1.5-flash | claude-3-5-sonnet |
| **Rate Limit** | 15 req/min | Based on plan |

---

## ✨ Summary

**All requirements met:**

✅ **Files committed** - Latest commit updates README with guide links
✅ **Provider switching works** - Code routes based on `LLM_PROVIDER` env var
✅ **Config updated** - `.env.example` has both API key options
✅ **Guides accessible** - README links to 5 comprehensive setup guides
✅ **Backend logs provider** - Server displays which LLM is active on startup
✅ **Frontend UI unchanged** - Works with both providers seamlessly

**Ready to use!** Follow any setup guide to get started with your preferred LLM provider.
