"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface AdminContextType {
  isAdmin: boolean
  login: (password: string) => Promise<boolean>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check session on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check', { credentials: 'include' })
      const data = await res.json()
      if (data.authenticated) {
        setIsAdmin(true)
        setIsAuthenticated(true)
      }
    } catch {
      setIsAdmin(false)
      setIsAuthenticated(false)
    }
  }

  const login = async (password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password }),
      })
      
      if (res.ok) {
        setIsAdmin(true)
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch {
      return false
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch {
      // Ignore errors
    }
    setIsAdmin(false)
    setIsAuthenticated(false)
  }

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, isAuthenticated }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}

