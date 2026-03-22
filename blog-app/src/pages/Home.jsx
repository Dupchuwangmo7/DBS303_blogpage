import React from 'react'
import { Link } from 'react-router-dom'

export default function Home({ user }) {
  return (
    <div className="min-h-[calc(100vh-100px)] bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Welcome to Dupchu's Blog
          </h1>
          <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
            A place for personal vlog posts and private notes. All content is secure and private.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/posts"
              className="btn-primary"
            >
              View Posts
            </Link>
            {!user && (
              <Link
                to="/signup"
                className="btn-secondary"
              >
                Create Account
              </Link>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 my-16">
          <div className="card p-8">
            <div className="text-4xl mb-4">✍️</div>
            <h3 className="text-xl font-bold text-primary mb-3">Create Vlog Posts</h3>
            <p className="text-secondary">
              Share vlog posts with rich media support. Add images, embed YouTube videos, and tell your story.
            </p>
          </div>

          <div className="card p-8">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-primary mb-3">Personal Notes</h3>
            <p className="text-secondary">
              Keep track of your ideas, thoughts, and reminders in a private notes section just for you.
            </p>
          </div>

          <div className="card p-8">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-xl font-bold text-primary mb-3">Secure & Private</h3>
            <p className="text-secondary">
              My data is secure with Supabase authentication and Row Level Security protecting your content.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        {!user && (
          <div className="bg-primary text-white p-12 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Join Dupchu's Community</h2>
            <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
              Create your account to view posts.
            </p>
            <Link
              to="/signup"
              className="inline-block bg-white text-primary px-8 py-3 rounded-lg hover:bg-gray-100 transition font-semibold"
            >
              Get Started Now
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
