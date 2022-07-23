import { useReducer } from 'react'

function reducer (state, { type, data, error, count }) {
  switch (type) {
    case 'request':
      return { ...state, pending: true }
    case 'success':
      return { ...state, pending: false, error: null, data, count }
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
    data: null,
    count: 0
  })

  async function workflow (promise) {
    dispatch({ type: 'request' })
    try {
      const response = await promise
      const { count = 0, data } = await response.json()
      dispatch({ type: 'success', data, count })
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
