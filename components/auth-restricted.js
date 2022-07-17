import { Fragment } from 'react'
import { useUser } from '../hooks/auth'

export default function AuthRestricted ({ children }) {
  const { user } = useUser()
  return (
    <Fragment>
      {user ? children : null}
    </Fragment>
  )
}
