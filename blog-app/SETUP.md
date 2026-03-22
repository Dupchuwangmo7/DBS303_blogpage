# Complete Setup Guide

Step-by-step instructions to set up and deploy your Supabase Blog App.

## ✅ Prerequisites

- Node.js 14+ installed
- npm or yarn
- GitHub account (for deployment)
- Supabase account (free at supabase.com)

## 🎯 Step 1: Create Supabase Project

### 1.1 Sign Up
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub or email

### 1.2 Create New Project
1. Click "New Project"
2. Enter project name: `blog-app`
3. Create a database password (save this!)
4. Select region closest to you
5. Click "Create new project"
6. Wait 2-3 minutes for setup

### 1.3 Save Your Credentials

Go to **Settings → API** and copy:
- **Project URL**: `https://xxxxx.supabase.co`  
- **Anon Public Key**: `eyJhbGc...`

You'll need these in Step 4.

## 🎯 Step 2: Set Up Database Schema

### 2.1 Open SQL Editor
1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New Query**

### 2.2 Run Schema SQL
1. Open the file: `supabase/schema.sql` in your text editor
2. Copy entire contents
3. Paste into Supabase SQL editor
4. Click **Run**
5. You should see: `executed successfully`

### 2.3 Verify Tables Created
1. Click **Tables** in left sidebar
2. You should see:
   - `notes` table
   - `posts` table

## 🎯 Step 3: Clone and Install Project

### 3.1 Navigate to Project
```bash
cd /Users/dupchuuw/Desktop/SEM_6/DBS303/blog-app
```

### 3.2 Install Dependencies
```bash
npm install
```

This installs:
- React
- Vite (build tool)
- Supabase client
- Tailwind CSS
- React Router

## 🎯 Step 4: Configure Environment

### 4.1 Create .env File
```bash
cp .env.example .env
```

### 4.2 Add Your Supabase Keys

Edit `.env` file with your credentials from Step 1.3:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

**⚠️ Important**: Never commit `.env` to Git!

## 🎯 Step 5: Start Development Server

```bash
npm run dev
```

Expected output:
```
  VITE v4.4.9  ready in 123 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

Open your browser to `http://localhost:3000`

## ✨ Step 6: Test the Application

### 6.1 Test Sign Up
1. Click "Sign Up"
2. Enter:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123`
3. Click "Sign Up"
4. You should see: Account created message
5. Redirect to login

### 6.2 Test Login
1. Enter email and password from 6.1
2. Click "Login"
3. You should be logged in and redirected to home

### 6.3 Test Notes
1. Click "My Notes" in navbar
2. Create a note:
   - Title: `First Note`
   - Content: `This is my first note`
3. Click "Save Note"
4. Note appears in the list
5. Click "Delete" to remove it

### 6.4 Test Posts
1. Click "Posts" in navbar
2. Click "New Post" (if logged in)
3. Fill in:
   - Title: `My First Post`
   - Content: `This is my first blog post`
   - Image URL: (optional)
   - YouTube URL: (optional)
4. Click "Publish Post"
5. Post appears in the feed
6. Anyone can see posts (no login needed)

### 6.5 Test RLS Security
1. Open another browser or incognito window
2. Go to `http://localhost:3000`
3. Try to create/view posts - works (posts are public)
4. Go to `/notes` without logging in - redirects to login
5. This proves RLS is working!

## 🚀 Step 7: Deploy to Production

### Option A: Deploy to Vercel (Recommended)

#### 7A.1 Push to GitHub
```bash
git init
git add .
git commit -m "Initial blog app"
git remote add origin https://github.com/YOUR_USERNAME/blog-app.git
git push -u origin main
```

#### 7A.2 Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your `blog-app` repository
4. Click "Import"
5. Under "Environment Variables", add:
   ```
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGc...
   ```
6. Click "Deploy"
7. Get your live URL: `https://blog-app-xxxxx.vercel.app`

### Option B: Deploy to Netlify

#### 7B.1 Build for Production
```bash
npm run build
```

Creates `dist/` folder with optimized build.

#### 7B.2 Deploy on Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist/` folder
3. Site is live immediately!

Or use Git:
1. Push to GitHub (steps 7A.1)
2. Go to Netlify
3. Click "New site from Git"
4. Select your repository
5. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables (same as Vercel)
7. Click "Deploy"

## 🔍 Troubleshooting

### "Missing environment variables"
**Problem**: Error in console about VITE_SUPABASE_URL

**Solution**:
1. Check `.env` file exists
2. Verify you copied keys correctly
3. Make sure keys don't have extra spaces
4. Restart dev server: `npm run dev`

### "Cannot sign up"
**Problem**: Signup fails with error

**Solution**:
1. Email might already exist - try different email
2. Password must be 6+ characters
3. Check Supabase Auth settings (should allow email signup by default)

### "Notes not saving"
**Problem**: Create note but nothing happens

**Solution**:
1. Check browser console (F12) for errors
2. Go to Supabase "Auth" tab - verify you're logged in
3. Check RLS policies are enabled in schema.sql
4. Make sure schema.sql was fully executed

### "Cannot see posts from other users"
**Problem**: Only see your own posts

**Solution**:
1. Check posts RLS policy allows SELECT
2. In Supabase, go to "Authentication" → "Policies"
3. Verify "Anyone can view posts" policy exists and is enabled

## 📋 Production Checklist

- [ ] GitHub repository created and code pushed
- [ ] Supabase project created
- [ ] Database schema (schema.sql) executed
- [ ] .env file configured with Supabase keys
- [ ] Local testing completed (signup, notes, posts)
- [ ] Built for production: `npm run build`
- [ ] Deployed to Vercel or Netlify
- [ ] Environment variables set on hosting platform
- [ ] Test production site
- [ ] Share with others!

## 🔐 Security Review

✅ **Anon Key is Public**: It's meant to be in `.env` (visible to users)  
✅ **RLS Protects Data**: Database-level security prevents unauthorized access  
✅ **Passwords Hashed**: Supabase uses bcrypt automatically  
✅ **HTTPS Enforced**: Vercel/Netlify provide free HTTPS  

**Never share**:
- Service role key
- Database password
- Your Supabase admin token

## 📞 Support

### If Something Breaks:
1. Check browser console (F12 → Console tab)
2. Check Supabase logs (Dashboard → API → Logs)
3. Verify schema.sql was fully executed
4. Verify .env variables are correct
5. Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Useful Links:
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Vercel Docs](https://vercel.com/docs)

## 🎉 You're Done!

Your blog is now live and ready to use. Start writing! 📝

---

Need help? Check the main [README.md](./README.md) for more details.
