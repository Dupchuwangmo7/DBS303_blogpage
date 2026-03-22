# Supabase Blog Application

A modern full-stack blog application using **Supabase** as the complete backend solution. No separate backend server needed!

## 🎯 Features

✅ **Authentication**: Supabase Auth with email/password signup and login  
✅ **Personal Notes**: Create, edit, and delete private notes (RLS protected)  
✅ **Blog Posts**: Create public posts with support for images and YouTube videos  
✅ **Row Level Security**: Users can only access their own notes  
✅ **Real-time**: Built with Supabase for scalability  
✅ **Responsive Design**: Mobile-friendly UI with Tailwind CSS  
✅ **Modern Stack**: React, Vite, Supabase, Tailwind CSS  

## 📁 Project Structure

```
blog-app/
├── src/
│   ├── components/
│   │   └── Navbar.jsx          # Navigation component
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── Login.jsx           # Login page
│   │   ├── Signup.jsx          # Signup page
│   │   ├── Notes.jsx           # Notes management
│   │   └── Posts.jsx           # Blog posts
│   ├── lib/
│   │   └── supabase.js         # Supabase client initialization
│   ├── utils/
│   │   ├── auth.js             # Auth utilities
│   │   ├── notes.js            # Notes API functions
│   │   └── posts.js            # Posts API functions
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx                # Entry point
│   └── index.css               # Tailwind styles
├── supabase/
│   └── schema.sql              # Database schema & RLS policies
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
├── .env.example
└── README.md
```

## 🚀 Quick Start

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or login
3. Click "New Project"
4. Fill in project details:
   - Name: `blog-app`
   - Database Password: Create a strong password (save this!)
   - Region: Choose closest to you
5. Click "Create new project" and wait 2-3 minutes

### 2. Set Up Database Tables

1. Go to your Supabase project dashboard
2. Click "SQL Editor" in the left sidebar
3. Click "New query"
4. Copy and paste the entire contents of `supabase/schema.sql`
5. Click "Run"
6. Verify tables are created: Check "Tables" in left sidebar

### 3. Get API Keys

1. Go to "Settings" → "API"
2. Copy these values:
   - **Project URL** (Project URL)
   - **Anon Public Key** (anon key)

### 4. Set Up Frontend

```bash
cd blog-app

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your Supabase credentials
# Edit .env:
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Start Development Server

```bash
npm run dev
```

App runs on `http://localhost:3000`

## 🔐 Database Schema

### Notes Table
```
id (bigint) - Primary key
user_id (UUID) - References auth.users
title (text) - Note title
content (text) - Note content
created_at (timestamp) - Creation date
updated_at (timestamp) - Last update
```

**RLS Policies**:
- Users can view/create/edit/delete only their own notes

### Posts Table
```
id (bigint) - Primary key
user_id (UUID) - References auth.users
title (text) - Post title
content (text) - Post content
image_url (text) - Featured image URL (optional)
video_url (text) - YouTube video URL (optional)
created_at (timestamp) - Creation date
updated_at (timestamp) - Last update
```

**RLS Policies**:
- Anyone can view posts
- Only authenticated users can create posts
- Users can only edit/delete their own posts

## 🔐 Authentication Flow

1. User signs up with email and password
2. Supabase Auth creates user account
3. JWT token stored automatically by Supabase
4. User logged in and redirected to home
5. Session persists across page reloads
6. Logout clears session

## 📚 Key Files Explained

### `src/lib/supabase.js`
Initializes the Supabase client with your credentials.

### `src/utils/auth.js`
Exports auth functions:
- `signUp()` - Create new account
- `signIn()` - Login
- `signOut()` - Logout
- `getCurrentUser()` - Get current user
- `onAuthStateChange()` - Listen to auth changes

### `src/utils/notes.js`
Exports notes CRUD functions:
- `getNotes()` - Fetch user's notes
- `createNote()` - Create new note
- `updateNote()` - Edit note
- `deleteNote()` - Delete note

### `src/utils/posts.js`
Exports posts CRUD functions:
- `getPosts()` - Fetch all posts
- `createPost()` - Create new post
- `updatePost()` - Edit post
- `deletePost()` - Delete post

## 🌍 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your git repository
5. Add environment variables:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
6. Click "Deploy"

### Deploy to Netlify

1. Run build: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Select "Sites" → "Add new site"
4. Select your repository
5. Set build command: `npm run build`
6. Set publish directory: `dist`
7. Add environment variables (same as above)
8. Deploy

## 🛠️ Useful Supabase Links

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

## 📝 Environment Variables

```
VITE_SUPABASE_URL      - Your Supabase project URL
VITE_SUPABASE_ANON_KEY - Your Supabase anonymous key
```

Found in: Supabase Dashboard → Settings → API

## 🚨 Important Security Notes

1. **Anon Key is Safe**: The anon key is meant to be public - it's limited by RLS
2. **Never Share Service Key**: Keep service_role_key secret
3. **RLS Protects Data**: Row Level Security prevents unauthorized access
4. **Secure Passwords**: Supabase uses bcrypt for password hashing

## 💡 How RLS Works

With Row Level Security enabled:

```javascript
// User sees only their own notes
SELECT * FROM notes WHERE user_id = [current_user_id]

// User can only insert notes for themselves
INSERT INTO notes (user_id, ...) VALUES ([current_user_id], ...)

// User can only update their own notes
UPDATE notes SET ... WHERE user_id = [current_user_id]
```

The policies are enforced at the database level, not the application level!

## 🧪 Testing

### Test Sign Up
1. Visit `http://localhost:3000/signup`
2. Enter: Name, valid email, password (6+ chars)
3. Check Supabase Auth Users table

### Test Notes
1. Log in
2. Go to "My Notes"
3. Create/edit/delete notes
4. RLS ensures you only see your notes

### Test Posts
1. Visit Posts page (no login needed)
2. See all posts
3. To create, you must be logged in
4. Only your posts show delete button

## 📖 Further Learning

- React: https://react.dev
- Supabase: https://supabase.com/docs
- Tailwind CSS: https://tailwindcss.com
- Vite: https://vitejs.dev

## 🤝 Contributing

Feel free to fork and improve this project!

## 📄 License

MIT License

---

Built with ❤️ using Supabase, React, and Vite
