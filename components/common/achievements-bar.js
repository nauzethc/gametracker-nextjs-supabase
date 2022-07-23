export default function AchievementsBar ({ value = 0, className = '' }) {
  if (value === 100) {
    return <progress
      className={`progress progress-primary bg-base-300 ${className}`}
      value={value}
      max="100" />
  } else if (value >= 70) {
    return <progress
      className={`progress progress-success bg-base-300 ${className}`}
      value={value}
      max="100" />
  } else if (value >= 40) {
    return <progress
      className={`progress progress-warning bg-base-300 ${className}`}
      value={value}
      max="100" />
  } else {
    return <progress
      className={`progress progress-error bg-base-300 ${className}`}
      value={value}
      max="100" />
  }
}
