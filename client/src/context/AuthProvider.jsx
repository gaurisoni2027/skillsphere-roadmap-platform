import { useCallback, useMemo, useState } from 'react'
import {
  clearSessionStorage,
  readSession,
  readUsers,
  writeSession,
  writeUsers,
} from '../lib/demoAuthStorage'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readSession())

  const login = useCallback((email, password) => {
    const trimmed = email.trim().toLowerCase()
    const users = readUsers()
    const found = users.find((u) => u.email.toLowerCase() === trimmed)
    if (!found || found.password !== password) {
      return { ok: false, message: 'Invalid email or password.' }
    }
    const profile = { email: found.email, name: found.name }
    writeSession(profile)
    setUser(profile)
    return { ok: true }
  }, [])

  const signup = useCallback((name, email, password) => {
    const trimmedEmail = email.trim().toLowerCase()
    const users = readUsers()
    if (users.some((u) => u.email.toLowerCase() === trimmedEmail)) {
      return { ok: false, message: 'An account with this email already exists.' }
    }
    const record = { email: email.trim(), name: name.trim(), password }
    writeUsers([...users, record])
    const profile = { email: record.email, name: record.name }
    writeSession(profile)
    setUser(profile)
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    clearSessionStorage()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      login,
      signup,
      logout,
      isAuthenticated: Boolean(user),
    }),
    [user, login, signup, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
