import { getUser, supabaseServerClient, withPageAuth } from '@supabase/auth-helpers-nextjs'
import { supabase } from '../lib/supabase'

import AppMenu from '../components/common/app-menu'
import Error from '../components/common/error'
import GameList from '../components/home/game-list'
import Stats from '../components/home/stats'
import SearchForm from '../components/home/search-form'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

export default function Home ({ error, data }) {
  const [showForm, setForm] = useState(false)
  const inputRef = useRef(null)
  const router = useRouter()

  const handleLogout = () => supabase.auth.signOut()
  const handleSubmit = ({ q }) => router.push({ pathname: '/games', query: { q } })

  useEffect(() => {
    if (showForm && inputRef) inputRef.current.focus()
  }, [showForm])

  return (
    <div id="home" className="grid gap-2 pt-2 relative">
      <div className={`absolute px-4 pb-3 top-0 right-0 w-full bg-primary transition-all shadow md:max-w-sm md:mx-4 md:rounded-b-lg ${showForm ? 'translate-y-0' : '-translate-y-16'}`}>
        <SearchForm initialData={{}} onSubmit={handleSubmit} inputRef={inputRef} />
      </div>
      <Error error={error} />
      <Stats
        title="Last 3 months"
        data={data} />
      <GameList
        title="Pending"
        data={data.filter(game => game.status === 'pending')}
        href="/games?status=pending&order_by=started_on" />
      <GameList
        title="Finished"
        data={data.filter(game => game.status === 'finished')}
        href="/games?status=finished&order_by=finished_on" />

      <AppMenu>
        <button className="btn btn-square btn-ghost" onClick={() => setForm(!showForm)}>
          {showForm
            ? <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
            : <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
          }
        </button>
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-square btn-ghost">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
          </label>
          <ul tabIndex="0" className="dropdown-content menu p-2 shadow rounded-box w-52 bg-base-200 text-base-content">
            <li>
              <a href="#logout">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </AppMenu>

      <div className="modal" id="logout">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <div className="modal-action">
            <a href="#" className="btn">Cancel</a>
            <button className="btn btn-error btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps (context) {
    const INTERVAL = 86400 * 90 * 1000 // 60 days
    const { user } = await getUser(context)
    const { error, data, count } = await supabaseServerClient(context)
      .from('games')
      .select('*', { count: 'estimated' })
      .eq('user_id', user.id)
      .or(`started_on.gte.${new Date(Date.now() - INTERVAL).toISOString()},and(status.eq.pending,fixed.is.true)`)
      .order('started_on', { ascending: false })

    return {
      props: {
        error,
        data: Array.isArray(data) ? data : [],
        count
      }
    }
  }
})
