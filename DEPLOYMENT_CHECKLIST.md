# 📋 Production Deployment Checklist

Use this checklist to deploy your Resume Fine-Tuner to production.

## ✅ Prerequisites

- [ ] GitHub account (you have this!)
- [ ] Vercel account (free - https://vercel.com)
- [ ] Google API key OR Anthropic API key
- [ ] 15 minutes of free time

## ✅ Step 1: Vercel Setup (5 mins)

- [ ] Go to https://vercel.com
- [ ] Sign up with GitHub
- [ ] Grant GitHub access to your repositories

## ✅ Step 2: Create Frontend Project (3 mins)

- [ ] In Vercel: "Add New" → "Project"
- [ ] Import `Saiimandi22/resume-builder`
- [ ] Framework: **Vite**
- [ ] Root Directory: `.` (default)
- [ ] Build Command: `cd client && npm run build`
- [ ] Output Directory: `client/dist`
- [ ] Name: `resume-builder-frontend`
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Go to Project Settings → General
- [ ] Copy the **Project ID** (long string)
- [ ] Save it somewhere

## ✅ Step 3: Create Backend Project (3 mins)

- [ ] In Vercel: "Add New" → "Project"
- [ ] Import `Saiimandi22/resume-builder` (same repo)
- [ ] Framework: **Other** (or Node.js)
- [ ] Root Directory: `server`
- [ ] Build Command: `npm install`
- [ ] Start Command: `node index.js`
- [ ] Name: `resume-builder-backend`
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Go to Project Settings → General
- [ ] Copy the **Project ID** (long string)
- [ ] Save it somewhere

## ✅ Step 4: Get Vercel Credentials (2 mins)

- [ ] Go to https://vercel.com/account/tokens
- [ ] Click "Create Token"
- [ ] Name: `GitHub Resume Builder`
- [ ] Copy the token value
- [ ] Save it safely (you'll need it once!)
- [ ] Go to https://vercel.com/account
- [ ] Find your **Team/Org ID** in settings
- [ ] Copy it and save

## ✅ Step 5: Add GitHub Secrets (3 mins)

- [ ] Go to your repo: https://github.com/Saiimandi22/resume-builder
- [ ] Click "Settings" → "Secrets and variables" → "Actions"
- [ ] Click "New repository secret"
- [ ] Add `VERCEL_TOKEN` = [paste your token from Step 4]
- [ ] Add `VERCEL_ORG_ID` = [paste your Org ID from Step 4]
- [ ] Add `VERCEL_PROJECT_ID_FRONTEND` = [from Step 2]
- [ ] Add `VERCEL_PROJECT_ID_BACKEND` = [from Step 3]

## ✅ Step 6: Configure Environment Variables (2 mins)

For **Frontend Project** in Vercel:
- [ ] Go to Project Settings → Environment Variables
- [ ] Add `VITE_API_URL` = `https://your-backend-url.vercel.app/api`
  (you'll know this after first deploy)

For **Backend Project** in Vercel:
- [ ] Go to Project Settings → Environment Variables
- [ ] Add `GOOGLE_API_KEY` = your Google API key (get one at https://aistudio.google.com/app/apikey)
- [ ] Add `LLM_PROVIDER` = `google`
- [ ] Add `NODE_ENV` = `production`
- [ ] Add `ANTHROPIC_API_KEY` = (if you have Claude key)

## ✅ Step 7: Push to GitHub (1 min)

```bash
cd /path/to/resume-builder
git push origin saiimandi22-resume-fine-tuning-app
```

Watch the GitHub Actions run:
- [ ] Go to Actions tab
- [ ] See your deployment workflow running
- [ ] Wait for it to complete (3-5 minutes)

## ✅ Step 8: Get Your Production URLs (1 min)

After deployment completes:
- [ ] Go to Vercel Dashboard
- [ ] Frontend Project → Domains → Copy the URL
- [ ] Backend Project → Domains → Copy the URL
- [ ] Test frontend URL in browser
- [ ] Should see the Resume Fine-Tuner app!

## ✅ Step 9: Final Verification (2 mins)

- [ ] Open frontend URL in browser
- [ ] See the app load successfully
- [ ] Try uploading a text resume file
- [ ] Try processing with job description
- [ ] Verify results display correctly
- [ ] Try different view modes
- [ ] Test print functionality

## ✅ Step 10: Create Pull Request (optional but recommended)

- [ ] Go to: https://github.com/Saiimandi22/resume-builder/pull/new/saiimandi22-resume-fine-tuning-app
- [ ] Add description: "Add Resume Fine-Tuner application with production deployment"
- [ ] Click "Create Pull Request"
- [ ] Request review (or self-review)
- [ ] Merge to `main` branch when ready

## 🎉 You're Done!

Your app is now live in production! 🚀

**Share your production URL:**
- Frontend: `https://your-frontend.vercel.app`
- Let others know they can use it!

## 🚨 Troubleshooting

**"Build failed" in GitHub Actions?**
- Check Actions logs for error message
- Most common: missing environment variables
- Solution: Verify VERCEL_TOKEN and Project IDs in GitHub Secrets

**"404 when I open the frontend URL?**
- Check Vercel frontend project settings
- Verify build output directory is `client/dist`
- Try "Redeploy" button in Vercel

**"Backend not responding?**
- Check Vercel backend project logs
- Verify environment variables are set
- Check `GOOGLE_API_KEY` or `ANTHROPIC_API_KEY` is correct

**"Can't parse resume file?**
- Verify file is PDF, Word, or Text
- Ensure file size < 10MB
- Check browser console for errors
- Try with the sample `data/test-resume.txt` file

## 📚 Need Help?

- Vercel Docs: https://vercel.com/docs
- GitHub Actions: https://docs.github.com/en/actions
- Google API: https://ai.google.dev/docs
- Anthropic API: https://docs.anthropic.com

---

**Total Time**: ~15-20 minutes
**Cost**: FREE (Vercel free tier)
**Result**: Production app with auto-deployment! 🎉
