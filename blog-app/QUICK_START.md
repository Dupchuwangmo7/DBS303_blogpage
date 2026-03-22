# Quick Reference Guide

## 🚀 Get Started in 5 Minutes

### 1. Supabase Setup
```
1. Go to supabase.com
2. Create new project
3. Go to SQL Editor → New Query
4. Copy & paste supabase/schema.sql
5. Click Run
6. Copy URL and Anon Key from Settings → API
```

### 2. Configure App
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

### 3. Start Coding
```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

## 📁 Key Files to Modify

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app routes |
| `src/pages/*.jsx` | Page components |
| `src/components/*.jsx` | Reusable components |
| `src/utils/*.js` | API functions |
| `supabase/schema.sql` | Database setup |
| `tailwind.config.js` | Styling config |
| `.env` | Environment variables |

---

## 🔧 Common Tasks

### Add a New Page
1. Create file in `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`:
   ```jsx
   <Route path="/newpage" element={<NewPage user={user} />} />
   ```
3. Add link in `src/components/Navbar.jsx`

### Add a New Database Table
1. Edit `supabase/schema.sql`
2. Run in Supabase SQL Editor
3. Update RLS policies
4. Create utility functions in `src/utils/`

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#your-color',
  secondary: '#your-color',
}
```

### Add Form Validation
Update `src/pages/Login.jsx`, `Signup.jsx`, or component files

---

## 🔌 API Functions

### Notes (in `src/utils/notes.js`)
```javascript
getNotes(userId)           // Get all notes
createNote(userId, title, content)
updateNote(noteId, title, content)
deleteNote(noteId)
```

### Posts (in `src/utils/posts.js`)
```javascript
getPosts()                 // Get all posts
createPost(userId, title, content, imageUrl, videoUrl)
updatePost(postId, title, content, imageUrl, videoUrl)
deletePost(postId)
```

### Auth (in `src/utils/auth.js`)
```javascript
signUp(email, password, name)
signIn(email, password)
signOut()
getCurrentUser()
onAuthStateChange(callback)
```

---

## 🚀 Build & Deploy

### Build for Production
```bash
npm run build
```
Creates optimized `dist/` folder.

### Deploy to Vercel
```bash
git push origin main
# Vercel auto-deploys
```

### Deploy to Netlify
```bash
npm run build
# Drag dist/ folder to Netlify
```

---

## 🔐 Environment Variables

```
VITE_SUPABASE_URL     - Your project URL
VITE_SUPABASE_ANON_KEY - Public anon key
```

Found at: Supabase Dashboard → Settings → API

---

## 📚 Useful Links

| Resource | Link |
|----------|------|
| Supabase Docs | https://supabase.com/docs |
| React Docs | https://react.dev |
| Tailwind CSS | https://tailwindcss.com |
| Vite Docs | https://vitejs.dev |
| Vercel Deploy | https://vercel.com/docs |

---

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| "Missing env variables" | Check .env file, restart server |
| "Cannot sign up" | Use new email, password 6+ chars |
| "Notes not saving" | Check RLS policies in Supabase |
| "App won't load" | Check browser console for errors (F12) |
| "Posts not visible" | Verify SELECT policy is enabled |

---

## 🎯 Next Steps

1. ✅ Setup Supabase
2. ✅ Configure .env
3. ✅ Run locally
4. ✅ Test features
5. ✅ Deploy to Vercel/Netlify
6. 🚀 Tell your friends!

Happy blogging! 📝
