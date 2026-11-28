# 🚀 Production Deployment Guide

## Overview

Your Resume Fine-Tuner is now configured for **automatic deployment to production** via GitHub Actions and Vercel.

Every time you push code to the `main` branch on GitHub:
1. ✅ GitHub Actions automatically runs tests and builds
2. ✅ Frontend deploys to Vercel
3. ✅ Backend deploys to Vercel
4. ✅ Your app goes live immediately

## 📋 Setup Steps

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (recommended)
3. Authorize access to your repositories

### Step 2: Create Two Vercel Projects

**For Frontend (React):**
1. Click "Add New..." → "Project"
2. Import `Saiimandi22/resume-builder`
3. Framework: **Vite**
4. Build Command: `cd client && npm run build`
5. Output Directory: `client/dist`
6. Project Name: `resume-builder-frontend` (or similar)
7. Click "Deploy"
8. **Copy the Project ID** (from Project Settings → General)

**For Backend (Node.js):**
1. Click "Add New..." → "Project"
2. Import `Saiimandi22/resume-builder` (same repo)
3. Framework: **Other** (or Node.js)
4. Root Directory: `server`
5. Build Command: `npm install`
6. Start Command: `node index.js`
7. Project Name: `resume-builder-backend` (or similar)
8. Click "Deploy"
9. **Copy the Project ID** (from Project Settings → General)

### Step 3: Get Your Vercel Credentials

1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name: `GitHub Resume Builder`
4. **Copy the token** (you'll need this once)
5. Go to [vercel.com/account/billing/overview](https://vercel.com/account/billing/overview)
6. Find your **Org ID** (shows in URL or settings)

### Step 4: Add GitHub Secrets

1. Go to your GitHub repo: `https://github.com/Saiimandi22/resume-builder`
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add these 5 secrets:

```
Name: VERCEL_TOKEN
Value: [paste your Vercel token from Step 3]

Name: VERCEL_ORG_ID
Value: [your Org ID from Step 3]

Name: VERCEL_PROJECT_ID_FRONTEND
Value: [Project ID from frontend project]

Name: VERCEL_PROJECT_ID_BACKEND
Value: [Project ID from backend project]

Name: LLM_PROVIDER
Value: google
```

### Step 5: Add Environment Variables to Vercel Projects

**For both Frontend and Backend projects:**

1. Go to Project Settings → Environment Variables
2. Add:

```
GOOGLE_API_KEY = your_google_api_key_here
ANTHROPIC_API_KEY = your_anthropic_api_key_here (optional)
LLM_PROVIDER = google
NODE_ENV = production
```

3. Click "Save"
4. **Redeploy** both projects (click the redeploy button)

### Step 6: Push to GitHub and Deploy!

```bash
cd your-resume-builder-directory
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

**That's it!** 🎉

Watch your GitHub Actions workflow:
1. Go to your repo → Actions tab
2. See your deployment running
3. Once complete, you'll have live URLs for:
   - **Frontend**: `https://resume-builder-frontend-xxx.vercel.app`
   - **Backend**: `https://resume-builder-backend-xxx.vercel.app`

## 🔄 How It Works

```
You push code to GitHub
        ↓
GitHub Actions triggers automatically
        ↓
Tests run & code builds
        ↓
Frontend deploys to Vercel
        ↓
Backend deploys to Vercel
        ↓
Your app is LIVE! 🎉
```

**Every single push** = automatic production deployment

## 📂 File Structure

```
resume-builder/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← Automatic deployment workflow
├── client/
│   └── vercel.json             ← Frontend Vercel config
├── server/
│   └── vercel.json             ← Backend Vercel config
└── ...
```

## 🔗 Access Your Production App

Once deployed:
- **Frontend**: `https://resume-builder-frontend-xxx.vercel.app`
- **Backend API**: `https://resume-builder-backend-xxx.vercel.app/api`

## 🚨 Troubleshooting

### "Build Failed"
1. Check GitHub Actions logs
2. Ensure `package.json` has correct build script
3. Verify environment variables are set in Vercel

### "404 on Frontend"
1. Check Vercel project settings
2. Ensure build output directory is `client/dist`
3. Redeploy the frontend project

### "API Not Responding"
1. Check backend environment variables
2. Verify `GOOGLE_API_KEY` or `ANTHROPIC_API_KEY` is set
3. Check Vercel backend project logs

### "Deploy Failed"
1. Click "Redeploy" in Vercel
2. Check deployment logs for specific errors
3. Ensure all secrets are added correctly

## 🎯 Next Steps

1. ✅ Create Vercel account
2. ✅ Create 2 projects (frontend + backend)
3. ✅ Add GitHub secrets
4. ✅ Add environment variables to Vercel
5. ✅ Push code to GitHub
6. ✅ Watch automatic deployment happen!

## 📚 Support

- **Vercel Docs**: https://vercel.com/docs
- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **Environment Variables**: Check Vercel project settings

---

**Status**: ✅ Ready for Production Deployment
**Last Updated**: November 28, 2026
