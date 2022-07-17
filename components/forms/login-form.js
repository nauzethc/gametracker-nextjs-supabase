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
      onSubmit(data)
    }
  }

  return (
    <form className={`login-form grid gap-4 ${className}`} onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="email" className="label">Email</label>
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
    </form>
  )
}
