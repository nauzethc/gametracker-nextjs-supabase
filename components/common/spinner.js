export default function Spinner ({ className = '' }) {
  return (
    <div className="spinner inline-grid place-content-center">
      <span className={`w-8 h-8 rounded-full border-4 border-t-primary border-l-primary border-b-base-100 border-r-base-100 animate-spin ${className}`}></span>
    </div>
  )
}
