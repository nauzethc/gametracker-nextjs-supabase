import { useForm } from '../../hooks/form'

const defaults = {
  email: ''
}

export default function LoginForm ({
  className = '',
  initialData = {},
  onSubmit,
  isLoading,
  error
}) {
  const { data, onChange } = useForm({ defaults, initialData })
  const handleSubmit = e => {
    e.preventDefault()
    if (typeof onSubmit === 'function' && data.email) {
      const { email } = data
      onSubmit({ email })
    }
  }

  const handleProvider = e => {
    e.preventDefault()
    const provider = e.target.value
    if (provider) {
      onSubmit({ provider })
    }
  }

  return (
    <form className={`login-form grid gap-4 ${className}`} onSubmit={handleSubmit}>
      <div className="form-control">
        <input type="email" className="input"
          name="email"
          placeholder="user@domain.com"
          value={data.email}
          onChange={onChange}
          required />
      </div>
      {!isLoading
        ? <button type="submit" className="btn btn-secondary gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" /></svg>
            <span>Send magic link</span>
          </button>
        : <button type="submit" className="btn btn-secondary gap-2 loading">
            <span>Loading</span>
          </button>
      }
      <div className="divider">
        or
      </div>
      <button onClick={handleProvider} className="btn bg-black text-white gap-2" value="github">
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        <span>Sign in with Github</span>
      </button>
    </form>
  )
}
