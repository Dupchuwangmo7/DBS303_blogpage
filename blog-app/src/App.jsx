import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChange } from './utils/auth'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Notes from './pages/Notes'
import Posts from './pages/Posts'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChange((event, session) => {
      setUser(session?.user || null)
      setLoading(false)
    })

    return () => {
      unsubscribe?.data?.subscription?.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Navbar 
        user={user} 
        onLogout={() => setUser(null)} 
      />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login onLoginSuccess={setUser} />} />
        <Route path="/signup" element={<Signup onSignupSuccess={setUser} />} />
        <Route path="/notes" element={<Notes user={user} />} />
        <Route path="/posts" element={<Posts user={user} />} />
      </Routes>
    </Router>
  )
}

export default App
