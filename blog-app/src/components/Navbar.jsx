import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from '../utils/auth'

export default function Navbar({ user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    const { error } = await signOut()
    if (!error) {
      onLogout()
      navigate('/')
    }
  }

  return (
    <nav className="sticky top-0 bg-white shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          📝 Dupchu's Blog
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/" className="text-primary hover:text-secondary transition">
            Home
          </Link>
          {user && (
            <Link to="/notes" className="text-primary hover:text-secondary transition">
              My Notes
            </Link>
          )}
          <Link to="/posts" className="text-primary hover:text-secondary transition">
            View Posts
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-secondary">{user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn-primary"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-3">
          <Link to="/" className="text-primary hover:text-secondary transition" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          {user && (
            <Link to="/notes" className="text-primary hover:text-secondary transition" onClick={() => setMobileMenuOpen(false)}>
              My Notes
            </Link>
          )}
          <Link to="/posts" className="text-primary hover:text-secondary transition" onClick={() => setMobileMenuOpen(false)}>
            View Posts
          </Link>

          {user ? (
            <button
              onClick={() => {
                handleLogout()
                setMobileMenuOpen(false)
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-gray-100 transition text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn-primary text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
