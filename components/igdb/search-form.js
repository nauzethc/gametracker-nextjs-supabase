import { useForm } from '../../hooks/forms'

const defaults = { q: '' }

export default function SearchForm ({
  className = '',
  initialData = {},
  isLoading,
  onSubmit,
  autofocus,
  error
}) {
  const { data, onChange } = useForm({ defaults, initialData })
  const handleSubmit = e => {
    e.preventDefault()
    if (typeof onSubmit === 'function' && data.q) {
      onSubmit(data)
    }
  }
  return (
    <form className={`grid ${className}`} onSubmit={handleSubmit}>
      <div className="form-control">
        <div className="flex items-center gap-2">
          <input type="text" name="q"
            placeholder="i.e. 'super mario'"
            className="input flex-grow"
            onChange={onChange}
            value={data.q}
            autoFocus={autofocus} />
          <button className={`btn btn-square btn-secondary ${isLoading ? 'loading' : ''}`}>
            {isLoading ? null : <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>}
          </button>
        </div>
      </div>
    </form>
  )
}
