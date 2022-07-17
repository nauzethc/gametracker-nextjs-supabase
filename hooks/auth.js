import { useContext } from 'react'
import { AuthContext } from '../contexts/auth'

export function useUser () {
  return useContext(AuthContext)
}
