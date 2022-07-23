import '../styles/globals.css'

import { useRouter } from 'next/router'
import { AuthProvider } from '../contexts/auth'

import Link from 'next/link'
import AuthRestricted from '../components/auth-restricted'
import Logo from '../components/common/logo'

export default function MyApp ({ Component, pageProps }) {
  const router = useRouter()
  return (
    <div id="app" className="flex flex-col h-screen w-screen bg-base-300">
      <AuthProvider>
        <AuthRestricted>
          <div className="navbar w-full bg-primary text-primary-content flex-grow-0 flex-shrink-0">
            <Link href="/">
              <a className="btn btn-ghost normal-case">
                <Logo className="text-xl h-6" />
              </a>
            </Link>
            <div className="flex-grow"></div>
            <div id="app-bar--menu" />
          </div>
        </AuthRestricted>
        <div className="content flex-grow overflow-x-hidden overflow-y-auto">
          <Component {...pageProps} />
        </div>
        <AuthRestricted>
          <div className="btm-nav flex-shrink-0 relative shadow bg-base-200">
            <Link href="/">
              <a className={router.pathname === '/' ? 'active' : ''}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                <span className="hidden">Home</span>
              </a>
            </Link>
            <Link href="/games">
              <a className={router.pathname.startsWith('/games') && !router.pathname.includes('add') ? 'active' : ''}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
                <span className="hidden">Games</span>
              </a>
            </Link>
            <Link href="/games/add">
              <a className={router.pathname === '/games/add' ? 'active' : ''}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>
                <span className="hidden">Track</span>
              </a>
            </Link>
            <Link href="/profile">
              <a className={router.pathname === '/profile' ? 'active' : ''}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                <span className="hidden">Profile</span>
              </a>
            </Link>
          </div>
        </AuthRestricted>
      </AuthProvider>
    </div>
  )
}
