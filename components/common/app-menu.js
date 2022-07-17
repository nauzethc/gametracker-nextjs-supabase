import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'

export default function AppMenu ({ children }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return mounted
    ? createPortal(children, document.querySelector('#app-bar--menu'))
    : null
}
