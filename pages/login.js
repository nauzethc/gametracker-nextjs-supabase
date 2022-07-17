import { useState } from 'react'
import { useUser } from '../hooks/auth'
import { supabase } from '../lib/supabase'

import LoginForm from '../components/forms/login-form'
import Error from '../components/common/error'

export default function Login () {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async ({ email }) => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="login-view" className="flex-grow flex flex-col justify-center items-center gap-8 bg-primary text-primary-content">
      <div className="flex items-center text-3xl">
        <span className="font-light">Game</span>
        <span className="font-bold">Tracker</span>
      </div>
      {user
        ? <div className="flex flex-col justify-center p-4 w-full max-w-xs gap-4">
            <span className="text-center">You are already logged as <span className="font-bold">{user.email}</span></span>
            <button className={`btn btn-secondary ${loading ? 'loading' : ''}`}
              onClick={handleLogout}>
              Logout
            </button>
          </div>
        : <LoginForm
            className="w-full max-w-xs bg-base-200 p-4 rounded-xl"
            onSubmit={handleLogin}
            isLoading={loading} />
      }
      <Error
        className="w-full max-w-xs items-start shadow-lg"
        error={error && error.message} />
    </div>
  )
}
