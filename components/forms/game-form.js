import { useForm } from '../../hooks/form'
import { GAMEPLAY_OPTIONS, STATUS_OPTIONS } from '../../config/forms'
import RatingInput from '../common/rating-input'

const defaults = {
  started_on: '',
  finished_on: '',
  total_hours: 0,
  achievements_percent: 0,
  comment: '',
  rating: 0,
  platform_name: '',
  platform_logo: '',
  platform_abbreviation: '',
  status: 'pending',
  gameplay_type: 'main'
}

export default function GameForm ({
  className = '',
  platforms = [],
  initialData = {},
  isLoading,
  onSubmit,
  error,
  children
}) {
  const { data, onChange, setData } = useForm({ initialData, defaults })

  const handleSubmit = e => {
    e.preventDefault()
    if (typeof onSubmit === 'function') {
      onSubmit(data)
    }
  }

  const handleFinished = e => {
    const finished_on = e.target.value
    if (finished_on) {
      setData({ ...data, finished_on, status: 'finished' })
    } else {
      setData({ ...data, finished_on })
    }
  }

  const handlePlatform = e => {
    const platform_name = e.target.value
    const {
      abbreviation: platform_abbreviation,
      logo: platform_logo
    } = platforms.filter(({ name }) => name === platform_name).pop()
    setData({ ...data, platform_name, platform_abbreviation, platform_logo })
  }

  const handleRating = rating => {
    setData({ ...data, rating })
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <fieldset className="grid md:grid-cols-2 gap-2 mb-4" disabled={isLoading}>
        {platforms.length > 0
          ? <div className="form-control">
              <label htmlFor="platform_name" className="label">Platform</label>
              <select name="platform_name"
                onChange={handlePlatform}
                value={data.platform_name}
                className="select bg-base-200"
                required>
                  <option value="" disabled>Select...</option>
                  {platforms.map(({ name }) => <option key={name}>{name}</option>)}
              </select>
            </div>
          : null}

        <div className="form-control">
          <label htmlFor="started_on" className="label">Started on</label>
          <input type="date"
            name="started_on"
            onChange={onChange}
            value={data.started_on}
            className="input bg-base-200 w-full"
            required />
        </div>

        <div className="form-control">
          <label htmlFor="finished_on" className="label">Finished on</label>
          <input type="date"
            name="finished_on"
            onChange={handleFinished}
            value={data.finished_on}
            className="input bg-base-200 w-full" />
        </div>

        <div className="form-control">
          <label htmlFor="status" className="label">Status</label>
          <select name="status"
            onChange={onChange}
            value={data.status}
            className="select bg-base-200">
              {STATUS_OPTIONS.map(({ label, value }) =>
                <option key={value} value={value}>{label}</option>)
              }
            </select>
        </div>

        <div className="form-control">
          <label htmlFor="gameplay_type" className="label">Gameplay</label>
          <select name="gameplay_type"
            onChange={onChange}
            value={data.gameplay_type}
            className="select bg-base-200">
              {GAMEPLAY_OPTIONS.map(({ label, value }) =>
                <option key={value} value={value}>{label}</option>)
              }
            </select>
        </div>

        <div className="form-control">
          <label htmlFor="total_hours" className="label">Hours</label>
          <input className="input bg-base-200 w-full" type="number"
            name="total_hours"
            value={data.total_hours}
            onChange={onChange}
            required />
        </div>

        <div className="form-control">
          <label htmlFor="achievements_percent" className="label">Achievements ({data.achievements_percent}%)</label>
          <div className="flex items-center gap-2 h-12 bg-base-200 rounded-lg p-2">
            <input type="range"
              min="0" max="100"
              name="achievements_percent"
              value={data.achievements_percent}
              onChange={onChange}
              className="range range-accent" />
          </div>
        </div>

        <div className="form-control md:col-span-2">
          <label htmlFor="comment" className="label">Review</label>
          <textarea name="comment"
            onChange={onChange}
            value={data.comment}
            placeholder="Type some comment..."
            className="textarea bg-base-200" />
          <div className="flex justify-center py-4">
            <RatingInput
              value={data.rating}
              onChange={handleRating}
              half={true}
              className="bg-accent" />
          </div>
        </div>
      </fieldset>
      {children || (isLoading
        ? <button type="submit" className="btn btn-primary btn-block loading">
            <span>Saving</span>
          </button>
        : <button type="submit" className="btn btn-primary btn-block gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" /></svg>
            <span>Track</span>
          </button>)
      }
    </form>
  )
}
