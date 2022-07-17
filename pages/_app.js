import '../styles/globals.css'
import Link from 'next/link'
import { useState } from 'react'
import { AuthProvider } from '../contexts/auth'
import AuthRestricted from '../components/auth-restricted'

export default function MyApp ({ Component, pageProps }) {
  const [drawer, setDrawer] = useState(false)
  const toggleDrawer = (e) => {
    if (e.currentTarget === e.target) {
      setDrawer(!drawer)
    }
  }

  return (
    <div id="app" className={`drawer ${drawer ? 'drawer-open' : ''}`}>
      <AuthProvider>
        <input id="app-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-base-200 flex flex-col">
          <AuthRestricted>
            <div className="navbar w-full bg-primary text-primary-content flex-grow-0 flex-shrink-0">
              <label htmlFor="app-drawer" className="btn btn-square btn-ghost drawer-btn" onClick={toggleDrawer}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
              </label>
              <Link href="/">
                <a className="btn btn-ghost normal-case text-xl">
                  <span className="font-light">Game</span>
                  <span className="font-bold">Tracker</span>
                </a>
              </Link>
              <div className="flex-grow"></div>
              <div id="app-bar--menu" />
            </div>
          </AuthRestricted>
          <Component {...pageProps} />
        </div>
        <AuthRestricted>
          <div className="drawer-side">
            <label htmlFor="app-drawer" className="drawer-overlay" onClick={toggleDrawer}></label>
            <ul className="menu p-4 bg-base-100 overflow-y-auto w-64">
              <li>
                <Link href="/games">
                  <a>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
                    <span>Games</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/games/add">
                  <a>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>
                    <span>Track</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </AuthRestricted>
      </AuthProvider>
    </div>
  )
}
