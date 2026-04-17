"use client";

import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sa_user')
        return saved ? JSON.parse(saved) : null
      } catch {
        return null
      }
    }
    return null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = useCallback(async (email, password, role) => {
    setLoading(true)
    setError(null)

    // Simulate API call – replace with real backend call
    await new Promise(resolve => setTimeout(resolve, 1200))

    // Mock validation
    const mockUsers = {
      'admin@smartattend.com':   { password: 'admin123',   role: 'admin',   name: 'Admin User' },
      'teacher@smartattend.com': { password: 'teacher123', role: 'teacher', name: 'Prof. Sharma' },
      'student@smartattend.com': { password: 'student123', role: 'student', name: 'Avinash K.' },
    }

    const found = mockUsers[email.toLowerCase()]
    if (!found || found.password !== password || found.role !== role) {
      setLoading(false)
      const err = 'Invalid email, password or role. Please try again.'
      setError(err)
      throw new Error(err)
    }

    const userData = { email, name: found.name, role: found.role, token: `mock-jwt-${Date.now()}` }
    localStorage.setItem('sa_user', JSON.stringify(userData))
    setUser(userData)
    setLoading(false)
    return userData
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('sa_user')
    setUser(null)
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
