import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDidMount } from './lifecycle'

export function useQueryRoute (initialQuery = {}) {
  const didMount = useDidMount()
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  useEffect(() => {
    if (didMount) {
      router.push({ pathname: router.pathname, query }, undefined, { shallow: true })
    }
  }, [query])

  return [query, setQuery]
}
