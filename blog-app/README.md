# Personal Vlog & Notes App

A modern, secure platform to create and manage your personal vlog posts and private notes. Built with React, Tailwind CSS, and powered by Supabase.

## 🎯 Features

- **Personal Vlog Platform** - Create and publish vlog posts with text, images, and embedded YouTube videos
- **Private Notes** - Keep personal notes and thoughts completely private
- **Secure Authentication** - User authentication with email and password
- **Role-Based Access** - Admin can create posts, other users can view
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Database** - All data stored securely in Supabase PostgreSQL
- **Row Level Security** - Database-level protection ensures data privacy

## 🚀 Getting Started


### Installation

1. **Clone the repository**
   ```bash
   git clone "repo"
   cd blog-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Get your Supabase credentials from your project dashboard
   - Add your credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Set up database schema**
   - Go to your Supabase SQL Editor
   - Copy all code from `supabase/schema.sql`
   - Paste and run in Supabase
   - This creates all tables and security policies

5. **Start development server**
   ```bash
   npm run dev
   ```
   App opens at `http://localhost:3000`

## 📝 How to Use

### Creating an Account
1. Click **"Create Account"**
2. Enter name, email, and password
3. Verify your email (check inbox for verification link)
4. Login with your credentials

### Viewing Posts
- All posts are visible to logged-in users
- Click **"Vlog Posts"** in navigation to see all posts
- View post details, timestamps, images, and embedded videos

### Creating Posts (Admin Only)
1. Login as admin
2. Go to **"Vlog Posts"**
3. Click **"New Post"** button
4. Fill in:
   - **Title** - Post headline
   - **Content** - Your vlog description or story
   - **Image URL** (optional) - Post thumbnail
   - **YouTube URL** (optional) - Embedded video link
5. Click **"Publish Post"**

### Managing Personal Notes
1. Login to your account
2. Go to **"My Notes"**
3. Create, view, and delete your private notes
4. Only you can see your notes

## 🔐 Security

- **Database-level security** via Row Level Security (RLS) policies
- **Private notes** - Only visible to the owner
- **Admin-controlled posts** - Only admin can create/edit/delete
- **Secure authentication** - Passwords encrypted with bcrypt
- **Environment variables** - Sensitive keys never committed to git

## 🛠️ Tech Stack

- **Frontend:** React 18.2, Vite 4.4, React Router 6.15
- **Styling:** Tailwind CSS 3.3
- **Backend/Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Client Library:** @supabase/supabase-js 2.38

## 📱 Responsive Design

The app is fully responsive across all devices:
- Desktop (1920px and above)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

Mobile features include:
- Hamburger navigation menu
- Touch-friendly buttons
- Optimized images and forms



## 📂 Project Structure

```
blog-app/
├── src/
│   ├── components/        # Reusable components
│   │   └── Navbar.jsx
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Notes.jsx
│   │   └── Posts.jsx
│   ├── utils/            # Helper functions
│   │   ├── auth.js
│   │   ├── notes.js
│   │   └── posts.js
│   ├── lib/              # External service integration
│   │   └── supabase.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles
├── supabase/
│   └── schema.sql        # Database setup
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html
```

## 🔄 Workflow

### For Admin (Content Creator)
1. Login to your admin account
2. Navigate to Vlog Posts
3. Click "New Post"
4. Add content with images and videos
5. Publish for viewers to see
6. Edit or delete posts as needed

### For Regular Users (Viewers)
1. Create an account
2. Login
3. View all vlog posts and content
4. Create and manage personal notes
5. Cannot create public posts (admin-only feature)

## 🎓 Project Purpose

Built as a DBS303 database project to demonstrate:
- Database design with PostgreSQL
- Row Level Security (RLS) for data protection
- Role-based access control
- Secure API integration
- Full-stack web application architecture

## 📞 Support

For issues or questions, check:
- Supabase Documentation: [docs.supabase.com](https://docs.supabase.com)
- React Documentation: [react.dev](https://react.dev)
- Vite Documentation: [vitejs.dev](https://vitejs.dev)




