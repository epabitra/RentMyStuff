import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getUsers, setUsers, CAMPUS_OPTIONS, createId } from '../lib/storage'

export default function Login() {
  const { setUser } = useAuth()
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [campus, setCampus] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage('')
    const users = getUsers()
    const existing = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())

    if (isSignUp) {
      if (existing) {
        setMessage('An account with this email already exists. Log in instead.')
        return
      }
      if (!name.trim() || !email.trim() || !campus) {
        setMessage('Please fill in name, email, and campus.')
        return
      }
      const newUser = {
        id: createId(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        campus,
        avatar: null,
      }
      setUsers([...users, newUser])
      setUser(newUser)
      navigate('/')
      return
    }

    if (!existing) {
      setMessage('No account found with this email. Sign up instead.')
      return
    }
    setUser(existing)
    navigate('/')
  }

  return (
    <div className="container-narrow py-12 md:py-16">
      <h1 className="heading-2 mb-2">
        {isSignUp ? 'Create account' : 'Log in'}
      </h1>
      <p className="body-lg mb-8">
        {isSignUp
          ? 'Join RentMyStuff with your campus email.'
          : 'Use the email you signed up with.'}
      </p>

      <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-5 animate-fade-in-up">
        {isSignUp && (
          <div>
            <label className="block text-sm font-medium text-ink-primary mb-1.5">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="input-field"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-ink-primary mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@campus.edu"
            className="input-field"
            required
          />
        </div>
        {isSignUp && (
          <div>
            <label className="block text-sm font-medium text-ink-primary mb-1.5">Campus</label>
            <select
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
              className="input-field"
            >
              <option value="">Select campus</option>
              {CAMPUS_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        )}
        {message && <p className="text-sm text-amber-700 font-medium">{message}</p>}
        <button type="submit" className="btn-primary w-full">
          {isSignUp ? 'Sign up' : 'Log in'}
        </button>
      </form>

      <p className="text-center text-ink-secondary mt-8 text-sm">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          type="button"
          onClick={() => { setIsSignUp(!isSignUp); setMessage(''); }}
          className="text-primary-600 font-semibold hover:underline"
        >
          {isSignUp ? 'Log in' : 'Sign up'}
        </button>
      </p>
    </div>
  )
}
