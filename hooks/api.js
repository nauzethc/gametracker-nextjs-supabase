import { useReducer } from 'react'

function reducer (state, { type, data, error }) {
  switch (type) {
    case 'request':
      return { ...state, pending: true }
    case 'success':
      return { ...state, pending: false, error: null, data }
    case 'error':
      return { ...state, pending: false, error }
    default:
      throw new Error(`Unknown action type: ${type}`)
  }
}

function getURL (endpoint, query = {}) {
  const searchParams = new URLSearchParams(query)
  return `${endpoint}?${searchParams.toString()}`
}

export function useAPI (endpoint) {
  if (!endpoint) throw new Error('"endpoint" params is required')

  const [state, dispatch] = useReducer(reducer, {
    pending: false,
    error: null,
    data: null
  })

  async function workflow (promise) {
    dispatch({ type: 'request' })
    try {
      const response = await promise
      const data = await response.json()
      dispatch({ type: 'success', data })
      return data
    } catch (error) {
      dispatch({ type: 'error', error })
    }
  }

  const create = (data) => workflow(
    fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  )
  const update = (data) => workflow(
    fetch(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  )
  const retrieve = (query) => workflow(
    fetch(getURL(endpoint, query), { method: 'GET' })
  )
  const remove = () => workflow(
    fetch(endpoint, { method: 'DELETE' })
  )

  return { state, create, retrieve, update, delete: remove }
}
