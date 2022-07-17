import { useState } from 'react'

export default function RatingInput ({ value = 0, onChange, max = 5, half, className = '' }) {
  const [currentValue, setValue] = useState(value)
  const hasHalf = !!half
  const values = hasHalf
    ? [...new Array(max * 2)].map((_, index) => (index + 1))
    : [...new Array(max)].map((_, index) => index + 1)

  const handleChange = (e) => {
    setValue(e.target.value)
    if (typeof onChange === 'function') {
      onChange(Number(e.target.value))
    }
  }

  return (
    <div className={`rating rating-lg ${hasHalf ? 'rating-half' : ''}`}>
      <input type="radio" name="rating"
        value={0}
        onChange={handleChange}
        className="rating-hidden"
        defaultChecked={currentValue === 0} />
      {values.map(value => hasHalf
        ? <input type="radio" name="rating"
            key={value}
            value={value / 2}
            onChange={handleChange}
            defaultChecked={currentValue === value / 2}
            className={`mask mask-star-2 ${value % 2 === 0 ? 'mask-half-2' : 'mask-half-1'} ${className}`} />
        : <input type="radio" name="rating"
            key={value}
            value={value}
            onChange={handleChange}
            defaultChecked={currentValue === value}
            className={`mask mask-star-2 ${className}`} />
      )}
    </div>
  )
}
