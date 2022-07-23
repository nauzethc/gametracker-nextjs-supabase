import { useForm } from '../../../gametracker-nextjs/hooks/forms'
import { GAMEPLAY_OPTIONS, STATUS_OPTIONS } from '../../config/forms'
import { getGameplayType, getStatus } from '../../utils/games'

const defaults = {
  q: '',
  order_by: '',
  status: '',
  gameplay_type: ''
}

export default function SearchForm ({
  className = '',
  initialData = {},
  isLoading,
  onSubmit,
  error
}) {
  const { data, onChange } = useForm({ defaults, initialData })
  const handleSubmit = e => {
    e.preventDefault()
    if (typeof onSubmit === 'function') {
      const cleanedData = Object.fromEntries(
        Object
          .entries(data)
          .filter(([field, value]) => !!value)
      )
      onSubmit(cleanedData)
    }
  }

  return (
    <form className={`collapsable-form bg-primary ${className}`}
      onSubmit={handleSubmit}>

      <div className="form-control sm:col-span-3">
        <label htmlFor="q" className="label text-primary-content">Search</label>
        <div className="flex items-center gap-2">
          <input className="input flex-grow" type="text"
            name="q"
            placeholder="i.e. 'cuphead'"
            value={data.q}
            onChange={onChange} />
          {isLoading
            ? <button type="submit" className="btn btn-secondary btn-square loading"></button>
            : <button type="submit" className="btn btn-secondary btn-square">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
              </button>
          }
        </div>
      </div>
      {data.q && <div className="form-control-preview badge badge-ghost bg-opacity-20 border-opacity-20 text-primary-content">search {`"${data.q}"`}</div>}

      <div className="form-control">
        <label htmlFor="status" className="label text-primary-content">Status</label>
        <select className="select" name="status" value={data.status} onChange={onChange}>
          <option value="">All</option>
          {STATUS_OPTIONS.map(({ label, value }) =>
            <option key={value} value={value}>{label}</option>)
          }
        </select>
      </div>
      <div className="form-control-preview badge badge-ghost bg-opacity-20 border-opacity-20 text-primary-content">
        {getStatus(data.status) || 'Any status'}
      </div>

      <div className="form-control">
        <label htmlFor="gameplay_type" className="label text-primary-content">Gameplay</label>
        <select className="select" name="gameplay_type" value={data.gameplay_type} onChange={onChange}>
          <option value="">All</option>
          {GAMEPLAY_OPTIONS.map(({ label, value }) =>
            <option key={value} value={value}>{label}</option>)
          }
        </select>
      </div>
      <div className="form-control-preview badge badge-ghost bg-opacity-20 border-opacity-20 text-primary-content">
        {getGameplayType(data.gameplay_type) || 'All gameplays'}
      </div>

      <div className="form-control">
        <label htmlFor="order_by" className="label text-primary-content">Order by</label>
        <select className="select" name="order_by" value={data.order_by} onChange={onChange}>
          <option value="" disabled>Select...</option>
          <option value="name">Name</option>
          <option value="started_on">Started on</option>
          <option value="finished_on">Finished on</option>
        </select>
      </div>
      <div className="form-control-preview badge badge-ghost bg-opacity-20 border-opacity-20 text-primary-content">
        Order by: {`"${data.order_by || 'started_on'}"`}
      </div>
    </form>
  )
}
