import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signUp } from '../utils/auth'

export default function Signup({ onSignupSuccess }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error: authError } = await signUp(email, password, name)
    
    if (authError) {
      setError(authError)
      setLoading(false)
      return
    }

    if (data.user) {
      setError('Account created! Please check your email to verify your account.')
      // Auto-redirect after showing message
      setTimeout(() => navigate('/login'), 3000)
    }
  }

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md card p-8">
        <h2 className="text-3xl font-bold text-primary text-center mb-8">Create Account</h2>

        {error && (
          <div className={`px-4 py-3 rounded mb-6 ${error.includes('created') ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
              required
            />
            <p className="text-xs text-secondary mt-2">
              Password should be at least 6 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-secondary mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
