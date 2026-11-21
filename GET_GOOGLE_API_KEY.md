# 🔑 Get Google API Key - Step-by-Step Guide

## ⏱️ Time Required: 2 Minutes

---

## **STEP 1️⃣: Open Google AI Studio**

1. Go to this URL: **https://aistudio.google.com/app/apikey**
2. If not logged in, click **"Sign in with Google"**
3. Enter your Google account email and password
4. If you don't have a Google account, click **"Create account"**

---

## **STEP 2️⃣: Create API Key**

Once you're logged in, you'll see a page with:
- Text saying "API Keys"
- A blue button that says **"Create API key"** or **"Get API key"**

**Click the blue button** ➜

A popup will appear with two options:
- ✅ **"Create API key in new project"** (Recommended for beginners)
- "Create API key in existing project"

**Click the first option** ✅

---

## **STEP 3️⃣: Copy Your API Key**

Your API key appears instantly! It will look like:
```
AIzaSyD_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Important:**
- 🔐 This is your SECRET key - keep it safe!
- 👁️ You'll only see it once
- 📋 Click **"Copy"** to copy it

---

## **STEP 4️⃣: Add to Your Project**

Go back to your project folder and open `.env`:

```bash
# Option A: Using nano (easiest)
nano .env

# Option B: Using your code editor
# Just open the .env file in VS Code or your favorite editor
```

Add these lines:
```env
GOOGLE_API_KEY=AIzaSyD_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
LLM_PROVIDER=google
```

Replace `AIzaSyD_...` with YOUR actual key!

**Save the file** (Ctrl+O then Enter if using nano, or Ctrl+S in editor)

---

## **STEP 5️⃣: Restart Your Server**

Stop the backend server if it's running (press **Ctrl+C**)

Then restart:
```bash
npm run dev
```

**You should see:**
```
Server running on http://localhost:5000
LLM Provider: google
```

---

## **STEP 6️⃣: Verify It Works**

Go to your app: **http://localhost:3000**

Enter a resume and job description, then click **"Fine-tune My Resume"**

If it works, you're all set! ✅

---

## ✅ Complete .env File Example

```env
# Google Gemini Setup
GOOGLE_API_KEY=AIzaSyD_your_actual_key_here
LLM_PROVIDER=google

# Optional: Keep Claude key as backup
ANTHROPIC_API_KEY=sk-ant-optional

PORT=5000
NODE_ENV=development
```

---

## 🆘 If Something Goes Wrong

### Error: "GOOGLE_API_KEY not found"
- ✅ Make sure `.env` file has the key
- ✅ Restart the server after adding it
- ✅ No spaces around the `=` sign

### Error: "API key invalid"
- Get a new key from https://aistudio.google.com/app/apikey
- Make sure you copied the ENTIRE key
- Restart the server

### "GenAI is not defined"
- Run: `npm install @google/generative-ai`
- Restart the server

### "Quota exceeded"
- Google Gemini has a free tier limit (15 requests/min)
- Wait a minute and try again
- Or upgrade to paid plan

---

## 🎯 That's It!

You now have Google Gemini working with your Resume Fine-Tuner! 🎉

**Features:**
- ✅ Completely FREE
- ✅ Super fast (2-3 seconds per resume)
- ✅ Excellent quality
- ✅ No credit card needed

---

## 📚 Next Steps

1. **Try it out!** Go to http://localhost:3000
2. **Enter your resume** in the form
3. **Paste a job description** you want to apply for
4. **Click "Fine-tune My Resume"** and watch the magic happen!

---

## 💡 Pro Tips

| Tip | Benefit |
|-----|---------|
| Copy your .env.example file first | Easier setup |
| Test with a simple job description | Faster feedback |
| Keep your key safe | Prevents misuse |
| Use free tier first | Save money while testing |
| Switch to Claude later if needed | Maximum flexibility |

---

**Questions?** Check the LLM_PROVIDERS.md file in your project folder! 📖
