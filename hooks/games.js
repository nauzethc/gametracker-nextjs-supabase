import { useReducer } from 'react'
import { useUser } from './auth'
import { supabase } from '../lib/supabase'
import { sanitizeGameCreate, sanitizeGameUpdate } from '../utils/games'

const DEFAULT_STATE = {
  error: null,
  data: null,
  pending: false
}

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

export function useGames (initialState = {}) {
  const [state, dispatch] = useReducer(reducer, {
    ...DEFAULT_STATE,
    ...initialState
  })
  const { user } = useUser()

  async function create (formData) {
    dispatch({ type: 'request' })
    try {
      const sanitized_data = sanitizeGameCreate({
        ...formData,
        user_id: user.id
      })
      const { error, data } = await supabase
        .from('games')
        .insert(sanitized_data)

      if (error) throw error
      dispatch({ type: 'success', data })
    } catch (error) {
      dispatch({ type: 'error', error })
    }
  }

  async function update (gameId, formData) {
    dispatch({ type: 'request' })
    try {
      const sanitized_data = sanitizeGameUpdate({
        ...formData,
        updated_at: new Date()
      })
      const { error, data } = await supabase
        .from('games')
        .update(sanitized_data)
        .eq('id', gameId)

      if (error) throw error
      dispatch({ type: 'success', data: data.pop() })
    } catch (error) {
      dispatch({ type: 'error', error })
    }
  }

  async function remove (gameId) {
    dispatch({ type: 'request' })
    try {
      const { error, data } = await supabase
        .from('games')
        .delete()
        .eq('id', gameId)

      if (error) throw error
      dispatch({ type: 'success', data: data.pop() })
    } catch (error) {
      dispatch({ type: 'error', error })
    }
  }

  async function retrieve (gameId) {
    dispatch({ type: 'request' })
    try {
      const { error, data } = await supabase
        .from('games')
        .select('*')
        .eq('id', gameId)
        .limit(1)
        .single()
      if (error) throw error
      dispatch({ type: 'success', data })
    } catch (error) {
      dispatch({ type: 'error', error })
    }
  }

  return {
    // isLoading, data, error
    state,
    // CRUD
    create,
    retrieve,
    update,
    remove
  }
}
