import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getUsers, setUsers, CAMPUS_OPTIONS } from '../lib/storage'

export default function Profile() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState(user?.name || '')
  const [campus, setCampus] = useState(user?.campus || '')
  const [saved, setSaved] = useState(false)

  if (!user) {
    navigate('/login')
    return null
  }

  const handleSave = (e) => {
    e.preventDefault()
    const users = getUsers()
    const updated = users.map((u) =>
      u.id === user.id ? { ...u, name: name.trim(), campus } : u
    )
    setUsers(updated)
    setUser({ ...user, name: name.trim(), campus })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="container-narrow py-8 md:py-12">
      <h1 className="heading-2 mb-2">Profile</h1>
      <p className="body-lg mb-8">Manage your account details.</p>
      <div className="card p-6 md:p-8 animate-fade-in-up">
        <p className="text-ink-tertiary text-xs font-medium uppercase tracking-wider mb-1">Email</p>
        <p className="font-medium text-ink-primary mb-6">{user.email}</p>
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-ink-primary mb-1.5">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-primary mb-1.5">Campus</label>
            <select value={campus} onChange={(e) => setCampus(e.target.value)} className="input-field">
              {CAMPUS_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-primary">
            Save changes
          </button>
          {saved && <p className="text-primary-600 text-sm font-medium">Profile updated.</p>}
        </form>
      </div>
    </div>
  )
}
