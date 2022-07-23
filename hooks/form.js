import { useEffect, useState } from 'react'

function getFormData (defaults = {}, initialData = {}) {
  return Object.fromEntries(
    Object.entries(defaults).map(([field, value]) =>
      (initialData[field] !== undefined && initialData[field] !== null)
        ? [field, initialData[field]]
        : [field, value]
    )
  )
}

export function useForm ({ defaults = {}, initialData = {} }) {
  const [data, setData] = useState(getFormData(defaults, initialData))

  useEffect(() => setData(getFormData(defaults, initialData)), [initialData])

  // This handle is for using directly with form input's `onChange`
  // property, update automatically form data
  const onChange = e => {
    const { name } = e.target
    setData({ ...data, [name]: e.target.value })
  }
  return { data, setData, onChange }
}

export function useFormInput (initial = '') {
  const [value, setValue] = useState(initial)
  const onChange = e => setValue(e.target.value)
  return { value, onChange }
}
