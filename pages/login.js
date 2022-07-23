import { useEffect, useState } from 'react'
import { useUser } from '../hooks/auth'
import { supabase } from '../lib/supabase'

import Logo from '../components/common/logo'
import LoginForm from '../components/forms/login-form'
import Error from '../components/common/error'
import { useRouter } from 'next/router'

export default function Login () {
  const { user } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState('')

  const handleLogin = async (data) => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signIn(data)
      if (error) throw error
      if (data.email) {
        setMessage('Email sent, check your inbox')
      } else {
        setMessage('')
      }
    } catch (error) {
      setError(`${error}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) router.push({ pathname: '/' })
  }, [user])

  return !user
    ? (
    <div id="login-view" className="h-full flex flex-col items-center justify-center gap-8 px-8">
      <Logo className="text-3xl h-8" />
      <LoginForm
        className="w-full max-w-sm"
        initialData={{}}
        onSubmit={handleLogin}
        isLoading={loading} />
      <Error
        className="w-full max-w-sm items-start shadow-lg rounded-lg"
        error={error} />
      {!error && message
        ? <div className="alert alert-success shadow-lg w-full max-w-sm">
            <div>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
              <span>{message}</span>
            </div>
          </div>
        : null
      }
    </div>
      )
    : null
}
