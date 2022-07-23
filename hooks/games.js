import { useReducer } from 'react'
import { useUser } from './auth'
import { supabase } from '../lib/supabase'
import { sanitizeGameCreate, sanitizeGameQuery, sanitizeGameUpdate } from '../utils/games'
import { getUser, supabaseServerClient } from '@supabase/auth-helpers-nextjs'

const DEFAULT_STATE = {
  error: null,
  data: null,
  count: 0,
  pending: false
}

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
      dispatch({ type: 'success', data, count: 1 })
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
      dispatch({ type: 'success', data: data.pop(), count: 1 })
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
      dispatch({ type: 'success', data: data.pop(), count: 1 })
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
      dispatch({ type: 'success', data, count: 1 })
    } catch (error) {
      dispatch({ type: 'error', error })
    }
  }

  async function find (query = {}) {
    dispatch({ type: 'request' })
    try {
      const { match, textSearch, order_by, range } = sanitizeGameQuery(query)
      const { error, data, count } = await (textSearch
        ? supabase
          .from('games')
          .select('*', { count: 'estimated' })
          .textSearch(...textSearch)
          .eq('user_id', user.id)
          .match(match)
          .order(...order_by)
          .range(...range)
        : supabase
          .from('games')
          .select('*', { count: 'estimated' })
          .eq('user_id', user.id)
          .match(match)
          .order(...order_by)
          .range(...range)
      )

      if (error) throw error
      dispatch({ type: 'success', data, count })
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
    remove,
    find
  }
}

export function withGames (context) {
  let session

  async function find (query = {}) {
    if (!session) session = await getUser(context)
    const { match, textSearch, order_by, range } = sanitizeGameQuery(query)
    try {
      return textSearch
        ? supabaseServerClient(context)
          .from('games')
          .select('*', { count: 'estimated' })
          .textSearch(...textSearch)
          .eq('user_id', session.user.id)
          .match(match)
          .order(...order_by)
          .range(...range)
        : supabaseServerClient(context)
          .from('games')
          .select('*', { count: 'estimated' })
          .eq('user_id', session.user.id)
          .match(match)
          .order(...order_by)
          .range(...range)
    } catch (error) {
      return { error: error.message, count: 0, data: null }
    }
  }

  return {
    find
  }
}
