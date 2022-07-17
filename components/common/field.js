export default function Field ({ label = '', value = '' }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-base-content/70">{label}</span>
      <span className="">{value}</span>
    </div>
  )
}
