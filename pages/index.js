import { useUser } from '../hooks/auth'
import Link from 'next/link'

export default function Home () {
  const { user } = useUser()
  return (
    <div id="home">
      <p>Hello, world!</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Link href="/games/add">
        <a className="btn btn-circle btn-accent shadow fixed bottom-0 right-0 m-4">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
        </a>
      </Link>
    </div>
  )
}
