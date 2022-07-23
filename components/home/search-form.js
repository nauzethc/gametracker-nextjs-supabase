import { useForm } from '../../hooks/forms'

const defaults = { q: '' }

export default function SearchForm ({
  initialData = {},
  onSubmit,
  isLoading,
  error,
  className = '',
  inputRef
}) {
  const { data, onChange } = useForm({ initialData, defaults })

  const handleSubmit = e => {
    e.preventDefault()
    if (data.q && typeof onSubmit === 'function') onSubmit(data)
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="form-control h-12 relative">
        <input type="text" className="input absolute pl-12 w-full"
          placeholder="Your games"
          name="q"
          ref={inputRef}
          value={data.q}
          onChange={onChange} />
        <svg className="w-6 h-6 z-10 m-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
      </div>
    </form>
  )
}
