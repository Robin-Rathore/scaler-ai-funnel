# 🚀 Deployment Guide

## Why GitHub Pages Doesn't Work

Your application uses **Next.js API routes** for:
- AI-powered career recommendations (`/api/generate-recommendations`)
- Personalized insights generation (`/api/generate-insights`)
- Learning path generation (`/api/generate-learning-path`)
- Email confirmation system (`/api/send-confirmation`)

**GitHub Pages only supports static files** and cannot run server-side code or API routes.

## 🎯 Recommended Solution: Vercel

### Step 1: Prepare Your Repository
```bash
# Make sure your code is committed and pushed to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy to Vercel

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel (opens browser for authentication)
vercel login

# Deploy to production
vercel --prod
```

#### Option B: Vercel Dashboard (Easiest)
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Next.js project
5. Click "Deploy"

### Step 3: Configure Environment Variables

In your Vercel dashboard:
1. Go to your project → Settings → Environment Variables
2. Add the following variables:

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_actual_openai_api_key_here

# Email Configuration (Optional - for email functionality)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM="Scaler Career Team <career@scaler.com>"
```

### Step 4: Automatic Deployments

Once connected to Vercel:
- Every push to your `main` branch will trigger automatic deployment
- Preview deployments are created for pull requests
- You can rollback to previous deployments instantly

## 🌐 Alternative Platforms

### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=out
```

### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

## 🔧 Troubleshooting

### Common Issues

1. **Build Errors**
   - Check that all TypeScript errors are resolved
   - Ensure all dependencies are in `package.json`

2. **Environment Variables**
   - Make sure they're added in Vercel dashboard
   - Check that variable names match exactly

3. **API Routes Not Working**
   - Verify you're not on GitHub Pages
   - Check Vercel function logs for errors

### Debug Commands
```bash
# Local build test
npm run build

# TypeScript check
npx tsc --noEmit

# Lint check
npm run lint
```

## 📊 Post-Deployment

### Verify Your Deployment
1. **Test all features**:
   - Career assessment flow
   - AI-generated reports
   - Consultation booking
   - Email confirmations

2. **Check performance**:
   - Use Vercel Analytics (free)
   - Monitor API response times

3. **Set up monitoring**:
   - Enable Vercel Analytics
   - Set up error tracking (optional)

## 🎉 Success!

Once deployed to Vercel, your application will:
- ✅ Run all API routes correctly
- ✅ Handle AI-powered features
- ✅ Send emails successfully
- ✅ Scale automatically
- ✅ Update on every push

Your live URL will be: `https://your-project-name.vercel.app`
