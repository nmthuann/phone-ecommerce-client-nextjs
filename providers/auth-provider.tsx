'use client'
import { User } from '@/types/users.type'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

interface AuthContextProps {
  user: User | null
  setUserCallback: (user: User | null) => void
  isAuthenticated: boolean
  handleLogout: () => void
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUserCallback: () => {},
  isAuthenticated: false,
  handleLogout: () => {}
})

export const useAuthContext = () => useContext(AuthContext)

export default function AuthProvider({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [user, setUser] = useState<User | null>(null)

  const setUserCallback = useCallback((user: User | null) => {
    setUser(user)
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [])

  const handleLogout = useCallback(() => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
  }, [])

  // Memoize the value to prevent re-renders
  const value = useMemo(
    () => ({
      user,
      setUserCallback,
      isAuthenticated: !!user,
      handleLogout
    }),
    [user, setUserCallback, handleLogout] // Dependencies
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
