import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export const AuthContext = React.createContext()

export function AuthProvider ({ children }) {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setUser(supabase.auth.user())
    setLoading(false)

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = supabase.auth.user()
        setUser(user)
        setLoading(false)
        await fetch('/api/auth', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event, session })
        })
      }
    )
    return () => (listener && listener.unsubscribe())
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
