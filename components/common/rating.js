export default function Rating ({ value = 0, max = 5, half, className = '' }) {
  const currentValue = Number(value)
  const hasHalf = !!half
  const values = hasHalf
    ? [...new Array(max * 2)].map((_, index) => (index + 1))
    : [...new Array(max)].map((_, index) => index + 1)

  return (
    <div className={`rating rating-lg ${hasHalf ? 'rating-half' : ''}`}>
      <input type="radio" name="rating"
        value={0}
        className="rating-hidden"
        defaultChecked={currentValue === 0} />
      {values.map(value => hasHalf
        ? <input type="radio" name="rating"
            key={value}
            value={value / 2}
            defaultChecked={currentValue === value / 2}
            disabled
            className={`mask mask-star-2 cursor-default ${value % 2 === 0 ? 'mask-half-2' : 'mask-half-1'} ${className}`} />
        : <input type="radio" name="rating"
            key={value}
            value={value}
            defaultChecked={currentValue === value}
            disabled
            className={`mask mask-star-2 cursor-default ${className}`} />
      )}
    </div>
  )
}
