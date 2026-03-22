# Project Structure & File Guide

## 📁 Complete Directory Tree

```
blog-app/
├── src/
│   ├── components/
│   │   └── Navbar.jsx                    # Navigation with user menu
│   │
│   ├── pages/
│   │   ├── Home.jsx                      # Landing page with features
│   │   ├── Login.jsx                     # Email/password login
│   │   ├── Signup.jsx                    # Email/password registration
│   │   ├── Notes.jsx                     # Personal notes CRUD
│   │   └── Posts.jsx                     # Blog posts management
│   │
│   ├── lib/
│   │   └── supabase.js                   # Supabase client setup
│   │
│   ├── utils/
│   │   ├── auth.js                       # Auth functions (signup/login/logout)
│   │   ├── notes.js                      # Notes API functions
│   │   └── posts.js                      # Posts API functions
│   │
│   ├── App.jsx                           # Main app with routing
│   ├── main.jsx                          # React entry point
│   └── index.css                         # Tailwind & custom styles
│
├── supabase/
│   ├── migrations/                       # (Optional) Schema versions
│   └── schema.sql                        # Database schema + RLS policies
│
├── index.html                            # HTML template
├── vite.config.js                        # Vite configuration
├── tailwind.config.js                    # Tailwind CSS configuration
├── postcss.config.js                     # PostCSS configuration
├── package.json                          # Dependencies & scripts
├── .env.example                          # Environment template
├── .gitignore                            # Git ignore rules
│
├── README.md                             # Main documentation
├── SETUP.md                              # Step-by-step setup guide
├── QUICK_START.md                        # Quick reference
├── ARCHITECTURE.md                       # System design & overview
└── PROJECT_SUMMARY.md                    # This file
```

## 📄 File Descriptions

### Core Application

#### `src/App.jsx`
Main application component. Contains:
- React Router setup
- Route definitions
- Auth state management with Supabase
- User session persistence

#### `src/main.jsx`
Entry point for the React app. Renders App component to `#root` div.

#### `src/index.css`
Global styles including:
- Tailwind directives
- Custom utilities (btn-primary, input-field, card)
- Scrollbar styling

---

### Components

#### `src/components/Navbar.jsx`
Navigation bar with:
- Logo and branding
- Desktop and mobile menus
- Auth-dependent links
- User email display
- Logout button

---

### Pages

#### `src/pages/Home.jsx`
Landing page with:
- Hero section
- Feature cards
- Call-to-action buttons
- Responsive layout

#### `src/pages/Login.jsx`
Login page with:
- Email and password fields
- Error handling
- Loading state
- Sign up link

#### `src/pages/Signup.jsx`
Registration page with:
- Name, email, password fields
- Email verification message
- Form validation
- Links to login

#### `src/pages/Notes.jsx`
Personal notes dashboard with:
- Create note form
- Notes grid display
- Edit capability
- Delete functionality
- RLS verification (private to user)

#### `src/pages/Posts.jsx`
Blog posts page with:
- Create post form (auth-protected)
- Posts list with metadata
- Image display
- YouTube embed support
- Delete (own posts only)

---

### Library & Utilities

#### `src/lib/supabase.js`
Supabase client initialization:
- Loads environment variables
- Creates Supabase client instance
- Handles connection errors

#### `src/utils/auth.js`
Authentication utilities:
- `signUp(email, password, name)` - Create account
- `signIn(email, password)` - Login
- `signOut()` - Logout
- `getCurrentUser()` - Get current user
- `onAuthStateChange(callback)` - Auth listener

#### `src/utils/notes.js`
Notes database operations:
- `getNotes(userId)` - Fetch all user notes
- `createNote(userId, title, content)` - Add note
- `updateNote(noteId, title, content)` - Edit note
- `deleteNote(noteId)` - Remove note

#### `src/utils/posts.js`
Posts database operations:
- `getPosts()` - Get all posts (public)
- `createPost(userId, title, content, imageUrl, videoUrl)` - Publish post
- `updatePost(postId, ...)` - Edit post
- `deletePost(postId)` - Remove post

---

### Configuration Files

#### `vite.config.js`
Vite build configuration:
- React plugin
- Dev server on port 3000
- Auto-open browser

#### `tailwind.config.js`
Tailwind CSS setup:
- Color theme customization
- Content paths for purging
- Extension configuration

