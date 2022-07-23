export default function Stats ({ title = 'Stats', data = [], className }) {
  let total = 0
  let finished = 0
  let totalHours = 0

  if (Array.isArray(data)) {
    data.forEach(({ status, total_hours }) => {
      total += 1
      finished += status === 'finished' ? 1 : 0
      totalHours += total_hours
    })
  }

  return (
    <div className="grid">
      <h3 className="px-4 py-3 text-xl font-semibold">{title}</h3>
      <div className={`stats rounded-none ${className}`}>
        <div className="stat">
          <div className="stat-title">Played</div>
          <div className="stat-value">{total}</div>
        </div>
        <div className="stat">
          <div className="stat-title text-primary">Finished</div>
          <div className="stat-value">{finished}</div>
        </div>
        <div className="stat">
          <div className="stat-title text-secondary">Total time</div>
          <div className="stat-value">{totalHours}h</div>
        </div>
      </div>
    </div>
  )
}
