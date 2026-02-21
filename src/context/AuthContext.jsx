import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser, setCurrentUser as persistUser, clearCurrentUser as clearPersisted } from '../lib/storage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(null)

  useEffect(() => {
    setUserState(getCurrentUser())
  }, [])

  const setUser = (u) => {
    setUserState(u)
    if (u) persistUser(u)
    else clearPersisted()
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