#### `postcss.config.js`
PostCSS configuration:
- Tailwind plugin
- Autoprefixer plugin

#### `package.json`
Project metadata:
- Dependencies (React, Supabase, Tailwind)
- Scripts (dev, build, preview)
- Project info

#### `.env.example`
Template for environment variables:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

Copy to `.env` and fill in your Supabase credentials.

#### `.gitignore`
Git ignore patterns:
- node_modules/
- .env files
- Build artifacts
- OS files

---

### Database

#### `supabase/schema.sql`
Complete database setup including:

**Tables**:
- `notes` - User's personal notes (private)
- `posts` - Public blog posts

**Indexes**:
- user_id indexes (for filtering)
- created_at indexes (for sorting)

**Row Level Security**:
- Notes: Only user can view/edit their own
- Posts: Anyone can view, users can edit their own

---

### Documentation

#### `README.md` (Main Documentation)
- Feature overview
- Tech stack explanation
- Project structure
- Database schema details
- Deployment instructions
- Security notes
- Learning resources

#### `SETUP.md` (Step-by-Step Guide)
1. Create Supabase project
2. Set up database
3. Clone and install
4. Configure environment
5. Start development
6. Test features
7. Deploy to production
- Troubleshooting section
- Complete checklist

#### `QUICK_START.md` (Quick Reference)
- 5-minute quickstart
- Key files table
- Common tasks
- API functions reference
- Build & deploy commands
- Troubleshooting matrix
- Links & resources

#### `ARCHITECTURE.md` (System Design)
- Architecture diagram
- Data flow explanations
- Security layers
- Dependencies list
- Component hierarchy
- API routes
- State management
- Performance optimizations
- Technology choices

---

## 🔑 Key File Relationships

```
App.jsx (Routes)
├── Navbar.jsx
│   └── Uses: auth.js functions
│
├── Home.jsx
│   └── Static content
│
├── Login.jsx
│   └── Uses: auth.js (signIn)
│
├── Signup.jsx
│   └── Uses: auth.js (signUp)
│
├── Notes.jsx
│   └── Uses: notes.js (CRUD operations)
│
└── Posts.jsx
    └── Uses: posts.js (CRUD operations)

supabase.js (Client)
├── lib/supabase.js (initialization)
└── All utils functions use this client

schema.sql (Database)
├── Creates: notes, posts tables
├── Adds: RLS policies
└── Indexes for performance
```

## 🎯 Quick File Lookup

**Want to...**

| Task | File |
|------|------|
| Change colors | `tailwind.config.js` |
| Add a route | `src/App.jsx` |
| Add navbar link | `src/components/Navbar.jsx` |
| Modify signup | `src/pages/Signup.jsx` |
| Add note fields | `supabase/schema.sql` + `src/utils/notes.js` |
| Change post layout | `src/pages/Posts.jsx` |
| Add new table | `supabase/schema.sql` + create util file |
| Change API URL | `.env` file |
| Configure build | `vite.config.js` |
| Update styling | `src/index.css` |

## 📊 Lines of Code

| File | Lines | Purpose |
|------|-------|---------|
| schema.sql | 71 | Database setup |
| App.jsx | 45 | Routing & auth |
| Home.jsx | 82 | Landing page |
| Posts.jsx | 156 | Blog management |
| Notes.jsx | 125 | Notes management |
| posts.js | 56 | Posts API |
| notes.js | 58 | Notes API |
| auth.js | 56 | Auth functions |
| Navbar.jsx | 98 | Navigation |
| index.css | 42 | Styles |
| **Total** | **~800** | **Full app** |

A complete, production-ready app in ~800 lines of code! 🚀

---

## 🚀 Next Steps

1. **Read**: Start with README.md
2. **Setup**: Follow SETUP.md
3. **Understand**: Review ARCHITECTURE.md
4. **Code**: Browse src/ files
5. **Modify**: Add your own features
6. **Deploy**: Use SETUP.md deployment section

---

## 📞 File Update Guide

When making changes, update related files:

| Change | Files to Update |
|--------|-----------------|
| Add database column | schema.sql + utils/xxx.js |
| Add new page | App.jsx + Navbar.jsx + src/pages/ |
| Change colors | tailwind.config.js + index.css |
| Add feature | Create utils/xxx.js + page component + Add route |
| Deploy | SETUP.md with your URLs |

---

Enjoy building! 🎉
